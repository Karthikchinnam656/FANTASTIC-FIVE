'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import {
  Settings,
  User,
  ShieldCheck,
  Download,
  RotateCcw,
  Key,
  Globe,
  Bell,
  CheckCircle2,
  Lock,
  FileCheck
} from 'lucide-react';

export const ProfileSettingsView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    resetToDemoData,
    exportDataAsJSON,
    language,
    setLanguage
  } = useHealth();

  const [fullName, setFullName] = useState(userProfile.fullName);
  const [dob, setDob] = useState(userProfile.dateOfBirth);
  const [sex, setSex] = useState(userProfile.biologicalSex);
  const [bloodGroup, setBloodGroup] = useState(userProfile.bloodGroup);
  const [height, setHeight] = useState(userProfile.heightCm);
  const [weight, setWeight] = useState(userProfile.weightKg);
  const [allergiesText, setAllergiesText] = useState(userProfile.allergies.join(', '));
  const [conditionsText, setConditionsText] = useState(userProfile.chronicConditions.join(', '));
  const [contactName, setContactName] = useState(userProfile.emergencyContact.name);
  const [contactPhone, setContactPhone] = useState(userProfile.emergencyContact.phone);
  const [contactRel, setContactRel] = useState(userProfile.emergencyContact.relationship);
  const [aiConsent, setAiConsent] = useState(userProfile.aiConsentGranted);
  const [geminiApiKey, setGeminiApiKey] = useState(userProfile.geminiApiKey || '');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      fullName,
      dateOfBirth: dob,
      biologicalSex: sex as any,
      bloodGroup,
      heightCm: Number(height),
      weightKg: Number(weight),
      allergies: allergiesText.split(',').map(s => s.trim()).filter(Boolean),
      chronicConditions: conditionsText.split(',').map(s => s.trim()).filter(Boolean),
      emergencyContact: {
        name: contactName,
        phone: contactPhone,
        relationship: contactRel
      },
      aiConsentGranted: aiConsent,
      geminiApiKey: geminiApiKey.trim() || undefined
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            <span>Profile & Privacy Security Settings</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your personal clinical profile, emergency contacts, language, data privacy consent, and data export.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportDataAsJSON}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON Data</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Reset all records to initial realistic demo dataset?')) {
                resetToDemoData();
              }
            }}
            className="px-3.5 py-2 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-700 dark:text-rose-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile and privacy preferences updated successfully!</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Clinical Identity & Physiological Metrics
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Biological Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
              <input
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Allergies (comma-separated)
              </label>
              <input
                type="text"
                value={allergiesText}
                onChange={(e) => setAllergiesText(e.target.value)}
                placeholder="Penicillin, Peanuts"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Chronic Medical Conditions (comma-separated)
              </label>
              <input
                type="text"
                value={conditionsText}
                onChange={(e) => setConditionsText(e.target.value)}
                placeholder="Mild Asthma, Hyperlipidemia"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Primary Emergency Contact Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Relationship</label>
              <input
                type="text"
                value={contactRel}
                onChange={(e) => setContactRel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Privacy, AI Consent & Custom Gemini Key */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Lock className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Data Privacy & AI Processing Consent
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={aiConsent}
                onChange={(e) => setAiConsent(e.target.checked)}
                className="mt-1 rounded text-teal-600 focus:ring-teal-500"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Authorize Contextual AI Processing for Medical Reports & Symptoms
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed block mt-0.5">
                  Allows CareVista AI to cross-reference your uploaded lab biomarkers, active concerns, and medications to provide personalized plain-English summaries and doctor questions. Your data is never sold or used for public model training.
                </span>
              </div>
            </label>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-slate-400" />
                <span>Custom Google Gemini API Key (Optional)</span>
              </label>
              <input
                type="password"
                placeholder="AIzaSy... (Leave blank to use the built-in offline clinical engine)"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                CareVista AI includes a robust built-in clinical intelligence engine that operates 100% locally with zero API keys required.
              </span>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            Save Profile & Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
