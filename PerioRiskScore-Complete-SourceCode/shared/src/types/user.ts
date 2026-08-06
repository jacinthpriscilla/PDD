export type UserRole = 'patient' | 'doctor' | 'admin';

export interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  isActive: boolean;
}

export interface PatientProfile extends BaseUser {
  role: 'patient';
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  emergencyContact?: string;
  medicalHistory?: string[];
  lastAssessmentId?: string;
  latestRiskScore?: number;
  latestRiskLevel?: 'Low' | 'Moderate' | 'High' | 'Severe';
}

export interface DoctorProfile extends BaseUser {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  experienceYears: number;
  clinicAddress: string;
  bio: string;
  rating: number;
  reviewCount: number;
  availabilityHours: string[];
  assignedPatientIds: string[];
  isVerifiedDoctor: boolean;
}

export interface AdminProfile extends BaseUser {
  role: 'admin';
  permissions: string[];
  lastLoginIp?: string;
}

export type UserProfile = PatientProfile | DoctorProfile | AdminProfile;
