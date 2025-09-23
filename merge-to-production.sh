#!/bin/bash

echo "🚀 Merging deploy-to-netlify to main and cleaning up..."

# Switch to main branch
echo "📦 Switching to main branch..."
git checkout main

# Pull latest changes
echo "⬇️ Pulling latest changes..."
git pull origin main

# Merge the deploy-to-netlify branch
echo "🔄 Merging deploy-to-netlify branch..."
git merge deploy-to-netlify

# Push merged changes to main
echo "⬆️ Pushing to main..."
git push origin main

# Delete local branch
echo "🗑️ Deleting local deploy-to-netlify branch..."
git branch -d deploy-to-netlify

# Delete remote branch
echo "🗑️ Deleting remote deploy-to-netlify branch..."
git push origin --delete deploy-to-netlify

# Create a test file to verify production deployment
echo "✅ Creating production test file..."
echo "Production deployment successful - $(date)" > production-test.txt
git add production-test.txt
git commit -m "Test production auto-deploy after merge"
git push origin main

echo ""
echo "✅ SUCCESS! Your changes have been merged to main branch."
echo ""
echo "📋 NEXT STEPS:"
echo "1. Go to: https://app.netlify.com/sites/statuesque-tanuki-8b8d8b/settings/deploys"
echo "2. Under 'Production branch', change from 'deploy-to-netlify' to 'main'"
echo "3. Your site will auto-deploy from main branch going forward!"
echo ""
echo "🌐 Live site: https://statuesque-tanuki-8b8d8b.netlify.app"
