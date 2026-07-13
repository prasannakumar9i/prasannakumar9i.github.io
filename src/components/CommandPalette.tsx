import { useState, useEffect, useRef, MouseEvent } from "react";
import { Search, FolderGit2, ArrowRight, X, Sparkles } from "lucide-react";
import { Project } from "../types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
}

export default function CommandPalette({ isOpen, onClose, projects }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const paletteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle clicking outside the modal
  const handleOverlayClick = (e: MouseEvent) => {
    if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const quickLinks = [
    { name: "About Prasanna", target: "about" },
    { name: "Core Skills", target: "skills" },
    { name: "Featured Projects", target: "projects" },
    { name: "Professional Experience", target: "experience" },
    { name: "Education", target: "education" },
    { name: "Contact", target: "contact" },
  ];

  const handleLinkClick = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-100 bg-black/60 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4 font-sans animate-in fade-in duration-200"
    >
      <div
        ref={paletteRef}
        className="w-full max-w-2xl rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[60vh]"
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-[#10111a]">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a project, skill, or section to explore..."
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md text-gray-400">
            <span>ESC</span>
          </kbd>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-white/5 text-gray-400 hover:text-white shrink-0 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
          {/* Quick links */}
          {search === "" && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">JUMP TO SECTION</h4>
              <div className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.target}
                    onClick={() => handleLinkClick(link.target)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-neon-blue/20 hover:bg-neon-blue/5 text-left text-xs text-gray-300 hover:text-white transition-all cursor-pointer group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-neon-blue transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects results */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
              {search === "" ? "FEATURED PROJECTS" : `SEARCH RESULTS (${filteredProjects.length})`}
            </h4>
            <div className="space-y-2">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-neon-purple/20 hover:bg-neon-purple/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FolderGit2 className="w-4.5 h-4.5 text-neon-blue" />
                      <span className="font-display font-medium text-xs text-white">{project.title}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono bg-white/5 text-gray-400 px-1.5 py-0.2 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-[10px] font-mono text-gray-300 hover:text-white transition-all"
                    >
                      Code
                    </a>
                    <button
                      onClick={() => handleLinkClick("projects")}
                      className="px-2.5 py-1.5 rounded-lg bg-neon-blue/20 border border-neon-blue/10 text-[10px] font-mono text-neon-blue hover:bg-neon-blue/30 transition-all cursor-pointer flex items-center gap-1"
                    >
                      View <Sparkles className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredProjects.length === 0 && (
                <div className="py-8 text-center space-y-1 text-gray-500">
                  <p className="text-xs">No matching projects found.</p>
                  <p className="text-[10px]">Try searching for terms like "EV", "RAG", "NLP", or "Python".</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#10111a] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
          <span>Navigate with cursor</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
