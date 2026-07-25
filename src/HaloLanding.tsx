import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LogoIcon } from './components/LogoIcon';

const HERO_BRANDS = [
  { name: 'Stripe', style: { fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em', fontSize: '15px' } },
  { name: 'Coinbase', style: { fontFamily: 'Arial, sans-serif', fontWeight: 900, letterSpacing: '0.08em', fontSize: '13px', textTransform: 'uppercase' as const } },
  { name: 'Uniswap', style: { fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600, letterSpacing: '0.01em', fontSize: '15px', fontStyle: 'italic' as const } },
  { name: 'Aave', style: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: '0.18em', fontSize: '13px', textTransform: 'uppercase' as const } },
  { name: 'Compound', style: { fontFamily: "'Palatino', 'Book Antiqua', serif", fontWeight: 400, letterSpacing: '-0.01em', fontSize: '16px' } },
  { name: 'MakerDAO', style: { fontFamily: "'Impact', 'Arial Narrow', sans-serif", fontWeight: 400, letterSpacing: '0.04em', fontSize: '14px' } },
  { name: 'Chainlink', style: { fontFamily: "'Verdana', sans-serif", fontWeight: 700, letterSpacing: '-0.03em', fontSize: '13px' } },
];

const BACKERS_BRANDS = [
  { name: 'Fundamental Labs', style: { fontFamily: "'Times New Roman', serif", fontWeight: 400, letterSpacing: '0.02em', fontSize: '14px' } },
  { name: 'KUCOIN', style: { fontFamily: "'Arial Black', sans-serif", fontWeight: 900, letterSpacing: '0.08em', fontSize: '16px' } },
  { name: 'NGC', style: { fontFamily: 'Impact, sans-serif', fontWeight: 700, letterSpacing: '0.05em', fontSize: '18px' } },
  { name: 'NxGen', style: { fontFamily: 'Georgia, serif', fontWeight: 600, letterSpacing: '-0.02em', fontSize: '17px' } },
  { name: 'Matter Labs', style: { fontFamily: 'Helvetica, sans-serif', fontWeight: 700, letterSpacing: '-0.01em', fontSize: '15px' } },
  { name: 'DEXTools', style: { fontFamily: 'Verdana, sans-serif', fontWeight: 700, letterSpacing: '0.06em', fontSize: '14px', textTransform: 'uppercase' as const } },
  { name: 'NGRAVE', style: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: '0.18em', fontSize: '14px' } },
  { name: 'Polychain', style: { fontFamily: 'Palatino, serif', fontWeight: 500, letterSpacing: '0.03em', fontSize: '15px' } },
];

interface HaloLandingProps {
  onNavigateToGetStarted: () => void;
}

