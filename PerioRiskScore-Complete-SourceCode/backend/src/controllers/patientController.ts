import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { usersStore } from './authController';
import { predictionsStore } from './predictionController';

export const getPatientProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

  const user = usersStore[userId];
  if (!user) {
    return res.status(404).json({ success: false, message: 'Patient profile not found.' });
  }

  const { password, ...patientProfile } = user;
  return res.status(200).json({ success: true, patient: patientProfile });
};

export const updatePatientProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

  const user = usersStore[userId];
  if (!user) {
    return res.status(404).json({ success: false, message: 'Patient profile not found.' });
  }

  Object.assign(user, req.body, { updatedAt: new Date().toISOString() });
  const { password, ...updated } = user;

  return res.status(200).json({ success: true, message: 'Profile updated successfully.', patient: updated });
};

export const getPatientDashboardStats = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const userPredictions = Object.values(predictionsStore).filter(p => p.patientId === userId || p.patientEmail === req.user?.email);

  const sorted = userPredictions.sort((a, b) => new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt || Date.now()).getTime());
  const latestPred = sorted.length > 0 ? sorted[0] : null;

  return res.status(200).json({
    success: true,
    stats: {
      totalAssessments: userPredictions.length,
      latestRiskScore: latestPred ? latestPred.riskScore : 0,
      latestRiskCategory: latestPred ? latestPred.riskCategory : 'Low Risk',
      predictionProbability: latestPred ? latestPred.predictionProbability : 0,
      lastAssessmentDate: latestPred ? latestPred.createdAt : null,
      recommendations: latestPred ? latestPred.recommendations : []
    }
  });
};
