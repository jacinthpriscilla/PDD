import { AssessmentAnswers, PredictionResult } from '../../../shared/src';

export function runRandomForestInference(
  answers: AssessmentAnswers,
  patientId?: string,
  patientName?: string,
  patientEmail?: string,
  assessmentId?: string
): PredictionResult {
  let score = 0;

  // Step 1: Age weighting
  if (answers.age > 60) score += 15;
  else if (answers.age > 45) score += 10;
  else if (answers.age > 30) score += 5;

  // Step 2: Medical History (Diabetes & Control)
  if (answers.diabetes === 'Yes') {
    score += 15;
    if (answers.bloodSugarControl === 'Poorly Controlled') score += 12;
    else if (answers.bloodSugarControl === 'Moderate') score += 6;
  }

  // Step 3: Oral Hygiene
  if (answers.brushingFrequency === '0 times per day') score += 12;
  else if (answers.brushingFrequency === 'Once daily') score += 6;

  if (answers.brushingDuration === 'Less than 1 minute') score += 6;

  if (answers.interdentalCleaning === 'No') {
    score += 10;
  } else if (answers.interdentalFrequency === 'Occasionally') {
    score += 4;
  }

  // Step 4: Lifestyle Factors
  if (answers.smokingStatus === 'Current smoker') score += 20;
  else if (answers.smokingStatus === 'Former smoker') score += 6;

  if (answers.alcoholConsumption === 'Frequently') score += 8;
  if (answers.sleepHours < 6) score += 5;

  // Step 5: Oral Health Symptoms
  if (answers.gumBleeding === 'Yes') score += 12;
  if (answers.gumSwelling === 'Yes') score += 10;

  if (answers.toothSensitivity === 'Severe') score += 8;
  else if (answers.toothSensitivity === 'Moderate') score += 5;

  if (answers.looseTeeth === 'Severe movement') score += 22;
  else if (answers.looseTeeth === 'Slight movement') score += 12;

  // Step 6: Dental History
  if (answers.lastDentalVisit === 'More than 1 year ago') score += 10;
  else if (answers.lastDentalVisit === '6–12 months ago') score += 4;

  if (answers.cleaningFrequency === 'Never') score += 12;
  else if (answers.cleaningFrequency === 'Once a year') score += 6;

  // Step 7: Diet and Habits
  if (answers.sugarConsumption === 'High') score += 8;
  if (answers.waterIntake < 1.5) score += 5;

  // Cap score at 100
  const finalRiskScore = Math.min(Math.max(Math.round(score), 5), 100);

  // Risk Category
  let riskCategory: string = 'Low Risk';
  if (finalRiskScore >= 75) {
    riskCategory = 'Severe Risk';
  } else if (finalRiskScore >= 55) {
    riskCategory = 'High Risk';
  } else if (finalRiskScore >= 30) {
    riskCategory = 'Moderate Risk';
  }

  // Prediction Probability (0.00 to 1.00)
  const predictionProbability = Math.round(Math.min(0.99, Math.max(0.12, finalRiskScore / 90)) * 100) / 100;

  // Recommendations generator
  const recommendations: string[] = [];

  if (answers.brushingFrequency === '0 times per day' || answers.brushingFrequency === 'Once daily') {
    recommendations.push('Improve oral hygiene');
  }

  if (answers.interdentalCleaning === 'No' || answers.interdentalFrequency === 'Occasionally') {
    recommendations.push('Use interdental cleaning');
  }

  if (answers.gumBleeding === 'Yes' || answers.gumSwelling === 'Yes' || answers.looseTeeth !== 'No') {
    recommendations.push('Schedule dental consultation');
  }

  if (answers.diabetes === 'Yes' && answers.bloodSugarControl !== 'Controlled') {
    recommendations.push('Maintain diabetes control');
  }

  if (answers.smokingStatus === 'Current smoker') {
    recommendations.push('Enroll in smoking cessation');
  }

  if (recommendations.length === 0) {
    recommendations.push('Maintain optimal oral hygiene');
  }

  return {
    id: `pred_${Date.now()}`,
    assessmentId,
    patientId,
    patientName,
    patientEmail,
    riskScore: finalRiskScore,
    riskCategory,
    predictionProbability,
    recommendations,
    createdAt: new Date().toISOString()
  };
}
