import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { usersStore } from './authController';
import { predictionsStore } from './predictionController';

export const getDoctors = async (req: Request, res: Response) => {
  const doctors = Object.values(usersStore)
    .filter(u => u.role === 'doctor')
    .map(({ password, ...doc }) => doc);

  return res.status(200).json({ success: true, doctors });
};

export const getDoctorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const doc = usersStore[id];

  if (!doc || doc.role !== 'doctor') {
    return res.status(404).json({ success: false, message: 'Doctor not found.' });
  }

  const { password, ...doctorData } = doc;
  return res.status(200).json({ success: true, doctor: doctorData });
};

export const getDoctorDashboardStats = async (req: AuthRequest, res: Response) => {
  const allPatients = Object.values(usersStore).filter(u => u.role === 'patient');
  const allPredictions = Object.values(predictionsStore);

  const highRiskPatientsCount = allPredictions.filter(p => p.riskCategory === 'High' || p.riskCategory === 'Severe').length;

  return res.status(200).json({
    success: true,
    stats: {
      totalAssignedPatients: allPatients.length,
      pendingAppointments: 2,
      highRiskPatientsAlerts: highRiskPatientsCount,
      completedConsultationsThisMonth: 18,
      averageRating: 4.9
    }
  });
};
