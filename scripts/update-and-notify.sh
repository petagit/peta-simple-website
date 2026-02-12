#!/bin/bash
set -e

cd "$(dirname "$0")/.."

echo "🔍 Fetching SEO news..."
node scripts/fetch-seo-news.js > /tmp/seo-news-update.txt 2>&1

if [ -f data/seo-news.json ]; then
  echo "✅ News data updated"
  
  # Commit and push
  git add data/seo-news.json
  if git diff --staged --quiet; then
    echo "📝 No changes to commit"
  else
    git commit -m "Update SEO news: $(date '+%Y-%m-%d %H:%M PST')"
    git push origin main
    echo "🚀 Pushed to GitHub (Vercel will auto-deploy)"
  fi
  
  # Send Telegram notification
  SUMMARY=$(cat /tmp/seo-news-update.txt | tail -15)
  openclaw gateway wake --text "📰 SEO News Updated!

$SUMMARY

🔗 Live: https://peta-simple-website.vercel.app/" --mode now
  
  echo "✉️ Telegram notification sent"
else
  echo "❌ Failed to generate news data"
  exit 1
fi
