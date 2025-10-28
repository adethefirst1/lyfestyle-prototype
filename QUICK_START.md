# ⚡ Quick Start - Lyfestyle

## 🚀 3 Commands to Get Started

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Visit: http://localhost:3000
```

**Done!** Your app is running. 🎉

---

## 📍 Where to Go

| URL | Page | What to See |
|-----|------|-------------|
| `/` | Home | Hero, search, categories, featured businesses |
| `/businesses` | Listing | Filter and browse all businesses |
| `/business/1` | Profile | Complete business profile (try IDs 1-10) |
| `/add-business` | Add Form | Multi-step business submission |
| `/dashboard` | Dashboard | User analytics and management |
| `/admin` | Admin | Verification management panel |
| `/about` | About | Mission, vision, values |

---

## 🎨 What's Included

### ✅ 8 Pages
- Home, Listing, Profile, Add Business, Dashboard, Admin, About, 404

### ✅ 6 Components  
- Navbar, Footer, BusinessCard, CategoryCard, SearchBar, FloatingCTA

### ✅ Mock Data
- 10 businesses across 6 categories

### ✅ Animations
- Framer Motion throughout, smooth transitions

### ✅ Responsive
- Mobile, tablet, desktop optimized

---

## 🎯 Next Steps

1. **Explore** - Browse all pages
2. **Customize** - Edit colors in `tailwind.config.js`
3. **Add Data** - Modify JSON files in `/data`
4. **Deploy** - Run `vercel` to go live

---

## 📝 Key Files

```
├── app/page.tsx              # Home page
├── app/businesses/page.tsx   # Listing page
├── components/Navbar.tsx     # Navigation
├── data/businesses.json      # Business data
├── tailwind.config.js        # Colors & theme
└── README.md                 # Full documentation
```

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start               # Run production build

# Deployment
vercel                   # Deploy to Vercel
```

---

## 🎨 Customization Quick Tips

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: { ... },    // Your brand color
  accent: { ... },     // Accent colors
}
```

### Add Business
Edit `data/businesses.json`:
```json
{
  "id": "11",
  "name": "Your Business",
  ...
}
```

### Change Brand Name
Search & replace "Lyfestyle" throughout the project.

---

## 📱 Test Checklist

- [ ] Home page loads
- [ ] Search works
- [ ] Category filtering works
- [ ] Business profile loads
- [ ] Forms render correctly
- [ ] Mobile menu works
- [ ] Animations are smooth
- [ ] No console errors

---

## 🐛 Troubleshooting

**Port in use?**
```bash
npx kill-port 3000
```

**Dependencies issue?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Cache issues?**
```bash
rm -rf .next
npm run dev
```

---

## 📚 Documentation

- **README.md** - Full documentation
- **SETUP.md** - Detailed setup guide
- **DEPLOYMENT.md** - Deploy instructions
- **PROJECT_SUMMARY.md** - Complete overview

---

## 💡 Pro Tips

1. **Hot Reload** - Changes auto-refresh
2. **TypeScript** - Errors won't block dev server
3. **Console** - Check for helpful logs
4. **Components** - Reusable across pages
5. **Mock Data** - Easy to edit JSON files

---

## 🎯 For Stakeholders

**Demo URLs to Show:**
1. Homepage - Impressive hero & features
2. `/businesses` - Working filters
3. `/business/1` - Complete profile
4. `/add-business` - Multi-step form
5. `/dashboard` - Analytics view

---

## ⚡ Speed Run

```bash
# Install → Run → Deploy
npm install && npm run dev

# In another terminal (optional)
vercel
```

**That's it!** 🚀

---

**Need More Help?**
- Check README.md for detailed docs
- All files are well-commented
- Documentation in each folder

---

**Built with ❤️ for Nigerian Businesses**

🎊 **Enjoy Your New Platform!** 🎊

