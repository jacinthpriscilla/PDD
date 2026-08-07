import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { runRandomForestInference } from '../../../ml-model/predict';
import { AssessmentAnswers, PredictionResult } from '../../../shared/src';
import { generateRiskReportPDF } from '../services/pdfService';

export const predictionsStore: Record<string, PredictionResult> = {};
export const assessmentsStore: Record<string, any> = {};

export const submitAssessment = async (req: AuthRequest, res: Response) => {
  try {
    const answers: AssessmentAnswers = req.body.answers || req.body;

    if (!answers || answers.age === undefined) {
      return res.status(400).json({ success: false, message: 'Valid 7-step periodontal risk assessment payload is required.' });
    }

    if (answers.age < 1 || answers.age > 120) {
      return res.status(400).json({ success: false, message: 'Age must be between 1 and 120.' });
    }

    const patientId = req.user?.id || 'pat_anon';
    const patientName = req.user?.name || 'Patient';
    const patientEmail = req.user?.email || 'patient@periorisk.com';
    const assessmentId = `ass_${Date.now()}`;

    // Execute Random Forest Inference Engine
    const result = runRandomForestInference(answers, patientId, patientName, patientEmail, assessmentId);

    // Save records
    predictionsStore[result.id || `pred_${Date.now()}`] = result;
    assessmentsStore[assessmentId] = {
      id: assessmentId,
      patientId,
      patientName,
      answers,
      predictionResult: result,
      createdAt: new Date().toISOString()
    };

    return res.status(201).json({
      success: true,
      message: 'AI Periodontal Risk Assessment completed.',
      riskScore: result.riskScore,
      riskCategory: result.riskCategory,
      predictionProbability: result.predictionProbability,
      recommendations: result.recommendations,
      prediction: result
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPredictions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;

    let userPredictions = Object.values(predictionsStore);
    if (role === 'patient' && userId) {
      userPredictions = userPredictions.filter(p => p.patientId === userId || p.patientEmail === req.user?.email);
    }

    return res.status(200).json({
      success: true,
      predictions: userPredictions.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPredictionById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const prediction = predictionsStore[id];
  if (!prediction) {
    return res.status(404).json({ success: false, message: 'Prediction report not found.' });
  }
  return res.status(200).json({ success: true, prediction });
};

export const downloadPDFReport = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const prediction = predictionsStore[id] || Object.values(predictionsStore)[0];

    if (!prediction) {
      return res.status(404).json({ success: false, message: 'Prediction record not found.' });
    }

    const pdfBuffer = await generateRiskReportPDF(prediction);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=PerioRisk_Report_${prediction.id || 'report'}.pdf`);
    return res.send(pdfBuffer);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
