import { useState, useEffect } from "react";
import NeuralNetwork from "./NeuralNetwork";
import ResumeDownload from "./ResumeDownload";
import { Sparkles, ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const words = [
    "AI Engineer",
    "ML Engineer",
    "Data Scientist",
    "Python Developer",
    "GenAI Developer",
  ];
  const [wordIdx, setWordIdx] = useState(0);
  const [subWord, setSubWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [loaded, setLoaded] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const currentFullWord = words[wordIdx];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setSubWord(currentFullWord.substring(0, subWord.length + 1));
        setTypingSpeed(100);

        if (subWord.length === currentFullWord.length) {
          // Pause before deleting
          setTypingSpeed(1500);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        setSubWord(currentFullWord.substring(0, subWord.length - 1));
        setTypingSpeed(50);

        if (subWord.length === 0) {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % words.length);
          setTypingSpeed(300);
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [subWord, isDeleting, wordIdx]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className={`relative min-h-[92vh] flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8 font-sans cyber-grid transition-all duration-1000 ease-out ${
        loaded
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      {/* 3D background */}
      <NeuralNetwork />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 lg:space-y-8">
        {/* Futuristic Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">
            SECURE PORTAL ONLINE
          </span>
        </div>

        {/* Hero Headings */}
        <div className="space-y-4">
          <h2 className="text-[11px] font-mono tracking-[0.3em] uppercase text-gray-400">
            AI ENGINEER &amp; DATA SCIENTIST
          </h2>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
            PRASANNA <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-blue via-neon-cyan to-neon-purple glow-text-cyan">KUMAR</span>
          </h1>
          
          {/* Dynamic Typist Subtitle */}
          <div className="h-8 flex items-center justify-center gap-2">
            <span className="text-sm sm:text-lg md:text-xl font-mono text-gray-400">
              Specialized in
            </span>
            <span className="text-sm sm:text-lg md:text-xl font-mono font-semibold text-neon-blue typing-cursor pr-1">
              {subWord}
            </span>
          </div>
        </div>

        {/* Short elevator description */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
          Designing intelligent Retrieval-Augmented Generation (RAG) platforms, deep learning vision models, 
          and advanced machine learning pipelines. Crafting systems with robust python backends and ultra-smooth responsive frontends.
        </p>

        {/* Buttons / Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <ResumeDownload />

          <button
            onClick={() => handleScrollTo("projects")}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 text-xs text-white font-display font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            View Projects
          </button>
        </div>

        {/* Social connections */}
        <div className="flex items-center justify-center gap-4.5 pt-6 text-gray-400">
          <a
            href="https://github.com/prasannakumar9i"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-neon-blue/20 hover:text-white transition-all transform hover:scale-110"
            title="GitHub"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/d-prasanna-kumar-nadagouda-54698b2a0"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-neon-blue/20 hover:text-white transition-all transform hover:scale-110"
            title="LinkedIn"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
          <a
            href="mailto:prasannak4941@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-neon-blue/20 hover:text-white transition-all transform hover:scale-110"
            title="Email"
          >
            <Mail className="w-4.5 h-4.5" />
          </a>
        </div>
      </div>

      {/* Floating indicator */}
      <button
        onClick={() => handleScrollTo("about")}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-500 hover:text-neon-blue transition-colors duration-300 cursor-pointer animate-bounce flex flex-col items-center gap-1"
      >
        <span className="text-[9px] font-mono tracking-wider uppercase">SCROLL TO DISCOVER</span>
        <ArrowDown className="w-4 h-4" />
      </button>
    </section>
  );
}
