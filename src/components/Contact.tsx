import { useState, FormEvent } from "react";
import { Send, Github, Linkedin, Mail, FileText, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

   setStatus("sending");

try {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      name,
      email,
      message,
      subject: "Portfolio Contact",
    }),
  });

  const result = await response.json();

  if (result.success) {
    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  } else {
    setStatus("error");
  }
} catch {
  setStatus("error");
}

setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 font-sans bg-cyber-dark relative overflow-hidden border-t border-white/5">
      {/* Background radial soft light gradient */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue">
            <Send className="w-3.5 h-3.5" />
            <span className="text-[9px] font-mono tracking-widest uppercase font-semibold">TRANSMISSION LINK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            CONTACT <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-blue via-neon-cyan to-neon-purple glow-text-cyan">PRASANNA KUMAR</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
        </div>

        {/* Contact form bento structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info Info Cards */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
              <h3 className="font-display font-bold text-xs text-white tracking-wider uppercase">SECURE COORDINATES</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Ready to collaborate on cutting-edge Machine Learning architectures, generative agent pipelines, 
                or full-stack systems? Dispatch your transmission below.
              </p>

              <div className="space-y-4 font-mono text-xs text-gray-300 pt-2">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <Mail className="w-4.5 h-4.5 text-neon-blue" />
                  <span>email-prasannak4941@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <Cpu className="w-4.5 h-4.5 text-neon-purple" />
                  <span>Phone: +91-8217694677</span>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <Cpu className="w-4.5 h-4.5 text-neon-cyan" />
                  <span>Location: Bengaluru, India</span>
                </div>
              </div>
            </div>

            {/* Social channels connect block */}
            <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
              <h3 className="font-display font-bold text-xs text-white tracking-wider uppercase">COMMUNICATION CORES</h3>
              <div className="grid grid-cols-2 gap-3 font-mono text-[10px] text-gray-400">
                <a
                  href="https://github.com/prasannakumar9i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-neon-blue/20 hover:text-white transition-all"
                >
                  <Github className="w-4 h-4 text-gray-400" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/d-prasanna-kumar-nadagouda-54698b2a0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-neon-purple/20 hover:text-white transition-all"
                >
                  <Linkedin className="w-4 h-4 text-neon-purple" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right: Glass Contact Form */}
          <form onSubmit={handleSubmit} className="md:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel border border-white/5 space-y-5 relative">
            <div className="absolute top-4 right-4 text-[9px] font-mono text-gray-500 uppercase tracking-wider hidden sm:block">
              SECURE_MESSAGE_BOX
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Your Identity</label>
              <input
                type="text"
                placeholder="Name / Organization"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "sending"}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/30 transition-all font-sans"
              />
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Sub-space Email Address</label>
              <input
                type="email"
                placeholder="name@server.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "sending"}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/30 transition-all font-sans"
              />
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Transmission Payload</label>
              <textarea
                rows={4}
                placeholder="Explain details of the project or opportunity..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === "sending"}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue/30 transition-all font-sans resize-none"
              />
            </div>

            {/* Simulated sending states / buttons */}
            {status === "idle" && (
              <button
                type="submit"
                className="relative overflow-hidden w-full py-3.5 rounded-xl bg-linear-to-r from-neon-blue to-neon-purple text-white font-display text-xs tracking-wider uppercase font-semibold hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                Transmit secure packet
              </button>
            )}

            {status === "sending" && (
              <div className="w-full py-3.5 rounded-xl bg-neon-blue/10 border border-neon-blue/20 flex items-center justify-center gap-2 font-mono text-xs text-neon-blue animate-pulse">
                <Cpu className="w-4.5 h-4.5 animate-spin" />
                BROADCASTING PACKET VECTORS...
              </div>
            )}

            {status === "success" && (
              <div className="w-full py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center gap-1.5 font-mono text-xs text-emerald-400 animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>TRANSMISSION TRANSMITTED SUCCESSFULLY!</span>
                </div>
                <p className="text-[10px] text-gray-500">Prasanna's server will decrypt and review shortly.</p>
              </div>
            )}

            {status === "error" && (
              <div className="w-full py-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center gap-2 font-mono text-xs text-rose-400 animate-pulse">
                <ShieldAlert className="w-4.5 h-4.5" />
                PLEASE PROVIDE ALL CREDENTIALS BEFORE TRANSMIT.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
