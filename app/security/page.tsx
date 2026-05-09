'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useState } from 'react';
import { Lock, FileSignature, Landmark, ChevronDown, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

export default function Security() {
  const [activeFaq, setActiveFaq] = useState<number>(1);

  return (
    <>
      <Navigation />

      <main className="pt-32 pb-20">
          {/* Hero Header */}
          <section className="max-w-7xl mx-auto px-6 mb-20 relative">
              <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>

              <div className="flex flex-col items-center text-center relative z-10">
                  <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                  >
                      <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-4 py-1.5 rounded-full mb-6 relative overflow-hidden">
                          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Security First Infrastructure</span>
                      </div>
                      <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl">
                          Transparency is our <br/> <span className="text-brand-primary italic">Highest Alpha.</span>
                      </h1>
                      <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mx-auto">
                          Donate Protocol is engineered for trust. We combine bank-grade security with on-chain verifiability so you can focus on trading while we handle the impact.
                      </p>
                  </motion.div>
              </div>
          </section>

          {/* The Pillars Grid */}
          <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-32 relative z-10">
              <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-10 rounded-[3rem] border-b-4 border-brand-primary/20 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all"
              >
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8 group overflow-hidden">
                      <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">Non-Custodial</h3>
                  <p className="text-slate-500 leading-relaxed">Your funds never leave your exchange. We use restricted API scopes that permit trade-read only—no withdrawal permissions, ever.</p>
              </motion.div>

              <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-10 rounded-[3rem] border-b-4 border-brand-accent/20 hover:shadow-2xl hover:shadow-brand-accent/5 transition-all"
              >
                  <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mb-8">
                      <FileSignature className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">Audited Contracts</h3>
                  <p className="text-slate-500 leading-relaxed">Our smart contracts are triple-audited by leading firms. All donation flows are visible on-chain for real-time verification.</p>
              </motion.div>

              <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="glass-card p-10 rounded-[3rem] border-b-4 border-brand-dark/10 hover:shadow-2xl transition-all"
              >
                  <div className="w-16 h-16 bg-brand-dark/5 rounded-2xl flex items-center justify-center text-brand-dark mb-8">
                      <Landmark className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">Tax Optimized</h3>
                  <p className="text-slate-500 leading-relaxed">We provide automated 501(c)(3) compliant digital receipts and annual summaries, simplifying your tax season globally.</p>
              </motion.div>
          </section>

          {/* Detailed Trust Center (FAQ Expansion) */}
          <section className="max-w-4xl mx-auto px-6 mb-32 relative z-10">
              <div className="text-center mb-16">
                  <h2 className="font-display text-4xl font-bold mb-4">Technical Deep-Dive</h2>
                  <p className="text-slate-500">The specifics of how we keep your data and impact secure.</p>
              </div>

              <div className="space-y-4">
                  {/* Smart Contracts */}
                  <div className="glass-card rounded-3xl overflow-hidden border border-slate-200/50">
                      <button onClick={() => setActiveFaq(activeFaq === 1 ? 0 : 1)} className="w-full p-8 flex justify-between items-center text-left hover:bg-white/50 transition-colors">
                          <div className="flex items-center gap-6">
                              <span className="font-display text-2xl font-bold text-brand-primary/40">01</span>
                              <span className="text-xl font-bold">Smart Contract Infrastructure</span>
                          </div>
                          <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${activeFaq === 1 ? 'rotate-180' : ''}`} />
                      </button>
                      <motion.div 
                          initial={false}
                          animate={{ height: activeFaq === 1 ? 'auto' : 0, opacity: activeFaq === 1 ? 1 : 0 }}
                          className="overflow-hidden"
                      >
                          <div className="px-8 pb-8 pt-2 text-slate-600 space-y-4 leading-relaxed">
                              <p>Our donation routing occurs through the <span className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded text-brand-primary">DonateRouter v2.1</span>, an immutable contract architecture deployed across Ethereum, Arbitrum, and Polygon.</p>
                              <div className="bg-brand-dark/5 rounded-2xl p-6 border border-brand-dark/10">
                                  <h4 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                                      <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                                      Recent Audit Status
                                  </h4>
                                  <div className="space-y-4">
                                      <div>
                                          <div className="flex justify-between items-center mb-2">
                                              <span className="text-sm font-semibold">QuantStamp Security Audit</span>
                                              <span className="text-xs bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full font-bold uppercase">Passed</span>
                                          </div>
                                          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                              <motion.div className="h-full bg-brand-accent" initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1 }}></motion.div>
                                          </div>
                                      </div>
                                      <div>
                                          <div className="flex justify-between items-center mb-2">
                                              <span className="text-sm font-semibold">Spearbit Pro Code Review</span>
                                              <span className="text-xs bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full font-bold uppercase">Passed</span>
                                          </div>
                                          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                              <motion.div className="h-full bg-brand-accent" initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}></motion.div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </motion.div>
                  </div>

                  {/* API Security */}
                  <div className="glass-card rounded-3xl overflow-hidden border border-slate-200/50">
                      <button onClick={() => setActiveFaq(activeFaq === 2 ? 0 : 2)} className="w-full p-8 flex justify-between items-center text-left hover:bg-white/50 transition-colors">
                          <div className="flex items-center gap-6">
                              <span className="font-display text-2xl font-bold text-brand-primary/40">02</span>
                              <span className="text-xl font-bold">API Scope & Security</span>
                          </div>
                          <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${activeFaq === 2 ? 'rotate-180' : ''}`} />
                      </button>
                      <motion.div 
                          initial={false}
                          animate={{ height: activeFaq === 2 ? 'auto' : 0, opacity: activeFaq === 2 ? 1 : 0 }}
                          className="overflow-hidden"
                      >
                          <div className="px-8 pb-8 pt-2 text-slate-600 space-y-4">
                              <p>We utilize the principle of &quot;Least Privilege.&quot; When connecting your exchange, our system validation rejects any API key that has &apos;Withdraw&apos; or &apos;Transfer&apos; permissions enabled.</p>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <li className="flex items-center gap-3 text-sm font-semibold p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4"/></div>
                                      Read Trade History
                                  </li>
                                  <li className="flex items-center gap-3 text-sm font-semibold p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4"/></div>
                                      Read Balance Info
                                  </li>
                                  <li className="flex items-center gap-3 text-sm font-semibold p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 shadow-sm">
                                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center"><ShieldAlert className="w-4 h-4"/></div>
                                      Withdrawal Rights
                                  </li>
                                  <li className="flex items-center gap-3 text-sm font-semibold p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 shadow-sm">
                                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center"><ShieldAlert className="w-4 h-4"/></div>
                                      Transfer Asset Rights
                                  </li>
                              </ul>
                          </div>
                      </motion.div>
                  </div>

                  {/* Tax & Documentation */}
                  <div className="glass-card rounded-3xl overflow-hidden border border-slate-200/50">
                      <button onClick={() => setActiveFaq(activeFaq === 3 ? 0 : 3)} className="w-full p-8 flex justify-between items-center text-left hover:bg-white/50 transition-colors">
                          <div className="flex items-center gap-6">
                              <span className="font-display text-2xl font-bold text-brand-primary/40">03</span>
                              <span className="text-xl font-bold">Tax Documentation & Deduction</span>
                          </div>
                          <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${activeFaq === 3 ? 'rotate-180' : ''}`} />
                      </button>
                      <motion.div 
                          initial={false}
                          animate={{ height: activeFaq === 3 ? 'auto' : 0, opacity: activeFaq === 3 ? 1 : 0 }}
                          className="overflow-hidden"
                      >
                          <div className="px-8 pb-8 pt-2 text-slate-600 space-y-4">
                              <p>For high-frequency traders, charitable micro-donations can become a significant tax advantage. We automate the paperwork so the financial benefit returns to you.</p>
                              <div className="flex flex-col md:flex-row gap-4">
                                  <div className="flex-1 p-5 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                                      <p className="font-bold text-brand-dark mb-1">Monthly Ledger</p>
                                      <p className="text-xs">Individual transaction hashes and donation amounts mapped to trade IDs.</p>
                                  </div>
                                  <div className="flex-1 p-5 rounded-2xl bg-brand-accent/5 border border-brand-accent/10">
                                      <p className="font-bold text-brand-dark mb-1">Impact Report</p>
                                      <p className="text-xs">Visual documentation and narrative reports from NGOs for your records.</p>
                                  </div>
                              </div>
                          </div>
                      </motion.div>
                  </div>
              </div>
          </section>

          {/* Final Call to Action */}
          <section className="max-w-5xl mx-auto px-6 relative z-10">
              <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative bg-brand-dark rounded-[4rem] p-12 md:p-20 text-center overflow-hidden"
              >
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-accent/20 opacity-40"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                      <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Ready to trade with <br/><span className="text-brand-accent italic font-light">intentionality?</span></h2>
                      <p className="text-slate-400 text-lg mb-10 max-w-xl">Join the waitlist today and be among the first to prove that wealth and impact aren&apos;t mutually exclusive.</p>
                      <Link href="/waitlist" className="bg-white text-brand-dark px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 group">
                          Get Early Access <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                  </div>
              </motion.div>
          </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-20 border-t border-slate-100 relative z-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-display font-bold">D</div>
                  <span className="font-display font-bold text-xl">Donate Protocol</span>
              </div>
              <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <Link href="#" className="hover:text-brand-primary transition-colors">Documentation</Link>
                  <Link href="#" className="hover:text-brand-primary transition-colors">GitHub</Link>
                  <Link href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
                  <Link href="#" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
              </div>
              <p className="text-slate-400 text-xs">© 2024 Donate Protocol. Security verified by independent audits.</p>
          </div>
      </footer>
    </>
  );
}
