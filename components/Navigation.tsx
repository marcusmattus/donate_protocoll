'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 flex items-center justify-between px-6 md:px-10 h-20 border-b border-brand-muted/50 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white/50 backdrop-blur-sm'}`}>
        <div className="w-full max-w-[1440px] mx-auto flex justify-between items-center text-brand-dark">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-display font-bold text-lg shadow-sm group-hover:rotate-12 transition-transform">D</div>
                <span className="font-display font-bold tracking-tight text-xl">Donate<span className="text-brand-primary">Protocol</span></span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8 font-medium text-sm opacity-80">
                <Link href="/#how-it-works" className="hover:opacity-100 transition-opacity">How it Works</Link>
                <Link href="/cli" className="hover:opacity-100 transition-opacity">CLI Docs</Link>
                <Link href="/institutional" className="hover:opacity-100 transition-opacity">Integrations</Link>
                <Link href="/#impact" className="hover:opacity-100 transition-opacity">Impact</Link>
                <Link href="/security" className="hover:opacity-100 transition-opacity">Security</Link>
            </div>

            {pathname !== '/waitlist' ? (
               <Link href="/waitlist" className="hidden md:flex px-5 py-2.5 rounded-full border border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary hover:text-white transition-colors text-sm">
                   Partner With Us
               </Link>
            ) : (
                <div className="flex items-center gap-4">
                    <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-slate-400">Launch Alpha 2024</span>
                    <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
                    <span className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                        </span>
                        Early Access
                    </span>
                </div>
            )}
        </div>
    </nav>
  );
}
