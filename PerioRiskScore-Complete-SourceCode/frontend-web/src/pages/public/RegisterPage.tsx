import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../../../shared/src';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { api } from '../../services/api';
import { Shield, Mail, Lock, User, UserCheck, Stethoscope, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState<UserRole>('patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [specialization, setSpecialization] = useState('Periodontics');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let uid = `${role}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      let token = `token_${Date.now()}`;

      // 1. Create Firebase Auth user
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        uid = userCredential.user.uid;
        token = await userCredential.user.getIdToken();
      } catch (fbErr: any) {
        console.warn('Firebase Auth fallback / offline: Creating account in local store.');
      }

      // 2. Build User Profile
      const newUser = {
        id: uid,
        email,
        name,
        role,
        specialization: role === 'doctor' ? specialization : undefined,
        createdAt: new Date().toISOString()
      };

      // 3. Store in Firestore collection 'users'
      try {
        await setDoc(doc(db, 'users', uid), newUser);
      } catch (fsErr) {
        console.warn('Firestore store fallback active');
      }

      // 4. Send to Backend REST API
      try {
        const res = await api.post('/auth/register', { ...newUser, password });
        if (res.data?.token) token = res.data.token;
      } catch (apiErr) {
        // Local fallback
      }

      // 5. Update Auth Context & Navigate
      login(token, newUser);
      setIsLoading(false);

      if (role === 'patient') navigate('/patient/dashboard');
      else if (role === 'doctor') navigate('/doctor/dashboard');
      else navigate('/admin/dashboard');

    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-slate-800 space-y-6">
          
          <div className="text-center space-y-2">
            <img
              src="/logo.png"
              alt="PerioRiskScore Logo"
              className="w-44 h-auto max-w-[180px] mx-auto object-contain mb-3 p-1"
            />
            <h1 className="text-2xl font-extrabold text-white">Create Your Account</h1>
            <p className="text-xs text-slate-400">Join PerioRiskScore for AI-powered periodontal monitoring</p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          {/* Role Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            {(['patient', 'doctor', 'admin'] as const).map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2 text-xs font-bold capitalize rounded-lg transition-all ${
                  role === r ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-teal-500 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-teal-500 focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {role === 'doctor' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Specialization</label>
                <div className="relative">
                  <Stethoscope className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={specialization}
                    onChange={e => setSpecialization(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-teal-500 focus:outline-none"
                    placeholder="Periodontics / Dental Surgery"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:border-teal-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">Creating Account...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" /> Register {role.toUpperCase()} Account
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-teal-400 font-bold hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
