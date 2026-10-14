'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useHealth } from '@/context/HealthContext';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Heart,
  TrendingUp,
  Share2,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  PhoneCall,
  ArrowRight,
  Calculator,
  Award,
  Zap,
  Info,
  Check,
  X,
  Play
} from 'lucide-react';

export const HealthInsuranceView: React.FC = () => {
  const { setActiveSection } = useHealth();

  // Insurance Calculator State
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [selectedMembers, setSelectedMembers] = useState<{ [key: string]: boolean }>({
    self: true,
    wife: true,
    mother: false,
    father: false
  });
  const [sonsCount, setSonsCount] = useState<number>(0);
  const [daughtersCount, setDaughtersCount] = useState<number>(1);
  const [ageBracket, setAgeBracket] = useState<'18-35' | '36-45' | '46-55' | '55+'>('18-35');
  const [sumInsuredLakhs, setSumInsuredLakhs] = useState<number>(10);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Toggle member
  const toggleMember = (member: string) => {
    setSelectedMembers(prev => ({ ...prev, [member]: !prev[member] }));
  };

  // Dynamic premium calculation based on selected members and sum insured
  const memberCount =
    (selectedMembers.self ? 1 : 0) +
    (selectedMembers.wife ? 1 : 0) +
    (selectedMembers.mother ? 1 : 0) +
    (selectedMembers.father ? 1 : 0) +
    sonsCount +
    daughtersCount;

  const basePerDay = sumInsuredLakhs === 5 ? 18 : sumInsuredLakhs === 10 ? 26 : sumInsuredLakhs === 25 ? 42 : 65;
  const multiplier = Math.max(1, memberCount * 0.75);
  const ageMultiplier = ageBracket === '18-35' ? 1.0 : ageBracket === '36-45' ? 1.25 : ageBracket === '46-55' ? 1.6 : 2.1;
  const calculatedDaily = Math.round(basePerDay * multiplier * ageMultiplier);
  const calculatedAnnual = Math.round(calculatedDaily * 365);
  const taxSavings80D = Math.min(75000, Math.round(calculatedAnnual * 0.3));

  // Social media viral insights data
  const socialMediaInsights = [
    {
      id: 'viral_reel_room_rent',
      platform: 'Instagram & YouTube Shorts',
      badgeColor: 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300 border-pink-300',
      tag: '🔥 2.4M Views Viral Reel',
      title: 'The ₹50,000 ICU Room Rent Capping Trap Explained',
      handle: '@DoctorExplains_India',
      summary: 'Most legacy insurance policies cap room rent to 1% of Sum Insured. If you pick a deluxe room, the insurer deducts 40% of the entire doctor surgery and pharmacy bill as proportional penalty! CareVista plans guarantee 0% Room Rent Capping with private single rooms included.',
      actionableTip: 'Always verify "No Room Rent Sub-Limit" in your policy document to avoid out-of-pocket bills.',
      upvotes: '142K Likes'
    },
    {
      id: 'fintweet_cashless',
      platform: 'Twitter / X FinTech Thread',
      badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border-sky-300',
      tag: '🧵 850+ Retweets Thread',
      title: 'How to Get 30-Minute Cashless Hospital Approval without Delays',
      handle: '@FinHealthGuru',
      summary: '84% of hospital pre-auth claim rejections happen due to mismatch between hospital admission diagnosis and insurance proposal forms. Linking your ABHA Digital Health ID through CareVista enables zero-paperwork instant digital authorization.',
      actionableTip: 'Carry your digital policy card on your smartphone for zero-deposit hospital admission.',
      upvotes: '3.8K Retweets'
    },
    {
      id: 'reddit_myth_young',
      platform: 'Reddit r/IndiaInvestments',
      badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-orange-300',
      tag: '💡 Top Community Post',
      title: 'Myth: "I am 26 and healthy, I do not need Health Insurance"',
      handle: 'u/MedicFinancialPlanning',
      summary: 'Data from 400,000 insurance claims shows 38% of all emergency hospital admissions in metropolitan India are young adults (Dengue, acute pancreatitis, road accidents, ligament tear). Average cost: ₹1.85 Lakhs. Starting before age 30 locks low lifetime base premiums and clears waiting periods early.',
      actionableTip: 'Buying early eliminates the 3-year pre-existing disease waiting period before health issues start.',
      upvotes: '1,420 Upvotes'
    },
    {
      id: 'linkedin_section_80d',
      platform: 'LinkedIn Healthcare Finance',
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-300',
      tag: '📊 Verified Tax Analysis',
      title: 'Save up to ₹75,000 in Income Tax under Section 80D',
      handle: 'CA Anjali Gupta • Healthcare Tax Advisor',
      summary: 'Health insurance premiums qualify for direct tax deduction under Section 80D: ₹25,000 for self/spouse/kids + ₹50,000 for senior citizen parents (age 60+), plus ₹5,000 preventive health checkup deduction. The tax saved practically covers 40% to 70% of the policy cost.',
      actionableTip: 'Claim up to ₹75,000 annual deduction and get full family medical security simultaneously.',
      upvotes: '8,900 Impressions'
    }
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Top Breadcrumb & Return Nav */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSection('landing')}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span>← Landing Showcase</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('specialties')}
            className="px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            <span>Browse Specialties</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('ambulance')}
            className="px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span>Ambulance 24/7</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>IRDAI Registered Health Insurance Partner</span>
        </div>
      </div>

      {/* Main Hero Banner modeled after Apollo 24/7 Insurance */}
      <div className="rounded-3xl bg-gradient-to-r from-[#FFFBF2] via-[#FFF8EC] to-[#FFF3DE] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-amber-200/80 dark:border-amber-900/40 p-6 sm:p-10 shadow-xl overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Text & Family Photo */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-black tracking-widest uppercase text-amber-700 dark:text-amber-400">
                ALWAYS ENOUGH • COMPREHENSIVE COVER
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Health Insurance Plans
              </h1>

              <p className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                Smart health cover for every need
              </p>

              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Complete cashless hospitalization across 11,000+ top multi-specialty hospitals with zero room-rent capping, day-1 pre-existing coverage options, and instant claims settled in 30 minutes.
              </p>
            </div>

            {/* Happy Indian Family Image Container with Trust Badges */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-200/60 dark:border-slate-800 aspect-[16/9] max-h-[320px]">
              <Image
                src="/images/family_health_insurance.jpg"
                alt="Happy Indian Family Protected by Comprehensive Health Insurance Cover"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Verified Trust Badges Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 font-bold">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Licensed by IRDAI</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>11,000+ Cashless Hospitals</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form: Interactive Health Insurance Premium Calculator */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-amber-300/80 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider">
                  INSTANT ESTIMATOR
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Find plans starting from ₹20/day*
                </h3>
              </div>
              <Calculator className="w-6 h-6 text-amber-500" />
            </div>

            {/* Gender Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Select your gender:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Select Members to Insure */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Select members to cover:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'self', label: 'Self (Applicant)', icon: '👤' },
                  { id: 'wife', label: gender === 'male' ? 'Wife' : 'Husband', icon: '👩' },
                  { id: 'mother', label: 'Mother', icon: '👵' },
                  { id: 'father', label: 'Father', icon: '👴' }
                ].map(mem => (
                  <label
                    key={mem.id}
                    onClick={() => toggleMember(mem.id)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedMembers[mem.id]
                        ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{mem.icon}</span>
                      <span>{mem.label}</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={!!selectedMembers[mem.id]}
                      onChange={() => {}}
                      className="rounded text-amber-500 focus:ring-amber-400"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Select Children */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Select children (max 4):</span>
                <span className="text-[11px] text-slate-400 font-mono">{sonsCount + daughtersCount} Selected</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">👦 Son(s)</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSonsCount(Math.max(0, sonsCount - 1))}
                      className="w-5 h-5 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-white font-bold flex items-center justify-center border shadow-xs"
                    >
                      -
                    </button>
                    <span className="font-bold w-3 text-center">{sonsCount}</span>
                    <button
                      type="button"
                      onClick={() => setSonsCount(Math.min(3, sonsCount + 1))}
                      className="w-5 h-5 rounded-md bg-amber-500 text-white font-bold flex items-center justify-center shadow-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">👧 Daughter(s)</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDaughtersCount(Math.max(0, daughtersCount - 1))}
                      className="w-5 h-5 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-white font-bold flex items-center justify-center border shadow-xs"
                    >
                      -
                    </button>
                    <span className="font-bold w-3 text-center">{daughtersCount}</span>
                    <button
                      type="button"
                      onClick={() => setDaughtersCount(Math.min(3, daughtersCount + 1))}
                      className="w-5 h-5 rounded-md bg-amber-500 text-white font-bold flex items-center justify-center shadow-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sum Insured Amount Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Desired Health Cover:
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
                {[5, 10, 25, 100].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSumInsuredLakhs(amt)}
                    className={`py-2 rounded-xl border text-center transition-all cursor-pointer ${
                      sumInsuredLakhs === amt
                        ? 'bg-amber-500 border-amber-600 text-white shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {amt === 100 ? '₹1 Cr' : `₹${amt}L`}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Calculated Quote Pill */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-800 dark:text-amber-300 font-mono block">
                  ESTIMATED PREMIUM ({memberCount} Members)
                </span>
                <div className="text-lg font-black text-slate-900 dark:text-white flex items-baseline gap-1">
                  <span>₹{calculatedDaily}/day</span>
                  <span className="text-xs font-normal text-slate-500">(~₹{calculatedAnnual.toLocaleString()}/yr)</span>
                </div>
              </div>
              <div className="text-right text-[10px] text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                Save ₹{taxSavings80D.toLocaleString()} (80D)
              </div>
            </div>

            {/* View Plans Button */}
            <button
              type="button"
              onClick={() => setQuoteModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>View Plans & Get Instant Quote →</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION: GENERAL INFORMATION OBTAINED BY SOCIAL MEDIA */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
              <Share2 className="w-3.5 h-3.5 text-blue-500" />
              <span>COMMUNITY CONSENSUS & VIRAL AWARENESS</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Health Insurance Insights Obtained by Social Media
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Real community insights, viral myths busted, and financial advice trending across Instagram, Twitter/X, Reddit, and YouTube.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>98.4% Netizen Claim Satisfaction Score</span>
          </div>
        </div>

        {/* 4 Social Media Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialMediaInsights.map(item => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/80 transition-all space-y-3 shadow-xs hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                  {item.tag}
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-bold">
                  {item.platform}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono font-semibold">
                  Source: {item.handle} • {item.upvotes}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.summary}
              </p>

              {/* Actionable takeaway callout */}
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-900 flex items-start gap-2 text-xs text-teal-800 dark:text-teal-300">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span className="font-semibold">{item.actionableTip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan Features & Cashless Hospital Network Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-xl">
            🏥
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            11,000+ Cashless Hospital Network
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Walk into Apollo, Fortis, Max, Manipal, or any network partner. Show your CareVista digital card and obtain cashless discharge with zero paperwork.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold text-xl">
            ⚡
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            Zero Room Rent Capping
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Choose single private AC rooms with no proportional deduction penalties. Everything from surgeon fees to medications is settled 100% in full.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold text-xl">
            🧾
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            Section 80D Tax Benefit
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Enjoy full income tax deductions up to ₹75,000 annually under Section 80D for yourself, spouse, children, and senior citizen parents.
          </p>
        </div>
      </div>

      {/* Instant Policy Quote Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-lg w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => { setQuoteModalOpen(false); setApplicationSubmitted(false); }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {applicationSubmitted ? (
              <div className="text-center space-y-4 py-4 animate-scaleUp">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl">
                  ✓
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Insurance Quote Generated!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Your personalized policy breakdown for <strong>₹{sumInsuredLakhs} Lakhs Sum Insured</strong> has been sent to your registered email & WhatsApp. An IRDAI certified insurance advisor will assist you with digital KYC.
                </p>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs font-mono text-teal-600 dark:text-teal-300">
                  Quote Ref ID: CV-INS-2026-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  type="button"
                  onClick={() => { setQuoteModalOpen(false); setApplicationSubmitted(false); }}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200">
                    Custom Quote Ready
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    Confirm Your Health Cover Details
                  </h3>
                  <p className="text-xs text-slate-500">
                    Covering {memberCount} family members with ₹{sumInsuredLakhs} Lakhs sum insured.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Sum Insured:</span>
                    <strong className="text-slate-900 dark:text-white">₹{sumInsuredLakhs} Lakhs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Covered Members:</span>
                    <strong className="text-slate-900 dark:text-white">{memberCount} Persons</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Daily Estimated Cost:</span>
                    <strong className="text-amber-600 dark:text-amber-400">₹{calculatedDaily}/day</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Annual Premium:</span>
                    <strong className="text-slate-900 dark:text-white">₹{calculatedAnnual.toLocaleString()}/yr</strong>
                  </div>
                  <div className="flex justify-between border-t border-amber-200/60 dark:border-amber-800/60 pt-1 text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Tax Savings (Sec 80D):</span>
                    <span>Up to ₹{taxSavings80D.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <input
                    type="text"
                    defaultValue="Rajesh Sharma"
                    placeholder="Your Full Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                  <input
                    type="tel"
                    defaultValue="+91 98450 12345"
                    placeholder="Phone Number for Instant Quote"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setApplicationSubmitted(true)}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
                >
                  Submit & Receive Official Policy Proposal
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
