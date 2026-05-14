'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dispatchWaitlistModal = () => {
    window.dispatchEvent(new CustomEvent('open-waitlist'));
  };

  const dispatchPartnerModal = () => {
    window.dispatchEvent(new CustomEvent('open-partner-modal'));
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass-card' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-brand-dark">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-display font-bold text-xl rotate-3 shadow-lg hover:rotate-0 transition-transform">D</div>
          <span className="font-display font-bold text-2xl tracking-tight">Donate<span className="text-brand-accent">.</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 font-semibold text-sm uppercase tracking-widest">
          <Link href="/#how-it-works" className="hover:text-brand-accent transition-colors">Mechanism</Link>
          <Link href="/#impact" className="hover:text-brand-accent transition-colors">Impact</Link>
          <Link href="/security" className="hover:text-brand-accent transition-colors">Security</Link>
          <button onClick={dispatchPartnerModal} className="text-brand-primary hover:opacity-70 transition-opacity">Partner with Us</button>
        </div>

        {pathname === '/waitlist' ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-slate-400">Launch Alpha 2024</span>
            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-white">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
              <span className="text-sm font-bold">Queue Active</span>
            </div>
          </div>
        ) : (
          <button 
            onClick={dispatchWaitlistModal} 
            className="bg-brand-dark text-white px-7 py-3 rounded-full font-bold text-sm tracking-tight hover:scale-105 transition-transform active:scale-95 shadow-xl"
          >
            Join Waitlist
          </button>
        )}
      </div>
    </nav>
  );
}
