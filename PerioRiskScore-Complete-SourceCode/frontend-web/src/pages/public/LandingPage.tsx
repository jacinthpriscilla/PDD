import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Cpu, Stethoscope, ArrowRight, CheckCircle2, Star, Sparkles, HeartPulse } from 'lucide-react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        
        {/* Glow backdrop shapes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-teal-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-teal-500/30 text-teal-300 text-xs font-semibold"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>AI-Driven Periodontal Health Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]"
          >
            Predict & Prevent <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">Periodontal Disease</span> with Machine Learning
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            PerioRiskScore analyzes key clinical indicators, systemic factors, and oral hygiene habits using Random Forest AI models to predict gum disease risk before irreversible bone loss occurs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/patient/assessment"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 text-white font-bold text-sm shadow-xl shadow-teal-950/80 hover:scale-105 transition-all flex items-center gap-3"
            >
              Start Free AI Risk Assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-2xl glass-card text-slate-200 font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 border border-slate-700"
            >
              Sign In to Portal
            </Link>
          </motion.div>

          {/* Metric Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-12">
            {[
              { label: 'Prediction Accuracy', val: '94.2%' },
              { label: 'Assessment Time', val: '< 2 Mins' },
              { label: 'Risk Indicators', val: '10 Features' },
              { label: 'Clinical Model', val: 'Random Forest' }
            ].map((stat, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-2xl border border-slate-800/80 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">{stat.val}</div>
                <div className="text-xs text-slate-400 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* Feature Showcase Section */}
      <section className="py-20 bg-slate-900/50 border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-white">Engineered for Patients, Doctors & Admins</h2>
            <p className="text-slate-400 text-sm">
              Complete clinical ecosystem connecting smart patient questionnaires with periodontist workflow tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Patient AI Module</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                10-step dynamic risk evaluation form, instant softmax probability visualization, personalized recommendations, and downloadable PDF reports.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Doctor Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review assigned patient risk profiles, approve appointment requests, track risk trends, and conduct direct consultation chats.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Admin Supervision</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                User management, system health metrics, risk distribution charts, and HIPAA-ready security audit logging.
              </p>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};
