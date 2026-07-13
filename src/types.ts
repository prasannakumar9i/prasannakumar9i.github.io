export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: "ai-ml" | "web-systems" | "nlp-rag";
  githubUrl: string;
  demoUrl: string;
  caseStudyUrl?: string;
  hologramType: "cube" | "dna" | "network" | "globe";
}

export interface Skill {
  name: string;
  level: number; // Percentage, e.g. 90
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
  credentialId?: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  gpa: string;
  details: string[];
}

export interface ChatMessage {
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}
