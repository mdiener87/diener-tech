#!/bin/bash

# Recursively strip all metadata from images in /public
# Supported formats: .jpg .jpeg .png

TARGET_DIR="./public"

echo "🧼 Stripping metadata from images in: $TARGET_DIR"
echo "--------------------------------------------"

find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read -r img; do
    echo "🔍 Cleaning: $img"
    exiftool -overwrite_original -all= "$img"
done

echo "✅ Done. All image metadata purged."
