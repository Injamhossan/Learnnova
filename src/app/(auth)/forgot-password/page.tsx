"use client";

import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import NavLogo from "@/assets/NavLogo.png";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white justify-center items-center p-6">
      <div className="max-w-[400px] w-full">
        {/* Back Button */}
        <Link
          href="/login"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Login
        </Link>

        <Image
          src={NavLogo}
          alt="Logo"
          width={120}
          height={40}
          className="h-10 w-auto object-contain mb-8"
        />

        {success ? (
          <div className="text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-satoshi mb-2">Check your email</h1>
            <p className="text-slate-500 font-manrope mb-8">
              We've sent a password reset link to your email address.
            </p>
            <Link 
              href="/login"
              className="inline-block w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all font-satoshi"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-slate-900 font-satoshi mb-2">
              Forgot password?
            </h1>
            <p className="text-slate-500 font-manrope mb-8">
              No worries, we'll send you reset instructions.
            </p>

            {error && (
              <div className="p-3 mb-6 rounded-lg bg-red-50 text-red-500 text-sm font-medium border border-red-100 italic">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-900" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all font-manrope text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] font-satoshi flex items-center justify-center disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Sending link...
                  </>
                ) : (
                  "Reset password"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
