import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { FileText, Download, Calendar, ShieldCheck } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const reports = [
    { id: 'pred_sample_1', title: 'Periodontal Risk Assessment Report', date: '2026-07-20', score: 68, category: 'High', pdfUrl: 'http://localhost:5000/api/predictions/pred_sample_1/pdf' },
    { id: 'pred_sample_2', title: 'Routine Biofilm Screening', date: '2026-05-14', score: 58, category: 'Moderate', pdfUrl: 'http://localhost:5000/api/predictions/pred_sample_1/pdf' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Medical Reports & PDF Downloads</h1>
            <p className="text-xs text-slate-400">Access and download official AI diagnostic assessment documents.</p>
          </div>

          <div className="space-y-4">
            {reports.map(rep => (
              <div key={rep.id} className="p-6 rounded-2xl glass-card border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{rep.title}</h3>
                    <p className="text-xs text-slate-400">Generated on {rep.date} • Risk Score: {rep.score}/100 ({rep.category})</p>
                  </div>
                </div>

                <a
                  href={rep.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-teal-600 text-white font-semibold text-xs hover:bg-teal-500 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
