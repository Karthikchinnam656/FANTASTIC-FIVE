'use client';

import React, { useState } from 'react';
import { Search, AlertTriangle, PlusCircle, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export interface BodyRegion {
  id: string;
  name: string;
  view: 'front' | 'back' | 'both';
  category: string;
  commonSymptoms: string[];
  triageQuestions: string[];
  redFlags: string[];
  description: string;
}

export const BODY_REGIONS: Record<string, BodyRegion> = {
  head: {
    id: 'head',
    name: 'Head & Neck',
    view: 'both',
    category: 'Neurological / ENT',
    commonSymptoms: ['Migraine / Tension Headache', 'Dizziness / Vertigo', 'Neck stiffness', 'Sinus pressure', 'Vision changes', 'Sore throat'],
    triageQuestions: [
      'Did this headache come on suddenly like a "thunderclap"?',
      'Is there fever, stiff neck, or sensitivity to light?',
      'Have you experienced any head trauma recently?'
    ],
    redFlags: ['Sudden worst headache of life (thunderclap)', 'Facial drooping or slurred speech (FAST)', 'High fever with neck rigidity'],
    description: 'Cranial region, facial structures, cervical spine, throat, and sensory organs.'
  },
  chest: {
    id: 'chest',
    name: 'Chest & Cardiovascular',
    view: 'front',
    category: 'Cardiopulmonary',
    commonSymptoms: ['Chest tightness / pressure', 'Shortness of breath', 'Heart palpitations', 'Sharp pain with deep breath', 'Acid reflux / Heartburn'],
    triageQuestions: [
      'Does the pressure feel like a heavy weight radiating to your arm or jaw?',
      'Does the pain worsen with exertion or movement?',
      'Are you experiencing sweating, nausea, or lightheadedness?'
    ],
    redFlags: ['Crushing retrosternal chest pain radiating to left arm/jaw', 'Severe shortness of breath at rest', 'Coughing up blood'],
    description: 'Heart, lungs, pericardium, ribs, intercostal muscles, and thoracic esophagus.'
  },
  abdomen: {
    id: 'abdomen',
    name: 'Abdomen & Digestive',
    view: 'front',
    category: 'Gastrointestinal',
    commonSymptoms: ['Stomach cramps / bloating', 'Acid reflux / Nausea', 'Lower right quadrant sharp pain', 'Diarrhea / Constipation', 'Loss of appetite'],
    triageQuestions: [
      'Is the pain sharp, cramping, or burning?',
      'Where is the pain most focused (upper, lower right, belly button)?',
      'Have you noticed any blood in stool or severe vomiting?'
    ],
    redFlags: ['Sudden severe right lower quadrant rebound tenderness (Appendicitis)', 'Black tarry stool or vomiting blood', 'High fever with rigid abdomen'],
    description: 'Stomach, liver, gallbladder, pancreas, intestines, and pelvic organs.'
  },
  back: {
    id: 'back',
    name: 'Back & Spine',
    view: 'back',
    category: 'Musculoskeletal / Spinal',
    commonSymptoms: ['Lower back dull ache', 'Sharp shooting sciatic pain down leg', 'Upper back muscle spasms', 'Stiffness after waking', 'Spinal tenderness'],
    triageQuestions: [
      'Does the pain radiate down your thigh past the knee?',
      'Have you noticed any numbness in your groin or loss of bladder/bowel control?',
      'Did a specific lifting incident cause the pain?'
    ],
    redFlags: ['Loss of bowel or bladder control (Cauda Equina Syndrome)', 'Progressive weakness or numbness in both legs', 'Back pain with unexplained high fever'],
    description: 'Cervical, thoracic, and lumbar vertebrae, spinal cord, and latissimus/trapezius musculature.'
  },
  arms: {
    id: 'arms',
    name: 'Arms & Shoulders',
    view: 'both',
    category: 'Musculoskeletal',
    commonSymptoms: ['Rotator cuff soreness', 'Shoulder impingement', 'Bicep / tricep strain', 'Elbow tendonitis (tennis elbow)', 'Joint popping or limited range of motion'],
    triageQuestions: [
      'Can you raise your arm above shoulder height?',
      'Is there visible swelling or deformity at the joint?',
      'Does the soreness worsen after overhead activities?'
    ],
    redFlags: ['Left arm numbness accompanied by chest tightness', 'Complete inability to move limb after fall', 'Open wound or obvious bone displacement'],
    description: 'Shoulder girdle, humerus, biceps, triceps, elbow joint, and forearm muscles.'
  },
  hands: {
    id: 'hands',
    name: 'Hands & Wrists',
    view: 'both',
    category: 'Orthopedic / Peripheral',
    commonSymptoms: ['Carpal tunnel tingling / numbness', 'Wrist sprain', 'Finger joint stiffness', 'Tremor or weakness in grip', 'Cold fingers / color changes'],
    triageQuestions: [
      'Do your thumb and first three fingers go numb at night?',
      'Is grip strength noticeably reduced?',
      'Are the knuckles swollen or warm to touch?'
    ],
    redFlags: ['Sudden inability to move fingers without injury', 'Cold, pale, pulseless hand', 'Rapid spreading redness or red streaks up arm'],
    description: 'Carpal bones, metacarpals, phalanges, flexor/extensor tendons, and median nerve.'
  },
  legs: {
    id: 'legs',
    name: 'Legs & Hips',
    view: 'both',
    category: 'Musculoskeletal / Vascular',
    commonSymptoms: ['Hip joint pain when walking', 'Knee swelling / meniscus click', 'Calf muscle cramps', 'Shin splints', 'Swollen ankles / fluid buildup'],
    triageQuestions: [
      'Is only one calf swollen, hot, and tender (DVT risk)?',
      'Can you bear weight on the knee or hip?',
      'Does the pain feel muscular or deep inside the joint?'
    ],
    redFlags: ['Unilateral calf swelling with redness and warmth (possible DVT blood clot)', 'Inability to bear any weight after a fall', 'Cold, pale leg with absent pulse'],
    description: 'Pelvic girdle, femoral bone, quadriceps, hamstrings, knee joint, tibia/fibula, and calf gastrocnemius.'
  },
  feet: {
    id: 'feet',
    name: 'Feet & Ankles',
    view: 'both',
    category: 'Podiatric / Vascular',
    commonSymptoms: ['Plantar fasciitis (heel pain in morning)', 'Ankle twist / sprain', 'Burning sensation / peripheral neuropathy', 'Toe pain / bunions', 'Swelling / Edema'],
    triageQuestions: [
      'Is the sharpest heel pain felt with your very first morning steps?',
      'Did you roll your ankle with an audible pop?',
      'Do you have diabetes or numbness in your toes?'
    ],
    redFlags: ['Non-healing diabetic foot ulcer or blackened toe', 'Severe swelling preventing shoe wear after trauma', 'Loss of sensation in entire foot'],
    description: 'Tarsals, metatarsals, Achilles tendon, plantar fascia, ankle ligaments, and toes.'
  }
};

interface InteractiveBodyMapProps {
  onSelectRegion?: (regionId: string, symptoms: string[]) => void;
  onLogProblem?: (regionId: string, initialSymptom?: string) => void;
}

export const InteractiveBodyMap: React.FC<InteractiveBodyMapProps> = ({ onSelectRegion, onLogProblem }) => {
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('chest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const selectedRegion = BODY_REGIONS[selectedRegionId] || BODY_REGIONS.head;

  const handleRegionClick = (regionId: string) => {
    setSelectedRegionId(regionId);
    setSelectedSymptoms([]);
    if (onSelectRegion) {
      onSelectRegion(regionId, []);
    }
  };

  const toggleSymptom = (symptom: string) => {
    const updated = selectedSymptoms.includes(symptom)
      ? selectedSymptoms.filter(s => s !== symptom)
      : [...selectedSymptoms, symptom];
    setSelectedSymptoms(updated);
    if (onSelectRegion) {
      onSelectRegion(selectedRegionId, updated);
    }
  };

  const filteredRegions = Object.values(BODY_REGIONS).filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.commonSymptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
      {/* Header and View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-xl">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Interactive Anatomical Body Map
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Click on any body region to pinpoint your symptoms, view clinical triage questions, and log health concerns.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl self-start md:self-auto">
          <button
            onClick={() => setActiveView('front')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeView === 'front'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Anterior (Front)
          </button>
          <button
            onClick={() => setActiveView('back')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeView === 'back'
                ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Posterior (Back)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Visual Anatomical SVG Map */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-teal-50/50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 rounded-2xl border border-teal-100/60 dark:border-slate-800 relative">
          <div className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
            {activeView === 'front' ? 'FRONT VIEW' : 'BACK VIEW'}
          </div>

          {/* SVG Human Figure */}
          <div className="relative w-64 h-[440px] flex items-center justify-center select-none">
            <svg
              viewBox="0 0 200 420"
              className="w-full h-full drop-shadow-md transition-all duration-300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#0d9488" floodOpacity="0.6" />
                </filter>
                <linearGradient id="bodyBaseGrad" x1="0" y1="0" x2="200" y2="420" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#cbd5e1" />
                  <stop offset="1" stopColor="#94a3b8" />
                </linearGradient>
              </defs>

              {/* Head & Neck */}
              <g
                className="cursor-pointer group transition-all"
                onClick={() => handleRegionClick('head')}
              >
                <ellipse
                  cx="100"
                  cy="45"
                  rx="24"
                  ry="30"
                  className={`transition-all duration-200 ${
                    selectedRegionId === 'head'
                      ? 'fill-teal-500 stroke-teal-300 stroke-2'
                      : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200 dark:hover:fill-teal-900'
                  }`}
                  filter={selectedRegionId === 'head' ? 'url(#activeGlow)' : undefined}
                />
                <rect
                  x="92"
                  y="72"
                  width="16"
                  height="16"
                  className={`transition-all duration-200 ${
                    selectedRegionId === 'head'
                      ? 'fill-teal-500'
                      : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200'
                  }`}
                />
              </g>

              {/* Chest / Upper Torso (Front: Chest, Back: Upper Back) */}
              {activeView === 'front' ? (
                <g
                  className="cursor-pointer group transition-all"
                  onClick={() => handleRegionClick('chest')}
                >
                  <path
                    d="M68 88H132C140 88 142 105 140 145H60C58 105 60 88 68 88Z"
                    className={`transition-all duration-200 ${
                      selectedRegionId === 'chest'
                        ? 'fill-teal-500 stroke-teal-300 stroke-2'
                        : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200 dark:hover:fill-teal-900'
                    }`}
                    filter={selectedRegionId === 'chest' ? 'url(#activeGlow)' : undefined}
                  />
                  {/* Subtle pectoral markers */}
                  <line x1="100" y1="92" x2="100" y2="140" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5" />
                </g>
              ) : (
                <g
                  className="cursor-pointer group transition-all"
                  onClick={() => handleRegionClick('back')}
                >
                  <path
                    d="M68 88H132C140 88 142 105 140 145H60C58 105 60 88 68 88Z"
                    className={`transition-all duration-200 ${
                      selectedRegionId === 'back'
                        ? 'fill-teal-500 stroke-teal-300 stroke-2'
                        : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200 dark:hover:fill-teal-900'
                    }`}
                    filter={selectedRegionId === 'back' ? 'url(#activeGlow)' : undefined}
                  />
                  {/* Spine hint */}
                  <line x1="100" y1="88" x2="100" y2="145" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="3 2" />
                </g>
              )}

              {/* Abdomen (Front) vs Lower Back (Back) */}
              {activeView === 'front' ? (
                <g
                  className="cursor-pointer group transition-all"
                  onClick={() => handleRegionClick('abdomen')}
                >
                  <path
                    d="M60 145H140C138 185 130 205 100 205C70 205 62 185 60 145Z"
                    className={`transition-all duration-200 ${
                      selectedRegionId === 'abdomen'
                        ? 'fill-teal-500 stroke-teal-300 stroke-2'
                        : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200 dark:hover:fill-teal-900'
                    }`}
                    filter={selectedRegionId === 'abdomen' ? 'url(#activeGlow)' : undefined}
                  />
                  <circle cx="100" cy="172" r="2" fill="#ffffff" fillOpacity="0.6" />
                </g>
              ) : (
                <g
                  className="cursor-pointer group transition-all"
                  onClick={() => handleRegionClick('back')}
                >
                  <path
                    d="M60 145H140C138 185 130 205 100 205C70 205 62 185 60 145Z"
                    className={`transition-all duration-200 ${
                      selectedRegionId === 'back'
                        ? 'fill-teal-500 stroke-teal-300 stroke-2'
                        : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200 dark:hover:fill-teal-900'
                    }`}
                    filter={selectedRegionId === 'back' ? 'url(#activeGlow)' : undefined}
                  />
                  <line x1="100" y1="145" x2="100" y2="200" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="3 2" />
                </g>
              )}

              {/* Arms (Left & Right) */}
              <g
                className="cursor-pointer group transition-all"
                onClick={() => handleRegionClick('arms')}
              >
                {/* Left Arm */}
                <path
                  d="M68 90L46 170C44 175 40 180 34 180C30 180 28 175 32 165L56 88Z"
                  className={`transition-all duration-200 ${
                    selectedRegionId === 'arms'
                      ? 'fill-teal-500 stroke-teal-300 stroke-2'
                      : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200'
                  }`}
                  filter={selectedRegionId === 'arms' ? 'url(#activeGlow)' : undefined}
                />
                {/* Right Arm */}
                <path
                  d="M132 90L154 170C156 175 160 180 166 180C170 180 172 175 168 165L144 88Z"
                  className={`transition-all duration-200 ${
                    selectedRegionId === 'arms'
                      ? 'fill-teal-500 stroke-teal-300 stroke-2'
                      : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200'
                  }`}
                  filter={selectedRegionId === 'arms' ? 'url(#activeGlow)' : undefined}
                />
              </g>

              {/* Hands & Wrists */}
              <g
                className="cursor-pointer group transition-all"
                onClick={() => handleRegionClick('hands')}
              >
                <ellipse
                  cx="28"
                  cy="195"
                  rx="7"
                  ry="12"
                  className={`transition-all duration-200 ${
                    selectedRegionId === 'hands'
                      ? 'fill-teal-500 stroke-teal-300 stroke-2'
                      : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200'
                  }`}
                  filter={selectedRegionId === 'hands' ? 'url(#activeGlow)' : undefined}
                />
                <ellipse
                  cx="172"
                  cy="195"
                  rx="7"
                  ry="12"
                  className={`transition-all duration-200 ${
                    selectedRegionId === 'hands'
                      ? 'fill-teal-500 stroke-teal-300 stroke-2'
                      : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200'
                  }`}
                  filter={selectedRegionId === 'hands' ? 'url(#activeGlow)' : undefined}
                />
              </g>

              {/* Legs & Hips */}
              <g
                className="cursor-pointer group transition-all"
                onClick={() => handleRegionClick('legs')}
              >
                {/* Left Leg */}
                <path
                  d="M66 205L70 330C71 340 76 345 82 345C88 345 92 338 92 325L98 205Z"
                  className={`transition-all duration-200 ${
                    selectedRegionId === 'legs'
                      ? 'fill-teal-500 stroke-teal-300 stroke-2'
                      : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200'
                  }`}
                  filter={selectedRegionId === 'legs' ? 'url(#activeGlow)' : undefined}
                />
                {/* Right Leg */}
                <path
                  d="M134 205L130 330C129 340 124 345 118 345C112 345 108 338 108 325L102 205Z"
                  className={`transition-all duration-200 ${
                    selectedRegionId === 'legs'
                      ? 'fill-teal-500 stroke-teal-300 stroke-2'
                      : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200'
                  }`}
                  filter={selectedRegionId === 'legs' ? 'url(#activeGlow)' : undefined}
                />
              </g>

              {/* Feet & Ankles */}
              <g
                className="cursor-pointer group transition-all"
                onClick={() => handleRegionClick('feet')}
              >
                <ellipse
                  cx="76"
                  cy="365"
                  rx="10"
                  ry="16"
                  className={`transition-all duration-200 ${
                    selectedRegionId === 'feet'
                      ? 'fill-teal-500 stroke-teal-300 stroke-2'
                      : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200'
                  }`}
                  filter={selectedRegionId === 'feet' ? 'url(#activeGlow)' : undefined}
                />
                <ellipse
                  cx="124"
                  cy="365"
                  rx="10"
                  ry="16"
                  className={`transition-all duration-200 ${
                    selectedRegionId === 'feet'
                      ? 'fill-teal-500 stroke-teal-300 stroke-2'
                      : 'fill-slate-300 dark:fill-slate-700 hover:fill-teal-200'
                  }`}
                  filter={selectedRegionId === 'feet' ? 'url(#activeGlow)' : undefined}
                />
              </g>
            </svg>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {Object.keys(BODY_REGIONS).map((regKey) => {
              const reg = BODY_REGIONS[regKey];
              const isSelected = selectedRegionId === regKey;
              return (
                <button
                  key={regKey}
                  onClick={() => handleRegionClick(regKey)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {reg.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Region Details, Symptoms & Triage */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Search bar for accessibility */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search body part or symptom (e.g., headache, knee, asthma)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
            />
            {searchQuery && (
              <div className="absolute z-10 top-12 left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-2 max-h-56 overflow-y-auto">
                {filteredRegions.length > 0 ? (
                  filteredRegions.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        handleRegionClick(r.id);
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-2.5 hover:bg-teal-50 dark:hover:bg-slate-700 rounded-lg text-sm flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{r.name}</span>
                      <span className="text-xs text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-slate-900 px-2 py-0.5 rounded-full">
                        {r.category}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-xs text-slate-400 text-center">No regions match your search</div>
                )}
              </div>
            )}
          </div>

          {/* Selected Region Card */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200/70 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 tracking-wide uppercase">
                  {selectedRegion.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedRegion.name}
                </h3>
              </div>
              <span className="text-xs px-3 py-1 bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 rounded-full font-medium">
                Active Selection
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              {selectedRegion.description}
            </p>

            {/* Common Symptoms Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Select Common Symptoms for this Region:
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedRegion.commonSymptoms.map((symp) => {
                  const isChecked = selectedSymptoms.includes(symp);
                  return (
                    <button
                      key={symp}
                      onClick={() => toggleSymptom(symp)}
                      className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all ${
                        isChecked
                          ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400'
                      }`}
                    >
                      {isChecked ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                      <span>{symp}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clinical Triage Check Questions */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                Contextual Questions to Consider:
              </span>
              <ul className="space-y-1.5">
                {selectedRegion.triageQuestions.map((q, idx) => (
                  <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flag Warning Box */}
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl p-3.5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300">
                  Critical Warning Signs (Seek Emergency Evaluation):
                </h4>
                <ul className="mt-1 space-y-0.5">
                  {selectedRegion.redFlags.map((flag, idx) => (
                    <li key={idx} className="text-xs text-rose-700 dark:text-rose-400">
                      • {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Button: Create Health Problem Entry */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {selectedSymptoms.length > 0
                ? `${selectedSymptoms.length} symptom(s) chosen`
                : 'Select symptoms or log directly'}
            </span>
            <button
              onClick={() => {
                if (onLogProblem) {
                  onLogProblem(selectedRegionId, selectedSymptoms[0] || selectedRegion.commonSymptoms[0]);
                }
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow flex items-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Problem for {selectedRegion.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
