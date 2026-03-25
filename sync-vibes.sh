#!/bin/bash
# Sync vibes images from local folder to public/vibes/
# Usage: ./sync-vibes.sh
#
# This copies all images from ~/Documents/vibes into the repo's public/vibes/
# directory, then you can commit and push to update the site.

SOURCE="$HOME/Documents/vibes"
DEST="$(dirname "$0")/public/vibes"

if [ ! -d "$SOURCE" ]; then
  echo "Source folder not found: $SOURCE"
  exit 1
fi

mkdir -p "$DEST"

# Copy all image files (preserving newer files only)
rsync -av --include='*.png' --include='*.jpg' --include='*.jpeg' --include='*.webp' --include='*.gif' --include='*.PNG' --include='*.JPG' --include='*.JPEG' --exclude='*' "$SOURCE/" "$DEST/"

echo "Synced vibes from $SOURCE to $DEST"
echo "Don't forget to commit and push!"
