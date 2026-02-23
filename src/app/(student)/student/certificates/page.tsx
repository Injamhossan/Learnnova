'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Award, Download, ExternalLink, Loader2, GraduationCap } from 'lucide-react';
import StudentHeader from '@/components/student/StudentHeader';
import { courseApi } from '@/lib/api';

interface Certificate {
  id: string;
  certificateCode: string;
  issuedAt: string;
  course: { id: string; title: string; thumbnailUrl?: string; instructor: { user: { fullName: string } } };
}

export default function StudentCertificatesPage() {
  const { data: session } = useSession();
  const token = (session?.user as any)?.backendToken as string | undefined;
  const [certs, setCerts]   = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await courseApi.getMyCertificates(token);
      setCerts(data?.certificates ?? data ?? []);
    } catch { setCerts([]); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  return (
    <>
      <StudentHeader title="My Certificates" subtitle={`${certs.length} certificate${certs.length !== 1 ? 's' : ''} earned`} />

      <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 lg:p-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-52 bg-white rounded-2xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : certs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 text-center">
            <div className="w-20 h-20 rounded-3xl bg-amber-100 flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-amber-500" />
            </div>
            <div>
              <p className="font-bold text-slate-700 text-lg">No Certificates Yet</p>
              <p className="text-sm text-slate-400 mt-1 max-w-xs">Complete a course to earn your first certificate of completion!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.map(cert => (
              <div key={cert.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:shadow-slate-200/60 transition-all group">
                {/* Certificate banner */}
                <div className="relative h-36 bg-gradient-to-br from-amber-400 via-orange-400 to-amber-600 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-10">
                    <Award className="w-full h-full text-white" />
                  </div>
                  <div className="relative text-center">
                    <Award className="w-12 h-12 text-white mx-auto mb-1 drop-shadow-lg" />
                    <p className="text-white font-bold text-sm tracking-wide">Certificate of Completion</p>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{cert.course.title}</h3>
                  <p className="text-xs text-slate-500">{cert.course.instructor?.user?.fullName}</p>

                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-3">
                    <span>ID: {cert.certificateCode.slice(0, 8).toUpperCase()}</span>
                    <span>{new Date(cert.issuedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs py-2 rounded-xl transition-all">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
