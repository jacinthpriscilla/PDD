import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { Bot, Send, Sparkles } from 'lucide-react';

export const AIChatPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ id: string; sender: string; text: string; actions?: string[] }[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am PerioRisk AI Assistant trained on periodontal health parameters. How can I help you regarding gum bleeding, risk factors, or oral hygiene today?',
      actions: ['What does a high risk score mean?', 'How to prevent gum bleeding?', 'Is flossing essential?']
    }
  ]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    setTimeout(() => {
      let reply = "Periodontal disease involves bacterial biofilm accumulation leading to gingival tissue loss and bone resorption. Regular scaling and daily interdental flossing is essential.";
      let actions = ["Book Specialist Consult", "Retake 10-Step AI Risk Assessment"];

      if (text.toLowerCase().includes('bleed') || text.toLowerCase().includes('bleeding')) {
        reply = "Gingival bleeding indicates active tissue inflammation (gingivitis). If left unmanaged, it leads to pocket formation and periodontitis attachment loss.";
        actions = ["Schedule Dental Clean", "Read Flossing Guide"];
      } else if (text.toLowerCase().includes('score')) {
        reply = "Our Random Forest ML engine evaluates 10 risk parameters (age, smoking, bleeding, pockets, systemic conditions). Scores above 55 require professional periodontist review.";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: reply, actions }]);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
          
          <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-teal-400" /> PerioRisk AI Assistant
              </h1>
              <p className="text-xs text-slate-400">Clinical Query Assistant & Educational Guidance</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> GPT-4 / Random Forest AI
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed space-y-3 ${
                  m.sender === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'glass-card border border-slate-800 text-slate-200 rounded-bl-none'
                }`}>
                  <p>{m.text}</p>
                  {m.actions && m.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {m.actions.map(action => (
                        <button
                          key={action}
                          onClick={() => handleSend(action)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-teal-300 border border-teal-500/30 text-[10px] font-semibold hover:bg-slate-800"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="pt-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask PerioRisk AI about gum symptoms, risk factors..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs focus:outline-none focus:border-teal-500"
            />
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs hover:bg-teal-500 flex items-center gap-1.5">
              <Send className="w-4 h-4" /> Ask AI
            </button>
          </form>

        </main>
      </div>
      <Footer />
    </div>
  );
};
