# 🚀 Hero Kidz - Premium E-Commerce Platform for Kids

<img src="./public/assets/hero.png" alt="Hero Kidz Banner" width="100%">

📖 Overview
Hero Kidz is a production-ready, full-stack e-commerce web application designed for selling premium children's products. Built with Next.js 15, NextAuth.js, and Tailwind CSS, this platform delivers a seamless shopping experience with modern UI/UX, secure authentication, and real-time features.

✨ Live Demo: hero-kidz.vercel.app

🌟 Key Features
🛍️ Core E-Commerce

📋 Product Catalog - Browse 20+ curated educational toys & accessories

🔍 Advanced Search & Filtering - Category, price range, rating filters

🛒 Dynamic Shopping Cart - Add/remove items, update quantities, real-time total

❤️ Wishlist - Save favorite products with localStorage persistence

📦 Order Management - Track orders, view order history

-----------------------

🔐 Authentication & Security
🔑 Google OAuth 2.0 - One-click sign-in with Google

🛡️ Protected Routes - Middleware-based route protection

👤 User Profile - Dynamic profile with avatar, member since date

🔒 Secure Session Management - NextAuth.js with JWT

🎨 User Experience
📱 Fully Responsive - Works on all devices (mobile-first)

🌙 Modern UI/UX - Clean, colorful, child-friendly design

⚡ Smooth Animations - Framer Motion powered interactions

📧 Contact Form - Nodemailer integration for customer inquiries

📝 Dynamic Blog - Markdown-based content management

🛠️ Technical Features
🏗️ App Router - Next.js 15 latest architecture

🎯 Server Components - Optimized performance

🗄️ LocalStorage - Cart & wishlist persistence

📊 Analytics Ready - SEO-optimized metadata

🛠️ Technology Stack
Frontend
Technology Purpose
Next.js 15 React Framework (App Router)
React 19 UI Library
Tailwind CSS Utility-first CSS
DaisyUI Component Library
Framer Motion Animations
React Icons Icon Library
Backend & Authentication
Technology Purpose
NextAuth.js Authentication (Google OAuth)
Nodemailer Email sending (Contact form)
Gray-Matter Markdown parsing
Remark Markdown to HTML
Development Tools
Technology Purpose
ESLint Code linting
PostCSS CSS processing
Vercel Deployment
📂 Project Structure
text
hero-kidz/
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ ├── auth/[...nextauth]/ # NextAuth configuration
│ │ │ └── contact/route.js # Contact form API
│ │ ├── blog/ # Blog pages
│ │ │ ├── page.jsx # Blog listing
│ │ │ └── [slug]/page.jsx # Dynamic blog post
│ │ ├── cart/page.jsx # Shopping cart
│ │ ├── contact/page.jsx # Contact page
│ │ ├── login/page.jsx # Login page
│ │ ├── products/ # Product pages
│ │ │ ├── page.jsx # Product listing
│ │ │ └── [id]/page.jsx # Dynamic product details
│ │ ├── profile/page.jsx # User profile
│ │ ├── wishlist/page.jsx # Wishlist page
│ │ └── layout.jsx # Root layout with providers
│ ├── Components/
│ │ ├── Auth/
│ │ │ └── LoginPage.jsx # Login component
│ │ ├── Blog/
│ │ │ ├── BlogCard.jsx # Blog post card
│ │ │ └── BlogList.jsx # Blog listing component
│ │ ├── Cart/
│ │ │ └── CartPage.jsx # Cart page component
│ │ ├── Contact/
│ │ │ └── ContactPage.jsx # Contact form
│ │ ├── Home/
│ │ │ └── Banner.jsx # Hero banner
│ │ ├── Layouts/
│ │ │ ├── Navbar.jsx # Navigation with user menu
│ │ │ └── Footer.jsx # Footer component
│ │ ├── Products/
│ │ │ ├── Products.jsx # Product listing with filters
│ │ │ └── ProductDetails.jsx # Product details component
│ │ ├── Profile/
│ │ │ └── ProfilePage.jsx # User profile
│ │ ├── UI/
│ │ │ ├── AddToCartButton.jsx # Add to cart button
│ │ │ ├── BuyNowButton.jsx # Buy now button
│ │ │ └── CartModal.jsx # Success modal
│ │ └── Wishlist/
│ │ └── WishlistPage.jsx # Wishlist component
│ ├── context/
│ │ ├── CartContext.jsx # Cart state management
│ │ └── WishlistContext.jsx # Wishlist state management
│ ├── content/
│ │ └── blog/ # Markdown blog posts
│ │ ├── top-10-educational-toys.md
│ │ ├── how-to-choose-safe-toys.md
│ │ └── ... (5 blog posts)
│ ├── data/
│ │ └── toys.json # Product data (20+ products)
│ ├── lib/
│ │ └── blog.js # Markdown parsing utilities
│ ├── providers/
│ │ └── SessionProvider.jsx # NextAuth session provider
│ └── middleware.js # Route protection
├── public/
│ └── assets/ # Images, fonts, icons
├── .env.local # Environment variables
├── next.config.js # Next.js configuration
├── tailwind.config.js # Tailwind configuration
├── package.json # Dependencies
└── README.md # Project documentation
🚀 Getting Started
Prerequisites
Node.js (v18.17 or higher)

