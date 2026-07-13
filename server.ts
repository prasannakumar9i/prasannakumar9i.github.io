import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("GEMINI_API_KEY is missing or set to placeholder. Chatbot will run in simulation mode.");
}

// AI Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const systemPrompt = `You are the interactive AI Assistant avatar for Prasanna Kumar, an aspiring AI Engineer, ML Engineer, and Data Scientist.
Your goal is to represent Prasanna Kumar professionally, demonstrating his expertise and answering questions about him based ONLY on real verified details.

Prasanna Kumar's Details:
- Role: AI Engineer | Machine Learning Engineer | Data Scientist | Generative AI Developer
- Focus: Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), NLP, Computer Vision, Predictive Analytics, and Full Stack AI Applications.
- Education: Bachelor of Engineering (B.E.) in Computer Science and Engineering from HKBK College of Engineering, Visvesvaraya Technological University (VTU) (CGPA: 7.4 / 10, Graduation: 2026). Location: Bengaluru, Karnataka, India.
- Experience: AI/ML Data Science Intern at Vision Astra EV Academy (February 2026 – June 2026). Responsibilities included: building ML models using Python, data preprocessing & feature engineering, model training & evaluation, EDA, data visualization, predictive analytics, and AI app development.
- Featured Projects:
  1. EV AI Diagnostic Platform: An AI-powered Electric Vehicle diagnostic platform that combines Machine Learning, RAG, telemetry analysis, conversational AI, engineering calculations, and intelligent vehicle diagnostics. Tech: Python, Flask, React, TypeScript, LangChain, FAISS, ChromaDB, Sentence Transformers, OpenAI API, Google Gemini, XGBoost, Scikit-learn, PyMuPDF, OCR, Git, GitHub.
  2. AI Resume Screening Agent: An AI-powered Resume Screening and Candidate Ranking System that parses resumes, understands job descriptions, performs semantic matching using NLP and Sentence Transformers, and ranks candidates intelligently. Tech: Python, Sentence Transformers, spaCy, Scikit-learn, PyMuPDF, pdfplumber, Tesseract OCR, NumPy, Pandas, Git, GitHub.
- Technical Skills:
  - Programming: Python, Java, JavaScript, SQL, HTML, CSS
  - Machine Learning: Scikit-learn, XGBoost, TensorFlow (Basics), PyTorch (Basics)
  - Artificial Intelligence: Machine Learning, Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Natural Language Processing, Prompt Engineering
  - NLP Libraries: spaCy, Sentence Transformers, NLTK
  - Frameworks: Flask, React, Tailwind CSS, Vite
  - Databases: MySQL, MongoDB, ChromaDB, FAISS
  - Data Science: NumPy, Pandas, Matplotlib, Power BI
  - Tools: Git, GitHub, VS Code, Google Colab, Jupyter Notebook, Postman
- Personality: Professional, technical, concise, supportive. Keep answers short (2-3 sentences max). Be honest; do not invent credentials.`;

  try {
    if (ai) {
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      if (history && history.length > 0) {
        for (const histMsg of history.slice(-6)) {
          if (histMsg.sender === "user") {
            await chat.sendMessage({ message: histMsg.text });
          }
        }
      }

      const response = await chat.sendMessage({ message: message });
      return res.json({ response: response.text });
    } else {
      const simulatedResponse = simulateResponse(message);
      return res.json({ response: simulatedResponse });
    }
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    const simulatedResponse = simulateResponse(message);
    return res.json({ response: simulatedResponse });
  }
});

function simulateResponse(message: string): string {
  const msgLower = message.toLowerCase();
  if (msgLower.includes("project") || msgLower.includes("work") || msgLower.includes("diagnostic") || msgLower.includes("resume")) {
    return "Prasanna has engineered two core featured platforms: the EV AI Diagnostic Platform (integrating battery health forecasts and RAG systems) and the AI Resume Screening Agent (using semantic Sentence Transformers and spaCy NLP pipelines). Check the Projects section for full details!";
  }
  if (msgLower.includes("skill") || msgLower.includes("language") || msgLower.includes("python") || msgLower.includes("tech")) {
    return "Prasanna is skilled in Python, Java, SQL, Scikit-learn, XGBoost, and generative frameworks like LangChain, FAISS, and ChromaDB, paired with modern React interfaces.";
  }
  if (msgLower.includes("intern") || msgLower.includes("experience") || msgLower.includes("vision astra")) {
    return "From February to June 2026, Prasanna interned at Vision Astra EV Academy as an AI/ML Data Science Intern. He built predictive ML models, performed preprocessing, exploratory data analysis, and predictive vehicle telemetry analytics.";
  }
  if (msgLower.includes("education") || msgLower.includes("college") || msgLower.includes("cgpa") || msgLower.includes("graduation")) {
    return "He is a Computer Science and Engineering B.E. graduate (2026) from HKBK College of Engineering, Visvesvaraya Technological University (VTU) with a CGPA of 7.4/10.";
  }
  if (msgLower.includes("contact") || msgLower.includes("hire") || msgLower.includes("email") || msgLower.includes("phone")) {
    return "You can contact Prasanna via the transmit form on this website or checkout his GitHub profile at github.com/prasannakumar9i. Real credentials will be provided upon review request!";
  }
  return "Hello! I am Prasanna's interactive portfolio assistant. Feel free to ask about his internships, exact engineering skills, or his dual flagship AI projects!";
}

// Serve static assets or use Vite dev server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
