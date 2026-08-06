import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Activity, Calendar, FileText, ArrowRight, ShieldCheck, PlusCircle, AlertCircle } from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>({
    totalAssessments: 0,
    latestRiskScore: null,
    latestRiskCategory: null,
    predictionProbability: null,
    recommendations: []
  });

  useEffect(() => {
    if (user?.id) {
      api.get('/patients/dashboard-stats')
        .then(res => {
          if (res.data?.stats) setStats(res.data.stats);
        })
        .catch(err => {
          console.warn('Dashboard stats fallback');
        });
    }
  }, [user]);

  const hasAssessment = stats.latestRiskScore !== null && stats.latestRiskScore !== undefined;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest">Patient Portal</span>
              <h1 className="text-2xl font-extrabold text-white mt-1">Welcome back, {user?.name || 'Patient'}</h1>
              <p className="text-xs text-slate-400 mt-1">Track your 7-step periodontal risk score and schedule clinical evaluations.</p>
            </div>
            <button
              onClick={() => navigate('/patient/assessment')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center gap-2 shrink-0"
            >
              <PlusCircle className="w-4 h-4" /> Start 7-Step AI Assessment
            </button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold">Latest Risk Score</span>
                <Activity className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {hasAssessment ? stats.latestRiskScore : 'N/A'}
                {hasAssessment && <span className="text-sm font-normal text-slate-500">/100</span>}
              </div>
              {hasAssessment ? (
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  {stats.latestRiskCategory || 'Evaluated'}
                </span>
              ) : (
                <span className="text-[11px] text-slate-500">No assessments completed yet</span>
              )}
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold">Total Assessments</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">{stats.totalAssessments || 0}</div>
              <p className="text-[11px] text-slate-400">Completed Records</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold">Model Probability</span>
                <Calendar className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {stats.predictionProbability ? `${Math.round(stats.predictionProbability * 100)}%` : 'N/A'}
              </div>
              <span className="text-[11px] text-slate-400">Random Forest Confidence</span>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-xs font-semibold">Account Status</span>
                <FileText className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-sm font-bold text-emerald-400">Active Profile</div>
              <p className="text-[11px] text-slate-400">{user?.email}</p>
            </div>

          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                <span>AI Clinical Recommendations</span>
                <Link to="/patient/history" className="text-xs text-teal-400 hover:underline">View History</Link>
              </h3>
              
              {stats.recommendations && stats.recommendations.length > 0 ? (
                <div className="space-y-2.5">
                  {stats.recommendations.map((rec: string, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 space-y-2 border border-slate-800 rounded-xl bg-slate-900/40">
                  <p>Complete your 7-Step AI Risk Assessment to unlock personalized recommendations.</p>
                  <button onClick={() => navigate('/patient/assessment')} className="text-teal-400 font-bold hover:underline">Take Assessment Now &rarr;</button>
                </div>
              )}
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Interactive Modules</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/patient/ai-assistant')}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 hover:border-teal-500/50 text-left transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-teal-300">Ask PerioRisk AI Assistant</div>
                    <div className="text-[11px] text-slate-400">Get instant answers on gum symptoms & hygiene</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-teal-400" />
                </button>

                <button
                  onClick={() => navigate('/patient/chat')}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 hover:border-teal-500/50 text-left transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-200">Doctor Consultation Messaging</div>
                    <div className="text-[11px] text-slate-400">Direct encrypted patient-doctor chat</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
};
