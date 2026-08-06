import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { Footer } from '../../components/common/Footer';
import { Search, Star, MapPin, Award, Calendar } from 'lucide-react';

export const DoctorSearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const doctors = [
    { id: 'doc_1', name: 'Dr. Marcus Vance, DDS', spec: 'Periodontics & Implantology', rating: 4.9, reviews: 128, exp: 14, loc: '100 Medical Center Way' },
    { id: 'doc_2', name: 'Dr. Elena Rostova, DMD', spec: 'Laser Periodontal Therapy', rating: 4.8, reviews: 94, exp: 11, loc: '450 Healthcare Blvd' },
    { id: 'doc_3', name: 'Dr. Arthur Pendelton', spec: 'Surgical Periodontics', rating: 4.9, reviews: 156, exp: 18, loc: '88 Dental Suite Rd' }
  ];

  const filtered = doctors.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.spec.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Find Certified Periodontists</h1>
            <p className="text-xs text-slate-400">Search board-certified gum disease specialists.</p>
          </div>

          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name or specialization..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(doc => (
              <div key={doc.id} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{doc.name}</h3>
                    <p className="text-xs text-teal-400 font-semibold">{doc.spec}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {doc.rating} ({doc.reviews})
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-teal-400" /> {doc.exp} Years Clinical Experience</div>
                  <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {doc.loc}</div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-teal-600/20 text-teal-300 border border-teal-500/30 text-xs font-bold hover:bg-teal-600/30 flex items-center justify-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> Book Consultation
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
