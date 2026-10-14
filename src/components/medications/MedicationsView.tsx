'use client';

import React, { useState, useEffect } from 'react';
import { useHealth } from '@/context/HealthContext';
import { Medication, DoseStatus } from '@/types/health';
import { PillsIllustration } from '@/components/illustrations/MedicalIllustrations';
import {
  Pill,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  AlertCircle,
  Trash2,
  Edit2,
  ShieldCheck,
  FileText,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const MedicationsView: React.FC = () => {
  const { medications, addMedication, deleteMedication, logMedicationDose } = useHealth();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'today' | 'all'>('today');

  // Form states
  const [formName, setFormName] = useState('');
  const [formDosage, setFormDosage] = useState('');
  const [formInstructions, setFormInstructions] = useState('');
  const [formFrequency, setFormFrequency] = useState('Once daily');
  const [formTiming, setFormTiming] = useState<('morning' | 'afternoon' | 'evening' | 'bedtime')[]>(['morning']);
  const [formStartDate, setFormStartDate] = useState('2026-10-14');
  const [formPrescribedBy, setFormPrescribedBy] = useState('');
  const [formCondition, setFormCondition] = useState('');
  const [today, setToday] = useState('2026-10-14');

  useEffect(() => {
    const now = new Date().toISOString().split('T')[0];
    setFormStartDate(now);
    setToday(now);
  }, []);

  const toggleTimingSlot = (slot: 'morning' | 'afternoon' | 'evening' | 'bedtime') => {
    setFormTiming(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleSaveMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    addMedication({
      name: formName,
      dosage: formDosage || '1 tablet',
      instructions: formInstructions || 'Take as instructed by physician',
      frequency: formFrequency,
      timing: formTiming.length > 0 ? formTiming : ['morning'],
      startDate: formStartDate,
      prescribedBy: formPrescribedBy || 'Primary Care Physician',
      condition: formCondition
    });

    setShowAddModal(false);
    setFormName('');
    setFormDosage('');
    setFormInstructions('');
    setFormPrescribedBy('');
    setFormCondition('');
  };

  // Calculate adherence rate
  const totalLogs = medications.reduce((acc, m) => acc + m.logs.length, 0);
  const takenLogs = medications.reduce((acc, m) => acc + m.logs.filter(l => l.status === 'taken').length, 0);
  const adherenceRate = totalLogs > 0 ? Math.round((takenLogs / totalLogs) * 100) : 100;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-600" />
            <span>My Prescriptions & Medication Tracker</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track daily dosing schedules, log adherence (taken / skipped / missed), and monitor refill alerts.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Medication</span>
        </button>
      </div>

      {/* Adherence & Safety Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-800/80 dark:to-slate-800/40 rounded-3xl p-5 border border-blue-100 dark:border-slate-700 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-xs">
              <PillsIllustration className="w-12 h-12" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase">
                  Medication Adherence Score
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                  High Consistency
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                You have recorded <strong>{adherenceRate}% adherence</strong> over the last 30 days across all active regimens.
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
              {adherenceRate}%
            </span>
            <span className="text-[10px] text-slate-400 block font-semibold">Active Rate</span>
          </div>
        </div>

        {/* Clinical Guardrail Alert */}
        <div className="md:col-span-4 bg-amber-50 dark:bg-amber-950/30 rounded-3xl p-5 border border-amber-200/50 dark:border-amber-900/40 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong>Clinical Safety Rule:</strong> CareVista AI does NOT adjust dosages or discontinue prescribed medicines. Always consult your prescribing doctor before changing any regimen.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('today')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'today'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Today's Dosing Schedule
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All Prescriptions ({medications.length})
        </button>
      </div>

      {/* Content based on tab */}
      {activeTab === 'today' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {medications.map((med) => {
              const todayLog = med.logs.find(l => l.date === today);
              const isTaken = todayLog?.status === 'taken';
              const isSkipped = todayLog?.status === 'skipped';

              return (
                <div
                  key={med.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          {med.timing.join(' & ')}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {med.name}
                        </h4>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {med.dosage} • {med.frequency}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold capitalize ${
                          isTaken
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : isSkipped
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {todayLog?.status || 'Pending'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60 leading-relaxed">
                      {med.instructions}
                    </p>

                    <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                      <span>Condition: {med.condition || 'General'}</span>
                      <span>By: {med.prescribedBy || 'Physician'}</span>
                    </div>
                  </div>

                  {/* Dose action buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => logMedicationDose(med.id, med.timing[0] || 'morning', 'taken')}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isTaken
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-100'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isTaken ? 'Dose Taken ✓' : 'Mark Taken'}</span>
                    </button>

                    <button
                      onClick={() => logMedicationDose(med.id, med.timing[0] || 'morning', 'skipped')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        isSkipped
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                      title="Mark as skipped"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Skip</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* All Prescriptions Table */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold text-slate-400 uppercase">
                <tr>
                  <th className="py-3 px-4">Medication</th>
                  <th className="py-3 px-4">Dosage</th>
                  <th className="py-3 px-4">Frequency</th>
                  <th className="py-3 px-4">Condition</th>
                  <th className="py-3 px-4">Prescribed By</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {medications.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{m.name}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{m.dosage}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{m.frequency}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{m.condition || 'General'}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{m.prescribedBy || 'Doctor'}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Remove ${m.name} from active prescriptions?`)) {
                            deleteMedication(m.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Add Prescribed Medication
            </h3>

            <form onSubmit={handleSaveMedication} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Medicine Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Atorvastatin, Metformin"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10mg, 500mg, 2 puffs"
                    value={formDosage}
                    onChange={(e) => setFormDosage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Timing Slot (Select applicable)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['morning', 'afternoon', 'evening', 'bedtime'] as const).map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => toggleTimingSlot(slot)}
                      className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                        formTiming.includes(slot)
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Doctor's Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Take 1 tablet by mouth every night at bedtime with water."
                  value={formInstructions}
                  onChange={(e) => setFormInstructions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Treated Condition
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cholesterol, Blood Pressure"
                    value={formCondition}
                    onChange={(e) => setFormCondition(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Prescribing Doctor
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Vance, MD"
                    value={formPrescribedBy}
                    onChange={(e) => setFormPrescribedBy(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Save Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
