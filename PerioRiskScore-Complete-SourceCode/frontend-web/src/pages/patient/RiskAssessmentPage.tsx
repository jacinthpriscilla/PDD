import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { RiskAssessmentForm } from '../../components/patient/RiskAssessmentForm';
import { RiskResultView } from '../../components/patient/RiskResultView';
import { PredictionResult } from '../../../../shared/src';

export const RiskAssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          {!prediction ? (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h1 className="text-2xl font-extrabold text-white">Periodontal Risk Assessment</h1>
                <p className="text-xs text-slate-400">Answer 10 clinical & hygiene questions to evaluate your gum disease susceptibility.</p>
              </div>
              <RiskAssessmentForm onComplete={(result) => setPrediction(result)} />
            </div>
          ) : (
            <RiskResultView
              prediction={prediction}
              onRetake={() => setPrediction(null)}
              onBookAppointment={() => navigate('/patient/appointments')}
            />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};
