import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { usersStore } from './authController';
import { appointmentsStore } from './appointmentController';
import { predictionsStore } from './predictionController';

export const auditLogsStore = [
  { id: 'log_1', action: 'USER_LOGIN', user: 'patient@periorisk.com', role: 'patient', ip: '192.168.1.10', timestamp: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: 'log_2', action: 'PREDICTION_EXECUTED', user: 'patient@periorisk.com', role: 'patient', details: 'Risk Score: 68 (High)', timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString() },
  { id: 'log_3', action: 'APPOINTMENT_APPROVED', user: 'doctor@periorisk.com', role: 'doctor', details: 'Appointment apt_1 approved', timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString() }
];

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  const users = Object.values(usersStore).map(({ password, ...u }) => u);
  return res.status(200).json({ success: true, users });
};

export const toggleUserStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const user = usersStore[id];

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  user.isActive = !user.isActive;
  auditLogsStore.unshift({
    id: `log_${Date.now()}`,
    action: user.isActive ? 'USER_ACTIVATED' : 'USER_DEACTIVATED',
    user: req.user?.email || 'admin',
    role: 'admin',
    details: `Target user ${user.email}`,
    timestamp: new Date().toISOString()
  });

  return res.status(200).json({
    success: true,
    message: `User status changed to ${user.isActive ? 'Active' : 'Inactive'}`,
    isActive: user.isActive
  });
};

export const getSystemAnalytics = async (req: AuthRequest, res: Response) => {
  const users = Object.values(usersStore);
  const predictions = Object.values(predictionsStore);
  const appointments = Object.values(appointmentsStore);

  const riskDistribution = {
    Low: predictions.filter(p => p.riskCategory === 'Low').length,
    Moderate: predictions.filter(p => p.riskCategory === 'Moderate').length,
    High: predictions.filter(p => p.riskCategory === 'High').length,
    Severe: predictions.filter(p => p.riskCategory === 'Severe').length
  };

  return res.status(200).json({
    success: true,
    analytics: {
      totalUsers: users.length,
      patientCount: users.filter(u => u.role === 'patient').length,
      doctorCount: users.filter(u => u.role === 'doctor').length,
      totalPredictionsExecuted: predictions.length,
      totalAppointmentsBooked: appointments.length,
      riskDistribution,
      systemHealth: {
        apiLatencyMs: 24,
        mlInferenceTimeMs: 4,
        databaseUptime: '99.98%',
        storageUsageMb: 412
      }
    }
  });
};

export const getAuditLogs = async (req: AuthRequest, res: Response) => {
  return res.status(200).json({ success: true, logs: auditLogsStore });
};
