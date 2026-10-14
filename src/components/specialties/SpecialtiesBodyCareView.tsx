'use client';

import React, { useState, useMemo } from 'react';
import { useHealth } from '@/context/HealthContext';
import {
  Search,
  Stethoscope,
  Sparkles,
  Heart,
  Activity,
  Brain,
  Baby,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Filter,
  X,
  PhoneCall,
  AlertCircle
} from 'lucide-react';

export interface SpecialtyItem {
  id: string;
  name: string;
  category: 'primary' | 'cranial' | 'cardiopulmonary' | 'digestive' | 'ortho' | 'women_child' | 'surgery' | 'specialized';
  subtitle: string;
  organTarget: string;
  symptoms: string[];
  conditions: string[];
  recommendedTests: string[];
  specialistTitle: string;
  doctorCount: number;
  consultFee: string;
  iconBg: string;
  iconColor: string;
  badge?: string;
  svgIcon: React.ReactNode;
}

export const SPECIALTIES_DATA: SpecialtyItem[] = [
  {
    id: 'general_physician',
    name: 'General Physician & Internal Medicine',
    category: 'primary',
    subtitle: 'Fever, fatigue, everyday health issues & infections',
    organTarget: 'Whole Body • Vital Signs',
    symptoms: ['High Fever & Chills', 'Persistent Fatigue', 'Viral Infections', 'Body Aches', 'Unexplained Weakness'],
    conditions: ['Viral Fever', 'Seasonal Influenza', 'Dengue & Malaria', 'Hypertension Screen', 'Chronic Fatigue'],
    recommendedTests: ['Complete Blood Count (CBC)', 'Erythrocyte Sedimentation (ESR)', 'Thyroid TSH', 'Fasting Blood Sugar'],
    specialistTitle: 'Consultant Physician, MD',
    doctorCount: 420,
    consultFee: '₹499',
    iconBg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800',
    iconColor: 'text-teal-600 dark:text-teal-400',
    badge: 'Most Consulted',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <circle cx="24" cy="14" r="7" className="stroke-teal-600 dark:stroke-teal-400" />
        <path d="M12 40v-6a8 8 0 0 1 8-8h8a8 8 0 0 1 8 8v6" className="stroke-teal-600 dark:stroke-teal-400" />
        <path d="M24 23v9m-4.5-4.5h9" className="stroke-emerald-500" strokeWidth="2.5" />
        <path d="M16 14a8 8 0 0 0 16 0" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Cosmetology',
    category: 'specialized',
    subtitle: 'Skin allergies, acne, eczema, psoriasis & hair fall',
    organTarget: 'Integumentary • Skin & Hair',
    symptoms: ['Cystic Acne', 'Severe Dandruff & Hair Fall', 'Itchy Rashes & Eczema', 'Psoriasis Patches', 'Fungal Spots'],
    conditions: ['Atopic Dermatitis', 'Alopecia Areata', 'Melasma', 'Urticaria Hives', 'Bacterial Folliculitis'],
    recommendedTests: ['Skin Scraping Biopsy', 'Serum IgE Allergy Profile', 'Vitamin D3 & Ferritin', 'Thyroid Profile'],
    specialistTitle: 'Consultant Dermatologist, MD DVL',
    doctorCount: 260,
    consultFee: '₹599',
    iconBg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
    iconColor: 'text-rose-600 dark:text-rose-400',
    badge: 'Popular',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M16 38c0-8 4-14 8-14s8 6 8 14" className="stroke-rose-500" />
        <circle cx="24" cy="18" r="8" className="stroke-rose-600 dark:stroke-rose-400" />
        <path d="M34 10l2 2m0-2l-2 2" className="stroke-amber-400" strokeWidth="2.5" />
        <path d="M12 12l2 2m0-2l-2 2" className="stroke-amber-400" strokeWidth="2.5" />
        <path d="M24 26v4" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'obstetrics_gynaecology',
    name: 'Obstetrics & Gynaecology',
    category: 'women_child',
    subtitle: 'Pregnancy care, PCOS, menstrual irregularities & fertility',
    organTarget: 'Reproductive System • Uterine Health',
    symptoms: ['Irregular Periods', 'PCOS / PCOD Hormonal Imbalance', 'Pelvic Pain & Cramps', 'Pregnancy Trimester Care', 'Abnormal Spotting'],
    conditions: ['Polycystic Ovarian Syndrome', 'Endometriosis', 'Uterine Fibroids', 'Pelvic Inflammatory Disease', 'Gestational Care'],
    recommendedTests: ['Pelvic Ultrasound USG', 'Serum LH, FSH & Prolactin', 'AMH Fertility Level', 'Pap Smear'],
    specialistTitle: 'Consultant Obstetrician & Gynaecologist, MS DGO',
    doctorCount: 310,
    consultFee: '₹649',
    iconBg: 'bg-pink-50 dark:bg-pink-950/60 border-pink-200 dark:border-pink-800',
    iconColor: 'text-pink-600 dark:text-pink-400',
    badge: 'Women Health',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M14 16c0-6 4.5-8 10-8s10 2 10 8c0 7-7 14-10 18-3-4-10-11-10-18z" className="stroke-pink-600 dark:stroke-pink-400 fill-pink-500/10" />
        <circle cx="24" cy="18" r="3" className="stroke-pink-500" />
        <path d="M10 20c-3 0-5 3-5 6s3 6 7 6" className="stroke-pink-400" strokeDasharray="2 2" />
        <path d="M38 20c3 0 5 3 5 6s-3 6-7 6" className="stroke-pink-400" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: 'orthopaedics',
    name: 'Orthopaedics & Joint Replacement',
    category: 'ortho',
    subtitle: 'Bone fractures, knee arthritis, backache & sports injuries',
    organTarget: 'Musculoskeletal • Bones & Joints',
    symptoms: ['Severe Knee Pain & Stiffness', 'Lower Back Ache / Sciatica', 'Shoulder Frozen Joint', 'Bone Fractures & Sprains', 'Neck Spondylosis'],
    conditions: ['Osteoarthritis Knee', 'Lumbar Disc Herniation', 'Cervical Spondylitis', 'Torn Ligaments / ACL', 'Osteoporosis Bone Loss'],
    recommendedTests: ['Digital Bone X-Ray (AP/Lateral)', 'MRI Spine & Joints', 'Serum Calcium & Vitamin D3', 'Bone Mineral Density (DEXA)'],
    specialistTitle: 'Senior Orthopaedic Surgeon, MS Ortho',
    doctorCount: 280,
    consultFee: '₹649',
    iconBg: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800',
    iconColor: 'text-orange-600 dark:text-orange-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M24 8v12m0 8v12" className="stroke-orange-500" strokeWidth="3" strokeLinecap="round" />
        <circle cx="24" cy="24" r="5" className="stroke-orange-600 dark:stroke-orange-400 fill-orange-500/20" />
        <path d="M16 20c4-2 12-2 16 0m-16 8c4 2 12 2 16 0" className="stroke-amber-500" />
      </svg>
    )
  },
  {
    id: 'ent',
    name: 'ENT (Ear, Nose & Throat)',
    category: 'specialized',
    subtitle: 'Sinusitis, ear discharge, hearing loss, tonsillitis & vertigo',
    organTarget: 'Craniofacial • Ears, Sinuses & Throat',
    symptoms: ['Chronic Sinus Congestion', 'Ear Ringing / Tinnitus', 'Frequent Throat Pain & Tonsils', 'Vertigo / Dizziness', 'Nasal Polyps & Snoring'],
    conditions: ['Allergic Rhinosinusitis', 'Otitis Media Ear Infection', 'Chronic Tonsillitis', 'Deviated Nasal Septum (DNS)', 'BPPV Vertigo'],
    recommendedTests: ['Diagnostic Nasal Endoscopy (DNE)', 'Pure Tone Audiometry (PTA)', 'CT Scan Paranasal Sinuses', 'Throat Swab Culture'],
    specialistTitle: 'Senior ENT Surgeon, MS ENT',
    doctorCount: 195,
    consultFee: '₹549',
    iconBg: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800',
    iconColor: 'text-sky-600 dark:text-sky-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M18 10a8 8 0 0 1 12 0c2 5 2 10 2 15a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6c0-5 0-10 2-15z" className="stroke-sky-600 dark:stroke-sky-400" />
        <path d="M24 16v8m-2 4h4" className="stroke-sky-500" />
        <circle cx="12" cy="24" r="3" className="stroke-teal-500" />
        <circle cx="36" cy="24" r="3" className="stroke-teal-500" />
      </svg>
    )
  },
  {
    id: 'neurology',
    name: 'Neurology & Stroke Care',
    category: 'cranial',
    subtitle: 'Migraines, epilepsy, tremors, Parkinson’s & neuropathic pain',
    organTarget: 'Cerebral Vault • Brain & Spinal Cord',
    symptoms: ['Severe Pulsing Migraines', 'Seizures & Blackouts', 'Hand Tremors & Incoordination', 'Numbness / Tingling Neuropathy', 'Sudden Facial Droop'],
    conditions: ['Migraine Headache', 'Ischemic Stroke Precursor', 'Epilepsy & Seizure Disorders', 'Peripheral Neuropathy', 'Parkinson’s Disease'],
    recommendedTests: ['Brain MRI with Angiogram', 'Digital Video EEG', 'Nerve Conduction Study (NCS)', 'Carotid Doppler Ultrasound'],
    specialistTitle: 'Senior Neurologist, DM Neurology',
    doctorCount: 175,
    consultFee: '₹799',
    iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    badge: 'Critical Care',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M16 20a8 8 0 0 1 16 0c3 1 5 4 5 7a7 7 0 0 1-7 7H18a7 7 0 0 1-7-7c0-3 2-6 5-7z" className="stroke-indigo-600 dark:stroke-indigo-400 fill-indigo-500/10" />
        <path d="M24 12v22m-6-14c2 3 6 3 8 0m-8 6c2 3 6 3 8 0" className="stroke-indigo-400" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'cardiology',
    name: 'Cardiology & Heart Care',
    category: 'cardiopulmonary',
    subtitle: 'Chest pain, high blood pressure, palpitations & heart attacks',
    organTarget: 'Cardiovascular • Heart & Cor-Arteries',
    symptoms: ['Squeezing Chest Heaviness', 'Breathlessness on Walking', 'Irregular Heart Palpitations', 'High BP > 140/90 mmHg', 'Swollen Ankles & Feet'],
    conditions: ['Coronary Artery Disease', 'Hypertensive Heart Failure', 'Cardiac Arrhythmia / AFib', 'Valvular Heart Disease', 'Angina Pectoris'],
    recommendedTests: ['12-Lead Resting ECG', '2D Echocardiography with Doppler', 'Treadmill Stress Test (TMT)', 'Lipid Profile & Troponin I'],
    specialistTitle: 'Consultant Cardiologist, DM Cardiology',
    doctorCount: 230,
    consultFee: '₹799',
    iconBg: 'bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800',
    iconColor: 'text-red-600 dark:text-red-400',
    badge: '24/7 Available',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M24 40s-14-9-14-19a9 9 0 0 1 14-7.5A9 9 0 0 1 38 21c0 10-14 19-14 19z" className="stroke-red-600 dark:stroke-red-400 fill-red-500/10" />
        <path d="M16 24h4l2-5 4 10 3-7 3 2h4" className="stroke-red-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 'urology',
    name: 'Urology & Andrology',
    category: 'specialized',
    subtitle: 'Kidney stones, UTI, prostate issues & male reproductive health',
    organTarget: 'Urinary Tract & Prostate',
    symptoms: ['Severe Flank Kidney Stone Pain', 'Burning Sensation Urination (UTI)', 'Weak Urine Stream / Nocturia', 'Blood in Urine (Hematuria)', 'Erectile Dysfunction'],
    conditions: ['Renal Calculi (Kidney Stones)', 'Benign Prostatic Hyperplasia (BPH)', 'Urinary Tract Infection', 'Urethral Stricture', 'Hydrocele'],
    recommendedTests: ['USG KUB (Kidney, Ureter, Bladder)', 'Urine Routine & Microscopic Culture', 'Serum Creatinine', 'Serum PSA (Prostate)'],
    specialistTitle: 'Consultant Urologist, MCh Urology',
    doctorCount: 160,
    consultFee: '₹649',
    iconBg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M16 12c-4 0-6 4-6 9 0 7 5 11 10 11s8-5 8-11c0-5-2-9-6-9s-4 3-6 3-4-3-6-3z" className="stroke-amber-600 dark:stroke-amber-400 fill-amber-500/10" />
        <path d="M32 12c4 0 6 4 6 9 0 7-5 11-10 11s-8-5-8-11c0-5 2-9 6-9s4 3 6 3 4-3 6-3z" className="stroke-amber-600 dark:stroke-amber-400 fill-amber-500/10" />
        <path d="M24 32v8" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology & Hepatology',
    category: 'digestive',
    subtitle: 'Acid reflux, fatty liver, gastritis, bloating & constipation',
    organTarget: 'Digestive Tract • Stomach, Liver & Gut',
    symptoms: ['Severe Heartburn & GERD', 'Abdominal Bloating & Cramps', 'Jaundice & Fatty Liver Pain', 'Chronic Diarrhea / Constipation', 'Blood in Stools'],
    conditions: ['Gastroesophageal Reflux Disease', 'Non-Alcoholic Fatty Liver (NAFLD)', 'Irritable Bowel Syndrome (IBS)', 'Peptic Ulcer Disease', 'Ulcerative Colitis'],
    recommendedTests: ['Upper GI Video Endoscopy', 'Liver Function Test (LFT Profile)', 'Ultrasound Whole Abdomen', 'Stool Occult Blood & H. Pylori'],
    specialistTitle: 'Consultant Medical Gastroenterologist, DM Gastro',
    doctorCount: 190,
    consultFee: '₹699',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    badge: 'High Demand',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M22 10v6c0 4-4 7-4 12 0 6 5 11 11 11s10-5 10-11c0-7-6-10-8-14V10" className="stroke-emerald-600 dark:stroke-emerald-400 fill-emerald-500/10" />
        <path d="M20 28c3 2 7 2 10 0" className="stroke-teal-500" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'psychiatry',
    name: 'Psychiatry & Mental Health',
    category: 'cranial',
    subtitle: 'Depression, panic attacks, anxiety, insomnia & stress',
    organTarget: 'Neuropsychological • Mind & Mood',
    symptoms: ['Persistent Sadness & Hopelessness', 'Severe Panic & Heart Racing', 'Chronic Sleeplessness (Insomnia)', 'Loss of Interest & Burnout', 'Obsessive Intrusive Thoughts'],
    conditions: ['Major Depressive Disorder (MDD)', 'Generalized Anxiety Disorder (GAD)', 'Panic Disorder', 'Bipolar Mood Fluctuation', 'Adult ADHD'],
    recommendedTests: ['Hamilton Depression Rating Scale', 'GAD-7 Anxiety Assessment', 'Sleep Hygiene Diagnostic Polysomnography', 'Thyroid & Vitamin B12'],
    specialistTitle: 'Senior Consultant Psychiatrist, MD Psychiatry',
    doctorCount: 140,
    consultFee: '₹799',
    iconBg: 'bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badge: '100% Confidential',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M16 38c-2-4-2-8-2-12 0-7 5-14 12-14s12 7 12 14c0 4 0 8-2 12" className="stroke-purple-600 dark:stroke-purple-400" />
        <circle cx="24" cy="20" r="4" className="stroke-purple-400" strokeDasharray="2 2" />
        <path d="M21 20h6m-3-3v6" className="stroke-purple-500" />
      </svg>
    )
  },
  {
    id: 'paediatrics',
    name: 'Paediatrics & Child Health',
    category: 'women_child',
    subtitle: 'Child growth, infant immunization, teething, colic & fevers',
    organTarget: 'Infant & Child Development',
    symptoms: ['High Fever in Babies & Toddlers', 'Severe Diarrhea & Dehydration', 'Crying with Infantile Colic', 'Delayed Speech & Milestones', 'Childhood Asthma / Wheeze'],
    conditions: ['Pediatric Bronchiolitis', 'Neonatal Jaundice', 'Acute Gastroenteritis', 'Childhood Eczema', 'Vaccination Schedule Review'],
    recommendedTests: ['Pediatric Growth Milestones Curve', 'Urine Routine & Electrolytes', 'Complete Blood Count (CBC)', 'Stool Routine Panel'],
    specialistTitle: 'Consultant Paediatrician, MD Pediatrics',
    doctorCount: 290,
    consultFee: '₹549',
    iconBg: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    badge: 'Child Care',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <circle cx="24" cy="18" r="9" className="stroke-cyan-600 dark:stroke-cyan-400 fill-cyan-500/10" />
        <path d="M15 27c0 6 4 11 9 11s9-5 9-11" className="stroke-cyan-500" />
        <path d="M20 17h.01m8 0h.01" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="3" />
        <path d="M22 21c1 1 3 1 4 0" className="stroke-cyan-600" />
      </svg>
    )
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology & Respiratory Medicine',
    category: 'cardiopulmonary',
    subtitle: 'Asthma, chronic cough, bronchitis, sleep apnea & shortness of breath',
    organTarget: 'Respiratory System • Lungs & Bronchi',
    symptoms: ['Dry / Phlegmy Cough > 3 Weeks', 'Wheezing & Chest Tightness', 'Shortness of Breath Climbing Stairs', 'Sleep Snoring & Daytime Sleepiness', 'Blood in Sputum'],
    conditions: ['Bronchial Asthma', 'Chronic Obstructive Pulmonary (COPD)', 'Post-COVID Pulmonary Fibrosis', 'Bacterial Pneumonia', 'Obstructive Sleep Apnea (OSA)'],
    recommendedTests: ['Spirometry / Pulmonary Function Test (PFT)', 'High-Resolution Chest CT (HRCT)', 'Chest X-Ray PA View', 'Sleep Apnea Study (Polysomnography)'],
    specialistTitle: 'Senior Consultant Pulmonologist, MD DTCD',
    doctorCount: 165,
    consultFee: '₹649',
    iconBg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800',
    iconColor: 'text-teal-600 dark:text-teal-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M24 10v12" className="stroke-teal-600" strokeWidth="2.5" />
        <path d="M24 22c-3 3-8 6-8 12 0 4 3 6 7 6s5-4 5-8" className="stroke-teal-600 dark:stroke-teal-400 fill-teal-500/10" />
        <path d="M24 22c3 3 8 6 8 12 0 4-3 6-7 6s-5-4-5-8" className="stroke-teal-600 dark:stroke-teal-400 fill-teal-500/10" />
      </svg>
    )
  },
  {
    id: 'endocrinology',
    name: 'Endocrinology & Thyroid Care',
    category: 'digestive',
    subtitle: 'Hypothyroid, hyperthyroid, hormonal disorders & metabolic health',
    organTarget: 'Endocrine Glands • Thyroid & Adrenals',
    symptoms: ['Unexplained Rapid Weight Gain / Loss', 'Extreme Cold or Heat Intolerance', 'Swelling in Front of Neck (Goiter)', 'Facial Puffiness & Hair Thinning', 'Mood Swings & Fatigue'],
    conditions: ['Hashimoto Hypothyroidism', 'Graves Hyperthyroidism', 'Thyroid Nodules', 'Cushing Syndrome', 'Pituitary Hormone Imbalance'],
    recommendedTests: ['Complete Thyroid Profile (Free T3, Free T4, Ultra-TSH)', 'Anti-TPO Antibodies', 'Thyroid Ultrasound with TI-RADS', 'Serum Cortisol'],
    specialistTitle: 'Consultant Endocrinologist, DM Endocrinology',
    doctorCount: 135,
    consultFee: '₹749',
    iconBg: 'bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800',
    iconColor: 'text-violet-600 dark:text-violet-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M14 18c0-4 4-6 10-6s10 2 10 6c0 5-4 7-7 9 3 2 7 4 7 9 0 4-4 6-10 6s-10-2-10-6c0-5 4-7 7-9-3-2-7-4-7-9z" className="stroke-violet-600 dark:stroke-violet-400 fill-violet-500/10" />
        <circle cx="24" cy="24" r="2" className="stroke-violet-500" />
      </svg>
    )
  },
  {
    id: 'nephrology',
    name: 'Nephrology & Renal Medicine',
    category: 'specialized',
    subtitle: 'Chronic kidney disease, high creatinine, proteinuria & dialysis',
    organTarget: 'Renal Architecture • Nephrons & Filtration',
    symptoms: ['Morning Facial & Eye Puffiness', 'Foamy / Bubbly Urine', 'High Serum Creatinine > 1.4 mg/dL', 'Severe Fluid Retention / Edema', 'Refractory Hypertension'],
    conditions: ['Chronic Kidney Disease (CKD Stages 1-5)', 'Diabetic Nephropathy', 'Glomerulonephritis', 'Polycystic Kidney Disease (PKD)', 'Acute Kidney Injury'],
    recommendedTests: ['Kidney Function Test (KFT / RFT Profile)', 'Urine Albumin-to-Creatinine Ratio (UACR)', 'Estimated Glomerular Filtration Rate (eGFR)', 'Ultrasound Bilateral Kidneys'],
    specialistTitle: 'Consultant Nephrologist, DM Nephrology',
    doctorCount: 120,
    consultFee: '₹799',
    iconBg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
    iconColor: 'text-rose-600 dark:text-rose-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M18 14c-4 0-8 4-8 10 0 7 4 12 10 12 4 0 6-3 6-7 0-3-2-5-4-5 3 0 4-3 4-6 0-3-4-4-8-4z" className="stroke-rose-600 dark:stroke-rose-400 fill-rose-500/10" />
        <path d="M30 14c4 0 8 4 8 10 0 7-4 12-10 12-4 0-6-3-6-7 0-3 2-5 4-5-3 0-4-3-4-6 0-3 4-4 8-4z" className="stroke-rose-600 dark:stroke-rose-400 fill-rose-500/10" />
      </svg>
    )
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery & Spine Surgery',
    category: 'surgery',
    subtitle: 'Brain tumor, slip disc, spinal cord injury & aneurysms',
    organTarget: 'Cranial Surgery & Vertebral Column',
    symptoms: ['Radiating Sciatica Leg Shooting Pain', 'Loss of Bladder / Bowel Control', 'Intractable Morning Headaches with Vomiting', 'Sudden Limb Paralysis', 'Spinal Disc Spondylolisthesis'],
    conditions: ['Herniated Lumbar Disc', 'Cervical Myelopathy', 'Brain Meningioma / Glioma', 'Subarachnoid Hemorrhage', 'Hydrocephalus'],
    recommendedTests: ['Contrast MRI Brain with Spectroscopy', 'MRI Whole Spine with Myelogram', 'Digital Subtraction Angiography (DSA)', 'CT Spine Reconstruction'],
    specialistTitle: 'Senior Neurosurgeon, MCh Neurosurgery',
    doctorCount: 110,
    consultFee: '₹899',
    iconBg: 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700',
    iconColor: 'text-slate-700 dark:text-slate-300',
    badge: 'Tertiary Surgery',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <circle cx="24" cy="24" r="14" className="stroke-slate-600 dark:stroke-slate-400" />
        <path d="M24 10v28M10 24h28" className="stroke-teal-500" strokeDasharray="3 3" />
        <path d="M17 17l14 14" className="stroke-rose-500" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    id: 'rheumatology',
    name: 'Rheumatology & Autoimmune',
    category: 'ortho',
    subtitle: 'Rheumatoid arthritis, lupus, gout, joint swelling & morning stiffness',
    organTarget: 'Immune System • Connective Tissues',
    symptoms: ['Morning Finger Stiffness > 1 Hour', 'Severe Big Toe Swelling & Uric Acid Gout', 'Symmetrical Small Joint Pain', 'Butterfly Facial Rash & Sun Sensitivity', 'Chronic Fibromyalgia Pain'],
    conditions: ['Rheumatoid Arthritis (RA)', 'Systemic Lupus Erythematosus (SLE)', 'Ankylosing Spondylitis', 'Psoriatic Arthritis', 'Gouty Arthropathy'],
    recommendedTests: ['Serum Rheumatoid Factor (RF)', 'Anti-CCP Antibodies', 'Serum Uric Acid Level', 'Antinuclear Antibodies (ANA Profile by IFA)'],
    specialistTitle: 'Consultant Rheumatologist, DM Clinical Immunology',
    doctorCount: 95,
    consultFee: '₹799',
    iconBg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M24 10c-5 0-8 4-8 9s4 8 8 13c4-5 8-8 8-13s-3-9-8-9z" className="stroke-amber-600 dark:stroke-amber-400" />
        <circle cx="24" cy="24" r="3" className="stroke-rose-500 fill-rose-500" />
      </svg>
    )
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology & Eye Care',
    category: 'specialized',
    subtitle: 'Blurry vision, cataracts, glaucoma, dry eye & diabetic retinopathy',
    organTarget: 'Optical Apparatus • Cornea, Lens & Retina',
    symptoms: ['Gradual Blurry Diminishing Vision', 'Halos Around Lights & Glare', 'Painful Red Eye with Discharge', 'Flashing Floaters & Specks in Sight', 'Severe Eye Strain from Screens'],
    conditions: ['Senile Cataract', 'Glaucoma Elevated Eye Pressure', 'Diabetic Retinal Hemorrhages', 'Refractive Myopia / Astigmatism', 'Computer Vision Syndrome'],
    recommendedTests: ['Slit Lamp Bio-Microscopy', 'Non-Contact Tonometry (IOP Eye Pressure)', 'Fundus Ophthalmoscopy', 'Optical Coherence Tomography (OCT Retina)'],
    specialistTitle: 'Senior Eye Surgeon, MS Ophthalmology',
    doctorCount: 210,
    consultFee: '₹549',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M10 24s6-10 14-10 14 10 14 10-6 10-14 10-14-10-14-10z" className="stroke-emerald-600 dark:stroke-emerald-400 fill-emerald-500/10" />
        <circle cx="24" cy="24" r="5" className="stroke-teal-500" />
        <circle cx="24" cy="24" r="2" className="stroke-teal-600 fill-teal-600" />
      </svg>
    )
  },
  {
    id: 'surgical_gastro',
    name: 'Surgical Gastroenterology',
    category: 'surgery',
    subtitle: 'Gallstones, hernia, appendicitis & laparoscopic abdominal surgery',
    organTarget: 'Abdominal Viscera • Gallbladder & Intestines',
    symptoms: ['Sharp Right Upper Belly Gallstone Attack', 'Groin Bulge with Strain (Hernia)', 'Sudden Severe Right Lower Appendicitis Pain', 'Intractable Acid Reflux Not Responding to Pills', 'Rectal Bleeding with Piles'],
    conditions: ['Cholelithiasis (Gallbladder Stones)', 'Inguinal / Umbilical Hernia', 'Acute Appendicitis', 'Hemorrhoids & Anal Fistula', 'Colorectal Polyps'],
    recommendedTests: ['Ultrasound Hepatobiliary (USG Abdomen)', 'Contrast Enhanced CT Abdomen', 'Colonoscopy with Biopsy', 'Routine Pre-Operative Blood Profile'],
    specialistTitle: 'Senior GI Surgeon, MCh Surgical Gastro',
    doctorCount: 130,
    consultFee: '₹749',
    iconBg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M16 14v8c0 5 4 8 8 8s8-3 8-8v-8" className="stroke-amber-600 dark:stroke-amber-400" />
        <circle cx="24" cy="26" r="3" className="stroke-teal-500 fill-teal-500" />
        <path d="M20 36l8-8" className="stroke-rose-500" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    id: 'infectious_disease',
    name: 'Infectious Disease & Tropical Medicine',
    category: 'primary',
    subtitle: 'Dengue, malaria, typhoid, tuberculosis, COVID & unknown fevers',
    organTarget: 'Systemic Infection & Immune Defense',
    symptoms: ['Fever Spiking to 104°F with Rigors', 'Drop in Blood Platelet Count (< 100k)', 'Persistent Night Sweats & Weight Loss', 'Severe Joint Breakdown from Chikungunya', 'Chronic Cough with Blood Streaks'],
    conditions: ['Dengue Hemorrhagic Fever', 'Vivax & Falciparum Malaria', 'Enteric Typhoid Fever', 'Pulmonary Tuberculosis', 'Post-Viral Syndromes'],
    recommendedTests: ['Dengue NS1 Antigen & IgM/IgG', 'Malarial Smear & Antigen Rapid Test', 'Widal Typhoid & Blood Culture', 'GeneXpert MTB for Tuberculosis'],
    specialistTitle: 'Infectious Disease Specialist, MD FNB',
    doctorCount: 115,
    consultFee: '₹599',
    iconBg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
    iconColor: 'text-rose-600 dark:text-rose-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <circle cx="24" cy="24" r="10" className="stroke-rose-600 dark:stroke-rose-400 fill-rose-500/10" />
        <circle cx="24" cy="10" r="2" className="stroke-rose-500" />
        <circle cx="24" cy="38" r="2" className="stroke-rose-500" />
        <circle cx="10" cy="24" r="2" className="stroke-rose-500" />
        <circle cx="38" cy="24" r="2" className="stroke-rose-500" />
        <path d="M24 14v4m0 12v4m-10-10h4m12 0h4" className="stroke-rose-500" />
      </svg>
    )
  },
  {
    id: 'laparoscopic_surgery',
    name: 'General & Minimal Access Laparoscopic Surgery',
    category: 'surgery',
    subtitle: 'Keyhole surgery for hernia, appendix, cysts & wound debridement',
    organTarget: 'Minimally Invasive Abdominal Access',
    symptoms: ['Painful Abdominal Wall Lumps', 'Non-Healing Diabetic Foot Ulcers', 'Acute Swollen Appendicitis', 'Lipomas & Sebaceous Cysts', 'Ingrown Toenail Infections'],
    conditions: ['Laparoscopic Appendectomy', 'Laparoscopic Cholecystectomy', 'Open / Mesh Hernioplasty', 'Excision of Benign Soft Tissue Tumors', 'Diabetic Foot Care'],
    recommendedTests: ['Complete Surgical Panel', 'Coagulation Profile (PT/INR, aPTT)', 'Pre-Anesthetic ECG & Chest X-Ray', 'High Resolution Soft Tissue USG'],
    specialistTitle: 'Consultant Laparoscopic Surgeon, MS FMAS',
    doctorCount: 180,
    consultFee: '₹649',
    iconBg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800',
    iconColor: 'text-teal-600 dark:text-teal-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <rect x="12" y="14" width="24" height="20" rx="6" className="stroke-teal-600 dark:stroke-teal-400 fill-teal-500/10" />
        <circle cx="20" cy="24" r="2" className="stroke-teal-500 fill-teal-500" />
        <circle cx="28" cy="24" r="2" className="stroke-teal-500 fill-teal-500" />
        <path d="M24 10v4" className="stroke-teal-600" />
      </svg>
    )
  },
  {
    id: 'psychology',
    name: 'Clinical Psychology & Psychotherapy',
    category: 'cranial',
    subtitle: 'Cognitive behavioral therapy (CBT), counseling & stress coping',
    organTarget: 'Emotional Resilience & Behavioral Science',
    symptoms: ['Overwhelming Work Stress & Burnout', 'Relationship / Marriage Distress', 'Grief & Traumatic Bereavement', 'Phobias & Obsessive Habits', 'Low Self-Esteem & Social Anxiety'],
    conditions: ['Stress Response Disorder', 'Post-Traumatic Stress (PTSD)', 'Adjustment Disorders', 'Academic & Career Anxiety', 'Addiction Rehabilitation Counseling'],
    recommendedTests: ['Psychometric Personality Profile', 'Cognitive Assessment Battery', 'Beck Depression Inventory (BDI)', 'Perceived Stress Scale (PSS)'],
    specialistTitle: 'Licensed Clinical Psychologist, M.Phil Clinical Psych',
    doctorCount: 155,
    consultFee: '₹699',
    iconBg: 'bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800',
    iconColor: 'text-violet-600 dark:text-violet-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <circle cx="24" cy="18" r="8" className="stroke-violet-600 dark:stroke-violet-400 fill-violet-500/10" />
        <path d="M14 36c0-6 4-10 10-10s10 4 10 10" className="stroke-violet-600 dark:stroke-violet-400" />
        <path d="M21 16l3 3 3-3" className="stroke-violet-500" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'medical_oncology',
    name: 'Medical Oncology & Cancer Screening',
    category: 'specialized',
    subtitle: 'Cancer screening, chemotherapy, immunotherapy & second opinions',
    organTarget: 'Cellular Oncology & Lymphatic Health',
    symptoms: ['Unexplained Rapid Weight Loss > 10 kg', 'Painless Lumps in Breast, Neck or Groin', 'Chronic Hoarseness & Difficulty Swallowing', 'Change in Bowel Habits with Bleeding', 'Abnormal Non-Healing Mouth Ulcers'],
    conditions: ['Breast Cancer Screening', 'Oral & Head-Neck Cancers', 'Colorectal Carcinoma', 'Lung Malignancies', 'Lymphomas & Leukemias'],
    recommendedTests: ['PET-CT Whole Body Metabolic Scan', 'Mammography / Breast Ultrasound', 'Histopathological Biopsy with IHC', 'Serum Tumor Markers (CEA, CA-125, PSA)'],
    specialistTitle: 'Consultant Medical Oncologist, DM Oncology',
    doctorCount: 110,
    consultFee: '₹899',
    iconBg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
    iconColor: 'text-rose-600 dark:text-rose-400',
    badge: 'Oncology Care',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M24 10c-3 0-5 3-5 7 0 7 10 17 10 17s10-10 10-17c0-4-2-7-5-7s-5 3-5 5-2-5-5-5z" className="stroke-rose-600 dark:stroke-rose-400 fill-rose-500/10" />
        <circle cx="24" cy="22" r="3" className="stroke-rose-500" />
      </svg>
    )
  },
  {
    id: 'diabetology',
    name: 'Diabetology & Metabolic Medicine',
    category: 'digestive',
    subtitle: 'Fasting glucose, HbA1c, insulin titration & diabetic neuropathy',
    organTarget: 'Metabolic Matrix • Pancreas & Glucose Dynamics',
    symptoms: ['Excessive Thirst & Frequent Urination', 'Fasting Blood Sugar > 126 mg/dL', 'HbA1c Elevated > 6.5%', 'Burning Feet & Diabetic Neuropathy', 'Slow Wound Healing on Feet'],
    conditions: ['Type 2 Diabetes Mellitus', 'Type 1 Insulin-Dependent Diabetes', 'Gestational Diabetes Pregnancy', 'Metabolic Syndrome', 'Pre-Diabetes Impaired Fasting Glucose'],
    recommendedTests: ['Fasting Blood Glucose & Post-Prandial (PPBS)', 'Glycated Hemoglobin (HbA1c)', 'Continuous Glucose Monitoring (CGM 14-day)', 'Urine Microalbuminuria'],
    specialistTitle: 'Consultant Diabetologist, MD Post-Doc Diab',
    doctorCount: 220,
    consultFee: '₹599',
    iconBg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800',
    iconColor: 'text-teal-600 dark:text-teal-400',
    badge: 'Flagship Care',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <rect x="16" y="10" width="16" height="28" rx="4" className="stroke-teal-600 dark:stroke-teal-400 fill-teal-500/10" />
        <rect x="20" y="14" width="8" height="6" rx="1" className="stroke-teal-500 fill-teal-500/20" />
        <circle cx="24" cy="28" r="2" className="stroke-rose-500 fill-rose-500" />
        <path d="M24 38v4" className="stroke-teal-600" />
      </svg>
    )
  },
  {
    id: 'dentistry',
    name: 'Dentistry & Maxillofacial Care',
    category: 'specialized',
    subtitle: 'Toothache, cavities, root canal treatment (RCT), bleeding gums & braces',
    organTarget: 'Oral Cavity • Teeth, Gums & Jaw',
    symptoms: ['Severe Throbbing Toothache', 'Bleeding Gums on Brushing', 'Tooth Sensitivity to Cold/Hot', 'Chipped or Broken Enamel', 'Wisdom Tooth Jaw Swelling'],
    conditions: ['Dental Caries Cavities', 'Pulpitis Requiring Root Canal (RCT)', 'Gingivitis & Periodontitis', 'Impacted Third Molar Wisdom Tooth', 'Malocclusion Alignment'],
    recommendedTests: ['Digital Intraoral Periapical X-Ray (IOPA)', 'Orthopantomogram (OPG Panoramic X-Ray)', 'CBCT Dental 3D Scan', 'Vitality Pulp Testing'],
    specialistTitle: 'Consultant Dental Surgeon, MDS Ortho / Endo',
    doctorCount: 185,
    consultFee: '₹449',
    iconBg: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800',
    iconColor: 'text-sky-600 dark:text-sky-400',
    svgIcon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10 fill-none stroke-current stroke-2">
        <path d="M16 12c-4 0-6 4-6 9 0 6 3 13 5 17 2 4 4 4 5 1 1-3 2-8 4-8s3 5 4 8c1 3 3 3 5-1 2-4 5-11 5-17 0-5-2-9-6-9s-5 3-7 3-3-3-6-3z" className="stroke-sky-600 dark:stroke-sky-400 fill-sky-500/10" />
        <path d="M20 18c2 2 6 2 8 0" className="stroke-teal-500" strokeLinecap="round" />
      </svg>
    )
  }
];

