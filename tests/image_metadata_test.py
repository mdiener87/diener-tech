"""Run with: python3 -B -m unittest discover -s tests -p '*_test.py' -v"""

import importlib.util
import os
from pathlib import Path
import shutil
import struct
import subprocess
import tempfile
import unittest
import zlib

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('image_metadata', ROOT / 'scripts/lib/image_metadata.py')
metadata = importlib.util.module_from_spec(spec)
spec.loader.exec_module(metadata)


def chunk(kind, data):
    return struct.pack('>I', len(data)) + kind + data + struct.pack('>I', zlib.crc32(kind + data))


def png(extra=b'', pixel=b'\xff\x00\x00'):
    return (metadata.PNG_SIGNATURE
            + chunk(b'IHDR', struct.pack('>IIBBBBB', 1, 1, 8, 2, 0, 0, 0))
            + extra + chunk(b'IDAT', zlib.compress(b'\x00' + pixel)) + chunk(b'IEND', b''))


def ico(*frames):
    directory = struct.pack('<HHH', 0, 1, len(frames))
    offset = 6 + 16 * len(frames)
    for frame in frames:
        directory += struct.pack('<BBBBHHII', 1, 1, 0, 0, 1, 32, len(frame), offset)
        offset += len(frame)
    return directory + b''.join(frames)


class MetadataTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.folder = Path(self.temp.name)

    def write(self, name, data):
        path = self.folder / name
        path.write_bytes(data)
        return path

    def assert_cleans(self, path):
        with self.assertRaises(ValueError):
            metadata.process(path, True)
        self.assertTrue(metadata.process(path, False))
        self.assertFalse(metadata.process(path, True))
        self.assertFalse(metadata.process(path, False))

    def test_png_text_exif_private_chunks_and_trailing_data(self):
        extra = (chunk(b'tEXt', b'Author\x00Private author')
                 + chunk(b'iTXt', b'Comment\x00\x00\x00\x00\x00Private comment')
                 + chunk(b'eXIf', b'private EXIF') + chunk(b'caBX', b'private provenance'))
        path = self.write('image with spaces.PNG', png(extra) + b'private trailing data')
        self.assert_cleans(path)
        self.assertEqual(path.read_bytes(), png())

    def test_ico_all_frames_and_offsets(self):
        dirty = png(chunk(b'tEXt', b'Author\x00Private author'))
        path = self.write('favicon.ico', ico(dirty, dirty, png()) + b'private trailer')
        self.assert_cleans(path)
        self.assertEqual(path.read_bytes(), ico(png(), png(), png()))

    def test_png_transparency_and_animation_chunks_preserved(self):
        extra = (chunk(b'tRNS', bytes(6)) + chunk(b'acTL', struct.pack('>II', 1, 0))
                 + chunk(b'fcTL', struct.pack('>IIIIIHHBB', 0, 1, 1, 0, 0, 1, 10, 0, 0)))
        path = self.write('animation.png', png(extra + chunk(b'tEXt', b'Author\x00Private')))
        self.assert_cleans(path)
        self.assertEqual(path.read_bytes(), png(extra))

    def test_clean_bmp_does_not_attempt_unsupported_exiftool_write(self):
        dib = struct.pack('<IiiHHIIiiII', 40, 1, 1, 1, 24, 0, 4, 0, 0, 0, 0)
        original = b'BM' + struct.pack('<IHHI', 58, 0, 0, 54) + dib + b'\x00\x00\xff\x00'
        path = self.write('bitmap.bmp', original)
        self.assertFalse(metadata.process(path, True))
        self.assertFalse(metadata.process(path, False))
        self.assertEqual(path.read_bytes(), original)

    def test_ico_classic_bitmap_preserved(self):
        dib = struct.pack('<IiiHHIIiiII', 40, 1, 2, 1, 32, 0, 4, 0, 0, 0, 0) + bytes(8)
        path = self.write('bitmap.ico', ico(dib))
        self.assertFalse(metadata.process(path, True))
        self.assertFalse(metadata.process(path, False))

    def test_ico_unsupported_bitmap_fails_without_editing(self):
        original = ico(struct.pack('<I', 124) + bytes(120))
        path = self.write('bitmap.ico', original)
        with self.assertRaisesRegex(ValueError, 'Unsupported ICO bitmap'):
            metadata.process(path, False)
        self.assertEqual(path.read_bytes(), original)

    def test_corrupt_png_and_ico_fail_without_editing(self):
        for name, original in [('bad.png', png()[:-1]), ('bad.ico', ico(png())[:-1])]:
            with self.subTest(name=name):
                path = self.write(name, original)
                with self.assertRaises(ValueError):
                    metadata.process(path, False)
                self.assertEqual(path.read_bytes(), original)

    def test_jpeg_webp_gif_tiff_avif_metadata(self):
        for extension in ('jpeg', 'webp', 'gif', 'tiff', 'avif'):
            with self.subTest(format=extension):
                path = self.folder / ('image.' + extension)
                shutil.copyfile(ROOT / 'tests/fixtures/image-metadata' / path.name, path)
                self.assertFalse(metadata.process(path, True))
                tag = '-Comment=Private comment' if extension == 'gif' else '-XMP-dc:Creator=Private author'
                metadata.exiftool('-overwrite_original', tag, path)
                self.assert_cleans(path)

    def test_transparent_webp_keeps_alpha_and_removes_xmp(self):
        path = self.folder / 'transparent.webp'
        shutil.copyfile(ROOT / 'tests/fixtures/image-metadata/transparent.webp', path)
        original = path.read_bytes()
        self.assertFalse(metadata.process(path, True))
        self.assertFalse(metadata.process(path, False))
        self.assertEqual(path.read_bytes(), original)
        metadata.exiftool('-overwrite_original', '-XMP-dc:Creator=Private author', path)
        self.assert_cleans(path)
        self.assertEqual(metadata.exiftool('-s3', '-WebP_Flags', path).strip(), 'Alpha')

    def test_jpeg_gps_and_exif(self):
        path = self.folder / 'photo.jpg'
        shutil.copyfile(ROOT / 'tests/fixtures/image-metadata/image.jpeg', path)
        metadata.exiftool('-overwrite_original', '-Artist=Private author',
                          '-GPSLatitude=40', '-GPSLongitude=105', path)
        self.assert_cleans(path)

    def test_extended_attributes(self):
        path = self.write('image.png', png())
        if not hasattr(os, 'setxattr'):
            self.skipTest('Extended attributes not available')
        try:
            os.setxattr(path, 'user.download_source', b'https://private.example/image')
        except OSError as error:
            self.skipTest(str(error))
        self.assert_cleans(path)
        self.assertEqual(os.listxattr(path), [])

    def test_symlink_is_not_followed(self):
        target = self.write('target.png', png(chunk(b'tEXt', b'Author\x00Private')))
        link = self.folder / 'link.png'
        link.symlink_to(target)
        with self.assertRaisesRegex(ValueError, 'symlink'):
            metadata.process(link, False)
        self.assertIn(b'Private', target.read_bytes())


class HookTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name) / 'repo'
        self.repo.mkdir()
        self.env = dict(os.environ, PRE_COMMIT_HOME=str(Path(self.temp.name) / 'cache'))
        self.precommit = ROOT / 'venv/bin/pre-commit'
        if not self.precommit.exists():
            executable = shutil.which('pre-commit')
            if not executable:
                self.fail('Install pre-commit to run hook integration tests')
            self.precommit = Path(executable)
        for name in ('.pre-commit-config.yaml', 'scripts/hooks/pre-commit', 'scripts/lib/image_metadata.py'):
            destination = self.repo / name
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / name, destination)
        self.run_command('git', 'init', '-q')
        self.run_command('git', 'config', 'user.name', 'Metadata test')
        self.run_command('git', 'config', 'user.email', 'metadata@example.invalid')
        self.run_command('git', 'config', 'commit.gpgsign', 'false')
        self.run_command(self.precommit, 'install')
        self.run_command('git', 'add', '.')
        self.run_command('git', 'commit', '-qm', 'Initial fixture')

    def run_command(self, *command, expected=0):
        result = subprocess.run(list(map(str, command)), cwd=self.repo, env=self.env,
                                stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        self.assertEqual(result.returncode, expected, result.stdout.decode(errors='replace'))
        return result.stdout

    def test_actual_commit_cleans_then_passes_after_restage(self):
        image = self.repo / 'image with spaces.PNG'
        image.write_bytes(png(chunk(b'tEXt', b'Author\x00Private')))
        favicon = self.repo / 'favicon.ico'
        favicon.write_bytes(ico(png(chunk(b'tEXt', b'Comment\x00Private'))))
        self.run_command('git', 'add', '.')
        staged_before = self.run_command('git', 'show', ':image with spaces.PNG')
        output = self.run_command('git', 'commit', '-qm', 'Images', expected=1)
        self.assertIn(b'files were modified', output)
        self.assertEqual(self.run_command('git', 'show', ':image with spaces.PNG'), staged_before)
        self.assertEqual(image.read_bytes(), png())
        self.assertEqual(favicon.read_bytes(), ico(png()))
        self.run_command('git', 'add', '.')
        self.run_command('git', 'commit', '-qm', 'Images')
        self.assertEqual(self.run_command('git', 'status', '--porcelain'), b'')

    def test_all_files_cleans_unstaged_and_unselected_file_is_untouched(self):
        selected = self.repo / 'selected.png'
        selected.write_bytes(png())
        self.run_command('git', 'add', '.')
        self.run_command('git', 'commit', '-qm', 'Clean image')
        selected.write_bytes(png(chunk(b'tEXt', b'Author\x00Private')))
        other = self.repo / 'other.png'
        other.write_bytes(selected.read_bytes())
        self.run_command(self.precommit, 'run', '--all-files', expected=1)
        self.assertEqual(selected.read_bytes(), png())
        self.assertIn(b'Private', other.read_bytes())
        self.run_command(self.precommit, 'run', '--all-files')

    def test_partial_staging_restores_unstaged_image_on_conflict(self):
        image = self.repo / 'partial.png'
        staged = png(chunk(b'tEXt', b'Author\x00Private'))
        image.write_bytes(staged)
        self.run_command('git', 'add', '.')
        unstaged = png(chunk(b'tEXt', b'Author\x00Private'), pixel=b'\x00\xff\x00')
        image.write_bytes(unstaged)
        self.run_command(self.precommit, 'run', expected=1)
        self.assertEqual(image.read_bytes(), unstaged)
        self.assertEqual(self.run_command('git', 'show', ':partial.png'), staged)


if __name__ == '__main__':
    unittest.main()
