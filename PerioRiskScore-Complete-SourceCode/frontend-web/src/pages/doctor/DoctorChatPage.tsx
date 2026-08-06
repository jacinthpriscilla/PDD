import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { Send } from 'lucide-react';

export const DoctorChatPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', sender: 'doctor', text: 'Hello Sarah, I reviewed your recent AI risk assessment score of 68/100.', time: '10:00 AM' },
    { id: '2', sender: 'patient', text: 'Thank you Dr. Vance! Should I schedule a scaling procedure before my next checkup?', time: '10:05 AM' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'doctor', text: input, time: '10:10 AM' }]);
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
          <div className="pb-4 border-b border-slate-800">
            <h1 className="text-xl font-extrabold text-white">Patient Consultation Channel: Sarah Jenkins</h1>
            <p className="text-xs text-slate-400">Encrypted Clinical Messaging</p>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'doctor' ? 'bg-teal-600 text-white rounded-br-none' : 'glass-card border border-slate-800 text-slate-200 rounded-bl-none'
                }`}>
                  <p>{m.text}</p>
                  <span className="block text-[9px] opacity-75 mt-1 text-right">{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="pt-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your response to patient Sarah..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none focus:border-teal-500"
            />
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-500 flex items-center gap-1.5">
              <Send className="w-4 h-4" /> Send
            </button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
};
