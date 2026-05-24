export interface BlogArticle {
  id: string;
  title: string;
  url: string;
  publishDate: string;
  readingTime: string;
  category: string;
  summary: string;
  tags: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0-100 percentage
  featured: boolean;
  frequency: string; // "Daily", "Frequent" or "expert level"
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bulletPoints: string[];
  technologies: string[];
  featuredProject?: {
    name: string;
    description: string;
  };
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  color: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  category: "Hiring" | "Consulting" | "General";
  timestamp: string;
}
