import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { Users, Shield, UserCheck, UserX, Search } from 'lucide-react';

export const ManageUsersPage: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 'pat_1', name: 'Sarah Jenkins', email: 'patient@periorisk.com', role: 'patient', active: true, registered: '2026-07-20' },
    { id: 'doc_1', name: 'Dr. Marcus Vance, DDS', email: 'doctor@periorisk.com', role: 'doctor', active: true, registered: '2026-07-15' },
    { id: 'admin_1', name: 'System Administrator', email: 'admin@periorisk.com', role: 'admin', active: true, registered: '2026-07-01' }
  ]);

  const toggleUser = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Manage System Users & Roles</h1>
            <p className="text-xs text-slate-400">View registered accounts, toggle active status, and modify roles.</p>
          </div>

          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">User Name</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Registered Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-900/40">
                    <td className="p-4 font-bold text-white">{u.name}</td>
                    <td className="p-4 text-slate-300">{u.email}</td>
                    <td className="p-4 uppercase font-bold text-teal-400">{u.role}</td>
                    <td className="p-4 text-slate-400">{u.registered}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {u.active ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleUser(u.id)}
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          u.active ? 'bg-rose-600/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {u.active ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
