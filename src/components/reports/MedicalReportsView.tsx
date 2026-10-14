'use client';

import React, { useState, useRef } from 'react';
import { useHealth } from '@/context/HealthContext';
import { MedicalReport, ResultFlag } from '@/types/health';
import { CareVistaAIEngine } from '@/lib/aiEngine';
import {
  FileText,
  Upload,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Edit2,
  Microscope,
  FileDown,
  Camera,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

export const MedicalReportsView: React.FC = () => {
  const {
    medicalReports,
    addMedicalReport,
    updateMedicalReport,
    deleteMedicalReport,
    setActiveReportForAnalyzer,
    setActiveSection
  } = useHealth();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedReportForPreview, setSelectedReportForPreview] = useState<MedicalReport | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manual Add / Edit Modal state
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editingReport, setEditingReport] = useState<MedicalReport | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState<MedicalReport['reportType']>('Blood Test');
  const [formHospital, setFormHospital] = useState('');
  const [formDoctor, setFormDoctor] = useState('');
  const [formDate, setFormDate] = useState('2026-10-14');
  const [formNotes, setFormNotes] = useState('');
  const [formSummary, setFormSummary] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);

    try {
      const parsed = await CareVistaAIEngine.parseReportFile(file);
      addMedicalReport(parsed);
      setUploadSuccessMessage(`Successfully uploaded and extracted parameters from ${file.name}`);
      setTimeout(() => setUploadSuccessMessage(''), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleOpenEdit = (rep: MedicalReport) => {
    setEditingReport(rep);
    setFormName(rep.reportName);
    setFormType(rep.reportType);
    setFormHospital(rep.hospital);
    setFormDoctor(rep.doctorName || '');
    setFormDate(rep.testDate);
    setFormNotes(rep.userNotes || '');
    setFormSummary(rep.aiSummary);
    setShowEditModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingReport) {
      updateMedicalReport(editingReport.id, {
        reportName: formName,
        reportType: formType,
        hospital: formHospital,
        doctorName: formDoctor,
        testDate: formDate,
        userNotes: formNotes,
        aiSummary: formSummary,
        isVerified: true
      });
    } else {
      const newReport: MedicalReport = {
        id: `rep-${Date.now()}`,
        reportName: formName,
        reportType: formType,
        testDate: formDate,
        uploadDate: new Date().toISOString().split('T')[0],
        hospital: formHospital || 'Private Medical Laboratory',
        doctorName: formDoctor,
        attachmentName: `${formName.replace(/\s+/g, '_')}.pdf`,
        userNotes: formNotes,
        aiSummary: formSummary || 'Manual entry by patient. Parameters recorded.',
        isVerified: true,
        measurements: [
          {
            id: `m-${Date.now()}-1`,
            parameter: 'Fasting Glucose',
            resultValue: 92,
            unit: 'mg/dL',
            referenceRange: '70 - 99',
            resultFlag: 'normal',
            explanation: 'Normal glucose levels.'
          }
        ]
      };
      addMedicalReport(newReport);
    }
    setShowEditModal(false);
  };

  const filteredReports = medicalReports.filter(rep => {
    const matchesSearch =
      rep.reportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.measurements.some(m => m.parameter.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'all' || rep.reportType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header and Quick Upload Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            <span>Advanced Medical Report Upload Center</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Securely upload, digitize, and organize lab tests, blood panels, and imaging reports with OCR parsing.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Running OCR Extraction...</span>
              </span>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Upload Report (PDF / Image)</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setEditingReport(null);
              setFormName('');
              setFormType('Blood Test');
              setFormHospital('');
              setFormDoctor('');
              setFormDate(new Date().toISOString().split('T')[0]);
              setFormNotes('');
              setFormSummary('');
              setShowEditModal(true);
            }}
            className="px-3.5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Manual Entry</span>
          </button>
        </div>
      </div>

      {/* Upload Notification Alert */}
      {uploadSuccessMessage && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{uploadSuccessMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by report name, lab, or biomarker (e.g. cholesterol, hemoglobin)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'Lipid Panel', 'Blood Test', 'Metabolic Panel', 'Other'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === t
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {t === 'all' ? 'All Types' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table / Grid View */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Report Details</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Test Date</th>
                <th className="py-3.5 px-4">Laboratory / Hospital</th>
                <th className="py-3.5 px-4">Extracted Biomarkers</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredReports.map((report) => {
                const abnormalCount = report.measurements.filter(m => m.resultFlag !== 'normal').length;

                return (
                  <tr
                    key={report.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Report Name & ID */}
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block hover:text-teal-600 cursor-pointer"
                          onClick={() => {
                            setActiveReportForAnalyzer(report);
                            setActiveSection('report-analyzer');
                          }}
                        >
                          {report.reportName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ID: {report.id}
                        </span>
                      </div>
                    </td>

                    {/* Report Type */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/50 dark:border-teal-900">
                        {report.reportType}
                      </span>
                    </td>

                    {/* Test Date */}
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-300">
                      {report.testDate}
                    </td>

                    {/* Hospital & Doctor */}
                    <td className="py-4 px-4">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{report.hospital}</p>
                      <p className="text-[10px] text-slate-400">{report.doctorName || 'Laboratory Diagnostics'}</p>
                    </td>

                    {/* Extracted Biomarkers Flags */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          {report.measurements.length} markers
                        </span>
                        {abnormalCount > 0 ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-900">
                            {abnormalCount} flagged
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">
                            All normal
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Verification Status */}
                    <td className="py-4 px-4">
                      {report.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Pending Review</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setActiveReportForAnalyzer(report);
                            setActiveSection('report-analyzer');
                          }}
                          className="px-2.5 py-1.5 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-700 dark:text-teal-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                          title="View In-Depth AI Analysis"
                        >
                          <Microscope className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Analyze</span>
                        </button>

                        <button
                          onClick={() => setSelectedReportForPreview(report)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Quick Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(report)}
                          className="p-1.5 text-slate-400 hover:text-teal-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Edit Metadata"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete report "${report.reportName}"?`)) {
                              deleteMedicalReport(report.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Delete Report"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Preview Modal */}
      {selectedReportForPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedReportForPreview.reportName}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedReportForPreview.hospital} • {selectedReportForPreview.testDate}
                </p>
              </div>
              <button
                onClick={() => setSelectedReportForPreview(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Summary Banner */}
            <div className="bg-teal-50 dark:bg-teal-950/40 p-4 rounded-2xl border border-teal-200/60 dark:border-teal-800 space-y-1">
              <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Plain-Language Summary
              </span>
              <p className="text-xs text-teal-900 dark:text-teal-200 leading-relaxed">
                {selectedReportForPreview.aiSummary}
              </p>
            </div>

            {/* Biomarkers Table */}
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                Extracted Biomarkers & Reference Ranges:
              </span>
              <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-400 uppercase">
                    <tr>
                      <th className="p-2.5 text-left">Test Parameter</th>
                      <th className="p-2.5 text-left">Result Value</th>
                      <th className="p-2.5 text-left">Reference Range</th>
                      <th className="p-2.5 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {selectedReportForPreview.measurements.map((m) => (
                      <tr key={m.id}>
                        <td className="p-2.5 font-semibold text-slate-800 dark:text-slate-200">{m.parameter}</td>
                        <td className="p-2.5 font-bold">{m.resultValue} {m.unit}</td>
                        <td className="p-2.5 text-slate-500">{m.referenceRange}</td>
                        <td className="p-2.5">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            m.resultFlag === 'above' ? 'bg-rose-100 text-rose-700' :
                            m.resultFlag === 'below' ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'
                          }`}>
                            {m.resultFlag}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setActiveReportForAnalyzer(selectedReportForPreview);
                  setSelectedReportForPreview(null);
                  setActiveSection('report-analyzer');
                }}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Open Full AI Analyzer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add / Edit Report Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              {editingReport ? 'Edit Medical Report Metadata' : 'Add Medical Report Record'}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Report Title *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Annual Comprehensive Metabolic Panel"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Report Type
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="Blood Test">Blood Test</option>
                    <option value="Lipid Panel">Lipid Panel</option>
                    <option value="Metabolic Panel">Metabolic Panel</option>
                    <option value="Thyroid">Thyroid</option>
                    <option value="Urine Test">Urine Test</option>
                    <option value="X-Ray">X-Ray / Imaging</option>
                    <option value="Other">Other Diagnostic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Test Date
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Hospital / Lab
                  </label>
                  <input
                    type="text"
                    value={formHospital}
                    onChange={(e) => setFormHospital(e.target.value)}
                    placeholder="e.g. Metro Memorial Lab"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Physician Name
                  </label>
                  <input
                    type="text"
                    value={formDoctor}
                    onChange={(e) => setFormDoctor(e.target.value)}
                    placeholder="e.g. Dr. Evelyn Vance, MD"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  User Notes
                </label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Fasted for 12 hours prior."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
