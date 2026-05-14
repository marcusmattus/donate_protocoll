'use client';

import Link from 'next/link';
import { Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-display font-bold">D</div>
              <span className="font-display font-bold text-xl">Donate Protocol</span>
            </div>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Redefining how we build wealth and world simultaneously. Every trade matters.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                <Twitter className="w-5 h-5 fill-current" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all border border-slate-100 font-bold">
                M
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><Link href="/#how-it-works" className="hover:text-brand-primary transition-colors">How it Works</Link></li>
                <li><Link href="/institutional" className="hover:text-brand-primary transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-brand-primary transition-colors">Fees</Link></li>
                <li><Link href="#" className="hover:text-brand-primary transition-colors">Tax Reports</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Partners</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><Link href="/institutional" className="hover:text-brand-primary transition-colors">Exchanges</Link></li>
                <li><Link href="#" className="hover:text-brand-primary transition-colors">Non-Profits</Link></li>
                <li><Link href="#" className="hover:text-brand-primary transition-colors">Validators</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Safety</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><Link href="/security" className="hover:text-brand-primary transition-colors">Audits</Link></li>
                <li><Link href="#" className="hover:text-brand-primary transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-brand-primary transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <p>© 2024 Donate Protocol. Building in public.</p>
          <p>Built with care for a better planet.</p>
        </div>
      </div>
    </footer>
  );
}
