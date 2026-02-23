'use client';

import { useEffect, useRef, useState } from 'react';
import { BarChart3 } from 'lucide-react';

interface ChartPoint {
  date: string;
  count: number;
}

interface EnrollmentChartProps {
  data: ChartPoint[];
  days: number;
  onDaysChange?: (d: number) => void;
}

const RANGE_OPTIONS = [
  { label: '7D', value: 7 },
  { label: '14D', value: 14 },
  { label: '30D', value: 30 },
];

export function EnrollmentChartSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full shadow-sm animate-pulse">
      <div className="flex items-start justify-between mb-8">
        <div className="space-y-2">
          <div className="h-4 w-36 bg-slate-100 rounded" />
          <div className="h-3 w-48 bg-slate-100 rounded" />
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => <div key={i} className="w-10 h-7 bg-slate-100 rounded-lg" />)}
        </div>
      </div>
      <div className="h-56 bg-slate-50 rounded-xl" />
    </div>
  );
}

export default function EnrollmentChart({ data, days, onDaysChange }: EnrollmentChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; count: number } | null>(null);
  const barRectsRef = useRef<{ x: number; y: number; w: number; h: number; date: string; count: number }[]>([]);

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
    const pad = { top: 20, right: 16, bottom: 44, left: 44 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    const maxVal = Math.max(...data.map((d) => d.count)) * 1.2 || 10;
    const barW = Math.min((chartW / data.length) * 0.6, 36);
    const gap = chartW / data.length;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Horizontal grid lines
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    ctx.font = '500 9px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';

    const gridCount = 4;
    for (let i = 0; i <= gridCount; i++) {
      const y = pad.top + (chartH / gridCount) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(W - pad.right, y);
      ctx.stroke();
      const val = Math.round(maxVal - (maxVal / gridCount) * i);
      ctx.textAlign = 'right';
      ctx.fillText(String(val), pad.left - 8, y + 3);
    }

    // Store bar rects for mouse interaction
    barRectsRef.current = [];

    data.forEach((d, i) => {
      const x = pad.left + gap * i + (gap - barW) / 2;
      const barH = Math.max((d.count / maxVal) * chartH, 4);
      const y = pad.top + chartH - barH;

      barRectsRef.current.push({ x, y, w: barW, h: barH, date: d.date, count: d.count });

      // Gradient bar
      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      grad.addColorStop(0, '#1e293b');
      grad.addColorStop(1, '#64748b');
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

      // X label — only show every N labels to avoid crowding
      const step = data.length <= 10 ? 1 : data.length <= 20 ? 2 : 5;
      if (i % step === 0 || i === data.length - 1) {
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'center';
        const label = new Date(d.date).toLocaleDateString('en', { month: 'short', day: 'numeric' });
        ctx.fillText(label, x + barW / 2, H - 10);
      }
    });
  }, [data]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const hit = barRectsRef.current.find(
      (b) => mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h
    );
    if (hit) {
      const label = new Date(hit.date).toLocaleDateString('en', { month: 'short', day: 'numeric' });
      setTooltip({ x: hit.x + hit.w / 2, y: hit.y, label, count: hit.count });
    } else {
      setTooltip(null);
    }
  };

  const totalThisPeriod = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-slate-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Enrollment Growth</h3>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-1.5 ml-0.5">
            {totalThisPeriod.toLocaleString()} new enrollments · last {days} days
          </p>
        </div>

        {/* Range selector */}
        {onDaysChange && (
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onDaysChange(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                  days === opt.value
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {data.length === 0 ? (
        <div className="h-56 flex flex-col items-center justify-center text-slate-300 gap-2">
          <BarChart3 className="w-8 h-8" />
          <p className="text-xs font-bold uppercase tracking-widest">No enrollment data yet</p>
        </div>
      ) : (
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-56 cursor-crosshair"
            style={{ display: 'block' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTooltip(null)}
          />
          {tooltip && (
            <div
              className="absolute pointer-events-none z-10 -translate-x-1/2 -translate-y-full bg-slate-900 text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-xl"
              style={{ left: tooltip.x, top: tooltip.y - 6 }}
            >
              <p className="text-slate-400 font-semibold">{tooltip.label}</p>
              <p className="text-white">{tooltip.count.toLocaleString()} enrolled</p>
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
