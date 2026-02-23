"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { GraduationCap, Presentation, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function RoleSelectionModal() {
  const { data: session, update } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'INSTRUCTOR' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const user = session?.user as any;
  const needsRole = user?.needsRole;

  useEffect(() => {
    if (needsRole) {
      setIsOpen(true);
    }
  }, [needsRole]);

  const handleConfirm = async () => {
    if (!selectedRole || !user?.backendToken) return;

    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/users/init-role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.backendToken}`
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to set role');
      }

      // Update local session
      await update({
        ...session,
        user: {
          ...session?.user,
          role: selectedRole,
          needsRole: false
        }
      });

      setIsOpen(false);
      
      // Redirect to dashboard
      const target = selectedRole === 'STUDENT' ? '/student' : '/instructor';
      router.push(target);
      
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome to Learnova!</h2>
          <p className="text-slate-500 mt-2">To personalize your experience, please tell us how you'd like to use the platform.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100 text-center italic">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 mb-8">
          <button
            onClick={() => setSelectedRole('STUDENT')}
            className={cn(
              "group relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left",
              selectedRole === 'STUDENT' 
                ? "border-yellow-500 bg-yellow-50/50" 
                : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              selectedRole === 'STUDENT' ? "bg-yellow-500 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
            )}>
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900">I'm a Student</p>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">I want to learn new skills and browse courses.</p>
            </div>
            {selectedRole === 'STUDENT' && <Check className="w-5 h-5 text-yellow-600 mr-2" />}
          </button>

          <button
            onClick={() => setSelectedRole('INSTRUCTOR')}
            className={cn(
              "group relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left",
              selectedRole === 'INSTRUCTOR' 
                ? "border-blue-500 bg-blue-50/50" 
                : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
              selectedRole === 'INSTRUCTOR' ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
            )}>
              <Presentation className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900">I'm an Instructor</p>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">I want to create content and teach others.</p>
            </div>
            {selectedRole === 'INSTRUCTOR' && <Check className="w-5 h-5 text-blue-600 mr-2" />}
          </button>
        </div>

        <button
          onClick={handleConfirm}
          disabled={!selectedRole || loading}
          className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200 active:scale-[0.98]"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Complete Setup"
          )}
        </button>
      </div>
    </div>
  );
}
