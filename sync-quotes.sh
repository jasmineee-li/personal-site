#!/bin/bash
# Sync quotes from ~/Documents/quotes.md to the site and deploy.
# Commits to main via a dedicated detached worktree, so it works no matter
# which branch the primary checkout has out.
# Usage:
#   ./sync-quotes.sh          # sync, commit to main, push
#   ./sync-quotes.sh --dry    # just copy into the working tree for local dev
set -e

SOURCE="$HOME/Documents/quotes.md"
REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKTREE="$(dirname "$REPO_DIR")/.quotes-sync-worktree"

if [ ! -f "$SOURCE" ]; then
  echo "Source file not found: $SOURCE"
  exit 1
fi

# Copy into the working tree so `next dev` sees the latest quotes locally
mkdir -p "$REPO_DIR/content"
cp "$SOURCE" "$REPO_DIR/content/quotes.md"
echo "Synced quotes from $SOURCE"

# If --dry flag, stop here
if [ "$1" = "--dry" ]; then
  exit 0
fi

if [ ! -d "$WORKTREE" ]; then
  git -C "$REPO_DIR" worktree add --detach "$WORKTREE"
fi

cd "$WORKTREE"
git fetch origin main
git checkout --quiet --detach origin/main
mkdir -p content
cp "$SOURCE" content/quotes.md

if git status --porcelain content/quotes.md | grep -q .; then
  git add content/quotes.md
  git commit -m "Update quotes $(date +%Y-%m-%d)"
  git push origin HEAD:main
  echo "Quotes deployed! 🌩️"
else
  echo "No new quotes to deploy."
fi
