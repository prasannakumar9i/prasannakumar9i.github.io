import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";
import { Education as EdType } from "../types";

export default function Education() {
  const educations: EdType[] = [
    {
      degree: "Bachelor of Engineering (B.E.)",
      school: "HKBK College of Engineering",
      period: "Graduation: 2026",
      gpa: "7.4 / 10 CGPA",
      details: [
        "Major in Computer Science and Engineering under Visvesvaraya Technological University (VTU).",
        "Focused academic curricula: Design and Analysis of Algorithms, Database Management Systems, Machine Learning Theory, and Software Engineering Principles.",
        "Engineered real-world analytical programs, emphasizing Python, SQL, data structures, and intelligent diagnostic logic."
      ]
    }
  ];

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 font-sans bg-[#0d0f17] relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple">
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="text-[9px] font-mono tracking-widest uppercase font-semibold">ACADEMIC TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            EDUCATION &amp; <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-blue via-neon-cyan to-neon-purple glow-text-cyan">QUALIFICATIONS</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
        </div>

        {/* Education Timeline lists */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {educations.map((ed, idx) => (
            <div key={idx} className="relative group">
              {/* timeline point dot */}
              <div className="absolute -left-14 sm:-left-18 top-1.5 w-8 h-8 rounded-full bg-[#10111a] border border-neon-purple/30 flex items-center justify-center group-hover:border-neon-purple group-hover:shadow-[0_0_15px_rgba(189,0,255,0.4)] transition-all duration-300">
                <GraduationCap className="w-4 h-4 text-neon-purple" />
              </div>

              {/* Glass Card info */}
              <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/5 hover:border-neon-purple/10 transition-all duration-300 relative space-y-6">
                <div className="absolute top-4 right-4 text-[9px] font-mono text-gray-500 hidden sm:block uppercase tracking-wider">
                  REG_VTU_BTECH_CSE
                </div>

                {/* Head details */}
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-neon-cyan transition-colors">
                      {ed.degree}
                    </h3>
                    <span className="text-xs font-mono text-neon-blue bg-neon-blue/5 border border-neon-blue/10 px-3 py-1 rounded-full w-fit flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {ed.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                    <span className="text-neon-cyan font-semibold">{ed.school}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      {ed.gpa}
                    </span>
                  </div>
                </div>

                {/* Details bullet points */}
                <div className="space-y-3.5">
                  <h4 className="text-[10px] font-mono tracking-widest text-gray-500 uppercase border-b border-white/5 pb-2">
                    PROGRAM REQUISITES &amp; FOCUS
                  </h4>
                  <ul className="space-y-3">
                    {ed.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex gap-3 text-xs text-gray-300 leading-relaxed font-sans">
                        <BookOpen className="w-4 h-4 text-neon-purple shrink-0 mt-0.5" />
                        <span>{detail}</span>
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
