import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { Calendar, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

export const AppointmentPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('2026-08-05');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [reason, setReason] = useState('Periodontal consultation & scaling');
  const [appointments, setAppointments] = useState([
    { id: 'apt_1', doctor: 'Dr. Marcus Vance, DDS', date: '2026-07-28', time: '10:30 AM', reason: 'High Risk Score follow-up (68/100)', status: 'approved' },
    { id: 'apt_2', doctor: 'Dr. Marcus Vance, DDS', date: '2026-08-02', time: '02:00 PM', reason: 'Scaling and root planing', status: 'pending' }
  ]);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt = {
      id: `apt_${Date.now()}`,
      doctor: 'Dr. Marcus Vance, DDS',
      date,
      time: timeSlot,
      reason,
      status: 'pending'
    };
    setAppointments([newApt, ...appointments]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-extrabold text-white">Periodontal Consultations</h1>
              <p className="text-xs text-slate-400">Book and manage your clinical appointments.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-500 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Book New Appointment
            </button>
          </div>

          <div className="space-y-3">
            {appointments.map(apt => (
              <div key={apt.id} className="p-5 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">{apt.doctor}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-teal-400" /> {apt.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-cyan-400" /> {apt.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 pt-1">{apt.reason}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  apt.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                }`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>

          {showModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white">Schedule Specialist Appointment</h3>
                <form onSubmit={handleBook} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date</label>
                    <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Time Slot</label>
                    <select value={timeSlot} onChange={e => setTimeSlot(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                      <option>09:00 AM</option>
                      <option>10:30 AM</option>
                      <option>02:00 PM</option>
                      <option>04:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Reason for Visit</label>
                    <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 rounded-xl border border-slate-700 text-xs font-semibold">Cancel</button>
                    <button type="submit" className="flex-1 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold">Confirm Booking</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
      <Footer />
    </div>
  );
};
