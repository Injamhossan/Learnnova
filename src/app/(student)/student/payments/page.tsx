'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Receipt, 
  Search, 
  Filter, 
  Download, 
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { paymentApi } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

export default function PaymentHistoryPage() {
  const { data: session } = useSession();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const token = (session?.user as any)?.backendToken;

  useEffect(() => {
    if (token) {
      paymentApi.getHistory(token)
        .then(setPayments)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [token]);

  const filteredPayments = payments.filter(p => 
    p.course?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'PENDING': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'FAILED': return <XCircle className="w-4 h-4 text-rose-500" />;
      default: return <AlertCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'PENDING': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'FAILED': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50/50 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 font-satoshi">Payment History</h1>
          <p className="text-slate-500 font-medium">Manage and track all your course purchases</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Spent</p>
           <h3 className="text-2xl font-black text-slate-900">${payments.reduce((acc, p) => p.status === 'COMPLETED' ? acc + p.amount : acc, 0).toFixed(2)}</h3>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Courses</p>
           <h3 className="text-2xl font-black text-slate-900">{payments.filter(p => p.status === 'COMPLETED').length}</h3>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Active Subscriptions</p>
           <h3 className="text-2xl font-black text-slate-900">Level 0</h3>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by course name or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium"
          />
        </div>
        <button className="px-6 py-4 bg-white border border-slate-200 rounded-2xl flex items-center gap-2 font-bold text-slate-600 hover:bg-slate-50 transition-all">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Course</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transaction ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 relative rounded-lg overflow-hidden bg-slate-100 shrink-0">
                          {payment.course?.thumbnailUrl ? (
                            <Image src={payment.course.thumbnailUrl} alt="" fill className="object-cover" />
                          ) : (
                            <Receipt className="w-5 h-5 text-slate-300 absolute inset-0 m-auto" />
                          )}
                        </div>
                        <span className="font-bold text-slate-900 text-sm line-clamp-1">{payment.course?.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <code className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">{payment.transactionId || 'N/A'}</code>
                    </td>
                    <td className="px-8 py-5">
                      <span className="font-black text-slate-900">${payment.amount.toFixed(2)}</span>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-8 py-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase ${getStatusStyle(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                        <button className="p-2 hover:bg-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                           <ExternalLink className="w-4 h-4" />
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                        <Receipt className="w-8 h-8 text-slate-200" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">No payment records found</p>
                        <p className="text-sm text-slate-500 mt-1">Start your learning journey by enrolling in a course.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
