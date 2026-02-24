
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavLogo from "@/assets/NavLogo.png";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/signup");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login?verified=true");
        }, 3000);
      } else {
        setError(data.message || "Verification failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Email Verified!</h1>
        <p className="text-slate-500">
          Your account has been successfully verified. Redirecting to login...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[400px] w-full mx-auto">
      <div className="mb-10 text-center lg:text-left">
        <Image src={NavLogo} alt="Logo" width={120} height={40} className="h-10 w-auto object-contain mb-6 mx-auto lg:mx-0" />
        <h1 className="text-3xl font-bold text-slate-900 font-satoshi mb-2">Verify your email</h1>
        <p className="text-slate-500 font-manrope">
          We've sent a 6-digit verification code to <span className="font-semibold text-slate-900">{email}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-widest block text-center lg:text-left">
            Verification Code
          </label>
          <input
            type="text"
            maxLength={6}
            placeholder="0 0 0 0 0 0"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="w-full text-center text-3xl font-bold tracking-[10px] py-4 rounded-2xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-mono"
            autoFocus
          />
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-500 text-sm font-semibold border border-red-100 text-center italic">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || code.length !== 6}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Verifying...
            </>
          ) : (
            "Verify Account"
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-500 font-manrope">
        Didn't receive the code?{" "}
        <button className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
          Resend code
        </button>
      </div>

      <Link href="/signup" className="mt-6 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-bold uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" />
        Back to Signup
      </Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-white lg:p-24 relative">
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    </div>
  );
}
