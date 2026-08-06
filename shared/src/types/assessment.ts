export interface AssessmentOption {
  label: string;
  value: any;
  description?: string;
}

export interface AssessmentQuestion {
  id: string;
  step: number;
  category: string;
  question: string;
  options: AssessmentOption[];
}

export interface AssessmentAnswers {
  // Step 1: Basic Info
  age: number; // Required: 1 to 120

  // Step 2: Medical History
  diabetes: 'Yes' | 'No' | "Don't Know";
  diabetesType?: 'Type 1' | 'Type 2' | 'Gestational';
  bloodSugarControl?: 'Controlled' | 'Moderate' | 'Poorly Controlled';

  // Step 3: Oral Hygiene Behaviour
  brushingFrequency: '0 times per day' | 'Once daily' | 'Twice daily' | 'More than twice daily';
  brushingDuration: 'Less than 1 minute' | '1–2 minutes' | 'More than 2 minutes';
  interdentalCleaning: 'Yes' | 'No';
  interdentalFrequency?: 'Daily' | 'Few times per week' | 'Occasionally';

  // Step 4: Lifestyle Factors
  sleepHours: number; // 0 to 24
  smokingStatus: 'Never smoked' | 'Former smoker' | 'Current smoker';
  alcoholConsumption: 'Never' | 'Occasionally' | 'Frequently';

  // Step 5: Oral Health Symptoms
  gumBleeding: 'Yes' | 'No';
  gumSwelling: 'Yes' | 'No';
  toothSensitivity: 'None' | 'Mild' | 'Moderate' | 'Severe';
  looseTeeth: 'No' | 'Slight movement' | 'Severe movement';

  // Step 6: Dental History
  lastDentalVisit: 'Within 3 months' | '3–6 months ago' | '6–12 months ago' | 'More than 1 year ago';
  cleaningFrequency: 'Every 3 months' | 'Every 6 months' | 'Once a year' | 'Never';

  // Step 7: Diet and Habits
  sugarConsumption: 'Low' | 'Moderate' | 'High';
  waterIntake: number; // Liters per day
}

export interface AssessmentRecord {
  id: string;
  patientId: string;
  patientName?: string;
  answers: AssessmentAnswers;
  predictionResult: {
    riskScore: number;
    riskCategory: string;
    predictionProbability: number;
    recommendations: string[];
  };
  createdAt: string;
}
