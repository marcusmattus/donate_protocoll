'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Counter from '@/components/Counter';
import { ArrowRight, CheckCircle2, Shield, Link as LinkIcon, Users, TrendingUp, BarChart2, Copy, Check, Terminal } from 'lucide-react';
import { useState } from 'react';

const INSTALL_COMMANDS: Record<string, string> = {
  npm: 'npm install -g @donate-protocol/cli',
  pnpm: 'pnpm add -g @donate-protocol/cli',
  yarn: 'yarn global add @donate-protocol/cli',
  bun: 'bun add -g @donate-protocol/cli',
};

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activePm, setActivePm] = useState<string>('npm');
  const [installCopied, setInstallCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText(INSTALL_COMMANDS[activePm]).then(() => {
      setInstallCopied(true);
      setTimeout(() => setInstallCopied(false), 2000);
    });
  };

  return (
    <>
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-44 pb-32 overflow-hidden mesh-gradient">
            {/* Decorative Blobs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse-slow pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] animate-float pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 flex flex-col lg:flex-row items-center gap-16">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-7/12"
                >
                    <div className="inline-flex items-center gap-2 bg-brand-accent/20 px-4 py-1.5 rounded-full mb-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#528c31]">Beta Access Live</span>
                    </div>
                    
                    <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
                        Trade normally.<br />
                        Donate <span className="text-transparent bg-clip-text bg-[linear-gradient(to_right,var(--color-brand-primary),var(--color-brand-accent),var(--color-brand-primary))] bg-[length:200%_auto] animate-gradient-text">Micro-amounts</span> <br className="hidden md:block" />automatically.
                    </h1>
                    
                    <p className="text-lg opacity-70 mb-10 max-w-lg leading-relaxed">
                        The social impact trading layer that enables traders to support real-world communities through every execution, without affecting your strategy.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link href="/waitlist" className="bg-brand-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center">
                            Join Waitlist
                        </Link>
                        <a
                          href="https://github.com/marcusmattus/donate_protocoll"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-4 font-semibold border border-brand-dark/20 rounded-xl hover:border-brand-dark/40 transition-all"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                          View on GitHub
                        </a>
                        <a href="#how-it-works" className="flex items-center gap-2 px-6 py-4 font-semibold opacity-80 hover:opacity-100 transition-opacity">
                            View Live Impact
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                   className="w-full lg:w-5/12 relative animate-float"
                >
                    {/* Impact Card Mockup */}
                    <div className="bg-brand-primary text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <TrendingUp className="w-32 h-32 text-white" />
                        </div>
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Platform Impact</p>
                                <h3 className="text-4xl font-display font-bold">$1,248,302</h3>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold">+12% Today</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                            <div className="bg-white/10 p-4 rounded-2xl">
                                <p className="text-[10px] uppercase opacity-70 mb-1">Communities Served</p>
                                <p className="text-xl font-bold">420+</p>
                            </div>
                            <div className="bg-white/10 p-4 rounded-2xl">
                                <p className="text-[10px] uppercase opacity-70 mb-1">Active Traders</p>
                                <p className="text-xl font-bold">45,219</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-black/10 border border-white/10 relative z-10">
                            <Shield className="w-5 h-5 text-brand-accent" />
                            <span className="text-xs font-semibold">Audited by Trail of Bits & Quantstamp</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-brand-primary to-transparent animate-scroll-indicator"></div>
            </div>
        </section>

        {/* CLI Quick Start Section */}
        <section className="py-24 relative bg-brand-dark overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-brand-accent/20 border border-brand-accent/30 px-4 py-1.5 rounded-full mb-6">
                <Terminal className="w-3.5 h-3.5 text-brand-accent" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Developer Quick Start</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
                Up and running <span className="text-brand-accent">in 30 seconds.</span>
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Install the CLI, connect your exchange, and start donating from every trade.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              {/* Install block */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">1. Install</p>
                {/* Tab switcher */}
                <div className="flex gap-2 mb-3">
                  {['npm', 'pnpm', 'yarn', 'bun'].map(pm => (
                    <button
                      key={pm}
                      onClick={() => setActivePm(pm)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${activePm === pm ? 'bg-brand-primary text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
                {/* Terminal window */}
                <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                    <span className="ml-2 text-slate-500 text-xs font-mono">terminal</span>
                    <button
                      onClick={copyInstall}
                      aria-label="Copy install command"
                      className="ml-auto flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs font-mono"
                    >
                      {installCopied ? (
                        <><Check className="w-3.5 h-3.5 text-green-400" /><span className="text-green-400">Copied!</span></>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" />Copy</>
                      )}
                    </button>
                  </div>
                  <div className="p-5 font-mono text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-brand-accent select-none">$</span>
                      <span className="text-slate-100 break-all">{INSTALL_COMMANDS[activePm]}</span>
                    </div>
                    <div className="mt-3 text-green-400 text-xs">✓ @donate-protocol/cli installed successfully</div>
                  </div>
                </div>
              </div>

              {/* Run commands block */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">2. Connect &amp; Run</p>
                <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50" style={{marginTop: '2.25rem'}}>
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                    <span className="ml-2 text-slate-500 text-xs font-mono">terminal</span>
                  </div>
                  <div className="p-5 font-mono text-sm space-y-2">
                    <div className="flex gap-2"><span className="text-brand-accent select-none">$</span><span className="text-slate-100">donate init</span></div>
                    <div className="flex gap-2"><span className="text-brand-accent select-none">$</span><span className="text-slate-100">donate connect --exchange binance</span></div>
                    <div className="text-green-400 text-xs pl-4">✓ Connected to Binance sandbox</div>
                    <div className="flex gap-2"><span className="text-brand-accent select-none">$</span><span className="text-slate-100">donate config --rate 0.1%</span></div>
                    <div className="flex gap-2"><span className="text-brand-accent select-none">$</span><span className="text-slate-100">donate run</span></div>
                    <div className="text-slate-400 text-xs pl-4">Watching trades… micro-donations active ✓</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3-step setup cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {[
                { step: '01', label: 'Install', title: 'Install the CLI', desc: 'One command installs the @donate-protocol/cli globally. Works with npm, pnpm, yarn, or bun.' },
                { step: '02', label: 'Connect', title: 'Link Your Exchange', desc: 'Add a read-only API key for Binance, Coinbase, Kraken or any supported exchange. No withdrawal access needed.' },
                { step: '03', label: 'Run', title: 'Start Donating', desc: 'Execute `donate run` and the protocol silently rounds up or deducts micro-amounts from every trade you make.' },
              ].map(({ step, label, title, desc }) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-8 backdrop-blur"
                >
                  <div className="text-brand-accent font-mono font-bold text-xs mb-3">{step} / {label}</div>
                  <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/cli" className="inline-flex items-center gap-2 font-bold text-brand-accent hover:text-white transition-colors">
                Read the full CLI guide
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Metrics Ticker */}
        <section id="impact" className="py-12 border-y border-slate-200/60 bg-white/50 backdrop-blur-md relative z-20">
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
                        <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tighter mb-6">Seamless impact, <br/><span className="text-brand-primary">no friction.</span></h2>
                        <p className="text-xl text-slate-500">Traditional philanthropy is slow. We made it real-time. Link your existing tools and let your alpha create change.</p>
                    </div>
                    <div className="hidden md:block pb-4">
                        <div className="w-24 h-24 border-2 border-dashed border-brand-accent/40 rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
                            <ArrowRight className="w-8 h-8 text-brand-accent -rotate-45" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Step 1 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="p-6 rounded-2xl bg-white border border-brand-muted"
                    >
                        <div className="text-xs font-bold text-brand-primary mb-2">01</div>
                        <h3 className="text-lg font-bold mb-2">Connect Wallet</h3>
                        <p className="text-sm opacity-70 leading-relaxed">Securely link your exchange or broker via read-only API keys or OAuth.</p>
                    </motion.div>
                    
                    {/* Step 2 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-white border border-brand-muted"
                    >
                        <div className="text-xs font-bold text-brand-primary mb-2">02</div>
                        <h3 className="text-lg font-bold mb-2">Select Causes</h3>
                        <p className="text-sm opacity-70 leading-relaxed">Choose global impact projects to distribute your contributions across.</p>
                    </motion.div>

                    {/* Step 3 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-white border border-brand-muted"
                    >
                        <div className="text-xs font-bold text-brand-primary mb-2">03</div>
                        <h3 className="text-lg font-bold mb-2">Trade Normally</h3>
                        <p className="text-sm opacity-70 leading-relaxed">Execute your strategy exactly as you always do. We don&apos;t touch your liquidity.</p>
                    </motion.div>

                    {/* Step 4 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-2xl bg-brand-accent/10 border border-brand-accent/30"
                    >
                        <div className="text-xs font-bold text-[#528c31] mb-2">04</div>
                        <h3 className="text-lg font-bold mb-2">Automated Impact</h3>
                        <p className="text-sm opacity-70 leading-relaxed">System rounds up or deducts a tiny % from profits/trades automatically.</p>
                    </motion.div>
                </div>
            </div>
        </section>

        {/* Integrations Showcase */}
        <section className="py-24 bg-white border-t border-brand-muted relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 whitespace-nowrap">Compatible Ecosystems</span>
                    <div className="flex flex-wrap items-center gap-12 opacity-30 grayscale flex-1">
                        <div className="flex items-center gap-2 font-bold text-sm tracking-tighter italic">BINANCE</div>
                        <div className="flex items-center gap-2 font-bold text-sm tracking-tighter italic">COINBASE</div>
                        <div className="flex items-center gap-2 font-bold text-sm tracking-tighter italic">KRAKEN</div>
                        <div className="flex items-center gap-2 font-bold text-sm tracking-tighter italic">METAMASK</div>
                        <div className="flex items-center gap-2 font-bold text-sm tracking-tighter italic">UNISWAP</div>
                        <div className="flex items-center gap-2 font-bold text-sm tracking-tighter italic">GEMINI</div>
                    </div>
                </div>
            </div>
        </section>

        {/* Trust & Security */}
        <section id="trust" className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-brand-primary to-brand-accent rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="font-display text-5xl font-bold leading-tight mb-8">Bank-Grade <br/>Security by Design.</h2>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 bg-white/20 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-white" /></div>
                                    <div>
                                        <p className="font-bold text-xl">Non-Custodial</p>
                                        <p className="text-white/70">We never have access to your primary funds or keys.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 bg-white/20 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-white" /></div>
                                    <div>
                                        <p className="font-bold text-xl">Read-Only Access</p>
                                        <p className="text-white/70">Connections only allow us to calculate trade volume.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="mt-1 bg-white/20 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-white" /></div>
                                    <div>
                                        <p className="font-bold text-xl">AES-256 Encryption</p>
                                        <p className="text-white/70">Your data is secured with industry-leading standards.</p>
                                    </div>
                                </li>
                            </ul>
                            
                            <div className="mt-10">
                               <Link href="/security" className="inline-flex items-center gap-2 text-white font-bold hover:underline">
                                   Read our Security Whitepaper <ArrowRight className="w-4 h-4" />
                               </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <motion.div 
                                initial={{ rotate: 0 }}
                                whileInView={{ rotate: 3 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                viewport={{ once: true }}
                                className="aspect-square bg-brand-dark/20 backdrop-blur rounded-[3rem] p-1 flex items-center justify-center transform"
                            >
                                <div className="w-full h-full border border-white/30 rounded-[2.8rem] flex flex-col items-center justify-center text-center p-10">
                                    <Shield className="w-24 h-24 mb-6 opacity-80 text-white" />
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
        <section className="py-32">
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
                                aria-expanded={activeFaq === i}
                                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                            >
                                <span className="text-lg font-bold group-hover:text-brand-primary transition-colors">{faq.q}</span>
                                <svg className={`w-5 h-5 transition-transform ${activeFaq === i ? 'rotate-180 text-brand-primary' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
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

      {/* Footer */}
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
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                      <div>
                          <h4 className="font-bold mb-6">Platform</h4>
                          <ul className="space-y-4 text-slate-500 text-sm">
                              <li><a href="#how-it-works" className="hover:text-brand-primary transition-colors">How it Works</a></li>
                              <li><Link href="/cli" className="hover:text-brand-primary transition-colors">CLI Quick Start</Link></li>
                              <li><Link href="/institutional" className="hover:text-brand-primary transition-colors">Integrations</Link></li>
                              <li><a href="#" className="hover:text-brand-primary transition-colors">Fees</a></li>
                              <li><a href="#" className="hover:text-brand-primary transition-colors">Tax Reports</a></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-bold mb-6">Partners</h4>
                          <ul className="space-y-4 text-slate-500 text-sm">
                              <li><Link href="/institutional" className="hover:text-brand-primary transition-colors">Exchanges</Link></li>
                              <li><Link href="/institutional" className="hover:text-brand-primary transition-colors">Non-Profits</Link></li>
                              <li><a href="#" className="hover:text-brand-primary transition-colors">Validators</a></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-bold mb-6">Safety</h4>
                          <ul className="space-y-4 text-slate-500 text-sm">
                              <li><Link href="/security" className="hover:text-brand-primary transition-colors">Audits</Link></li>
                              <li><Link href="/security" className="hover:text-brand-primary transition-colors">Privacy</Link></li>
                              <li><Link href="/security" className="hover:text-brand-primary transition-colors">Compliance</Link></li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <p>© 2024 Donate Protocol. Building in public.</p>
                  <p>Built with ❤️ for a better planet.</p>
              </div>
          </div>
      </footer>
    </>
  );
}
