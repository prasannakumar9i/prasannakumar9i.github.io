import { useState, useEffect } from "react";
import {fetchGitHubRepositories} from "../services/github";
import HologramCube from "./HologramCube";
import { FolderGit2, Github, ExternalLink, Search, Filter } from "lucide-react";
import { Project } from "../types";

export default function Projects({ visitorType }: { visitorType?: "recruiter" | "student" | "developer" | "explorer" | null }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [repoData, setRepoData] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("Featured");
  const categories = [
    "Featured",
    "AI/ML",
    "NLP",
    "Automation",
    "Web",
    "All Repositories",
  ];
  const projects: Project[] = [
    
    {
      id: "ev-diagnostic",
      title: "EV AI Diagnostic Platform",
      description: "An AI-powered Electric Vehicle diagnostic platform that combines Machine Learning, Retrieval-Augmented Generation (RAG), telemetry analysis, conversational AI, engineering calculations, and intelligent vehicle diagnostics.",
      longDescription: "Features include battery health prediction, telemetry analysis, predictive maintenance, conversational AI assistant, RAG using EV manuals, PDF document intelligence, image understanding, engineering calculations, and an interactive dashboard with Flask backend and React frontend.",
      tags: [
        "Python", "Flask", "React", "TypeScript", "LangChain", "FAISS", "ChromaDB",
        "Sentence Transformers", "OpenAI API", "Google Gemini", "XGBoost", "Scikit-learn",
        "PyMuPDF", "OCR", "Git", "GitHub"
      ],
      category: "ai-ml",
      githubUrl: "https://github.com/prasannakumar9i/EV_AI_Diagnostic_Platform",
      demoUrl: "#", // placeholder
      hologramType: "cube"
    },
    {
      id: "resume-screener",
      title: "AI Resume Screening Agent",
      description: "An AI-powered Resume Screening and Candidate Ranking System that parses resumes, understands job descriptions, performs semantic matching using NLP and Sentence Transformers, and ranks candidates intelligently.",
      longDescription: "Features include multi-format Resume Parsing, OCR support, job description analysis, semantic similarity matches, candidate ranking, CSV/JSON report exports, custom recommendation engines, and high-performance NLP pipeline logic.",
      tags: [
        "Python", "Sentence Transformers", "spaCy", "Scikit-learn", "PyMuPDF",
        "pdfplumber", "Tesseract OCR", "NumPy", "Pandas", "Git", "GitHub"
      ],
      category: "nlp-rag",
      githubUrl: "https://github.com/prasannakumar9i/rooman-resume-screening-agent",
      demoUrl: "#", // placeholder
      hologramType: "dna"
    }
  ];

    useEffect(() => {
    async function loadRepos() {
      try {
        const repos = await fetchGitHubRepositories();
        setRepoData(repos);
      } catch (error) {
        console.error("GitHub Repo Error:", error);
      }
    }

    loadRepos();
  }, []);

    const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((t) =>
        t.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (!matchesSearch) return false;

    switch (activeCategory) {
      case "Featured":
        return true;

      case "AI/ML":
        return p.category === "ai-ml" || p.category === "nlp-rag";

      case "Automation":
        return p.tags.some(tag =>
          tag.toLowerCase().includes("automation")
        );

      case "Web":
        return p.tags.some(tag =>
          ["react","typescript","javascript","html","css","vite","flask"].includes(tag.toLowerCase())
        );

      case "All Repositories":
        return false;

      default:
        return true;
    }
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 font-sans bg-cyber-dark relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span className="text-[9px] font-mono tracking-widest uppercase">ENGINEERING REGISTRY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              FEATURED <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-blue via-neon-cyan to-neon-purple glow-text-cyan">PROJECTS</span>
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-neon-blue to-neon-purple rounded-full mx-auto md:mx-0" />
          </div>

          {/* Search container */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 pl-9 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/30 focus:shadow-[0_0_10px_rgba(0,240,255,0.05)] transition-all"
              />
            </div>
           <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                  ${
                    activeCategory === category
                      ? "bg-zinc-900 text-white border border-zinc-700"
                      : "bg-transparent text-gray-500 hover:text-white hover:border-zinc-700 border border-transparent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

            {/* 3D Projects Grid */}
        {activeCategory !== "All Repositories" ? (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((p) => {

            const repo =
              repoData.find(
                (r: any) =>
                  (p.id === "ev-diagnostic" &&
                    r.name === "EV_AI_Diagnostic_Platform") ||
                  (p.id === "resume-screener" &&
                    r.name === "rooman-resume-screening-agent")
              );
            // Personalize highlight based on visitor type
            let isProjectHighlighted = false;
            let projectHighlightTag = "";
            let projectBorderClass = "border-white/5 bg-cyber-card/30";

            if (visitorType === "recruiter" && p.id === "resume-screener") {
              isProjectHighlighted = true;
              projectHighlightTag = "🔥 HIGHEST RECRUITER RELEVANCE";
              projectBorderClass = "border-neon-blue/40 bg-[#0a1220]/45 shadow-[0_0_25px_rgba(0,240,255,0.08)]";
            } else if (visitorType === "developer" && p.id === "ev-diagnostic") {
              isProjectHighlighted = true;
              projectHighlightTag = "💻 COMPLEX SYSTEM STACK SPEC";
              projectBorderClass = "border-neon-cyan/40 bg-[#07161b]/45 shadow-[0_0_25px_rgba(0,255,216,0.08)]";
            } else if (visitorType === "student") {
              isProjectHighlighted = true;
              projectHighlightTag = "🎓 GREAT AI/ML LEARNING REFERENCE";
              projectBorderClass = "border-neon-purple/40 bg-[#120822]/45 shadow-[0_0_25px_rgba(189,0,255,0.08)]";
            }

            return (
              <div
                key={p.id}
                className={`group flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden relative ${projectBorderClass}`}
              >
                {/* Top: 3D Hologram Preview Zone with perspective math spinning on hover */}
                <div className="h-48 bg-[#0a0b10] border-b border-white/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-cyber-grid opacity-15" />
                  
                  {/* Visual Scanner HUD Overlay */}
                  <div className="absolute top-3 left-3 text-[8px] font-mono text-gray-400 tracking-widest uppercase">
                    {isProjectHighlighted ? projectHighlightTag : "ACTIVE_VISUAL_STATE: PROJ_PRV"}
                  </div>
                  
                  <div className="scale-90 group-hover:scale-105 transition-transform duration-300">
                    <HologramCube />
                  </div>
                  
                  <div className="absolute bottom-3 right-3 text-[8px] font-mono text-neon-cyan animate-pulse bg-neon-cyan/5 border border-neon-cyan/10 px-1.5 py-0.5 rounded">
                    {isProjectHighlighted ? "RECOMMENDED TARGET" : "60 FPS RENDER"}
                  </div>
                </div>

              {/* Bottom: Information Content */}
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold text-sm text-white group-hover:text-neon-cyan transition-colors">
                      {p.title}
                    </h3>
                    <span className="text-[9px] font-mono text-neon-purple border border-neon-purple/10 bg-neon-purple/5 px-2 py-0.5 rounded-full uppercase font-medium">
                      {p.category === "nlp-rag" ? "NLP & RAG" : "AI & ML SYSTEMS"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed min-h-[48px]">
                    {p.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono bg-white/5 text-gray-400 border border-white/5 px-2 py-0.5 rounded-lg group-hover:border-neon-blue/10 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {repo && (
                <div className="flex items-center gap-4 pt-2 text-[10px] font-mono text-gray-400">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <span>💻 {repo.language || "Unknown"}</span>
                     <span>
                        📅 {new Date(repo.updated_at).toLocaleDateString()}
                     </span>
                </div>
                )}

                {/* Actions container */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/5 mt-auto">
                  <a
                    href={repo?.html_url ?? p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/5 text-[10px] font-mono font-medium text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                  
                  <button
                    disabled
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-mono font-medium text-gray-500 flex items-center justify-center gap-1.5 cursor-not-allowed"
                    title="Live demo link is to be updated"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    To Be Updated
                  </button>
                </div>
              </div>
            </div>
          );
        })}

      {filteredProjects.length === 0 && (
              <div className="col-span-full py-16 text-center text-gray-500 font-mono space-y-2">
                <p className="text-xs">Zero system entries found matching criteria.</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-[10px] text-neon-blue underline cursor-pointer"
                >
                  Reset search queries
                </button>
              </div>
            )}

            </div>

            ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

            {repoData.map((repo) => (

              <div
                key={repo.id}
                className="glass-panel rounded-2xl border border-white/10 p-6 hover:border-neon-blue/30 transition-all"
              >

                <h3 className="text-lg font-bold text-white">
                  {repo.name}
                </h3>

                <p className="text-sm text-gray-400 mt-2 min-h-[48px]">
                  {repo.description || "No description available"}
                </p>

                <div className="flex gap-4 mt-4 text-xs text-gray-400">

                  <span>⭐ {repo.stargazers_count}</span>

                  <span>🍴 {repo.forks_count}</span>

                  <span>{repo.language || "Unknown"}</span>

                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-5 text-neon-blue hover:underline"
                >
                  View Repository →
                </a>

              </div>

            ))}

          </div>

          )}

        </div>
    </section>
  );
}
