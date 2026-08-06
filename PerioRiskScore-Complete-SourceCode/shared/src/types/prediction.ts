export type RiskCategory = 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Severe Risk';

export interface PredictionResult {
  id?: string;
  assessmentId?: string;
  patientId?: string;
  patientName?: string;
  patientEmail?: string;
  riskScore: number; // 0 to 100
  riskCategory: string; // e.g. "High Risk"
  predictionProbability: number; // e.g. 0.91 (0.0 to 1.0)
  recommendations: string[]; // e.g. ["Improve oral hygiene", "Use interdental cleaning", ...]
  createdAt?: string;
}

export interface RiskTrendItem {
  date: string;
  score: number;
  category: string;
}
