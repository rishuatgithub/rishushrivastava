import { Briefcase, Calendar, MapPin, Milestone, Layers, Star } from "lucide-react";
import { EXPERIENCE_HISTORY } from "../data";

export default function ExperienceTimeline() {
  return (
    <section id="experience_section" className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <Milestone className="text-[#3b82f6]" size={20} />
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Career Journey
          </h2>
        </div>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl">
          Deep, professional experience engineering enterprise analytics, cloud ecosystems, and intelligent data pipeline frameworks.
        </p>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 pl-6 sm:pl-10 space-y-12">
        {EXPERIENCE_HISTORY.map((exp, idx) => {
          return (
            <div key={exp.id} className="relative group">
              {/* Timeline indicator node with Professional Polish theme */}
              <div className="absolute -left-[45px] sm:-left-[53px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-slate-300 group-hover:border-[#3b82f6] transition-all font-mono font-bold text-[10px] leading-none text-slate-500 shadow-sm">
                0{idx + 1}
              </div>

              {/* Card wrapper */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0f172a]">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 mt-1">
                      <span className="font-semibold text-[#3b82f6] flex items-center gap-1">
                        <Briefcase size={14} className="text-[#3b82f6]" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-slate-400">
                        <MapPin size={14} className="text-slate-400" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] text-xs font-semibold font-mono tracking-wide sm:self-start rounded">
                    <Calendar size={12} className="text-slate-400" />
                    {exp.period}
                  </span>
                </div>

                {/* Bullets layout */}
                <ul className="space-y-3 mb-6">
                  {exp.bulletPoints.map((bullet, BulletIdx) => (
                     <li key={BulletIdx} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                       <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] shrink-0 mt-2" />
                       <span>{bullet}</span>
                     </li>
                  ))}
                </ul>

                {/* Highlighted Project callout */}
                {exp.featuredProject && (
                  <div className="bg-[#f8fafc] rounded border border-[#e2e8f0] p-4 mb-6">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#3b82f6] uppercase tracking-wider mb-1">
                      <Star size={11} className="fill-[#3b82f6] text-[#3b82f6]" />
                      KEY INNOVATION HIGHLIGHT
                    </div>
                    <h4 className="font-display text-sm font-bold text-[#0f172a] mb-1">
                      {exp.featuredProject.name}
                    </h4>
                    <p className="text-slate-505 text-xs leading-relaxed">
                      {exp.featuredProject.description}
                    </p>
                  </div>
                )}

                {/* Skills tags */}
                <div className="border-t border-slate-100 pt-5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold mb-2.5">
                    UTILIZED STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569] text-xs font-medium cursor-default hover:border-slate-350 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
