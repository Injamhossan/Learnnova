'use client';

import { useVisitorData } from '@fingerprint/react';
import { RefreshCcw, Fingerprint, ShieldCheck, AlertCircle } from 'lucide-react';

export default function FingerprintDemo() {
  const { isLoading, error, data, getData } = useVisitorData({ immediate: true });

  return (
    <div className="max-w-4xl mx-auto my-20 p-8 bg-white rounded-[48px] border border-slate-200 shadow-xl overflow-hidden relative group">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-50 rounded-3xl text-indigo-600">
              <Fingerprint className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold italic text-slate-900">Security Identity</h2>
              <p className="text-slate-400 text-sm font-medium">Browser fingerprinting via FingerprintJS</p>
            </div>
          </div>
          <button 
            onClick={() => getData()} 
            className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all group/btn active:scale-95 border border-slate-100"
          >
            <RefreshCcw className={`w-5 h-5 text-slate-400 group-hover/btn:text-slate-900 transition-all ${isLoading ? 'animate-spin text-indigo-500' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> Unique Visitor ID
            </h3>
            <p className="text-2xl font-bold text-slate-900 tabular-nums break-all italic">
              {isLoading ? (
                <span className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-200 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-slate-200 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-slate-200 rounded-full animate-bounce"></span>
                </span>
              ) : (data as any)?.visitorId || (data as any)?.visitor_id || 'Unavailable'}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3 h-3 text-amber-500" /> Identification Confidence
            </h3>
            <div className="flex items-end gap-2">
                 <p className="text-3xl font-bold text-slate-900 line-clamp-1 italic">
                    {isLoading ? '...' : ((data as any)?.confidence?.score ? Math.round((data as any).confidence.score * 100) + '%' : 'N/A')}
                 </p>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-1.5 italic">Score</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Raw Metadata Output</h3>
            {error && <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{error.message}</span>}
          </div>
          <div className="bg-slate-900 rounded-[32px] p-8 max-h-96 overflow-y-auto custom-scrollbar">
            <pre className="text-indigo-300 font-mono text-xs leading-relaxed">
              {isLoading ? '// Scanning system artifacts...' : JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -right-20 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
        <Fingerprint className="w-96 h-96" />
      </div>
    </div>
  );
}
