#!/usr/bin/env bash
# /scripts/dev-utils/replace-image-extensions-with-webp.sh
#
# Replace image references in markdown to use matching .webp filenames.
# - If a markdown file path is provided, only that file is updated.
# - If no argument is provided, all markdown files under /content/blog are processed.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
BLOG_DIR="$REPO_ROOT/content/blog"

usage() {
  echo "Usage: $(basename "$0") [path/to/file.md]" >&2
  exit 1
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
fi

if ! command -v perl >/dev/null 2>&1; then
  echo "❌ perl is required but was not found in PATH." >&2
  exit 1
fi

declare -a files=()

if [[ -n "${1:-}" ]]; then
  target="${1}"
  if [[ -f "$target" ]]; then
    files=("$target")
  elif [[ -f "$REPO_ROOT/$target" ]]; then
    files=("$REPO_ROOT/$target")
  else
    echo "❌ File not found: $target" >&2
    exit 1
  fi
else
  if [[ ! -d "$BLOG_DIR" ]]; then
    echo "❌ Expected blog directory not found: $BLOG_DIR" >&2
    exit 1
  fi

  mapfile -d '' -t files < <(find "$BLOG_DIR" -type f -name '*.md' -print0 | sort -z)

  if [[ ${#files[@]} -eq 0 ]]; then
    echo "ℹ️  No markdown files found under $BLOG_DIR" >&2
    exit 0
  fi
fi

for file in "${files[@]}"; do
  echo "Updating $file"
  # Replace .png/.jpg/.jpeg (any casing) suffixes with .webp inside likely image paths/attributes.
  perl -0pi -e 's/((?:[A-Za-z0-9._-]+\/)*[A-Za-z0-9._-]+)\.(png|jpe?g)/$1.webp/gi' "$file"
done

echo "✅ Done."
