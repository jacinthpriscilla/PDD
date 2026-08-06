import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { BarChart3, TrendingUp, Users, ShieldAlert } from 'lucide-react';

export const DoctorAnalyticsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Periodontal Risk Analytics</h1>
            <p className="text-xs text-slate-400">Statistical distribution of patient risk factors and model metrics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-teal-400" /> Patient Risk Categories
              </h3>
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between"><span>Low Risk (0-24)</span><span className="font-bold text-emerald-400">45%</span></div>
                <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-emerald-500 h-full rounded-full w-[45%]" /></div>
                <div className="flex justify-between pt-2"><span>Moderate Risk (25-54)</span><span className="font-bold text-amber-400">30%</span></div>
                <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-amber-500 h-full rounded-full w-[30%]" /></div>
                <div className="flex justify-between pt-2"><span>High Risk (55-79)</span><span className="font-bold text-orange-400">18%</span></div>
                <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-orange-500 h-full rounded-full w-[18%]" /></div>
                <div className="flex justify-between pt-2"><span>Severe Risk (80+)</span><span className="font-bold text-rose-400">7%</span></div>
                <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-rose-500 h-full rounded-full w-[7%]" /></div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" /> Top Clinical Drivers
              </h3>
              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-bold text-slate-200">1. Tobacco Smoking (18% Weight)</div>
                  <p className="text-[11px] text-slate-400">Primary driver of severe microvascular constriction.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-bold text-slate-200">2. Pocket Depth Impaction (16% Weight)</div>
                  <p className="text-[11px] text-slate-400">Strong correlation with clinical attachment loss.</p>
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
