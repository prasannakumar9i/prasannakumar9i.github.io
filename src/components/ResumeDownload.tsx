import { useState, useEffect } from "react";
import { Download, Terminal, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

export default function ResumeDownload() {
  const [downloadState, setDownloadState] = useState<"idle" | "connecting" | "fetching" | "validating" | "complete">("idle");
  const [progress, setProgress] = useState(0);

  const startDownloadAnimation = () => {
    if (downloadState !== "idle") return;
    setDownloadState("connecting");
    setProgress(0);
  };

  useEffect(() => {
    if (downloadState === "connecting") {
      const timer = setTimeout(() => {
        setDownloadState("fetching");
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (downloadState === "fetching") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloadState("validating");
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 150);
      return () => clearInterval(interval);
    }

    if (downloadState === "validating") {
      const timer = setTimeout(() => {
        setDownloadState("complete");
        // Trigger simulated file download
        const link = document.createElement("a");
        link.href = "#";
        link.setAttribute("download", "Prasanna_Kumar_AI_Engineer_Resume.pdf");
        document.body.appendChild(link);
        // We'll simulate a file by triggering a alert or download action
        document.body.removeChild(link);
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (downloadState === "complete") {
      const timer = setTimeout(() => {
        setDownloadState("idle");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [downloadState]);

  return (
    <div id="resume-download-anim" className="relative font-mono">
      {downloadState === "idle" ? (
        <button
          onClick={startDownloadAnimation}
          className="relative overflow-hidden w-full sm:w-auto px-6 py-3.5 rounded-xl bg-linear-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(189,0,255,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5 group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Download className="w-4.5 h-4.5 group-hover:translate-y-0.5 transition-transform" />
          <span className="font-display font-medium text-xs tracking-wider uppercase">Download Resume</span>
        </button>
      ) : (
        <div className="w-full sm:w-[320px] p-4 rounded-xl glass-panel border border-neon-blue/20 shadow-[0_0_25px_rgba(0,240,255,0.1)] flex flex-col gap-2.5 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5 text-neon-blue">
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              {downloadState === "connecting" && "TUNNELING..."}
              {downloadState === "fetching" && "DOWNLOADING SPEC..."}
              {downloadState === "validating" && "VERIFYING CRYPTO..."}
              {downloadState === "complete" && "SUCCESS!"}
            </span>
            <span>{progress}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-linear-to-r from-neon-blue to-neon-purple shadow-[0_0_8px_#00f0ff] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Logs */}
          <div className="text-[10px] text-gray-500 leading-relaxed min-h-[36px] flex flex-col justify-center">
            {downloadState === "connecting" && (
              <span className="animate-pulse flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-neon-cyan animate-spin" />
                Initializing quantum handshake at port 443...
              </span>
            )}
            {downloadState === "fetching" && (
              <span className="flex items-center gap-1.5">
                <Download className="w-3 h-3 text-neon-blue animate-bounce" />
                Pulling prasanna_resume_v1.2.pdf ({progress}%)
              </span>
            )}
            {downloadState === "validating" && (
              <span className="flex items-center gap-1.5 text-neon-cyan">
                <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
                Verifying SHA-256 checksum sequence...
              </span>
            )}
            {downloadState === "complete" && (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 animate-pulse" />
                Resume compiled successfully!
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
