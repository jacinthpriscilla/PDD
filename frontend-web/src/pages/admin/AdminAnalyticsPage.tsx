import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { BarChart3, PieChart, Activity } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white">System Analytics & ML Model Metrics</h1>
            <p className="text-xs text-slate-400">Global application performance, risk score distribution, and API telemetry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-teal-400" /> Random Forest Model Accuracy
              </h3>
              <div className="text-3xl font-extrabold text-teal-400">94.2%</div>
              <p className="text-xs text-slate-400">Cross-validation F1-score across 500 clinical test samples.</p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" /> System Latency
              </h3>
              <div className="text-3xl font-extrabold text-emerald-400">4 ms</div>
              <p className="text-xs text-slate-400">Average Random Forest inference calculation speed.</p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
