# Lyfestyle - Trusted Business Directory

A modern, futuristic business discovery and verification platform for Nigeria. Built with Next.js, TailwindCSS, and Framer Motion.

![Lyfestyle](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6?style=for-the-badge&logo=typescript)

## ✨ Features

- **🔍 Smart Search** - Find businesses by category, location, and services
- **✅ Verification System** - CAC and ID verification for trust and credibility
- **⭐ Reviews & Ratings** - User-generated reviews to help make informed decisions
- **📱 Fully Responsive** - Beautiful on desktop, tablet, and mobile
- **🎨 Glassmorphism Design** - Modern UI with blur effects and neon accents
- **🚀 Smooth Animations** - Framer Motion powered transitions and interactions
- **🏢 Business Dashboard** - Manage your business profile and track analytics
- **👨‍💼 Admin Panel** - Review and approve business verifications

## 🎯 Pages

- **Home** - Hero section, search, categories, featured businesses
- **Business Listing** - Filter and browse all businesses
- **Business Profile** - Detailed business information and reviews
- **Add Business** - Multi-step form to list your business
- **User Dashboard** - Analytics and profile management
- **Admin Dashboard** - Business verification management
- **About** - Mission, vision, and values
- **404** - Custom error page

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the repository**
```bash
cd Lyfestyle
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

That's it! The app is now running locally.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚢 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy
4. Your app will be live in minutes!

## 🎨 Design System

### Colors
- **Primary**: Deep blue (#4F46E5 - #6366F1)
- **Accent Purple**: #8B5CF6
- **Accent Neon**: #06B6D4
- **Background**: Slate 950

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, 700-900 weight
- **Body**: Regular, 400 weight

### Components
- **Glass Effects**: `backdrop-blur-md` with transparency
- **Neon Glow**: Custom box-shadow animations
- **Gradients**: Linear gradients for buttons and accents

## 📁 Project Structure

```
Lyfestyle/
├── app/                      # Next.js App Router
│   ├── about/               # About page
│   ├── add-business/        # Add business form
│   ├── admin/               # Admin dashboard
│   ├── business/[id]/       # Business profile (dynamic)
│   ├── businesses/          # Business listing
│   ├── dashboard/           # User dashboard
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── not-found.tsx        # 404 page
│   └── page.tsx             # Home page
├── components/              # Reusable components
│   ├── BusinessCard.tsx
│   ├── CategoryCard.tsx
│   ├── FloatingCTA.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── SearchBar.tsx
├── data/                    # Mock data
│   ├── businesses.json
│   └── categories.json
├── public/                  # Static assets
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## 🎭 Mock Data

The app includes mock data for:
- **10 Sample Businesses** across 6 categories
- **6 Business Categories** (Auto, Beauty, Tech, Food, Health, Home)
- Includes verified and unverified businesses
- Complete with ratings, reviews, and contact info

## 🔐 Verification System

Businesses can be verified through:
1. **CAC Certificate** - Corporate Affairs Commission registration
2. **ID Verification** - Owner identification
3. **Admin Review** - Manual verification by platform admins

## 📱 Responsive Design

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced experience (768px+)
- **Desktop**: Full-featured layout (1024px+)

## 🌟 Key Components

### Navbar
- Sticky header with glass effect
- Mobile-friendly hamburger menu
- Smooth scroll animations

### Business Cards
- Glassmorphic design
- Hover animations
- Verification badges
- Rating display

### Search Bar
- Dual input (category + location)
- Real-time filtering
- Gradient accent button

### Floating CTA
- Scroll-triggered appearance
- Pulsing animation
- Expandable on hover

## 🎨 Custom Utilities

```css
.glass                 /* Light glass effect */
.glass-strong          /* Strong glass effect */
.neon-glow            /* Neon box-shadow */
.neon-glow-hover      /* Hover neon effect */
.text-gradient        /* Gradient text */
.animated-bg          /* Animated gradient background */
```

## 📝 Environment Variables

No environment variables required for the prototype. For production, consider adding:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_MAPS_KEY=your_maps_key
```

## 🤝 Contributing

This is a prototype/demo project. Feel free to:
- Fork and customize
- Use as a template
- Learn from the code
- Build upon it

## 📄 License

This project is open source and available for educational and commercial use.

## 💡 Credits

Built with care for Nigerian businesses by the Odysia team.

**Tagline**: Discover Trusted Businesses Near You

---

## 🚀 Next Steps for Production

To make this production-ready:

1. **Backend Integration**
   - Connect to a real database (PostgreSQL, MongoDB)
   - Implement user authentication (NextAuth.js)
   - Build REST or GraphQL API

2. **Payment Integration**
   - Add Paystack for premium listings
   - Subscription management

3. **Enhanced Features**
   - Real-time chat
   - Email notifications
   - SMS verification
   - Google Maps integration
   - Image upload and optimization

4. **SEO & Analytics**
   - Add meta tags and OpenGraph
   - Implement Google Analytics
   - Sitemap generation

5. **Security**
   - Rate limiting
   - Input validation
   - CSRF protection
   - File upload security

---

**Need help?** Contact us at support@lyfestyle.ng

**Live Demo**: Deploy to see it live!

