# Learnova Frontend 🎓

Learnova is a premium, high-performance Learning Management System (LMS) frontend built with **Next.js 15**, **React 19**, and **Framer Motion**. It provides a stunning, interactive experience for students, instructors, and administrators.

## 🌟 Why Learnova?
Learnova is designed for modern education. Whether you are an instructor sharing your expertise or a student looking to upskill, our platform offers:
- **Premium Aesthetics**: A clean, modern UI with glassmorphism effects and vibrant accents.
- **Smooth Interaction**: Fluid animations and page transitions powered by Framer Motion.
- **Lightning Fast**: Optimized server-side rendering and client-side transitions.
- **Role-Based Experience**: Dedicated workspaces for Students, Instructors, and Admins.

---

## ✨ Key Features
- **Responsive Landing Page**: High-conversion hero sections and featured course displays.
- **Advanced Auth Flow**: Social login (Google/Github), OTP verification, and secure password resets.
- **Dynamic Course Explorer**: Powerful search and filtering to find the perfect course.
- **Student Dashboard**: Track progress, manage wishlist, and view enrolled courses.
- **Instructor Dashboard**: Analytics, course creation tools, and student management.
- **Admin Suite**: Comprehensive user and category management with search synchronization.
- **Real-time Feedback**: Toast notifications and global loading states for a seamless feel.

---

## 🛠️ Setup Instructions

### 1. Installation
```bash
git clone <repository-url>
cd learnnova
pnpm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# URL
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="your_nextauth_secret"

# OAuth Providers
GOOGLE_CLIENT_ID="your_google_id"
GOOGLE_CLIENT_SECRET="your_google_secret"
GITHUB_CLIENT_ID="your_github_id"
GITHUB_CLIENT_SECRET="your_github_secret"

# Backend API
NEXT_PUBLIC_API_URL="http://localhost:5000"

# FingerprintJS (Optional)
NEXT_PUBLIC_FINGERPRINT_API_KEY="your_api_key"
```

### 3. Start Development Server
```bash
pnpm dev
```

---

## 🏗️ Architecture & Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) & [Lucide React Icons](https://lucide.dev)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Auth**: [NextAuth.js v5](https://nextauth.js.org)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org)
- **Forms**: [React Hook Form](https://react-hook-form.com) & [Zod](https://zod.dev)

---

## 🧪 Testing Credentials
For easy testing, you can use the default admin account:
- **Email**: `admin@learnnova.com`
- **Password**: `learnnova123`

---

## 📄 License
This project is proprietary and for educational purposes.
