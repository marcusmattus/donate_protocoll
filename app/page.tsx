'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Modals from '@/components/Modals';
import Counter from '@/components/Counter';
import { useState } from 'react';
import { TrendingUp, Shield, CheckCircle2, Link as LinkIcon, BarChart2, Gift, Eye, ChevronDown } from 'lucide-react';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const dispatchWaitlistModal = () => {
    window.dispatchEvent(new CustomEvent('open-waitlist'));
  };

  return (
    <>
      <Navigation />
      <Modals />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-44 pb-32 overflow-hidden mesh-gradient">
          {/* Decorative Blobs */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] animate-float pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-3/5"
            >
              <div className="inline-flex items-center gap-2 bg-white/50 border border-white px-4 py-1.5 rounded-full mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">The Future of Altruistic Trading</span>
              </div>
              
              <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-8 tracking-tighter">
                Your Trades, <br />
                Their <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-accent italic font-light">Transformation.</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                Donate Protocol automatically channels micro-contributions from every trade into real-world impact. High-velocity trading meets high-impact living.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={dispatchWaitlistModal}
                  className="bg-brand-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all btn-hover-glow shadow-2xl shadow-brand-primary/20"
                >
                  Join the Movement
                </button>
                <Link href="/#impact" className="bg-white px-10 py-5 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  Explore Impact
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-2/5 relative animate-float"
            >
              {/* Impact Card Mockup */}
              <div className="glass-card rounded-[3rem] p-8 -rotate-3 relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Impact Wallet</p>
                    <h3 className="text-3xl font-display font-bold text-brand-dark">$4,290.15</h3>
                  </div>
                  <div className="bg-brand-accent/20 p-3 rounded-2xl">
                    <TrendingUp className="w-6 h-6 text-brand-accent" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-accent w-2/3"></div>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">67% of goal: Clean Water for Samuru Village</p>
                </div>
                <div className="mt-12 flex -space-x-4">
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-200"></div>
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-300"></div>
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-slate-400"></div>
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-brand-primary flex items-center justify-center text-white text-xs font-bold">+12k</div>
                </div>
              </div>
              {/* Decorative element behind card */}
              <div className="absolute -top-12 -right-12 w-full h-full bg-brand-accent/10 rounded-[3rem] border border-brand-accent/20 rotate-6 -z-10"></div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-brand-primary to-transparent animate-scroll-indicator"></div>
          </div>
        </section>

        {/* Metrics Ticker */}
        <section id="impact" className="py-12 border-y border-slate-200/60 bg-white/30 backdrop-blur-sm relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <div>
                <h4 className="text-4xl font-display font-bold text-brand-primary">
                  <Counter end={14201} prefix="$" />
                </h4>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mt-1">Total Donated</p>
              </div>
              <div>
                <h4 className="text-4xl font-display font-bold text-brand-dark">
                  <Counter end={892} suffix="+" />
                </h4>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mt-1">Active Traders</p>
              </div>
              <div>
                <h4 className="text-4xl font-display font-bold text-brand-accent">
                  <Counter end={42} suffix="k" />
                </h4>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mt-1">Lives Touched</p>
              </div>
              <div>
                <h4 className="text-4xl font-display font-bold text-brand-dark">
                  <Counter end={15} />
                </h4>
                <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mt-1">Global Projects</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
              <div className="max-w-2xl">
                <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tighter mb-6">Seamless impact, <br /><span className="text-brand-primary">no friction.</span></h2>
                <p className="text-xl text-slate-500">Traditional philanthropy is slow. We made it real-time. Link your existing tools and let your alpha create change.</p>
              </div>
              <div className="hidden md:block pb-4">
                <div className="w-24 h-24 border-2 border-dashed border-brand-accent/40 rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center">
                  <svg className="w-8 h-8 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <span className="step-number absolute -right-4 -top-8 text-9xl font-display font-bold opacity-20 transition-all group-hover:scale-110">01</span>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-brand-primary/5 rounded-2xl flex items-center justify-center mb-10 transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <LinkIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Connect Account</h3>
                  <p className="text-slate-500 leading-relaxed">Securely link your exchange or broker via read-only API keys or OAuth.</p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <span className="step-number absolute -right-4 -top-8 text-9xl font-display font-bold opacity-20">02</span>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-brand-primary/5 rounded-2xl flex items-center justify-center mb-10 transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <BarChart2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Trade Normally</h3>
                  <p className="text-slate-500 leading-relaxed">Execute your strategy exactly as you always do. We don&apos;t touch your liquidity.</p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <span className="step-number absolute -right-4 -top-8 text-9xl font-display font-bold opacity-20">03</span>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-brand-primary/5 rounded-2xl flex items-center justify-center mb-10 transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <Gift className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Auto-Donate</h3>
                  <p className="text-slate-500 leading-relaxed">System rounds up or deducts a tiny % from profits/trades automatically.</p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group relative p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <span className="step-number absolute -right-4 -top-8 text-9xl font-display font-bold opacity-20">04</span>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-brand-primary/5 rounded-2xl flex items-center justify-center mb-10 transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Track Impact</h3>
                  <p className="text-slate-500 leading-relaxed">See photos and data from the lives you&apos;ve improved on your dashboard.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Integrations Showcase */}
        <section className="py-24 bg-brand-dark overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-white font-display text-4xl font-bold mb-4">Integrate with the Industry Elite</h2>
              <p className="text-slate-400">Supporting 50+ major exchanges and custodial platforms.</p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['BINANCE', 'COINBASE', 'KRAKEN', 'BYBIT', 'OKX'].map((name, i) => (
                <div key={name} className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <span className={`text-xl font-bold text-white tracking-widest uppercase ${i % 2 === 1 ? 'italic' : ''}`}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Security */}
        <section id="security" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-br from-brand-primary to-brand-accent rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="font-display text-5xl font-bold leading-tight mb-8">Bank-Grade <br />Security by Design.</h2>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="mt-1 bg-white/20 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                      <div>
                        <p className="font-bold text-xl">Non-Custodial</p>
                        <p className="text-white/70">We never have access to your primary funds or keys.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 bg-white/20 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                      <div>
                        <p className="font-bold text-xl">Read-Only Access</p>
                        <p className="text-white/70">Connections only allow us to calculate trade volume.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 bg-white/20 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                      <div>
                        <p className="font-bold text-xl">AES-256 Encryption</p>
                        <p className="text-white/70">Your data is secured with industry-leading standards.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <motion.div 
                    initial={{ rotate: 0 }}
                    whileInView={{ rotate: 3 }}
                    viewport={{ once: true }}
                    className="aspect-square bg-brand-dark/20 backdrop-blur rounded-[3rem] p-1 flex items-center justify-center transform"
                  >
                    <div className="w-full h-full border border-white/30 rounded-[2.8rem] flex flex-col items-center justify-center text-center p-10">
                      <Shield className="w-24 h-24 mb-6 opacity-80" />
                      <p className="font-display font-bold text-2xl mb-2">Audited & Verified</p>
                      <p className="text-white/60">Passed independent security audits by QuantStamp (2024)</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-32">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-4xl font-bold text-center mb-16">Common Curiosities</h2>
            <div className="space-y-4">
              {[
                { 
                  q: "Does this affect my tax liability?", 
                  a: "Yes! In most jurisdictions, these contributions are considered charitable donations. We provide monthly tax-ready reports to help you potentially offset trading gains."
                },
                { 
                  q: "How much of my donation actually reaches the cause?", 
                  a: "98% of all funds rounded up go directly to the on-chain impact projects. We operate on a 2% fee to maintain the protocol and cover cross-chain transaction costs."
                },
                { 
                  q: "Can I choose which projects I support?", 
                  a: "Absolutely. Your dashboard allows you to select from our curated list of vetted global impact partners or distribute your contributions across all active missions."
                }
              ].map((faq, i) => (
                <div key={i} className="border-b border-slate-200">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="text-lg font-bold">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <motion.div 
                    initial={false}
                    animate={{ height: activeFaq === i ? 'auto' : 0, opacity: activeFaq === i ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-slate-500 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
