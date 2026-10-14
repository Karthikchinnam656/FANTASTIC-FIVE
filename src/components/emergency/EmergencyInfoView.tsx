'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import {
  ShieldAlert,
  Phone,
  AlertTriangle,
  Copy,
  Printer,
  CheckCircle2,
  Heart,
  Activity,
  Flame,
  PhoneCall,
  User,
  ShieldCheck
} from 'lucide-react';

export const EmergencyInfoView: React.FC = () => {
  const { userProfile } = useHealth();
  const [copied, setCopied] = useState(false);

  const emergencyText = `EMERGENCY MEDICAL CARD - CAREVISTA AI
Full Name: ${userProfile.fullName}
DOB: ${userProfile.dateOfBirth} | Blood Group: ${userProfile.bloodGroup}
Severe Allergies: ${userProfile.allergies.join(', ')}
Chronic Conditions: ${userProfile.chronicConditions.join(', ')}
Emergency Contact: ${userProfile.emergencyContact.name} (${userProfile.emergencyContact.relationship}) - ${userProfile.emergencyContact.phone}`;

  const handleCopyCard = () => {
    navigator.clipboard.writeText(emergencyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Emergency Medical Card & SOS Information</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Immediate access to critical medical information, allergies, emergency contacts, and international crisis hotlines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCard}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy SOS Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Medical Card</span>
          </button>
        </div>
      </div>

      {/* Emergency Hotlines Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-4 text-center space-y-1">
          <span className="text-[10px] font-bold text-rose-600 uppercase">USA & Canada Emergency</span>
          <p className="text-2xl font-black text-rose-900 dark:text-rose-200">911</p>
          <span className="text-[10px] text-rose-500 block">Ambulance / Fire / Police</span>
        </div>

        <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-4 text-center space-y-1">
          <span className="text-[10px] font-bold text-rose-600 uppercase">European Union & Global</span>
          <p className="text-2xl font-black text-rose-900 dark:text-rose-200">112</p>
          <span className="text-[10px] text-rose-500 block">Universal Emergency SOS</span>
        </div>

        <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-4 text-center space-y-1">
          <span className="text-[10px] font-bold text-rose-600 uppercase">India Emergency</span>
          <p className="text-2xl font-black text-rose-900 dark:text-rose-200">108 / 112</p>
          <span className="text-[10px] text-rose-500 block">National Emergency Helpline</span>
        </div>

        <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-4 text-center space-y-1">
          <span className="text-[10px] font-bold text-rose-600 uppercase">Poison Control Center</span>
          <p className="text-sm font-black text-rose-900 dark:text-rose-200 mt-2">1-800-222-1222</p>
          <span className="text-[10px] text-rose-500 block">24/7 Toxic Ingestion SOS</span>
        </div>
      </div>

      {/* Prominent Printable Emergency Card */}
      <div className="bg-gradient-to-br from-white via-rose-50/20 to-teal-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-rose-500/40 shadow-lg space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-rose-200/60 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Emergency Medical Identification
              </h3>
              <p className="text-[11px] text-slate-400">
                CareVista AI Secure Personal Health Pass
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-black px-3 py-1 bg-rose-600 text-white rounded-full uppercase tracking-wider">
              BLOOD GROUP: {userProfile.bloodGroup}
            </span>
          </div>
        </div>

        {/* Identification Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Full Name</span>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{userProfile.fullName}</p>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Date of Birth / Sex</span>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{userProfile.dateOfBirth} ({userProfile.biologicalSex})</p>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Height / Weight</span>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{userProfile.heightCm} cm / {userProfile.weightKg} kg</p>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Language</span>
            <p className="text-sm font-extrabold uppercase text-slate-900 dark:text-white mt-0.5">{userProfile.preferredLanguage}</p>
          </div>
        </div>

        {/* Critical Allergies & Chronic Conditions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-2">
            <span className="text-xs font-bold text-rose-900 dark:text-rose-200 uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Known Severe Allergies
            </span>
            <div className="flex flex-wrap gap-2">
              {userProfile.allergies.map((allergy, i) => (
                <span key={i} className="px-3 py-1 bg-white dark:bg-rose-900/60 rounded-xl text-xs font-bold text-rose-700 dark:text-rose-200 border border-rose-200 dark:border-rose-800">
                  ⚠️ {allergy}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-sky-50 dark:bg-sky-950/40 p-4 rounded-2xl border border-sky-200 dark:border-sky-900/60 space-y-2">
            <span className="text-xs font-bold text-sky-900 dark:text-sky-200 uppercase flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-sky-600" />
              Diagnosed Chronic Conditions
            </span>
            <div className="flex flex-wrap gap-2">
              {userProfile.chronicConditions.map((cond, i) => (
                <span key={i} className="px-3 py-1 bg-white dark:bg-sky-900/60 rounded-xl text-xs font-bold text-sky-800 dark:text-sky-200 border border-sky-200 dark:border-sky-800">
                  • {cond}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">
              Primary Emergency Contact
            </span>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
              {userProfile.emergencyContact.name} ({userProfile.emergencyContact.relationship})
            </h4>
          </div>

          <a
            href={`tel:${userProfile.emergencyContact.phone}`}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-2 self-start sm:self-auto"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {userProfile.emergencyContact.phone}</span>
          </a>
        </div>
      </div>

      {/* Red Flag Emergency Symptoms Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Red Flag Symptoms Requiring Immediate 911 / 112 Dispatch
          </h3>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
          <li className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/40">
            • <strong>Crushing chest pressure</strong> radiating to jaw, neck, shoulder, or left arm with shortness of breath.
          </li>
          <li className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/40">
            • <strong>Sudden FAST signs of stroke:</strong> Face drooping, Arm weakness, or Speech slurring/confusion.
          </li>
          <li className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/40">
            • <strong>Severe respiratory distress</strong> with inability to speak words or blue discoloration of lips.
          </li>
          <li className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/40">
            • <strong>Thunderclap headache:</strong> Explosive maximal headache reaching agonizing peak in under 60 seconds.
          </li>
        </ul>
      </div>
    </div>
  );
};
