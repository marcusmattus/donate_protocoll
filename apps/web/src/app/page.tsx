import Link from 'next/link'
import { Navigation, Footer } from '@/components/layout'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-4 py-1.5 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Early Access Phase 1</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter mb-6">
              Trading for a <br />
              <span className="text-brand-accent italic font-light">Greater Good.</span>
            </h1>
            
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mb-10">
              Automatically donate micro-amounts from your trades to support real people and communities. 
              Every trade makes a difference.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/waitlist" 
                className="bg-brand-accent text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-3"
              >
                Join Waitlist
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/security" 
                className="border-2 border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:border-slate-300 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-100 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">$2.5M+</p>
              <p className="text-slate-500 text-sm font-medium">Impact Generated</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-accent mb-2">45K+</p>
              <p className="text-slate-500 text-sm font-medium">Active Traders</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-dark mb-2">1,200+</p>
              <p className="text-slate-500 text-sm font-medium">Recipients Helped</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">12+</p>
              <p className="text-slate-500 text-sm font-medium">Networks Supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Impact in <span className="text-brand-accent italic">Three Steps</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              We make altruistic trading effortless. Connect, configure, and create change.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-[3rem] border-b-4 border-brand-primary/20 group hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-brand-primary/20 mb-4">01</div>
              <h3 className="text-2xl font-bold mb-4">Connect Account</h3>
              <p className="text-slate-500 leading-relaxed">
                Link your exchange with read-only API access. We never touch your funds or have withdrawal permissions.
              </p>
            </div>

            <div className="glass-card p-10 rounded-[3rem] border-b-4 border-brand-accent/20 group hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-brand-accent/20 mb-4">02</div>
              <h3 className="text-2xl font-bold mb-4">Set Your Rules</h3>
              <p className="text-slate-500 leading-relaxed">
                Configure automatic donations per trade. Round up to the nearest dollar or set a fixed percentage.
              </p>
            </div>

            <div className="glass-card p-10 rounded-[3rem] border-b-4 border-brand-dark/10 group hover:scale-[1.02] transition-transform">
              <div className="w-16 h-16 bg-brand-dark/5 rounded-2xl flex items-center justify-center text-brand-dark mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="text-5xl font-bold text-brand-dark/10 mb-4">03</div>
              <h3 className="text-2xl font-bold mb-4">Make Impact</h3>
              <p className="text-slate-500 leading-relaxed">
                Your donations are routed to verified organizations. Track your impact in real-time on-chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                Built for <span className="text-brand-primary">Trust</span>
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed mb-10">
                Donate Protocol combines bank-grade security with on-chain transparency. 
                Your trades create verifiable impact.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Non-Custodial</h4>
                    <p className="text-slate-500">Your funds never leave your exchange. Read-only API access only.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Triple Audited</h4>
                    <p className="text-slate-500">Smart contracts verified by QuantStamp, Spearbit, and more.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Tax Optimized</h4>
                    <p className="text-slate-500">Automated 501(c)(3) compliant receipts and annual summaries.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-10 rounded-[3rem]">
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                  <span className="font-medium">Read Trade History</span>
                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-bold">Allowed</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                  <span className="font-medium">Read Balance Info</span>
                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-bold">Allowed</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-2xl">
                  <span className="font-medium text-red-600">Withdrawal Rights</span>
                  <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">Blocked</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-2xl">
                  <span className="font-medium text-red-600">Transfer Rights</span>
                  <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">Blocked</span>
                </div>
              </div>
              <p className="text-center text-slate-400 text-sm mt-6">
                Principle of Least Privilege - Always
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">
            Trusted by traders from leading exchanges
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale">
            <span className="font-bold text-2xl">BINANCE</span>
            <span className="font-bold text-2xl italic">COINBASE</span>
            <span className="font-bold text-2xl">KRAKEN</span>
            <span className="font-bold text-2xl">OKX</span>
            <span className="font-bold text-2xl italic">BYBIT</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-brand-dark rounded-[4rem] p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-accent/20 opacity-40" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to trade with <br />
                <span className="text-brand-accent italic">intentionality?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Join the waitlist today and be among the first to prove that wealth and impact are not mutually exclusive.
              </p>
              <Link 
                href="/waitlist" 
                className="inline-block bg-white text-brand-dark px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl"
              >
                Get Early Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
