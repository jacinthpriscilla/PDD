import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Appointment } from '../../../shared/src';

export const appointmentsStore: Record<string, Appointment> = {
  'apt_1': {
    id: 'apt_1',
    patientId: 'pat_1',
    patientName: 'Sarah Jenkins',
    patientEmail: 'patient@periorisk.com',
    patientPhone: '+1 555-0192',
    doctorId: 'doc_1',
    doctorName: 'Dr. Marcus Vance, DDS',
    doctorSpecialization: 'Periodontics & Implantology',
    date: '2026-07-28',
    timeSlot: '10:30 AM',
    reason: 'Follow-up consultation for High Periodontal Risk Score (68/100).',
    riskScoreAtBooking: 68,
    riskLevelAtBooking: 'High',
    status: 'approved',
    notes: 'Approved. Patient instructed to bring past dental X-rays.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString()
  },
  'apt_2': {
    id: 'apt_2',
    patientId: 'pat_1',
    patientName: 'Sarah Jenkins',
    patientEmail: 'patient@periorisk.com',
    patientPhone: '+1 555-0192',
    doctorId: 'doc_1',
    doctorName: 'Dr. Marcus Vance, DDS',
    doctorSpecialization: 'Periodontics & Implantology',
    date: '2026-08-02',
    timeSlot: '02:00 PM',
    reason: 'Scaling and root planing initial session.',
    riskScoreAtBooking: 68,
    riskLevelAtBooking: 'High',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

export const createAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { doctorId, date, timeSlot, reason, riskScoreAtBooking, riskLevelAtBooking } = req.body;

    if (!date || !timeSlot || !reason) {
      return res.status(400).json({ success: false, message: 'Date, time slot, and reason are required.' });
    }

    const newApt: Appointment = {
      id: `apt_${Date.now()}`,
      patientId: req.user?.id || 'pat_1',
      patientName: req.user?.name || 'Sarah Jenkins',
      patientEmail: req.user?.email || 'patient@periorisk.com',
      patientPhone: req.body.patientPhone || '+1 555-0192',
      doctorId: doctorId || 'doc_1',
      doctorName: 'Dr. Marcus Vance, DDS',
      doctorSpecialization: 'Periodontics & Implantology',
      date,
      timeSlot,
      reason,
      riskScoreAtBooking: riskScoreAtBooking || 68,
      riskLevelAtBooking: riskLevelAtBooking || 'High',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    appointmentsStore[newApt.id] = newApt;

    return res.status(201).json({
      success: true,
      message: 'Appointment booking request submitted successfully.',
      appointment: newApt
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAppointments = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const role = req.user?.role;

  let list = Object.values(appointmentsStore);

  if (role === 'patient') {
    list = list.filter(a => a.patientId === userId || a.patientEmail === req.user?.email);
  } else if (role === 'doctor') {
    list = list.filter(a => a.doctorId === userId);
  }

  return res.status(200).json({
    success: true,
    appointments: list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  });
};

export const updateAppointmentStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const appointment = appointmentsStore[id];
  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found.' });
  }

  appointment.status = status || appointment.status;
  if (notes) appointment.notes = notes;
  appointment.updatedAt = new Date().toISOString();

  return res.status(200).json({
    success: true,
    message: `Appointment ${status} successfully.`,
    appointment
  });
};
