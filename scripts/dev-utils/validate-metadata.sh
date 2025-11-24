#!/usr/bin/env bash

# Validate that images do not contain extended metadata beyond basic container info.
# Relies on exiftool + jq and inspects every supported image in the target directory.

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

echo "🔍 Scanning images under: $TARGET_DIR"

find_expr=(
  -type f
  \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp'
     -o -iname '*.gif' -o -iname '*.avif' -o -iname '*.bmp' -o -iname '*.tif'
     -o -iname '*.tiff' -o -iname '*.ico' \)
)

mapfile -d '' -t images < <(find "$TARGET_DIR" "${find_expr[@]}" -print0 | sort -z)

ALLOWED_PATTERN='^(SourceFile$|(File|System|ExifTool|Composite|PNG|GIF|RIFF|BMP|ICO):)'

image_count=${#images[@]}
violations=0

for img in "${images[@]}"; do
  metadata_json=$(exiftool -a -G1 -s -json "$img")
  disallowed=$(
    jq --arg pattern "$ALLOWED_PATTERN" '
      .[0]
      | to_entries
      | map(select((.key | test($pattern)) | not))
    ' <<<"$metadata_json"
  )

  if [[ "$disallowed" != "[]" ]]; then
    ((violations+=1))
    echo "⚠️  $img still contains extended metadata:"
    jq -r '
      .[] | "   - \(.key): \(.value|tostring)"
    ' <<<"$disallowed"
  fi
done

if (( image_count == 0 )); then
  echo "ℹ️  No images found under $TARGET_DIR"
  exit 0
fi

if (( violations > 0 )); then
  echo "❌ $violations file(s) contain metadata that should be removed."
  exit 1
fi

echo "✅ All $image_count image(s) are free of extended metadata."