npm (v9 or higher)

Git

Installation
bash

# 1. Clone the repository

git clone https://github.com/yourusername/hero-kidz.git
cd hero-kidz

# 2. Install dependencies

npm install

# 3. Create .env.local file

# Copy the environment variables template below

# 4. Start development server

npm run dev
Environment Variables
Create a .env.local file in the root directory:

env

# NextAuth Configuration

NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Get from Google Cloud Console)

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration (for contact form)

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
🔑 Setting Up Google OAuth
Go to Google Cloud Console

Create a new project or select existing

Navigate to APIs & Services → Credentials

Click Create Credentials → OAuth Client ID

Application Type: Web Application

Authorized redirect URIs: http://localhost:3000/api/auth/callback/google

Copy Client ID and Client Secret to .env.local

📧 Email Setup (for Contact Form)
Enable 2-Factor Authentication on your Gmail

Go to Google App Passwords

Generate app password for "Mail" → "Other (Custom name)"

Copy the 16-character password to EMAIL_PASS

📦 Available Scripts
bash

# Development

npm run dev # Start development server
npm run build # Build for production
npm run start # Start production server

# Code Quality

npm run lint # Run ESLint

# Deployment

vercel # Deploy to Vercel
🗺️ Project Routes
Route Description Authentication
/ Homepage with banner & featured products Public
/products Product listing with filters & sorting Public
/products/[id] Product details page Public
/cart Shopping cart management ✅ Protected
/wishlist User wishlist ✅ Protected
/profile User profile page ✅ Protected
/login Login page (Google OAuth) Public
/blog Blog listing Public
/blog/[slug] Dynamic blog post Public
/contact Contact form with Nodemailer Public
🎨 UI/UX Design Highlights
Brand Colors
css
/_ Primary Gradient _/
--gradient-pink: from-pink-500 to-rose-500

/_ Brand Colors _/
--primary: #EC4899 (pink-500)
--secondary: #8B5CF6 (purple-500)
--accent: #F59E0B (yellow-500)

/_ Background _/
--bg-gradient: from-pink-50 via-white to-purple-50
Design Features
✅ Glassmorphism - Backdrop blur effects on cards

✅ Micro-interactions - Hover animations, scale effects

✅ Smooth Transitions - Framer Motion animations

✅ Responsive Grid - Mobile-first design

✅ Accessible - Semantic HTML, ARIA labels

📊 Real-World Impact
For Parents
🧠 Educational Focus - Products that promote learning through play

🔒 Safety First - All products are non-toxic & child-safe

💰 Value for Money - Competitive pricing with discounts

🚚 Convenience - Easy online shopping from home

For Business
📈 Scalable - Easy to add new products and categories

🎯 Targeted Marketing - Blog content drives organic traffic

💬 Customer Engagement - Contact form & feedback system

📱 Mobile-Optimized - Reach customers on all devices

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit changes: git commit -m 'Add amazing feature'

Push to branch: git push origin feature/amazing-feature

Open a Pull Request

👥 Team
Role Name GitHub
Lead Developer Your Name @yourusername
📄 License
All assets and code are proprietary to Hero Kidz. All rights reserved.

🙏 Acknowledgments
Next.js - React Framework

NextAuth.js - Authentication

Tailwind CSS - Styling

DaisyUI - Components

Framer Motion - Animations

All open-source contributors

📫 Connect With Us
Website: hero-kidz.vercel.app

Email: support@herokidz.com

GitHub: github.com/yourusername/hero-kidz

<div align="center"> <h3>⭐ Made with ❤️ by Hero Kidz Team ⭐</h3> <p><strong>Learn • Play • Grow</strong></p> </div>
