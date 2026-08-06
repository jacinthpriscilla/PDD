import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { Users, Search, FileText, AlertTriangle } from 'lucide-react';

export const PatientManagementPage: React.FC = () => {
  const patients = [
    { id: 'pat_1', name: 'Sarah Jenkins', age: 38, gender: 'Female', riskScore: 68, riskCategory: 'High', lastAssessment: '2026-07-20' },
    { id: 'pat_2', name: 'Robert Chen', age: 52, gender: 'Male', riskScore: 84, riskCategory: 'Severe', lastAssessment: '2026-07-18' },
    { id: 'pat_3', name: 'Emily Davis', age: 29, gender: 'Female', riskScore: 22, riskCategory: 'Low', lastAssessment: '2026-07-15' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Patient Clinical Records</h1>
            <p className="text-xs text-slate-400">View and monitor assigned patient periodontal assessment records.</p>
          </div>

          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Patient Name</th>
                  <th className="p-4">Age / Gender</th>
                  <th className="p-4">Latest Risk Score</th>
                  <th className="p-4">Risk Category</th>
                  <th className="p-4">Last Assessment</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {patients.map(p => (
                  <tr key={p.id} className="hover:bg-slate-900/40">
                    <td className="p-4 font-bold text-white">{p.name}</td>
                    <td className="p-4 text-slate-300">{p.age} / {p.gender}</td>
                    <td className="p-4 font-bold text-teal-400">{p.riskScore}/100</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                        p.riskCategory === 'Severe' ? 'bg-rose-500/10 text-rose-400' :
                        p.riskCategory === 'High' ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {p.riskCategory}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{p.lastAssessment}</td>
                    <td className="p-4">
                      <button className="px-3 py-1.5 rounded bg-teal-600/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
