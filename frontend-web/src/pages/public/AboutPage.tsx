import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { Activity, ShieldCheck, Cpu, Database, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-12 flex-1">
        <div className="text-center space-y-4">
          <img src="/logo.png" alt="PerioRiskScore Logo" className="h-20 w-auto max-w-[240px] mx-auto object-contain mb-2" />
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest">About PerioRiskScore</span>
          <h1 className="text-4xl font-extrabold text-white">Clinical AI Innovation for Periodontal Health</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed">
            Periodontal (gum) disease affects over 47% of adults aged 30 and older. PerioRiskScore provides an early risk stratification mechanism combining machine learning classification algorithms with standardized periodontology markers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <Cpu className="w-8 h-8 text-teal-400" />
            <h3 className="text-lg font-bold text-white">Random Forest Model Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trained on multi-variate clinical indicator datasets including attachment loss proxies, pocket depth estimates, systemic markers (HbA1c/Diabetes), smoking intensity, and biofilm control habits.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <Database className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Firebase Cloud & Realtime Store</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built on cloud Firestore collections with composite indexing, encrypted persistent sessions, FCM notification triggers, and encrypted medical document storage.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
