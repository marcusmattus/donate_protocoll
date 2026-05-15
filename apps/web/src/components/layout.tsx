'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass-card' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl rotate-3 shadow-lg group-hover:rotate-0 transition-transform">
            D
          </div>
          <span className="font-bold text-2xl tracking-tight">
            Donate<span className="text-brand-accent">.</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 font-semibold text-sm uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
          <Link href="/security" className="hover:text-brand-accent transition-colors">Security</Link>
          <Link href="/institutional" className="hover:text-brand-accent transition-colors">Partners</Link>
        </div>

        <Link 
          href="/waitlist" 
          className="bg-brand-dark text-white px-7 py-3 rounded-full font-bold text-sm tracking-tight hover:scale-105 transition-transform active:scale-95 shadow-xl"
        >
          Join Waitlist
        </Link>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="bg-white py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">D</div>
              <span className="font-bold text-lg">Donate Protocol</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Trading for a greater good. Every transaction makes a difference.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/waitlist" className="text-slate-600 hover:text-brand-primary transition-colors text-sm">Join Waitlist</Link></li>
              <li><Link href="/security" className="text-slate-600 hover:text-brand-primary transition-colors text-sm">Security</Link></li>
              <li><Link href="/institutional" className="text-slate-600 hover:text-brand-primary transition-colors text-sm">Partners</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-slate-600 hover:text-brand-primary transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-brand-primary transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-brand-primary transition-colors text-sm">Impact Charter</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">Connect</h4>
            <ul className="space-y-3">
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-brand-primary transition-colors text-sm">Twitter / X</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-brand-primary transition-colors text-sm">Discord</a></li>
              <li><a href="mailto:hello@donate.protocol" className="text-slate-600 hover:text-brand-primary transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Donate Protocol. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Built with intention. Powered by community.
          </p>
        </div>
      </div>
    </footer>
  )
}
