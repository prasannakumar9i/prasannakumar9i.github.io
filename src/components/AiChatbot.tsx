import { useState, useEffect, useRef, FormEvent } from "react";
import { MessageSquare, X, Send, Bot, Terminal, User } from "lucide-react";
import { ChatMessage } from "../types";

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "Hi! I am Prasanna's AI avatar. Ask me anything about his ML models, Generative AI projects, engineering achievements, or how to contact him!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue("");
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessage = {
      sender: "user",
      text: userText,
      timestamp,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          history: messages,
        }),
      });

      const data = await response.json();
      const aiResponseText = data.response || "I ran into a connection error, but you can explore my projects and skills here on the portfolio!";

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I am experiencing some server latency, but I can tell you that Prasanna is an exceptional AI Engineer specializing in RAG systems, NLP, and predictive ML models!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-chatbot-widget" className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-linear-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(189,0,255,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
          </span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] rounded-2xl glass-panel flex flex-col shadow-[0_0_40px_rgba(0,240,255,0.15)] border border-neon-blue/20 overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="p-4 bg-linear-to-r from-[#10111a] to-[#181a26] border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
                <Bot className="w-5 h-5 text-neon-blue" />
              </div>
              <div>
                <h3 className="font-display font-medium text-sm text-white flex items-center gap-1.5">
                  Prasanna AI
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-[10px] font-mono text-gray-400">COGNITIVE ASSISTANT v1.2</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 cyber-grid scrollbar-thin"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 border ${
                    msg.sender === "user"
                      ? "bg-neon-purple/10 border-neon-purple/20 text-neon-purple"
                      : "bg-neon-blue/10 border-neon-blue/20 text-neon-blue"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div className="max-w-[75%] space-y-1">
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-neon-purple/10 border border-neon-purple/10 text-white rounded-tr-none"
                        : "bg-white/5 border border-white/5 text-gray-200 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p
                    className={`text-[9px] font-mono text-gray-500 ${
                      msg.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs bg-neon-blue/10 border border-neon-blue/20 text-neon-blue shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-gray-400 rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#10111a] border-t border-white/5 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me something about Prasanna..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 focus:border-neon-blue/30 focus:outline-none text-white placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2 rounded-xl bg-linear-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_15px_rgba(189,0,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:shadow-none cursor-pointer flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
