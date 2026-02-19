"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Mail, Lock, CheckCircle2, GraduationCap, Presentation } from "lucide-react";
import Image from "next/image";
import NavLogo from "@/assets/NavLogo.png";

export default function SignupPage() {
  const [role, setRole] = useState<'student' | 'instructor'>('student');

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 flex-col justify-between p-12 overflow-hidden">
        {/* Background Pattern/Gradient */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-cover bg-center opacity-20 hover:scale-105 transition-transform duration-[20s] ${role === 'student' ? "bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000')]" : "bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2000')]"}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        {/* Logo */}
        <div className="relative z-10 w-full">
            <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity w-fit">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
            </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-md">
            <div className="flex gap-4 mb-8">
                <div className="flex -space-x-4">
                    {[1,2,3,4].map((i) => (
                        <div key={i} className={`w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs text-white`}>
                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full rounded-full object-cover" />
                        </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-yellow-500 flex items-center justify-center text-xs font-bold text-slate-900 z-10">
                        {role === 'student' ? '2k+' : '50+'}
                    </div>
                </div>
            </div>
            
          <h2 className="text-4xl font-bold text-white font-satoshi mb-6 leading-tight">
            {role === 'student' 
              ? "\"Join a community of ambitious learners building their future.\""
              : "\"Inspire the next generation of learners and share your expertise.\""}
          </h2>
          
          <ul className="space-y-4 text-slate-300 font-manrope">
            {role === 'student' ? (
                <>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                        <span>Unlimited access to 500+ courses</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                        <span>Expert mentorship & code reviews</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                        <span>Career services & job placement</span>
                    </li>
                </>
            ) : (
                <>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                        <span>Reach a global audience of students</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                        <span>Earn reliable revenue from your content</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                        <span>Powerful tools to manage your courses</span>
                    </li>
                </>
            )}
          </ul>
        </div>
        
        {/* Footer */}
        <div className="relative z-10 flex gap-6 text-sm text-slate-400">
            <span>© 2026 Learnova</span>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-24 xl:p-32 relative">
        <div className="max-w-[440px] w-full mx-auto">
            
            {/* Mobile Back Button */}
            <Link href="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back
            </Link>

            <div className="mb-10">
                <Image src={NavLogo} alt="Logo" width={120} height={40} className="h-10 w-auto object-contain mb-6" />
                <h1 className="text-3xl font-bold text-slate-900 font-satoshi mb-2">Create an account</h1>
                <p className="text-slate-500 font-manrope">
                    {role === 'student' ? 'Start your 14-day free trial.' : 'Join as an instructor today.'} No credit card required.
                </p>
            </div>

            {/* Role Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-8">
                <button
                    onClick={() => setRole('student')}
                    className={`flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                        role === 'student' 
                        ? 'bg-white shadow-sm text-slate-900 ring-1 ring-black/5' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                    }`}
                >
                    <GraduationCap className="w-4 h-4" />
                    Student
                </button>
                <button
                    onClick={() => setRole('instructor')}
                    className={`flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                        role === 'instructor' 
                        ? 'bg-white shadow-sm text-slate-900 ring-1 ring-black/5' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                    }`}
                >
                    <Presentation className="w-4 h-4" />
                    Instructor
                </button>
            </div>

            <form className="space-y-5">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-900">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="John Doe"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all font-manrope text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-900">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                            type="email" 
                            placeholder="name@example.com"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all font-manrope text-sm"
                        />
                    </div>
                </div>
                
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-900">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                            type="password" 
                            placeholder="Create a password"
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all font-manrope text-sm"
                        />
                    </div>
                    <p className="text-xs text-slate-500 font-manrope">Must be at least 8 characters.</p>
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] font-satoshi mt-4">
                    {role === 'student' ? 'Get started' : 'Apply as Instructor'}
                </button>
            </form>

            <button type="button" className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign up with Google
            </button>

            <p className="mt-8 text-center text-sm text-slate-600 font-manrope">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-slate-900 hover:text-yellow-600 transition-colors">
                    Log in
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
