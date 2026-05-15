'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Navigation, Footer } from '@/components/layout'

const traderTypes = ['Retail Trader', 'Day Trader', 'Long-term Investor', 'Institutional / Whale', 'Swing Trader', 'Algo / Bot Developer']

export default function WaitlistPage() {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [traderType, setTraderType] = useState('Retail Trader')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-grow pt-32 pb-20 flex items-center justify-center relative px-6">
        {/* Background elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px]" />

        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Left Side - Storytelling */}
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter">
                Trading for a <br />
                <span className="text-brand-accent italic font-light">Greater Good.</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
                {"You're not just signing up for a platform; you're joining a global community of traders who believe alpha and altruism belong together."}
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Instant Micro-Impact</h4>
                    <p className="text-slate-400 text-sm">Round up every trade to the nearest dollar automatically.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Bank-Grade Privacy</h4>
                    <p className="text-slate-400 text-sm">Non-custodial connection. We never touch your private keys.</p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="pt-10 flex flex-col gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Trusted by early adopters from</p>
                <div className="flex flex-wrap gap-6 opacity-40 grayscale">
                  <span className="font-bold text-lg">BINANCE</span>
                  <span className="font-bold text-lg italic">COINBASE</span>
                  <span className="font-bold text-lg">KRAKEN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="order-1 lg:order-2">
            <div className="glass-panel p-8 md:p-12 rounded-[3.5rem] relative overflow-hidden group">
              {/* Progress bar */}
              {loading && (
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 overflow-hidden">
                  <div className="h-full bg-brand-accent w-1/3 animate-pulse" />
                </div>
              )}

              {!success ? (
                <div>
                  <header className="mb-10">
                    <h3 className="text-3xl font-bold mb-2">Secure Early Access</h3>
                    <p className="text-slate-500">Join the waitlist to be notified when we launch. Early adopters receive 0% fees for the first 12 months.</p>
                  </header>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="John Doe" 
                          className="input-field"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Preferred Handle</label>
                        <input 
                          type="text" 
                          placeholder="@trader_vibe" 
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="name@domain.com" 
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Trader Profile</label>
                      <div className="relative">
                        <button 
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="w-full px-6 py-4 rounded-2xl bg-white/50 border border-slate-200 text-left flex justify-between items-center hover:border-brand-accent transition-colors"
                        >
                          <span className="font-medium">{traderType}</span>
                          <svg className={`w-5 h-5 text-slate-400 transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {dropdownOpen && (
                          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 z-20 overflow-hidden">
                            {traderTypes.map((type) => (
                              <button 
                                key={type}
                                type="button"
                                onClick={() => { setTraderType(type); setDropdownOpen(false); }}
                                className="w-full px-6 py-3 text-left hover:bg-slate-50 transition-colors text-sm font-medium border-b border-slate-50 last:border-0"
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-brand-accent text-brand-dark py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            Secure Early Access
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="text-center text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-6">
                        By joining, you agree to our Impact Charter
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-24 h-24 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-brand-accent/30 relative">
                    <div className="absolute inset-0 rounded-full animate-ping bg-brand-accent opacity-20" />
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-bold mb-4">{"You're on the list!"}</h3>
                  <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                    {"Welcome to the future of altruistic trading. We've sent a confirmation to your inbox with your unique "}
                    <span className="text-brand-primary font-bold">Genesis Number</span>.
                  </p>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200 inline-block mb-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Share to climb the rank</p>
                    <div className="flex gap-3 justify-center">
                      <button className="p-4 bg-white rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                        <svg className="w-5 h-5 text-[#1DA1F2] fill-current" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </button>
                      <button className="p-4 bg-white rounded-xl shadow-sm hover:-translate-y-1 transition-transform">
                        <svg className="w-5 h-5 text-brand-primary fill-current" viewBox="0 0 24 24">
                          <path d="M20,2H4C2.895,2,2,2.895,2,4v16c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V4C22,2.895,21.105,2,20,2z M8,19H5v-9h3V19z M6.5,8.255c-0.966,0-1.75-0.783-1.75-1.75c0-0.967,0.784-1.75,1.75-1.75c0.966,0,1.75,0.783,1.75,1.75C8.25,7.471,7.466,8.255,6.5,8.255z M19,19h-3v-4.74c0-1.42-0.6-1.93-1.38-1.93c-1.13,0-1.62,0.81-1.62,1.93V19h-3v-9h3v1.09c0.41-0.69,1.21-1.29,2.44-1.29c2.1,0,3.56,1.44,3.56,4.83V19z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSuccess(false)} 
                    className="block mx-auto text-sm font-bold text-slate-400 hover:text-brand-primary transition-colors"
                  >
                    Submit another entry
                  </button>
                </div>
              )}

              {/* Decorative element */}
              <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="py-12 border-t border-slate-100 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center md:text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Waitlist Size</p>
              <p className="text-2xl font-bold">2,481 Traders</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Impact Goal</p>
              <p className="text-2xl font-bold">$1M / Year</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Supported Chains</p>
              <p className="text-2xl font-bold">12+ Major Networks</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Launch ETA</p>
              <p className="text-2xl font-bold">Q2 2026</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
