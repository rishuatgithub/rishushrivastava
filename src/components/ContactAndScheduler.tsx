import { useState } from "react";
import { 
  Mail, 
  Linkedin, 
  Github, 
  Globe, 
  MapPin, 
  Copy, 
  Check, 
  ExternalLink,
  Video,
  Calendar,
  Clock,
  Sparkles,
  Coffee,
  Briefcase,
  Layers
} from "lucide-react";
import { INTRO_HIGHLIGHTS } from "../data";

interface ContactAndSchedulerProps {
  activeTab?: "coordinates" | "scheduler";
  setActiveTab?: (tab: "coordinates" | "scheduler") => void;
}

export default function ContactAndScheduler({ activeTab: propActiveTab, setActiveTab: propSetActiveTab }: ContactAndSchedulerProps) {
  const [localActiveTab, setLocalActiveTab] = useState<"coordinates" | "scheduler">("coordinates");
  
  const activeTab = propActiveTab !== undefined ? propActiveTab : localActiveTab;
  const setActiveTab = propSetActiveTab !== undefined ? propSetActiveTab : setLocalActiveTab;
  
  // Coordinate copy states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMeet, setCopiedMeet] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const CALENDLY_URL = "https://calendly.com/rishu-shrivastava/meet-with-rishu";
  const embeddedUrl = `${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=0f172a&primary_color=3b82f6`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rishu.shrivastava@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyMeet = () => {
    navigator.clipboard.writeText("rishu.shrivastava@gmail.com");
    setCopiedMeet(true);
    setTimeout(() => setCopiedMeet(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(CALENDLY_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const topics = [
    {
      icon: <Coffee className="text-amber-500" size={16} />,
      title: "Recruiter/Interviewer",
      desc: "Connect for potential career opportunities, client engagements, interview panels, or structured introductions."
    },
    {
      icon: <Briefcase className="text-[#3b82f6]" size={16} />,
      title: "Strategic Advisory (Data, AI and Cloud)",
      desc: "Discuss low-latency cloud platforms, serverless architectures, custom data pipelines, migrations, or strategic modernization."
    },
    {
      icon: <Layers className="text-violet-500" size={16} />,
      title: "GenAI & Agentic Platform Strategy",
      desc: "Review business use-cases for enterprise integrations of LLMs, agentic autonomous workflows, and automated migration accelerators."
    }
  ];

  return (
    <section id="connect_section" className="w-full max-w-7xl mx-auto px-4 py-12">
      
      {/* Tab Header Section */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0f172a]/5 text-[#0f172a] text-[10.5px] font-mono font-bold uppercase tracking-wider border border-slate-200">
          <Sparkles size={11} className="text-[#3b82f6]" />
          Direct Access Point
        </div>
        <h2 className="font-display text-3xl font-extrabold text-[#0f172a] tracking-tight sm:text-4xl">
          Let&apos;s Build Something Exceptional
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Access direct communication coordinates, verified social profiles, or reserve an instant slot on my corporate calendar for advisory reviews or interview sessions.
        </p>

        {/* Dynamic sliding pill tab switcher */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 mt-4 shadow-inner">
          <button
            onClick={() => setActiveTab("coordinates")}
            className={`px-4 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "coordinates"
                ? "bg-white text-[#0f172a] shadow-sm"
                : "text-slate-500 hover:text-[#0f172a]"
            }`}
          >
            <Mail size={14} className={activeTab === "coordinates" ? "text-blue-500" : "text-slate-400"} />
            <span>Direct Coordinates &amp; Profiles</span>
          </button>
          
          <button
            onClick={() => setActiveTab("scheduler")}
            className={`px-4 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "scheduler"
                ? "bg-white text-[#0f172a] shadow-sm"
                : "text-slate-500 hover:text-[#0f172a]"
            }`}
          >
            <Calendar size={14} className={activeTab === "scheduler" ? "text-purple-500" : "text-slate-400"} />
            <span>Interactive Calendar Scheduler</span>
          </button>
        </div>
      </div>

      {/* Main container with shadow wrapper */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden relative min-h-[500px]">
        {/* Top styling accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full pointer-events-none border-b border-l border-slate-100/50" />
        
        {activeTab === "coordinates" && (
          <div className="p-6 md:p-8 xl:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              
              {/* Left Side: Digital Business Card */}
              <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between space-y-8 bg-slate-900 text-white rounded-2xl p-6 md:p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#3b82f6] bg-[#3b82f6]/10 px-2 rounded py-0.5">
                      Direct Connection Hub
                    </span>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight pt-1">
                      Rishu Shrivastava
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      Senior Architect &amp; Data Advisor. Connect directly for board-level cloud advisory, custom streaming frameworks, or recruitment panels.
                    </p>
                  </div>

                  {/* Direct contact info copy blocks */}
                  <div className="space-y-3 pt-2">
                    
                    {/* Copyable Email option */}
                    <div 
                      onClick={handleCopyEmail}
                      className="group p-3.5 bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between gap-4 transition-all duration-150 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] shrink-0">
                          <Mail size={16} />
                        </div>
                        <div>
                          <span className="block text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Direct Email</span>
                          <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors break-all">
                            rishu.shrivastava@gmail.com
                          </span>
                        </div>
                      </div>
                      <div className="text-slate-500 group-hover:text-slate-300 transition-colors p-1 shrink-0">
                        {copiedEmail ? <Check size={13} className="text-[#22c55e]" /> : <Copy size={13} />}
                      </div>
                    </div>

                    {/* Location option */}
                    <div className="p-3.5 bg-slate-800/40 border border-slate-800 rounded-xl flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <span className="block text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Location coordinates</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-200">
                          London, United Kingdom
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Social media connections drawer */}
                <div className="space-y-3 pt-6 border-t border-slate-800">
                  <span className="block text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                    Corporate Profiles
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href={INTRO_HIGHLIGHTS.linkedIn}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/10 transition-all text-center group"
                    >
                      <Linkedin size={16} className="text-slate-400 group-hover:text-[#3b82f6] transition-colors mb-1" />
                      <span className="text-[9.5px] font-bold text-slate-300 group-hover:text-white">LinkedIn</span>
                    </a>
                    <a
                      href={INTRO_HIGHLIGHTS.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-slate-500 hover:bg-slate-700/20 transition-all text-center group"
                    >
                      <Github size={16} className="text-slate-400 group-hover:text-slate-200 transition-colors mb-1" />
                      <span className="text-[9.5px] font-bold text-slate-300 group-hover:text-white">GitHub</span>
                    </a>
                    <a
                      href="https://tech-spaghetti.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-slate-800/30 border border-slate-800 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all text-center group"
                    >
                      <Globe size={16} className="text-slate-400 group-hover:text-amber-500 transition-colors mb-1" />
                      <span className="text-[9.5px] font-bold text-slate-300 group-hover:text-white">Tech Blog</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Side: Virtual Corporate Channels */}
              <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Video className="text-[#3b82f6]" size={18} />
                    <h4 className="font-display text-lg font-extrabold text-[#0f172a] tracking-tight">
                      Virtual Office &amp; Communication Channels
                    </h4>
                  </div>

                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Direct live channels and video-conferencing routes established for professional interviews, tech assessments, and strategic briefings.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Google Meet Card */}
                    <div className="bg-slate-50/50 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-blue-500/30 hover:bg-blue-50/10 transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#3b82f6] uppercase tracking-wider">
                          <Video size={12} className="text-[#3b82f6]" />
                          Google Meet
                        </div>
                        <h5 className="font-display text-sm font-bold text-[#0f172a]">
                          Instant Virtual Room
                        </h5>
                        <p className="text-slate-500 text-[11px] leading-relaxed">
                          Hosts fast virtual walkthroughs and code assessments.
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          onClick={handleCopyMeet}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-mono text-[9px] font-bold rounded transition-all uppercase tracking-wider cursor-pointer"
                        >
                          {copiedMeet ? <Check size={10} className="text-[#22c55e]" /> : <Copy size={10} />}
                          <span>{copiedMeet ? "Copied!" : "Copy Email"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Zoom Room Card */}
                    <div className="bg-slate-50/50 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                          <Video size={12} className="text-slate-500" />
                          Zoom Video
                        </div>
                        <h5 className="font-display text-sm font-bold text-[#0f172a]">
                          Corporate Boardrooms
                        </h5>
                        <p className="text-slate-500 text-[11px] leading-relaxed">
                          Enterprise scale conferencing ready for tech design panels.
                        </p>
                      </div>
                      <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider bg-white border border-slate-150 px-2 py-1 rounded self-start mt-1 select-none">
                        Coordinates on Request
                      </div>
                    </div>

                    {/* Working Hours Card */}
                    <div className="bg-slate-50/50 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-600 uppercase tracking-wider">
                          <Clock size={12} className="text-emerald-500" />
                          Timezone Coordinates
                        </div>
                        <h5 className="font-display text-sm font-bold text-[#0f172a]">
                          London Standard
                        </h5>
                        <p className="text-slate-500 text-[11px] leading-relaxed">
                          Active Mon - Fri: 09:00 AM - 05:30 PM (London GMT / BST).
                        </p>
                      </div>
                      <div className="flex items-center text-[9px] font-mono font-bold text-[#22c55e] uppercase tracking-wider bg-emerald-50/80 px-2 py-1 rounded border border-emerald-100 self-start select-none">
                        ● Core Business Hours
                      </div>
                    </div>

                    {/* Quick Calendar Forward Card */}
                    <div className="bg-slate-50/50 border border-slate-200/70 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-purple-500/30 hover:bg-purple-50/10 transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-purple-600 uppercase tracking-wider">
                          <Calendar size={12} className="text-purple-500" />
                          Calendar Reservation
                        </div>
                        <h5 className="font-display text-sm font-bold text-[#0f172a]">
                          Direct Booking Slot
                        </h5>
                        <p className="text-slate-500 text-[11px] leading-relaxed">
                          Prefer checking schedules first? Switch over to our live calendar view.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab("scheduler")}
                        className="inline-flex items-center gap-1 self-start px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 font-mono text-[9px] text-white font-bold rounded transition-all uppercase tracking-wider cursor-pointer"
                      >
                        <span>Switch to Calendar</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Professional Commitments Callout */}
                <div className="bg-[#f8fafc] mt-2 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                  <Sparkles className="text-[#3b82f6] shrink-0 mt-0.5" size={15} />
                  <div className="space-y-0.5">
                    <span className="block text-[10.5px] font-display font-extrabold text-[#0f172a] uppercase tracking-wide">Professional Commitment standards</span>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-normal">
                      I prioritize structured, high-value agendas. For enterprise consultations, strategic advisory bids, or advisory panels, please share brief scope documentation or workspace objectives in advance.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {activeTab === "scheduler" && (
          <div className="p-6 md:p-8 xl:p-10">
            {/* Split layout: discussion topics left, iframe right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Topics and scheduling cards */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1 text-[9px] font-mono font-bold tracking-widest text-[#3b82f6] uppercase">
                    <Calendar size={12} className="text-blue-500" />
                    Discussion Topics Guide
                  </div>
                  
                  {/* Topics List */}
                  <div className="space-y-3">
                    {topics.map((t, idx) => (
                      <div key={idx} className="flex gap-3 items-start bg-slate-50/50 p-4 rounded-xl border border-slate-150">
                        <div className="p-1.5 rounded-lg bg-white shadow-sm border border-slate-200 shrink-0 mt-0.5">
                          {t.icon}
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="font-display text-sm font-bold text-[#0f172a]">
                            {t.title}
                          </h5>
                          <p className="text-slate-500 text-xs leading-relaxed font-normal">
                            {t.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scheduling controls and links */}
                <div className="space-y-3 p-4 bg-[#f8fafc] border border-slate-200 rounded-xl">
                  <div className="text-[9.5px] font-mono font-black uppercase tracking-wider text-slate-400">
                    Calendly Slot Details
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 text-[10px] font-bold font-mono uppercase bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-all rounded flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      {copiedLink ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                      <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                    </button>
                    
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-[10px] font-bold font-mono uppercase bg-[#3b82f6] hover:bg-blue-600 text-white transition-colors rounded flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Open in Tab</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  <p className="text-slate-400 text-[10px] font-normal font-mono leading-normal pt-1">
                    Confirmed invitations and Zoom/Meet invitations will be automatically generated and sent directly to your email address.
                  </p>
                </div>

              </div>

              {/* Right Column: Calendly secure frame */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-inner flex-1 flex flex-col min-h-[580px] md:min-h-[620px] relative">
                  
                  {isIframeLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-[1px] z-10 transition-all">
                      <div className="w-8 h-8 rounded-full border-2 border-slate-100 border-t-[#3b82f6] animate-spin mb-3" />
                      <span className="text-xs font-mono font-bold text-slate-500 tracking-wider uppercase">
                        Opening Calendly Scheduler
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1">
                        Secure connection via api.calendly.com...
                      </span>
                    </div>
                  )}

                  <iframe
                    src={embeddedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    onLoad={() => setIsIframeLoading(false)}
                    className="flex-1 w-full"
                    id="contact_calendly_embed_v2"
                    title="Reserve Calendly Meeting with Rishu Shrivastava"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </section>
  );
}
