#!/bin/bash
# RIG SEO Daily Pipeline
# Generates blog posts from transcripts and deploys to rodgersintelligence.com
# Run via cron: 0 10 * * * /Users/rig128gb/Developer/rig-os-site/scripts/seo-daily.sh

set -e
cd /Users/rig128gb/Developer/rig-os-site

LOG="/Users/rig128gb/.agentic-os/logs/seo-daily.log"
mkdir -p "$(dirname "$LOG")"
echo "[$(date)] SEO daily pipeline started" >> "$LOG"

# Check for new transcripts
TRANSCRIPTS_DIR="/Users/rig128gb/Documents/JakeStudio/transcripts"
if [ ! -d "$TRANSCRIPTS_DIR" ] || [ -z "$(ls -A "$TRANSCRIPTS_DIR" 2>/dev/null)" ]; then
  echo "[$(date)] No transcripts found, skipping" >> "$LOG"
  exit 0
fi

# Count existing posts
POSTS_DIR="$PWD/blog/posts"
POST_COUNT=$(ls "$POSTS_DIR"/*.html 2>/dev/null | wc -l | tr -d ' ')
echo "[$(date)] Current posts: $POST_COUNT" >> "$LOG"

# Git push any new content
git add blog/ 2>/dev/null || true
if git diff --cached --quiet 2>/dev/null; then
  echo "[$(date)] No changes to commit" >> "$LOG"
else
  git commit -m "SEO daily: $(date +%Y-%m-%d) auto-publish" 2>/dev/null || true
  git push origin HEAD 2>/dev/null || echo "[$(date)] Push failed (will retry next run)" >> "$LOG"
  echo "[$(date)] Pushed new content" >> "$LOG"
fi

echo "[$(date)] SEO daily pipeline complete" >> "$LOG"