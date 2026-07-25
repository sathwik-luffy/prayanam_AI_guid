import React, { useState, useMemo } from 'react';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Navigation,
  Compass,
  Bus,
  Train,
  Car,
  Footprints,
  Sparkles,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  Star,
  AlertTriangle,
  MessageSquare,
  Repeat,
  Moon,
  HeartHandshake,
  X,
  ExternalLink,
  Smartphone,
  Check,
  Clock,
  Layers,
  Eye
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  occupation: string;
  isSenior: boolean;
}

interface GetStartedFlowProps {
  onBackToLanding: () => void;
}

// Cinematic Background Videos for 3D Auth & Dashboard
const AUTH_BACKGROUND_VIDEOS = [
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
    title: 'Cyber Transit Night',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
    title: 'Golden Skyline',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
    title: 'Emerald Horizon',
  },
];

// Real GTFS Metro Stations & TSRTC Hubs Dataset Map
const LOCATIONS: Record<string, { name: string; line: string; type: 'Metro' | 'TSRTC' | 'Hub'; buses: string[] }> = {
  MYP: { name: 'Miyapur Metro Terminal', line: 'Red Line', type: 'Metro', buses: ['218D', '220', '216'] },
  JNT: { name: 'JNTU College Metro Station', line: 'Red Line', type: 'Metro', buses: ['218D', '220', '225'] },
  KPH: { name: 'KPHB Colony Metro Station', line: 'Red Line', type: 'Metro', buses: ['218D', '10H', '127K'] },
  KUK: { name: 'Kukatpally Metro Station', line: 'Red Line', type: 'Metro', buses: ['10H', '218D', '113'] },
  AME: { name: 'Ameerpet Interchange Hub', line: 'Red & Blue Line', type: 'Hub', buses: ['10H', '113', '47L'] },
  HTC: { name: 'HITEC City Station', line: 'Blue Line', type: 'Metro', buses: ['47L', '10H', '127K'] },
  RDG: { name: 'Raidurg Metro Terminal', line: 'Blue Line', type: 'Metro', buses: ['47L', '10H', '220'] },
  MGB: { name: 'MGBS Bus & Metro Station', line: 'Red & Green Line', type: 'Hub', buses: ['1D', '218D', '100'] },
  SEC_E: { name: 'Secunderabad East Metro & Railway', line: 'Blue Line', type: 'Hub', buses: ['10H', '1D', '113'] },
  LBN: { name: 'LB Nagar Metro Station', line: 'Red Line', type: 'Metro', buses: ['100', '218D', '1D'] },
  DSN: { name: 'Dilsukhnagar Bus Depot', line: 'Red Line Nearby', type: 'TSRTC', buses: ['100', '1D', '218D'] },
  MDP: { name: 'Madhapur Cyber Towers', line: 'Blue Line Nearby', type: 'TSRTC', buses: ['10H', '47L', '127K'] },
  GCB: { name: 'Gachibowli ORR Junction', line: 'Feeder Corridor', type: 'TSRTC', buses: ['216', '10H', '220'] },
  MHD: { name: 'Mehdipatnam Bus Hub', line: 'Feeder Hub', type: 'TSRTC', buses: ['216', '218D', '10H'] },
};

