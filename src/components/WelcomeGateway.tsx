import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, GraduationCap, Code, Rocket, Cpu, Terminal, ShieldCheck, CheckCircle2, Check } from "lucide-react";

interface WelcomeGatewayProps {
  onEnter: (role: "recruiter" | "student" | "developer" | "explorer", isAuto: boolean) => void;
}

export default function WelcomeGateway({ onEnter }: WelcomeGatewayProps) {
  const [selectedRole, setSelectedRole] = useState<"recruiter" | "student" | "developer" | "explorer" | null>(null);
  const [rememberPreference, setRememberPreference] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const roles = [
    {
      id: "recruiter" as const,
      icon: <Briefcase className="w-8 h-8 text-neon-blue" />,
      label: "I'm a Recruiter",
      emoji: "💼",
      description: "Evaluate my skills, core projects, commercial experiences, and resume spec sheet.",
      colorClass: "from-neon-blue/20 to-neon-blue/5 border-neon-blue/20 hover:border-neon-blue/60 hover:shadow-neon-blue/20",
      glowColor: "rgba(0, 240, 255, 0.4)",
    },
    {
      id: "student" as const,
      icon: <GraduationCap className="w-8 h-8 text-neon-purple" />,
      label: "I'm a Student",
      emoji: "🎓",
      description: "Explore my AI milestones, ML models, educational algorithms, and research notes.",
      colorClass: "from-neon-purple/20 to-neon-purple/5 border-neon-purple/20 hover:border-neon-purple/60 hover:shadow-neon-purple/20",
      glowColor: "rgba(189, 0, 255, 0.4)",
    },
    {
      id: "developer" as const,
      icon: <Code className="w-8 h-8 text-neon-cyan" />,
      label: "I'm a Developer",
      emoji: "💻",
      description: "Audit code bases, system architectures, GitHub telemetry, and technical stack details.",
      colorClass: "from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/20 hover:border-neon-cyan/60 hover:shadow-neon-cyan/20",
      glowColor: "rgba(0, 255, 216, 0.4)",
    },
    {
      id: "explorer" as const,
      icon: <Rocket className="w-8 h-8 text-amber-400" />,
      label: "Just Exploring",
      emoji: "🚀",
      description: "Browse the visual assets, responsive systems, and interactive modules normally.",
      colorClass: "from-amber-400/10 to-amber-400/5 border-amber-400/20 hover:border-amber-400/60 hover:shadow-amber-400/20",
      glowColor: "rgba(251, 191, 36, 0.4)",
    },
  ];

  const bootLines = [
    "Initializing Quantum Core Portfolio...",
    "Detecting Local Client Handshake...",
    "Configuring Custom User Environment Workspace...",
    "Hydrating Interactive 3D Nodes & Visual Engines...",
    "Retrieving Project Specifications & Credentials...",
    "System Diagnostics: PASS. Deploying Terminal Gate...",
    "Access Granted. Launching..."
  ];

  // Auto-redirect if preference saved
  useEffect(() => {
    const savedRole = localStorage.getItem("prasanna_ai_visitor_type");
    const savedRemember = localStorage.getItem("prasanna_ai_remember") === "true";

    if (savedRole && savedRemember) {
      // Restore preference and trigger quick boot sequence
      setSelectedRole(savedRole as any);
      setRememberPreference(true);
      setIsBooting(true);
    }
  }, []);

  // 3D background canvas neural network implementation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    // Initialize flowing particles
    const particleCount = Math.min(100, Math.floor((width * height) / 12000) + 40);
    for (let i = 0; i < particleCount; i++) {
      const colors = ["rgba(0, 240, 255,", "rgba(189, 0, 255,", "rgba(0, 255, 216,"];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const drawGrid = (offsetY: number) => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 50;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = offsetY % gridSize; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    let gridOffset = 0;

    const render = () => {
      ctx.fillStyle = "#06070a";
      ctx.fillRect(0, 0, width, height);

      gridOffset += 0.2;
      drawGrid(gridOffset);

      // Connect particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce boundaries
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.08;
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particles
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Boot sequence logic
  useEffect(() => {
    if (!isBooting) return;

    if (bootStep < bootLines.length) {
      const delay = bootStep === bootLines.length - 1 ? 1200 : 500 + Math.random() * 300;
      const timer = setTimeout(() => {
        setBootStep((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else if (bootStep === bootLines.length && selectedRole) {
      // Complete boot! Save preference if toggled
      if (rememberPreference) {
        localStorage.setItem("prasanna_ai_visitor_type", selectedRole);
        localStorage.setItem("prasanna_ai_remember", "true");
      } else {
        localStorage.removeItem("prasanna_ai_visitor_type");
        localStorage.removeItem("prasanna_ai_remember");
      }

      // Track metric in local stats
      try {
        const statsStr = localStorage.getItem("prasanna_ai_analytics") || "{}";
        const stats = JSON.parse(statsStr);
        const currentCount = stats[`${selectedRole}_count`] || 0;
        stats[`${selectedRole}_count`] = currentCount + 1;
        stats["session_start"] = Date.now();
        localStorage.setItem("prasanna_ai_analytics", JSON.stringify(stats));
      } catch (e) {
        console.error("Analytics tracking error:", e);
      }

      onEnter(selectedRole, true);
    }
  }, [isBooting, bootStep, selectedRole, rememberPreference]);

  const handleRoleSelect = (roleId: "recruiter" | "student" | "developer" | "explorer") => {
    setSelectedRole(roleId);
  };

  const handleContinue = () => {
    if (!selectedRole) return;
    setIsBooting(true);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden font-sans select-none bg-[#06070a]">
      {/* 3D Animated Particle Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Grid scanning effect */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1/3 bg-linear-to-b from-neon-blue/5 to-transparent pointer-events-none" />
      
      {/* Laser horizontal scan line */}
      <div className="absolute left-0 w-full h-[2px] bg-linear-to-r from-transparent via-neon-cyan/40 to-transparent shadow-[0_0_8px_#00ffd8] top-0 animate-[scan_6s_linear_infinite] pointer-events-none" style={{
        animationName: "scan"
      }} />

      <style>{`
        @keyframes scan {
          0% { top: -10px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {!isBooting ? (
          <motion.div
            key="selection-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center gap-10 max-h-screen overflow-y-auto relative z-10 scrollbar-none"
          >
            {/* Header Title */}
            <div className="space-y-3.5 text-center max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-[9px] font-mono tracking-widest uppercase">
                <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
                <span>AI Operating System Gate v1.2</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-none">
                WELCOME TO <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-blue via-neon-cyan to-neon-purple glow-text-cyan">PRASANNA'S PORTFOLIO</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans px-4">
                Explore innovative Artificial Intelligence, Machine Learning, Data Science, and Software Engineering projects through a custom-tailored environment.
              </p>
            </div>

            {/* Main Center Box asking identity */}
            <div className="w-full text-center space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                  WHO ARE YOU?
                </h2>
                <p className="text-[10px] font-mono text-neon-blue/80 tracking-widest uppercase">
                  Select identity vector to calibrate telemetry
                </p>
              </div>

              {/* Identity Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                {roles.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className={`group relative text-left p-6 rounded-2xl glass-panel border transition-all duration-300 flex flex-col gap-4 text-white hover:scale-[1.03] cursor-pointer ${
                        isSelected
                          ? `bg-white/10 border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.08)]`
                          : `border-white/5 bg-cyber-card/30 hover:border-white/20`
                      }`}
                      style={{
                        boxShadow: isSelected ? `0 0 25px ${role.glowColor}` : undefined,
                      }}
                    >
                      {/* Interactive Border Line Indicator */}
                      {isSelected && (
                        <div className="absolute inset-x-0 top-0 h-[2.5px] bg-linear-to-r from-neon-blue via-neon-cyan to-neon-purple rounded-t-2xl shadow-[0_1px_8px_#00f0ff]" />
                      )}

                      {/* Icon with float animation */}
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                          {role.icon}
                        </div>
                        <span className="text-2xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                          {role.emoji}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1.5 flex-1 flex flex-col justify-end">
                        <h3 className="font-display font-bold text-sm text-white group-hover:text-neon-cyan transition-colors">
                          {role.label}
                        </h3>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                          {role.description}
                        </p>
                      </div>

                      {/* Radio Checkmark vector */}
                      <div className="flex justify-end pt-1">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? "bg-neon-cyan border-neon-cyan" : "border-white/10"
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-[#06070a] stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Frame */}
            <div className="flex flex-col items-center gap-5 mt-4">
              {/* Remember preference checkbox */}
              <label className="flex items-center gap-2.5 cursor-pointer font-mono text-[10px] sm:text-xs text-gray-400 hover:text-white transition-colors group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberPreference}
                    onChange={(e) => setRememberPreference(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-all ${
                    rememberPreference
                      ? "bg-neon-blue border-neon-blue shadow-[0_0_8px_#00f0ff]"
                      : "border-white/20 bg-white/5 group-hover:border-white/40"
                  }`}>
                    {rememberPreference && <Check className="w-3 h-3 text-black stroke-[3]" />}
                  </div>
                </div>
                <span>Remember preference on this device</span>
              </label>

              {/* Continue button rendered with delay */}
              <div className="h-14 flex items-center justify-center">
                <AnimatePresence>
                  {selectedRole && (
                    <motion.button
                      key="continue-btn"
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      onClick={handleContinue}
                      className="px-10 py-3 rounded-xl bg-linear-to-r from-neon-blue via-neon-cyan to-neon-purple text-black font-display text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_30px_#00f0ff] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                    >
                      <span>Continue</span>
                      <Terminal className="w-4 h-4 text-black animate-pulse" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Terminal boot sequence overlay */
          <motion.div
            key="terminal-boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-lg px-6 py-8 rounded-2xl glass-panel border border-white/10 relative z-10 flex flex-col gap-6 font-mono text-xs sm:text-sm text-neon-cyan shadow-[0_0_50px_rgba(0,240,255,0.05)] bg-[#07090f]/90"
          >
            {/* Header HUD info */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4.5 h-4.5 text-neon-blue animate-pulse" />
                <span className="text-[10px] text-gray-400">BOOT_LOG: SECURE_CORE_DAEMON</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-neon-cyan/5 border border-neon-cyan/15 uppercase font-medium">
                {selectedRole} Active
              </span>
            </div>

            {/* Sequential Terminal lines */}
            <div className="space-y-2.5 min-h-[180px] flex flex-col justify-center">
              {bootLines.slice(0, bootStep).map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex gap-2 items-start"
                >
                  <span className="text-neon-blue">›</span>
                  <span className={idx === bootLines.length - 1 ? "text-neon-cyan font-bold" : "text-gray-300"}>
                    {line}
                  </span>
                </motion.div>
              ))}
              {bootStep < bootLines.length && (
                <div className="flex gap-2 items-center text-gray-500 animate-pulse">
                  <span>›</span>
                  <span className="w-2.5 h-4 bg-neon-cyan inline-block" />
                </div>
              )}
            </div>

            {/* Cyber progress bars */}
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>SECTOR DECOMPRESSION</span>
                <span>{Math.min(100, Math.floor((bootStep / bootLines.length) * 100))}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-linear-to-r from-neon-blue via-neon-cyan to-neon-purple shadow-[0_0_8px_#00ffd8] transition-all duration-300"
                  style={{ width: `${(bootStep / bootLines.length) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
