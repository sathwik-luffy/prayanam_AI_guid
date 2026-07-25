import React, { useState } from 'react';
import {
  Menu,
  X,
  Sparkles,
  Compass,
  MapPin,
  Navigation,
  Bookmark,
  SlidersHorizontal,
  CheckCircle2,
  Car,
  Train,
  Footprints,
  Bus,
  ArrowDown,
  TrendingDown,
  ArrowRight
} from 'lucide-react';

const PRAYANAM_VIDEOS = [
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
    label: 'Golden Hour',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
    label: 'Still Water',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
    label: 'Deep Woods',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
    label: 'Quiet Dawn',
  },
];

const OVERLAY_IMAGE =
  'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png';

const NAV_LINKS = ['How It Works', 'Features', 'Pricing', 'Community'];
const STATS = [
  '60+ Deep Sessions',
  '12,000+ Creators',
  '4.8 User Satisfaction',
  'Intentional-First Design',
];

interface PrayanamLandingProps {
  onNavigateToGetStarted: () => void;
}

export const PrayanamLanding: React.FC<PrayanamLandingProps> = ({ onNavigateToGetStarted }) => {
  const [activeVideo, setActiveVideo] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  // Original "How It Works" Modal Drawer Local State
  const [fromMode, setFromMode] = useState<'search' | 'gps' | 'map'>('gps');
  const [fromSearch, setFromSearch] = useState<string>('Home (Madhapur)');
  const [toMode, setToMode] = useState<'search' | 'map' | 'saved'>('search');
  const [toSearch, setToSearch] = useState<string>('Nexus Mall (Kukatpally)');
  const [preference, setPreference] = useState<'fastest' | 'cheapest' | 'rtc' | 'metro'>('fastest');
  const [leastWalking, setLeastWalking] = useState<boolean>(false);
  const [fewestTransfers, setFewestTransfers] = useState<boolean>(false);
  const [generated, setGenerated] = useState<boolean>(true);

  const handleVideoChange = (index: number) => {
    if (index === activeVideo || isTransitioning) return;
    setActiveVideo(index);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const handleNavClick = (link: string) => {
    if (link === 'How It Works') {
      setIsHowItWorksOpen(true);
    } else {
      onNavigateToGetStarted();
    }
    setIsMobileMenuOpen(false);
  };

  const isDarkMode = activeVideo === 2;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black select-none font-serif">
      {/* 1. Background Video Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {PRAYANAM_VIDEOS.map((vid, idx) => (
          <video
            key={vid.url}
            src={vid.url}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeVideo === idx ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* 2. Transparent PNG Overlay Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
        <img
          src={OVERLAY_IMAGE}
          alt="Overlay texture"
          className="animate-train-bob absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* 3. Content Layer */}
      <div className="relative z-[2] flex flex-col justify-between h-full p-6 sm:p-8 md:p-10 box-border font-serif">
        {/* Header Navigation */}
        <header className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <a href="#" className="text-white italic text-xl sm:text-2xl font-normal tracking-wide cursor-pointer">
            Prayanam
          </a>

          {/* Desktop Nav Pill */}
          <nav className="hidden md:flex items-center gap-8 liquid-glass rounded-full px-6 py-2.5 shadow-lg">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="font-sans text-sm text-white/90 hover:text-white transition-colors duration-200 font-normal cursor-pointer bg-transparent border-none"
              >
                {link}
              </button>
            ))}
            <button
              onClick={onNavigateToGetStarted}
              className="font-sans text-sm font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden liquid-glass rounded-full p-3 text-white flex items-center justify-center cursor-pointer shadow-lg relative"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center px-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-6 right-6 liquid-glass rounded-full p-3 text-white cursor-pointer"
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col items-center gap-6 text-center">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className="font-sans text-3xl font-light text-white bg-transparent border-none cursor-pointer"
                >
                  {link}
                </button>
              ))}

              <button
                onClick={onNavigateToGetStarted}
                className="mt-4 font-sans text-lg font-medium bg-white text-black px-8 py-3 rounded-full hover:bg-white/90 transition-all cursor-pointer shadow-lg"
              >
                Get Started
              </button>
            </nav>
          </div>
        )}

        {/* Hero Section Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center my-auto py-6">
          <div
            className={`flex flex-col items-center hero-content-theme ${
              isDarkMode ? 'theme-dark' : 'theme-white'
            }`}
          >
            {/* Badge */}
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="liquid-glass rounded-full px-5 py-2 text-xs sm:text-sm font-sans inline-flex items-center gap-2 mb-6 max-w-fit shadow-md cursor-pointer hover:bg-white/10 transition-all"
            >
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span>Over 10,000 daily commuters navigating smarter</span>
            </button>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl font-normal tracking-tight mb-4 text-white">
              One City. Every Route.<br />One App
            </h1>

            {/* Subtext */}
            <p className="max-w-xl leading-relaxed text-sm sm:text-base md:text-lg font-sans mb-8 opacity-90 text-white/90">
              Seamless multimodal transit routing powered by Gemma AI. Plan your journey with live buses, metro, autos, and cabs in one place.
            </p>

            {/* Email Form -> Triggers Get Started Page */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onNavigateToGetStarted();
              }}
              className="liquid-glass rounded-full max-w-[320px] sm:max-w-sm w-full p-1.5 pl-5 flex items-center justify-between mb-10 shadow-lg"
            >
              <input
                type="email"
                placeholder="Your Best Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-sm font-sans outline-none w-full placeholder-white/70 text-white pr-2 min-w-0"
              />
              <button
                type="submit"
                className="font-sans text-xs sm:text-sm font-medium bg-white text-black px-4 sm:px-5 py-2.5 rounded-full hover:bg-white/90 transition-all shrink-0 cursor-pointer shadow-md"
              >
                Get Early Access
              </button>
            </form>

            {/* Video Switcher */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
              {PRAYANAM_VIDEOS.map((vid, idx) => {
                const isActive = activeVideo === idx;
                return (
                  <button
                    key={vid.label}
                    onClick={() => handleVideoChange(idx)}
                    disabled={isTransitioning && !isActive}
                    className={`font-sans text-xs sm:text-sm tracking-wider uppercase py-1 cursor-pointer transition-all duration-300 text-white ${
                      isActive
                        ? 'border-b-2 border-white font-semibold opacity-100'
                        : 'border-b-2 border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    {vid.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <footer className="w-full max-w-7xl mx-auto pt-4 pb-2">
          <div className="font-sans text-white/70 text-xs sm:text-sm flex items-center justify-center gap-3 sm:gap-6 flex-wrap text-center">
            {STATS.map((stat, idx) => (
              <React.Fragment key={stat}>
                <span>{stat}</span>
                {idx < STATS.length - 1 && (
                  <span className="hidden sm:inline opacity-40">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </footer>
      </div>

      {/* 4. EXACT ORIGINAL "How Prayanam Transit Works" POPUP DRAWER (WHEN CLICKING HOW IT WORKS) */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end sm:justify-center items-center transition-all duration-500 ${
          isHowItWorksOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`liquid-glass w-full max-w-5xl h-[92vh] sm:h-[88vh] rounded-t-3xl sm:rounded-3xl border border-white/20 p-5 sm:p-8 flex flex-col overflow-hidden text-white shadow-2xl transition-all duration-500 transform ${
            isHowItWorksOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
          }`}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-amber-300">
                <Compass size={24} />
              </div>
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  How Prayanam Transit Works
                </h2>
                <p className="font-sans text-xs sm:text-sm text-white/70">
                  Multimodal Smart Route Engine with Gemma AI Insights
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsHowItWorksOpen(false)}
              className="liquid-glass rounded-full p-2.5 text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Workflow Container */}
          <div className="flex-1 overflow-y-auto pr-1 font-sans space-y-6">
            
            {/* Step 1 & 2 Inputs: FROM, TO, PREFERENCES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* FROM Selection Container */}
              <div className="liquid-glass p-4 rounded-2xl border border-white/10 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                  <MapPin size={16} />
                  <span>FROM</span>
                </div>

                {/* Sub Options */}
                <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xl text-xs text-center">
                  <button
                    onClick={() => setFromMode('search')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      fromMode === 'search' ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:text-white'
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
                      fromMode === 'gps' ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    GPS
                  </button>
                  <button
                    onClick={() => setFromMode('map')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      fromMode === 'map' ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:text-white'
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
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
                    placeholder="Search location..."
                  />
                  {fromMode === 'gps' && (
                    <Navigation size={14} className="absolute right-3 top-3 text-emerald-400 animate-pulse" />
                  )}
                </div>
              </div>

              {/* TO Selection Container */}
              <div className="liquid-glass p-4 rounded-2xl border border-white/10 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-rose-400 font-medium text-sm">
                  <Navigation size={16} />
                  <span>TO</span>
                </div>

                <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xl text-xs text-center">
                  <button
                    onClick={() => setToMode('search')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      toMode === 'search' ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Search
                  </button>
                  <button
                    onClick={() => setToMode('map')}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      toMode === 'map' ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    Pick Map
                  </button>
                  <button
                    onClick={() => {
                      setToMode('saved');
                      setToSearch('Saved: Nexus Mall');
                    }}
                    className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                      toMode === 'saved' ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:text-white'
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
                    className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/40"
                    placeholder="Destination..."
                  />
                  {toMode === 'saved' && (
                    <Bookmark size={14} className="absolute right-3 top-3 text-amber-400" />
                  )}
                </div>
              </div>

              {/* Preferences Container */}
              <div className="liquid-glass p-4 rounded-2xl border border-white/10 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sky-400 font-medium text-sm mb-1">
                  <SlidersHorizontal size={16} />
                  <span>Preference</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    onClick={() => setPreference('fastest')}
                    className={`px-2.5 py-1.5 rounded-lg text-left border flex items-center justify-between cursor-pointer ${
                      preference === 'fastest'
                        ? 'bg-sky-500/20 border-sky-400 text-white'
                        : 'border-white/10 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <span>○ Fastest</span>
                    {preference === 'fastest' && <CheckCircle2 size={12} className="text-sky-400" />}
                  </button>

                  <button
                    onClick={() => setPreference('cheapest')}
                    className={`px-2.5 py-1.5 rounded-lg text-left border flex items-center justify-between cursor-pointer ${
                      preference === 'cheapest'
                        ? 'bg-emerald-500/20 border-emerald-400 text-white'
                        : 'border-white/10 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <span>○ Cheapest</span>
                    {preference === 'cheapest' && <CheckCircle2 size={12} className="text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => setPreference('rtc')}
                    className={`px-2.5 py-1.5 rounded-lg text-left border flex items-center justify-between cursor-pointer ${
                      preference === 'rtc'
                        ? 'bg-amber-500/20 border-amber-400 text-white'
                        : 'border-white/10 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <span>○ RTC Bus Only</span>
                    {preference === 'rtc' && <CheckCircle2 size={12} className="text-amber-400" />}
                  </button>

                  <button
                    onClick={() => setPreference('metro')}
                    className={`px-2.5 py-1.5 rounded-lg text-left border flex items-center justify-between cursor-pointer ${
                      preference === 'metro'
                        ? 'bg-purple-500/20 border-purple-400 text-white'
                        : 'border-white/10 text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <span>○ Metro Only</span>
                    {preference === 'metro' && <CheckCircle2 size={12} className="text-purple-400" />}
                  </button>
                </div>

                {/* Optional Checkboxes */}
                <div className="flex items-center justify-between pt-1 gap-2 text-[11px] text-white/80">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={leastWalking}
                      onChange={(e) => setLeastWalking(e.target.checked)}
                      className="accent-sky-400 rounded"
                    />
                    <span>Least Walking</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fewestTransfers}
                      onChange={(e) => setFewestTransfers(e.target.checked)}
                      className="accent-sky-400 rounded"
                    />
                    <span>Fewest Transfers</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Trigger Button */}
            <div className="flex justify-center my-2">
              <button
                onClick={() => setGenerated(true)}
                className="bg-white text-black font-semibold px-6 py-2.5 rounded-full text-xs sm:text-sm hover:bg-white/90 transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
              >
                <Sparkles size={16} className="text-purple-600 animate-spin" />
                <span>Generate Smart Routes</span>
              </button>
            </div>

            <div className="border-t border-white/10 my-4" />

            {/* Smart Generated Routes Display */}
            {generated && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-white font-normal flex items-center gap-2">
                    <span>Generated Transit Routes</span>
                    <span className="text-xs font-sans bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full text-white/80">
                      Active Filter: {preference.toUpperCase()}
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Route 1 */}
                  <div className="liquid-glass p-4 rounded-2xl border border-white/15 flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                        Route 1 — Multimodal
                      </span>
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <span className="text-emerald-400 font-semibold">₹130</span>
                        <span className="text-white/70">44 min</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-white/90">
                      <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                        <Car size={14} className="text-amber-400 shrink-0" />
                        <span>Auto: Home → KPHB Metro</span>
                        <span className="ml-auto text-white/60">₹70 (10m)</span>
                      </div>

                      <div className="flex justify-center">
                        <ArrowDown size={12} className="text-white/30" />
                      </div>

                      <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                        <Train size={14} className="text-purple-400 shrink-0" />
                        <span>Metro: KPHB → Raidurg</span>
                        <span className="ml-auto text-white/60">₹60 (28m)</span>
                      </div>

                      <div className="flex justify-center">
                        <ArrowDown size={12} className="text-white/30" />
                      </div>

                      <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                        <Footprints size={14} className="text-emerald-400 shrink-0" />
                        <span>Walk: Raidurg Metro → Nexus Mall</span>
                        <span className="ml-auto text-white/60">6m</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-2 flex justify-between items-center text-xs text-white/70">
                      <span>Total Cost & Time</span>
                      <span className="font-semibold text-white">₹130 • 44 min</span>
                    </div>
                  </div>

                  {/* Route 2 */}
                  <div className="liquid-glass p-4 rounded-2xl border border-white/15 flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                        Route 2 — RTC + Metro
                      </span>
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <span className="text-emerald-400 font-semibold">₹80</span>
                        <span className="text-white/70">53 min</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-white/90">
                      <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                        <Bus size={14} className="text-amber-400 shrink-0" />
                        <span>RTC Bus: Home → Kukatpally</span>
                      </div>

                      <div className="flex justify-center">
                        <ArrowDown size={12} className="text-white/30" />
                      </div>

                      <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                        <Train size={14} className="text-purple-400 shrink-0" />
                        <span>Metro: Kukatpally → Raidurg</span>
                      </div>

                      <div className="flex justify-center">
                        <ArrowDown size={12} className="text-white/30" />
                      </div>

                      <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
                        <Footprints size={14} className="text-emerald-400 shrink-0" />
                        <span>Walk to Destination</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-2 flex justify-between items-center text-xs text-white/70">
                      <span>Total Cost & Time</span>
                      <span className="font-semibold text-white">₹80 • 53 min</span>
                    </div>
                  </div>

                  {/* Route 3 */}
                  <div className="liquid-glass p-4 rounded-2xl border border-white/15 flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-rose-300">
                        Route 3 — Direct Cab
                      </span>
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <span className="text-rose-400 font-semibold">₹320</span>
                        <span className="text-white/70">35 min</span>
                      </div>
                    </div>

                    <div className="bg-white/5 p-3 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Car size={16} className="text-rose-400" />
                        <span>Point-to-Point Direct Ride</span>
                      </div>
                      <span className="text-white/60">Fastest Door-to-Door</span>
                    </div>

                    <div className="border-t border-white/10 pt-2 flex justify-between items-center text-xs text-white/70">
                      <span>Total Cost & Time</span>
                      <span className="font-semibold text-white">₹320 • 35 min</span>
                    </div>
                  </div>

                  {/* Gemma AI Smart Recommendation */}
                  <div className="liquid-glass p-4 rounded-2xl border border-emerald-500/50 bg-emerald-950/20 flex flex-col justify-between gap-3 relative overflow-hidden">
                    <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
                      <Sparkles size={120} className="text-emerald-400" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles size={14} className="text-emerald-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                          Cheapest — Gemma AI Recommendation
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-medium">
                        <span className="text-emerald-400 font-bold text-sm">₹35</span>
                        <span className="text-white/70">1 hr 20 min</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-white/90">
                      <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-lg">
                        <Footprints size={12} className="text-emerald-400 shrink-0" />
                        <span>Walk: Home → Bus Stop</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-lg">
                        <Bus size={12} className="text-amber-400 shrink-0" />
                        <span>Bus 218D</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-lg">
                        <Bus size={12} className="text-amber-400 shrink-0" />
                        <span>Bus 127K</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-lg">
                        <Footprints size={12} className="text-emerald-400 shrink-0" />
                        <span>Walk to Destination</span>
                      </div>
                    </div>

                    <div className="bg-emerald-500/20 border border-emerald-400/40 p-2.5 rounded-xl flex items-center gap-2 text-xs text-emerald-200 font-medium">
                      <TrendingDown size={16} className="text-emerald-400 shrink-0" />
                      <span>Recommendation: Cheapest route saves ₹95 compared to metro.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
