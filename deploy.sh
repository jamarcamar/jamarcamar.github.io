#!/bin/bash

# GitHub Pages Deployment Script for Portfolio
# Run this script to initialize git and prepare for GitHub upload

echo "🚀 Preparing portfolio for GitHub Pages deployment..."

# Remove old git files if they exist
rm -rf .git

# Initialize new git repository
echo "📁 Initializing git repository..."
git init

# Add all files
echo "📝 Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Professional data science portfolio

- Professional blog-style design
- Responsive layout for all devices
- Career timeline and project showcases
- Contact form with validation
- Modern UI/UX optimized for data science professionals"

echo "✅ Git repository initialized successfully!"
echo ""
echo "🔄 Next steps:"
echo "1. Create a new repository on GitHub named 'yourusername.github.io' or 'portfolio'"
echo "2. Copy the repository URL"
echo "3. Run: git remote add origin YOUR_GITHUB_REPO_URL"
echo "4. Run: git branch -M main"
echo "5. Run: git push -u origin main"
echo ""
echo "🌐 Your portfolio will be live at: https://yourusername.github.io"
echo ""
echo "📚 For detailed instructions, see the README.md file"
