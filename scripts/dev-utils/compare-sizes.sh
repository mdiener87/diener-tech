#!/usr/bin/env bash
# /scripts/dev-utils/compare-sizes.sh

set -e

IMG_DIR="../../public/"

printf "%-30s %12s %12s %10s\n" "File" "Original" "WebP" "Savings"

total_orig=0
total_webp=0

# Use process substitution instead of a pipe to preserve variable scope
while IFS= read -r img; do
  webp="${img%.*}.webp"
  if [[ -f "$webp" ]]; then
    orig_size=$(stat -c%s "$img" 2>/dev/null || stat -f%z "$img")
    webp_size=$(stat -c%s "$webp" 2>/dev/null || stat -f%z "$webp")

    # Skip if original file is 0 bytes
    if [[ "$orig_size" -eq 0 ]]; then
      continue
    fi

    total_orig=$(( total_orig + orig_size ))
    total_webp=$(( total_webp + webp_size ))

    saving=$(( orig_size - webp_size ))
    percent=$(awk "BEGIN {printf \"%.1f\", ($saving / $orig_size) * 100}")

    # Truncate/pad filename to 27 chars + "..."
    fname=$(basename "$img")
    if [[ ${#fname} -gt 27 ]]; then
      shortname="${fname:0:27}..."
    else
      shortname="$fname"
    fi

    printf "%-30s %10d KB %10d KB %7.1f%%\n" \
      "$shortname" \
      $((orig_size / 1024)) \
      $((webp_size / 1024)) \
      "$percent"
  fi
done < <(find "$IMG_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \))

echo "----------------------------------------------------------"
if [[ "$total_orig" -gt 0 ]]; then
  percent_total=$(awk "BEGIN {printf \"%.2f\", (($total_orig - $total_webp) / $total_orig) * 100}")
else
  percent_total=0
fi

printf "TOTAL ORIGINAL: %10d KB\n" $((total_orig / 1024))
printf "TOTAL WEBP:     %10d KB\n" $((total_webp / 1024))
printf "TOTAL SAVINGS:  %7.2f%%\n" "$percent_total"
