import { BlogArticle, SkillCategory, ExperienceItem, Certification } from "./types";

export const INTRO_HIGHLIGHTS = {
  name: "Rishu Shrivastava",
  title: "Senior Architect - Data, AI & Product Innovation",
  location: "London, UK",
  experienceYears: "14+",
  bio: "Senior Data & AI Architect with 14+ years of experience designing and delivering cloud-native data platforms, real-time systems, and AI-driven products across financial services, healthcare, and communications domains. Currently leading product innovation and architecture at Pentaho, driving multi-million dollar GenAI initiatives, building real-time data capabilities, and developing AI-powered accelerators for large-scale platform modernization. Proven track record of translating emerging technologies, including Gen AI and Agentic AI systems, into enterprise-grade solutions that improve product capability, accelerate delivery, and drive measurable business outcomes.",
  currentStatus: "Open to strategic advisory roles, speaking engagements, and architectural consulting",
  linkedIn: "https://www.linkedin.com/in/rishushrivastava/",
  github: "https://github.com/rishuatgithub",
  blog: "https://anotherreeshu.wordpress.com",
};

export const EXPERIENCE_HISTORY: ExperienceItem[] = [
  {
    id: "exp1",
    role: "Senior Architect, Product Innovation & Professional Services",
    company: "Hitachi Vantara / Pentaho",
    location: "United Kingdom",
    period: "July 2022 - Present",
    bulletPoints: [
      "Lead EMEA Data and AI architecture strategy, designing scalable enterprise Pentaho deployments for global fortune-list clients.",
      "Directed a multi-million $ GenAI initiative with Hitachi Ltd, delivering core AI platform capabilities that accelerated product adoption and revenue streams.",
      "Architected and shipped Pentaho Change Data Capture (CDC) to General Availability (GA), delivering high-throughput real-time ingestion with near-zero latency.",
      "Conceived and delivered an Agentic AI-driven automated Migration Accelerator to translate Informatica mappings to Pentaho, slashing conversion overhead by 60-70%."
    ],
    technologies: ["Pentaho PDI", "Pentaho Data Catalog", "AWS", "Snowflake", "Generative AI", "Agentic AI", "Python", "Java", "Terraform", "Docker", "DevOps", "Data Governance"],
    featuredProject: {
      name: "GenAI Migration Accelerator & CDC",
      description: "Conceived and shipped an AI-powered migration accelerator converting Informatica mappings to Pentaho using agentic workflows with 70% effort reductions, alongside rolling out Pentaho CDC (Change Data Capture) to GA."
    }
  },
  {
    id: "exp2",
    role: "Data Architect & Analytics Manager",
    company: "Cognizant",
    location: "India & United Kingdom",
    period: "Jan 2019 - July 2022",
    bulletPoints: [
      "Architected secure, serverless cloud pipelines (AWS Glue, Lambda, Athena, Snowflake) supporting real-time sales BI and trade settlements for Tier-1 investment banks and global pharmaceutical leaders.",
      "Engineered event-driven microservices running on Kubernetes to automate complex parsing of structured and unstructured business communications.",
      "Spearheaded technical responses to RFP/RFC consultations, successfully securing high-value multi-year modernization engagements."
    ],
    technologies: ["AWS", "Snowflake", "Terraform", "Docker", "Kubernetes", "Python", "Tableau", "GitLab CI/CD"],
    featuredProject: {
      name: "Serverless Analytics Ecosystem",
      description: "Codesigned an AWS event-sourced marketing pipeline serving dynamic Tableau reporting models, achieving massive cost reductions and sub-second rendering bounds."
    }
  },
  {
    id: "exp3",
    role: "Senior Associate & Tech Consultant",
    company: "Cognizant",
    location: "India",
    period: "Jan 2015 - Dec 2018",
    bulletPoints: [
      "Designed and developed low-latency streaming clusters using Apache Kafka, Spark Streaming, and Cloudera Hadoop for financial transaction routing.",
      "Refactored underlying database schemas and partitioning strategies, boosting sluggish business dashboards by up to 90% in query speeds.",
      "Won first prize in the Cognizant Global Innovation Challenge with a custom AI prototype designed to automatically translate and compile languages."
    ],
    technologies: ["Kafka", "Apache Spark", "Hive", "Python", "Java", "Pentaho Plus", "Tableau", "Cloudera"],
    featuredProject: {
      name: "Language Translation Engine",
      description: "Created an AI-driven script compiler and translator converting legacy code patterns, winning top laurels in the annual Cognizant Innovation challenge."
    }
  },
  {
    id: "exp4",
    role: "Software Engineer & Tech Analyst",
    company: "Cognizant",
    location: "India",
    period: "Jan 2012 - Dec 2014",
    bulletPoints: [
      "Engineered robust batch extraction, transformation, and high-throughput ingestion pipelines using enterprise orchestration platforms such as Pentaho and Alteryx.",
      "Developed complex Java microservices, SQL databases, and peer-reviewed design assets to ensure GDPR compliance."
    ],
    technologies: ["Java", "SQL", "Pentaho PDI", "Alteryx", "Linux"],
    featuredProject: {
      name: "High-Throughput Ingestion Framework",
      description: "Designed re-usable corporate assets for automated metadata injection, accelerating DW ingestion cycles by approximately 30%."
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Enterprise Data Architecture & Cloud",
    iconName: "Database",
    skills: [
      { name: "Pentaho Plus PDI / Catalog", level: 98, featured: true, frequency: "Daily" },
      { name: "AWS Cloud & BigData Stack", level: 95, featured: true, frequency: "Daily" },
      { name: "Data Warehousing (Snowflake / Athena)", level: 93, featured: true, frequency: "Daily" },
      { name: "Data Governance (GDPR / PII)", level: 90, featured: false, frequency: "Frequent" },
      { name: "Streaming (Kafka / Kinesis / SQS)", level: 88, featured: false, frequency: "Frequent" },
    ]
  },
  {
    title: "AI, Machine Learning & Programming",
    iconName: "Code2",
    skills: [
      { name: "GenAI & Agentic AI Systems", level: 96, featured: true, frequency: "Daily" },
      { name: "Python (PyTorch / Scikit-Learn)", level: 95, featured: true, frequency: "Daily" },
      { name: "SQL & Relational/HQL Languages", level: 92, featured: false, frequency: "Daily" },
      { name: "Java (Core, Spring, PDI Plugins)", level: 88, featured: false, frequency: "Frequent" },
      { name: "RAG & LLM Orchestration Tools", level: 94, featured: true, frequency: "Daily" },
    ]
  },
  {
    title: "Libraries, DevOps & Infrastructure",
    iconName: "Cpu",
    skills: [
      { name: "Terraform (Infrastructure as Code)", level: 90, featured: true, frequency: "Daily" },
      { name: "Docker & Kubernetes Orchestration", level: 88, featured: true, frequency: "Frequent" },
      { name: "CI/CD (GitLab, Jenkins, Actions)", level: 87, featured: false, frequency: "Frequent" },
      { name: "Enterprise Agile & Pre-sales", level: 92, featured: false, frequency: "Frequent" },
      { name: "Schedulers (Rundeck, Cron, Control-M)", level: 85, featured: false, frequency: "Frequent" },
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "AWS Solution Architect - Associate",
    issuer: "Amazon Web Services (AWS)",
    year: "2021",
    credentialId: "AWS-ASA-9941A",
    color: "from-amber-500 to-orange-600"
  },
  {
    name: "Oracle Certified Java Programmer",
    issuer: "Oracle Corporation",
    year: "2012",
    credentialId: "OCJP-99424",
    color: "from-blue-605 to-cyan-550"
  },
  {
    name: "Cognizant Certified Pentaho Developer",
    issuer: "Cognizant Technology Solutions",
    year: "2015",
    credentialId: "CCPD-10291",
    color: "from-sky-700 to-indigo-650"
  },
  {
    name: "Coursera Certified - Google Cloud Platform Architecture",
    issuer: "Coursera / Google Cloud",
    year: "2020",
    credentialId: "C-GCP-8842",
    color: "from-blue-500 to-slate-600"
  },
  {
    name: "Stanford Certified - Machine Learning",
    issuer: "Stanford University",
    year: "2019",
    credentialId: "S-ML-3329",
    color: "from-red-650 to-rose-500"
  },
  {
    name: "Coursera Certified - Natural Language Specialisation",
    issuer: "Coursera / Deeplearning.AI",
    year: "2020",
    credentialId: "C-NLS-771",
    color: "from-teal-500 to-emerald-600"
  },
  {
    name: "Certified Python Programmer - PCEP 30-01",
    issuer: "Python Institute",
    year: "2021",
    credentialId: "PCEP-304",
    color: "from-yellow-500 to-blue-500"
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog1",
    title: "GenAI Plugin Suite: Unlocking the Power of Pentaho Data Integration with GenAI",
    url: "https://community.hitachivantara.com/blogs/author/genai-plugin-suite",
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
    skillsNeeded: ["Pentaho Plus PDI / Catalog", "AWS Cloud & BigData Stack", "Data Warehousing (Snowflake / Athena)", "Data Governance (GDPR / PII)", "Streaming (Kafka / Kinesis / SQS)"],
    experienceMatch: "exp1",
    justification: "Rishu leading Data and AI architecture strategy across EMEA at Pentaho and has designed scalable enterprise data solutions supporting critical business processes for global Fortune clients."
  },
  {
    id: "role_aiml",
    name: "AI & Product Innovation Lead",
    skillsNeeded: ["GenAI & Agentic AI Systems", "Python (PyTorch / Scikit-Learn)", "RAG & LLM Orchestration Tools", "Java (Core, Spring, PDI Plugins)"],
    experienceMatch: "exp1",
    justification: "Rishu directed Hitachi's $2M GenAI product initiative, coauthored public topic modeling/LDA literature, and deployed automated migration accelerators using agentic intelligence."
  },
  {
    id: "role_cloud",
    name: "Cloud & DevOps Architect",
    skillsNeeded: ["AWS Cloud & BigData Stack", "Terraform (Infrastructure as Code)", "Docker & Kubernetes Orchestration", "CI/CD (GitLab, Jenkins, Actions)"],
    experienceMatch: "exp2",
    justification: "Certified AWS Solutions Architect and Terraform Associate. He has successfully designed serverless ETL stacks and DevOps architectures using Athena, Lambda, Glue, DynamoDB, and GitLab CI/CD."
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
