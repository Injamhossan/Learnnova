"use client";

import Link from "next/link";
import { User, Mail, Lock, GraduationCap, Presentation, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import NavLogo from "@/assets/NavLogo.png";
import { handleGoogleSignIn, handleCredentialsSignup } from "@/app/actions/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface SignupFormProps {
  role: 'student' | 'instructor';
  setRole: (role: 'student' | 'instructor') => void;
}

export default function SignupForm({ role, setRole }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const signupData = {
      fullName,
      email,
      password,
      role: role.toUpperCase(), 
    };

    try {
      console.log("Starting signup process for:", email);
      const result = await handleCredentialsSignup(signupData);

      if (result.error) {
        console.error("Signup failed:", result.error);
        setError(result.error);
        setLoading(false);
      } else {
        console.log("Signup successful, attempting automatic login...");
        const loginResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginResult?.error) {
          console.error("Auto-login failed:", loginResult.error);
          setError("Account created, but could not log in automatically. Please log in manually.");
          setLoading(false);
          setTimeout(() => router.push("/login"), 2000);
        } else {
          console.log("Login successful, redirecting to dashboard...");
          const target = role === 'student' ? '/student' : '/instructor';
          window.location.href = target;
        }
      }
    } catch (err: any) {
      console.error("Unexpected error during signup:", err);
      setError("An unexpected error occurred: " + err.message);
      setLoading(false);
    }
  };

  return (
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
                    {role === 'student' ? 'Start your learning journey.' : 'Join as an instructor today.'}
                </p>
            </div>

            {/* Role Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-8">
                <button
                    type="button"
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
                    type="button"
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

            {error && (
                <div className="p-3 mb-4 rounded-lg bg-red-50 text-red-500 text-sm font-medium border border-red-100 italic">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-900">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                            name="fullName"
                            type="text" 
                            required
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
                            name="email"
                            type="email" 
                            required
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
                            name="password"
                            type={showPassword ? "text" : "password"} 
                            required
                            minLength={8}
                            placeholder="Create a password"
                            className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all font-manrope text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 font-manrope">Must be at least 8 characters.</p>
                    <div className="flex items-center gap-2">
                        <Checkbox id="terms" required />
                        <label htmlFor="terms" className="text-sm text-slate-600 select-none font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            I agree to the <Link href="/terms" className="text-slate-900 underline hover:text-yellow-600">Terms & Conditions</Link>
                        </label>
                    </div>

                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] font-satoshi mt-4 flex items-center justify-center disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Creating account...
                        </>
                    ) : (
                        role === 'student' ? 'Get started' : 'Apply as Instructor'
                    )}
                </button>
            </form>

            <button 
                type="button"
                onClick={() => signIn('google', { callbackUrl: '/auth/callback' })}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
            >
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
  );
}
