'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { FileText, Clock, FileWarning } from 'lucide-react';

export default function Success() {
  return (
    <>
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 relative min-h-screen">
          {/* Background Atmosphere */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] animate-float"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
              <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="glass-card rounded-[4rem] p-8 md:p-16 text-center relative overflow-hidden"
              >
                  {/* Inner Glow Decor */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary opacity-50"></div>

                  {/* Success Icon */}
                  <div className="mb-10 relative inline-block">
                      <div className="w-24 h-24 bg-brand-accent/10 rounded-3xl flex items-center justify-center rotate-6 scale-110 blur-xl absolute inset-0"></div>
                      <div className="w-24 h-24 bg-white border border-slate-100 rounded-3xl shadow-2xl flex items-center justify-center relative z-10 animate-float">
                          <motion.svg 
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.8, delay: 0.5 }}
                              className="w-12 h-12 text-brand-accent" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                          >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                          </motion.svg>
                      </div>
                  </div>

                  {/* Headline */}
                  <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                      Connectivity <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent">Confirmed.</span>
                  </h1>
                  
                  <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                      Your partnership inquiry has been successfully routed to our Institutional Relations team. We&apos;re ready to amplify your platform&apos;s altruistic impact.
                  </p>

                  {/* Next Steps Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-12 text-left">
                      <div className="p-8 bg-white/40 rounded-[2.5rem] border border-white relative group hover:bg-white transition-all duration-500">
                          <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6 text-brand-primary">
                              <Clock className="w-5 h-5" />
                          </div>
                          <h3 className="font-bold text-lg mb-2">Wait Time: &lt; 24h</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">A dedicated account manager is currently reviewing your profile and will reach out via the provided email.</p>
                      </div>
                      
                      <div className="p-8 bg-white/40 rounded-[2.5rem] border border-white relative group hover:bg-white transition-all duration-500">
                          <div className="w-10 h-10 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-6 text-brand-accent">
                              <FileWarning className="w-5 h-5" />
                          </div>
                          <h3 className="font-bold text-lg mb-2">Onboarding Kit</h3>
                          <p className="text-sm text-slate-500 leading-relaxed">We&apos;ve attached our Technical API Roadmap and Legal Framework to your confirmation email.</p>
                      </div>
                  </div>

                  {/* CTA Actions */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                      <button className="bg-brand-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all btn-hover-glow shadow-2xl shadow-brand-primary/20 flex items-center justify-center gap-3 w-full md:w-auto">
                          <FileText className="w-5 h-5" />
                          Technical PDF
                      </button>
                      <Link href="/" className="bg-white/50 px-10 py-5 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-white transition-colors w-full md:w-auto flex justify-center">
                          Return Home
                      </Link>
                  </div>

                  {/* Progress Tracker */}
                  <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-center gap-4">
                      <div className="flex items-center gap-2">
                          <div className="h-1.5 w-12 bg-brand-primary rounded-full"></div>
                          <div className="h-1.5 w-12 bg-slate-200 rounded-full"></div>
                          <div className="h-1.5 w-12 bg-slate-200 rounded-full"></div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Step 1 of 3: Verification</span>
                  </div>
              </motion.div>
          </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100 mt-auto relative z-20">
          <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-2 text-brand-dark">
                      <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-display font-bold">D</div>
                      <span className="font-display font-bold text-xl uppercase tracking-tighter">Donate Protocol</span>
                  </div>
                  <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 flex-wrap text-center">
                      <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
                      <a href="#" className="hover:text-brand-primary transition-colors">System Status</a>
                      <a href="#" className="hover:text-brand-primary transition-colors">Documentation</a>
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center md:text-right">
                      © 2024 Build for Good.
                  </div>
              </div>
          </div>
      </footer>
    </>
  );
}