export const SpecialtiesBodyCareView: React.FC = () => {
  const { setActiveSection, setPrefillProblemArea } = useHealth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<SpecialtyItem | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Filter items by search query and category
  const filteredSpecialties = useMemo(() => {
    return SPECIALTIES_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.organTarget.toLowerCase().includes(q) ||
        item.symptoms.some(s => s.toLowerCase().includes(q)) ||
        item.conditions.some(c => c.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const categories = [
    { id: 'all', label: 'All Specialties (24)' },
    { id: 'primary', label: 'General & Infectious' },
    { id: 'cranial', label: 'Brain & Mental Health' },
    { id: 'cardiopulmonary', label: 'Heart & Lungs' },
    { id: 'digestive', label: 'Stomach, Liver & Diabetes' },
    { id: 'ortho', label: 'Bones, Joints & Rheumatology' },
    { id: 'women_child', label: 'Women & Child Health' },
    { id: 'surgery', label: 'Surgical Care' },
    { id: 'specialized', label: 'Eyes, ENT, Skin & Urology' }
  ];

  const handleBookSpecialist = (item: SpecialtyItem) => {
    setActiveModalItem(item);
    setBookingConfirmed(false);
  };

  const handleCheckSymptom = (item: SpecialtyItem, symptom: string) => {
    setPrefillProblemArea({
      regionId: item.id,
      initialSymptom: `${item.name}: ${symptom}`
    });
    setActiveSection('symptom-checker');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Header with Apollo-Style Clean Aesthetics */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 p-6 sm:p-10 text-white border border-teal-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>BROWSE BY SPECIALTIES & BODY CARE • 24 CLINICAL DOMAINS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            What Problems Do We Care For In Your Body?
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From cranial neurology to cardiovascular rhythms, joint health, diabetes, and neonatal paediatrics — explore our complete visual directory of medical specialties, symptoms treated, and certified Apollo & CareVista physicians ready to assist you.
          </p>

          {/* Quick Stats Pill Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>24 Clinical Specialties</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-teal-400" />
              <span>4,800+ Verified Doctors</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Instant Video Call in 10 Mins</span>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Search Bar & Filter Controls */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Search input with icons */}
        <div className="relative w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search symptoms, organ problems, or medical specialties (e.g. Brain, Heart, Fasting Glucose, Acne, Knee pain, Asthma)..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills (Horizontal Scrolling) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-thin">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of All 24 Medical Specialties Graphical Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSpecialties.map(item => (
          <div
            key={item.id}
            onClick={() => handleBookSpecialist(item)}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-teal-400 dark:hover:border-teal-500 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
          >
            {/* Top Badge & SVG Graphical Icon */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-2xl p-2.5 flex items-center justify-center border shadow-xs group-hover:scale-110 transition-transform ${item.iconBg}`}>
                  {item.svgIcon}
                </div>

                {item.badge && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              {/* Organ Target Pill */}
              <div className="text-[11px] font-mono text-teal-700 dark:text-teal-300 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span>{item.organTarget}</span>
              </div>

              {/* Sample Symptoms Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.symptoms.slice(0, 2).map((sym, i) => (
                  <span
                    key={i}
                    onClick={e => {
                      e.stopPropagation();
                      handleCheckSymptom(item, sym);
                    }}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                    title="Click to check symptom with CareVista AI"
                  >
                    {sym}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Card Footer: Doctors Count & Action */}
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">AVAILABLE</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {item.doctorCount}+ Doctors
                </span>
              </div>

              <div className="flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                <span>Consult</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSpecialties.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No specialties match your search</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for terms like &quot;Heart&quot;, &quot;Diabetes&quot;, &quot;Headache&quot;, &quot;Skin&quot;, or reset your filters.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="px-4 py-2 rounded-xl bg-teal-500 text-white font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Specialty Consultation Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-xl w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4">
              <div className={`w-16 h-16 rounded-2xl p-3 flex items-center justify-center border shadow-xs ${activeModalItem.iconBg}`}>
                {activeModalItem.svgIcon}
              </div>
              <div className="space-y-1 flex-1 pr-6">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  {activeModalItem.organTarget}
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                  {activeModalItem.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeModalItem.subtitle}
                </p>
              </div>
            </div>

            {/* Conditions Treated */}
            <div className="space-y-2">
              <h4 className="text-xs font-black tracking-wider uppercase text-slate-700 dark:text-slate-300">
                Common Conditions & Problems We Treat
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {activeModalItem.conditions.map((cond, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{cond}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Diagnostic Laboratory Tests */}
            <div className="space-y-2">
              <h4 className="text-xs font-black tracking-wider uppercase text-slate-700 dark:text-slate-300">
                Recommended Diagnostic Tests
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalItem.recommendedTests.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 font-medium">
                    🔬 {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Doctor Info & Fee */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {activeModalItem.specialistTitle}
                </div>
                <div className="text-[11px] text-teal-700 dark:text-teal-300 font-medium">
                  {activeModalItem.doctorCount} Verified Doctors On Call • Average 4.9★
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-mono">CONSULT FEE</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">{activeModalItem.consultFee}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {bookingConfirmed ? (
              <div className="p-4 rounded-2xl bg-emerald-500 text-white text-center space-y-1 animate-scaleUp">
                <div className="font-extrabold text-sm flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Consultation Request Confirmed!</span>
                </div>
                <p className="text-xs text-emerald-100">
                  Doctor is connecting to your secure video room in ~8 minutes.
                </p>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setBookingConfirmed(true)}
                  className="flex-1 py-3 px-5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Instant Video Consultation</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleCheckSymptom(activeModalItem, activeModalItem.symptoms[0]);
                    setActiveModalItem(null);
                  }}
                  className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 font-bold text-xs cursor-pointer"
                >
                  AI Symptom Check
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
