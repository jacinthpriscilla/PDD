import React from 'react';
import { Activity, ShieldCheck, Lock, HeartPulse } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-xs py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="PerioRiskScore Logo" className="h-8 w-auto max-w-[140px] object-contain" />
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            AI-Powered Periodontal Disease Risk Prediction System. Providing early diagnostic support and risk stratification using Random Forest Machine Learning.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Core Modules</h4>
          <ul className="space-y-2">
            <li><a href="/patient/assessment" className="hover:text-teal-400 transition-colors">10-Step AI Risk Assessment</a></li>
            <li><a href="/services" className="hover:text-teal-400 transition-colors">Random Forest Diagnostic Engine</a></li>
            <li><a href="/patient/doctors" className="hover:text-teal-400 transition-colors">Periodontist Directory</a></li>
            <li><a href="/patient/ai-assistant" className="hover:text-teal-400 transition-colors">Clinical AI Chatbot</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Security & Compliance</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>HIPAA Compliant Architecture</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Lock className="w-4 h-4 text-teal-400" />
              <span>256-Bit TLS Encryption</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <HeartPulse className="w-4 h-4 text-cyan-400" />
              <span>Real-time Risk Monitoring</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">System Disclaimer</h4>
          <p className="text-[11px] text-slate-500 leading-normal">
            PerioRiskScore is designed for screening and preliminary risk stratification. It does not constitute formal medical advice or diagnosis. Always consult a certified dental practitioner.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-500">© 2026 PerioRiskScore Inc. All rights reserved.</p>
        <div className="flex items-center gap-4 text-slate-500">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">Clinical Validation</a>
        </div>
      </div>
    </footer>
  );
};
