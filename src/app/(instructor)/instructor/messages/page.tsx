'use client';

import { useState } from 'react';
import { MessageSquare, Search, Phone, Video, MoreHorizontal, Send, Smile, Paperclip } from 'lucide-react';
import InstructorHeader from '@/components/instructor/InstructorHeader';

const CONTACTS = [
  { name: 'Alex Johnson', lastMsg: 'I have a question about module 4...', time: '12m ago', active: true, unread: 2 },
  { name: 'Maria Garcia', lastMsg: 'Thanks for the feedback!', time: '2h ago', active: false, unread: 0 },
  { name: 'Sam Wilson', lastMsg: 'When is the next live session?', time: 'Yesterday', active: false, unread: 1 },
];

export default function MessagesPage() {
  const [activeContact, setActiveContact] = useState(CONTACTS[0].name);
  const [message, setMessage] = useState('');

  const contact = CONTACTS.find(c => c.name === activeContact) ?? CONTACTS[0];

  return (
    <>
      <InstructorHeader title="Messages" subtitle="Engage with your students" />

      <div className="flex-1 flex overflow-hidden bg-slate-50/50" style={{ height: 'calc(100vh - 64px)' }}>

        {/* ── Contacts sidebar ─────────────────────────────────────── */}
        <div className="w-72 shrink-0 border-r border-slate-200 bg-white flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition-all"
              />
            </div>
          </div>

          {/* Contact list */}
          <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">Conversations</p>
            {CONTACTS.map(c => (
              <button
                key={c.name}
                onClick={() => setActiveContact(c.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                  activeContact === c.name
                    ? 'bg-amber-50 border border-amber-100'
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  activeContact === c.name
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-1">{c.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && activeContact !== c.name && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Chat area ──────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat header */}
          <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
                {contact.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{contact.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Active now</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[Phone, Video, MoreHorizontal].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
            {/* Incoming */}
            <div className="flex gap-3 max-w-lg">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0 mt-auto">
                {contact.name[0]}
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-700 shadow-sm leading-relaxed">
                Hi Professor! I was wondering if you could clarify the React hydration process mentioned in the second lesson.
              </div>
            </div>

            {/* Outgoing */}
            <div className="flex gap-3 max-w-lg ml-auto flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-xs shrink-0 mt-auto">
                Me
              </div>
              <div className="bg-slate-900 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white shadow-md leading-relaxed">
                Absolutely! Think of hydration as the process where React preserves your server-rendered HTML while attaching event listeners to the components.
              </div>
            </div>

            <div className="flex gap-3 max-w-lg">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0 mt-auto">
                {contact.name[0]}
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-700 shadow-sm">
                That makes so much sense! Thank you 🙏
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 bg-white p-4 shrink-0">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-2">
              <button className="text-slate-400 hover:text-slate-700 transition-all p-1.5 rounded-lg hover:bg-slate-200">
                <Smile className="w-4 h-4" />
              </button>
              <button className="text-slate-400 hover:text-slate-700 transition-all p-1.5 rounded-lg hover:bg-slate-200">
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && setMessage('')}
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm border-none focus:ring-0 focus:outline-none px-2 py-1.5 text-slate-700 placeholder:text-slate-400"
              />
              <button
                onClick={() => setMessage('')}
                className="bg-amber-500 hover:bg-amber-400 text-white p-2.5 rounded-xl shadow-md shadow-amber-500/30 transition-all active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
