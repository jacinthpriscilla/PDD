import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { useAuth } from '../../context/AuthContext';
import { Users, Calendar, AlertTriangle, Activity, Check, X } from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest">Doctor Portal</span>
              <h1 className="text-2xl font-extrabold text-white mt-1">Welcome, {user?.name}</h1>
              <p className="text-xs text-slate-400">Board-certified Periodontics & Implantology Console.</p>
            </div>
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Verified Practitioner
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400">Active Patients</span>
              <div className="text-3xl font-extrabold text-white">42</div>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400">Pending Appointments</span>
              <div className="text-3xl font-extrabold text-amber-400">2</div>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400">High Risk Alerts</span>
              <div className="text-3xl font-extrabold text-orange-400">5</div>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400">Rating</span>
              <div className="text-3xl font-extrabold text-teal-400">4.9 ★</div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Pending Appointment Requests</h3>
            
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Sarah Jenkins</div>
                  <div className="text-xs text-slate-400">July 28, 2026 at 10:30 AM • Reason: High Risk Score (68/100)</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600/30 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30 text-xs font-bold hover:bg-rose-600/30 flex items-center gap-1">
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
};
