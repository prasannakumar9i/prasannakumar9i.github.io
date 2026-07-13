import { useState, useEffect } from "react";
import { Github, GitPullRequest, GitFork, Users, Star, Award, Milestone } from "lucide-react";

import { fetchGitHubProfile, setGitHubUsername } from "../services/github";

interface GitHubStatsProps {
  username: string;
}

export default function GitHubStats({ username }: GitHubStatsProps) {
  setGitHubUsername(username);

  const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await fetchGitHubProfile();
        setProfile(data);
      } catch (error) {
        console.error("GitHub API Error:", error);
      }
    }

    loadProfile();
  }, []);

  // Generate a mock grid of 53 weeks x 7 days = 371 contributions points
  const contributionLevels = [0, 0, 1, 2, 0, 1, 2, 1, 0, 0, 1, 1, 2, 0, 1, 2, 1, 0, 1, 1, 2, 2, 1, 2, 1];
  const totalGridPoints = 53 * 7;
  
  const generateGrid = () => {
    const grid = [];
    for (let i = 0; i < totalGridPoints; i++) {
      const idx = i % contributionLevels.length;
      const val = contributionLevels[idx];
      grid.push({
        level: val,
        count: val === 0 ? 0 : val * 2 + Math.floor(Math.random() * 2),
        date: `2026-0${Math.floor(i / 100) + 1}-${(i % 28) + 1}`,
      });
    }
    return grid;
  };

  const contributionGrid = generateGrid();

  const getLevelClass = (level: number) => {
    switch (level) {
      case 1: return "bg-emerald-950/40 border border-emerald-900/40 hover:bg-emerald-900/60";
      case 2: return "bg-emerald-800/40 border border-emerald-700/40 hover:bg-emerald-700/60";
      case 3: return "bg-emerald-600/60 border border-emerald-500/50 hover:bg-emerald-500/80";
      case 4: return "bg-neon-cyan shadow-[0_0_8px_#00ffd8] border border-white/20";
      default: return "bg-white/5 border border-white/5 hover:bg-white/10";
    }
  };

  const topLanguages = [
    { name: "Python", percent: 70, color: "#3572A5", glow: "rgba(53, 114, 165, 0.4)" },
    { name: "HTML / CSS", percent: 15, color: "#e34c26", glow: "rgba(227, 76, 38, 0.4)" },
    { name: "JavaScript / TypeScript", percent: 10, color: "#f1e05a", glow: "rgba(241, 224, 90, 0.4)" },
    { name: "Java", percent: 5, color: "#b07219", glow: "rgba(176, 114, 25, 0.4)" },
  ];

  const githubMetrics = [
    { icon: <GitPullRequest className="w-4 h-4 text-neon-blue" />, value: "Active", label: "Contribution Status" },
    { icon: <GitFork className="w-4 h-4 text-neon-purple" />, value: "Public", label: "Repository Visibilities" },
    { icon: <Star className="w-4 h-4 text-amber-400" />, value: "Verified", label: "User Ingress Code" },
    { icon: <Users className="w-4 h-4 text-neon-cyan" />, value: "Linked", label: "Active Connections" },
  ];

  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 font-sans bg-cyber-dark relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan">
            <Github className="w-3.5 h-3.5" />
            <span className="text-[9px] font-mono tracking-widest uppercase">GIT REPO TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            GITHUB <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-cyan to-neon-blue">ACTIVITY SPECTRA</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-neon-cyan to-neon-blue rounded-full mx-auto md:mx-0" />
        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Classic Contribution Grid Card */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl glass-panel border border-white/5 space-y-6 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
             <div className="space-y-1">
              <h3 className="font-display font-semibold text-xs sm:text-sm text-white flex items-center gap-2">
                <Github className="w-5 h-5 text-gray-400" />
                @{profile?.login ?? "prasannakumar9i"}
              </h3>

              <p className="text-[11px] font-mono text-gray-400">
                {profile?.public_repos ?? 0} Public Repositories • {profile?.followers ?? 0} Followers
              </p>
            </div>
              {/* Tooltip detail indicator */}
              <div className="text-[10px] font-mono text-neon-cyan min-h-[16px] bg-neon-cyan/5 border border-neon-cyan/10 px-2.5 py-1 rounded-lg w-fit">
                {hoveredDay ? (
                  <span>{hoveredDay.count} contributions on {hoveredDay.date}</span>
                ) : (
                  <span>Hover grid cells for activity telemetry</span>
                )}
              </div>
            </div>

            {/* Scrollable horizontal grid representation */}
            <div className="overflow-x-auto pb-2 scrollbar-thin">
              <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[700px]">
                {contributionGrid.map((day, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-[8px] h-[8px] rounded-[1px] transition-colors cursor-pointer ${getLevelClass(
                      day.level
                    )}`}
                  />
                ))}
              </div>
            </div>

            {/* Legend scale */}
            <div className="flex items-center justify-end gap-2 text-[9px] font-mono text-gray-500">
              <span>Less</span>
              <div className="w-2 h-2 rounded-[1px] bg-white/5 border border-white/5" />
              <div className="w-2 h-2 rounded-[1px] bg-emerald-950/40 border border-emerald-900/40" />
              <div className="w-2 h-2 rounded-[1px] bg-emerald-800/40 border border-emerald-700/40" />
              <div className="w-2 h-2 rounded-[1px] bg-emerald-600/60 border border-emerald-500/50" />
              <div className="w-2 h-2 rounded-[1px] bg-neon-cyan" />
              <span>More</span>
            </div>
          </div>

          {/* Right: Languages distribution and fast metrics */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            {/* Top Languages card */}
            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
              <h3 className="font-display font-semibold text-xs text-white">LANGUAGE DISTRIBUTION</h3>
              
              {/* Stacked Percentage bar */}
              <div className="h-2 w-full rounded-full overflow-hidden flex bg-white/5">
                {topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{
                      width: `${lang.percent}%`,
                      backgroundColor: lang.color,
                      boxShadow: `0 0 10px ${lang.glow}`,
                    }}
                    title={`${lang.name}: ${lang.percent}%`}
                  />
                ))}
              </div>

              {/* Language labels with percentage list */}
              <div className="space-y-2.5 font-mono text-xs text-gray-300">
                {topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                      <span>{lang.name}</span>
                    </div>
                    <span className="text-gray-500 text-[10px]">{lang.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* General Repo numbers grid */}
            <div className="grid grid-cols-2 gap-4">
              {githubMetrics.map((met, mIdx) => (
                <div key={mIdx} className="p-4 rounded-xl glass-panel border border-white/5 flex flex-col justify-between gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 w-fit">
                    {met.icon}
                  </div>
                  <div>
                    <p className="text-sm font-display font-bold text-white">{met.value}</p>
                    <p className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">{met.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
