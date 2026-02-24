"use client";

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  linkUrl?: string;
}

export default function NotificationCenter() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!session?.user) return;

    // Fetch initial notifications
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${(session.user as any).backendToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          console.log('NotificationCenter: Fetched notifications:', data);
          setNotifications(data);
          setUnreadCount(data.filter((n: Notification) => !n.isRead).length);
        } else {
          console.error('NotificationCenter: Backend returned error:', res.status);
        }
      } catch (err) {
        console.error('NotificationCenter: Failed to fetch notifications', err);
      }
    };

    fetchNotifications();

    // Request browser notification permission
    if ('Notification' in window && window.Notification.permission === 'default') {
      window.Notification.requestPermission();
    }

    // Setup Socket.io
    const socket = io(BACKEND_URL);
    const userId = (session.user as any).id;

    socket.emit('join', userId);

    socket.on('connect', () => {
      console.log('NotificationCenter: Socket connected!', socket.id);
    });

    socket.on('notification', (newNotif: Notification) => {
      console.log('NotificationCenter: Received real-time notification:', newNotif);
      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);
      
      // Simple browser notification if supported
      if ('Notification' in window && window.Notification.permission === 'granted') {
          new window.Notification(newNotif.title, { body: newNotif.message });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [session]);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${(session?.user as any).backendToken}`,
        },
      });
      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[60] bg-black/5" 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }} 
          />
          <div className="absolute right-0 top-full mt-3 w-80 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-900/5 z-[70] animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
              <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <div className="py-8 text-center">
                  <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={cn(
                      "p-3 rounded-xl transition-all border border-transparent",
                      notif.isRead ? "bg-white opacity-70" : "bg-slate-50 border-slate-100"
                    )}
                    onClick={() => !notif.isRead && markAsRead(notif.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                       <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{notif.title}</h4>
                       {!notif.isRead && (
                         <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0" />
                       )}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{notif.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[9px] text-slate-400">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </span>
                      {notif.linkUrl && (
                        <Link 
                          href={notif.linkUrl} 
                          className="text-[10px] font-bold text-blue-600 hover:underline"
                          onClick={() => setIsOpen(false)}
                        >
                          View
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
