import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { useAuth } from '../../context/AuthContext';
import { User, Save, CheckCircle2 } from 'lucide-react';

export const PatientProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Sarah Jenkins');
  const [email, setEmail] = useState(user?.email || 'patient@periorisk.com');
  const [phone, setPhone] = useState(user?.phone || '+1 555-0192');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Medical & Account Profile</h1>
            <p className="text-xs text-slate-400">Manage your contact details and patient medical preferences.</p>
          </div>

          <div className="max-w-2xl glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            {saved && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Profile details saved successfully.
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs" />
              </div>
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-500 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Profile
              </button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
