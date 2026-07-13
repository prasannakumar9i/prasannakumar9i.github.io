import { useState, useEffect } from "react";
import DigitalGlobe from "./DigitalGlobe";
import { Award, GraduationCap, Briefcase, Code, Network, Milestone } from "lucide-react";

export default function About() {
  // Animated counters state
  const [projects, setProjects] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);
  const [gpa, setGpa] = useState(0);

  useEffect(() => {
    // Simple incremental tickers for counters
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setProjects(Math.min(2, Math.floor((2 / steps) * step)));
      setSkillsCount(Math.min(25, Math.floor((25 / steps) * step)));
      setGpa(Math.min(74, Math.floor((74 / steps) * step)));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const milestones = [
    {
      title: "AI/ML Data Science Intern",
      date: "Feb 2026 - Jun 2026",
      description: "Internship at Vision Astra EV Academy. Developed machine learning models in Python, processed noisy sensor feeds, engineered predictive maintenance pipelines, and built exploratory data viz solutions.",
      icon: <Briefcase className="w-4 h-4 text-neon-blue" />,
    },
    {
      title: "B.E. in Computer Science & Engineering",
      date: "Graduating 2026",
      description: "Bachelor of Engineering degree from HKBK College of Engineering, Visvesvaraya Technological University (VTU). Focused on ML algorithms, databases, compiler theory, and practical programming.",
      icon: <GraduationCap className="w-4 h-4 text-neon-purple" />,
    },
    {
      title: "Generative AI & RAG Exploration",
      date: "Ongoing",
      description: "Building production-grade Retrieval-Augmented Generation (RAG) and NLP architectures with Sentence Transformers, FAISS, LangChain, and modern APIs.",
      icon: <Network className="w-4 h-4 text-neon-cyan" />,
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 font-sans bg-cyber-dark relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple">
            <Milestone className="w-3.5 h-3.5" />
            <span className="text-[9px] font-mono tracking-widest uppercase">BACKGROUND PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            ABOUT <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-blue to-neon-purple">PRASANNA KUMAR</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-neon-blue to-neon-purple rounded-full mx-auto md:mx-0" />
        </div>

        {/* Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Hologram Photo and Counters */}
          <div className="lg:col-span-4 flex flex-col items-center gap-8">
            {/* Hologram Photo Frame with Sci-Fi Scanner Overlay */}
            <div className="relative w-52 h-52 rounded-2xl overflow-hidden glass-panel border border-neon-blue/20 flex items-center justify-center group shadow-[0_0_20px_rgba(0,240,255,0.05)]">
              {/* Sci-fi scanner laser overlay */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-neon-blue shadow-[0_0_10px_#00f0ff] animate-[bounce_3s_infinite]" />
              
              <div className="w-44 h-44 rounded-xl bg-linear-to-br from-neon-blue/10 to-neon-purple/10 border border-white/5 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-cyber-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center font-mono text-[10px] text-neon-cyan">
                  BIO SCANNED: OK
                </div>
                {/* Simulated high-end developer silhouette */}
                <svg className="w-20 h-20 text-neon-blue/30 group-hover:text-neon-cyan/40 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <p className="text-[11px] font-mono text-gray-400 mt-2">PK_PORTFOLIO_CORE</p>
                <div className="text-[9px] font-mono text-neon-purple mt-1 font-semibold">ACADEMIC CGPA: 7.4</div>
              </div>
            </div>

            {/* Counters grid */}
            <div className="w-full grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl glass-panel border border-white/5 text-center space-y-1 hover:border-neon-blue/20 transition-all">
                <p className="text-2xl font-display font-bold text-white glow-text-cyan">{projects}</p>
                <p className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Flagships</p>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-white/5 text-center space-y-1 hover:border-neon-purple/20 transition-all">
                <p className="text-2xl font-display font-bold text-white glow-text-purple">{skillsCount}+</p>
                <p className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">Tech Core</p>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-white/5 text-center space-y-1 hover:border-neon-cyan/20 transition-all">
                <p className="text-2xl font-display font-bold text-white">{(gpa / 10).toFixed(1)}</p>
                <p className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">BE CGPA</p>
              </div>
            </div>
          </div>

          {/* Middle: 3D Holographic Globe */}
          <div className="lg:col-span-4 h-[350px] flex items-center justify-center relative">
            <DigitalGlobe />
          </div>

          {/* Right: Intro & Timeline Milestones */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              <p>
                I am a <span className="text-neon-cyan font-medium">Computer Science Engineering</span> graduate passionate about Artificial Intelligence, Machine Learning, Data Science, Generative AI, and Software Development. I enjoy building intelligent applications that solve real-world problems using modern AI technologies.
              </p>
              <p>
                My interests include Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), NLP, Computer Vision, Predictive Analytics, and Full Stack AI Applications. I focus on writing clean, scalable, and production-ready code while continuously learning new technologies.
              </p>
            </div>

            {/* Vertical Milestone timeline */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono tracking-widest text-gray-400 uppercase border-b border-white/5 pb-2">
                TIMELINE REGISTRY
              </h3>
              <div className="relative border-l border-white/10 ml-3.5 pl-6 space-y-6">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle timeline dot with custom glow depending on index */}
                    <div className="absolute -left-10 top-0.5 p-1 rounded-full bg-[#10111a] border border-white/10 group-hover:border-neon-blue transition-colors duration-300">
                      {m.icon}
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-medium text-xs text-white group-hover:text-neon-blue transition-colors duration-300">
                          {m.title}
                        </h4>
                        <span className="text-[9px] font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                          {m.date}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
