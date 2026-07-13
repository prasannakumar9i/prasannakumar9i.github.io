import { Briefcase, CheckCircle } from "lucide-react";
import { Experience as ExpType } from "../types";

export default function Experience({ visitorType }: { visitorType?: "recruiter" | "student" | "developer" | "explorer" | null }) {
  const experiences: ExpType[] = [
    {
      company: "Vision Astra EV Academy",
      role: "AI/ML Data Science Intern",
      period: "Feb 2026 – Jun 2026",
      location: "Bengaluru, Karnataka, India",
      achievements: [
        "Built robust Machine Learning predictive models in Python targeting electric vehicle telemetry data sets.",
        "Executed dense data preprocessing, feature selection, engineering, and outlier remediation to prepare structured tables.",
        "Conducted extensive model training, hyperparameter adjustment, and performance evaluations on diverse algorithm families.",
        "Performed detailed Exploratory Data Analysis (EDA) and formulated intuitive visualizations to present state-of-health data.",
        "Designed and implemented high-accuracy predictive analytics metrics to anticipate wear-and-tear thresholds.",
        "Collaborated on intelligent AI application prototyping, integrating predictive layers with accessible frontend dashboards."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 font-sans bg-[#0d0f17] relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="text-[9px] font-mono tracking-widest uppercase font-semibold">PROFESSIONAL TRACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            WORK <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-blue via-neon-cyan to-neon-purple glow-text-cyan">EXPERIENCE</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Pulsing visual indicator */}
              <div className="absolute -left-14 sm:-left-18 top-1.5 w-8 h-8 rounded-full bg-[#10111a] border border-neon-blue/30 flex items-center justify-center group-hover:border-neon-blue group-hover:shadow-[0_0_15px_#00f0ff] transition-all duration-300">
                <Briefcase className="w-4 h-4 text-neon-blue" />
              </div>

              {/* Glass Card content */}
              <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative space-y-6 ${
                visitorType === "recruiter"
                  ? "bg-[#0b1424]/40 border-neon-blue/40 shadow-[0_0_22px_rgba(0,240,255,0.1)]"
                  : "glass-panel border-white/5 hover:border-neon-blue/10"
              }`}>
                {/* Visual HUD overlay */}
                <div className="absolute top-4 right-4 text-[9px] font-mono text-gray-400 hidden sm:block uppercase tracking-wider">
                  {visitorType === "recruiter" ? "🔥 RECOMMENDED CORE Internship" : "RECORD_REF_#001"}
                </div>

                {/* Role header details */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-neon-cyan transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono text-neon-purple bg-neon-purple/5 border border-neon-purple/10 px-3 py-1 rounded-full w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                    <span className="text-neon-cyan font-semibold">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Achievements block list */}
                <div className="space-y-3.5">
                  <h4 className="text-[10px] font-mono tracking-widest text-gray-500 uppercase border-b border-white/5 pb-2">
                    CORE RESPONSIBILITIES &amp; OUTCOMES
                  </h4>
                  <ul className="space-y-3">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex gap-3 text-xs text-gray-300 leading-relaxed font-sans">
                        <CheckCircle className="w-4.5 h-4.5 text-neon-cyan shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