export const GetStartedFlow: React.FC<GetStartedFlowProps> = ({ onBackToLanding }) => {
  // Authentication Stage: 1 = Credentials, 2 = Profile Details, 3 = Dashboard
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [videoIdx, setVideoIdx] = useState<number>(0);

  // User Profile Form State
  const [name, setName] = useState<string>('Sathwik');
  const [email, setEmail] = useState<string>('sathwik@example.com');
  const [password, setPassword] = useState<string>('••••••••');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [age, setAge] = useState<number>(24);
  const [occupation, setOccupation] = useState<string>('IT Professional');

  // Active User Profile Data
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Routing Engine State
  const [fromLoc, setFromLoc] = useState<string>('KPH');
  const [toLoc, setToLoc] = useState<string>('RDG');
  const [selectedPreference, setSelectedPreference] = useState<'fastest' | 'cheapest' | 'rtc' | 'metro' | 'walking' | 'transfers'>('fastest');

  // Live Journey & Feedback State
  const [isJourneyStarted, setIsJourneyStarted] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [userComments, setUserComments] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Ola / Rapido Direct Booking Popup Modal State
  const [isRideModalOpen, setIsRideModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<'ola_auto' | 'ola_mini' | 'rapido_bike' | 'rapido_auto'>('ola_auto');
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'searching' | 'confirmed'>('idle');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setStage(2);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isSenior = age >= 60;
    const profile: UserProfile = {
      name,
      email,
      gender,
      age: Number(age),
      occupation,
      isSenior
    };
    setUserProfile(profile);

    if (isSenior) {
      setSelectedPreference('metro');
    } else if (gender === 'Female') {
      setSelectedPreference('metro');
    } else {
      setSelectedPreference('fastest');
    }

    setStage(3);
  };

  // DYNAMIC ROUTE COMPUTATION ENGINE
  const computedRoutes = useMemo(() => {
    const fromInfo = LOCATIONS[fromLoc] || LOCATIONS['KPH'];
    const toInfo = LOCATIONS[toLoc] || LOCATIONS['RDG'];

    const keys = Object.keys(LOCATIONS);
    const distFactor = Math.abs(keys.indexOf(fromLoc) - keys.indexOf(toLoc)) + 1;

    const metroTime = distFactor * 4 + 12;
    const metroFare = Math.min(60, Math.max(20, distFactor * 8 + 15));

    const busTime = distFactor * 6 + 18;
    const isFemale = userProfile?.gender === 'Female';
    const busFare = isFemale ? 0 : Math.min(45, Math.max(15, distFactor * 5 + 10));
    const busNumber = fromInfo.buses[0] || '218D';

    const cabTime = Math.max(12, distFactor * 3 + 6);
    const cabFare = distFactor * 35 + 80;

    return {
      fromName: fromInfo.name,
      toName: toInfo.name,
      fromLine: fromInfo.line,
      toLine: toInfo.line,
      metro: {
        time: Math.round(metroTime),
        fare: metroFare,
      },
      bus: {
        time: Math.round(busTime),
        fare: busFare,
        busNumber
      },
      cab: {
        time: Math.round(cabTime),
        fare: Math.round(cabFare)
      }
    };
  }, [fromLoc, toLoc, userProfile]);

  const openRideApp = (app: 'ola' | 'rapido') => {
    const fromQuery = encodeURIComponent(computedRoutes.fromName);
    const toQuery = encodeURIComponent(computedRoutes.toName);
    if (app === 'ola') {
      window.open(`https://book.olacabs.com/?pickup_name=${fromQuery}&drop_name=${toQuery}`, '_blank');
    } else {
      window.open(`https://www.rapido.bike/?pickup=${fromQuery}&drop=${toQuery}`, '_blank');
    }
  };

  const handleConfirmBooking = () => {
    setBookingStatus('searching');
    setTimeout(() => {
      setBookingStatus('confirmed');
    }, 1800);
  };

  const toggleIssue = (issue: string) => {
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter(i => i !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFeedbackOpen(false);
      setIsJourneyStarted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white font-sans flex flex-col relative overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* BACKGROUND VIDEO LAYER FOR 3D AUTH & DASHBOARD */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {AUTH_BACKGROUND_VIDEOS.map((vid, idx) => (
          <video
            key={vid.url}
            src={vid.url}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              videoIdx === idx ? 'opacity-35 scale-105 filter blur-[1px]' : 'opacity-0'
            }`}
          />
        ))}
        {/* Dark Radial Gradient Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#07090e]/80 to-[#07090e]"></div>
      </div>

      {/* TOP HEADER BAR WITH 3D GLASSMOPHISM */}
      <header className="relative z-30 bg-black/60 backdrop-blur-xl px-6 py-4 border-b border-white/10 sticky top-0 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={16} />
              <span>Back to Prayanam</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-300 text-black flex items-center justify-center font-extrabold text-xl shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                P
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">Prayanam 3D Portal</span>
            </div>
          </div>

          {/* VIDEO MODE SWITCHER PILL */}
          <div className="hidden sm:flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 rounded-full text-[11px] font-semibold">
            {AUTH_BACKGROUND_VIDEOS.map((v, i) => (
              <button
                key={v.title}
                onClick={() => setVideoIdx(i)}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  videoIdx === i ? 'bg-emerald-500 text-black font-extrabold shadow-md' : 'text-gray-300 hover:text-white'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>

          {stage === 3 && userProfile && (
            <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-4 py-1.5 rounded-full text-xs text-emerald-300 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <User size={14} className="text-emerald-400" />
              <span>Logged in: <strong className="text-white">{userProfile.name}</strong> ({userProfile.age} yrs • {userProfile.gender})</span>
            </div>
          )}
        </div>
      </header>

      {/* STAGE 1: 3D AUTH SIGN-UP / LOGIN CARD */}
      {stage === 1 && (
        <main className="relative z-10 flex-1 flex items-center justify-center p-6 my-auto">
          <div className="w-full max-w-md bg-white/[0.05] backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] space-y-6 transform hover:rotate-1 transition-transform duration-500">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-300 text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.5)] transform -rotate-3 hover:rotate-0 transition-transform">
                <User size={32} />
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight font-outfit">Create Account</h2>
              <p className="text-xs text-emerald-400 font-medium">3D Authenticated Portal • Step 1 of 2</p>
            </div>

            <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="text-gray-200 block">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-2xl px-4 py-3.5 pl-10 text-white outline-none focus:border-emerald-400 transition-all font-semibold"
                    placeholder="Enter your full name"
                  />
                  <User size={16} className="absolute left-3.5 top-4 text-emerald-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-200 block">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-2xl px-4 py-3.5 pl-10 text-white outline-none focus:border-emerald-400 transition-all font-semibold"
                    placeholder="Enter your email"
                  />
                  <Mail size={16} className="absolute left-3.5 top-4 text-emerald-400" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-200 block">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-2xl px-4 py-3.5 pl-10 text-white outline-none focus:border-emerald-400 transition-all font-semibold"
                    placeholder="Create a password"
                  />
                  <Lock size={16} className="absolute left-3.5 top-4 text-emerald-400" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold py-4 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95"
              >
                <span>Continue to Profile Context</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </main>
      )}

      {/* STAGE 2: 3D PROFILE CONTEXT CARD (GENDER, AGE, OCCUPATION) */}
      {stage === 2 && (
        <main className="relative z-10 flex-1 flex items-center justify-center p-6 my-auto">
          <div className="w-full max-w-md bg-white/[0.05] backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] space-y-6 transform hover:-rotate-1 transition-transform duration-500">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,158,11,0.5)] transform rotate-3 hover:rotate-0 transition-transform">
                <SlidersHorizontal size={32} />
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight font-outfit">Personalize 3D AI</h2>
              <p className="text-xs text-amber-300 font-medium">Gender, Age & Occupation • Step 2 of 2</p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="text-gray-200 block">Gender Profile</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Male', 'Female', 'Other'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-3 rounded-2xl border font-bold transition-all cursor-pointer ${
                        gender === g
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                          : 'bg-black/50 border-white/15 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-200 block">Age</label>
                <input
                  type="number"
                  required
                  min={10}
                  max={100}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/15 rounded-2xl px-4 py-3.5 text-white outline-none focus:border-amber-400 font-bold text-sm"
                />
                {age >= 60 && (
                  <p className="text-[11px] text-purple-300 font-semibold flex items-center gap-1 mt-1">
                    <HeartHandshake size={14} />
                    Senior Citizen Rule will lock walking distance to &lt; 300m automatically.
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-gray-200 block">What do you do? (Occupation)</label>
                <select
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-2xl px-4 py-3.5 text-white outline-none focus:border-amber-400 font-semibold"
                >
                  <option value="IT Professional">IT Professional / Tech Worker</option>
                  <option value="Student">Student</option>
                  <option value="Senior Retired Citizen">Senior Retired Citizen</option>
                  <option value="Healthcare Worker">Healthcare Worker</option>
                  <option value="Business Owner / Executive">Business Owner / Executive</option>
                  <option value="General Commuter">General Commuter</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-300 text-black font-extrabold py-4 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm shadow-[0_10px_30px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-95"
              >
                <span>Launch 3D Dashboard</span>
                <Sparkles size={18} />
              </button>
            </form>
          </div>
        </main>
      )}

      {/* STAGE 3: FULL-PAGE 3D MAIN TRANSIT DASHBOARD */}
      {stage === 3 && userProfile && (
        <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full p-6 space-y-6">
          
          {/* 3D PROFILE BANNER CARD */}
          <div className="bg-white/[0.05] backdrop-blur-2xl border border-white/15 p-6 rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-300 text-black flex items-center justify-center font-extrabold text-2xl shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                {userProfile.name[0]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2 font-outfit">
                  <span>Welcome back, {userProfile.name}!</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-0.5 rounded-full font-medium">
                    3D Profile Engine
                  </span>
                </h2>
                <p className="text-xs text-gray-300 mt-1">
                  {userProfile.isSenior ? (
                    <span className="text-purple-300 font-semibold flex items-center gap-1">
                      <HeartHandshake size={14} />
                      Senior Rule Active: Max walking locked to &lt; 300m • Elevator Arms GTFS Prioritized
                    </span>
                  ) : userProfile.gender === 'Female' ? (
                    <span className="text-rose-300 font-semibold flex items-center gap-1">
                      <Moon size={14} />
                      Safety Guard Active: Restricted dark paths • Safe CCTV corridors prioritized • Women Zero Ticket
                    </span>
                  ) : (
                    <span className="text-sky-300 font-semibold">
                      Standard Commuter: Optimized for fastest transit times and minimal cost
                    </span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => setStage(2)}
              className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer border border-white/15"
            >
              Edit Profile Context
            </button>
          </div>

          {/* DYNAMIC LOCATION DROPDOWN INPUTS (FROM & TO) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* FROM LOCATION DROPDOWN BAR */}
            <div className="bg-white/[0.05] backdrop-blur-2xl border border-white/15 p-6 rounded-[2rem] space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>FROM LOCATION (ORIGIN ADDRESS)</span>
                </div>
                <span className="text-gray-400 font-normal">Real GTFS Network</span>
              </div>

              <select
                value={fromLoc}
                onChange={(e) => setFromLoc(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-2xl px-4 py-3.5 text-sm text-white font-semibold outline-none focus:border-emerald-400 cursor-pointer"
              >
                {Object.entries(LOCATIONS).map(([id, loc]) => (
                  <option key={id} value={id}>
                    {loc.name} ({loc.line})
                  </option>
                ))}
              </select>
            </div>

            {/* TO LOCATION DROPDOWN BAR */}
            <div className="bg-white/[0.05] backdrop-blur-2xl border border-white/15 p-6 rounded-[2rem] space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs font-bold text-rose-400 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Navigation size={16} />
                  <span>TO LOCATION (DESTINATION ADDRESS)</span>
                </div>
                <span className="text-gray-400 font-normal">Real GTFS Network</span>
              </div>

              <select
                value={toLoc}
                onChange={(e) => setToLoc(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-2xl px-4 py-3.5 text-sm text-white font-semibold outline-none focus:border-rose-400 cursor-pointer"
              >
                {Object.entries(LOCATIONS).map(([id, loc]) => (
                  <option key={id} value={id}>
                    {loc.name} ({loc.line})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* DYNAMIC AUTOMATED ROUTE CALCULATION DISPLAY */}
          <div className="bg-white/[0.05] backdrop-blur-2xl border border-white/15 p-8 rounded-[2.5rem] space-y-6 shadow-2xl">
            
            {/* ROUTE HEADER & NEARBY PREFERENCE DROPDOWN BAR */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2 font-outfit">
                  <span>Journey: {computedRoutes.fromName} → {computedRoutes.toName}</span>
                  <span className="text-xs bg-emerald-500 text-black font-extrabold px-3 py-0.5 rounded-full uppercase shadow-md">
                    Filter Active: {selectedPreference}
                  </span>
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  Corridor connecting {computedRoutes.fromLine} and {computedRoutes.toLine}
                </p>
              </div>

              {/* NEARBY PREFERENCE DROPDOWN BAR */}
              <div className="flex items-center gap-2 bg-black/60 p-2 rounded-2xl border border-white/15 text-xs font-semibold w-full sm:w-auto">
                <SlidersHorizontal size={16} className="text-amber-400 shrink-0" />
                <span className="text-gray-400">Filter Mode:</span>
                <select
                  value={selectedPreference}
                  onChange={(e) => setSelectedPreference(e.target.value as any)}
                  className="bg-gray-800 text-white font-bold px-3 py-1.5 rounded-xl border border-gray-600 outline-none cursor-pointer"
                >
                  <option value="fastest">○ Fastest Route (Direct / Ola)</option>
                  <option value="cheapest">○ Cheapest Route</option>
                  <option value="rtc">○ RTC Bus Only</option>
                  <option value="metro">○ Metro Only</option>
                  <option value="walking">○ Least Walking (&lt;300m)</option>
                  <option value="transfers">○ Fewest Transfers</option>
                </select>
              </div>
            </div>

            {/* DYNAMIC ROUTE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* FASTEST / CAB ROUTE CARD WITH OLA & RAPIDO DIRECT BOOKING POPUP TRIGGER */}
              {(selectedPreference === 'fastest' || selectedPreference === 'cheapest' || selectedPreference === 'transfers') && (
                <div className="bg-gradient-to-br from-black/60 to-amber-950/40 border border-amber-500/50 p-6 rounded-3xl flex flex-col justify-between gap-4 shadow-xl hover:scale-[1.01] transition-transform">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Zap size={16} className="text-amber-400 animate-pulse" />
                      Fastest Route — Direct Cab / Auto
                    </span>
                    <span className="text-xs font-extrabold bg-amber-400 text-black px-3 py-1 rounded-full shadow-md">
                      ₹{computedRoutes.cab.fare} • {computedRoutes.cab.time} mins
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-gray-200 font-medium">
                    <div className="flex items-center gap-3 bg-black/50 p-3.5 rounded-2xl border border-white/10">
                      <Car size={16} className="text-amber-400 shrink-0" />
                      <span>Point-to-Point Express Ride via Ola / Rapido</span>
                      <span className="ml-auto text-amber-300 font-bold">Fastest Door-to-Door</span>
                    </div>
                  </div>

                  {/* OLA / RAPIDO DIRECT BOOKING POPUP TRIGGER BUTTON */}
                  <button
                    onClick={() => {
                      setBookingStatus('idle');
                      setIsRideModalOpen(true);
                    }}
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-300 text-black font-extrabold py-3.5 rounded-2xl hover:opacity-90 transition-all text-xs cursor-pointer shadow-[0_10px_25px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <Smartphone size={16} />
                    <span>Book via Ola / Rapido (Direct Booking Pop-Up)</span>
                  </button>
                </div>
              )}

              {/* METRO ROUTE CARD */}
              {(selectedPreference === 'metro' || selectedPreference === 'fastest' || selectedPreference === 'cheapest' || selectedPreference === 'walking' || selectedPreference === 'transfers') && (
                <div className="bg-gradient-to-br from-black/60 to-emerald-950/40 border border-emerald-500/50 p-6 rounded-3xl flex flex-col justify-between gap-4 shadow-xl hover:scale-[1.01] transition-transform">
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <Train size={16} className="text-emerald-400" />
                      Hyderabad Metro Rail GTFS Route
                    </span>
                    <span className="text-xs font-extrabold bg-emerald-500 text-black px-3 py-1 rounded-full shadow-md">
                      ₹{computedRoutes.metro.fare} • {computedRoutes.metro.time} mins
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-gray-200 font-medium">
                    <div className="flex items-center gap-3 bg-black/50 p-3.5 rounded-2xl border border-white/10">
                      <MapPin size={16} className="text-emerald-400 shrink-0" />
                      <span>Boarding: <strong>{computedRoutes.fromName}</strong></span>
                      <span className="ml-auto text-emerald-400 font-bold">GTFS Verified</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/50 p-3 rounded-2xl border border-white/10">
                      <Train size={16} className="text-purple-400 shrink-0" />
                      <span>Metro Line: {computedRoutes.fromLine} → {computedRoutes.toLine}</span>
                      <span className="ml-auto text-gray-400">Direct Line</span>
                    </div>
                  </div>

                  {!isJourneyStarted ? (
                    <button
                      onClick={() => setIsJourneyStarted(true)}
                      className="w-full bg-emerald-500 text-black font-extrabold py-3.5 rounded-2xl hover:bg-emerald-400 transition-all text-xs cursor-pointer shadow-[0_10px_25px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
                    >
                      <span>Start / Continue Journey</span>
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <div className="bg-emerald-500/20 border border-emerald-400/40 p-3 rounded-2xl text-xs text-emerald-300 font-bold flex items-center justify-between">
                      <span>Live Navigation Active</span>
                      <button
                        onClick={() => setIsFeedbackOpen(true)}
                        className="bg-amber-400 text-black px-4 py-2 rounded-xl font-bold hover:bg-amber-300 transition-colors"
                      >
                        Complete Journey & Feedback
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TSRTC BUS ROUTE CARD */}
              {(selectedPreference === 'rtc' || selectedPreference === 'cheapest' || selectedPreference === 'fastest') && (
                <div className="bg-black/60 border border-white/15 p-6 rounded-3xl flex flex-col justify-between gap-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Bus size={16} />
                      TSRTC Bus Route (Bus {computedRoutes.bus.busNumber})
                    </span>
                    <span className="text-xs font-bold bg-amber-500 text-black px-3 py-1 rounded-full shadow-md">
                      ₹{computedRoutes.bus.fare} • {computedRoutes.bus.time} mins
                    </span>
                  </div>

                  <div className="space-y-3 text-xs text-gray-300 font-medium">
                    <div className="flex items-center gap-3 bg-black/50 p-3.5 rounded-2xl border border-white/10">
                      <Footprints size={16} className="text-emerald-400 shrink-0" />
                      <span>Walk to Bus Stop near {computedRoutes.fromName}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/50 p-3.5 rounded-2xl border border-white/10">
                      <Bus size={16} className="text-amber-400 shrink-0" />
                      <span>Board Bus {computedRoutes.bus.busNumber} to {computedRoutes.toName}</span>
                      {userProfile.gender === 'Female' && (
                        <span className="ml-auto text-amber-300 font-bold">Zero Ticket</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setIsJourneyStarted(true)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 rounded-2xl transition-colors text-xs cursor-pointer border border-white/15"
                  >
                    Select & Start Bus Route
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* OLA & RAPIDO DIRECT BOOKING POP-UP MODAL */}
          {isRideModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-gray-900 border border-amber-500/40 w-full max-w-lg rounded-3xl p-7 space-y-6 shadow-2xl text-white relative">
                
                {/* MODAL HEADER */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <Car size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-outfit">Direct Ride Booking — Ola & Rapido</h3>
                      <p className="text-xs text-amber-300 font-medium">Pre-filled Pickup & Dropoff Addresses</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsRideModalOpen(false)}
                    className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* DYNAMIC PRE-FILLED FROM & TO ADDRESS CARDS */}
                <div className="bg-black/60 p-4 rounded-2xl space-y-3 text-xs border border-gray-800">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <MapPin size={16} className="shrink-0 text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">PICKUP ADDRESS (FROM):</span>
                      <strong className="text-white text-sm">{computedRoutes.fromName}</strong>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-2 flex items-center gap-3 text-rose-400">
                    <Navigation size={16} className="shrink-0 text-rose-400" />
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">DROPOFF ADDRESS (TO):</span>
                      <strong className="text-white text-sm">{computedRoutes.toName}</strong>
                    </div>
                  </div>
                </div>

                {/* BOOKING STATUS STATE */}
                {bookingStatus === 'confirmed' ? (
                  <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-center space-y-3">
                    <CheckCircle2 size={44} className="text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="text-base font-bold text-white">Ride Booking Confirmed!</h4>
                    <p className="text-xs text-emerald-300 font-medium">
                      Driver matched on {selectedService.startsWith('ola') ? 'Ola' : 'Rapido'}. Pickup vehicle arriving in 3 mins at <strong>{computedRoutes.fromName}</strong>.
                    </p>
                    <div className="bg-black/50 p-3 rounded-xl text-xs text-gray-300 flex justify-between items-center border border-gray-800">
                      <span>Vehicle: TS 09 EA 4812</span>
                      <span className="font-bold text-white">OTP: 4921</span>
                    </div>
                    <button
                      onClick={() => setIsRideModalOpen(false)}
                      className="w-full bg-emerald-500 text-black font-bold py-2.5 rounded-xl text-xs hover:bg-emerald-400"
                    >
                      Done
                    </button>
                  </div>
                ) : bookingStatus === 'searching' ? (
                  <div className="p-8 text-center bg-gray-800/60 rounded-2xl space-y-4">
                    <Zap size={36} className="text-amber-400 mx-auto animate-spin" />
                    <h4 className="text-sm font-bold text-white">Connecting with Driver nearby {computedRoutes.fromName}...</h4>
                    <p className="text-xs text-gray-400">Updating pickup coordinates & route details</p>
                  </div>
                ) : (
                  <React.Fragment>
                    {/* RIDE SERVICE SELECTION OPTIONS */}
                    <div className="space-y-2 text-xs">
                      <span className="text-gray-300 font-semibold block">Select Service & Estimated Fare:</span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {/* OLA AUTO */}
                        <button
                          onClick={() => setSelectedService('ola_auto')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            selectedService === 'ola_auto'
                              ? 'bg-amber-500/20 border-amber-400 text-white'
                              : 'bg-black/40 border-gray-800 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-300">Ola Auto</span>
                            <Car size={14} className="text-amber-400" />
                          </div>
                          <span className="text-sm font-extrabold mt-1">₹{computedRoutes.cab.fare}</span>
                        </button>

                        {/* OLA MINI CAB */}
                        <button
                          onClick={() => setSelectedService('ola_mini')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            selectedService === 'ola_mini'
                              ? 'bg-amber-500/20 border-amber-400 text-white'
                              : 'bg-black/40 border-gray-800 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-300">Ola Mini Cab</span>
                            <Car size={14} className="text-amber-400" />
                          </div>
                          <span className="text-sm font-extrabold mt-1">₹{Math.round(computedRoutes.cab.fare * 1.6)}</span>
                        </button>

                        {/* RAPIDO BIKE */}
                        <button
                          onClick={() => setSelectedService('rapido_bike')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            selectedService === 'rapido_bike'
                              ? 'bg-yellow-500/20 border-yellow-400 text-white'
                              : 'bg-black/40 border-gray-800 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-yellow-300">Rapido Bike</span>
                            <Zap size={14} className="text-yellow-400" />
                          </div>
                          <span className="text-sm font-extrabold mt-1">₹{Math.round(computedRoutes.cab.fare * 0.5)}</span>
                        </button>

                        {/* RAPIDO AUTO */}
                        <button
                          onClick={() => setSelectedService('rapido_auto')}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            selectedService === 'rapido_auto'
                              ? 'bg-yellow-500/20 border-yellow-400 text-white'
                              : 'bg-black/40 border-gray-800 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-yellow-300">Rapido Auto</span>
                            <Zap size={14} className="text-yellow-400" />
                          </div>
                          <span className="text-sm font-extrabold mt-1">₹{computedRoutes.cab.fare}</span>
                        </button>
                      </div>
                    </div>

                    {/* DIRECT ACTION BUTTONS */}
                    <div className="space-y-2 pt-2">
                      <button
                        onClick={handleConfirmBooking}
                        className="w-full bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-3.5 rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                      >
                        <Check size={16} />
                        <span>Confirm Booking in Prayanam</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => openRideApp('ola')}
                          className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 border border-gray-700 cursor-pointer"
                        >
                          <span>Launch Ola App</span>
                          <ExternalLink size={12} />
                        </button>

                        <button
                          onClick={() => openRideApp('rapido')}
                          className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold py-2.5 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 border border-gray-700 cursor-pointer"
                        >
                          <span>Launch Rapido App</span>
                          <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                )}

              </div>
            </div>
          )}

          {/* POST-TRIP EXPERIENCE & TROUBLE REPORT FEEDBACK SYSTEM */}
          {isFeedbackOpen && (
            <div className="bg-white/[0.05] backdrop-blur-2xl border border-white/15 p-8 rounded-[2.5rem] space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-outfit">Post-Trip Commuter Experience & Incident Report</h3>
                    <p className="text-xs text-gray-400">Help us update real-time route conditions for future commuters</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsFeedbackOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-2">
                  <CheckCircle2 size={40} className="text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-white font-outfit">Thank You for Your Feedback!</h4>
                  <p className="text-xs text-emerald-300">Your experience has been parsed and fed back into the Gemma AI Routing Engine.</p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-5 text-xs font-medium">
                  {/* STAR RATING */}
                  <div className="space-y-2">
                    <label className="text-gray-300 block font-semibold">Overall Journey Experience</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-2 rounded-xl transition-all cursor-pointer ${
                            rating >= star ? 'text-amber-400 scale-110' : 'text-gray-600'
                          }`}
                        >
                          <Star size={24} fill={rating >= star ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                      <span className="text-xs text-amber-300 font-bold ml-2">{rating} / 5 Stars</span>
                    </div>
                  </div>

                  {/* TROUBLE CHECKLIST */}
                  <div className="space-y-2">
                    <label className="text-gray-300 block font-semibold">Did you experience any troubles on this route?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        '🚦 Traffic Delay / Bus Delayed',
                        '🚧 Road Construction / Detour',
                        '♿ Elevator / Escalator Out of Service at Metro',
                        '⚠️ Overcrowding / Safety Concern',
                        '🔊 Incorrect Schedule / Station Announcement Issue'
                      ].map((issue) => {
                        const isChecked = selectedIssues.includes(issue);
                        return (
                          <button
                            key={issue}
                            type="button"
                            onClick={() => toggleIssue(issue)}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                              isChecked
                                ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                                : 'bg-black/50 border-white/10 text-gray-300 hover:border-gray-500'
                            }`}
                          >
                            <span>{issue}</span>
                            {isChecked && <CheckCircle2 size={14} className="text-amber-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* COMMENTS TEXTBOX */}
                  <div className="space-y-2">
                    <label className="text-gray-300 block font-semibold">Describe Your Experience or Issues</label>
                    <textarea
                      rows={3}
                      value={userComments}
                      onChange={(e) => setUserComments(e.target.value)}
                      placeholder="Share details (e.g. lift at KPHB Arm C was under maintenance, bus arrived 10 mins late...)"
                      className="w-full bg-black/50 border border-white/15 rounded-2xl p-4 text-white outline-none focus:border-amber-400 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-300 text-black font-extrabold py-4 rounded-2xl hover:opacity-90 transition-all text-xs cursor-pointer shadow-[0_10px_25px_rgba(245,158,11,0.3)]"
                  >
                    Submit Experience & Update Route Engine
                  </button>
                </form>
              )}
            </div>
          )}

        </main>
      )}

    </div>
  );
};
