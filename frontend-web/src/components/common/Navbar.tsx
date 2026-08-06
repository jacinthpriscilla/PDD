import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Activity, Sun, Moon, LogOut, User, ShieldCheck, Stethoscope, ChevronDown } from 'lucide-react';
import { UserRole } from '../../../../shared/src';

export const Navbar: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roles: { role: UserRole; label: string; icon: any }[] = [
    { role: 'patient', label: 'Patient View', icon: User },
    { role: 'doctor', label: 'Doctor Portal', icon: Stethoscope },
    { role: 'admin', label: 'Admin Console', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="PerioRiskScore Logo"
            className="h-9 sm:h-10 w-auto object-contain max-w-[160px] group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-lg font-extrabold bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent font-sans tracking-tight">
              PerioRisk<span className="text-white">Score</span>
            </span>
            <span className="text-[10px] text-teal-400/80 tracking-widest font-semibold uppercase -mt-1">
              AI Risk Engine
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'text-teal-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/about' ? 'text-teal-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            About System
          </Link>
          <Link
            to="/services"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/services' ? 'text-teal-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Clinical Services
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/contact' ? 'text-teal-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Section Actions */}
        <div className="flex items-center gap-3">
          
          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800/90 text-teal-300 border border-teal-500/30 hover:bg-slate-800 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span className="capitalize">{user?.role || 'Guest'} Role</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Switch Active Role
                </div>
                {roles.map(r => {
                  const IconComponent = r.icon;
                  return (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setShowRoleDropdown(false);
                        if (r.role === 'patient') navigate('/patient/dashboard');
                        else if (r.role === 'doctor') navigate('/doctor/dashboard');
                        else navigate('/admin/dashboard');
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium hover:bg-slate-800 transition-colors ${
                        user?.role === r.role ? 'text-teal-400 bg-slate-800/50' : 'text-slate-300'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {r.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile / Dashboard Link */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (user.role === 'patient') navigate('/patient/dashboard');
                  else if (user.role === 'doctor') navigate('/doctor/dashboard');
                  else navigate('/admin/dashboard');
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold text-xs shadow-md shadow-teal-900/30 hover:brightness-110 transition-all flex items-center gap-2"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold hover:bg-teal-500 transition-colors shadow-md shadow-teal-900/40"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
