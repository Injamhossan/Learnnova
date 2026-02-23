'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface State { hasError: boolean; error: Error | null }
interface Props { children: React.ReactNode; fallback?: React.ReactNode; homeHref?: string }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[200px]">
          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="font-bold text-slate-900 mb-1">Failed to load</h3>
          <p className="text-sm text-slate-400 mb-5 max-w-xs">
            {this.state.error?.message ?? 'An unexpected error occurred in this section.'}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={this.reset}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
            <Link
              href={this.props.homeHref ?? '/'}
              className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs px-4 py-2 rounded-xl transition-all"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/** Convenience functional wrapper */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  homeHref?: string
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary homeHref={homeHref}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
