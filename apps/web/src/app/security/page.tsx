'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Navigation, Footer } from '@/components/layout'

export default function SecurityPage() {
  const [activeSection, setActiveSection] = useState<number | null>(1)

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-4 py-1.5 rounded-full mb-6">
              <svg className="w-4 h-4 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.666.92v6.57a8.601 8.601 0 01-5.109 7.942l-3.057 1.31a1 1 0 01-.668 0l-3.057-1.31A8.601 8.601 0 011.5 12.44V5.82a1 1 0 01.666-.92zm7.834 1.257L4.5 8.52v3.92c0 3.655 2.378 6.75 5.5 7.792 3.122-1.042 5.5-4.137 5.5-7.792V8.52L10 6.157z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Security First Infrastructure</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl">
              Transparency is our <br /> 
              <span className="text-brand-primary italic">Highest Alpha.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              Donate Protocol is engineered for trust. We combine bank-grade security with on-chain verifiability so you can focus on trading while we handle the impact.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-32">
        <div className="glass-card p-10 rounded-[3rem] border-b-4 border-brand-primary/20">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Non-Custodial</h3>
          <p className="text-slate-500 leading-relaxed">
            Your funds never leave your exchange. We use restricted API scopes that permit trade-read only - no withdrawal permissions, ever.
          </p>
        </div>

        <div className="glass-card p-10 rounded-[3rem] border-b-4 border-brand-accent/20">
          <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mb-8">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Audited Contracts</h3>
          <p className="text-slate-500 leading-relaxed">
            Our smart contracts are triple-audited by leading firms. All donation flows are visible on-chain for real-time verification.
          </p>
        </div>

        <div className="glass-card p-10 rounded-[3rem] border-b-4 border-brand-dark/10">
          <div className="w-16 h-16 bg-brand-dark/5 rounded-2xl flex items-center justify-center text-brand-dark mb-8">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Tax Optimized</h3>
          <p className="text-slate-500 leading-relaxed">
            We provide automated 501(c)(3) compliant digital receipts and annual summaries, simplifying your tax season globally.
          </p>
        </div>
      </section>

      {/* Technical Deep-Dive */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Deep-Dive</h2>
          <p className="text-slate-500">The specifics of how we keep your data and impact secure.</p>
        </div>

        <div className="space-y-4">
          {/* Smart Contracts */}
          <div className="glass-card rounded-3xl overflow-hidden border border-slate-200/50">
            <button 
              onClick={() => setActiveSection(activeSection === 1 ? null : 1)}
              className="w-full p-8 flex justify-between items-center text-left hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="text-2xl font-bold text-brand-primary/40">01</span>
                <span className="text-xl font-bold">Smart Contract Infrastructure</span>
              </div>
              <svg className={`w-6 h-6 transition-transform duration-300 ${activeSection === 1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 1 && (
              <div className="px-8 pb-8 pt-2 text-slate-600 space-y-4 leading-relaxed">
                <p>
                  Our donation routing occurs through the <code className="text-sm bg-slate-100 px-1.5 py-0.5 rounded text-brand-primary">DonateRouter v2.1</code>, 
                  an immutable contract architecture deployed across Ethereum, Arbitrum, and Polygon.
                </p>
                <div className="bg-brand-dark/5 rounded-2xl p-6 border border-brand-dark/10">
                  <h4 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    Recent Audit Status
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">QuantStamp Security Audit</span>
                      <span className="text-xs bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full font-bold uppercase">Passed</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-accent w-full" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Spearbit Pro Code Review</span>
                      <span className="text-xs bg-brand-accent/20 text-brand-accent px-3 py-1 rounded-full font-bold uppercase">Passed</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-accent w-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* API Security */}
          <div className="glass-card rounded-3xl overflow-hidden border border-slate-200/50">
            <button 
              onClick={() => setActiveSection(activeSection === 2 ? null : 2)}
              className="w-full p-8 flex justify-between items-center text-left hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="text-2xl font-bold text-brand-primary/40">02</span>
                <span className="text-xl font-bold">API Scope & Security</span>
              </div>
              <svg className={`w-6 h-6 transition-transform duration-300 ${activeSection === 2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 2 && (
              <div className="px-8 pb-8 pt-2 text-slate-600 space-y-4">
                <p>
                  We utilize the principle of "Least Privilege." When connecting your exchange, our system validation 
                  rejects any API key that has Withdraw or Transfer permissions enabled.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm font-semibold p-4 bg-white rounded-2xl border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">&#10003;</div>
                    Read Trade History
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold p-4 bg-white rounded-2xl border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">&#10003;</div>
                    Read Balance Info
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">&#10005;</div>
                    Withdrawal Rights
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">&#10005;</div>
                    Transfer Asset Rights
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tax Documentation */}
          <div className="glass-card rounded-3xl overflow-hidden border border-slate-200/50">
            <button 
              onClick={() => setActiveSection(activeSection === 3 ? null : 3)}
              className="w-full p-8 flex justify-between items-center text-left hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="text-2xl font-bold text-brand-primary/40">03</span>
                <span className="text-xl font-bold">Tax Documentation & Deduction</span>
              </div>
              <svg className={`w-6 h-6 transition-transform duration-300 ${activeSection === 3 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {activeSection === 3 && (
              <div className="px-8 pb-8 pt-2 text-slate-600 space-y-4">
                <p>
                  For high-frequency traders, charitable micro-donations can become a significant tax advantage. 
                  We automate the paperwork so the financial benefit returns to you.
                </p>
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
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="relative bg-brand-dark rounded-[4rem] p-12 md:p-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-accent/20 opacity-40" />
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to trade with <br />
              <span className="text-brand-accent italic">intentionality?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl">
              {"Join the waitlist today and be among the first to prove that wealth and impact aren't mutually exclusive."}
            </p>
            <Link 
              href="/waitlist" 
              className="bg-white text-brand-dark px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-white/5"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
