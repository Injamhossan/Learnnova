'use client';

import { useState } from 'react';
import { ShoppingCart, ShieldCheck, X, Loader2, CreditCard, Banknote } from 'lucide-react';
import Image from 'next/image';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
  onConfirm: (paymentMethod: string) => Promise<void>;
}

export default function CheckoutModal({ isOpen, onClose, course, onConfirm }: CheckoutModalProps) {
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('stripe');

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(selectedMethod);
    } finally {
      setLoading(false);
    }
  };

  const amount = course.discountPrice || course.price;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
        {/* Header */}
        <div className="p-8 pb-0 flex justify-between items-start">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
              <ShoppingCart className="w-7 h-7 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 font-satoshi">Checkout</h2>
              <p className="text-slate-500 text-sm font-medium">Complete your enrollment in seconds</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Item Detail */}
          <div className="flex gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-24 h-16 relative rounded-xl overflow-hidden shrink-0">
                {course.thumbnailUrl ? (
                    <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-slate-200" />
                )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 line-clamp-1">{course.title}</h3>
              <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mt-1">
                Instructor: {course.instructor?.user?.fullName}
              </p>
            </div>
            <div className="text-right shrink-0">
               <span className="text-xl font-black text-slate-900">${amount}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Select Payment Method</h4>
            <div className="grid grid-cols-2 gap-4">
               <button 
                 onClick={() => setSelectedMethod('stripe')}
                 className={`p-5 rounded-[24px] border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'stripe' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
               >
                  <CreditCard className={`w-6 h-6 ${selectedMethod === 'stripe' ? 'text-blue-500' : 'text-slate-400'}`} />
                  <span className={`text-sm font-bold ${selectedMethod === 'stripe' ? 'text-blue-700' : 'text-slate-500'}`}>Card (Stripe)</span>
               </button>
               <button 
                 onClick={() => setSelectedMethod('sslcommerz')}
                 className={`p-5 rounded-[24px] border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'sslcommerz' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
               >
                  <Banknote className={`w-6 h-6 ${selectedMethod === 'sslcommerz' ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span className={`text-sm font-bold ${selectedMethod === 'sslcommerz' ? 'text-emerald-700' : 'text-slate-500'}`}>Mobile Banking</span>
               </button>
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-sm">
                <span className="text-slate-500">Course Price</span>
                <span className="font-bold text-slate-900">${amount}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-slate-500">Platform Fee</span>
                <span className="font-bold text-slate-400">$0.00</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900 text-white p-6 rounded-3xl mt-4">
                <div className="space-y-0.5">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Amount</span>
                    <p className="text-2xl font-black">${amount}</p>
                </div>
                <div className="text-amber-500 flex items-center gap-2 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Secure</span>
                </div>
            </div>
          </div>

          {/* Action */}
          <button 
            onClick={handleConfirm}
            disabled={loading}
            className="w-full py-5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-3xl transition-all shadow-xl shadow-amber-500/20 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {loading ? (
                <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing Securely...</span>
                </>
            ) : (
                <span>Pay and Enroll Now</span>
            )}
          </button>
          
          <p className="text-[10px] text-center text-slate-400 uppercase font-bold tracking-widest">
            By clicking, you agree to Learnova's Terms of Service & Refund Policy
          </p>
        </div>
      </div>
    </div>
  );
}
