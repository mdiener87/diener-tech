#!/usr/bin/env python3
"""Shared raster metadata policy. Requires Python 3 and ExifTool; no pip packages."""

import argparse
import errno
import json
import os
from pathlib import Path
import shutil
import struct
import subprocess
import sys
import tempfile
import zlib

EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.bmp', '.tif', '.tiff', '.ico'}
PNG_SIGNATURE = b'\x89PNG\r\n\x1a\n'
# Preserve encoded pixels, transparency, and animation. Drop text, EXIF, XMP,
# ICC profiles, timestamps, unknown/private chunks, and trailing data.
PNG_CHUNKS = {b'IHDR', b'PLTE', b'IDAT', b'IEND', b'tRNS', b'acTL', b'fcTL', b'fdAT'}
# Only structural fields are allowed, never an entire embedded metadata group.
STRUCTURAL = {
    'File': 'FileType FileTypeExtension MIMEType ImageWidth ImageHeight EncodingProcess '
            'BitsPerSample ColorComponents YCbCrSubSampling ByteOrder ExifByteOrder '
            'BMPVersion Planes BitDepth Compression ImageLength PixelsPerMeterX '
            'PixelsPerMeterY NumColors NumImportantColors RedMask GreenMask BlueMask '
            'AlphaMask ColorSpace RenderingIntent',
    'PNG': 'ImageWidth ImageHeight BitDepth ColorType Compression Filter Interlace '
           'Palette Transparency AnimationFrames AnimationPlays FrameWidth FrameHeight '
           'XOffset YOffset DelayNum DelayDen DisposeOp BlendOp SequenceNumber',
    'RIFF': 'ImageWidth ImageHeight VP8Version HorizontalScale VerticalScale '
            'VP8XFlags AnimationBackgroundColor AnimationLoopCount Duration '
            'AlphaPreprocessing AlphaFiltering AlphaCompression',
    'GIF': 'GIFVersion ImageWidth ImageHeight HasColorMap ColorResolution ColorResolutionDepth BitsPerPixel '
           'BackgroundColor PixelAspectRatio TransparentColor AnimationIterations Duration FrameCount',
    'BMP': 'BMPVersion ImageWidth ImageHeight Planes BitDepth Compression ImageLength '
           'PixelsPerMeterX PixelsPerMeterY NumColors NumImportantColors RedMask GreenMask '
           'BlueMask AlphaMask ColorSpace RenderingIntent',
    'IFD0': 'ImageWidth ImageHeight BitsPerSample Compression PhotometricInterpretation '
            'FillOrder StripOffsets SamplesPerPixel RowsPerStrip StripByteCounts '
            'XResolution YResolution PlanarConfiguration ResolutionUnit Predictor '
            'ColorMap TileWidth TileLength TileOffsets TileByteCounts ExtraSamples SampleFormat '
            'PreviewImageStart PreviewImageLength PreviewImage JPEGTables ReferenceBlackWhite Orientation',
    'QuickTime': 'MajorBrand MinorVersion CompatibleBrands HandlerType '
                 'MetaImageSize PrimaryItemReference ImageWidth ImageHeight '
                 'BitDepth ChromaFormat ChromaSamplePosition VideoFullRangeFlag '
                 'ColorPrimaries TransferCharacteristics MatrixCoefficients '
                 'ImageSpatialExtent ImagePixelDepth AV1ConfigurationVersion '
                 'AV1Profile AV1Level AV1Tier ColorProfiles MediaDataSize MediaDataOffset',
    'Meta': 'PrimaryItemReference',
}
ALLOWED = {f'{group}:{tag}' for group, tags in STRUCTURAL.items() for tag in tags.split()}


def exiftool(*args):
    # Ignore user ExifTool configuration, so the policy is reproducible.
    result = subprocess.run(['exiftool', '-config', '', *map(str, args)],
                            capture_output=True, text=True)
    if result.returncode:
        raise ValueError(result.stderr.strip() or result.stdout.strip())
    return result.stdout


def metadata_violations(path):
    tags = json.loads(exiftool('-j', '-G1', '-s', '-a', path))[0]
    return [tag for tag in tags
            if tag != 'SourceFile' and tag not in ALLOWED
            and not tag.startswith(('System:', 'Composite:'))
            and tag != 'ExifTool:ExifToolVersion']


def clean_png(data):
    if not data.startswith(PNG_SIGNATURE):
        raise ValueError('Invalid PNG signature')
    output = bytearray(PNG_SIGNATURE)
    offset = 8
    has_pixels = False
    while offset + 12 <= len(data):
        length, kind = struct.unpack_from('>I4s', data, offset)
        end = offset + 12 + length
        if end > len(data):
            raise ValueError('Truncated PNG chunk')
        if offset == 8 and (kind != b'IHDR' or length != 13):
            raise ValueError('Invalid PNG header')
        crc = struct.unpack_from('>I', data, end - 4)[0]
        if zlib.crc32(data[offset + 4:end - 4]) != crc:
            raise ValueError('Invalid PNG chunk checksum')
        if kind in PNG_CHUNKS:
            output.extend(data[offset:end])
        elif not kind[0] & 32:
            raise ValueError(f'Unsupported critical PNG chunk: {kind!r}')
        offset = end
        has_pixels |= kind == b'IDAT'
        if kind == b'IEND':
            if length or not has_pixels:
                raise ValueError('Invalid PNG image data or end chunk')
            return bytes(output)
    raise ValueError('PNG has no IEND chunk')


