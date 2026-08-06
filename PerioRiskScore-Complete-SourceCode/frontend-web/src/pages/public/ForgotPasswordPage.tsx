import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-slate-800 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-white">Reset Password</h2>
            <p className="text-xs text-slate-400">Enter your email to receive a password reset link</p>
          </div>

          {sent ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Reset Email Sent</h3>
              <p className="text-xs text-slate-400">We've sent a password reset link to <strong className="text-slate-200">{email}</strong></p>
              <Link to="/login" className="inline-block pt-2 text-xs text-teal-400 font-semibold hover:underline">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-500 transition-all flex items-center justify-center gap-2">
                Send Reset Link <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
