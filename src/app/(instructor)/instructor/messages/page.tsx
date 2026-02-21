import AdminHeader from '@/components/admin/AdminHeader';
import { MessageSquare, Search, Phone, Video, MoreHorizontal, Send, Smile, Paperclip } from 'lucide-react';

export default function MessagesPage() {
  const contacts = [
    { name: 'Alex Johnson', lastMsg: 'I have a question about module 4...', time: '12m ago', active: true, unread: 2 },
    { name: 'Maria Garcia', lastMsg: 'Thanks for the feedback!', time: '2h ago', active: false, unread: 0 },
    { name: 'Sam Wilson', lastMsg: 'When is the next live session?', time: 'Yesterday', active: false, unread: 0 },
  ];

  return (
    <>
      <AdminHeader title="Messages" subtitle="Engage with your students in real-time" />
      <div className="flex-1 p-8 flex gap-8 overflow-hidden bg-slate-50/30 h-[calc(100vh-80px)]">
        
        {/* Sidebar */}
        <div className="w-80 flex flex-col gap-6 h-full shrink-0">
           <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input type="text" placeholder="Search chats..." className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-slate-300 font-medium" />
              </div>
           </div>

           <div className="flex-1 bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col p-4">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest p-4 mb-2 italic">Recent Conversations</h3>
              <div className="flex-1 overflow-y-auto space-y-2">
                 {contacts.map(contact => (
                    <div key={contact.name} className={`p-4 rounded-3xl cursor-pointer transition-all flex items-center gap-4 ${contact.active ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'hover:bg-slate-50'}`}>
                       <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 font-bold shrink-0 shadow-sm border border-slate-200/50">
                          {contact.name[0]}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                             <p className="font-bold text-sm truncate">{contact.name}</p>
                             <span className={`text-[8px] font-bold uppercase ${contact.active ? 'text-white/50' : 'text-slate-400'}`}>{contact.time}</span>
                          </div>
                          <p className={`text-[10px] truncate ${contact.active ? 'text-white/60' : 'text-slate-500'} italic font-medium`}>{contact.lastMsg}</p>
                       </div>
                       {contact.unread > 0 && !contact.active && (
                          <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm shadow-indigo-200" />
                       )}
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white rounded-[48px] border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
           {/* Chat Header */}
           <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-[20px] bg-slate-900 flex items-center justify-center text-white font-bold shadow-lg shadow-slate-200">A</div>
                 <div>
                    <h3 className="font-bold text-slate-900 text-lg italic leading-none">Alex Johnson</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Now</span>
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <button className="p-4 hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all"><Phone className="w-5 h-5" /></button>
                 <button className="p-4 hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all"><Video className="w-5 h-5" /></button>
                 <button className="p-4 hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
           </div>

           {/* Messages Container */}
           <div className="flex-1 p-8 space-y-8 overflow-y-auto bg-slate-50/20">
              <div className="max-w-md bg-slate-100 p-6 rounded-[32px] rounded-tl-lg text-slate-700 text-sm font-medium shadow-sm leading-relaxed">
                 Hi Professor! I was wondering if you could clarify the React hydration process mentioned in the second lesson.
              </div>
              <div className="max-w-md ml-auto bg-slate-900 text-white p-6 rounded-[32px] rounded-tr-lg text-sm font-medium shadow-xl shadow-slate-200 leading-relaxed">
                 Absolutely Alex! Think of hydration as the process where React preserves your server-rendered HTML while attaching event listeners to the components.
              </div>
           </div>

           {/* Input Area */}
           <div className="p-8 bg-white border-t border-slate-50">
              <div className="bg-slate-50 border border-slate-100 rounded-[32px] p-2 flex items-center gap-2 pr-4 shadow-inner">
                 <button className="p-3 text-slate-400 hover:text-slate-900 transition-all"><Smile className="w-5 h-5" /></button>
                 <button className="p-3 text-slate-400 hover:text-slate-900 transition-all"><Paperclip className="w-5 h-5" /></button>
                 <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium h-12" />
                 <button className="bg-slate-900 text-white p-3 rounded-2xl shadow-lg hover:bg-slate-800 transition-all active:scale-95">
                    <Send className="w-5 h-5" />
                 </button>
              </div>
           </div>

        </div>

      </div>
    </>
  );
}
