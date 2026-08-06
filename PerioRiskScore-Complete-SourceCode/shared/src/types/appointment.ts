export type AppointmentStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone?: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  date: string;
  timeSlot: string;
  reason: string;
  riskScoreAtBooking?: number;
  riskLevelAtBooking?: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
