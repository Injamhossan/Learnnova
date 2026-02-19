
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Github, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import NavLogo from "@/assets/NavLogo.png";

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
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-24 xl:p-32 relative">
        <div className="max-w-[400px] w-full mx-auto">
            
            {/* Mobile Back Button */}
            <Link href="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back
            </Link>

            <div className="mb-10">
                <Image src={NavLogo} alt="Logo" width={120} height={40} className="h-10 w-auto object-contain mb-6" />
                <h1 className="text-3xl font-bold text-slate-900 font-satoshi mb-2">Welcome back</h1>
                <p className="text-slate-500 font-manrope">Please enter your details to sign in.</p>
            </div>

            <form className="space-y-5">
                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                        <Github className="w-5 h-5" />
                        GitHub
                    </button>
                </div>

                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase font-medium">Or log in with</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-900" htmlFor="email">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                id="email"
                                type="email" 
                                placeholder="name@example.com"
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all font-manrope text-sm"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-900" htmlFor="password">Password</label>
                            <a href="#" className="text-sm font-medium text-yellow-600 hover:text-yellow-700">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                id="password"
                                type="password" 
                                placeholder="Create a password"
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all font-manrope text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" className="rounded border-slate-300 text-yellow-500 focus:ring-yellow-500" />
                    <label htmlFor="remember" className="text-sm text-slate-600 select-none">Remember for 30 days</label>
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] font-satoshi">
                    Log in
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600 font-manrope">
                Don't have an account?{' '}
                <Link href="/signup" className="font-bold text-slate-900 hover:text-yellow-600 transition-colors">
                    Sign up for free
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
