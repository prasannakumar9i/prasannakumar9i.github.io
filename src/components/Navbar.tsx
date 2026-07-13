import { useState, useEffect, useRef } from "react";
import { Search, Volume2, VolumeX, Moon, Sun, Terminal, Menu, X, Github, Linkedin, Mail, FileText, Briefcase, GraduationCap, Code, Rocket, BarChart2, RefreshCw, Cpu, ChevronDown } from "lucide-react";

interface NavbarProps {
  onSearchClick: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  visitorType: "recruiter" | "student" | "developer" | "explorer" | null;
  onVisitorTypeChange: (type: "recruiter" | "student" | "developer" | "explorer") => void;
  onResetVisitorPreference: () => void;
}

export default function Navbar({
  onSearchClick,
  isDarkMode,
  onThemeToggle,
  visitorType,
  onVisitorTypeChange,
  onResetVisitorPreference,
}: NavbarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisitorDropdownOpen, setIsVisitorDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    oscs: OscillatorNode[];
    gain: GainNode;
    filter: BiquadFilterNode;
    lfo: OscillatorNode;
  } | null>(null);

  const [analytics, setAnalytics] = useState({
    recruiter_count: 0,
    student_count: 0,
    developer_count: 0,
    explorer_count: 0,
    session_start: Date.now(),
  });

  // Load local analytics stats
  useEffect(() => {
    const loadStats = () => {
      try {
        const statsStr = localStorage.getItem("prasanna_ai_analytics");
        if (statsStr) {
          const stats = JSON.parse(statsStr);
          setAnalytics((prev) => ({
            ...prev,
            ...stats,
          }));
        }
      } catch (e) {
        console.error("Failed to load local metrics", e);
      }
    };

    if (isVisitorDropdownOpen) {
      loadStats();
    }
  }, [isVisitorDropdownOpen, visitorType]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsVisitorDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Web Audio Synth setup for premium, no-file ambient cosmic space drone
  const toggleAmbientSynth = () => {
    if (isPlaying) {
      // Stop
      if (synthNodesRef.current) {
        try {
          synthNodesRef.current.gain.gain.linearRampToValueAtTime(0, audioContextRef.current!.currentTime + 1.5);
          const nodes = synthNodesRef.current;
          setTimeout(() => {
            nodes.oscs.forEach((osc) => osc.stop());
            nodes.lfo.stop();
          }, 1600);
        } catch (e) {
          console.error("Audio stop error:", e);
        }
      }
      setIsPlaying(false);
    } else {
      // Start
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // Base filter
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(140, ctx.currentTime);
        filter.Q.setValueAtTime(3, ctx.currentTime);

        // Gain node for smooth volume ramp
        const mainGain = ctx.createGain();
        mainGain.gain.setValueAtTime(0, ctx.currentTime);
        mainGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 2.5);

        // Three harmonized sub oscillators
        const freqs = [55, 110, 165]; // A1, A2, E3 (gorgeous minor/fifth drone chord)
        const oscs = freqs.map((f, idx) => {
          const osc = ctx.createOscillator();
          osc.type = idx === 0 ? "sawtooth" : "sine"; // raw warmth
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          
          // Detune slightly for lush chorus texture
          osc.detune.setValueAtTime((Math.random() - 0.5) * 15, ctx.currentTime);

          const oscGain = ctx.createGain();
          oscGain.gain.setValueAtTime(idx === 0 ? 0.08 : 0.15, ctx.currentTime);

          osc.connect(oscGain);
          oscGain.connect(filter);
          return osc;
        });

        // Slow LFO to modulate filter cutoff for swelling, breathing space drone
        const lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // very slow sweep

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(40, ctx.currentTime); // Sweep depth

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        filter.connect(mainGain);
        mainGain.connect(ctx.destination);

        // Start oscillators
        oscs.forEach((osc) => osc.start());
        lfo.start();

        synthNodesRef.current = { oscs, gain: mainGain, filter, lfo };
        setIsPlaying(true);
      } catch (err) {
        console.error("Failed to initialize Web Audio Synth:", err);
      }
    }
  };

  // Keyboard shortcut Ctrl+K to open Command Palette
  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onSearchClick();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
      // Clean up sound context if navigating away
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (_) {}
      }
    };
  }, [onSearchClick]);

  const navLinks = [
    { label: "About", target: "about" },
    { label: "Skills", target: "skills" },
    { label: "Projects", target: "projects" },
    { label: "Experience", target: "experience" },
    { label: "Contact", target: "contact" },
  ];

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getVisitorModeDetails = (type: typeof visitorType) => {
    switch (type) {
      case "recruiter":
        return {
          label: "Recruiter Mode",
          emoji: "💼",
          colorClass: "text-neon-blue border-neon-blue/30 bg-neon-blue/5 shadow-[0_0_10px_rgba(0,240,255,0.1)]",
          glowColor: "rgba(0, 240, 255, 0.4)",
        };
      case "student":
        return {
          label: "Student Mode",
          emoji: "🎓",
          colorClass: "text-neon-purple border-neon-purple/30 bg-neon-purple/5 shadow-[0_0_10px_rgba(189,0,255,0.1)]",
          glowColor: "rgba(189, 0, 255, 0.4)",
        };
      case "developer":
        return {
          label: "Developer Mode",
          emoji: "💻",
          colorClass: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5 shadow-[0_0_10px_rgba(0,255,216,0.1)]",
          glowColor: "rgba(0, 255, 216, 0.4)",
        };
      case "explorer":
      default:
        return {
          label: "Explorer Mode",
          emoji: "🚀",
          colorClass: "text-amber-400 border-amber-400/30 bg-amber-400/5 shadow-[0_0_10px_rgba(251,191,36,0.1)]",
          glowColor: "rgba(251, 191, 36, 0.4)",
        };
    }
  };

  const activeMode = getVisitorModeDetails(visitorType);

  const visitorOptions = [
    { id: "recruiter" as const, label: "Recruiter Mode", emoji: "💼", icon: <Briefcase className="w-3.5 h-3.5 text-neon-blue" />, count: analytics.recruiter_count },
    { id: "student" as const, label: "Student Mode", emoji: "🎓", icon: <GraduationCap className="w-3.5 h-3.5 text-neon-purple" />, count: analytics.student_count },
    { id: "developer" as const, label: "Developer Mode", emoji: "💻", icon: <Code className="w-3.5 h-3.5 text-neon-cyan" />, count: analytics.developer_count },
    { id: "explorer" as const, label: "Explorer Mode", emoji: "🚀", icon: <Rocket className="w-3.5 h-3.5 text-amber-400" />, count: analytics.explorer_count },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="p-1.5 rounded-lg bg-linear-to-br from-neon-blue to-neon-purple text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs tracking-wider uppercase text-white glow-text-cyan">
              PRASANNA.AI
            </span>
            <span className="text-[9px] font-mono text-gray-400">ENGINEER • SCIENTIST</span>
          </div>
        </div>

        {/* Desktop Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleScrollTo(link.target)}
              className="text-xs text-gray-300 hover:text-white hover:glow-text-cyan transition-all cursor-pointer font-medium"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Visitor Mode Badge selector */}
          {visitorType && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsVisitorDropdownOpen(!isVisitorDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-mono font-medium transition-all cursor-pointer hover:brightness-110 ${activeMode.colorClass}`}
              >
                <span>{activeMode.emoji}</span>
                <span>{activeMode.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Dynamic Holographic dropdown */}
              {isVisitorDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-64 rounded-2xl glass-panel border border-white/10 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] bg-[#0c0d15] text-left space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="border-b border-white/5 pb-2">
                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">ACTIVE_TELEMETRY</p>
                    <p className="text-[11px] font-semibold text-white">Toggle System Calibrations</p>
                  </div>

                  {/* Options List */}
                  <div className="space-y-1">
                    {visitorOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          onVisitorTypeChange(opt.id);
                          setIsVisitorDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs font-mono transition-colors hover:bg-white/5 ${
                          visitorType === opt.id ? "text-neon-cyan bg-white/5" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {opt.icon}
                          <span>{opt.label}</span>
                        </div>
                        <span className="text-[9px] text-gray-500">{opt.emoji}</span>
                      </button>
                    ))}
                  </div>

                  {/* Telemetry local stats indicators */}
                  <div className="bg-white/5 rounded-xl border border-white/5 p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-neon-cyan">
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span>VISITATION FREQUENCY</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-mono">
                      <div className="bg-[#0e0f17] rounded p-1" title="Recruiter visits">
                        <p className="text-neon-blue font-bold">{analytics.recruiter_count || 0}</p>
                        <p className="text-[7px] text-gray-500">REC</p>
                      </div>
                      <div className="bg-[#0e0f17] rounded p-1" title="Student visits">
                        <p className="text-neon-purple font-bold">{analytics.student_count || 0}</p>
                        <p className="text-[7px] text-gray-500">STU</p>
                      </div>
                      <div className="bg-[#0e0f17] rounded p-1" title="Developer visits">
                        <p className="text-neon-cyan font-bold">{analytics.developer_count || 0}</p>
                        <p className="text-[7px] text-gray-500">DEV</p>
                      </div>
                      <div className="bg-[#0e0f17] rounded p-1" title="Explorer visits">
                        <p className="text-amber-400 font-bold">{analytics.explorer_count || 0}</p>
                        <p className="text-[7px] text-gray-500">EXP</p>
                      </div>
                    </div>
                  </div>

                  {/* Change welcome gateway type option */}
                  <button
                    onClick={() => {
                      setIsVisitorDropdownOpen(false);
                      onResetVisitorPreference();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-linear-to-r from-neon-blue/10 to-neon-purple/10 border border-white/5 hover:border-white/15 text-[10px] font-mono font-medium text-gray-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3 h-3 text-neon-purple animate-spin" style={{ animationDuration: "6s" }} />
                    Change Identity Vector
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick search input button */}
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-neon-blue/20 text-[11px] font-mono text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
            <kbd className="text-[9px] bg-white/5 px-1 py-0.2 rounded border border-white/10">Ctrl K</kbd>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2.5">
          {visitorType && (
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-sm"
              title="Active visitor mode settings"
            >
              {activeMode.emoji}
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden p-4 bg-[#0e0f16] border-t border-white/5 space-y-5 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleScrollTo(link.target)}
                className="w-full text-left py-2.5 px-3 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer font-display"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Visitor switcher in mobile view */}
          {visitorType && (
            <div className="border-t border-white/5 pt-4 space-y-3 font-mono">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest px-2">VISITATION IDENTITY</p>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {visitorOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onVisitorTypeChange(opt.id);
                    }}
                    className={`flex items-center gap-1.5 p-2 rounded-lg border text-left transition-all ${
                      visitorType === opt.id
                        ? "border-neon-cyan bg-neon-cyan/5 text-neon-cyan"
                        : "border-white/5 bg-[#0a0b10] text-gray-400"
                    }`}
                  >
                    <span>{opt.emoji}</span>
                    <span>{opt.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onResetVisitorPreference();
                }}
                className="w-full py-2 px-3 rounded-lg bg-white/5 border border-white/5 text-[10px] text-neon-purple hover:text-white text-center flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: "12s" }} />
                Change Identity Vector
              </button>
            </div>
          )}

          <div className="border-t border-white/5 pt-4 flex justify-around">
            <a href="https://github.com/prasannakumar9i" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/placeholder-profile" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white">
              <Linkedin className="w-5 h-5" />
            </a>
            <div className="p-2 rounded-lg bg-white/5 text-gray-600">
              <Mail className="w-5 h-5" />
            </div>
            <button
              onClick={() => {
                const animEl = document.getElementById("resume-download-anim");
                if (animEl) {
                  animEl.scrollIntoView({ behavior: "smooth" });
                } else {
                  handleScrollTo("about");
                }
                setIsMobileMenuOpen(false);
              }}
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white cursor-pointer"
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
