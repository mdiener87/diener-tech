#!/usr/bin/env bash
# /scripts/dev-utils/convert-to-webp.sh

set -e

IMG_DIR="./public/images"
MAX_SIZE=1200  # max width or height in pixels

find "$IMG_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r img; do
  webp="${img%.*}.webp"
  if [[ ! -f "$webp" ]]; then
    echo "Converting & resizing: $img → $webp"
    convert "$img" -resize "${MAX_SIZE}x${MAX_SIZE}>" -quality 80 "$webp"
  else
    echo "Skipping (already exists): $webp"
  fi
done