def clean_ico(data):
    if len(data) < 6:
        raise ValueError('Truncated ICO header')
    reserved, kind, count = struct.unpack_from('<HHH', data)
    if reserved or kind != 1 or not count or len(data) < 6 + 16 * count:
        raise ValueError('Invalid ICO directory')
    directory = bytearray(data[:6])
    frames = bytearray()
    for index in range(count):
        entry = bytearray(data[6 + index * 16:22 + index * 16])
        length, offset = struct.unpack_from('<II', entry, 8)
        if offset < 6 + 16 * count or offset + length > len(data):
            raise ValueError('Invalid ICO frame bounds')
        frame = data[offset:offset + length]
        if frame.startswith(PNG_SIGNATURE):
            frame = clean_png(frame)
        else:
            # Classic uncompressed BITMAPINFOHEADER has no metadata fields.
            # Refuse unfamiliar DIB layouts instead of silently accepting profiles.
            if len(frame) < 40 or struct.unpack_from('<I', frame)[0] != 40:
                raise ValueError('Unsupported ICO bitmap header; regenerate as PNG-based ICO')
            width, height, planes, bits, compression = struct.unpack_from('<iiHHI', frame, 4)
            if width <= 0 or height <= 0 or height % 2 or planes != 1 or compression != 0 or bits not in (1, 4, 8, 16, 24, 32):
                raise ValueError('Unsupported ICO bitmap layout')
            colors = struct.unpack_from('<I', frame, 32)[0] or (1 << bits if bits <= 8 else 0)
            pixel_size = ((width * bits + 31) // 32) * 4 * (height // 2)
            mask_size = ((width + 31) // 32) * 4 * (height // 2)
            expected = 40 + colors * 4 + pixel_size + mask_size
            if len(frame) < expected:
                raise ValueError('Truncated ICO bitmap')
            frame = frame[:expected]
        struct.pack_into('<II', entry, 8, len(frame), 6 + 16 * count + len(frames))
        directory.extend(entry)
        frames.extend(frame)
    return bytes(directory + frames)


def extended_attributes(path):
    if not hasattr(os, 'listxattr'):
        return []
    try:
        # Do not remove security labels or POSIX ACLs.
        return [name for name in os.listxattr(path)
                if name.startswith(('user.', 'com.apple.'))]
    except OSError as error:
        if error.errno in (errno.ENOTSUP, errno.EOPNOTSUPP):
            return []
        raise


def process(path, check):
    if path.is_symlink():
        raise ValueError('Refusing to follow an image symlink')
    original = path.read_bytes()
    attrs = extended_attributes(path)
    # Detect by bytes as well as extension, preventing renamed containers from
    # bypassing the PNG/ICO checks.
    if original.startswith(PNG_SIGNATURE):
        cleaned = clean_png(original)
    elif original.startswith(b'\x00\x00\x01\x00'):
        cleaned = clean_ico(original)
    else:
        violations = metadata_violations(path)
        if check:
            if violations or attrs:
                raise ValueError('Metadata found: ' + ', '.join(violations + attrs))
            return False
        cleaned = original
        if violations:
            # Work on a private copy; preserve the original on any tool failure.
            with tempfile.TemporaryDirectory(prefix='image-metadata-') as temp:
                candidate = Path(temp) / ('image' + path.suffix.lower())
                candidate.write_bytes(original)
                exiftool('-overwrite_original', '-all=', candidate)
                remaining = metadata_violations(candidate)
                if remaining:
                    raise ValueError('Metadata remains after cleaning: ' + ', '.join(remaining))
                cleaned = candidate.read_bytes()
    if check:
        if cleaned != original or attrs:
            raise ValueError('Embedded metadata, extra container data, or extended attributes found')
        return False
    changed = cleaned != original or bool(attrs)
    if cleaned != original:
        path.write_bytes(cleaned)
    for name in attrs:
        os.removexattr(path, name)
    return changed


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--directory', type=Path)
    parser.add_argument('files', nargs='*', type=Path)
    args = parser.parse_args()
    if not shutil.which('exiftool'):
        parser.error('exiftool is required but was not found in PATH')
    if args.directory:
        if not args.directory.is_dir():
            parser.error(f'Target directory does not exist: {args.directory}')
        paths = sorted(args.directory.rglob('*'))
    else:
        paths = args.files
    count = errors = 0
    for path in paths:
        if path.suffix.lower() not in EXTENSIONS or path.is_dir():
            continue
        count += 1
        try:
            if process(path.absolute(), args.check):
                print(f'Cleaned: {path}')
        except (OSError, ValueError, struct.error) as error:
            print(f'{path}: {error}', file=sys.stderr)
            errors += 1
    print(f'Checked {count} raster image(s); {errors} error(s).')
    return bool(errors)


if __name__ == '__main__':
    sys.exit(main())
