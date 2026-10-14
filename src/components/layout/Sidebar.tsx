'use client';

import React from 'react';
import { useHealth, NavSection } from '@/context/HealthContext';
import {
  LayoutDashboard,
  Bot,
  AlertCircle,
  Stethoscope,
  Activity,
  FileText,
  Microscope,
  Pill,
  History,
  TrendingUp,
  BookOpen,
  CalendarCheck,
  Target,
  GraduationCap,
  ShieldAlert,
  Settings,
  Smartphone,
  Layers,
  Heart,
  ChevronRight,
  X,
  Image as ImageIcon,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeSection, setActiveSection, healthProblems, medicalReports, medications, appointments } = useHealth();

  const navItems: { id: NavSection; label: string; icon: React.ReactNode; badge?: number; color: string }[] = [
    { id: 'landing', label: '🌐 Showcase Landing (Photos)', icon: <Sparkles className="w-4 h-4" />, color: 'teal' },
    { id: 'dashboard', label: 'Health Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, color: 'teal' },
    { id: 'visual-atlas', label: '🖼️ 3D Visual Health Atlas', icon: <ImageIcon className="w-4 h-4" />, color: 'purple' },
    { id: 'mobile-app', label: '📱 Mobile App Simulator', icon: <Smartphone className="w-4 h-4" />, color: 'emerald' },
    { id: 'mobile-architecture', label: '⚙️ Mobile Architecture & Code', icon: <Layers className="w-4 h-4" />, color: 'teal' },
    { id: 'ai-assistant', label: 'AI Health Assistant', icon: <Bot className="w-4 h-4" />, color: 'sky' },
    { id: 'problems', label: 'My Health Problems', icon: <AlertCircle className="w-4 h-4" />, badge: healthProblems.filter(p => p.status === 'active').length, color: 'rose' },
    { id: 'symptom-checker', label: 'Symptom Checker', icon: <Stethoscope className="w-4 h-4" />, color: 'emerald' },
    { id: 'body-map', label: 'Interactive Body Map', icon: <Activity className="w-4 h-4" />, color: 'cyan' },
    { id: 'reports', label: 'Medical Reports', icon: <FileText className="w-4 h-4" />, badge: medicalReports.length, color: 'indigo' },
    { id: 'report-analyzer', label: 'AI Report Analyzer', icon: <Microscope className="w-4 h-4" />, color: 'purple' },
    { id: 'medications', label: 'My Medications', icon: <Pill className="w-4 h-4" />, badge: medications.filter(m => m.active).length, color: 'blue' },
    { id: 'history', label: 'Health History', icon: <History className="w-4 h-4" />, color: 'slate' },
    { id: 'analytics', label: 'Trends & Analytics', icon: <TrendingUp className="w-4 h-4" />, color: 'teal' },
    { id: 'journal', label: 'Daily Health Journal', icon: <BookOpen className="w-4 h-4" />, color: 'emerald' },
    { id: 'appointments', label: 'Appointments & Reminders', icon: <CalendarCheck className="w-4 h-4" />, badge: appointments.filter(a => a.status === 'upcoming').length, color: 'amber' },
    { id: 'wellness', label: 'Personal Wellness Planner', icon: <Target className="w-4 h-4" />, color: 'teal' },
    { id: 'education', label: 'Health Education', icon: <GraduationCap className="w-4 h-4" />, color: 'sky' },
    { id: 'emergency', label: 'Emergency SOS Card', icon: <ShieldAlert className="w-4 h-4" />, color: 'rose' },
    { id: 'ambulance', label: '🚑 Ambulance Service (24/7)', icon: <ShieldAlert className="w-4 h-4 text-rose-500" />, color: 'rose' },
    { id: 'specialties', label: '🩺 Body Care & Specialties', icon: <Stethoscope className="w-4 h-4 text-teal-500" />, color: 'teal' },
    { id: 'insurance', label: '🛡️ Health Insurance (New)', icon: <ShieldCheck className="w-4 h-4 text-amber-500" />, color: 'amber' },
    { id: 'profile', label: 'Profile & Privacy Settings', icon: <Settings className="w-4 h-4" />, color: 'slate' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 via-emerald-500 to-teal-400 p-0.5 shadow-md shadow-teal-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Heart className="w-5 h-5 text-teal-600 fill-teal-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 dark:from-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
                  CareVista
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-md border border-teal-200/60 dark:border-teal-800">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Your Health. Your Journey.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation items scroll area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Platform Modules
          </div>

          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md shadow-teal-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`transition-colors ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-teal-500 dark:group-hover:text-teal-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : 'bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Emergency Quick Action Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div
            onClick={() => {
              setActiveSection('emergency');
              onClose();
            }}
            className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/60 rounded-2xl cursor-pointer hover:bg-rose-100/70 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-sm">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-rose-900 dark:text-rose-200">
                  Emergency SOS
                </p>
                <p className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">
                  Hotlines & Medical ID
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-200/60 dark:bg-rose-900/60 px-2 py-1 rounded-lg">
              911 / 112
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
