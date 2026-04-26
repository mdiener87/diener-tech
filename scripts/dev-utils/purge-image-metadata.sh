#!/usr/bin/env bash

# Scan for images with extended metadata and remove it in place.
# Relies on exiftool + jq and uses the same allowlist as validate-metadata.sh.

set -euo pipefail

TARGET_DIR="${1:-./public}"

if ! command -v exiftool >/dev/null 2>&1; then
  echo "❌ exiftool is required but was not found in PATH." >&2
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "❌ jq is required but was not found in PATH." >&2
  exit 1
fi

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "❌ Target directory '$TARGET_DIR' does not exist." >&2
  exit 1
fi

echo "🧼 Scanning for image metadata under: $TARGET_DIR"

find_expr=(
  -type f
  \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp'
     -o -iname '*.gif' -o -iname '*.avif' -o -iname '*.bmp' -o -iname '*.tif'
     -o -iname '*.tiff' -o -iname '*.ico' \)
)

mapfile -d '' -t images < <(find "$TARGET_DIR" "${find_expr[@]}" -print0 | sort -z)

ALLOWED_PATTERN='^(SourceFile$|(File|System|ExifTool|Composite|PNG|GIF|RIFF|BMP|ICO):)'

image_count=${#images[@]}
cleaned_count=0

for img in "${images[@]}"; do
  metadata_json=$(exiftool -a -G1 -s -json "$img")
  disallowed=$(
    jq --arg pattern "$ALLOWED_PATTERN" '
      .[0]
      | to_entries
      | map(select((.key | test($pattern)) | not))
    ' <<<"$metadata_json"
  )

  if [[ "$disallowed" == "[]" ]]; then
    continue
  fi

  ((cleaned_count+=1))
  echo "➡️  Removing metadata from $img"
  exiftool -overwrite_original -all= "$img" >/dev/null
done

if (( image_count == 0 )); then
  echo "ℹ️  No images found under $TARGET_DIR"
  exit 0
fi

if (( cleaned_count == 0 )); then
  echo "✅ No extended metadata found in $image_count image(s)."
  exit 0
fi

echo "✅ Removed metadata from $cleaned_count image(s)."
