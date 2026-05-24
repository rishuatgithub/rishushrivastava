import { BlogArticle, SkillCategory, ExperienceItem, Certification } from "./types";

export const INTRO_HIGHLIGHTS = {
  name: "Rishu Shrivastava",
  title: "Solution Architect - Data, Cloud & AI",
  location: "Bengaluru, India",
  experienceYears: "10+",
  bio: "Highly accomplished Solution Architect playing a key role in designing enterprise analytics, cloud ecosystems, and intelligent data pipeline frameworks. Certified professional with extensive hands-on expertise building production-ready architectures, leading strategic engineering teams, and developing innovative custom frameworks such as the GenAI Plugin Suite for commercial analytics platforms.",
  currentStatus: "Open to strategic advisory roles, speaking engagements, and architectural consulting",
  linkedIn: "https://www.linkedin.com/in/rishushrivastava/",
  github: "https://github.com/rishuatgithub",
  blog: "https://anotherreeshu.wordpress.com",
};

export const EXPERIENCE_HISTORY: ExperienceItem[] = [
  {
    id: "exp1",
    role: "Solution Architect & Consultant - Pentaho Professional Services",
    company: "Hitachi Vantara",
    location: "Bengaluru, India / Global client engagements",
    period: "2019 - Present",
    bulletPoints: [
      "Architect and orchestrate enterprise data solutions, supporting critical business processes for Fortune 500 banks, retail chains, and manufacturing giants.",
      "Conceived, engineered, and shipped the 'GenAI Plugin Suite' for Pentaho Data Integration, allowing businesses to safely inject LLM agents, semantic data cleansing, and prompt templates natively into ETL streams.",
      "Lead and collaborate with key stakeholders to define target state architectures, bridging engineering, product, and C-suite objectives.",
      "Train, mentor, and lead technical delivery squads of 10+ engineers, implementing robust dev practices, automated testing, and CI/CD pipelines.",
    ],
    technologies: ["Pentaho+", "AWS", "Python", "Snowflake", "Terraform", "Docker", "Java", "Generative AI", "C++", "VPC Architecture"],
    featuredProject: {
      name: "GenAI Plugin Suite Integration",
      description: "Implemented custom Java, Python, and Javascript microservices embedded directly inside data ingestion pipelines, transforming raw multi-lingual documents into vector embeddings in real time."
    }
  },
  {
    id: "exp2",
    role: "Associate Developer",
    company: "Hitachi Vantara (Pentaho Portfolio)",
    location: "Bengaluru, India",
    period: "2017 - 2019",
    bulletPoints: [
      "Engineered core custom plugins for Pentaho Data Integration (PDI), including data connectors and multi-tenant scaling utilities.",
      "Created containerized analytical testbeds using Docker and Kubernetes to validate scaling characteristics under massive ingestion workloads.",
      "Consulted with multiple APAC-region enterprises to modernize legacy on-premise DW pipelines to cloud warehouses (AWS Redshift / S3 / Snowflake).",
      "Actively supported open-source developers to troubleshoot, patch, and expand public Pentaho community utilities."
    ],
    technologies: ["Pentaho", "Docker", "Kubernetes", "Linux Shell", "PostgreSQL", "Pandas", "Scikit-Learn", "Git"],
    featuredProject: {
      name: "Bissol Table Data Editor & Plugins",
      description: "Co-authored and integrated robust table editor interfaces and IP lookup features that achieved 80% improvement in analytical test feedback cycles."
    }
  },
  {
    id: "exp3",
    role: "Programmer Analyst",
    company: "Cognizant Technology Solutions",
    location: "Kolkata / Bengaluru, India",
    period: "2015 - 2017",
    bulletPoints: [
      "Programmed scalable algorithmic processing flows using Python and Core Java for legacy insurance platforms.",
      "Optimized legacy Oracle relational stored procedures, reducing execution times for critical daily batches by up to 45%.",
      "Engaged directly with global product owners to build custom analytics dashboards, extracting insights from multi-country operations.",
      "Constructed custom PDF tabular text parsing engines using Python, liberating unstructured transactional logs for real-time analysis."
    ],
    technologies: ["Python", "Oracle DB", "Java", "SQL", "Spring Framework", "Apache Commons", "PDF Parsing Systems"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Analytics & Data Orchestration",
    iconName: "Database",
    skills: [
      { name: "Pentaho+ Data Platform", level: 98, featured: true, frequency: "Daily" },
      { name: "ETL / Data Pipeline Design", level: 95, featured: true, frequency: "Daily" },
      { name: "Enterprise Architecture Definition", level: 90, featured: true, frequency: "Frequent" },
      { name: "Data Warehousing (Snowflake / Redshift)", level: 92, featured: false, frequency: "Frequent" },
      { name: "Data Modelling (Mondrian, Star-Schema)", level: 88, featured: false, frequency: "Frequent" },
    ]
  },
  {
    title: "Programming Languages & Runtimes",
    iconName: "Code2",
    skills: [
      { name: "Python", level: 95, featured: true, frequency: "Daily" },
      { name: "SQL", level: 92, featured: true, frequency: "Daily" },
      { name: "Java (Core & Spring)", level: 85, featured: false, frequency: "Frequent" },
      { name: "Javascript & Typescript (Node, React)", level: 82, featured: false, frequency: "Frequent" },
      { name: "Shell Scripting (Bash)", level: 90, featured: false, frequency: "Daily" },
    ]
  },
  {
    title: "Generative AI & Cloud Systems",
    iconName: "Cpu",
    skills: [
      { name: "Generative AI SDK Integration", level: 94, featured: true, frequency: "Daily" },
      { name: "AWS Architecture", level: 90, featured: true, frequency: "Daily" },
      { name: "Terraform (IaC)", level: 88, featured: true, frequency: "Frequent" },
      { name: "Docker & Kubernetes", level: 85, featured: false, frequency: "Frequent" },
      { name: "GCP (Cloud Storage & AI Engines)", level: 80, featured: false, frequency: "Occasional" },
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services (AWS)",
    year: "2021",
    credentialId: "AWS-ASA-9941A",
    color: "from-amber-500 to-orange-600"
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    year: "2022",
    credentialId: "HC-TFA-5509",
    color: "from-purple-500 to-indigo-600"
  },
  {
    name: "Pentaho Solution Architect & Data Integration",
    issuer: "Hitachi Vantara",
    year: "2019",
    credentialId: "HV-PSI-332",
    color: "from-blue-500 to-cyan-600"
  },
  {
    name: "Snowflake Core Data Architect Certificate",
    issuer: "Snowflake Inc",
    year: "2023",
    credentialId: "SF-CDC-7721",
    color: "from-sky-400 to-sky-600"
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog1",
    title: "GenAI Plugin Suite: Unlocking the Power of Pentaho Data Integration with GenAI",
    url: "https://community.hitachivantara.com/blogs/author/genai-plugin-suite", // Fallback, let's link to his pentaho bio or article
    publishDate: "2023-11-14",
    readingTime: "12 min read",
    category: "AI Integration",
    summary: "Introducing the comprehensive Pentaho GenAI Suite. Step-by-step blueprint to orchestrate zero-trust LLM inference blocks, transform text outputs, and compute vectors directly inside enterprise data flows without exposing private customer keys.",
    tags: ["Generative AI", "Pentaho", "Data Engineering", "Enterprise AI"]
  },
  {
    id: "blog2",
    title: "Topic Modelling : Latent Dirichlet Allocation, an introduction",
    url: "https://anotherreeshu.wordpress.com/2020/06/11/topic-modelling-latent-dirichlet-allocation-an-introduction/",
    publishDate: "2020-06-11",
    readingTime: "8 min read",
    category: "Data Science",
    summary: "Discover abstract thematic patterns in vast unstructured corpora. Features a detailed conceptual breakdown of the Dirichlet distribution, statistical intuition, and Python Scikit-Learn LDA walkthroughs with visualization tools.",
    tags: ["LDA", "Topic Modelling", "Python", "NLP", "Machine Learning"]
  },
  {
    id: "blog3",
    title: "IaC – Terraform: Provisioning AWS",
    url: "https://anotherreeshu.wordpress.com/2020/05/13/iac-terraform-provisioning-aws/",
    publishDate: "2020-05-13",
    readingTime: "6 min read",
    category: "DevOps",
    summary: "Demystifying infrastructure as code. This practical guide covers writing custom TF configurations, managing state files, and spinning up safe multi-AZ Amazon VPCs, subnets, and EC2 nodes cleanly.",
    tags: ["Terraform", "AWS", "Infrastructure-as-Code", "DevOps"]
  },
  {
    id: "blog4",
    title: "Cloud Adoption CAN be bad for you … if not done right",
    url: "https://anotherreeshu.wordpress.com/2020/01/19/cloud-adoption-can-be-bad-for-you-if-not-done-right/",
    publishDate: "2020-01-19",
    readingTime: "5 min read",
    category: "Cloud Strategy",
    summary: "A reality check on cloud migrations. Analyzes typical corporate fallacies (lift-and-shift traps, blind vendor lock-in, dynamic bill expansion), and presents architectural frameworks for successful multi-cloud governance.",
    tags: ["Cloud Strategy", "Cloud Adoption", "Enterprise Architecture", "FinOps"]
  },
  {
    id: "blog5",
    title: "Extracting Tables from PDF",
    url: "https://anotherreeshu.wordpress.com/2019/07/06/extracting-tables-from-pdf/",
    publishDate: "2019-07-06",
    readingTime: "4 min read",
    category: "Data Wrangling",
    summary: "Stop manual transcription. Shares real coding blueprints utilizing Python extraction libraries (Tabula, PDFPlumber) combined with Pandas workflows to clean, structure, and export complex tables from flat docs.",
    tags: ["Python", "PDF Extraction", "Pandas", "Data Cleansing"]
  }
];

export const RECRUITER_ROLES = [
  {
    id: "role_etl",
    name: "Enterprise Data/ETL Architect",
    skillsNeeded: ["Pentaho+ Data Platform", "ETL / Data Pipeline Design", "Enterprise Architecture Definition", "Data Warehousing (Snowflake / Redshift)", "Shell Scripting (Bash)"],
    experienceMatch: "exp1",
    justification: "Rishu has 6+ years at Hitachi Vantara leading Pentaho Professional Services, designing star-schemas and cloud data migrations for Fortune 500 banks."
  },
  {
    id: "role_aiml",
    name: "AI / Data Science Engineer",
    skillsNeeded: ["Generative AI SDK Integration", "Python", "Data Modelling (Mondrian, Star-Schema)"],
    experienceMatch: "exp1",
    justification: "Rishu personally designed and compiled the 'GenAI Plugin Suite' for Pentaho Data Integration, integrating LLM nodes natively for enterprise clients. His blogs also showcase advanced topics such as Topic Modelling (LDA)."
  },
  {
    id: "role_cloud",
    name: "Cloud & DevOps Architect",
    skillsNeeded: ["AWS Architecture", "Terraform (IaC)", "Docker & Kubernetes", "Python"],
    experienceMatch: "exp1",
    justification: "A Certified AWS Solutions Architect and Terraform Associate. He has published concrete guidelines on multi-tier AWS provisioning through IaC pipelines."
  }
];

export const SANDBOX_NODES = {
  sources: [
    { id: "src_sql", name: "Transactional RDS (SQL)", desc: "Relational client logs, updated hourly." },
    { id: "src_s3", name: "Amazon S3 Data Lake", desc: "Unstructured PDFs, reports, and text logs." }
  ],
  transforms: [
    { id: "tf_clean", name: "Schema Mapping & Transform", desc: "Data Cleansing, Star Schema Mapping, Data Integration." },
    { id: "tf_ai", name: "GenAI NLP Extraction & Cleansing", desc: "Extract metadata, translate, calculate vector embeddings." }
  ],
  destinations: [
    { id: "dest_snowflake", name: "Snowflake Analytic Warehouse", desc: "Highly structured analytics, multi-tenant schemas." },
    { id: "dest_dashboard", name: "Real-time PowerBI / Dashboards", desc: "Live business intelligence and reports." }
  ]
};
