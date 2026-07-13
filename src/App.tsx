import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import GitHubStats from "./components/GitHubStats";
import Education from "./components/Education";
import Contact from "./components/Contact";
import CommandPalette from "./components/CommandPalette";
import AiChatbot from "./components/AiChatbot";
import WelcomeGateway from "./components/WelcomeGateway";
import { ArrowUp, Terminal, Cpu, X } from "lucide-react";
import { Project } from "./types";

 export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);

  // Visitor Mode States
  const [visitorType, setVisitorType] = useState<"recruiter" | "student" | "developer" | "explorer" | null>(null);
  const [showGateway, setShowGateway] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Real projects list for search and palette
  const projectsList: Project[] = [
    {
      id: "ev-diagnostic",
      title: "EV AI Diagnostic Platform",
      description: "An AI-powered Electric Vehicle diagnostic platform that combines Machine Learning, Retrieval-Augmented Generation (RAG), telemetry analysis, conversational AI, engineering calculations, and intelligent vehicle diagnostics.",
      tags: ["Python", "Flask", "React", "TypeScript", "LangChain", "FAISS", "ChromaDB", "Sentence Transformers", "OpenAI API", "Google Gemini", "XGBoost", "Scikit-learn", "PyMuPDF", "OCR", "Git", "GitHub"],
      category: "ai-ml",
      githubUrl: "https://github.com/prasannakumar9i/EV_AI_Diagnostic_Platform",
      demoUrl: "#",
      hologramType: "cube"
    },
    {
      id: "resume-screener",
      title: "AI Resume Screening Agent",
      description: "An AI-powered Resume Screening and Candidate Ranking System that parses resumes, understands job descriptions, performs semantic matching using NLP and Sentence Transformers, and ranks candidates intelligently.",
      tags: ["Python", "Sentence Transformers", "spaCy", "Scikit-learn", "PyMuPDF", "pdfplumber", "Tesseract OCR", "NumPy", "Pandas", "Git", "GitHub"],
      category: "nlp-rag",
      githubUrl: "https://github.com/prasannakumar9i/rooman-resume-screening-agent",
      demoUrl: "#",
      hologramType: "dna"
    }
  ];

  // Scroll listeners
  useEffect(() => {
    const handleScroll = () => {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        setScrollProgress((window.scrollY / totalScrollHeight) * 100);
      }

      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom cursor mouse movement tracking (desktop-only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Trigger personalized welcome toast when visitorType gets calibrated
  useEffect(() => {
    if (visitorType) {
      let msg = "";
      if (visitorType === "recruiter") {
        msg = "Welcome Recruiter! Quick resume compilation is docked on the screen. Industry experience & core competencies have been highlighted.";
      } else if (visitorType === "student") {
        msg = "Welcome Student! AI/ML system architectures, programming tools, and learning paths are highlighted for your evaluation.";
      } else if (visitorType === "developer") {
        msg = "Welcome Developer! Complex full-stack architectures, source-code links, and GitHub telemetry are prioritized for auditing.";
      } else {
        msg = "Welcome Explorer! Standard configurations successfully deployed. Enjoy exploring Prasanna's AI workspace.";
      }
      setToastMessage(msg);
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
      }, 7500);
      return () => clearTimeout(timer);
    }
  }, [visitorType]);

  const handleResetVisitorPreference = () => {
    localStorage.removeItem("prasanna_ai_visitor_type");
    localStorage.removeItem("prasanna_ai_remember");
    setVisitorType(null);
    setShowGateway(true);
  };

  if (showGateway) {
    return (
      <WelcomeGateway
        onEnter={(role) => {
          setVisitorType(role);
          setShowGateway(false);
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-cyber-dark text-gray-100" : "light-mode-theme bg-white text-gray-900"} selection:bg-neon-blue/20`}>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-linear-to-r from-neon-blue via-neon-cyan to-neon-purple z-50 transition-all duration-75 shadow-[0_0_8px_#00f0ff]"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Custom Floating Cursor (Desktop-only) */}
      <div
        className={`hidden md:block fixed pointer-events-none rounded-full z-100 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 mix-blend-screen ${
          cursorHovered
            ? "w-8 h-8 bg-neon-blue/20 border border-neon-cyan shadow-[0_0_15px_#00ffd8]"
            : "w-5 h-5 bg-transparent border border-neon-blue/60 shadow-[0_0_8px_rgba(0,240,255,0.3)]"
        }`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      {/* Navigation */}
      <Navbar
        onSearchClick={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        visitorType={visitorType}
        onVisitorTypeChange={(type) => setVisitorType(type)}
        onResetVisitorPreference={handleResetVisitorPreference}
      />

      {/* Main Core Content Sections */}
      <main className="relative">
        <Hero />
        <About />
        <Skills visitorType={visitorType} />
        <Projects visitorType={visitorType} />
        <Experience visitorType={visitorType} />
        <GitHubStats username="prasannakumar9i" />
        <Education />
        <Contact />
      </main>

      {/* Minimal futuristic Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#08090d] text-center space-y-4 relative overflow-hidden font-sans">
        {/* Soft glowing line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-[1px] bg-linear-to-r from-transparent via-neon-blue/30 to-transparent shadow-[0_0_8px_rgba(0,240,255,0.2)]" />

        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-gray-500">
            <Terminal className="w-3.5 h-3.5" />
            <span>PK_WORKSPACE_DEPLOYED</span>
          </div>
          <p className="text-xs text-gray-400">
            Made with ❤️ by Prasanna Kumar
          </p>
          <p className="text-[10px] font-mono text-gray-500">
            &copy; {new Date().getFullYear()} Prasanna Kumar. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Interactive AI Chatbot Widget */}
      <AiChatbot />

      {/* Command Palette dialog (Ctrl+K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projectsList}
      />

      {/* Dynamic Telemetry Calibration Toast Notification */}
      {showToast && toastMessage && (
        <div className="fixed bottom-6 left-6 md:left-24 z-50 p-4 rounded-xl glass-panel border border-neon-blue/30 shadow-[0_0_20px_rgba(0,240,255,0.15)] bg-[#07090f]/95 max-w-sm flex items-start gap-3.5 animate-in slide-in-from-bottom-5 duration-300 font-sans">
          <div className="p-1.5 rounded-lg bg-neon-blue/10 border border-neon-blue/25 text-neon-blue shrink-0">
            <Cpu className="w-4 h-4 animate-pulse" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-[9px] font-mono text-neon-cyan uppercase tracking-widest font-bold">Calibration Active</p>
            <p className="text-[11px] text-gray-300 leading-relaxed font-sans">{toastMessage}</p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="p-1 rounded text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 p-3.5 rounded-xl glass-panel border border-white/5 hover:border-neon-blue/30 text-gray-400 hover:text-neon-blue shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all transform hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center"
          title="Back to Top"
        >
          <ArrowUp className="w-4.5 h-4.5" />
        </button>
      )}
    </div>
  );
}
