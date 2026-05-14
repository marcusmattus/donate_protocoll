'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, X } from 'lucide-react';

export default function Modals() {
  const router = useRouter();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);
  const [partnerSuccess, setPartnerSuccess] = useState(false);

  useEffect(() => {
    const handleWaitlist = () => setWaitlistOpen(true);
    const handlePartner = () => setPartnerOpen(true);
    
    window.addEventListener('open-waitlist', handleWaitlist);
    window.addEventListener('open-partner-modal', handlePartner);
    
    return () => {
      window.removeEventListener('open-waitlist', handleWaitlist);
      window.removeEventListener('open-partner-modal', handlePartner);
    };
  }, []);

  const closeWaitlist = () => {
    setWaitlistOpen(false);
    setWaitlistSuccess(false);
  };

  const closePartner = () => {
    setPartnerOpen(false);
    setPartnerSuccess(false);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistSuccess(true);
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerSuccess(true);
  };

  return (
    <>
      {/* Waitlist Modal */}
      <AnimatePresence>
        {waitlistOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md" 
              onClick={closeWaitlist}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card w-full max-w-lg rounded-[3rem] relative z-10 p-12 overflow-hidden shadow-2xl"
            >
              {/* Modal Background */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <button onClick={closeWaitlist} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>

              {!waitlistSuccess ? (
                <div className="relative z-10">
                  <h3 className="font-display text-4xl font-bold mb-4">Be First in Line.</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed italic">Join 2,400+ altruistic traders on our early access list. No spam, just impact updates.</p>
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                      <input type="email" required placeholder="you@example.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">I am a...</label>
                      <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all appearance-none">
                        <option>Retail Trader</option>
                        <option>Institutional Fund</option>
                        <option>Bot / Quant Developer</option>
                        <option>Hobbyist</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold text-lg hover:brightness-110 transition-all shadow-xl shadow-brand-primary/20">
                      Secure My Spot
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 relative z-10"
                >
                  <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-lg">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Welcome, Agent of Change.</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">Check your inbox. We&apos;ve sent a special early-adopter badge for your journey.</p>
                  <button onClick={closeWaitlist} className="text-brand-primary font-bold hover:underline">Close</button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Partner Modal */}
      <AnimatePresence>
        {partnerOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md" 
              onClick={closePartner}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] relative z-10 p-12 overflow-y-auto max-h-[90vh]"
            >
              <button onClick={closePartner} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>

              {!partnerSuccess ? (
                <div>
                  <h3 className="font-display text-4xl font-bold mb-4">Partner Integration</h3>
                  <p className="text-slate-500 mb-10">Expand your platform&apos;s utility by offering &quot;Donate While Trading&quot; to your users.</p>
                  
                  <form onSubmit={handlePartnerSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-1">
                      <label className="block text-xs font-bold uppercase mb-2">Company Name</label>
                      <input type="text" required className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-brand-accent outline-none" />
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-xs font-bold uppercase mb-2">Integration Type</label>
                      <select className="w-full px-5 py-3 rounded-xl border border-slate-200 outline-none">
                        <option>Exchange / CEX</option>
                        <option>DEX / DeFi Protocol</option>
                        <option>Trading Terminal / UI</option>
                        <option>Impact Partner (NGO)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase mb-2">Work Email</label>
                      <input type="email" required className="w-full px-5 py-3 rounded-xl border border-slate-200 outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase mb-2">Brief Message</label>
                      <textarea className="w-full px-5 py-3 rounded-xl border border-slate-200 outline-none h-32" placeholder="Tell us how we can help your community..."></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <button type="submit" className="w-full bg-brand-accent text-white py-4 rounded-xl font-bold hover:brightness-105 transition-all">
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-brand-primary flex items-center justify-center rounded-2xl mx-auto mb-8 text-white rotate-12 shadow-xl">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Request Received</h3>
                  <p className="text-slate-500 mb-8">Our partnership team will review your application and reach out within 2 business days.</p>
                  <button onClick={closePartner} className="bg-slate-100 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors">Back to Site</button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
