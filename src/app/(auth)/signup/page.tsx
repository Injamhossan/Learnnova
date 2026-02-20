"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import NavLogo from "@/assets/NavLogo.png";
import SignupForm from "@/components/auth/SignupForm";

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
      <SignupForm role={role} setRole={setRole} />
    </div>
  );
}
