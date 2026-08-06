import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { Activity, Calendar, Download, TrendingUp } from 'lucide-react';

export const RiskHistoryPage: React.FC = () => {
  const history = [
    { id: 'pred_1', date: '2026-07-20', score: 68, category: 'High', prob: 'High Risk (62%)' },
    { id: 'pred_2', date: '2026-05-14', score: 72, category: 'High', prob: 'High Risk (68%)' },
    { id: 'pred_3', date: '2026-02-10', score: 58, category: 'Moderate', prob: 'Moderate Risk (52%)' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Risk Score Trend & History</h1>
            <p className="text-xs text-slate-400 mt-1">Track your past periodontal assessments over time.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-400" /> Progression Timeline
            </h3>

            <div className="space-y-3">
              {history.map(item => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center font-bold text-teal-300">
                      {item.score}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{item.category} Risk Level</div>
                      <div className="text-xs text-slate-400">Date: {item.date} • {item.prob}</div>
                    </div>
                  </div>
                  <button className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
