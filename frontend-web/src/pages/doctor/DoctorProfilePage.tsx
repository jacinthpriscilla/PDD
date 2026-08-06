import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { useAuth } from '../../context/AuthContext';
import { Award, Save, CheckCircle2 } from 'lucide-react';

export const DoctorProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Dr. Marcus Vance, DDS');
  const [spec, setSpec] = useState('Periodontics & Implantology');
  const [license, setLicense] = useState('PERIO-99824');
  const [bio, setBio] = useState('Board-certified Periodontist specializing in regenerative gum therapies and early risk intervention.');
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
            <h1 className="text-2xl font-extrabold text-white">Practitioner Credentials</h1>
            <p className="text-xs text-slate-400">Manage your clinical profile, bio, and license information.</p>
          </div>

          <div className="max-w-2xl glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            {saved && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Doctor credentials updated successfully.
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Doctor Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Specialization</label>
                <input type="text" value={spec} onChange={e => setSpec(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">License Number</label>
                <input type="text" value={license} onChange={e => setLicense(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Clinical Biography</label>
                <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs" />
              </div>
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-500 flex items-center gap-2">
                <Save className="w-4 h-4" /> Update Practitioner Profile
              </button>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
