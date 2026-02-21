'use client';

import { useState } from 'react';
import { Camera, Plus, Trash2, ArrowRight, Save, Layout, ListChecks, Type, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateCourseForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    thumbnail: '',
    level: 'Beginner',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      router.push('/instructor/courses');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Progress Stepper */}
      <div className="mb-12 flex items-center justify-between px-10 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
        {[1, 2].map(i => (
          <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= i ? 'bg-slate-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400'}`}>
            {i}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/20 overflow-hidden">
        <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{step === 1 ? 'Course Basics' : 'Extra Details'}</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Fill in the details to create your masterpiece.</p>
            </div>
            <Layout className="w-10 h-10 text-slate-200" />
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Type className="w-4 h-4" /> Course Title
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Mastering Modern React Design"
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all font-medium"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <FileText className="w-4 h-4" /> Description
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tell your students what they will learn..."
                  className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all font-medium resize-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Category</label>
                    <select 
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all font-medium bg-white"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">Select Category</option>
                      <option value="web-dev">Web Development</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Price ($)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="0.00"
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all font-medium"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                 </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 text-center py-10">
               <div className="w-32 h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] mx-auto flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all">
                  <Camera className="w-8 h-8 mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Upload Cover</span>
               </div>
               
               <div className="max-w-sm mx-auto space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                     <ListChecks className="w-6 h-6 text-slate-400" />
                     <div className="text-left leading-none">
                        <p className="font-bold text-slate-900 text-sm italic">Pre-launch Check</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Ready to create your course draft.</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-10 border-t border-slate-50">
            {step > 1 && (
              <button 
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest"
              >
                Go Back
              </button>
            )}
            <button 
              type="submit"
              disabled={loading}
              className={`ml-auto flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[24px] font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50 ${step === 1 ? 'w-full md:w-auto' : 'w-full'}`}
            >
              {loading ? 'DRAFTING...' : step === 1 ? (
                <>CONTINUE <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>FINISH & CREATE COURSE <Save className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
