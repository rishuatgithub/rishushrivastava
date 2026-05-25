import { useState } from "react";
import { SearchCode, CheckCircle2, UserCheck, AlertCircle } from "lucide-react";
import { RECRUITER_ROLES } from "../data";

export default function RecruiterMatch() {
  const [selectedRole, setSelectedRole] = useState(RECRUITER_ROLES[0].id);

  const roleObj = RECRUITER_ROLES.find((r) => r.id === selectedRole)!;

  const scoreMap: Record<string, number> = {
    role_etl: 98,
    role_aiml: 95,
    role_cloud: 92,
  };

  return (
    <section id="recruiter_match_section" className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
        
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2">
            <SearchCode className="text-[#3b82f6]" size={20} />
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Recruiter Quick-Match
            </h2>
          </div>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl">
            Select one of the open roles below to see Rishu Shrivastava&apos;s background overlap instantly computed with concrete justifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Roles selection column */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1">
              SELECT YOUR HIRING CATEGORY:
            </div>
            {RECRUITER_ROLES.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  selectedRole === role.id
                    ? "bg-[#0f172a] border-[#0f172a] text-white shadow"
                    : "bg-[#f8fafc] border-slate-200 hover:bg-slate-100/60 hover:border-slate-350 text-slate-700"
                }`}
              >
                <div>
                  <h3 className="font-display text-sm font-bold leading-snug">
                    {role.name}
                  </h3>
                  <p className={`text-[11px] mt-0.5 font-medium ${selectedRole === role.id ? "text-slate-400" : "text-slate-500"}`}>
                    {role.skillsNeeded.length} Targeted Core Prerequisite skills
                  </p>
                </div>
                
                {/* Score badge indicator */}
                <span className={`text-[10px] uppercase font-mono font-bold px-2 py-1 rounded transition-colors ${
                  selectedRole === role.id
                    ? "bg-slate-800 text-slate-100 border border-slate-700"
                    : "bg-slate-200/60 text-slate-600"
                }`}>
                  {scoreMap[role.id]}% Match
                </span>
              </div>
            ))}
          </div>

          {/* Justifications result panel */}
          <div className="lg:col-span-7 bg-[#f8fafc] rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest block mb-0.5">
                  DYNAMIC OVERLAP ANALYTICS
                </span>
                <h4 className="font-display text-base font-bold text-[#0f172a]">
                  Overlap Fit for &quot;{roleObj.name}&quot;
                </h4>
              </div>

              {/* Large visually impressive badge */}
              <div className="flex items-center gap-1.5 self-start">
                <span className="text-3xl font-display font-extrabold text-[#0f172a] pr-1">
                  {scoreMap[roleObj.id]}%
                </span>
                <span className="text-[10px] font-mono uppercase bg-emerald-55/10 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <UserCheck size={10} className="text-[#22c55e]" />
                  Qualified
                </span>
              </div>
            </div>

            {/* Targeted Skills cards */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-1">
                MATCHED CAPABILITIES VERIFIED:
              </div>
              <div className="flex flex-wrap gap-2">
                {roleObj.skillsNeeded.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded"
                  >
                    <CheckCircle2 size={13} className="text-[#3b82f6] shrink-0" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Justifications rationale */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-1">
                CANDIDATE VALIDATION SUMMARY:
              </div>
              <p className="text-slate-600 text-sm leading-relaxed bg-white border border-slate-200 p-4 rounded font-medium">
                {roleObj.justification}
              </p>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-400 italic leading-relaxed pt-2">
              <AlertCircle size={14} className="text-slate-400 shrink-0 mt-0.5" />
              <span>Matching is calculated based on Rishu&apos;s actual open-source projects, community publications, and professional service deliveries in multiple APAC and global corporate deployments.</span>
            </div>

            {/* Direct Meeting Trigger Link */}
            <div className="pt-4 border-t border-slate-250/60">
              <button
                onClick={() => {
                  const el = document.getElementById("scheduler_wrapper");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-display tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              >
                <span>Schedule Google Meet or Zoom Call instantly</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
