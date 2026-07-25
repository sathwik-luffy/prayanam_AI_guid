import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Bus,
  Train,
  Car,
  Footprints,
  Sparkles,
  CheckCircle2,
  Bookmark,
  SlidersHorizontal,
  TrendingDown,
  ArrowDown,
  ShieldCheck,
  Zap,
  User,
  Users,
  Moon,
  HeartHandshake,
  Map,
  X,
  ArrowLeft
} from 'lucide-react';
import { LogoIcon } from './components/LogoIcon';

// Trains Moving in Greenery Field Graphic Component
const TrainGreeneryGraphic = () => (
  <div className="relative w-full h-48 sm:h-60 rounded-3xl overflow-hidden bg-gradient-to-b from-sky-400 via-[#87CEEB] to-[#4CAF50] p-5 flex flex-col justify-between shadow-lg border border-emerald-400/40">
    {/* Sun and Clouds Header */}
    <div className="flex justify-between items-start z-10">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-950 shadow-sm border border-white/60">
        <Sparkles size={14} className="text-amber-500 animate-spin" />
        <span>Lush Greenery Express Corridor</span>
      </div>
      <div className="w-10 h-10 rounded-full bg-amber-300 shadow-[0_0_25px_rgba(252,211,77,0.9)] animate-pulse" />
    </div>

    {/* Rolling Greenery Hills (SVG Background) */}
    <svg
      className="absolute bottom-0 left-0 right-0 w-full h-36 pointer-events-none z-0"
      viewBox="0 0 1200 320"
      preserveAspectRatio="none"
    >
      <path
        fill="#388E3C"
        fillOpacity="0.7"
        d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,181.3C960,171,1056,181,1152,186.7L1200,192L1200,320L1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
      <path
        fill="#2E7D32"
        d="M0,256L60,240C120,224,240,192,360,197.3C480,203,600,245,720,245.3C840,245,960,203,1080,192L1200,181.3L1200,320L1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      />
    </svg>

    {/* Railway Track Layer */}
    <div className="absolute bottom-7 left-0 right-0 h-8 border-t-2 border-b-2 border-amber-900/70 bg-amber-950/20 z-10 overflow-hidden flex items-center">
      <div className="w-full h-full bg-[repeating-linear-gradient(90deg,#5D4037_0px,#5D4037_6px,transparent_6px,transparent_24px)]" />
    </div>

    {/* Keyframe animations for moving trains & buses */}
    <style>{`
      @keyframes trainTrackRun {
        0% { transform: translateX(-120%); }
        100% { transform: translateX(420%); }
      }
      @keyframes busTrackRun {
        0% { transform: translateX(420%); }
        100% { transform: translateX(-120%); }
      }
      .animate-train-field-run {
        animation: trainTrackRun 13s linear infinite;
      }
      .animate-bus-field-run {
        animation: busTrackRun 17s linear infinite;
      }
    `}</style>

    {/* Animated High-Speed Train Moving Across Track in Greenery */}
    <div className="absolute bottom-6 left-0 z-20 animate-train-field-run flex items-center gap-1">
      <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-400 text-white px-4 py-2 rounded-r-2xl rounded-l-md shadow-xl flex items-center gap-2 border border-white/40">
        <Train size={20} className="text-amber-300 animate-bounce" />
        <span className="text-xs font-extrabold tracking-wider uppercase">Metro Express</span>
      </div>
      <div className="bg-white/90 text-emerald-900 px-3 py-1.5 rounded-md text-[11px] font-bold shadow-md border border-emerald-200">
        CAR-101
      </div>
      <div className="bg-white/90 text-emerald-900 px-3 py-1.5 rounded-md text-[11px] font-bold shadow-md border border-emerald-200">
        CAR-102
      </div>
    </div>

    {/* Animated RTC Bus moving in parallel */}
    <div className="absolute bottom-2 animate-bus-field-run z-10 flex items-center">
      <div className="bg-amber-500 text-black px-3 py-1 rounded-lg text-[10px] font-extrabold shadow-md flex items-center gap-1 border border-amber-300">
        <Bus size={14} />
        <span>RTC Bus 218D</span>
      </div>
    </div>

    {/* Footer Info */}
    <div className="relative z-10 flex justify-between items-end text-white text-xs font-semibold">
      <div className="bg-emerald-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 text-emerald-100 flex items-center gap-1.5">
        <ShieldCheck size={14} className="text-emerald-400" />
        <span>Zero-Carbon Rail & Transit System</span>
      </div>
      <div className="text-[11px] bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg text-white/90 font-medium">
        Live Train Coordinates Syncing
      </div>
    </div>
  </div>
);

