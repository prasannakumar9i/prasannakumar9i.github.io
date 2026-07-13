import DnaHelix from "./DnaHelix";
import { Cpu, Terminal, Layers, Database, Compass, BarChart, Settings, Share2 } from "lucide-react";
import { SkillCategory } from "../types";

export default function Skills({ visitorType }: { visitorType?: "recruiter" | "student" | "developer" | "explorer" | null }) {
  const categories: SkillCategory[] = [
    {
      title: "Programming Core",
      icon: "Terminal",
      skills: [
        { name: "Python", level: 95 },
        { name: "Java", level: 80 },
        { name: "JavaScript", level: 82 },
        { name: "SQL", level: 88 },
        { name: "HTML / CSS", level: 90 },
      ],
    },
    {
      title: "Machine Learning & AI",
      icon: "Cpu",
      skills: [
        { name: "Scikit-learn", level: 92 },
        { name: "XGBoost", level: 88 },
        { name: "Generative AI & LLMs", level: 90 },
        { name: "RAG / Prompt Engineering", level: 92 },
        { name: "TensorFlow / PyTorch (Basics)", level: 65 },
      ],
    },
    {
      title: "NLP & Libraries",
      icon: "Layers",
      skills: [
        { name: "spaCy", level: 85 },
        { name: "Sentence Transformers", level: 92 },
        { name: "NLTK", level: 80 },
      ],
    },
    {
      title: "Databases",
      icon: "Database",
      skills: [
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 82 },
        { name: "ChromaDB & FAISS", level: 90 },
      ],
    },
    {
      title: "Frameworks & UI",
      icon: "BarChart",
      skills: [
        { name: "Flask", level: 88 },
        { name: "React", level: 80 },
        { name: "Tailwind CSS & Vite", level: 85 },
      ],
    },
    {
      title: "Data Science & Tools",
      icon: "Compass",
      skills: [
        { name: "NumPy & Pandas", level: 92 },
        { name: "Matplotlib & Power BI", level: 85 },
        { name: "Git / GitHub Versioning", level: 90 },
        { name: "VS Code / Google Colab", level: 95 },
      ],
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Terminal": return <Terminal className="w-4 h-4 text-neon-blue" />;
      case "Cpu": return <Cpu className="w-4 h-4 text-neon-purple" />;
      case "Layers": return <Layers className="w-4 h-4 text-neon-cyan" />;
      case "Database": return <Database className="w-4 h-4 text-amber-400" />;
      case "Compass": return <Compass className="w-4 h-4 text-emerald-400" />;
      default: return <BarChart className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 font-sans bg-[#0d0f17] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan">
            <Cpu className="w-3.5 h-3.5" />
            <span className="text-[9px] font-mono tracking-widest uppercase font-semibold">CAPABILITY SPEC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            TECHNICAL <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-cyan via-neon-blue to-neon-purple glow-text-cyan">SKILLS ARCHITECTURE</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-neon-cyan to-neon-blue rounded-full mx-auto md:mx-0" />
        </div>

        {/* 3D Helix + Skills Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Rotating DNA Helix representing AI mapping */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center glass-panel border border-white/5 rounded-2xl p-6 h-[450px] relative">
            <div className="absolute top-4 left-4 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
              HELIX_SEQUENCE_GEN2
            </div>
            <DnaHelix />
            <div className="absolute bottom-4 text-center space-y-0.5">
              <p className="text-[10px] font-mono text-neon-blue uppercase">Cognitive Optimization</p>
              <p className="text-[9px] font-mono text-gray-500">Neural mappings replicating 60 FPS</p>
            </div>
          </div>

          {/* Right Column: Skills bento container */}
          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, catIdx) => {
              // Determine if this category should be highlighted for the current visitor type
              let isCategoryHighlighted = false;
              let highlightLabel = "";
              let highlightBorderClass = "border-white/5 bg-cyber-card/30";

              if (visitorType === "recruiter") {
                if (cat.title === "Machine Learning & AI" || cat.title === "NLP & Libraries") {
                  isCategoryHighlighted = true;
                  highlightLabel = "🎯 Recommended for Evaluation";
                  highlightBorderClass = "border-neon-blue/35 bg-neon-blue/5 shadow-[0_0_15px_rgba(0,240,255,0.08)]";
                }
              } else if (visitorType === "developer") {
                if (cat.title === "NLP & Libraries" || cat.title === "Databases" || cat.title === "Data Science & Tools") {
                  isCategoryHighlighted = true;
                  highlightLabel = "💻 Core Engineering Tech";
                  highlightBorderClass = "border-neon-cyan/35 bg-neon-cyan/5 shadow-[0_0_15px_rgba(0,255,216,0.08)]";
                }
              } else if (visitorType === "student") {
                if (cat.title === "Programming Core" || cat.title === "Frameworks & UI") {
                  isCategoryHighlighted = true;
                  highlightLabel = "🎓 Recommended Learning Path";
                  highlightBorderClass = "border-neon-purple/35 bg-neon-purple/5 shadow-[0_0_15px_rgba(189,0,255,0.08)]";
                }
              }

              // Determine individual skills to highlight with a glow point
              const getSkillHighlightColor = (skillName: string) => {
                if (!visitorType) return null;
                const normalized = skillName.toLowerCase();
                
                if (visitorType === "recruiter") {
                  const matches = ["python", "generative ai & llms", "rag / prompt engineering", "sql", "sentence transformers"];
                  if (matches.includes(normalized)) return "bg-neon-blue shadow-[0_0_8px_#00f0ff]";
                } else if (visitorType === "developer") {
                  const matches = ["sentence transformers", "chromadb & faiss", "flask", "git / github versioning", "numpy & pandas"];
                  if (matches.includes(normalized)) return "bg-neon-cyan shadow-[0_0_8px_#00ffd8]";
                } else if (visitorType === "student") {
                  const matches = ["python", "scikit-learn", "generative ai & llms", "numpy & pandas"];
                  if (matches.includes(normalized)) return "bg-neon-purple shadow-[0_0_8px_#bd00ff]";
                }
                return null;
              };

              return (
                <div
                  key={catIdx}
                  className={`group p-5 rounded-xl border transition-all duration-300 flex flex-col gap-4 relative overflow-hidden ${highlightBorderClass}`}
                >
                  {/* Glow particle corner background trigger on hover */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-neon-blue/5 blur-xl group-hover:bg-neon-blue/10 transition-all duration-300" />
                  
                  {/* Highlight HUD label badge */}
                  {isCategoryHighlighted && (
                    <div className="absolute top-0 right-0 px-2.5 py-0.5 rounded-bl-lg bg-white/5 border-l border-b border-white/10 text-[8px] font-mono font-medium text-gray-300 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                      {highlightLabel}
                    </div>
                  )}

                  {/* Header title */}
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-neon-blue/20 transition-all">
                      {getIcon(cat.icon)}
                    </div>
                    <h3 className="font-display font-medium text-xs text-white group-hover:text-neon-cyan transition-colors">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Progress bars list */}
                  <div className="space-y-3.5">
                    {cat.skills.map((skill, sIdx) => {
                      const glowDot = getSkillHighlightColor(skill.name);
                      return (
                        <div key={sIdx} className="space-y-1.5 font-mono">
                          <div className="flex justify-between text-[10px] text-gray-400">
                            <span className="truncate pr-1 group-hover:text-gray-300 transition-colors flex items-center gap-1.5">
                              {glowDot && (
                                <span className={`w-1.5 h-1.5 rounded-full ${glowDot}`} />
                              )}
                              {skill.name}
                            </span>
                            <span className="text-neon-cyan text-[9px]">{skill.level}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div
                              className="h-full bg-linear-to-r from-neon-blue to-neon-purple group-hover:shadow-[0_0_8px_#00f0ff] transition-all duration-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
