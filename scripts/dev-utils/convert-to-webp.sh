#!/usr/bin/env bash
# /scripts/dev-utils/convert-to-webp.sh

set -e

IMG_DIR="../../public/"

find "$IMG_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r img; do
  webp="${img%.*}.webp"
  if [[ ! -f "$webp" ]]; then
    echo "Converting: $img → $webp"
    cwebp -q 80 "$img" -o "$webp"
  else
    echo "Skipping (already exists): $webp"
  fi
done
