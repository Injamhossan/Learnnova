'use client';

import { useEffect, useRef } from 'react';

const mockData = [
  { date: 'Feb 8', count: 120 },
  { date: 'Feb 9', count: 135 },
  { date: 'Feb 10', count: 98 },
  { date: 'Feb 11', count: 160 },
  { date: 'Feb 12', count: 178 },
  { date: 'Feb 13', count: 145 },
  { date: 'Feb 14', count: 210 },
  { date: 'Feb 15', count: 185 },
  { date: 'Feb 16', count: 220 },
  { date: 'Feb 17', count: 195 },
];

export default function EnrollmentChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const pad = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    const maxVal = Math.max(...mockData.map((d) => d.count)) * 1.1;
    const barW = (chartW / mockData.length) * 0.5;
    const gap = chartW / mockData.length;

    // Grid lines
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
        ctx.fillText(String(val), pad.left - 10, y + 3);
    }

    // Bars
    mockData.forEach((d, i) => {
      const x = pad.left + gap * i + (gap - barW) / 2;
      const barH = (d.count / maxVal) * chartH;
      const y = pad.top + chartH - barH;

      // Gradient
      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#334155');
      ctx.fillStyle = grad;

      // Rounded top
      const r = 6;
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

      // X labels
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'center';
      ctx.fillText(d.date, x + barW / 2, H - 10);
    });
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full shadow-sm">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Enrollment Growth</h3>
          <p className="text-xs font-medium text-slate-500 mt-1">Daily new student registrations</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
           <div className="w-2 h-2 rounded-full bg-slate-900" />
           <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Growth Rate: 24.5%</span>
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full h-56" style={{ display: 'block' }} />
    </div>
  );
}
