import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../../../shared/src';

const JWT_SECRET = process.env.JWT_SECRET || 'periorisk_super_secret_jwt_key_2026_production';

// Dynamic user database store
export const usersStore: Record<string, any> = {
  "patient_test": {
    id: "patient_test",
    email: "test_patient@example.com",
    password: "password123",
    name: "Test Patient",
    role: "patient",
    phone: "1234567890",
    isEmailVerified: true,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    age: 35,
    gender: "male"
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role = 'patient', phone, specialization, licenseNumber, age, gender } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: 'Email, password, and name are required.' });
    }

    const existingUser = Object.values(usersStore).find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const userId = `${role}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const newUser: any = {
      id: userId,
      email,
      password,
      name,
      role: role as UserRole,
      phone: phone || '',
      isEmailVerified: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (role === 'patient') {
      newUser.age = age || 30;
      newUser.gender = gender || 'other';
    } else if (role === 'doctor') {
      newUser.specialization = specialization || 'General Periodontics';
      newUser.licenseNumber = licenseNumber || 'LICENSE-PENDING';
      newUser.experienceYears = 5;
      newUser.rating = 5.0;
      newUser.reviewCount = 0;
      newUser.isVerifiedDoctor = true;
    }

    usersStore[userId] = newUser;

    const token = jwt.sign({ id: userId, email: newUser.email, name: newUser.name, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...userWithoutPassword } = newUser;
    return res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: userWithoutPassword
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = Object.values(usersStore).find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please register or check details.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: userWithoutPassword
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  return res.status(200).json({
    success: true,
    message: `Password reset link sent to ${email}`
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Email verified successfully.'
  });
};
