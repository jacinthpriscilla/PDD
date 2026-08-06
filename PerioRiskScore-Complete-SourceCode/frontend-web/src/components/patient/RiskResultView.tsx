import React from 'react';
import { motion } from 'framer-motion';
import { PredictionResult } from '../../../../shared/src';
import { Download, AlertTriangle, ShieldCheck, Activity, Calendar, RefreshCw } from 'lucide-react';

interface RiskResultViewProps {
  prediction: PredictionResult;
  onRetake: () => void;
  onBookAppointment: () => void;
}

export const RiskResultView: React.FC<RiskResultViewProps> = ({
  prediction,
  onRetake,
  onBookAppointment
}) => {
  const category = prediction.riskCategory || 'Moderate Risk';

  const getBadgeStyle = (cat: string) => {
    if (cat.includes('Low')) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    if (cat.includes('Moderate')) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    if (cat.includes('High')) return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
    return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  };

  const scoreColor = category.includes('Low') ? '#10b981' :
                     category.includes('Moderate') ? '#f59e0b' :
                     category.includes('High') ? '#f97316' : '#ef4444';

  const probPercent = typeof prediction.predictionProbability === 'number'
    ? Math.round(prediction.predictionProbability * 100)
    : 85;

  const handleDownloadPDF = () => {
    const token = localStorage.getItem('periorisk_token');
    window.open(`http://localhost:5001/api/predictions/${prediction.id || 'pred_sample_1'}/pdf?token=${token}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Top Banner Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
        
        {/* Radial Score Gauge */}
        <div className="flex flex-col items-center text-center shrink-0">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="10" fill="transparent" />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={scoreColor}
                strokeWidth="10"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * prediction.riskScore) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white">{prediction.riskScore}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Out of 100</span>
            </div>
          </div>

          <div className={`mt-3 px-3.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getBadgeStyle(category)}`}>
            {category}
          </div>
        </div>

        {/* Diagnostic Summary */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs uppercase tracking-wider">
            <Activity className="w-4 h-4" /> Random Forest Inference Engine Output
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            Periodontal Risk Score: {prediction.riskScore}/100
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Machine Learning model processed your 7-step clinical parameters (Age, Diabetes, Brushing & Flossing habits, Symptoms, Dental history, and Diet). Estimated prediction probability: <strong className="text-white">{probPercent}%</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onBookAppointment}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold text-xs shadow-lg shadow-teal-900/40 hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Schedule Specialist Consultation
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 font-semibold text-xs hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-teal-400" /> Download PDF Report
            </button>
            <button
              onClick={onRetake}
              className="px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retake Form
            </button>
          </div>
        </div>

      </div>

      {/* Recommendations & Probability Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Probability Breakdown */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-400" /> Model Confidence & Metrics
          </h3>
          <div className="space-y-3 pt-1 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span>Risk Score Value</span>
              <span className="font-bold text-white text-sm">{prediction.riskScore} / 100</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span>Model Classification Probability</span>
              <span className="font-bold text-teal-300 text-sm">{probPercent}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span>Assessed Category</span>
              <span className="font-bold text-amber-300">{category}</span>
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" /> AI Clinical Recommendations
          </h3>
          <div className="space-y-2.5 pt-1">
            {prediction.recommendations && prediction.recommendations.map((rec, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </motion.div>
  );
};
