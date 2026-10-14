'use client';

import React, { useState } from 'react';
import { useHealth, NavSection } from '@/context/HealthContext';
import {
  Menu,
  Moon,
  Sun,
  Globe,
  Plus,
  Volume2,
  VolumeX,
  FileUp,
  MessageSquare,
  ShieldAlert,
  Search,
  Sparkles,
  Smartphone
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const {
    activeSection,
    setActiveSection,
    darkMode,
    toggleDarkMode,
    language,
    setLanguage,
    userProfile,
    isSpeaking,
    stopSpeaking
  } = useHealth();

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  ];

  const sectionTitles: Record<NavSection, string> = {
    'landing': '🌐 MediMind Showcase Landing',
    'dashboard': 'Smart Health Dashboard',
    'ai-assistant': 'AI Health Copilot & Assistant',
    'problems': 'My Health Problems',
    'symptom-checker': 'Clinical Symptom Checker',
    'body-map': 'Interactive Anatomical Body Map',
    'reports': 'Medical Report Upload Center',
    'report-analyzer': 'AI Medical Report Analyzer',
    'medications': 'My Medications & Dosing Schedule',
    'history': 'Personal Health History',
    'analytics': 'Health Trends & Analytics',
    'journal': 'Daily Health Journal',
    'appointments': 'Appointments & Reminders',
    'wellness': 'Personal Wellness Planner',
    'education': 'Health Education Library',
    'emergency': 'Emergency Medical Information (SOS)',
    'profile': 'Profile & Privacy Settings',
    'mobile-app': '📱 Mobile App Simulator (Android & iOS)',
    'mobile-architecture': '⚙️ Mobile Architecture & Code (Flutter / React Native)',
    'visual-atlas': '🖼️ Picture-Oriented Health Atlas & 3D Diagnostics',
    'ambulance': '🚑 24/7 Rapid Ambulance Services',
    'specialties': '🩺 Browse by Specialties & Body Care Problems',
    'insurance': '🛡️ Smart Health Insurance & Plans (IRDAI Licensed)'
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & Current Section Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{sectionTitles[activeSection] || 'CareVista AI'}</span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Continuous Personal Health Monitoring & AI Intelligence
            </p>
          </div>
        </div>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Audio Speech Playing Indicator */}
          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 dark:bg-teal-950/80 border border-teal-200 text-teal-700 dark:text-teal-300 rounded-full text-xs font-semibold animate-pulse"
              title="Stop Voice Readout"
            >
              <Volume2 className="w-3.5 h-3.5 text-teal-600 animate-bounce" />
              <span className="hidden sm:inline">Speaking AI...</span>
              <VolumeX className="w-3 h-3 text-slate-400 hover:text-rose-500 ml-1" />
            </button>
          )}

          {/* Quick Action Buttons */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveSection('problems')}
              className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 dark:hover:bg-teal-900/50 text-teal-700 dark:text-teal-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-teal-200/50 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Problem</span>
            </button>

            <button
              onClick={() => setActiveSection('reports')}
              className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 border border-sky-200/50 transition-all cursor-pointer"
            >
              <FileUp className="w-3.5 h-3.5" />
              <span>Upload Report</span>
            </button>

            <button
              onClick={() => setActiveSection('mobile-app')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 border transition-all cursor-pointer ${
                activeSection === 'mobile-app'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200/50'
              }`}
              title="Open Mobile App Simulator"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 Mobile App</span>
            </button>

            <button
              onClick={() => setActiveSection('landing')}
              className="px-3 py-1.5 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title="Return to Showcase Landing with Photos"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>🌐 Showcase Landing</span>
            </button>

            <button
              onClick={() => setActiveSection('ai-assistant')}
              className="px-3 py-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Copilot</span>
            </button>
          </div>

          {/* Multilingual Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 text-xs font-semibold transition-all"
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="uppercase text-[11px] font-bold tracking-wider">{language}</span>
            </button>

            {showLanguageDropdown && (
              <div className="absolute right-0 top-11 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-1.5 min-w-[140px] z-50">
                <div className="text-[10px] uppercase font-bold text-slate-400 px-2.5 py-1">
                  Language / భాష / भाषा
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code as any);
                      setShowLanguageDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                      language === l.code
                        ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{l.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* User Profile Avatar Pill */}
          <button
            onClick={() => setActiveSection('profile')}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 hover:border-teal-400 transition-all cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-white font-bold text-xs flex items-center justify-center">
              {userProfile.fullName.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                {userProfile.fullName}
              </p>
              <p className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold leading-tight">
                {userProfile.bloodGroup} Blood Group
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
