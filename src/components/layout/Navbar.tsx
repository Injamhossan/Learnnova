"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu, X } from 'lucide-react';
import NavLogo from '@/assets/NavLogo.png';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'Mentors', href: '/mentors' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled ? "top-4 px-4 sm:px-8" : "top-6 px-4 md:px-8"
        )}
      >
        <div 
          className={cn(
            "mx-auto max-w-7xl flex h-16 items-center justify-between rounded-full bg-white/80 px-6 shadow-sm backdrop-blur-xl transition-all ring-1 ring-slate-900/5",
            isScrolled && "shadow-md bg-white/90"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900 shrink-0">
            <Image src={NavLogo} alt="EduFlow Logo" width={120} height={40} className="h-8 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-yellow-600 relative group py-2",
                  pathname === link.href ? "text-slate-900 font-semibold" : "text-slate-600"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500 scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                  pathname === link.href && "scale-x-100"
                )} />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-medium text-slate-900 hover:text-yellow-600 transition-colors">
              Log In
            </Link>
            <Link 
              href="/signup" 
              className="hidden sm:inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-medium text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
            <button 
              className="md:hidden p-2 text-slate-600 hover:text-slate-900" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          className={cn(
            "absolute right-4 top-4 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-900/5 transition-all duration-300 ease-out transform",
            mobileMenuOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 -translate-y-4 opacity-0"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <Image src={NavLogo} alt="EduFlow Logo" width={100} height={32} className="h-8 w-auto object-contain" />
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "p-3 rounded-xl text-base font-medium transition-colors hover:bg-slate-50",
                  pathname === link.href ? "bg-yellow-50 text-yellow-700" : "text-slate-600"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="my-4 border-slate-100" />
            <Link 
              href="/login" 
              className="p-3 rounded-xl text-base font-medium text-slate-600 hover:bg-slate-50 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Link>
            <Link 
              href="/signup" 
              className="w-full flex h-12 items-center justify-center rounded-xl bg-slate-900 text-base font-medium text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
