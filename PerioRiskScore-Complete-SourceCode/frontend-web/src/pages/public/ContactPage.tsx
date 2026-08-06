import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12 flex-1">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold text-white">Contact Clinical Support</h1>
          <p className="text-slate-400 text-sm">Have questions about PerioRiskScore AI or enterprise clinical integrations?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-400" />
                <div>
                  <div className="text-xs font-semibold text-slate-400">Email Inquiries</div>
                  <div className="text-sm font-bold text-slate-200">support@periorisk.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400" />
                <div>
                  <div className="text-xs font-semibold text-slate-400">Clinical Support Line</div>
                  <div className="text-sm font-bold text-slate-200">+1 (800) 555-PERIO</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-teal-400" />
                <div>
                  <div className="text-xs font-semibold text-slate-400">Headquarters</div>
                  <div className="text-sm font-bold text-slate-200">100 Medical Center Parkway, CA</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Message Delivered</h3>
                <p className="text-xs text-slate-400">Our clinical support team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input type="email" required className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm" placeholder="name@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                  <textarea required rows={4} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm" placeholder="How can we assist you?" />
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-500 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
