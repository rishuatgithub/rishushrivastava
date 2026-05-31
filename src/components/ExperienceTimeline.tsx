import { Briefcase, Calendar, Milestone, Star, Sparkles, TrendingUp, Cpu, Award } from "lucide-react";
import { EXPERIENCE_HISTORY } from "../data";

export default function ExperienceTimeline() {
  return (
    <section id="experience_section" className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2">
          <Milestone className="text-[#3b82f6]" size={22} />
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Career Journey & Impact
          </h2>
        </div>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl">
          An executive, high-level summary of 14+ years spent architecting cloud-native data platforms, real-time products, and GenAI ecosystems.
        </p>
      </div>

      {/* Recruiter-focused Overall Summary Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        {/* Short Compelling Bio Context */}
        <div className="lg:col-span-7 bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col justify-center space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500 fill-amber-400" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#3b82f6] uppercase">Executive Profile</span>
          </div>
          <h3 className="font-display text-lg md:text-xl font-extrabold text-[#0f172a] tracking-tight leading-tight">
            Translating Emerging Technologies Into Enterprise Assets
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            I am a Senior Data & AI Architect with 14+ years of expertise. Specializing in high-throughput cloud data platform modernization and real-time streaming architectures, I lead product innovation teams to turn conceptual GenAI and Agentic workflows into durable, regulated corporate systems.
          </p>
        </div>

        {/* Dynamic High-Impact Metric Blocks */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col justify-between border border-slate-800 hover:border-slate-700 transition-all">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-[#3b82f6] self-start">
              <Cpu size={16} />
            </div>
            <div className="mt-4">
              <span className="block text-xl font-extrabold font-display leading-tight">14+ Years</span>
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Enterprise Tech</span>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col justify-between border border-slate-800 hover:border-slate-700 transition-all">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 self-start">
              <TrendingUp size={16} />
            </div>
            <div className="mt-4">
              <span className="block text-xl font-extrabold font-display leading-tight">$2M+ GenAI</span>
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Initiatives Led</span>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col justify-between border border-slate-800 hover:border-slate-700 transition-all">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 self-start">
              <Award size={16} />
            </div>
            <div className="mt-4">
              <span className="block text-xl font-extrabold font-display leading-tight">60-70%</span>
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Effort Reduced</span>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col justify-between border border-slate-800 hover:border-slate-700 transition-all">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 self-start">
              <Briefcase size={16} />
            </div>
            <div className="mt-4">
              <span className="block text-xl font-extrabold font-display leading-tight">Shipped GA</span>
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Ecosystem CDC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified, Clean Career Path Timeline Grid */}
      <div className="border-t border-slate-200/60 pt-8">
        <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-extrabold mb-6 text-center md:text-left">
          Key Milestones & Experience
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIENCE_HISTORY.map((exp) => (
            <div key={exp.id} className="bg-white rounded-xl border border-slate-200 p-5 md:p-6 hover:shadow-md transition-shadow relative flex flex-col justify-between">
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-extrabold text-[#3b82f6] uppercase tracking-wider bg-[#3b82f6]/5 px-2 py-0.5 rounded">
                    {exp.company}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                    <Calendar size={11} className="text-slate-400" />
                    {exp.period}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="font-display text-base md:text-lg font-bold text-[#0f172a] mb-3 leading-snug">
                  {exp.role}
                </h3>
                
                {/* Simplified bullet lists */}
                <ul className="space-y-2 mb-4">
                  {exp.bulletPoints.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2 text-slate-600 text-xs md:text-sm leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] shrink-0 mt-1.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Featured project summary */}
                {exp.featuredProject && (
                  <div className="bg-[#f8fafc] rounded-lg border border-[#e2e8f0]/85 p-3.5 mb-4">
                    <div className="flex items-center gap-1 text-[9px] font-mono font-extrabold text-amber-605 text-[#3b82f6] uppercase tracking-widest mb-1.5">
                      <Star size={10} className="fill-amber-500 text-amber-500" />
                      Key Innovation Highlight
                    </div>
                    <span className="block font-display text-xs font-bold text-[#0f172a] mb-1">
                      {exp.featuredProject.name}
                    </span>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      {exp.featuredProject.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Technologies utilized */}
              <div className="border-t border-slate-100 pt-4 mt-auto">
                <div className="text-[9.5px] font-mono font-bold text-slate-450 uppercase tracking-wider mb-2 text-slate-400">
                  Core Technologies
                </div>
                <div className="flex flex-wrap gap-1">
                  {exp.technologies.slice(0, 8).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[#f1f5f9] border border-[#e2e8f0]/80 text-[#475569] text-[10px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {exp.technologies.length > 8 && (
                    <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-400 text-[10px] font-bold">
                      +{exp.technologies.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
