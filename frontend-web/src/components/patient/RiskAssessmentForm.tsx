import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssessmentAnswers, PredictionResult } from '../../../../shared/src';
import { runRandomForestInference } from '../../services/predict';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  HeartPulse,
  Sparkles,
  Smile,
  Activity,
  Calendar,
  Coffee,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Save
} from 'lucide-react';

interface RiskAssessmentFormProps {
  onComplete: (prediction: PredictionResult) => void;
}

export const RiskAssessmentForm: React.FC<RiskAssessmentFormProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [validationError, setValidationError] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<AssessmentAnswers>({
    age: 35,
    diabetes: 'No',
    diabetesType: 'Type 2',
    bloodSugarControl: 'Controlled',
    brushingFrequency: 'Twice daily',
    brushingDuration: '1–2 minutes',
    interdentalCleaning: 'Yes',
    interdentalFrequency: 'Daily',
    sleepHours: 7,
    smokingStatus: 'Never smoked',
    alcoholConsumption: 'Occasionally',
    gumBleeding: 'No',
    gumSwelling: 'No',
    toothSensitivity: 'None',
    looseTeeth: 'No',
    lastDentalVisit: 'Within 3 months',
    cleaningFrequency: 'Every 6 months',
    sugarConsumption: 'Moderate',
    waterIntake: 2
  });

  const stepsList = [
    { title: 'Basic Information', icon: User },
    { title: 'Medical History', icon: HeartPulse },
    { title: 'Oral Hygiene', icon: Smile },
    { title: 'Lifestyle Factors', icon: Coffee },
    { title: 'Oral Symptoms', icon: Activity },
    { title: 'Dental History', icon: Calendar },
    { title: 'Diet & Habits', icon: Sparkles }
  ];

  const updateField = (field: keyof AssessmentAnswers, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationError('');
  };

  const validateCurrentStep = (): boolean => {
    setValidationError('');

    if (step === 1) {
      if (!formData.age || formData.age < 1 || formData.age > 120) {
        setValidationError('Age must be between 1 and 120 years.');
        return false;
      }
    }

    if (step === 4) {
      if (formData.sleepHours === undefined || formData.sleepHours < 0 || formData.sleepHours > 24) {
        setValidationError('Sleep hours must be between 0 and 24.');
        return false;
      }
    }

    if (step === 7) {
      if (formData.waterIntake === undefined || formData.waterIntake < 0 || formData.waterIntake > 15) {
        setValidationError('Please enter a valid water intake in liters per day.');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (step < 7) {
      setStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setValidationError('');
      setStep(prev => prev - 1);
    }
  };

  const handleSaveProgress = () => {
    localStorage.setItem('periorisk_draft_assessment', JSON.stringify(formData));
    setToastMessage('Assessment progress saved locally.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setToastMessage('Processing Random Forest AI inference...');

    try {
      // Local ML Inference Engine calculation
      const localResult = runRandomForestInference(
        formData,
        user?.id || 'pat_guest',
        user?.name || 'Patient',
        user?.email || 'patient@periorisk.com',
        `ass_${Date.now()}`
      );

      // Submit to backend API POST /api/prediction/assess-risk
      try {
        await api.post('/prediction/assess-risk', { answers: formData });
      } catch (e) {
        console.warn('Backend API connection offline, using client-side inference result.');
      }

      setIsSubmitting(false);
      setToastMessage('Risk assessment complete!');
      onComplete(localResult);
    } catch (err: any) {
      setIsSubmitting(false);
      setValidationError('Failed to calculate risk score. Please try again.');
    }
  };

  const progressPercent = Math.round((step / 7) * 100);

  return (
    <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden space-y-6">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold flex items-center justify-between animate-fade-in">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" /> {toastMessage}
          </span>
          <button onClick={() => setToastMessage('')} className="text-slate-400 hover:text-white">&times;</button>
        </div>
      )}

      {/* Validation Error Alert */}
      {validationError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {validationError}
        </div>
      )}

      {/* Step Header & Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {React.createElement(stepsList[step - 1].icon, { className: 'w-5 h-5 text-teal-400' })}
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              Step {step} of 7 — {stepsList[step - 1].title}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-300">{progressPercent}% Completed</span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Animated Questionnaire Body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >

          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Patient Basic Information</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  1. Age (Years) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={formData.age}
                  onChange={e => updateField('age', parseInt(e.target.value) || '')}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. 35"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Valid range: 1 – 120 years old</span>
              </div>
            </div>
          )}

          {/* STEP 2: Medical History */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-white">Medical History & Diabetes Status</h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">2. Diabetes Status</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Yes', 'No', "Don't Know"] as const).map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateField('diabetes', opt)}
                      className={`py-3 px-4 rounded-xl border text-xs font-semibold transition-all ${
                        formData.diabetes === opt
                          ? 'bg-teal-600/30 border-teal-500 text-teal-300 shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-850'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Diabetes Fields */}
              {formData.diabetes === 'Yes' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-teal-300 mb-1.5">Diabetes Type</label>
                    <select
                      value={formData.diabetesType}
                      onChange={e => updateField('diabetesType', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    >
                      <option>Type 1</option>
                      <option>Type 2</option>
                      <option>Gestational</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-teal-300 mb-1.5">Blood Sugar Control Level</label>
                    <select
                      value={formData.bloodSugarControl}
                      onChange={e => updateField('bloodSugarControl', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    >
                      <option>Controlled</option>
                      <option>Moderate</option>
                      <option>Poorly Controlled</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* STEP 3: Oral Hygiene Behaviour */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-white">Oral Hygiene Behaviour</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">3. Teeth Brushing Frequency</label>
                <select
                  value={formData.brushingFrequency}
                  onChange={e => updateField('brushingFrequency', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option>0 times per day</option>
                  <option>Once daily</option>
                  <option>Twice daily</option>
                  <option>More than twice daily</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">4. Teeth Brushing Duration</label>
                <select
                  value={formData.brushingDuration}
                  onChange={e => updateField('brushingDuration', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option>Less than 1 minute</option>
                  <option>1–2 minutes</option>
                  <option>More than 2 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">5. Do you use interdental cleaning methods (floss/brushes)?</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Yes', 'No'] as const).map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateField('interdentalCleaning', opt)}
                      className={`py-3 px-4 rounded-xl border text-xs font-semibold transition-all ${
                        formData.interdentalCleaning === opt
                          ? 'bg-teal-600/30 border-teal-500 text-teal-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {formData.interdentalCleaning === 'Yes' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <label className="block text-xs font-semibold text-teal-300 mb-1.5">Interdental Cleaning Frequency</label>
                  <select
                    value={formData.interdentalFrequency}
                    onChange={e => updateField('interdentalFrequency', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                  >
                    <option>Daily</option>
                    <option>Few times per week</option>
                    <option>Occasionally</option>
                  </select>
                </motion.div>
              )}
            </div>
          )}

          {/* STEP 4: Lifestyle Factors */}
          {step === 4 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-white">Lifestyle Factors</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">6. Sleep Hours Per Day</label>
                <input
                  type="number"
                  min={0}
                  max={24}
                  value={formData.sleepHours}
                  onChange={e => updateField('sleepHours', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  placeholder="e.g. 7"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">7. Smoking Status</label>
                <select
                  value={formData.smokingStatus}
                  onChange={e => updateField('smokingStatus', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option>Never smoked</option>
                  <option>Former smoker</option>
                  <option>Current smoker</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">8. Alcohol Consumption</label>
                <select
                  value={formData.alcoholConsumption}
                  onChange={e => updateField('alcoholConsumption', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option>Never</option>
                  <option>Occasionally</option>
                  <option>Frequently</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 5: Oral Health Symptoms */}
          {step === 5 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-white">Oral Health Symptoms</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">9. Gum Bleeding While Brushing</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Yes', 'No'] as const).map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateField('gumBleeding', opt)}
                      className={`py-3 px-4 rounded-xl border text-xs font-semibold ${
                        formData.gumBleeding === opt ? 'bg-teal-600/30 border-teal-500 text-teal-300' : 'bg-slate-900/60 border-slate-800 text-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">10. Gum Swelling</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Yes', 'No'] as const).map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateField('gumSwelling', opt)}
                      className={`py-3 px-4 rounded-xl border text-xs font-semibold ${
                        formData.gumSwelling === opt ? 'bg-teal-600/30 border-teal-500 text-teal-300' : 'bg-slate-900/60 border-slate-800 text-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">11. Tooth Sensitivity</label>
                <select
                  value={formData.toothSensitivity}
                  onChange={e => updateField('toothSensitivity', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option>None</option>
                  <option>Mild</option>
                  <option>Moderate</option>
                  <option>Severe</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">12. Loose Teeth / Mobility</label>
                <select
                  value={formData.looseTeeth}
                  onChange={e => updateField('looseTeeth', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option>No</option>
                  <option>Slight movement</option>
                  <option>Severe movement</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 6: Dental History */}
          {step === 6 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-white">Dental History</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">13. Last Dental Visit</label>
                <select
                  value={formData.lastDentalVisit}
                  onChange={e => updateField('lastDentalVisit', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option>Within 3 months</option>
                  <option>3–6 months ago</option>
                  <option>6–12 months ago</option>
                  <option>More than 1 year ago</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">14. Professional Dental Cleaning Frequency</label>
                <select
                  value={formData.cleaningFrequency}
                  onChange={e => updateField('cleaningFrequency', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option>Every 3 months</option>
                  <option>Every 6 months</option>
                  <option>Once a year</option>
                  <option>Never</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 7: Diet and Habits */}
          {step === 7 && (
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-white">Diet & Hydration Habits</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">15. Sugar Consumption Level</label>
                <select
                  value={formData.sugarConsumption}
                  onChange={e => updateField('sugarConsumption', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                >
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">16. Daily Water Intake (Liters per day)</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="15"
                  value={formData.waterIntake}
                  onChange={e => updateField('waterIntake', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  placeholder="e.g. 2.5"
                />
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Footer Navigation Buttons */}
      <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1 || isSubmitting}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          <button
            type="button"
            onClick={handleSaveProgress}
            className="px-3 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Progress
          </button>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 animate-spin" /> Processing AI Inference...
            </span>
          ) : step === 7 ? (
            <span>Calculate AI Risk Score</span>
          ) : (
            <>Next Step <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>

    </div>
  );
};
