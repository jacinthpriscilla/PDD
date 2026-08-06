import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { Activity, Stethoscope, FileText, Calendar, MessageSquare, Bot } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const services = [
    { icon: Activity, title: 'AI Periodontal Risk Screening', desc: 'Instant 10-step wizard evaluating your gum health indicators with ML probability calculation.' },
    { icon: Stethoscope, title: 'Specialist Periodontist Directory', desc: 'Browse board-certified periodontists, view ratings, experience, and book consultations.' },
    { icon: Calendar, title: 'Real-time Appointment Booking', desc: 'Seamlessly schedule scaling, root planing, and periodontal maintenance appointments.' },
    { icon: FileText, title: 'PDF Risk Reports', desc: 'Download comprehensive, print-ready medical reports for your personal records or dentist.' },
    { icon: MessageSquare, title: 'Doctor Consult Chat', desc: 'Direct encrypted messaging channel with your assigned periodontist.' },
    { icon: Bot, title: 'AI Clinical Assistant', desc: '24/7 AI chatbot trained on periodontal health queries and hygiene guidance.' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-12 flex-1">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold text-white">Comprehensive Clinical Services</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">Discover the features provided by PerioRiskScore AI platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};
