import { useState, useEffect } from "react";
import { Milestone, Code2, PlaySquare, Eye, Newspaper, Mail, ChevronUp, AlertCircle, RefreshCw } from "lucide-react";
import Header from "./components/Header";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SkillCluster from "./components/SkillCluster";
import Sandbox from "./components/Sandbox";
import RecruiterMatch from "./components/RecruiterMatch";
import Publications from "./components/Publications";
import MeetingScheduler from "./components/MeetingScheduler";
import ContactForm from "./components/ContactForm";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to conditionally reveal our floating Back-To-Top trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 selection:bg-[#0f172a] selection:text-[#f1f5f9]">
      
      {/* Visual Navigation Header utility */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm sm:text-lg tracking-tight text-[#0f172a]">
              Rishu Shrivastava
            </span>
            <span className="text-[10px] uppercase font-mono font-bold bg-slate-100 text-[#475569] px-1.5 py-0.5 rounded border border-slate-200 hidden sm:inline-block">
              Portfolio v2.0
            </span>
          </div>

          {/* Quick jump navigation chips */}
          <div className="flex items-center gap-0.5 sm:gap-2">
            <button
              onClick={() => {
                const el = document.getElementById("experience_section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-1.5 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors rounded cursor-pointer"
            >
              Experience
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("skills_section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-1.5 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors rounded cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("sandbox_section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-1.5 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors rounded cursor-pointer"
            >
              Sandbox
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("publications_section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-1.5 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors rounded cursor-pointer max-sm:hidden"
            >
              Blogs
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("contact_section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-white bg-[#0f172a] border border-[#0f172a] hover:bg-[#1e293b] transition-colors rounded font-display cursor-pointer"
            >
              Inquire
            </button>
          </div>
        </div>
      </nav>

      {/* Render Main Header profile card at the top */}
      <Header />

      {/* Core Body sections block */}
      <main className="space-y-10 pt-4">
        
        {/* Role matching and overlap calculator goes first to capture recruiters attention! */}
        <RecruiterMatch />

        <div className="border-t border-slate-200/50 my-4" />

        {/* Traditional resumes chronological journey */}
        <ExperienceTimeline />

        {/* Sandbox space to play with architectures */}
        <Sandbox />

        <div className="border-t border-slate-200/50 my-4" />

        {/* Organized technical spectrum and badges */}
        <SkillCluster />

        {/* Publications grid */}
        <Publications />

        <div className="border-t border-slate-200/50 my-4" />

        {/* Calendar and Meeting scheduler */}
        <div id="scheduler_wrapper" className="w-full max-w-7xl mx-auto px-4 py-4">
          <MeetingScheduler />
        </div>

        {/* Feedback inbox and write form */}
        <ContactForm />

      </main>

      {/* Elegant foot-rail credits and connections */}
      <footer className="w-full max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-sm font-bold text-slate-900">Rishu Shrivastava Portfolio</div>
          <p className="text-xs text-slate-400 font-medium">
            Designed by Gemini
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500 font-mono uppercase">
          <span>London, UK</span>
          <span>•</span>
          <span>Senior Architect</span>
          <span>•</span>
          <span>Data, Cloud, AI &amp; Product Innovation</span>
        </div>
      </footer>

      {/* Back to top floating utility */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="back_to_top_button"
          className="fixed bottom-6 right-6 p-3 rounded-full bg-slate-900 text-white border border-slate-950 shadow-lg hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all z-40 cursor-pointer"
          title="Back to Top"
        >
          <ChevronUp size={18} />
        </button>
      )}

    </div>
  );
}
