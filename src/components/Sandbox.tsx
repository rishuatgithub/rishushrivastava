import { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Square, 
  Database, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Eye, 
  Settings, 
  Search, 
  ArrowRight, 
  Lock, 
  AlertCircle, 
  Check, 
  Sparkles, 
  Terminal, 
  Network, 
  ExternalLink, 
  FileText, 
  Gauge, 
  GitBranch, 
  BookOpen, 
  Activity, 
  ShieldAlert,
  BarChart3,
  Brain
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types for Scenario & Fields
interface SampleField {
  name: string;
  type: string;
  pii: boolean;
  desc: string;
}

interface Scenario {
  id: string;
  name: string;
  industry: string;
  desc: string;
  sources: string[];
  throughputBase: number;
  latencyBase: number;
  qualityBase: number;
  bronze: {
    format: string;
    desc: string;
    schema: SampleField[];
  };
  silver: {
    desc: string;
    pdiTransforms: string[];
    schema: SampleField[];
  };
  gold: {
    desc: string;
    aggregates: string[];
    schema: SampleField[];
  };
  analytics: {
    desc: string;
    biOutputs: string[];
    aiOutputs: string[];
    schema: SampleField[];
  };
  logSequence: string[];
}

// Concrete Scenarios Mapping Medallion Layers & Governance
const SCENARIOS: Scenario[] = [
  {
    id: "customer_360",
    name: "Customer 360 & Marketing Analytics",
    industry: "E-Commerce",
    desc: "Ingests raw checkout JSON entries and clickstream webhooks, cleansing customer identifiers and materializing lifetime value (LTV) cohorts.",
    sources: ["Salesforce Webhooks", "Production PostgreSQL Transactions", "Google Analytics clickstream"],
    throughputBase: 124.5,
    latencyBase: 42,
    qualityBase: 99.8,
    bronze: {
      format: "JSON Lines / Append-Only S3",
      desc: "Captures full, raw click and sales payloads as they arrive. Retains nested formats with untruncated history for re-processing schemas.",
      schema: [
        { name: "event_uuid", type: "string", pii: false, desc: "Globally unique event token" },
        { name: "user_email", type: "string", pii: true, desc: "Raw customer identifier" },
        { name: "cart_sum", type: "string", pii: false, desc: "Raw unvalidated monetary string" },
        { name: "ip_address", type: "string", pii: true, desc: "IPv4 customer landing address" },
        { name: "timestamp_epoch", type: "integer", pii: false, desc: "Raw server epoch tick count" }
      ]
    },
    silver: {
      desc: "Cleansed and conformed delta Tables. Pentaho Data Integration casts values, prunes invalid session UUIDs, hashes PII, and applies ACID transactions.",
      pdiTransforms: [
        "Cast cart_sum to numeric(10,2)",
        "Convert timestamp_epoch to datetime",
        "Deduplicate user sessions via UniqueRows",
        "Anonymize user_email via SHA-256 Hash algorithm",
        "Filter Nulls/Exceptions (Discard cart_sum < $0)"
      ],
      schema: [
        { name: "user_hash", type: "varchar(64)", pii: false, desc: "SHA-256 hashed unique ID" },
        { name: "cart_amount_usd", type: "numeric(10,2)", pii: false, desc: "Validated float purchase price" },
        { name: "client_ip_masked", type: "varchar(16)", pii: false, desc: "Subnet masked client IP (e.g. 192.168.X.X)" },
        { name: "captured_at", type: "timestamp", pii: false, desc: "Conformed database ISO timestring" }
      ]
    },
    gold: {
      desc: "Materialized star-schemas and dimensional aggregates in Snowflake, optimized for ultra low-latency queries and AI agents.",
      aggregates: [
        "SUM(cart_amount_usd) → gross_revenue_by_date",
        "COUNT(DISTINCT user_hash) → active_daily_buyers",
        "AVG(cart_amount_usd) → average_order_value_cohort"
      ],
      schema: [
        { name: "calendar_date", type: "date", pii: false, desc: "Business calendar key" },
        { name: "unique_buyers", type: "integer", pii: false, desc: "Daily distinct customer counts" },
        { name: "total_gross_gmv", type: "numeric(14,2)", pii: false, desc: "Gross financial volume aggregated" },
        { name: "average_order_value", type: "numeric(10,2)", pii: false, desc: "Average receipt value aggregated" }
      ]
    },
    analytics: {
      desc: "Downstream high-value layers. The BI sub-layer runs low-latency dashboard aggregations in Snowflake, while the AI sub-layer consumes conformed Silver features directly from the Delta tables to train customer lifecycle models.",
      biOutputs: [
        "Executive Revenue & CLV cohort analysis panels",
        "DQI SLA metrics & drift alert trackers",
        "Daily active buyer geographic distributions"
      ],
      aiOutputs: [
        "Customer Churn Propensity scoring model (XGBoost)",
        "Collaborative personalized recommendation feeds",
        "Automatic buyer cohort clustering (K-Means)"
      ],
      schema: [
        { name: "churn_probability", type: "double [0.0 - 1.0]", pii: false, desc: "AI-computed customer defection likelihood coefficient" },
        { name: "predicted_lifetime_value_usd", type: "numeric(12,2)", pii: false, desc: "Regression model customer long-term value" },
        { name: "recommended_product_skus", type: "array(varchar)", pii: false, desc: "Personalized item arrays generated by ML algorithm" },
        { name: "cohort_class_tag", type: "varchar(32)", pii: false, desc: "Customer persona classification (e.g., 'Core Enthusiast')" }
      ]
    },
    logSequence: [
      "[INFO - PDI Engine] Initializing medallion stream for 'Customer 360 & Marketing Analytics' [E-Commerce]...",
      "[INGEST - Bronze] Loading raw event clicks & webhooks to landing S3 bucket (raw_marketing/landing/)...",
      "[GOVERNANCE - PDC] Automatic crawler cataloged 5 new fields in Bronze table. Tagged user_email with #Sensitive-PII-Found.",
      "[PROCESS - PDI] PDI Transformation 'Bronze_To_Silver_Cleanser' running on AWS cluster...",
      "[SECURITY] Masking Rule applied: SHA-256 hashing executed on column 'user_email'. Raw data removed.",
      "[PROCESS - PDI] Filtering outliers: 14 click events discarded due to null transaction identifiers.",
      "[PROCESS - PDI] Silver Delta Lake partition updated. Schema conformed and verified. 4,120 rows committed.",
      "[GOVERNANCE - PDC] Data lineage tree propagated: s3_landing_clicks → delta_silver_unified → snowflake_reporting_gold.",
      "[PROCESS - PDI] Aggregation Job 'Silver_To_Gold_Rollup' executed successfully. Metric math computed.",
      "[COMPLETED] Refreshing Gold Snowflake Analytics Hub. [Data Quality: 100% | SLA Alert: Clean]"
    ]
  },
  {
    id: "finance_audit",
    name: "Financial Ledgers & Payments Auditing",
    industry: "Banking & FinTech",
    desc: "Coordinates atomic high-integrity ledgers, sanitizing bank account numbers and verifying regulatory audit compliance standards.",
    sources: ["Stripe Webhooks", "OAuth Bank Transfer Logs", "Plaid Connection Streams"],
    throughputBase: 42.8,
    latencyBase: 18,
    qualityBase: 100.0,
    bronze: {
      format: "Parquet / Encrypted Blob Storage",
      desc: "Encrypted raw append-only ledger entries. Contains full security tokens and raw payment authorization payload frames.",
      schema: [
        { name: "txn_referral_id", type: "string", pii: false, desc: "Original external gateway token" },
        { name: "sender_account_no", type: "string", pii: true, desc: "Raw bank account details (critical PII)" },
        { name: "recip_account_no", type: "string", pii: true, desc: "Receiver bank account details" },
        { name: "raw_volume_cents", type: "string", pii: false, desc: "Raw volume in smallest base units" },
        { name: "security_cipher", type: "string", pii: false, desc: "Raw authentication signatures" }
      ]
    },
    silver: {
      desc: "Regulatory and compliance-cleansed Silver layers. Hases and encrypts financial endpoints, enforces rigorous schemas, and flags transaction outliers.",
      pdiTransforms: [
        "Apply cryptographically secure AES-256 tokenization",
        "Convert raw_volume_cents to currency format (cents / 100)",
        "Enforce strict SQL DataType constraints",
        "Isolate flagged anomalies (Volume > $250k check)",
        "Audit signature integrity validator"
      ],
      schema: [
        { name: "txn_masked_sender", type: "varchar(40)", pii: false, desc: "AES-256 tokenized sender bank client hash" },
        { name: "txn_masked_recip", type: "varchar(40)", pii: false, desc: "AES-256 tokenized receiver bank client hash" },
        { name: "validated_usd_amount", type: "numeric(12,2)", pii: false, desc: "Cleaned financial dollar amounts" },
        { name: "regulatory_risk_score", type: "double", pii: false, desc: "Anomalies coefficient scoring" }
      ]
    },
    gold: {
      desc: "Validated reconciliation schemas feeding executive audit dashboards with immutable reporting parameters.",
      aggregates: [
        "SUM(validated_usd_amount) → total_reconciled_dollars",
        "COUNT(txn_masked_sender) FILTER (risk_score > 0.8) → count_high_risk_suspensions",
        "AVG(validated_usd_amount) → average_authorized_transaction_size"
      ],
      schema: [
        { name: "reconciled_date", type: "date", pii: false, desc: "Reconciliation ledger closure date" },
        { name: "authorized_clearing_total", type: "numeric(16,2)", pii: false, desc: "Safe audited cumulative ledger total" },
        { name: "active_fraud_risk_ratio", type: "double", pii: false, desc: "Aggregate anomaly metrics percentage" },
        { name: "certified_audit_token", type: "varchar(128)", pii: false, desc: "Auto-generated system certification key" }
      ]
    },
    analytics: {
      desc: "Enterprise reporting and real-time security layers. BI models generate regulatory SEC filings and audit ledger reports, while real-time AI models analyze transactional Silver features to classify instant risk markers.",
      biOutputs: [
        "Interactive ledger compliance reconcilements",
        "SEC regulatory double-entry audit timelines",
        "Financial floor alerts & transaction sizing"
      ],
      aiOutputs: [
        "Fraud detection risk scoring network (Neural Net)",
        "Daily anomalous expense detection watchdog",
        "Quarterly treasury liquid currency forecaster"
      ],
      schema: [
        { name: "fraud_risk_factor", type: "double [0.0 - 1.0]", pii: false, desc: "Proprietary AI scoring for money laundering & fraud indicators" },
        { name: "is_anomaly_suspicion", type: "boolean", pii: false, desc: "Flagged by ML outlier routing algorithm" },
        { name: "predicted_settlement_days", type: "integer", pii: false, desc: "Supervised regression prediction of transfer completion time" },
        { name: "confidence_score", type: "double", pii: false, desc: "Model classification certainty coefficient" }
      ]
    },
    logSequence: [
      "[INFO - PDI Engine] Initializing high-integrity financial ledger stream...",
      "[INGEST - Bronze] Streaming payment notifications safely to Encrypted S3 bucket...",
      "[GOVERNANCE - PDC] Pentaho Data Catalog flagged 2 key elements with #PII-Account-Number. Policy triggered.",
      "[PROCESS - PDI] PDI Transformation 'Regulatory_Shield_Ingress' running on isolated vpc container...",
      "[SECURITY] AES-256 Cryptographic tokenization applied to 'sender_account_no' and 'recip_account_no'.",
      "[PROCESS - PDI] Normalizing micro-cents. Re-mapped string '250495' successfully to value '2504.95' USD.",
      "[PROCESS - PDI] Validation checks passed. No schema drift identified. Commit complete to encrypted Silver Parquet.",
      "[GOVERNANCE - PDC] Updated Pentaho Data Catalog Lineage with compliance tokens. GDPR Auditable trace generated.",
      "[PROCESS - PDI] Running automated ledger reconciliation against bank routing indices...",
      "[COMPLETED] Ledgers validated. Star schema reporting files published. Verified by Rishu's Compliance Automation."
    ]
  },
  {
    id: "iot_telemetry",
    name: "Industrial IoT Telemetry & Thermal Alerts",
    industry: "Manufacturing & Facilities",
    desc: "Processes thousands of sub-second vibration and thermodynamic telemetry packets, eliminating environmental noise to predict failures.",
    sources: ["Factory Assembly Sensor Nodes", "AWS Kinesis Firehose Thermal stream", "Edge Controller logs"],
    throughputBase: 345.2,
    latencyBase: 12,
    qualityBase: 99.4,
    bronze: {
      format: "Semi-Structured JSON / Delta Lakes",
      desc: "Ultra-fast stream capture records holding sensor reading packets. High volume, unstable formats, and random system noise.",
      schema: [
        { name: "sensor_raw_id", type: "string", pii: false, desc: "Mac-address sensor label" },
        { name: "sensor_metric_val", type: "string", pii: false, desc: "Raw temperature/vibration string telemetry" },
        { name: "epoch_ticks", type: "integer", pii: false, desc: "Sensor internal timestamp" },
        { name: "system_temp_scale", type: "string", pii: false, desc: "Dynamic unit labels (Fahrenheit or Celsius)" }
      ]
    },
    silver: {
      desc: "Normalized sensor structures. Filters signal anomalies, converts reading standards, and calculates sliding average telemetry steps.",
      pdiTransforms: [
        "Normalize sensor scales (Convert Fahrenheit → Celsius)",
        "Isolate invalid noise spikes (>300°C extreme dropouts)",
        "Stream lookup against asset master catalogs",
        "Add sliding average temperature calculated rows",
        "Map sensor physical factory locations"
      ],
      schema: [
        { name: "mac_address", type: "varchar(17)", pii: false, desc: "Normalized networking card HW address" },
        { name: "temperature_celsius", type: "double", pii: false, desc: "Conformed metric reading in metric unit" },
        { name: "is_out_of_bounds", type: "boolean", pii: false, desc: "Algorithmic alert flag for extreme signals" },
        { name: "recorded_stamp", type: "timestamp", pii: false, desc: "UTC conformed system clock date" }
      ]
    },
    gold: {
      desc: "Curated real-time operational aggregates, feeding predictive maintenance dashboards and facilities alerts.",
      aggregates: [
        "AVG(temperature_celsius) GROUP BY assembly_line → average_line_temps",
        "SUM(CASE WHEN is_out_of_bounds THEN 1 ELSE 0 END) → total_failure_pings",
        "DECISION_TREE(temperature, vibration) → failure_probability_coefficient"
      ],
      schema: [
        { name: "facility_floor_id", type: "varchar(16)", pii: false, desc: "Production floor sector ID" },
        { name: "mean_line_temp_cel", type: "double", pii: false, desc: "Average running thermodynamics score" },
        { name: "active_incident_count", type: "integer", pii: false, desc: "Triggered emergency thresholds" },
        { name: "predicted_failure_probability", type: "double", pii: false, desc: "AI predictive model breakdown scoring" }
      ]
    },
    analytics: {
      desc: "Active operational control of the smart facility. The BI sub-layer drives control room temperature hot-spot maps, while the edge AI sub-layer consumes cleaned Silver streams to run Remaining Useful Life prediction algorithms.",
      biOutputs: [
        "Thermodynamic assembly line thermal maps",
        "Vibration frequency range spectrum monitors",
        "Active sensor array offline alert charts"
      ],
      aiOutputs: [
        "Remaining Useful Life (RUL) forecasting engine",
        "Prescriptive preventative maintenance trigger",
        "Sensory noise filter & calibration corrector"
      ],
      schema: [
        { name: "estimated_failure_hours", type: "double", pii: false, desc: "AI-predicted operating hours remaining prior to severe breakdown" },
        { name: "anomaly_vibration_class", type: "integer", pii: false, desc: "Defect categorization (0=Safe, 1=Bearing Wear, 2=Overheat)" },
        { name: "ai_calibration_offset_c", type: "double", pii: false, desc: "Model-calculated offset for physical thermal drift correction" },
        { name: "mitigation_prescriptive_action", type: "varchar(64)", pii: false, desc: "NL action phrase (e.g. 'Schedule bearing lubrication')" }
      ]
    },
    logSequence: [
      "[INFO - PDI Engine] Booting high-velocity telemetry pipeline...",
      "[INGEST - Bronze] Streaming sub-second IoT messages via Kinesis Firehose landing zone directly...",
      "[GOVERNANCE - PDC] Pentaho Data Catalog auto-cataloged thermal stream. Identified Schema stability: 100%.",
      "[PROCESS - PDI] PDI Micro-batch cluster running Transformation 'Thermal_Scale_Standardization'...",
      "[PROCESS - PDI] Converting Fahrenheit sensors to Celsius. 1,424 rows processed...",
      "[PROCESS - PDI] Pruning noisy telemetry. Drops 4 sensor rows showing extreme dropouts (-999°C).",
      "[PROCESS - PDI] Schema mapped and matched against Factory Inventory. Write committed to S3 Silver Delta parquet files.",
      "[GOVERNANCE - PDC] End-to-end data lineage registered successfully. Sensor_mac → Fac_Floor_Gold.",
      "[PROCESS - PDI] PDI Aggregator Job calculates 10-second sliding sensor averages...",
      "[COMPLETED] Refreshing Gold warehouse. IoT stream stable. Quality index: 99.45%."
    ]
  }
];

export default function Sandbox() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("customer_360");
  const [selectedTab, setSelectedTab] = useState<"pipeline" | "catalog" | "security">("pipeline");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedStage, setSelectedStage] = useState<"bronze" | "silver" | "gold" | "analytics">("bronze");
  const [scrollingLogs, setScrollingLogs] = useState<string[]>([]);
  const [activeLogIndex, setActiveLogIndex] = useState<number>(0);
  
  // Simulated Streaming Performance metrics
  const [currentThroughput, setCurrentThroughput] = useState<number>(0);
  const [currentLatency, setCurrentLatency] = useState<number>(0);
  const [currentItemsCount, setCurrentItemsCount] = useState<number>(0);
  const [currentQualityScore, setCurrentQualityScore] = useState<number>(100);

  // References and timeouts
  const logTimerRef = useRef<NodeJS.Timeout | null>(null);
  const metricTimerRef = useRef<NodeJS.Timeout | null>(null);
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);

  // Find currently active scenario
  const scenario = SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];

  // Auto-scroll the logger terminal
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [scrollingLogs]);

  // Handle setting active scenario
  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    handleStopSimulation();
  };

  // Reset metrics
  const handleStopSimulation = () => {
    setIsPlaying(false);
    setScrollingLogs([]);
    setActiveLogIndex(0);
    setCurrentThroughput(0);
    setCurrentLatency(0);
    setCurrentItemsCount(0);
    setCurrentQualityScore(100);

    if (logTimerRef.current) clearInterval(logTimerRef.current);
    if (metricTimerRef.current) clearInterval(metricTimerRef.current);
  };

  // Start the simulation cycle
  const handleStartSimulation = () => {
    if (isPlaying) {
      handleStopSimulation();
      return;
    }

    setIsPlaying(true);
    setScrollingLogs([scenario.logSequence[0]]);
    setActiveLogIndex(1);
    setCurrentThroughput(scenario.throughputBase * 0.95);
    setCurrentLatency(scenario.latencyBase);
    setCurrentItemsCount(240);
    setCurrentQualityScore(scenario.qualityBase);

    // Keep an internal count in variable so we know exactly when limit is satisfied
    let internalItemsCount = 240;

    const stopSimulationOnComplete = () => {
      setIsPlaying(false);
      if (logTimerRef.current) {
        clearInterval(logTimerRef.current);
        logTimerRef.current = null;
      }
      if (metricTimerRef.current) {
        clearInterval(metricTimerRef.current);
        metricTimerRef.current = null;
      }
      setCurrentThroughput(0);
      setCurrentLatency(0);
    };

    // Dynamic scroll of system logs simulating the engine sequence
    let currentIdx = 1;
    logTimerRef.current = setInterval(() => {
      if (currentIdx < scenario.logSequence.length) {
        setScrollingLogs(prev => {
          const next = [...prev, scenario.logSequence[currentIdx]];
          return next.slice(-80); // Slice array to prevent infinite DOM bloating and browser crashes
        });
        setActiveLogIndex(currentIdx + 1);
        currentIdx++;
      } else {
        // Continuous loop of simulation logs after standard logs finish, until limit is reached
        const customLogs = [
          `[OBSERVABILITY] Stream live. Hitting schema validation SLA... OK.`,
          `[PDI Engine] Streamed an additional 1,000,000 packets through PDI executor... OK.`,
          `[GOVERNANCE] Metadata dictionary scan: consistent. Pentaho Data Catalog updated.`,
          `[SECURITY] Policy audit: encrypting sensitive columns actively. Zero leakage detected.`
        ];
        const randomLog = customLogs[Math.floor(Math.random() * customLogs.length)];
        const timeStr = new Date().toLocaleTimeString();
        setScrollingLogs(prev => {
          const next = [...prev, `[${timeStr}] ${randomLog}`];
          return next.slice(-80); // Limit logs to prevent bloated states and page refreshes
        });
      }
    }, 1500);

    // Dynamic metrics generator
    metricTimerRef.current = setInterval(() => {
      setCurrentThroughput(prev => {
        const noise = (Math.random() * 20) - 10;
        return parseFloat((scenario.throughputBase + noise).toFixed(1));
      });
      setCurrentLatency(prev => {
        const noise = Math.floor(Math.random() * 4) - 2;
        return Math.max(2, scenario.latencyBase + noise);
      });
      
      // Reach 10,000,050 rows in around 10 seconds (1,000,000 rows per tick)
      const step = Math.floor(Math.random() * 400000) + 800000;
      const nextCount = internalItemsCount + step;
      
      if (nextCount >= 10000000) {
        internalItemsCount = 10000000;
        setCurrentItemsCount(10000000);
        setCurrentQualityScore(scenario.qualityBase);
        
        // Append completion terminal logs
        setScrollingLogs(prev => {
          const next = [
            ...prev,
            `[COMPLETED] Stream limit target of 10,000,000 rows reached successfully!`,
            `[SUCCESS] PDI transformation completed. [100% of data audited and stored]`,
            `[GOVERNANCE - PDC] Data Catalog Schema state verified and finalized. SLA status: Met.`
          ];
          return next.slice(-80);
        });
        
        stopSimulationOnComplete();
      } else {
        internalItemsCount = nextCount;
        setCurrentItemsCount(nextCount);
        setCurrentQualityScore(prev => {
          const noise = (Math.random() * 0.1) - 0.05;
          return parseFloat(Math.min(100, Math.max(95, scenario.qualityBase + noise)).toFixed(2));
        });
      }
    }, 1000);
  };

  // Cleanup timers on destruction
  useEffect(() => {
    return () => {
      if (logTimerRef.current) clearInterval(logTimerRef.current);
      if (metricTimerRef.current) clearInterval(metricTimerRef.current);
    };
  }, []);

  return (
    <section id="sandbox_section" className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="bg-slate-950 rounded-3xl text-slate-100 p-6 md:p-10 border border-slate-900 shadow-2xl overflow-hidden relative">
        {/* Sleek dynamic backdrop overlay lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] opacity-20 pointer-events-none" />

        {/* Global Area Label */}
        <div className="relative space-y-8 z-10">
          
          {/* Header titles */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-slate-900 pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono tracking-wider uppercase font-semibold">
                <Network size={12} className="text-blue-400" />
                Pentaho + Medallion Lakehouse Playbox
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Modern Data Pipeline Sandbox
              </h2>
              <p className="text-slate-400 text-xs md:text-sm max-w-3xl font-normal leading-relaxed">
                Experience real-world data engineering. Explore the <strong>Medallion Architecture (Bronze → Silver → Gold)</strong>, orchestrated by <strong>Pentaho Data Integration (PDI)</strong> and governed securely by <strong>Pentaho Data Catalog (PDC)</strong>. Run streams dynamically to observe metadata schema drift, sensitive PII tokenization, and live lineage pipelines.
              </p>
            </div>

            {/* Run Pipeline CTA */}
            <div className="shrink-0 flex items-center">
              <button
                onClick={handleStartSimulation}
                id="sandbox_run_flow_trigger"
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold font-display text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer ${
                  isPlaying
                    ? "bg-rose-600 hover:bg-rose-700 text-white hover:shadow-rose-950/20"
                    : "bg-[#3b82f6] hover:bg-blue-600 text-white hover:shadow-blue-950/20"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Square size={13} className="fill-white" />
                    <span>Stop Lakehouse Stream</span>
                  </>
                ) : (
                  <>
                    <Play size={13} className="fill-white animate-pulse" />
                    <span>Deploy &amp; Stream Pipeline</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Scenario Selection Grid */}
          <div className="space-y-3">
            <span className="block text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500">
              1. Select Active Business Use Case &amp; Data Pipeline Schema
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SCENARIOS.map((scen) => {
                const isActive = selectedScenarioId === scen.id;
                return (
                  <div
                    key={scen.id}
                    onClick={() => handleScenarioChange(scen.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                      isActive
                        ? "bg-slate-900 border-blue-500/60 shadow-lg"
                        : "bg-slate-900/30 border-slate-900 hover:border-slate-800 hover:bg-slate-900/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="p-1 px-2 text-[9.5px] font-mono font-bold uppercase rounded bg-slate-800 text-slate-400 border border-slate-800">
                        {scen.industry}
                      </div>
                      {isActive && (
                        <div className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </div>
                      )}
                    </div>
                    <h3 className={`font-display text-sm font-bold transition-colors ${isActive ? "text-white" : "text-slate-300 group-hover:text-slate-100"}`}>
                      {scen.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-normal line-clamp-2">
                      {scen.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Panel: Indicators & Real-Time Terminal (col-span-5) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Telemetry Metrics Board */}
              <div className="bg-slate-900/50 rounded-2xl border border-slate-900 p-5 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                    Active Telemetry Dashboard
                  </span>
                  <Activity size={14} className={isPlaying ? "text-blue-400 animate-pulse" : "text-slate-600"} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Throughput */}
                  <div className="bg-slate-950/80 rounded-xl border border-slate-900/40 p-3 flex flex-col justify-between">
                    <span className="text-[9.5px] font-mono text-slate-500 uppercase font-bold">Throughput</span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className={`text-lg font-mono font-extrabold ${isPlaying ? "text-blue-400" : "text-slate-600"}`}>
                        {isPlaying ? currentThroughput : "0.0"}
                      </span>
                      <span className="text-[9.5px] font-mono text-slate-600">MB/s</span>
                    </div>
                  </div>

                  {/* Latency */}
                  <div className="bg-slate-950/80 rounded-xl border border-slate-900/40 p-3 flex flex-col justify-between">
                    <span className="text-[9.5px] font-mono text-slate-500 uppercase font-bold">Processing SLA</span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className={`text-lg font-mono font-extrabold ${isPlaying ? "text-emerald-400" : "text-slate-600"}`}>
                        {isPlaying ? `${currentLatency}` : "0"}
                      </span>
                      <span className="text-[9.5px] font-mono text-slate-600">ms</span>
                    </div>
                  </div>

                  {/* Logs Ingested */}
                  <div className="bg-slate-950/80 rounded-xl border border-slate-900/40 p-3 flex flex-col justify-between">
                    <span className="text-[9.5px] font-mono text-slate-500 uppercase font-bold">Records Ingested</span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-sm font-mono font-black text-slate-300">
                        {isPlaying ? currentItemsCount.toLocaleString() : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Quality Score */}
                  <div className="bg-slate-950/80 rounded-xl border border-slate-900/40 p-3 flex flex-col justify-between">
                    <span className="text-[9.5px] font-mono text-slate-500 uppercase font-bold">Data Quality (DQI)</span>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className={`text-sm font-mono font-extrabold ${isPlaying ? "text-blue-400" : "text-slate-600"}`}>
                        {isPlaying ? `${currentQualityScore}%` : "100.0%"}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Subtext info */}
                <div className="text-[10px] font-mono text-slate-500 text-center leading-normal pt-1 flex items-center justify-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse shrink-0" />
                  <span>SLA Limits: Latency &lt; 50ms | Integrity Flag: Active</span>
                </div>
              </div>

              {/* simulated Terminal logs */}
              <div className="bg-slate-950 rounded-2xl border border-slate-900 overflow-hidden flex flex-col h-72 shadow-inner">
                <div className="bg-slate-900/40 px-4 py-2 flex items-center justify-between border-b border-slate-900">
                  <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-blue-400" />
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400">
                      PDI Stream Console Logs
                    </span>
                  </div>
                  {isPlaying && (
                    <span className="text-[8.5px] px-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded font-mono animate-pulse uppercase font-bold">
                      Streaming
                    </span>
                  )}
                </div>

                <div 
                  ref={terminalContainerRef}
                  className="p-4 flex-1 overflow-y-auto space-y-2.5 font-mono text-[9.5px] text-slate-400 scrollbar-thin scrollbar-thumb-slate-800"
                  id="sandbox_scrolling_terminal"
                >
                  {scrollingLogs.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-600 p-4 space-y-1.5">
                      <Terminal size={24} className="opacity-40" />
                      <p className="max-w-[180px] leading-normal font-sans text-[11px]">
                        Click &quot;Deploy &amp; Stream Pipeline&quot; above to see real-time log outputs of compilation and transformation routines.
                      </p>
                    </div>
                  ) : (
                    scrollingLogs.map((log, index) => {
                      const isError = log.includes("[ERROR]");
                      const isIngest = log.includes("[INGEST]");
                      const isGov = log.includes("[GOVERNANCE]");
                      const isSecurity = log.includes("[SECURITY]");
                      
                      let textColor = "text-slate-400";
                      if (isError) textColor = "text-rose-400 font-semibold";
                      else if (isIngest) textColor = "text-amber-400";
                      else if (isGov) textColor = "text-blue-400";
                      else if (isSecurity) textColor = "text-emerald-400 font-medium";

                      return (
                        <div key={index} className="leading-relaxed border-l-2 pl-2 border-slate-800">
                          <span className={textColor}>{log}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

            {/* Right Panel: Adaptive Canvas Panel (col-span-7) */}
            <div className="lg:col-span-8 space-y-5 bg-slate-900/20 border border-slate-900 rounded-2xl p-4 md:p-6 shadow-sm">
              
              {/* Workspace Tab Header */}
              <div className="flex flex-wrap items-center justify-between border-b border-slate-900 pb-4 gap-3">
                <div className="flex items-center gap-1 px-1 py-1 rounded-lg bg-slate-950 border border-slate-900">
                  <button
                    onClick={() => setSelectedTab("pipeline")}
                    className={`px-3 py-1.5 rounded-md font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTab === "pipeline"
                        ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Layers size={13} />
                    <span>Medallion Flow</span>
                  </button>
                  <button
                    onClick={() => setSelectedTab("catalog")}
                    className={`px-3 py-1.5 rounded-md font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTab === "catalog"
                        ? "bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <BookOpen size={13} />
                    <span>Pentaho Data Catalog</span>
                  </button>
                  <button
                    onClick={() => setSelectedTab("security")}
                    className={`px-3 py-1.5 rounded-md font-sans text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedTab === "security"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <ShieldCheck size={13} />
                    <span>Govern &amp; Observe</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider bg-slate-950 px-2.5 py-1.5 rounded border border-slate-900 select-none">
                  <Settings size={11} className="animate-spin-slow shrink-0" />
                  <span>State: Managed by PDI</span>
                </div>
              </div>

              {/* Tab 1: Live Medallion Architecture Pipeline Flow */}
              {selectedTab === "pipeline" && (
                <div className="space-y-6">
                  
                  {/* Schematic Flow Area */}
                  <div className="bg-slate-950 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] rounded-xl border border-slate-900 p-6 relative overflow-hidden">
                    
                    {/* Glowing dots stream if playing */}
                    {isPlaying && (
                      <div className="absolute inset-0 z-0 pointer-events-none">
                        <svg className="w-full h-full text-blue-500/10" xmlns="http://www.w3.org/2000/svg">
                          {/* Left dot flow curve path */}
                          <motion.circle
                            cx="20%"
                            cy="50%"
                            r="4"
                            className="fill-blue-400"
                            animate={{
                              cx: ["12%", "37%", "62%", "87%"],
                              cy: ["50%", "50%", "50%", "50%"],
                              opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          <motion.circle
                            cx="20%"
                            cy="50%"
                            r="3"
                            className="fill-purple-400"
                            animate={{
                              cx: ["12%", "37%", "62%", "87%"],
                              cy: ["50%", "50%", "50%", "50%"],
                              opacity: [0, 1, 1, 0],
                            }}
                            transition={{
                              duration: 4,
                              delay: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </svg>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10 items-stretch">
                      
                      {/* BRONZE LAYER */}
                      <div 
                        onClick={() => setSelectedStage("bronze")}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          selectedStage === "bronze" 
                            ? "bg-slate-900 border-amber-500/60 shadow-lg shadow-amber-950/10 text-white" 
                            : "bg-slate-900/40 border-slate-900 text-slate-400 hover:bg-slate-900/75 hover:border-slate-800"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                              <Database size={15} />
                            </div>
                            <div>
                              <span className="block text-[8px] font-mono font-black uppercase text-amber-500 tracking-wider">Raw Ingest Layer</span>
                              <h4 className="text-xs font-bold text-slate-200">Bronze Stage</h4>
                            </div>
                          </div>
                          
                          <p className="text-[10.5px] leading-relaxed text-slate-400 font-normal">
                            Direct immutable dump targets inside cloud storage buckets. Retains full original files.
                          </p>

                          <div className="border-t border-slate-900 pt-2 text-[9px] font-mono space-y-1">
                            <span className="block text-slate-500 font-bold uppercase tracking-wider">Storage Format:</span>
                            <span className="text-amber-400 font-black">{scenario.bronze.format}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-slate-500 font-bold">Inspect Schema</span>
                          <ArrowRight size={11} className={`text-slate-500 transition-transform ${selectedStage === "bronze" ? "translate-x-1" : ""}`} />
                        </div>
                      </div>

                      {/* SILVER LAYER */}
                      <div 
                        onClick={() => setSelectedStage("silver")}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          selectedStage === "silver" 
                            ? "bg-slate-900 border-blue-500/60 shadow-lg shadow-blue-950/10 text-white" 
                            : "bg-slate-900/40 border-slate-900 text-slate-400 hover:bg-slate-900/75 hover:border-slate-800"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                              <Cpu size={15} />
                            </div>
                            <div>
                              <span className="block text-[8px] font-mono font-black uppercase text-blue-400 tracking-wider">Clean / Conformed</span>
                              <h4 className="text-xs font-bold text-slate-200">Silver Stage</h4>
                            </div>
                          </div>

                          <p className="text-[10.5px] leading-relaxed text-slate-400 font-normal">
                            Data is cleaned, filtered, deduplicated, and conformed via PDI Pipelines. Standardized for query schemas.
                          </p>

                          <div className="border-t border-slate-900 pt-2 text-[9px] font-mono space-y-1">
                            <span className="block text-slate-500 font-bold uppercase tracking-wider">PDI Cleansers:</span>
                            <span className="text-blue-400 font-black">{scenario.silver.pdiTransforms.length} Steps Active</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span className="font-bold">Inspect Schema</span>
                          <ArrowRight size={11} className={`transition-transform ${selectedStage === "silver" ? "translate-x-1" : ""}`} />
                        </div>
                      </div>

                      {/* GOLD LAYER */}
                      <div 
                        onClick={() => setSelectedStage("gold")}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          selectedStage === "gold" 
                            ? "bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-950/10 text-white" 
                            : "bg-slate-900/40 border-slate-900 text-slate-400 hover:bg-slate-900/75 hover:border-slate-800"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                              <Sparkles size={15} />
                            </div>
                            <div>
                              <span className="block text-[8px] font-mono font-black uppercase text-emerald-400 tracking-wider">Business Analytics</span>
                              <h4 className="text-xs font-bold text-slate-200">Gold Stage</h4>
                            </div>
                          </div>

                          <p className="text-[10.5px] leading-relaxed text-slate-400 font-normal">
                            Curated and pre-aggregated tables in physical warehouses. Powers low-latency reports and AI decision nodes.
                          </p>

                          <div className="border-t border-slate-900 pt-2 text-[9px] font-mono space-y-1">
                            <span className="block text-slate-500 font-bold uppercase tracking-wider">Reporting Use:</span>
                            <span className="text-emerald-400 font-black">Star-Schema Analytics</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span className="font-bold">Inspect Schema</span>
                          <ArrowRight size={11} className={`transition-transform ${selectedStage === "gold" ? "translate-x-1" : ""}`} />
                        </div>
                      </div>

                      {/* REPORTING/BI & AI LAYER */}
                      <div 
                        onClick={() => setSelectedStage("analytics")}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          selectedStage === "analytics" 
                            ? "bg-slate-900 border-purple-500/60 shadow-lg shadow-purple-950/10 text-white" 
                            : "bg-slate-900/40 border-slate-900 text-slate-400 hover:bg-slate-900/75 hover:border-slate-800"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                              <Brain size={15} />
                            </div>
                            <div>
                              <span className="block text-[8px] font-mono font-black uppercase text-purple-400 tracking-wider">BI &amp; AI Consumers</span>
                              <h4 className="text-xs font-bold text-slate-200 font-display">Reporting/BI &amp; AI</h4>
                            </div>
                          </div>

                          <p className="text-[10.5px] leading-relaxed text-slate-400 font-normal">
                            Cleaned, conformed Silver features drive smart AI/ML predictive models, while aggregated Gold cubes power dashboards.
                          </p>

                          <div className="border-t border-slate-900 pt-2 text-[9px] font-mono space-y-1">
                            <span className="block text-slate-500 font-bold uppercase tracking-wider">Downstream Tech:</span>
                            <span className="text-purple-400 font-black">BI Charts &amp; ML Feeds</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span className="font-bold">Inspect Schema</span>
                          <ArrowRight size={11} className={`transition-transform ${selectedStage === "analytics" ? "translate-x-1" : ""}`} />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Active Selected Medallion Schema Detail Inspector */}
                  <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                      <div className="flex items-center gap-2">
                        {selectedStage === "bronze" && <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />}
                        {selectedStage === "silver" && <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />}
                        {selectedStage === "gold" && <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />}
                        <h4 className="font-display text-sm font-bold capitalize text-slate-200">
                          Schema Inspector: {selectedStage} Layer Definition
                        </h4>
                      </div>
                      <div className="text-[10px] font-mono font-bold uppercase text-slate-500">
                        {selectedStage === "bronze" && scenario.bronze.format}
                        {selectedStage === "silver" && "Parquet Delta Table"}
                        {selectedStage === "gold" && "Snowflake Aggregated view"}
                        {selectedStage === "analytics" && "Analytical Feed & Model Target"}
                      </div>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed max-w-4xl font-normal">
                      {selectedStage === "bronze" && scenario.bronze.desc}
                      {selectedStage === "silver" && scenario.silver.desc}
                      {selectedStage === "gold" && scenario.gold.desc}
                      {selectedStage === "analytics" && scenario.analytics.desc}
                    </p>

                    {/* Active PDI steps details under silver */}
                    {selectedStage === "silver" && (
                      <div className="bg-slate-950 rounded-lg p-3.5 border border-slate-900 space-y-2">
                        <span className="block text-[9.5px] font-mono font-bold uppercase text-blue-400 tracking-wider">
                          Pentaho Data Integration (PDI) Transformation Steps applied:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[10px] font-mono">
                          {scenario.silver.pdiTransforms.map((step, sIdx) => (
                            <div key={sIdx} className="p-2 bg-slate-900/60 border border-slate-900 rounded flex items-center gap-2 text-slate-300">
                              <Check size={12} className="text-blue-500 shrink-0" />
                              <span className="truncate">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Active aggregations details under gold */}
                    {selectedStage === "gold" && (
                      <div className="bg-slate-950 rounded-lg p-3.5 border border-slate-900 space-y-2">
                        <span className="block text-[9.5px] font-mono font-bold uppercase text-emerald-400 tracking-wider">
                          PDI Materialized Aggregation Expressions:
                        </span>
                        <div className="space-y-1.5 font-mono text-[10px]">
                          {scenario.gold.aggregates.map((step, sIdx) => {
                            const [calc, target] = step.split(" → ");
                            return (
                              <div key={sIdx} className="p-2 bg-slate-900/60 border border-slate-800 rounded flex items-center justify-between text-slate-300 gap-4">
                                <span className="text-[#a7f3d0] font-semibold">{calc}</span>
                                <span className="text-slate-500 font-bold shrink-0 text-[10px]">→ {target}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Active outputs details under analytics */}
                    {selectedStage === "analytics" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* BI Layer Column */}
                        <div className="bg-slate-950 rounded-lg p-3.5 border border-slate-900 space-y-3">
                          <div className="flex items-center gap-2 text-purple-400">
                            <BarChart3 size={15} />
                            <span className="block text-[9.5px] font-mono font-bold uppercase tracking-wider">
                              BI Metrics &amp; Dashboard Reports (Gold-Fed):
                            </span>
                          </div>
                          <div className="space-y-1.5 font-mono text-[10px]">
                            {scenario.analytics.biOutputs.map((item, idx) => (
                              <div key={idx} className="p-2 bg-slate-900/60 border border-slate-900 rounded flex items-center gap-2 text-slate-300">
                                <div className="h-1.5 w-1.5 rounded-full bg-purple-500 select-none" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* AI Layer Column */}
                        <div className="bg-slate-950 rounded-lg p-3.5 border border-slate-900 space-y-3">
                          <div className="flex items-center gap-2 text-indigo-400">
                            <Brain size={15} />
                            <span className="block text-[9.5px] font-mono font-bold uppercase tracking-wider">
                              AI/ML Models &amp; Agent Workloads (Silver-Fed):
                            </span>
                          </div>
                          <div className="space-y-1.5 font-mono text-[10px]">
                            {scenario.analytics.aiOutputs.map((item, idx) => (
                              <div key={idx} className="p-2 bg-slate-900/60 border border-slate-900 rounded flex items-center gap-2 text-slate-300">
                                <Sparkles size={11} className="text-indigo-400 shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {/* Active Schema Fields Table */}
                    <div className="overflow-x-auto rounded-lg border border-slate-900 bg-slate-950/50">
                      <table className="w-full text-left font-sans text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-900 border-b border-slate-850 text-slate-500 text-[10px] font-mono font-bold uppercase select-none">
                            <th className="px-4 py-2.5">Field Path</th>
                            <th className="px-4 py-2.5">Datatype</th>
                            <th className="px-4 py-2.5">PII Status</th>
                            <th className="px-4 py-2.5">Catalog Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 text-slate-300 font-medium">
                          {selectedStage === "bronze" && scenario.bronze.schema.map((f, fIdx) => (
                            <tr key={fIdx} className="hover:bg-slate-900/25">
                              <td className="px-4 py-2.5 font-mono text-white text-[11px]">{f.name}</td>
                              <td className="px-4 py-2.5 font-mono text-slate-400 text-[10px]">{f.type}</td>
                              <td className="px-4 py-2.5">
                                {f.pii ? (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                    <Lock size={9} />
                                    <span>SUSPECT EXPOSED PII</span>
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-mono text-slate-600">CLEAN DATA</span>
                                )}
                              </td>
                              <td className="px-4 py-2.5 text-slate-400 text-[11px]">{f.desc}</td>
                            </tr>
                          ))}
                          {selectedStage === "silver" && scenario.silver.schema.map((f, fIdx) => (
                            <tr key={fIdx} className="hover:bg-slate-900/25">
                              <td className="px-4 py-2.5 font-mono text-white text-[11px]">{f.name}</td>
                              <td className="px-4 py-2.5 font-mono text-slate-400 text-[10px]">{f.type}</td>
                              <td className="px-4 py-2.5">
                                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  <ShieldCheck size={9} />
                                  <span>MASKED &amp; COMPLIANT</span>
                                </span>
                              </td>
                              <td className="px-4 py-2.5 text-slate-400 text-[11px]">{f.desc}</td>
                            </tr>
                          ))}
                          {selectedStage === "gold" && scenario.gold.schema.map((f, fIdx) => (
                            <tr key={fIdx} className="hover:bg-slate-900/25">
                              <td className="px-4 py-2.5 font-mono text-white text-[11px]">{f.name}</td>
                              <td className="px-4 py-2.5 font-mono text-slate-400 text-[10px]">{f.type}</td>
                              <td className="px-4 py-2.5">
                                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  <ShieldCheck size={9} />
                                  <span>COMPLIANT ACCUM</span>
                                </span>
                              </td>
                              <td className="px-4 py-2.5 text-slate-400 text-[11px]">{f.desc}</td>
                            </tr>
                          ))}
                          {selectedStage === "analytics" && scenario.analytics.schema.map((f, fIdx) => (
                            <tr key={fIdx} className="hover:bg-slate-900/25">
                              <td className="px-4 py-2.5 font-mono text-white text-[11px]">{f.name}</td>
                              <td className="px-4 py-2.5 font-mono text-slate-400 text-[10px]">{f.type}</td>
                              <td className="px-4 py-2.5">
                                <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                  <Sparkles size={9} />
                                  <span>PREDICTIVE ACCUM</span>
                                </span>
                              </td>
                              <td className="px-4 py-2.5 text-slate-400 text-[11px]">{f.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* Tab 2: Pentaho Data Catalog (Governance, Cataloging, Lineage) */}
              {selectedTab === "catalog" && (
                <div className="space-y-6">
                  
                  {/* Lineage Visualizer Card */}
                  <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 space-y-4">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#3b82f6]">
                      Pentaho Data Catalog (PDC) End-to-End Lineage Flow
                    </span>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-900/30 rounded-lg border border-slate-900 relative">
                      
                      {/* Diagram Path */}
                      <div className="flex flex-col items-center p-3 bg-slate-950 rounded border border-slate-800 text-center w-full max-w-[160px]">
                        <span className="text-[8px] font-mono uppercase font-black text-slate-500">Raw Source</span>
                        <span className="text-[11px] font-mono font-bold text-slate-300 mt-1 truncate w-full">{scenario.sources[0]}</span>
                        <span className="text-[9px] font-mono text-slate-600 mt-1">Unstructured API</span>
                      </div>

                      <ArrowRight className="text-slate-600 shrink-0 hidden md:block" size={16} />

                      <div className="flex flex-col items-center p-3 bg-slate-950 rounded border border-slate-800 text-center w-full max-w-[160px] border-amber-500/20">
                        <span className="text-[8px] font-mono uppercase font-black text-amber-500">Landing Zone</span>
                        <span className="text-[11px] font-mono font-bold text-amber-400 mt-1">Bronze S3 Landing</span>
                        <span className="text-[9px] font-mono text-slate-600 mt-1">Raw JSON Files</span>
                      </div>

                      <ArrowRight className="text-slate-600 shrink-0 hidden md:block" size={16} />

                      <div className="flex flex-col items-center p-3 bg-slate-950 rounded border border-slate-800 text-center w-full max-w-[160px] border-blue-500/20">
                        <span className="text-[8px] font-mono uppercase font-black text-blue-400">Cleaned Zone</span>
                        <span className="text-[11px] font-mono font-bold text-blue-400 mt-1">Silver Delta Parquet</span>
                        <span className="text-[9px] font-mono text-slate-600 mt-1">PDI Cleansed Logs</span>
                      </div>

                      <ArrowRight className="text-slate-600 shrink-0 hidden md:block" size={16} />

                      <div className="flex flex-col items-center p-3 bg-slate-950 rounded border border-slate-800 text-center w-full max-w-[160px] border-emerald-500/20">
                        <span className="text-[8px] font-mono uppercase font-black text-emerald-400">Analytical warehouse</span>
                        <span className="text-[11px] font-mono font-bold text-emerald-400 mt-1">Gold Star-Schema</span>
                        <span className="text-[9px] font-mono text-slate-600 mt-1">Snowflake Cube</span>
                      </div>

                      <ArrowRight className="text-slate-600 shrink-0 hidden md:block" size={16} />

                      <div className="flex flex-col items-center p-3 bg-slate-950 rounded border border-slate-800 text-center w-full max-w-[160px] border-purple-500/20">
                        <span className="text-[8px] font-mono uppercase font-black text-purple-400">Consuming Layers</span>
                        <span className="text-[11px] font-mono font-bold text-purple-400 mt-1">Reporting &amp; AI</span>
                        <span className="text-[9px] font-mono text-slate-600 mt-1">BI &amp; Model Workloads</span>
                      </div>

                    </div>

                    <div className="p-3 bg-slate-900/10 border border-slate-900/60 rounded-lg text-xs leading-relaxed text-slate-400 font-normal">
                      <strong className="text-slate-200">Governance Engine Insights:</strong> Pentaho Data Catalog automatically tracks transformations mapping outputs. When structural modifications occur (e.g., changes made in PDI steps), PDC maps upstream schema dependencies to prevent breakages, ensuring compliant pipelines.
                    </div>
                  </div>

                  {/* Metadata Classification and Tags list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 space-y-3">
                      <span className="block text-[9.5px] font-mono font-bold uppercase text-[#3b82f6] tracking-wider">
                        Asset Metadata Discovery Profile
                      </span>
                      <ul className="space-y-2 text-[11px] font-semibold">
                        <li className="flex items-center justify-between p-2 bg-slate-900/40 border border-slate-900 rounded-lg">
                          <span className="text-slate-400">Owner Steward:</span>
                          <span className="text-slate-200 font-mono">Rishu Shrivastava (Lead Architect)</span>
                        </li>
                        <li className="flex items-center justify-between p-2 bg-slate-900/40 border border-slate-900 rounded-lg">
                          <span className="text-slate-400">Catalog Certification status:</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-mono border border-emerald-500/20 font-black">
                            CERTIFIED ASSET
                          </span>
                        </li>
                        <li className="flex items-center justify-between p-2 bg-slate-900/40 border border-[#22c55e]/10 rounded-lg">
                          <span className="text-slate-400">Auto PII Shielding matching:</span>
                          <span className="text-slate-200 font-mono text-[10px]">Identified &amp; Hashed by PDI</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 space-y-3">
                      <span className="block text-[9.5px] font-mono font-bold uppercase text-[#3b82f6] tracking-wider">
                        Governance Catalog Tags Applied
                      </span>
                      <div className="flex flex-wrap gap-2 pt-1 text-[10px] font-bold">
                        <span className="px-2.5 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                          #Medallion-LTV-Gold
                        </span>
                        <span className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                          #PII-Anonymized
                        </span>
                        <span className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                          #GDPR-Compliant
                        </span>
                        <span className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 font-mono">
                          #Pentaho-Cataloged
                        </span>
                        <span className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-mono border border-slate-800/80">
                          #Enterprise-Lakehouse
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* Tab 3: Security, Observability & Guardrails */}
              {selectedTab === "security" && (
                <div className="space-y-6">
                  
                  {/* Security Audit Console */}
                  <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-400 border-b border-slate-900 pb-3">
                      <ShieldCheck size={18} />
                      <h4 className="font-display text-sm font-bold text-slate-200">
                        Observability, Security &amp; Assurance Layer
                      </h4>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed font-normal">
                      Active security rules block unmasked data from propagating. Observer watchdogs run schemas checking assertions on every pipeline micro-batch sequence.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Rule Card 1 */}
                      <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-900 space-y-2.5">
                        <div className="flex items-center gap-1.5">
                          <Lock size={14} className="text-emerald-400" />
                          <span className="text-[10.5px] font-mono font-bold text-slate-200">Column Level Masking</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal font-normal">
                          Filters and tokenizes elements containing sensitive PII matching regular expressions (regex) or metadata catalogs.
                        </p>
                        <div className="flex items-center text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded self-start">
                          ● ACTIVE: SHA-256 Hashing Enforced
                        </div>
                      </div>

                      {/* Rule Card 2 */}
                      <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-900 space-y-2.5">
                        <div className="flex items-center gap-1.5">
                          <AlertCircle size={14} className="text-emerald-400" />
                          <span className="text-[10.5px] font-mono font-bold text-slate-200">Schema Drift Protection</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal font-normal">
                          Shields databases from upstream structure differences. PDC issues email alerts if schemas change mid-execution.
                        </p>
                        <div className="flex items-center text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded self-start">
                          ● PROTECTING: Match 100% Schema Auto-Guard
                        </div>
                      </div>

                      {/* Rule Card 3 */}
                      <div className="p-4 bg-slate-900/30 rounded-xl border border-slate-900 space-y-2.5">
                        <div className="flex items-center gap-1.5">
                          <Gauge size={14} className="text-emerald-400" />
                          <span className="text-[10.5px] font-mono font-bold text-slate-200">Data Loss Prevention (DLP)</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-normal font-normal">
                          Guarantees zero plain-text leaks to downstream star-schemas or Gold dashboards during standard workflows.
                        </p>
                        <div className="flex items-center text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded self-start">
                          ● CERTIFIED: GDPR &amp; HIPAA Compliant
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Schema Drift Simulation Control */}
                  <div className="bg-slate-950 border border-[#ef4444]/20 rounded-xl p-5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 bg-rose-500/5">
                    <div className="space-y-1 md:max-w-xl">
                      <div className="flex items-center gap-1.5 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                        <ShieldAlert size={14} />
                        Disaster Recovery Demo: Schema Drift Attack Trigger
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed font-normal">
                        Simulate an upstream CRM update throwing schema columns (e.g. adding unannounced client fields) directly to the Bronze staging. Watch how Pentaho Data Catalog automatically halts compilation, shielding the Gold schema and Snowflake tables from crash failures.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        handleStopSimulation();
                        setIsPlaying(true);
                        setScrollingLogs([
                          "[INFO - PDI Engine] Commencing Schema Drift Simulator...",
                          "[INGEST - Bronze] CRM upstream modified unexpectedly! Field 'raw_ssn_unencrypted' thrown. Ingest halted.",
                          "[ERROR - SECURITY OBSERVER] PII Violation detected in Landing bucket: raw_ssn_unencrypted in plaintext!",
                          "[ALERT - PDC] Halting job stream 'Bronze_To_Silver_Cleanser'. Preventing corrupted schema updates.",
                          "[ALERT - MONITOR] Ticket dispatched directly to Lead Data Engineer (Rishu Shrivastava). Gold partition shielded."
                        ]);
                        setCurrentQualityScore(40);
                      }}
                      className="px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold font-display text-[11px] tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
                    >
                      Trigger Schema Drift
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
