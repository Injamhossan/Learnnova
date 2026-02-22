'use client';

import { useEffect, useRef } from 'react';

interface ChartPoint {
  date: string;
  count: number;
}

export default function EnrollmentChart({ data }: { data: ChartPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const pad = { top: 20, right: 20, bottom: 40, left: 44 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    const maxVal = Math.max(...data.map((d) => d.count)) * 1.15 || 10;
    const barW = (chartW / data.length) * 0.5;
    const gap = chartW / data.length;

    // Grid lines + Y labels
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    ctx.font = '500 10px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';

    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(W - pad.right, y);
      ctx.stroke();
      const val = Math.round(maxVal - (maxVal / 4) * i);
      ctx.textAlign = 'right';
      ctx.fillText(String(val), pad.left - 8, y + 3);
    }

    // Bars
    data.forEach((d, i) => {
      const x = pad.left + gap * i + (gap - barW) / 2;
      const barH = (d.count / maxVal) * chartH;
      const y = pad.top + chartH - barH;

      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#334155');
      ctx.fillStyle = grad;

      const r = 5;
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
      ctx.lineTo(x + barW, y + barH);
      ctx.lineTo(x, y + barH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();

      // X label — shorten date
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'center';
      const label = new Date(d.date).toLocaleDateString('en', { month: 'short', day: 'numeric' });
      ctx.fillText(label, x + barW / 2, H - 10);
    });
  }, [data]);

  const totalThisPeriod = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full shadow-sm">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Enrollment Growth</h3>
          <p className="text-xs font-medium text-slate-500 mt-1">Daily new enrollments · last {data.length} days</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <div className="w-2 h-2 rounded-full bg-slate-900" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
            Total: {totalThisPeriod.toLocaleString()}
          </span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-slate-300">
          <p className="text-xs font-bold uppercase tracking-widest">No enrollment data yet</p>
        </div>
      ) : (
        <canvas ref={canvasRef} className="w-full h-56" style={{ display: 'block' }} />
      )}
    </div>
  );
}
