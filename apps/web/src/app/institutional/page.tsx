'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Navigation, Footer } from '@/components/layout'

const integrationTypes = [
  { id: 'api', name: 'Direct API', desc: 'Custom Infrastructure' },
  { id: 'widget', name: 'Embedded Widget', desc: 'Low-code UI' },
  { id: 'protocol', name: 'Layer-1 / Node', desc: 'Protocol Level' },
]

const userBases = [
  '1,000 - 10,000 users',
  '10,000 - 100,000 users',
  '100,000 - 1,000,000 users',
  '1M+ users (Enterprise Tier)',
]

export default function InstitutionalPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [integrationType, setIntegrationType] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-grow pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column - Storytelling */}
          <div className="lg:col-span-5 pt-12">
            <div className="inline-flex items-center gap-2 bg-brand-primary/5 border border-brand-primary/10 px-4 py-1.5 rounded-full mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Institutional Access</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-8 tracking-tighter">
              Empower your users. <br />
              <span className="text-brand-accent">Exponetialize</span> impact.
            </h1>
            <p className="text-xl text-slate-500 mb-12 leading-relaxed">
              Join the global ecosystem of exchanges, brokers, and Layer-1 protocols integrating the Donate Protocol standard. 
              Turn volume into virtue with a single integration.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Ultra-Low Latency</h4>
                  <p className="text-slate-500 text-sm">Our infrastructure is built for high-frequency environments, ensuring zero impact on your execution speed.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-brand-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Reporting & Compliance</h4>
                  <p className="text-slate-500 text-sm">Automated tax documents and ESG reports for both your firm and your end-users.</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-16 p-8 bg-brand-dark rounded-[2rem] text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/20 rounded-full blur-3xl group-hover:bg-brand-accent/40 transition-colors" />
              <p className="italic text-lg mb-6 leading-relaxed relative z-10">
                {"\"Donate Protocol has redefined our user retention strategy. Our traders aren't just looking at candles anymore; they're looking at the lives they're changing.\""}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-700 rounded-full" />
                <div>
                  <p className="font-bold text-sm">Sarah Chen</p>
                  <p className="text-xs text-slate-400">Head of Partnerships, Global Exchange Group</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-[3rem] p-8 md:p-12 relative">
              {/* Form glow */}
              <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

              {!submitted ? (
                <div className="relative">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight">Partner Application</h2>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i}
                          className={`h-1.5 w-8 rounded-full transition-colors ${step >= i ? 'bg-brand-primary' : 'bg-slate-200'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Institutional Basics */}
                    {step === 1 && (
                      <div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Company Name</label>
                            <input type="text" required placeholder="e.g. Nexus Capital" className="input-field" />
                          </div>
                          <div className="space-y-2 col-span-2 md:col-span-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">HQ Location</label>
                            <input type="text" required placeholder="London, UK" className="input-field" />
                          </div>
                          <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Corporate Website</label>
                            <input type="url" required placeholder="https://nexuscapital.com" className="input-field" />
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setStep(2)} 
                          className="mt-10 w-full py-5 bg-brand-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform"
                        >
                          Technical Details
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* Step 2: Technical Scope */}
                    {step === 2 && (
                      <div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Integration Type</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {integrationTypes.map((type) => (
                                <label key={type.id} className="cursor-pointer">
                                  <input 
                                    type="radio" 
                                    name="int-type" 
                                    className="hidden peer"
                                    checked={integrationType === type.id}
                                    onChange={() => setIntegrationType(type.id)}
                                  />
                                  <div className="p-4 rounded-2xl border border-slate-100 peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition-all text-center">
                                    <span className="block font-bold text-sm">{type.name}</span>
                                    <span className="text-[10px] text-slate-400">{type.desc}</span>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Estimated User Base</label>
                            <select className="input-field appearance-none">
                              {userBases.map((base) => (
                                <option key={base}>{base}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Monthly Trading Volume (USD)</label>
                            <input type="text" placeholder="e.g. $500M+" className="input-field" />
                          </div>
                        </div>
                        <div className="flex gap-4 mt-10">
                          <button 
                            type="button" 
                            onClick={() => setStep(1)} 
                            className="w-1/3 py-5 bg-slate-100 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
                          >
                            Back
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setStep(3)} 
                            className="w-2/3 py-5 bg-brand-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3"
                          >
                            Final Verification
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Contact & Submit */}
                    {step === 3 && (
                      <div>
                        <div className="grid grid-cols-1 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Primary Point of Contact</label>
                            <input type="text" required placeholder="Full Name" className="input-field" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Priority Work Email</label>
                            <input type="email" required placeholder="name@company.com" className="input-field" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Partnership Objectives</label>
                            <textarea 
                              rows={4} 
                              placeholder="How do you envision Donate Protocol enhancing your ecosystem?" 
                              className="input-field resize-none"
                            />
                          </div>
                        </div>
                        <div className="flex gap-4 mt-10">
                          <button 
                            type="button" 
                            onClick={() => setStep(2)} 
                            className="w-1/3 py-5 bg-slate-100 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
                          >
                            Back
                          </button>
                          <button 
                            type="submit" 
                            className="w-2/3 py-5 bg-brand-accent text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand-accent/20 hover:shadow-brand-accent/40"
                          >
                            Submit Institutional Request
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              ) : (
                <div className="py-12 text-center relative">
                  <div className="w-24 h-24 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold mb-4">Application Submitted</h2>
                  <p className="text-slate-500 mb-10 max-w-sm mx-auto">
                    Your institutional partnership request has been received. Our enterprise team will be in touch within 48 hours.
                  </p>
                  <div className="p-6 bg-brand-dark/5 rounded-2xl inline-block mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">What happens next?</p>
                    <ul className="text-left text-sm space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        Technical scope assessment call
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                        Custom integration proposal
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-dark" />
                        Sandbox environment access
                      </li>
                    </ul>
                  </div>
                  <Link 
                    href="/"
                    className="block text-sm font-bold text-slate-400 hover:text-brand-primary transition-colors"
                  >
                    Return to Homepage
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
