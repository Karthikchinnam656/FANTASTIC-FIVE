'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import { Appointment } from '@/types/health';
import {
  CalendarCheck,
  Calendar,
  Clock,
  MapPin,
  Plus,
  CheckCircle2,
  Trash2,
  HelpCircle,
  FileText,
  User,
  Sparkles,
  CheckSquare,
  Square
} from 'lucide-react';

export const AppointmentsView: React.FC = () => {
  const { appointments, addAppointment, toggleAppointmentQuestion, deleteAppointment } = useHealth();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newQuestionText, setNewQuestionText] = useState<{ [aptId: string]: string }>({});

  // Form states
  const [formDoctor, setFormDoctor] = useState('');
  const [formSpecialist, setFormSpecialist] = useState('');
  const [formClinic, setFormClinic] = useState('');
  const [formLocationType, setFormLocationType] = useState<'in-person' | 'telehealth'>('in-person');
  const [formDate, setFormDate] = useState('2026-10-14');
  const [formTime, setFormTime] = useState('10:00 AM');
  const [formPurpose, setFormPurpose] = useState('');
  const [formQuestions, setFormQuestions] = useState('');

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDoctor.trim()) return;

    const questionsList = formQuestions
      .split('\n')
      .map(q => q.trim())
      .filter(Boolean)
      .map((q, idx) => ({ id: `q-${Date.now()}-${idx}`, text: q, answered: false }));

    addAppointment({
      doctorName: formDoctor,
      specialist: formSpecialist || 'General Medicine',
      clinic: formClinic || 'Medical Health Center',
      locationType: formLocationType,
      date: formDate,
      time: formTime,
      purpose: formPurpose || 'Follow-up consultation',
      questionsChecklist: questionsList.length > 0 ? questionsList : [
        { id: `q-${Date.now()}`, text: 'Discuss recent lab results and symptoms', answered: false }
      ]
    });

    setShowAddModal(false);
    setFormDoctor('');
    setFormSpecialist('');
    setFormClinic('');
    setFormPurpose('');
    setFormQuestions('');
  };

  const handleAddQuestionToAppointment = (aptId: string) => {
    const text = newQuestionText[aptId];
    if (!text || !text.trim()) return;

    const apt = appointments.find(a => a.id === aptId);
    if (!apt) return;

    apt.questionsChecklist.push({
      id: `q-${Date.now()}`,
      text: text.trim(),
      answered: false
    });

    setNewQuestionText(prev => ({ ...prev, [aptId]: '' }));
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-amber-600" />
            <span>Doctor Appointments & Preparation Checklists</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Organize upcoming clinical consultations, prepare question checklists with AI, and record physician instructions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Visit</span>
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 space-y-5"
          >
            {/* Top Info Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                    {apt.specialist}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 capitalize">
                    {apt.locationType}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {apt.doctorName}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{apt.clinic}</span>
                </p>
              </div>

              {/* Date & Time Badge */}
              <div className="flex items-center gap-3">
                <div className="text-right p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white justify-end">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    <span>{apt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 justify-end mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{apt.time}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (confirm(`Remove appointment with ${apt.doctorName}?`)) {
                      deleteAppointment(apt.id);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Purpose & Notes */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                Visit Purpose:
              </span>
              <span>{apt.purpose}</span>
            </div>

            {/* Doctor Questions Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-teal-600" />
                  <span>Questions to Ask Your Doctor Checklist ({apt.questionsChecklist.length})</span>
                </h4>
                <span className="text-[10px] text-slate-400">
                  Check off items as discussed during your visit
                </span>
              </div>

              <div className="space-y-2">
                {apt.questionsChecklist.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => toggleAppointmentQuestion(apt.id, q.id)}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      q.answered
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                        : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {q.answered ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span className={`text-xs ${q.answered ? 'line-through text-slate-400' : 'font-medium'}`}>
                        {q.text}
                      </span>
                    </div>

                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {q.answered ? 'Discussed' : 'To Ask'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Add question input */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Add another question for this doctor..."
                  value={newQuestionText[apt.id] || ''}
                  onChange={(e) => setNewQuestionText(prev => ({ ...prev, [apt.id]: e.target.value }))}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => handleAddQuestionToAppointment(apt.id)}
                  className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Schedule Doctor Appointment
            </h3>

            <form onSubmit={handleCreateAppointment} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Marcus Brody"
                    value={formDoctor}
                    onChange={(e) => setFormDoctor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Specialty</label>
                  <input
                    type="text"
                    placeholder="e.g. Pulmonologist, Cardiologist"
                    value={formSpecialist}
                    onChange={(e) => setFormSpecialist(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Clinic / Hospital</label>
                  <input
                    type="text"
                    placeholder="e.g. City Chest Pavilion"
                    value={formClinic}
                    onChange={(e) => setFormClinic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Format</label>
                  <select
                    value={formLocationType}
                    onChange={(e) => setFormLocationType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="in-person">In-Person Clinic</option>
                    <option value="telehealth">Virtual Telehealth</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 10:30 AM"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Consultation Purpose</label>
                <input
                  type="text"
                  placeholder="e.g. Asthma action plan review"
                  value={formPurpose}
                  onChange={(e) => setFormPurpose(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Questions to Prepare (one per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="What should my target peak flow be?&#10;Should we adjust my inhaler?"
                  value={formQuestions}
                  onChange={(e) => setFormQuestions(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
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
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