// Household Profiles Data
interface Profile {
  id: string;
  name: string;
  relation: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  isSenior: boolean;
  avatarBg: string;
}

const HOUSEHOLD_PROFILES: Profile[] = [
  { id: 'p1', name: 'Sathwik', relation: 'Primary User', age: 24, gender: 'Male', isSenior: false, avatarBg: 'bg-sky-600' },
  { id: 'p2', name: 'Sunitha', relation: 'Grandmother', age: 68, gender: 'Female', isSenior: true, avatarBg: 'bg-purple-600' },
  { id: 'p3', name: 'Ananya', relation: 'Sister (Night Commuter)', age: 21, gender: 'Female', isSenior: false, avatarBg: 'bg-rose-600' },
  { id: 'p4', name: 'Ramesh', relation: 'Father', age: 56, gender: 'Male', isSenior: false, avatarBg: 'bg-emerald-600' },
];

interface GetStartedPageProps {
  onBackToLanding: () => void;
}

export const GetStartedPage: React.FC<GetStartedPageProps> = ({ onBackToLanding }) => {
  const [activeProfile, setActiveProfile] = useState<Profile>(HOUSEHOLD_PROFILES[0]);
  const [journeyTimeMode, setJourneyTimeMode] = useState<'now' | 'night' | 'peak' | 'later'>('now');

  // Location Inputs
  const [fromMode, setFromMode] = useState<'search' | 'gps' | 'map'>('gps');
  const [fromSearch, setFromSearch] = useState<string>('Home (Madhapur)');
  const [toMode, setToMode] = useState<'search' | 'map' | 'saved'>('search');
  const [toSearch, setToSearch] = useState<string>('Nexus Mall (Kukatpally)');
  const [showMapPickerModal, setShowMapPickerModal] = useState<boolean>(false);

  // Preference Settings
  const [preference, setPreference] = useState<'fastest' | 'cheapest' | 'rtc' | 'metro'>('fastest');
  const [leastWalking, setLeastWalking] = useState<boolean>(false);
  const [fewestTransfers, setFewestTransfers] = useState<boolean>(false);

  // AI Auto-Adjustment Algorithm Effect
  useEffect(() => {
    if (activeProfile.isSenior || activeProfile.age >= 60) {
      setLeastWalking(true);
      setFewestTransfers(true);
      setPreference('metro');
    } else if (activeProfile.gender === 'Female' && (journeyTimeMode === 'night' || journeyTimeMode === 'later')) {
      setLeastWalking(true);
      setFewestTransfers(true);
      setPreference('metro');
    } else if (journeyTimeMode === 'peak') {
      setPreference('metro');
    } else {
      setPreference('fastest');
    }
  }, [activeProfile, journeyTimeMode]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black font-sans flex flex-col antialiased">
      
      {/* Top Header Bar */}
      <header className="bg-black text-white px-6 py-4 border-b border-gray-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-[88rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToLanding}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back to Halo Landing</span>
            </button>

            <div className="flex items-center gap-2">
              <LogoIcon className="w-6 h-6 text-white" />
              <span className="font-semibold text-base">USD Halo Smart Transit Engine</span>
            </div>
          </div>

          {/* HOUSEHOLD PROFILE SWITCHER */}
          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/15 overflow-x-auto w-full sm:w-auto">
            <div className="flex items-center gap-1 text-[11px] text-white/70 px-2 shrink-0">
              <Users size={14} className="text-amber-400" />
              <span>Household:</span>
            </div>
            {HOUSEHOLD_PROFILES.map((profile) => {
              const isSelected = activeProfile.id === profile.id;
              return (
                <button
                  key={profile.id}
                  onClick={() => setActiveProfile(profile)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isSelected
                      ? `${profile.avatarBg} text-white shadow-md font-bold scale-105`
                      : 'bg-white/5 text-white/80 hover:bg-white/15'
                  }`}
                >
                  <User size={12} />
                  <span>{profile.name} ({profile.age}{profile.gender[0]})</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="flex-1 max-w-[88rem] mx-auto w-full px-6 py-8 space-y-8">
        
        {/* Visual Graphic Banner */}
        <TrainGreeneryGraphic />

        {/* AI CONTEXT & SAFETY RULE STATUS BANNER */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-black uppercase tracking-wide flex items-center gap-2">
                <span>Active Context & Safety Profile:</span>
                <span className="text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full text-xs">
                  {activeProfile.name} ({activeProfile.age} yrs • {activeProfile.gender})
                </span>
              </h2>
              <p className="text-xs text-gray-600 mt-1 font-medium">
                {activeProfile.isSenior || activeProfile.age >= 60 ? (
                  <span className="text-purple-700 font-semibold flex items-center gap-1">
                    <HeartHandshake size={15} />
                    Senior Citizen Rule Active: Max walking locked to &lt; 300m • Direct elevator & ramp access auto-enabled
                  </span>
                ) : activeProfile.gender === 'Female' && (journeyTimeMode === 'night' || journeyTimeMode === 'later') ? (
                  <span className="text-rose-700 font-semibold flex items-center gap-1">
                    <Moon size={15} />
                    Night Safety Guard Active: Dark isolated paths restricted • Safe CCTV corridors & direct Metro prioritized
                  </span>
                ) : journeyTimeMode === 'peak' ? (
                  <span className="text-amber-700 font-semibold flex items-center gap-1">
                    <Zap size={15} />
                    Peak Hours Traffic Bypass: Prioritizing Grade-Separated Metro & Elevated Express Buses
                  </span>
                ) : (
                  <span className="text-sky-700 font-semibold">
                    Primary Adult Commuter: Optimized for fastest transit times and minimal cost
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Journey Time Selector */}
          <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-2xl border border-gray-200 text-xs shrink-0 font-medium">
            <button
              onClick={() => setJourneyTimeMode('now')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                journeyTimeMode === 'now' ? 'bg-black text-white shadow-sm' : 'text-gray-600 hover:text-black'
              }`}
            >
              Now (Real-Time)
            </button>
            <button
              onClick={() => setJourneyTimeMode('night')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                journeyTimeMode === 'night' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-600 hover:text-black'
              }`}
            >
              Night Mode
            </button>
            <button
              onClick={() => setJourneyTimeMode('peak')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                journeyTimeMode === 'peak' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-600 hover:text-black'
              }`}
            >
              Peak Hours
            </button>
          </div>
        </div>

        {/* INPUT FORM: FROM, TO, REFINED PREFERENCES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* FROM LOCATION SOURCE */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs tracking-wider uppercase">
                <MapPin size={16} />
                <span>FROM (ORIGIN SOURCE)</span>
              </div>
              <span className="text-[11px] text-gray-400 font-semibold">GPS Active</span>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold text-center">
              <button
                onClick={() => setFromMode('search')}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  fromMode === 'search' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                }`}
              >
                Search
              </button>
              <button
                onClick={() => {
                  setFromMode('gps');
                  setFromSearch('Current Location (GPS)');
                }}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  fromMode === 'gps' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                }`}
              >
                GPS
              </button>
              <button
                onClick={() => setShowMapPickerModal(true)}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  fromMode === 'map' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                }`}
              >
                Pick Map
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={fromSearch}
                onChange={(e) => setFromSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-black font-semibold outline-none focus:border-black shadow-inner"
                placeholder="Search origin location..."
              />
              {fromMode === 'gps' && (
                <Navigation size={14} className="absolute right-3.5 top-3.5 text-emerald-600 animate-pulse" />
              )}
            </div>
          </div>

          {/* TO LOCATION SOURCE */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs tracking-wider uppercase">
                <Navigation size={16} />
                <span>TO (DESTINATION SOURCE)</span>
              </div>
              <span className="text-[11px] text-gray-400 font-semibold">Saved Places</span>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold text-center">
              <button
                onClick={() => setToMode('search')}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  toMode === 'search' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                }`}
              >
                Search
              </button>
              <button
                onClick={() => setShowMapPickerModal(true)}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  toMode === 'map' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                }`}
              >
                Pick Map
              </button>
              <button
                onClick={() => {
                  setToMode('saved');
                  setToSearch('Saved: Nexus Mall (Kukatpally)');
                }}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  toMode === 'saved' ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'
                }`}
              >
                Saved
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={toSearch}
                onChange={(e) => setToSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-black font-semibold outline-none focus:border-black shadow-inner"
                placeholder="Destination..."
              />
              {toMode === 'saved' && (
                <Bookmark size={14} className="absolute right-3.5 top-3.5 text-amber-500" />
              )}
            </div>
          </div>

          {/* REFINED PREFERENCES (AI CONTEXT CHECKED) */}
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between text-sky-700 font-bold text-xs tracking-wider uppercase">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} />
                <span>Refined Preferences</span>
              </div>
              <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-md font-semibold">
                Auto-Selected
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
              <button
                onClick={() => setPreference('fastest')}
                className={`px-3 py-2 rounded-xl border flex items-center justify-between cursor-pointer ${
                  preference === 'fastest'
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>Fastest</span>
                {preference === 'fastest' && <CheckCircle2 size={13} className="text-white" />}
              </button>

              <button
                onClick={() => setPreference('cheapest')}
                className={`px-3 py-2 rounded-xl border flex items-center justify-between cursor-pointer ${
                  preference === 'cheapest'
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>Cheapest</span>
                {preference === 'cheapest' && <CheckCircle2 size={13} className="text-white" />}
              </button>

              <button
                onClick={() => setPreference('rtc')}
                className={`px-3 py-2 rounded-xl border flex items-center justify-between cursor-pointer ${
                  preference === 'rtc'
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>RTC Bus</span>
                {preference === 'rtc' && <CheckCircle2 size={13} className="text-white" />}
              </button>

              <button
                onClick={() => setPreference('metro')}
                className={`px-3 py-2 rounded-xl border flex items-center justify-between cursor-pointer ${
                  preference === 'metro'
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>Metro Only</span>
                {preference === 'metro' && <CheckCircle2 size={13} className="text-white" />}
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-gray-700 font-semibold">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={leastWalking}
                  onChange={(e) => setLeastWalking(e.target.checked)}
                  className="accent-black rounded"
                />
                <span className={activeProfile.isSenior ? 'text-purple-700 font-bold' : ''}>
                  Least Walking {activeProfile.isSenior && '(<300m)'}
                </span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={fewestTransfers}
                  onChange={(e) => setFewestTransfers(e.target.checked)}
                  className="accent-black rounded"
                />
                <span>Fewest Transfers</span>
              </label>
            </div>
          </div>

        </div>

        {/* GENERATED MULTIMODAL ROUTE RESULTS */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              <span>Optimized Multimodal Journey Options</span>
              <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-medium">
                Profile: {activeProfile.name}
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* BEST AI AUTO-RECOMMENDED ROUTE */}
            <div className="bg-emerald-50/80 border border-emerald-300 p-6 rounded-3xl flex flex-col justify-between gap-4 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-700 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Auto-Selected Best Route for {activeProfile.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full border border-emerald-400">
                    {activeProfile.isSenior ? '₹60 • Low Walking (<180m)' : activeProfile.gender === 'Female' && journeyTimeMode === 'night' ? '₹60 • Safe CCTV Corridor' : '₹130 • 44 min'}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-gray-800 font-semibold">
                {activeProfile.isSenior ? (
                  <>
                    <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-emerald-200">
                      <Car size={16} className="text-amber-600 shrink-0" />
                      <span>Doorstep Picked Auto → KPHB Metro Elevator Gate</span>
                      <span className="ml-auto text-emerald-700 font-extrabold">120m walk</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-emerald-200">
                      <Train size={16} className="text-purple-600 shrink-0" />
                      <span>Metro Express (Escalator & Ramp Direct Access)</span>
                      <span className="ml-auto text-gray-500">Zero Transfers</span>
                    </div>
                  </>
                ) : activeProfile.gender === 'Female' && (journeyTimeMode === 'night' || journeyTimeMode === 'later') ? (
                  <>
                    <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-emerald-200">
                      <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                      <span>Verified CCTV Monitored Metro Express</span>
                      <span className="ml-auto text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">Safe Corridor</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-emerald-200">
                      <Car size={16} className="text-amber-600 shrink-0" />
                      <span>Direct Verified Auto/Cab to Doorstep</span>
                      <span className="ml-auto text-gray-500">Live SOS Guard</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-emerald-200">
                      <Car size={16} className="text-amber-600 shrink-0" />
                      <span>Auto: Home → KPHB Metro Station</span>
                      <span className="ml-auto text-gray-500">₹70 (10m)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-emerald-200">
                      <Train size={16} className="text-purple-600 shrink-0" />
                      <span>Metro: KPHB → Raidurg Terminal</span>
                      <span className="ml-auto text-gray-500">₹60 (28m)</span>
                    </div>
                  </>
                )}
              </div>

              <div className="bg-emerald-100 p-3 rounded-2xl border border-emerald-300 flex items-center justify-between text-xs text-emerald-950 font-bold">
                <span className="flex items-center gap-1.5">
                  <TrendingDown size={16} className="text-emerald-700" />
                  <span>Optimal 99% Context Match for {activeProfile.name}</span>
                </span>
                <button className="bg-emerald-800 text-white px-4 py-1.5 rounded-xl font-bold hover:bg-emerald-900 transition-all cursor-pointer shadow-sm">
                  Book Journey
                </button>
              </div>
            </div>

            {/* ROUTE 2: RTC BUS / WOMEN ZERO TICKET PASS */}
            <div className="bg-white border border-gray-200 p-6 rounded-3xl flex flex-col justify-between gap-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <Bus size={16} />
                  Route 2 — RTC City Bus Express
                </span>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {activeProfile.gender === 'Female' ? '₹0 (Mahalakshmi Women Pass)' : '₹35'}
                  </span>
                  <span className="text-gray-500">52 min</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-gray-800 font-semibold">
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                  <Footprints size={16} className="text-emerald-600 shrink-0" />
                  <span>Walk 220m to RTC Stop</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-200">
                  <Bus size={16} className="text-amber-600 shrink-0" />
                  <span>RTC Bus 218D Express</span>
                  {activeProfile.gender === 'Female' && (
                    <span className="ml-auto bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md font-extrabold text-[10px]">
                      Zero Ticket Women Privilege
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-xs text-gray-600 font-semibold">
                <span>Economical Public Transit</span>
                <button className="bg-black text-white px-4 py-1.5 rounded-xl font-bold hover:bg-gray-800 transition-colors cursor-pointer shadow-sm">
                  Select Route
                </button>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* MAP PICKER MODAL SIMULATION */}
      {showMapPickerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg p-6 rounded-3xl border border-gray-200 text-black space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <Map size={20} />
                <span>Pick Location From Interactive Map</span>
              </div>
              <button onClick={() => setShowMapPickerModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={18} />
              </button>
            </div>
            
            <div className="h-52 rounded-2xl bg-emerald-950/20 border border-emerald-400 flex items-center justify-center text-xs text-emerald-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#388E3C_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
              <div className="relative z-10 flex flex-col items-center gap-2 text-center p-4">
                <MapPin size={36} className="text-amber-500 animate-bounce" />
                <span className="font-extrabold text-sm text-black">Pinned: Kukatpally Metro Hub</span>
                <span className="text-xs text-gray-600 font-semibold">Tap anywhere on the city map grid to set location</span>
              </div>
            </div>

            <button
              onClick={() => {
                setFromSearch('Pinned Map: Kukatpally Metro');
                setShowMapPickerModal(false);
              }}
              className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-all cursor-pointer text-xs shadow-md"
            >
              Confirm Location Pin
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-200 py-8 px-6 border-t border-gray-300 mt-12 text-xs text-gray-600 font-semibold">
        <div className="max-w-[88rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LogoIcon className="w-5 h-5 text-black" />
            <span className="text-black font-bold">Prayanam Smart Transit Network</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <button onClick={onBackToLanding} className="hover:text-black transition-colors underline cursor-pointer">
            Return to USD Halo Landing Page
          </button>
        </div>
      </footer>

    </div>
  );
};
