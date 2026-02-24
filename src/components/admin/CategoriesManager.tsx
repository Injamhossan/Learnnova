'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Tag, Trash2, Pencil, Loader2, BookOpen, X, Check, Search } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count: { courses: number };
}

const TAG_COLORS = [
  'bg-indigo-50 text-indigo-700 border-indigo-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
  'bg-rose-50 text-rose-700 border-rose-200',
  'bg-blue-50 text-blue-700 border-blue-200',
  'bg-violet-50 text-violet-700 border-violet-200',
  'bg-orange-50 text-orange-700 border-orange-200',
];

export default function CategoriesManager() {
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const token = (session?.user as any)?.backendToken;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/admin/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setCategories(data);
    } catch (e) {
      console.error('Failed to fetch categories:', e);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (session) fetchCategories();
  }, [fetchCategories, session]);

  const createCategory = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch(`${apiUrl}/api/admin/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newName.trim(), description: newDesc.trim() || null }),
      });
      if (res.ok) {
        setNewName('');
        setNewDesc('');
        setShowForm(false);
        fetchCategories();
      }
    } catch (e) {
      console.error('Failed to create category:', e);
    } finally {
      setCreating(false);
    }
  };

  const filtered = categories.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</p>
            <p className="text-3xl font-bold text-slate-900">{categories.length} <span className="text-base font-semibold text-slate-400">Categories</span></p>
          </div>
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Filter categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-200 w-64 transition-all"
            />
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-slate-900 px-5 py-3 rounded-2xl text-xs font-bold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'CANCEL' : 'NEW CATEGORY'}
        </button>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Filter categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-slate-100 w-full"
        />
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Create New Category</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Category Name *</label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Web Development"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Description (optional)</label>
              <input
                type="text"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="Short description..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>
          <button
            onClick={createCategory}
            disabled={!newName.trim() || creating}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl text-xs font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-md"
          >
            {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            CREATE CATEGORY
          </button>
        </div>
      )}

      {/* Categories Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mb-3" />
          <p className="text-xs font-bold uppercase tracking-widest">LOADING CATEGORIES...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-3xl">
          <Tag className="w-10 h-10 text-slate-100 mb-3" />
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((cat, idx) => (
            <div
              key={cat.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${TAG_COLORS[idx % TAG_COLORS.length]}`}>
                  <Tag className="w-4 h-4" />
                </div>
              </div>
              <p className="font-bold text-slate-900 mb-1 group-hover:text-black transition-colors">{cat.name}</p>
              {cat.description && (
                <p className="text-xs text-slate-400 font-medium mb-3 line-clamp-2">{cat.description}</p>
              )}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{cat._count.courses} COURSES</span>
                </div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">/{cat.slug}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
