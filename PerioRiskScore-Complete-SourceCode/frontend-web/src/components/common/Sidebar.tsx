import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  ClipboardList,
  History,
  Calendar,
  Search,
  MessageSquare,
  Bot,
  FileText,
  UserCheck,
  Users,
  BarChart3,
  Shield,
  User
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'patient';

  const patientNav = [
    { to: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/patient/assessment', label: '10-Step AI Risk Form', icon: ClipboardList },
    { to: '/patient/history', label: 'Risk History & Trends', icon: History },
    { to: '/patient/appointments', label: 'Book Appointment', icon: Calendar },
    { to: '/patient/doctors', label: 'Doctor Directory', icon: Search },
    { to: '/patient/chat', label: 'Doctor Chat', icon: MessageSquare },
    { to: '/patient/ai-assistant', label: 'AI Chat Assistant', icon: Bot },
    { to: '/patient/reports', label: 'Medical Reports (PDF)', icon: FileText },
    { to: '/patient/profile', label: 'Medical Profile', icon: User }
  ];

  const doctorNav = [
    { to: '/doctor/dashboard', label: 'Clinical Dashboard', icon: LayoutDashboard },
    { to: '/doctor/patients', label: 'Manage Patients', icon: Users },
    { to: '/doctor/appointments', label: 'Appointment Requests', icon: Calendar },
    { to: '/doctor/chat', label: 'Patient Consult Chat', icon: MessageSquare },
    { to: '/doctor/analytics', label: 'Risk Analytics', icon: BarChart3 },
    { to: '/doctor/profile', label: 'Doctor Profile', icon: UserCheck }
  ];

  const adminNav = [
    { to: '/admin/dashboard', label: 'System Overview', icon: LayoutDashboard },
    { to: '/admin/users', label: 'User Directory & Roles', icon: Users },
    { to: '/admin/analytics', label: 'AI Risk Analytics', icon: BarChart3 },
    { to: '/admin/audit-logs', label: 'Security Audit Logs', icon: Shield }
  ];

  const navItems = role === 'patient' ? patientNav : role === 'doctor' ? doctorNav : adminNav;

  return (
    <aside className="w-64 glass-panel border-r border-slate-800/80 bg-slate-950/60 p-4 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div>
        {/* Top Sidebar Logo (56-72px) */}
        <div className="px-3 pb-4 mb-3 border-b border-slate-800/60 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="PerioRiskScore Logo"
            className="h-16 w-auto max-w-[180px] object-contain p-1"
          />
        </div>

        <div className="px-3 py-2 text-xs font-semibold text-teal-400/90 tracking-wider uppercase">
          {role} Workspace
        </div>
        <nav className="mt-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-600/30 to-emerald-600/30 text-teal-300 border border-teal-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-600/30 border border-teal-500/50 flex items-center justify-center text-teal-300 font-bold text-xs">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold text-slate-200 truncate">{user?.name}</span>
            <span className="text-[10px] text-teal-400 capitalize">{user?.role}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
