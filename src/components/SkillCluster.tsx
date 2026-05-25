import React, { useState } from "react";
import { Database, Code2, Cpu, Award, BadgeCheck } from "lucide-react";
import { SKILL_CATEGORIES, CERTIFICATIONS } from "../data";

const ICON_MAP: Record<string, React.ReactNode> = {
  Database: <Database size={18} className="text-[#3b82f6]" />,
  Code2: <Code2 size={18} className="text-[#475569]" />,
  Cpu: <Cpu size={18} className="text-[#0f172a]" />,
};

export default function SkillCluster() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <section id="skills_section" className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Skills Clusters */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col gap-1.5 mb-2">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Technical Spectrum
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              A comprehensive directory of technological stack mastered across a decade of enterprise deliveries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-4">
                    {ICON_MAP[cat.iconName] || <Database size={18} />}
                    <h3 className="font-display text-lg font-bold text-[#0f172a]">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cat.skills.map((skill) => {
                      const isSelected = selectedSkill === skill.name;
                      return (
                        <div
                          key={skill.name}
                          onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                          className={`group p-3.5 rounded border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#0f172a] border-[#0f172a] text-white shadow-sm"
                              : "bg-[#f8fafc] border-slate-200 text-slate-700 hover:bg-slate-100/50 hover:border-slate-350"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5 font-medium">
                            <span className="text-sm font-semibold truncate pr-1">{skill.name}</span>
                            <span className={`text-[10px] font-mono whitespace-nowrap uppercase tracking-wider font-bold ${
                              isSelected ? "text-[#3b82f6]" : "text-slate-400"
                            }`}>
                              {skill.frequency}
                            </span>
                          </div>

                          {/* Skill bar */}
                          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 ${
                                isSelected ? "bg-[#3b82f6]" : "bg-[#475569]"
                              }`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>

                          {/* Quick details revealed on select */}
                          {isSelected && (
                            <div className="text-[11px] text-slate-300 font-normal leading-relaxed mt-2 pt-2 border-t border-slate-800">
                              Practiced dynamically in critical production releases with {skill.level}% implementation confidence.
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Certified Credentials badges */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex flex-col gap-1.5 mb-2">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight flex items-center gap-2">
              <Award className="text-[#3b82f6]" size={24} />
              Credentials
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Verified certifications proving technical expertise.
            </p>
          </div>

          <div className="space-y-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex items-start gap-4 group"
              >
                {/* Visual Accent Bar */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#3b82f6]" />

                {/* Badge Icon */}
                <div className="p-2.5 rounded bg-[#f8fafc] border border-slate-200 text-slate-600 group-hover:scale-105 transition-transform shrink-0">
                  <BadgeCheck size={20} className="text-[#3b82f6]" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-sm font-bold text-[#0f172a] group-hover:text-[#3b82f6] transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-slate-500 text-xs font-normal">
                    Issuer: <span className="font-semibold text-slate-700">{cert.issuer}</span>
                  </p>
                  
                  {cert.credentialId && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-mono bg-[#f8fafc] text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                        ID: {cert.credentialId}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                        Issued {cert.year}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Micro badge indicator */}
            <div className="rounded border border-dashed border-slate-300 p-4 bg-[#f8fafc] text-center text-xs text-slate-400 font-medium">
              Enterprise validated by cloud providers and software OEMs.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
