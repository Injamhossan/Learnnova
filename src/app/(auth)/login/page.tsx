
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Visual & Testimonial */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 flex-col justify-between p-12 overflow-hidden">
        {/* Background Pattern/Gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 hover:scale-105 transition-transform duration-[20s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity w-fit">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md">
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-yellow-500" />
            ))}
          </div>
          <h2 className="text-4xl font-bold text-white font-satoshi mb-6 leading-tight">
            "The personalized learning path helped me master Python in just 4 weeks."
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold border border-white/20">
              JP
            </div>
            <div>
              <p className="text-white font-bold">Jessica Parker</p>
              <p className="text-slate-400 text-sm">Data Scientist at Google</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex gap-6 text-sm text-slate-400">
            <span>© 2026 Learnova</span>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <LoginForm />
    </div>
  );
}
