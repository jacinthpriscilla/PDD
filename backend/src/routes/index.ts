import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth';
import * as authCtrl from '../controllers/authController';
import * as patientCtrl from '../controllers/patientController';
import * as predCtrl from '../controllers/predictionController';
import * as doctorCtrl from '../controllers/doctorController';
import * as aptCtrl from '../controllers/appointmentController';
import * as chatCtrl from '../controllers/chatController';
import * as adminCtrl from '../controllers/adminController';

const router = Router();

// --- AUTHENTICATION ROUTES ---
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);
router.post('/auth/forgot-password', authCtrl.forgotPassword);
router.post('/auth/verify-email', authCtrl.verifyEmail);

// --- PATIENT ROUTES ---
router.get('/patients/profile', authenticateToken, requireRole('patient', 'admin'), patientCtrl.getPatientProfile);
router.put('/patients/profile', authenticateToken, requireRole('patient'), patientCtrl.updatePatientProfile);
router.get('/patients/dashboard-stats', authenticateToken, requireRole('patient'), patientCtrl.getPatientDashboardStats);

// --- AI PREDICTION & ASSESSMENT ROUTES ---
router.post('/prediction/assess-risk', predCtrl.submitAssessment); // Specific endpoint required
router.post('/predictions/assess', predCtrl.submitAssessment);      // Alias
router.get('/predictions', authenticateToken, predCtrl.getPredictions);
router.get('/predictions/:id', authenticateToken, predCtrl.getPredictionById);
router.get('/predictions/:id/pdf', authenticateToken, predCtrl.downloadPDFReport);

// --- DOCTOR ROUTES ---
router.get('/doctors', doctorCtrl.getDoctors);
router.get('/doctors/:id', doctorCtrl.getDoctorById);
router.get('/doctors/dashboard-stats', authenticateToken, requireRole('doctor'), doctorCtrl.getDoctorDashboardStats);

// --- APPOINTMENT ROUTES ---
router.post('/appointments', authenticateToken, aptCtrl.createAppointment);
router.get('/appointments', authenticateToken, aptCtrl.getAppointments);
router.patch('/appointments/:id/status', authenticateToken, requireRole('doctor', 'admin'), aptCtrl.updateAppointmentStatus);

// --- REAL-TIME CHAT & AI ASSISTANT ROUTES ---
router.get('/chat/messages', authenticateToken, chatCtrl.getMessages);
router.post('/chat/messages', authenticateToken, chatCtrl.sendMessage);
router.post('/chat/ai-assistant', authenticateToken, chatCtrl.aiAssistantChat);

// --- ADMIN & SYSTEM MANAGEMENT ROUTES ---
router.get('/admin/users', authenticateToken, requireRole('admin'), adminCtrl.getAllUsers);
router.patch('/admin/users/:id/toggle-status', authenticateToken, requireRole('admin'), adminCtrl.toggleUserStatus);
router.get('/admin/analytics', authenticateToken, requireRole('admin'), adminCtrl.getSystemAnalytics);
router.get('/admin/audit-logs', authenticateToken, requireRole('admin'), adminCtrl.getAuditLogs);

export default router;
