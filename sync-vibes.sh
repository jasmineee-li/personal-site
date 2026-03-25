#!/bin/bash
# Sync vibes images from local folder to public/vibes/, then commit & push.
# Usage:
#   ./sync-vibes.sh          # sync, commit, and push
#   ./sync-vibes.sh --dry    # just sync, don't commit/push

SOURCE="$HOME/Documents/vibes"
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST="$REPO_DIR/public/vibes"

if [ ! -d "$SOURCE" ]; then
  echo "Source folder not found: $SOURCE"
  exit 1
fi

mkdir -p "$DEST"

# Copy all image files
rsync -av \
  --include='*.png' --include='*.jpg' --include='*.jpeg' \
  --include='*.webp' --include='*.gif' \
  --include='*.PNG' --include='*.JPG' --include='*.JPEG' \
  --exclude='*' \
  "$SOURCE/" "$DEST/"

echo "Synced vibes from $SOURCE to $DEST"

# If --dry flag, stop here
if [ "$1" = "--dry" ]; then
  exit 0
fi

# Check if there are any changes to commit
cd "$REPO_DIR"
if git diff --quiet public/vibes/ && [ -z "$(git ls-files --others --exclude-standard public/vibes/)" ]; then
  echo "No new vibes to deploy."
  exit 0
fi

# Commit and push
git add public/vibes/
git commit -m "Update vibes $(date +%Y-%m-%d)"
git push

echo "Vibes deployed!"
