import { useState } from "react";
import { Briefcase, Linkedin, Github, Globe, Sparkles, BookOpen, Star } from "lucide-react";
import { INTRO_HIGHLIGHTS } from "../data";

export default function Header() {
  const [imageError, setImageError] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="relative w-full max-w-7xl mx-auto px-4 pt-10 pb-6">
      {/* Subtle background context with precise grid layout */}
      <div className="relative bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm overflow-hidden">
        {/* Dynamic header status bar with professional polish theme */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-slate-400 tracking-wider uppercase font-semibold">LONDON, UK • GMT+1</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-400">Status:</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 text-slate-100 border border-slate-800 font-medium whitespace-nowrap">Available for Strategic Advisory</span>
            <button
              onClick={() => {
                const el = document.getElementById("scheduler_wrapper");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-2.5 py-1 rounded bg-[#3b82f6] hover:bg-blue-600 text-white font-bold cursor-pointer transition-colors"
            >
              Book Call
            </button>
          </div>
        </div>

        {/* Primary layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col sm:flex-row gap-6 md:gap-8 items-center sm:items-start text-center sm:text-left">
            
            {/* Static Profile Image / Avatar Frame */}
            <div className="relative shrink-0">
              <div className="w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 xl:w-56 xl:h-56 rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-50 shadow-sm flex items-center justify-center transition-all duration-300 hover:border-[#3b82f6] hover:shadow-md">
                {!imageError ? (
                  <img
                    src="https://github.com/rishuatgithub.png"
                    alt={INTRO_HIGHLIGHTS.name}
                    className="w-full h-full object-cover animate-fade-in"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      setImageError(true);
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex flex-col items-center justify-center p-4 select-none">
                    <span className="font-display text-5xl font-extrabold text-[#0f172a] tracking-wider">
                      RS
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest mt-2">
                      Data &amp; AI
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Title, bio and socials context wrapper */}
            <div className="space-y-4 flex-1 w-full">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569] text-[11px] font-mono font-bold uppercase tracking-wider">
                  <Sparkles size={11} className="text-[#3b82f6]" />
                  HITACHI VANTARA PROFESSIONAL SERVICES
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-none">
                  {INTRO_HIGHLIGHTS.name}
                </h1>
                <p className="font-display text-xl md:text-2xl font-medium text-[#3b82f6]">
                  {INTRO_HIGHLIGHTS.title}
                </p>
              </div>

              <p className="text-slate-500 text-base md:text-lg leading-relaxed font-normal max-w-3xl">
                {INTRO_HIGHLIGHTS.bio}
              </p>

              {/* Quick Socials & Action Links */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 justify-center sm:justify-start">
                <a
                  href={INTRO_HIGHLIGHTS.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  id="header_linkedin_link"
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-[#0f172a] text-white hover:bg-[#1e293b] transition-colors text-xs sm:text-sm font-semibold shadow-sm"
                >
                  <Linkedin size={14} className="sm:w-[15px] sm:h-[15px]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={INTRO_HIGHLIGHTS.github}
                  target="_blank"
                  rel="noreferrer"
                  id="header_github_link"
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-slate-350 transition-all text-xs sm:text-sm font-semibold text-[#0f172a]"
                >
                  <Github size={14} className="sm:w-[15px] sm:h-[15px]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={INTRO_HIGHLIGHTS.blog}
                  target="_blank"
                  rel="noreferrer"
                  id="header_blog_link"
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-slate-350 transition-all text-xs sm:text-sm font-semibold text-[#0f172a]"
                >
                  <Globe size={14} className="sm:w-[15px] sm:h-[15px]" />
                  <span>Blog</span>
                </a>
                
                <button
                  onClick={handlePrint}
                  id="header_print_resume"
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-[#f1f5f9] text-[#3b82f6] border border-[#e2e8f0] hover:bg-[#e2e8f0] transition-all text-xs sm:text-sm font-semibold cursor-pointer"
                >
                  <span className="hidden sm:inline">Export Executive Summary PDF</span>
                  <span className="sm:hidden">Export PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics grid (Bento items with Professional Polish Theme) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 w-full h-full lg:border-l lg:border-slate-200 lg:pl-8">
            <div className="p-5 rounded-lg bg-[#f8fafc] border border-slate-200/80 space-y-2">
              <div className="text-slate-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                <Briefcase size={12} className="text-[#3b82f6]" />
                EXPERIENCE
              </div>
              <div className="text-3xl font-display font-extrabold text-[#0f172a]">{INTRO_HIGHLIGHTS.experienceYears} Years</div>
              <div className="text-xs text-slate-500 font-normal leading-none">In Analytics, Cloud &amp; AI</div>
            </div>

            <div className="p-5 rounded-lg bg-[#f8fafc] border border-slate-200/80 space-y-2">
              <div className="text-slate-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
                <BookOpen size={12} className="text-[#3b82f6]" />
                PUBLICATIONS
              </div>
              <div className="text-3xl font-display font-extrabold text-[#0f172a]">5+</div>
              <div className="text-xs text-slate-500 font-normal leading-none">Original Research Blogs</div>
            </div>

            <div className="p-5 rounded-lg bg-[#0f172a] text-[#f1f5f9] border border-slate-900 col-span-2 space-y-3">
              <div className="text-slate-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                <Star size={12} className="text-[#3b82f6] fill-[#3b82f6]" />
                CORE SPECIALTY
              </div>
              <p className="text-xs text-[#e2e8f0] font-normal leading-relaxed">
                Coordinated global cloud data migrations, star-schema models, &amp; integrated AI agents natively into high-throughput ETL data streams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
