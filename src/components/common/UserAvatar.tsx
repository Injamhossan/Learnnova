"use client";

import Image from "next/image";
import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  className?: string;
  fallbackClassName?: string;
  size?: number;
}

export default function UserAvatar({ 
  src, 
  name, 
  className, 
  fallbackClassName,
  size = 40 
}: UserAvatarProps) {
  const [error, setError] = useState(false);

  // Get initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const initials = name ? getInitials(name) : "";

  if (!src || error) {
    return (
      <div 
        className={cn(
          "bg-slate-100 flex items-center justify-center font-bold text-slate-500 overflow-hidden shrink-0",
          className,
          fallbackClassName
        )}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {initials || <User style={{ width: size * 0.6, height: size * 0.6 }} />}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden shrink-0", className)} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={name || "User avatar"}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
        unoptimized={src.startsWith('http')} // Often helps with external URLs that don't need resizing
      />
    </div>
  );
}
