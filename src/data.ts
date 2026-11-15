import { BlogArticle, SkillCategory, ExperienceItem, Certification } from "./types";

export const INTRO_HIGHLIGHTS = {
  name: "Rishu Shrivastava",
  title: "Senior Architect (Data, AI & Product Innovation)",
  location: "London, UK",
  experienceYears: "14+",
  bio: "Senior Data & AI Architect with 14+ years of experience building cloud-native data platforms, real-time systems, and enterprise GenAI products. Leading product innovation and architecture at Pentaho, with work spanning a $2M generative AI initiative, agentic migration workflows and real-time change data capture.",
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
    period: "Jul 2022 – Present",
    bulletPoints: [
      "Lead EMEA Data and AI architecture strategy, designing scalable enterprise deployments of Pentaho Data Integration and Pentaho Data Catalog for global enterprise clients.",
      "Directed a $2M GenAI initiative with Hitachi Ltd, delivering core AI platform capabilities for enterprise use cases.",
      "Architected and shipped Pentaho Change Data Capture (CDC) to general availability (GA), enabling high-throughput, real-time data ingestion.",
      "Conceived and delivered an agentic AI migration accelerator to translate Informatica mappings to Pentaho Data Integration, reducing migration effort by 60–70%."
    ],
    technologies: ["Pentaho Data Integration", "Pentaho Data Catalog", "AWS", "Snowflake", "Generative AI", "Agentic AI", "Python", "Java", "Terraform", "Docker", "DevOps", "Data Governance"],
    featuredProject: {
      name: "GenAI Migration Accelerator & CDC",
      description: "Built agentic workflows to convert Informatica mappings to Pentaho Data Integration, reducing migration effort by 60–70%. Also delivered Pentaho Change Data Capture (CDC) to general availability."
    }
  },
  {
    id: "exp2",
    role: "Data Architect & Analytics Manager",
    company: "Cognizant",
    location: "India & United Kingdom",
    period: "Jan 2019 – Jul 2022",
    bulletPoints: [
      "Architected secure, serverless cloud pipelines (AWS Glue, Lambda, Athena, Snowflake) supporting real-time sales BI and trade settlements for Tier-1 investment banks and global pharmaceutical leaders.",
      "Engineered event-driven microservices running on Kubernetes to automate complex parsing of structured and unstructured business communications.",
      "Spearheaded technical responses to RFP/RFC consultations, successfully securing high-value multi-year modernization engagements."
    ],
    technologies: ["AWS", "Snowflake", "Terraform", "Docker", "Kubernetes", "Python", "Tableau", "GitLab CI/CD"],
    featuredProject: {
      name: "Serverless Analytics Ecosystem",
      description: "Co-designed an event-driven analytics pipeline on AWS to support marketing data processing and Tableau reporting."
    }
  },
  {
    id: "exp3",
    role: "Senior Associate & Tech Consultant",
    company: "Cognizant",
    location: "India",
    period: "Jan 2015 – Dec 2018",
    bulletPoints: [
      "Designed and developed low-latency streaming clusters using Apache Kafka, Spark Streaming, and Cloudera Hadoop for financial transaction routing.",
      "Refactored underlying database schemas and partitioning strategies, improving dashboard query performance by up to 90%.",
      "Won first prize in the Cognizant Global Innovation Challenge with a custom AI prototype designed to automatically translate and compile languages."
    ],
    technologies: ["Kafka", "Apache Spark", "Hive", "Python", "Java", "Pentaho Data Integration", "Pentaho Business Analytics", "Tableau", "Cloudera"],
    featuredProject: {
      name: "Language Translation Engine",
      description: "Built an AI prototype to translate and compile code, winning first prize in the Cognizant Global Innovation Challenge."
    }
  },
  {
    id: "exp4",
    role: "Software Engineer & Tech Analyst",
    company: "Cognizant",
    location: "India",
    period: "Jan 2012 – Dec 2014",
    bulletPoints: [
      "Engineered robust batch extraction, transformation, and high-throughput ingestion pipelines using enterprise orchestration platforms such as Pentaho Data Integration and Alteryx.",
      "Developed Java services and SQL databases, and peer-reviewed technical designs."
    ],
    technologies: ["Java", "SQL", "Pentaho Data Integration", "Alteryx", "Linux"],
    featuredProject: {
      name: "High-Throughput Ingestion Framework",
      description: "Designed reusable components for automated metadata injection, accelerating data warehouse ingestion cycles by approximately 30%."
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Enterprise Data Architecture & Cloud",
    iconName: "Database",
    skills: [
      { name: "Pentaho Data Integration", level: 98, featured: true, frequency: "Daily" },
      { name: "Pentaho Data Catalog", level: 95, featured: true, frequency: "Daily" },
      { name: "AWS & Big Data Platforms", level: 95, featured: true, frequency: "Daily" },
      { name: "Snowflake & Amazon Athena", level: 93, featured: true, frequency: "Daily" },
      { name: "Data Governance (GDPR / PII)", level: 90, featured: false, frequency: "Frequent" },
      { name: "Streaming & Messaging (Kafka / Kinesis / SQS)", level: 88, featured: false, frequency: "Frequent" },
    ]
  },
  {
    title: "AI, Machine Learning & Programming",
    iconName: "Code2",
    skills: [
      { name: "GenAI & Agentic AI Systems", level: 96, featured: true, frequency: "Daily" },
      { name: "Python (PyTorch / scikit-learn)", level: 95, featured: true, frequency: "Daily" },
      { name: "SQL & HiveQL", level: 92, featured: false, frequency: "Daily" },
      { name: "Java (Core, Spring, PDI Plugins)", level: 88, featured: false, frequency: "Frequent" },
      { name: "RAG & LLM Orchestration Tools", level: 94, featured: true, frequency: "Daily" },
    ]
  },
  {
    title: "DevOps, Infrastructure & Delivery",
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
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    year: "2021",
    color: "from-amber-500 to-orange-600"
  },
  {
    name: "Oracle Certified Java Programmer",
    issuer: "Oracle Corporation",
    year: "2012",
    color: "from-blue-605 to-cyan-550"
  },
  {
    name: "Cognizant Certified Pentaho Developer",
    issuer: "Cognizant Technology Solutions",
    year: "2015",
    color: "from-sky-700 to-indigo-650"
  },
  {
    name: "Google Cloud Platform Architecture (course certificate)",
    issuer: "Coursera / Google Cloud",
    year: "2020",
    color: "from-blue-500 to-slate-600"
  },
  {
    name: "Machine Learning (course certificate)",
    issuer: "Stanford University",
    year: "2019",
    color: "from-red-650 to-rose-500"
  },
  {
    name: "Natural Language Processing Specialisation (course certificate)",
    issuer: "DeepLearning.AI / Coursera",
    year: "2020",
    color: "from-teal-500 to-emerald-600"
  },
  {
    name: "PCEP – Certified Entry-Level Python Programmer",
    issuer: "Python Institute",
    year: "2021",
    color: "from-yellow-500 to-blue-500"
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog1",
    title: "GenAI Plugin Suite: Unlocking the Power of Pentaho Data Integration with GenAI",
    url: "https://pentaho.com/insights/blogs/genai-plugin-suite-unlocking-the-power-of-pentaho-data-integration-with-genai/",
    publishDate: "2023-11-14",
    readingTime: "12 min read",
    category: "AI Integration",
    summary: "An introduction to the Pentaho GenAI Plugin Suite and its use in connecting enterprise data integration workflows with large language models.",
    tags: ["Generative AI", "Pentaho", "Data Engineering", "Enterprise AI"],
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "blog2",
    title: "Topic Modelling: Latent Dirichlet Allocation, an Introduction",
    url: "https://anotherreeshu.wordpress.com/2020/06/11/topic-modelling-latent-dirichlet-allocation-an-introduction/",
    publishDate: "2020-06-11",
    readingTime: "8 min read",
    category: "Data Science",
    summary: "Discover abstract thematic patterns in vast unstructured corpora. Features a detailed conceptual breakdown of the Dirichlet distribution, statistical intuition, and Python Scikit-Learn LDA walkthroughs with visualization tools.",
    tags: ["LDA", "Topic Modelling", "Python", "NLP", "Machine Learning"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "blog3",
    title: "IaC – Terraform: Provisioning AWS",
    url: "https://anotherreeshu.wordpress.com/2020/05/13/iac-terraform-provisioning-aws/",
    publishDate: "2020-05-13",
    readingTime: "6 min read",
    category: "DevOps",
    summary: "Demystifying infrastructure as code. This practical guide covers writing custom TF configurations, managing state files, and spinning up safe multi-AZ Amazon VPCs, subnets, and EC2 nodes cleanly.",
    tags: ["Terraform", "AWS", "Infrastructure-as-Code", "DevOps"],
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "blog4",
    title: "Cloud Adoption CAN be bad for you … if not done right",
    url: "https://anotherreeshu.wordpress.com/2020/01/19/cloud-adoption-can-be-bad-for-you-if-not-done-right/",
    publishDate: "2020-01-19",
    readingTime: "5 min read",
    category: "Cloud Strategy",
    summary: "A reality check on cloud migrations. Analyzes typical corporate fallacies (lift-and-shift traps, blind vendor lock-in, dynamic bill expansion), and presents architectural frameworks for successful multi-cloud governance.",
    tags: ["Cloud Strategy", "Cloud Adoption", "Enterprise Architecture", "FinOps"],
    coverImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "blog5",
    title: "Extracting Tables from PDF",
    url: "https://anotherreeshu.wordpress.com/2019/07/06/extracting-tables-from-pdf/",
    publishDate: "2019-07-06",
    readingTime: "4 min read",
    category: "Data Wrangling",
    summary: "Stop manual transcription. Shares real coding blueprints utilizing Python extraction libraries (Tabula, PDFPlumber) combined with Pandas workflows to clean, structure, and export complex tables from flat docs.",
    tags: ["Python", "PDF Extraction", "Pandas", "Data Cleansing"],
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600"
  }
];

export const RECRUITER_ROLES = [
  {
    id: "role_etl",
    name: "Enterprise Data/ETL Architect",
    skillsNeeded: ["Pentaho Data Integration", "Pentaho Data Catalog", "AWS & Big Data Platforms", "Snowflake & Amazon Athena", "Data Governance (GDPR / PII)", "Streaming & Messaging (Kafka / Kinesis / SQS)"],
    experienceMatch: "exp1",
    justification: "Rishu leads Data and AI architecture strategy across EMEA at Pentaho and has designed scalable enterprise data solutions supporting critical business processes for global enterprise clients."
  },
  {
    id: "role_aiml",
    name: "AI & Product Innovation Lead",
    skillsNeeded: ["GenAI & Agentic AI Systems", "Python (PyTorch / scikit-learn)", "RAG & LLM Orchestration Tools", "Java (Core, Spring, PDI Plugins)"],
    experienceMatch: "exp1",
    justification: "Rishu directed Hitachi's $2M GenAI product initiative, published an introduction to topic modelling with LDA, and deployed automated migration accelerators using agentic intelligence."
  },
  {
    id: "role_cloud",
    name: "Cloud & DevOps Architect",
    skillsNeeded: ["AWS & Big Data Platforms", "Terraform (Infrastructure as Code)", "Docker & Kubernetes Orchestration", "CI/CD (GitLab, Jenkins, Actions)"],
    experienceMatch: "exp2",
    justification: "Earned the AWS Solutions Architect credential in 2021 and has designed serverless ETL stacks and DevOps architectures using Athena, Lambda, Glue, DynamoDB, and GitLab CI/CD."
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
    { id: "dest_dashboard", name: "Real-time Power BI / Dashboards", desc: "Live business intelligence and reports." }
  ]
};