export const HaloLanding: React.FC<HaloLandingProps> = ({ onNavigateToGetStarted }) => {
  return (
    <div className="flex flex-col bg-[#F5F5F5] min-h-screen text-black antialiased">
      
      {/* 1. SECTION 1: Page wrapper container for Navbar + Hero (h-screen flex flex-col overflow-hidden) */}
      <div className="h-screen flex flex-col overflow-hidden bg-[#F5F5F5] relative">
        
        {/* Navbar (absolute, transparent over hero) */}
        <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
          <div className="flex items-center justify-between max-w-[88rem] mx-auto w-full">
            {/* Left: LogoIcon + word "Halo" */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateToGetStarted}>
              <LogoIcon className="w-7 h-7 text-black" />
              <span className="text-2xl font-medium tracking-tight text-black">Halo</span>
            </div>

            {/* Center (hidden below md): links */}
            <div className="hidden md:flex items-center gap-8 text-base text-gray-700 font-medium">
              <a href="#network" className="hover:text-black transition-colors duration-200">Network</a>
              <a href="#ecosystem" className="hover:text-black transition-colors duration-200">Ecosystem</a>
              <a href="#rewards" className="hover:text-black transition-colors duration-200">Rewards</a>
              <a href="#help" className="hover:text-black transition-colors duration-200">Help</a>
              <a href="#news" className="hover:text-black transition-colors duration-200">News</a>
            </div>

            {/* Right: black pill button "Open Wallet" */}
            <button
              onClick={onNavigateToGetStarted}
              className="bg-black text-white text-base font-medium px-7 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer shadow-sm"
            >
              Open Wallet
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex-1 px-6 pt-20 pb-6 flex items-end max-w-[88rem] mx-auto w-full">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 96px)' }}>
            
            {/* Background Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover absolute inset-0 w-full h-full"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4"
            />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-start justify-start h-full p-6 sm:p-12 pt-28 sm:pt-36">
              
              {/* Heading 1 */}
              <h1
                className="text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4"
                style={{ letterSpacing: '-0.04em' }}
              >
                Your Wealth<br />Works
              </h1>

              {/* Subtitle Paragraph */}
              <p
                className="text-black/70 text-base md:text-lg max-w-md mb-8 leading-relaxed"
                style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
              >
                An automated, reward-powered digital dollar built for native passive earnings and effortless connection into DeFi.
              </p>

              {/* Pill button "Join us" with trailing white arrow circle */}
              <button
                onClick={onNavigateToGetStarted}
                className="inline-flex items-center gap-3 bg-black text-white text-base md:text-lg font-medium pl-8 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer shadow-md group"
              >
                <span>Join us</span>
                <div className="bg-white rounded-full p-2 group-hover:bg-gray-100 transition-colors">
                  <ArrowRight className="w-5 h-5 text-black" />
                </div>
              </button>

              {/* Brand Marquee (inside hero, below button) */}
              <div className="mt-16 sm:mt-24 w-full max-w-md overflow-hidden">
                <style>{`
                  @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                  }
                  .marquee-track {
                    display: flex;
                    width: max-content;
                    animation: marquee 22s linear infinite;
                  }
                `}</style>
                <div className="marquee-track">
                  {[...HERO_BRANDS, ...HERO_BRANDS].map((brand, idx) => (
                    <span
                      key={idx}
                      className="mx-7 shrink-0 text-black/60 whitespace-nowrap select-none cursor-default"
                      style={brand.style}
                    >
                      {brand.name}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* 2. SECTION 2: Info Section ("Meet USD Halo.") */}
      <section className="bg-[#F5F5F5] px-6 py-24">
        <div className="max-w-[88rem] mx-auto">
          
          {/* Row 1: 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
            <div>
              <h2
                className="text-black text-4xl md:text-5xl font-medium leading-tight mb-8"
                style={{ letterSpacing: '-0.03em' }}
              >
                Meet USD Halo.
              </h2>
              {/* Black pill "Discover it" button with trailing white arrow circle */}
              <button
                onClick={onNavigateToGetStarted}
                className="inline-flex items-center gap-3 bg-black text-white text-base font-medium pl-8 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer group"
              >
                <span>Discover it</span>
                <div className="bg-white rounded-full p-2 group-hover:bg-gray-100 transition-colors">
                  <ArrowRight className="w-5 h-5 text-black" />
                </div>
              </button>
            </div>

            <div>
              <p className="text-black/70 text-2xl md:text-3xl leading-relaxed font-medium">
                USD Halo is a reward-earning dollar coin that lets your savings grow while remaining tied to the U.S. dollar.
              </p>
            </div>
          </div>

          {/* Row 2: 4-col card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Spans 2 cols on lg */}
            <div
              className="lg:col-span-2 rounded-2xl p-7 min-h-80 flex flex-col justify-between overflow-hidden shadow-sm"
              style={{
                backgroundImage: `url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div>
                <h3
                  className="text-black text-2xl font-medium leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Savings that bloom
                </h3>
              </div>
              <div>
                <p className="text-black/70 text-base max-w-xs leading-relaxed">
                  Gain steady returns as your dollar tokens are routed into top-performing DeFi strategies.
                </p>
              </div>
            </div>

            {/* Card 2: Solid #2B2644 */}
            <div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-white text-2xl font-medium leading-snug whitespace-pre-line">
                  {"Always fluid,\nalways pegged."}
                </h3>
              </div>
              <div>
                <p className="text-white/60 text-base leading-relaxed">
                  Keep fully dollar-anchored with on-demand access to funds — no lockups or waits.
                </p>
              </div>
            </div>

            {/* Card 3: Solid #2B2644 */}
            <div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-white text-2xl font-medium leading-snug whitespace-pre-line">
                  {"Fully\nautomated"}
                </h3>
              </div>
              <div>
                <p className="text-white/60 text-base leading-relaxed">
                  Skip the task of tuning positions yourself. USD Halo runs in the background for you.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SECTION 3: Backed By Section (marquee row) */}
      <section className="bg-[#F5F5F5] px-6 py-16 border-t border-b border-black/5">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          
          {/* Left col (1/4) */}
          <div className="md:col-span-1">
            <p className="text-black/70 text-base leading-relaxed font-medium whitespace-pre-line">
              {"Funded by premier partners\nand forward-thinking leaders."}
            </p>
          </div>

          {/* Right col (3/4): Infinite marquee */}
          <div className="md:col-span-3 overflow-hidden">
            <style>{`
              @keyframes backers-marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .backers-track {
                display: flex;
                width: max-content;
                animation: backers-marquee 30s linear infinite;
              }
            `}</style>
            <div className="backers-track">
              {[...BACKERS_BRANDS, ...BACKERS_BRANDS].map((brand, idx) => (
                <span
                  key={idx}
                  className="mx-10 shrink-0 text-black/50 whitespace-nowrap select-none cursor-default"
                  style={brand.style}
                >
                  {brand.name}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. SECTION 4: Use Cases Section */}
      <section className="bg-[#F5F5F5] px-6 py-24">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left column */}
          <div className="md:pr-12 md:pt-2">
            <span className="text-black/60 text-sm font-medium tracking-wide uppercase block mb-2">
              USD Halo in Practice
            </span>
            <h2
              className="text-[#000000] text-5xl md:text-6xl font-medium leading-none mb-6"
              style={{ letterSpacing: '-0.04em' }}
            >
              Use modes
            </h2>
            <p className="text-black/60 text-base leading-relaxed max-w-sm">
              USD Halo powers a wide range of modes for builders, companies and treasuries wanting safe and rewarding stablecoin integrations plus more.
            </p>
          </div>

          {/* Right column: Large video container */}
          <div className="relative rounded-3xl overflow-hidden min-h-[500px] md:min-h-[720px] flex flex-col justify-end shadow-md">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover absolute inset-0 w-full h-full"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4"
            />
            
            {/* Overlay content */}
            <div className="relative z-10 p-8 sm:p-10 md:p-12 bg-gradient-to-t from-black/40 via-black/10 to-transparent text-white">
              <h3
                className="text-white text-4xl md:text-5xl font-medium leading-tight mb-5"
                style={{ letterSpacing: '-0.03em' }}
              >
                Commerce
              </h3>
              <p className="text-white/80 text-base max-w-md mb-8 leading-relaxed">
                Lift customer retention by offering USD Halo, a trusted dollar-backed stablecoin with strong yields, letting your patrons earn with zero effort on your platform.
              </p>
              
              {/* Inline-flex link "Know more" */}
              <button
                onClick={onNavigateToGetStarted}
                className="inline-flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>
                <span className="text-white font-medium text-base group-hover:underline">Know more</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#EAEAEA] py-12 px-6 border-t border-black/10">
        <div className="max-w-[88rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-black/60 font-medium">
          <div className="flex items-center gap-3">
            <LogoIcon className="w-5 h-5 text-black" />
            <span className="text-black font-semibold text-base">USD Halo</span>
            <span>© {new Date().getFullYear()} Halo Financial Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onNavigateToGetStarted} className="hover:text-black transition-colors cursor-pointer font-semibold text-black">Get Started Page →</button>
            <a href="#privacy" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
