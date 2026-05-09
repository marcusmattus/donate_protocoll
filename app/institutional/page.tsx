'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Network, FileText, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Institutional() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/success');
  };

  return (
    <>
      <Navigation />

      <main className="flex-grow pt-32 pb-20 relative min-h-screen">
          <div className="max-w-7xl mx-auto px-6 grid xl:grid-cols-12 gap-16 items-start relative z-10">
              
              {/* Left Column: Storytelling / Trust */}
              <div className="xl:col-span-5 pt-12">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                      <div className="inline-flex items-center gap-2 bg-brand-primary/5 border border-brand-primary/10 px-4 py-1.5 rounded-full mb-6">
                          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary font-display">Institutional Access</span>
                      </div>
                      <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.1] mb-8 tracking-tighter">
                          Empower your users. <br/>
                          <span className="text-brand-accent">Exponetialize</span> impact.
                      </h1>
                      <p className="text-xl text-slate-500 mb-12 leading-relaxed">
                          Join the global ecosystem of exchanges, brokers, and Layer-1 protocols integrating the Donate Protocol standard. Turn volume into virtue with a single integration.
                      </p>

                      <div className="space-y-8">
                          <div className="flex gap-6">
                              <div className="w-12 h-12 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-accent">
                                  <Network className="w-6 h-6" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg mb-1">Ultra-Low Latency</h4>
                                  <p className="text-slate-500 text-sm">Our infrastructure is built for high-frequency environments, ensuring zero impact on your execution speed.</p>
                              </div>
                          </div>
                          <div className="flex gap-6">
                              <div className="w-12 h-12 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-primary">
                                  <FileText className="w-6 h-6" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg mb-1">Reporting & Compliance</h4>
                                  <p className="text-slate-500 text-sm">Automated tax documents and ESG reports for both your firm and your end-users.</p>
                              </div>
                          </div>
                      </div>

                      <div className="mt-16 p-8 bg-brand-dark rounded-[2rem] text-white relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full blur-3xl group-hover:bg-brand-accent/40 transition-colors"></div>
                          <p className="italic text-lg mb-6 leading-relaxed relative z-10">&quot;Donate Protocol has redefined our user retention strategy. Our traders aren&apos;t just looking at candles anymore; they&apos;re looking at the lives they&apos;re changing.&quot;</p>
                          <div className="flex items-center gap-4 relative z-10">
                              <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                              <div>
                                  <p className="font-bold text-sm">Sarah Chen</p>
                                  <p className="text-xs text-slate-400">Head of Partnerships, Global Exchange Group</p>
                              </div>
                          </div>
                      </div>
                  </motion.div>
              </div>

              {/* Right Column: High-Friction Form */}
              <div className="xl:col-span-7">
                  <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="glass-card rounded-[3rem] p-8 md:p-12 relative"
                  >
                      {/* Glow effect */}
                      <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(20,184,166,0.1)_0%,transparent_70%)] pointer-events-none -z-10"></div>
                      
                      <div className="flex justify-between items-center mb-10">
                          <h2 className="font-display text-3xl font-bold tracking-tight">Partner Application</h2>
                          <div className="flex gap-2">
                              {[1, 2, 3].map((i) => (
                                  <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${step >= i ? 'bg-brand-primary' : 'bg-slate-200'}`}></div>
                              ))}
                          </div>
                      </div>

                      <form onSubmit={handleSubmit} className="relative">
                          {/* Step 1: Institutional Basics */}
                          {step === 1 && (
                              <motion.div 
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -20 }}
                                  className="space-y-6"
                              >
                                  <div className="grid md:grid-cols-2 gap-6">
                                      <div className="space-y-2 col-span-2 md:col-span-1">
                                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Company Name</label>
                                          <input type="text" required placeholder="e.g. Nexus Capital" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm" />
                                      </div>
                                      <div className="space-y-2 col-span-2 md:col-span-1">
                                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">HQ Location</label>
                                          <input type="text" required placeholder="London, UK" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm" />
                                      </div>
                                      <div className="space-y-2 col-span-2">
                                          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Corporate Website</label>
                                          <input type="url" required placeholder="https://nexuscapital.com" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm" />
                                      </div>
                                  </div>
                                  <button type="button" onClick={() => setStep(2)} className="mt-10 w-full py-5 bg-brand-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                                      Technical Details
                                      <ArrowRight className="w-5 h-5" />
                                  </button>
                              </motion.div>
                          )}

                          {/* Step 2: Technical Scope */}
                          {step === 2 && (
                              <motion.div 
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="space-y-6"
                              >
                                  <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Integration Type</label>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                          <label className="cursor-pointer group">
                                              <input type="radio" name="int-type" className="hidden peer" defaultChecked />
                                              <div className="p-4 rounded-2xl border border-slate-200 bg-white peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition-all text-center">
                                                  <span className="block font-bold text-sm">Direct API</span>
                                                  <span className="text-[10px] text-slate-400">Custom Infrastructure</span>
                                              </div>
                                          </label>
                                          <label className="cursor-pointer group">
                                              <input type="radio" name="int-type" className="hidden peer" />
                                              <div className="p-4 rounded-2xl border border-slate-200 bg-white peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition-all text-center">
                                                  <span className="block font-bold text-sm">Embedded Widget</span>
                                                  <span className="text-[10px] text-slate-400">Low-code UI</span>
                                              </div>
                                          </label>
                                          <label className="cursor-pointer group">
                                              <input type="radio" name="int-type" className="hidden peer" />
                                              <div className="p-4 rounded-2xl border border-slate-200 bg-white peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition-all text-center">
                                                  <span className="block font-bold text-sm">Layer-1 / Node</span>
                                                  <span className="text-[10px] text-slate-400">Protocol Level</span>
                                              </div>
                                          </label>
                                      </div>
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Estimated User Base</label>
                                      <select className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm appearance-none">
                                          <option>1,000 - 10,000 users</option>
                                          <option>10,000 - 100,000 users</option>
                                          <option>100,000 - 1,000,000 users</option>
                                          <option>1M+ users (Enterprise Tier)</option>
                                      </select>
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Monthly Trading Volume (USD)</label>
                                      <input type="text" placeholder="e.g. $500M+" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm" />
                                  </div>
                                  
                                  <div className="flex gap-4 mt-8">
                                      <button type="button" onClick={() => setStep(1)} className="w-[30%] py-5 bg-white text-brand-dark rounded-2xl font-bold flex justify-center items-center gap-2 border border-slate-200 hover:bg-slate-50 transition-colors">
                                          <ArrowLeft className="w-5 h-5"/> Back
                                      </button>
                                      <button type="button" onClick={() => setStep(3)} className="w-[70%] py-5 bg-brand-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                                          Final Verification
                                          <ArrowRight className="w-5 h-5" />
                                      </button>
                                  </div>
                              </motion.div>
                          )}

                          {/* Step 3: Contact & Submit */}
                          {step === 3 && (
                              <motion.div 
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="space-y-6"
                              >
                                  <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Primary Point of Contact</label>
                                      <input type="text" required placeholder="Full Name" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm" />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Priority Work Email</label>
                                      <input type="email" required placeholder="name@company.com" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm" />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Partnership Objectives</label>
                                      <textarea rows={4} required placeholder="How do you envision Donate Protocol enhancing your ecosystem?" className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-100 outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm resize-none"></textarea>
                                  </div>
                                  
                                  <div className="flex gap-4 mt-8">
                                      <button type="button" onClick={() => setStep(2)} className="w-[30%] py-5 bg-white text-brand-dark rounded-2xl font-bold flex justify-center items-center gap-2 border border-slate-200 hover:bg-slate-50 transition-colors">
                                          <ArrowLeft className="w-5 h-5"/> Back
                                      </button>
                                      <button type="submit" className="w-[70%] py-5 bg-brand-accent text-white rounded-2xl font-bold btn-hover-glow transition-all shadow-xl shadow-brand-accent/20">
                                          Submit Request
                                      </button>
                                  </div>
                              </motion.div>
                          )}
                      </form>
                  </motion.div>
              </div>
          </div>
          
          {/* Atmosphere Blobs */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
              <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
              <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[150px] animate-float"></div>
          </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100 relative z-20">
          <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-display font-bold">D</div>
                      <span className="font-display font-bold text-xl">Donate Protocol</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                      <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
                      <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
                      <a href="#" className="hover:text-brand-primary transition-colors">System Status</a>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center md:text-right">© 2024 DP Institutional Partners Ltd.</p>
              </div>
          </div>
      </footer>
    </>
  );
}
