import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { Shield, Clock, Eye } from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const logs = [
    { id: 'log_1', action: 'USER_LOGIN', user: 'patient@periorisk.com', role: 'patient', ip: '192.168.1.10', time: '10:00:12 AM' },
    { id: 'log_2', action: 'PREDICTION_EXECUTED', user: 'patient@periorisk.com', role: 'patient', details: 'Risk Score: 68 (High)', time: '10:02:44 AM' },
    { id: 'log_3', action: 'APPOINTMENT_APPROVED', user: 'doctor@periorisk.com', role: 'doctor', details: 'Appointment apt_1 approved', time: '10:15:02 AM' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Security & Activity Audit Logs</h1>
            <p className="text-xs text-slate-400">HIPAA-compliant immutable system access and mutation logs.</p>
          </div>

          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Action Event</th>
                  <th className="p-4">User Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">IP Address / Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {logs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-900/40">
                    <td className="p-4 text-slate-400">{log.time}</td>
                    <td className="p-4 font-bold text-teal-400">{log.action}</td>
                    <td className="p-4 text-slate-200">{log.user}</td>
                    <td className="p-4 uppercase text-slate-400">{log.role}</td>
                    <td className="p-4 text-slate-300">{log.details || log.ip}</td>
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
