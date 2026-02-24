# Learnova Frontend 🎓

Learnova is a premium, high-performance Learning Management System (LMS) frontend built with **Next.js 16**, **React 19**, **TypeScript**, and **Framer Motion**. It provides a stunning, interactive experience for students, instructors, and administrators.

---

## 🎯 Project Motive & Vision

Modern education deserves a modern interface. **Learnova** was born from the vision of creating an educational platform that doesn't just deliver content but provides an *experience*. 

Our motive is to:
- **Democratize Learning**: Make premium course consumption accessible and intuitive.
- **Empower Instructors**: Provide content creators with robust tools to manage and analyze their impact.
- **Prioritize UX**: Prove that enterprise-level LMS tools can be beautiful, fast, and delightful to use.

---

## 🧠 How it Works (Architecture)

Learnova follows a modern **Unified Fullstack Architecture** (using Next.js as the core) while maintaining a clean separation of concerns:

1.  **Server-Side Excellence**: Utilizing **Next.js App Router**, we maximize SEO and performance by rendering static parts on the server and dynamic parts on the client using **React Server Components (RSC)**.
2.  **State Orchestration**: 
    - **Global State**: Managed via **Redux Toolkit** for complex UI states (like sidebar toggles, global loading, and session persistence).
    - **Form State**: Handled by **React Hook Form** with **Zod** schema validation for bulletproof data integrity.
3.  **Authentication Flow**: Integrated with **NextAuth.js v5**, supporting multi-layered auth including Google/GitHub OAuth, traditional credentials, and OTP verification.
4.  **Data Synchronization**: Communicates with a high-performance backend via optimized fetch requests, leveraging Next.js caching and revalidation logic.

---

## ✨ Specialities & Unique Selling Points

What makes Learnova stand out in the crowded LMS market?

- **Premium Aesthetics**: Unlike generic templates, Learnova uses custom **glassmorphism**, sleek gradients, and a curated color palette to feel like a high-end SaaS product.
- **Immersive Animations**: Every interaction—from page transitions to button hovers—is choreographed with **Framer Motion** to provide tactile feedback.
- **Role-Centric Design**: 
    - **Students**: Focused on focus-mode learning and progress tracking.
    - **Instructors**: A data-driven dashboard for course management.
    - **Admins**: A command center for platform-wide oversight.
- **Modular Component Library**: Built on top of **Shadcn/UI**, allowing for rapid scaling and consistent design language across the entire app.

---

## 🛠️ Technology Stack & Reasoning

We chose our stack based on performance, scalability, and modern standards:

| Technology | Why we use it? |
| :--- | :--- |
| **Next.js 16** | The gold standard for React frameworks with unmatched SSR/ISR capabilities. |
| **React 19** | Access to Server Actions and the built-in React Compiler for optimized builds. |
| **TypeScript** | Ensures type safety, reduces runtime bugs, and provides a superior Developer Experience (DX). |
| **Tailwind CSS 4** | Ultra-efficient styling that scales without bloating the CSS bundle. |
| **Framer Motion** | Industry-leading animation library for complex layout changes and scroll-driven effects. |
| **Redux Toolkit** | Manages complex application state across nested routes as a "single source of truth". |
| **Lucide Icons** | Consistent, modern, and accessible icon set for a premium feel. |

---

## 🚀 Setup Instructions

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

## 📑 Key Features
- **Advanced Auth**: Social login, OTP verification, and secure password resets.
- **Dynamic Course Explorer**: Intelligent searching and filtering.
- **Student Dashboard**: Progress tracking and course management.
- **Instructor Suite**: Course creation and analytics.
- **Admin Command Center**: Complete user and category control.

---

## 🧪 Testing Credentials
Admin test account:
- **Email**: `admin@learnnova.com`
- **Password**: `learnnova123`

---

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

