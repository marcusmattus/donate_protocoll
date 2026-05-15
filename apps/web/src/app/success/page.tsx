import Link from 'next/link'
import { Navigation, Footer } from '@/components/layout'

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />

      <div className="flex-grow pt-32 pb-20 flex items-center justify-center relative px-6">
        {/* Background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px]" />

        <div className="max-w-2xl w-full relative z-10">
          <div className="glass-panel p-12 md:p-16 rounded-[3.5rem] text-center">
            {/* Success Icon */}
            <div className="w-28 h-28 bg-brand-accent rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-brand-accent/30 relative">
              <div className="absolute inset-0 rounded-full animate-ping bg-brand-accent opacity-20" />
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
              {"You're"} <span className="text-brand-accent">In!</span>
            </h1>
            
            <p className="text-xl text-slate-500 leading-relaxed mb-8">
              {"Welcome to the future of altruistic trading. We've sent a confirmation to your inbox with your unique "}
              <span className="text-brand-primary font-bold">Genesis Number</span>.
            </p>

            <div className="p-8 bg-brand-dark/5 rounded-3xl mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">What happens next?</p>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-bold">Check your inbox</p>
                    <p className="text-sm text-slate-500">Look for an email with your waitlist position and Genesis Number</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-bold">Share with friends</p>
                    <p className="text-sm text-slate-500">Move up the waitlist by referring other impact-minded traders</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-dark/10 text-brand-dark flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-bold">Get early access</p>
                    <p className="text-sm text-slate-500">{"We'll notify you as soon as your cohort is ready to onboard"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social sharing */}
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Share to climb the rank</p>
              <div className="flex gap-3 justify-center">
                <button className="p-4 bg-white rounded-xl shadow-sm hover:-translate-y-1 transition-transform border border-slate-100">
                  <svg className="w-5 h-5 text-[#1DA1F2] fill-current" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="p-4 bg-white rounded-xl shadow-sm hover:-translate-y-1 transition-transform border border-slate-100">
                  <svg className="w-5 h-5 text-brand-primary fill-current" viewBox="0 0 24 24">
                    <path d="M20,2H4C2.895,2,2,2.895,2,4v16c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V4C22,2.895,21.105,2,20,2z M8,19H5v-9h3V19z M6.5,8.255c-0.966,0-1.75-0.783-1.75-1.75c0-0.967,0.784-1.75,1.75-1.75c0.966,0,1.75,0.783,1.75,1.75C8.25,7.471,7.466,8.255,6.5,8.255z M19,19h-3v-4.74c0-1.42-0.6-1.93-1.38-1.93c-1.13,0-1.62,0.81-1.62,1.93V19h-3v-9h3v1.09c0.41-0.69,1.21-1.29,2.44-1.29c2.1,0,3.56,1.44,3.56,4.83V19z"/>
                  </svg>
                </button>
                <button className="p-4 bg-white rounded-xl shadow-sm hover:-translate-y-1 transition-transform border border-slate-100">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <Link 
              href="/" 
              className="text-sm font-bold text-slate-400 hover:text-brand-primary transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
