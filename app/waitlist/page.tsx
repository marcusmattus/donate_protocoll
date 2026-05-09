'use client';

import { motion } from 'motion/react';
import Navigation from '@/components/Navigation';
import { useState } from 'react';
import { CheckCircle2, ChevronDown, Twitter, Loader2, ArrowRight } from 'lucide-react';

export default function Waitlist() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [traderType, setTraderType] = useState('Retail Trader');
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setSuccess(true);
    }, 1500);
  };

  const copyRefLink = () => {
    navigator.clipboard.writeText('donate.io/join/ref-492k');
    alert('Link Copied!');
  };

  return (
    <>
      <Navigation />

      <main className="flex-grow pt-32 pb-20 flex items-center justify-center relative px-6 min-h-screen">
          {/* Abstract Background Ornaments */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
          <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
              
              {/* Storytelling Side */}
              <div className="order-2 lg:order-1">
                  <div className="space-y-8">
                      {!success ? (
                          <>
                              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter">
                                  Trading for a <br/>
                                  <span className="text-brand-accent italic font-light">Greater Good.</span>
                              </h1>
                              <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
                                  You&apos;re not just signing up for a platform; you&apos;re joining a global community of traders who believe alpha and altruism belong together.
                              </p>

                              <div className="space-y-6 pt-4">
                                  <div className="flex items-center gap-4 group">
                                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                          <ArrowRight className="w-6 h-6 text-brand-primary" />
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-lg">Instant Micro-Impact</h4>
                                          <p className="text-slate-400 text-sm">Round up every trade to the nearest dollar automatically.</p>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-4 group">
                                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                          <CheckCircle2 className="w-6 h-6 text-brand-accent" />
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-lg">Bank-Grade Privacy</h4>
                                          <p className="text-slate-400 text-sm">Non-custodial connection. We never touch your private keys.</p>
                                      </div>
                                  </div>
                              </div>
                          </>
                      ) : (
                          <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="animate-slide-up"
                          >
                              <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-4 py-1.5 rounded-full mb-6 relative">
                                  <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Registration Confirmed</span>
                              </div>
                              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] mb-6 tracking-tighter">
                                  You&apos;re part of the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary italic font-light animate-pulse-slow">movement.</span>
                              </h1>
                              <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                                  Welcome to the vanguard of ethical finance. We&apos;re verifying accounts in batches to ensure platform stability. Your position is secured.
                              </p>
                          </motion.div>
                      )}

                      {/* Social Proof */}
                      {!success && (
                          <div className="pt-10 flex flex-col gap-4">
                              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Trusted by early adopters from</p>
                              <div className="flex flex-wrap gap-6 opacity-40 grayscale">
                                  <span className="font-display font-bold text-lg">BINANCE</span>
                                  <span className="font-display font-bold text-lg italic">COINBASE</span>
                                  <span className="font-display font-bold text-lg">KRAKEN</span>
                              </div>
                          </div>
                      )}
                  </div>
              </div>

              {/* Waitlist Form / Success Side */}
              <div className="order-1 lg:order-2">
                  <div className={`p-8 md:p-12 rounded-3xl bg-brand-muted border border-[#dce0e5] flex-1 relative group ${!success ? 'overflow-hidden' : ''}`}>
                      {/* Progress Bar Animation */}
                      {!success && (
                          <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 overflow-hidden">
                              {loading && (
                                  <motion.div 
                                      initial={{ x: '-100%' }}
                                      animate={{ x: '100%' }}
                                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                      className="h-full bg-brand-accent w-1/3"
                                  ></motion.div>
                              )}
                          </div>
                      )}

                      {!success ? (
                          <motion.div 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                          >
                              <header className="mb-10">
                                  <h3 className="font-display text-3xl font-bold mb-2">Secure Early Access</h3>
                                  <p className="text-slate-500">Join the waitlist to be notified when we launch. Early adopters receive 0% fees for the first 12 months.</p>
                              </header>

                              <form onSubmit={handleSubmit} className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                      <div className="col-span-2 md:col-span-1 space-y-1">
                                          <label className="block text-[10px] font-bold uppercase opacity-50 ml-1">Full Name</label>
                                          <input type="text" required placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-[#cbd2da] outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-semibold" />
                                      </div>
                                      <div className="col-span-2 md:col-span-1 space-y-1">
                                          <label className="block text-[10px] font-bold uppercase opacity-50 ml-1">Preferred Handle</label>
                                          <input type="text" placeholder="@trader_vibe" className="w-full px-4 py-3 rounded-xl border border-[#cbd2da] outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-semibold" />
                                      </div>
                                  </div>

                                  <div className="space-y-1">
                                      <label className="block text-[10px] font-bold uppercase opacity-50 ml-1">Email Address</label>
                                      <input type="email" required placeholder="name@domain.com" className="w-full px-4 py-3 rounded-xl border border-[#cbd2da] outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-semibold" />
                                  </div>

                                  <div className="relative space-y-1">
                                      <label className="block text-[10px] font-bold uppercase opacity-50 ml-1">Trader Profile</label>
                                      <button 
                                          type="button" 
                                          onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#cbd2da] text-left flex justify-between items-center outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                                      >
                                          <span className="font-semibold">{traderType}</span>
                                          <ChevronDown className={`w-5 h-5 text-slate-400 transform transition-transform ${typeDropdownOpen ? 'rotate-180' : ''}`} />
                                      </button>
                                      {typeDropdownOpen && (
                                          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 z-20 overflow-hidden">
                                              {['Day Trader', 'Long-term Investor', 'Institutional / Whale', 'Swing Trader', 'Algo / Bot Developer'].map(type => (
                                                  <button 
                                                      key={type}
                                                      type="button" 
                                                      onClick={() => { setTraderType(type); setTypeDropdownOpen(false); }}
                                                      className="w-full px-6 py-3 text-left hover:bg-slate-50 transition-colors text-sm font-semibold border-b border-slate-50 last:border-0"
                                                  >
                                                      {type}
                                                  </button>
                                              ))}
                                          </div>
                                      )}
                                  </div>

                                  <div className="pt-4">
                                      <button 
                                          type="submit" 
                                          disabled={loading}
                                          className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-primary/90 transition-all shadow-lg flex items-center justify-center gap-3 group"
                                      >
                                          {!loading ? (
                                              <>
                                                  Secure Early Access
                                                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                              </>
                                          ) : (
                                              <>
                                                  <Loader2 className="w-5 h-5 animate-spin" />
                                                  Processing...
                                              </>
                                          )}
                                      </button>
                                      <p className="text-center text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-6">By joining, you agree to our Impact Charter</p>
                                  </div>
                              </form>
                          </motion.div>
                      ) : (
                          <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5 }}
                              className="relative"
                          >
                              <div className="absolute top-0 right-0 p-2 md:p-8">
                                  <div className="w-16 h-16 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary animate-float">
                                      <ArrowRight className="w-8 h-8 -rotate-45" />
                                  </div>
                              </div>

                              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Your Current Status</p>
                              <div className="flex items-baseline gap-3 mb-8">
                                  <h2 className="text-6xl font-display font-bold text-brand-dark">#1,422</h2>
                                  <span className="text-brand-accent font-bold">↑ 42 spots moved</span>
                              </div>

                              <div className="space-y-6">
                                  <div className="p-6 bg-brand-dark/5 rounded-2xl border border-white/50">
                                      <p className="text-sm font-semibold text-slate-500 mb-4">Invite fellow traders to skip the queue:</p>
                                      <div className="flex gap-2">
                                          <input readOnly value="donate.io/join/ref-492k" className="flex-grow bg-white px-5 py-3 rounded-xl border border-slate-200 font-mono text-sm text-brand-primary focus:outline-none" />
                                          <button onClick={copyRefLink} className="bg-brand-primary text-white px-6 rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all">Copy</button>
                                      </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4 text-sm font-bold text-slate-400 pb-6 border-b border-slate-200">
                                      <div className="flex -space-x-2 relative z-0">
                                          <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 relative z-10"></div>
                                          <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 relative z-20"></div>
                                          <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-accent flex items-center justify-center text-[10px] text-white relative z-30">+12</div>
                                      </div>
                                      <span>Friends already joined</span>
                                  </div>

                                  <button onClick={() => setSuccess(false)} className="block mx-auto text-sm font-bold text-slate-400 hover:text-brand-primary transition-colors text-center w-full">Submit another entry</button>
                              </div>
                          </motion.div>
                      )}

                      {/* Decorative Background Element */}
                      <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                  </div>
              </div>
          </div>
      </main>

      {/* Footer Stats */}
      <footer className="py-12 border-t border-slate-100 bg-white/50 backdrop-blur-md relative z-20">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center md:text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Waitlist Size</p>
                      <p className="text-2xl font-display font-bold">2,481 Traders</p>
                  </div>
                  <div className="text-center md:text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Impact Goal</p>
                      <p className="text-2xl font-display font-bold">$1M / Year</p>
                  </div>
                  <div className="text-center md:text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Supported Chains</p>
                      <p className="text-2xl font-display font-bold">12+ Major Networks</p>
                  </div>
                  <div className="text-center md:text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Launches In</p>
                      <p className="text-2xl font-display font-bold text-brand-accent">Q4 2024</p>
                  </div>
              </div>
          </div>
      </footer>
    </>
  );
}
