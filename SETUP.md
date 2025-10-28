# Quick Setup Guide

## 🎯 Get Started in 3 Steps

### 1️⃣ Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14.2
- React 18.3
- TailwindCSS 3.4
- Framer Motion 11
- Lucide React (icons)
- TypeScript

### 2️⃣ Start Development Server

```bash
npm run dev
```

The app will start at `http://localhost:3000`

### 3️⃣ Open Your Browser

Visit `http://localhost:3000` and explore!

---

## 📱 What You'll See

### Home Page (`/`)
- Beautiful hero section with animated background
- Search bar for finding businesses
- Recently verified businesses carousel
- Category grid
- Top verified businesses
- Features section
- Call-to-action

### Business Listing (`/businesses`)
- Filterable business grid
- Category filter
- City filter
- Verified-only filter
- Rating filter
- Search integration

### Business Profile (`/business/[id]`)
- Business details and banner
- Verification badges
- Services offered
- Reviews section
- Contact information
- Call-to-action buttons

### Add Business (`/add-business`)
- Multi-step form (4 steps)
- Business details input
- Contact information
- Document upload
- Preview and submit

### User Dashboard (`/dashboard`)
- Analytics overview
- View count, rating stats
- Recent reviews
- Quick actions
- Verification status

### Admin Dashboard (`/admin`)
- Pending verifications
- Approve/reject businesses
- Platform statistics

### About (`/about`)
- Mission and vision
- Core values
- Impact statistics
- Team information

### 404 Page
- Custom animated error page
- Quick navigation back

---

## 🎨 Features Highlights

### ✨ Design Elements
- **Glassmorphism**: Frosted glass effects throughout
- **Neon Glow**: Subtle glowing animations on hover
- **Gradient Text**: Beautiful gradient headings
- **Smooth Animations**: Framer Motion powered

### 🎭 Animations
- Page transitions (fade + slide)
- Scroll-triggered animations
- Hover effects on cards
- Loading states
- Floating CTA button
- Pulsing effects

### 📱 Responsive
- Mobile-first design
- Breakpoints: 640px, 768px, 1024px, 1280px
- Hamburger menu on mobile
- Touch-friendly interactions

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server (port 3000)

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

---

## 📂 Exploring the Code

### Key Files to Check Out

1. **`app/globals.css`** - Custom TailwindCSS utilities
2. **`tailwind.config.js`** - Theme configuration
3. **`components/Navbar.tsx`** - Navigation with animations
4. **`app/page.tsx`** - Home page implementation
5. **`data/businesses.json`** - Mock business data

### Mock Data

Located in `/data/`:
- **`businesses.json`** - 10 sample businesses
- **`categories.json`** - 6 business categories

Feel free to edit these to test different scenarios!

---

## 🎯 Common Tasks

### Add a New Business Category

1. Open `data/categories.json`
2. Add your category object:
```json
{
  "id": "your-category",
  "name": "Your Category Name",
  "icon": "IconName",
  "description": "Brief description",
  "color": "from-color-500 to-color-500",
  "count": 0
}
```

### Add a New Business

1. Open `data/businesses.json`
2. Add your business object following the existing structure
3. Refresh the page - it will appear automatically!

### Change Color Theme

1. Open `tailwind.config.js`
2. Modify the color values in `theme.extend.colors`
3. Save and see changes instantly

### Customize Animations

1. Check `app/globals.css` for animation definitions
2. Edit `keyframes` section for timing
3. Apply with `animate-[name]` classes

---

## 🐛 Troubleshooting

### Port 3000 Already in Use?

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Styling Not Applied?

```bash
# Restart dev server
# Press Ctrl+C, then
npm run dev
```

### TypeScript Errors?

The app is built with TypeScript but configured to be forgiving. Most errors won't prevent compilation.

### Module Not Found?

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 🎓 Learning Resources

### Understanding the Stack

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **TailwindCSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion/)
- **Lucide Icons**: [lucide.dev](https://lucide.dev)

### Key Concepts Used

- **App Router** (Next.js 14)
- **Server & Client Components**
- **Dynamic Routes** (`[id]`)
- **Suspense** for loading states
- **CSS Custom Properties**
- **Responsive Design**
- **Animation variants**

---

## 💡 Tips for Customization

### Change Brand Name
Search and replace "Lyfestyle" throughout the codebase with your brand name.

### Update Colors
Modify `tailwind.config.js` color palette to match your brand.

### Add Pages
Create new folders in `/app` directory - Next.js auto-creates routes!

### Integrate Backend
Replace mock data imports with API calls using `fetch` or a library like `axios`.

---

## 📞 Need Help?

- Check the main `README.md` for detailed documentation
- Review `DEPLOYMENT.md` for deployment guides
- Inspect component files - they're well-commented!
- Google is your friend for specific Next.js questions

---

## 🚀 Next Steps

Once you're comfortable:

1. ✅ Customize the content and branding
2. ✅ Add your own business data
3. ✅ Deploy to Vercel (see DEPLOYMENT.md)
4. ✅ Share with stakeholders
5. ✅ Integrate real backend (optional)

---

**Enjoy building with Lyfestyle!** 🎉

*Built with ❤️ by Odysia*

