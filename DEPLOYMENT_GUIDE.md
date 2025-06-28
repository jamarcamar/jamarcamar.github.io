# 🚀 GITHUB PAGES DEPLOYMENT GUIDE

## Quick Start (5 minutes)

### Option A: Direct Upload (Easiest)
1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `jamarcamar.github.io` (replace with your username)
3. Make it **Public** and check "Add README"
4. Click "uploading an existing file"
5. Drag these files from your portfolio folder:
   - index.html
   - styles.css
   - script.js
   - README.md
   - .gitignore
6. Commit with message: "Deploy professional portfolio"
7. Go to Settings → Pages → Select "main" branch → Save
8. Your site will be live at: https://jamarcamar.github.io

### Option B: Using Git Commands
1. Create repository on GitHub (same as above)
2. Copy the repository URL
3. Open Terminal in your portfolio folder
4. Run these commands:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio deployment"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```
5. Enable GitHub Pages in repository settings

## 🎯 Repository Naming Options

**For Personal Site (Recommended):**
- Repository name: `yourusername.github.io`
- URL: `https://yourusername.github.io`

**For Project Site:**
- Repository name: `portfolio` or `data-science-portfolio`
- URL: `https://yourusername.github.io/portfolio`

## ⚡ Quick Checklist

- [ ] GitHub account created
- [ ] Repository created and set to Public
- [ ] Files uploaded (index.html, styles.css, script.js, README.md)
- [ ] GitHub Pages enabled in Settings
- [ ] Site is live (may take 5-10 minutes)

## 🔧 Troubleshooting

**Site not loading?**
- Check that repository is Public
- Verify GitHub Pages is enabled in Settings
- Wait 5-10 minutes for changes to take effect
- Ensure index.html is in the root folder

**Images not showing?**
- All file paths should be relative (no leading slash)
- Check file names for case sensitivity

**Want a custom domain?**
- Buy a domain from any provider
- Add it in Settings → Pages → Custom domain
- Update DNS settings with your domain provider

## 📱 Test Your Site

After deployment, test on:
- Desktop computer
- Mobile phone
- Tablet
- Different browsers (Chrome, Firefox, Safari)

## 🎉 Congratulations!

Your professional data science portfolio is now live! 

Share it with:
- Potential employers
- Professional networks
- LinkedIn profile
- Resume/CV

Need help? Check the README.md for detailed instructions.
