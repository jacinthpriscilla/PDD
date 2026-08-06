import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';

// Patient Pages
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { RiskAssessmentPage } from './pages/patient/RiskAssessmentPage';
import { RiskHistoryPage } from './pages/patient/RiskHistoryPage';
import { AppointmentPage } from './pages/patient/AppointmentPage';
import { DoctorSearchPage } from './pages/patient/DoctorSearchPage';
import { PatientChatPage } from './pages/patient/PatientChatPage';
import { AIChatPage } from './pages/patient/AIChatPage';
import { ReportsPage } from './pages/patient/ReportsPage';
import { PatientProfilePage } from './pages/patient/PatientProfilePage';

// Doctor Pages
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { PatientManagementPage } from './pages/doctor/PatientManagementPage';
import { DoctorAppointmentsPage } from './pages/doctor/DoctorAppointmentsPage';
import { DoctorChatPage } from './pages/doctor/DoctorChatPage';
import { DoctorAnalyticsPage } from './pages/doctor/DoctorAnalyticsPage';
import { DoctorProfilePage } from './pages/doctor/DoctorProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageUsersPage } from './pages/admin/ManageUsersPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AuditLogsPage } from './pages/admin/AuditLogsPage';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Patient Routes */}
          <Route path="/patient/dashboard" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
          <Route path="/patient/assessment" element={<ProtectedRoute allowedRoles={['patient']}><RiskAssessmentPage /></ProtectedRoute>} />
          <Route path="/patient/history" element={<ProtectedRoute allowedRoles={['patient']}><RiskHistoryPage /></ProtectedRoute>} />
          <Route path="/patient/appointments" element={<ProtectedRoute allowedRoles={['patient']}><AppointmentPage /></ProtectedRoute>} />
          <Route path="/patient/doctors" element={<ProtectedRoute allowedRoles={['patient']}><DoctorSearchPage /></ProtectedRoute>} />
          <Route path="/patient/chat" element={<ProtectedRoute allowedRoles={['patient']}><PatientChatPage /></ProtectedRoute>} />
          <Route path="/patient/ai-assistant" element={<ProtectedRoute allowedRoles={['patient']}><AIChatPage /></ProtectedRoute>} />
          <Route path="/patient/reports" element={<ProtectedRoute allowedRoles={['patient']}><ReportsPage /></ProtectedRoute>} />
          <Route path="/patient/profile" element={<ProtectedRoute allowedRoles={['patient']}><PatientProfilePage /></ProtectedRoute>} />

          {/* Doctor Routes */}
          <Route path="/doctor/dashboard" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/doctor/patients" element={<ProtectedRoute allowedRoles={['doctor']}><PatientManagementPage /></ProtectedRoute>} />
          <Route path="/doctor/appointments" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorAppointmentsPage /></ProtectedRoute>} />
          <Route path="/doctor/chat" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorChatPage /></ProtectedRoute>} />
          <Route path="/doctor/analytics" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorAnalyticsPage /></ProtectedRoute>} />
          <Route path="/doctor/profile" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorProfilePage /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><ManageUsersPage /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalyticsPage /></ProtectedRoute>} />
          <Route path="/admin/audit-logs" element={<ProtectedRoute allowedRoles={['admin']}><AuditLogsPage /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
