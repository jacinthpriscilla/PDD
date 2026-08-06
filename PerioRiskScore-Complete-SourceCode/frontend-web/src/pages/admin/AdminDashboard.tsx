import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { ShieldCheck, Users, Activity, BarChart3, Server } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest">Admin Supervision</span>
              <h1 className="text-2xl font-extrabold text-white mt-1">System Control Dashboard</h1>
              <p className="text-xs text-slate-400">Monitor system health, user roles, and security audit logs.</p>
            </div>
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30">
              Super Admin Mode
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400">Total Registered Users</span>
              <div className="text-3xl font-extrabold text-white">1,420</div>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400">AI Inferences Run</span>
              <div className="text-3xl font-extrabold text-teal-400">3,890</div>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400">Active Doctors</span>
              <div className="text-3xl font-extrabold text-emerald-400">48</div>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-xs font-semibold text-slate-400">API Latency</span>
              <div className="text-3xl font-extrabold text-cyan-400">24 ms</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-teal-400" /> Infrastructure Monitoring
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span>Firebase Firestore Status</span><span className="text-emerald-400 font-bold">100% Operational</span></div>
                <div className="flex justify-between"><span>Node.js REST API Server</span><span className="text-emerald-400 font-bold">Healthy (Port 5000)</span></div>
                <div className="flex justify-between"><span>Random Forest ML Engine</span><span className="text-emerald-400 font-bold">Ready (&lt;4ms Inference)</span></div>
                <div className="flex justify-between"><span>PDF Report Generation Service</span><span className="text-emerald-400 font-bold">Active</span></div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white">Security & Audit Overview</h3>
              <p className="text-xs text-slate-400">All data operations strictly conform to HIPAA role isolation policies.</p>
            </div>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
};
