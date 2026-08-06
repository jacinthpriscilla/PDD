import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { Calendar, Check, X, Clock } from 'lucide-react';

export const DoctorAppointmentsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Doctor Calendar & Requests</h1>
            <p className="text-xs text-slate-400">Review patient consultation appointments and manage your availability.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Scheduled Sessions</h3>
            
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">Sarah Jenkins</div>
                  <div className="text-xs text-slate-400">July 28, 2026 at 10:30 AM • Scaling & Attachment Loss Check</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Approved
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
