import { useState } from "react";
import { Play, Database, Cpu, HardDriveDownload, Sparkles, Network } from "lucide-react";
import { SANDBOX_NODES } from "../data";

export default function Sandbox() {
  const [selectedSource, setSelectedSource] = useState(SANDBOX_NODES.sources[0].id);
  const [selectedTransform, setSelectedTransform] = useState(SANDBOX_NODES.transforms[0].id);
  const [selectedDestination, setSelectedDestination] = useState(SANDBOX_NODES.destinations[0].id);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [pipelineMetrics, setPipelineMetrics] = useState({
    throughput: "0.0 MB/s",
    avgLatency: "0 ms",
    recordsProcessed: 0,
    status: "Parked"
  });

  const sourceObj = SANDBOX_NODES.sources.find((s) => s.id === selectedSource)!;
  const transformObj = SANDBOX_NODES.transforms.find((t) => t.id === selectedTransform)!;
  const destinationObj = SANDBOX_NODES.destinations.find((d) => d.id === selectedDestination)!;

  const handleStartPipeline = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setPipelineMetrics({
        throughput: "0.0 MB/s",
        avgLatency: "0 ms",
        recordsProcessed: 0,
        status: "Parked"
      });
      return;
    }

    setIsPlaying(true);
    let count = 0;
    
    // Simulate real logs running
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 850) + 150;
      
      // Compute mock metrics based on choices
      let flowRate = "42.4 MB/s";
      let latency = "240 ms";
      if (selectedSource === "src_sql" && selectedTransform === "tf_clean") {
        flowRate = "124.5 MB/s";
        latency = "45 ms";
      } else if (selectedSource === "src_s3" && selectedTransform === "tf_ai") {
        flowRate = "18.8 MB/s";
        latency = "2,450 ms"; // AI is slow but smart!
      } else if (selectedTransform === "tf_ai") {
        flowRate = "32.0 MB/s";
        latency = "1,880 ms";
      } else {
        flowRate = "98.2 MB/s";
        latency = "90 ms";
      }

      setPipelineMetrics({
        throughput: flowRate,
        avgLatency: latency,
        recordsProcessed: count,
        status: "Acquiring..."
      });
    }, 800);

    // Save timer key
    (window as any).sandboxInterval = interval;
  };

  // Stop dynamic flow on unmount if any
  const handleStopPipelineChange = () => {
    if ((window as any).sandboxInterval) {
      clearInterval((window as any).sandboxInterval);
    }
  };

  return (
    <section id="sandbox_section" className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="bg-[#0f172a] rounded-3xl text-slate-100 p-6 md:p-10 border border-slate-950 shadow-xl overflow-hidden relative">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="relative space-y-8">
          
          {/* Header titles */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 text-[#3b82f6] border border-slate-700 text-[10px] font-mono tracking-wider uppercase font-semibold">
                <Network size={12} />
                PDI Pipeline Workspace
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Data Pipeline Sandbox
              </h2>
              <p className="text-slate-400 text-xs md:text-sm max-w-xl font-normal">
                Configure nodes below to simulate how Rishu designs cloud architectures, utilizing Pentaho, Python buffers, and custom AI processors.
              </p>
            </div>

            {/* Run CTA */}
            <button
              onClick={handleStartPipeline}
              id="sandbox_run_flow_trigger"
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded font-bold font-display text-sm tracking-wide shadow-md transition-all shrink-0 cursor-pointer ${
                isPlaying
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "bg-[#3b82f6] hover:bg-blue-700 text-white"
              }`}
            >
              <Play size={16} className={`${isPlaying ? "animate-spin" : ""}`} />
              <span>{isPlaying ? "Shut Down Pipeline" : "Deploy & Run Pipeline"}</span>
            </button>
          </div>

          {/* Core Interactive Sandbox Column deck */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Sources */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-slate-400 tracking-widest pl-1">
                <span className="h-2 w-2 rounded-full bg-[#3b82f6]" />
                Ingestion Sources
              </div>
              <div className="space-y-3">
                {SANDBOX_NODES.sources.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => { setSelectedSource(node.id); handleStopPipelineChange(); setIsPlaying(false); }}
                    className={`p-4 rounded border transition-all cursor-pointer ${
                      selectedSource === node.id
                        ? "bg-slate-800/80 border-[#3b82f6] text-white shadow-lg"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Database size={16} className={selectedSource === node.id ? "text-[#3b82f6]" : "text-slate-500"} />
                      <h4 className="text-xs sm:text-sm font-bold">{node.name}</h4>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-80 font-normal">{node.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Transforms */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-slate-400 tracking-widest pl-1">
                <span className="h-2 w-2 rounded-full bg-[#475569]" />
                Data Transformation &amp; Inference
              </div>
              <div className="space-y-3">
                {SANDBOX_NODES.transforms.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => { setSelectedTransform(node.id); handleStopPipelineChange(); setIsPlaying(false); }}
                    className={`p-4 rounded border transition-all cursor-pointer relative overflow-hidden ${
                      selectedTransform === node.id
                        ? "bg-slate-800/80 border-[#3b82f6] text-white shadow-lg"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-300"
                    }`}
                  >
                    {node.id === "tf_ai" && (
                      <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#3b82f6] text-white text-[8px] font-mono font-bold uppercase rounded-bl">
                        Rishu's GenAI Plugin
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-1">
                      <Cpu size={16} className={selectedTransform === node.id ? "text-[#3b82f6]" : "text-slate-500"} />
                      <h4 className="text-xs sm:text-sm font-bold">{node.name}</h4>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-80 font-normal">{node.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Storage destinations */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-slate-400 tracking-widest pl-1">
                <span className="h-2 w-2 rounded-full bg-slate-550 border border-slate-600" />
                Divergent Storage Destinations
              </div>
              <div className="space-y-3">
                {SANDBOX_NODES.destinations.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => { setSelectedDestination(node.id); handleStopPipelineChange(); setIsPlaying(false); }}
                    className={`p-4 rounded border transition-all cursor-pointer ${
                      selectedDestination === node.id
                        ? "bg-slate-800/80 border-[#3b82f6] text-white shadow-lg"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <HardDriveDownload size={16} className={selectedDestination === node.id ? "text-[#3b82f6]" : "text-slate-500"} />
                      <h4 className="text-xs sm:text-sm font-bold">{node.name}</h4>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-80 font-normal">{node.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Visual Interactive Pipeline status block */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-550 mb-4 text-slate-400">
              DATAFLOW VISUALIZATION CONSOLE
            </h3>

            <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
              
              {/* Nodes preview string */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-450 font-medium">
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-white font-bold uppercase">{sourceObj.name}</span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-[#3b82f6] font-bold uppercase flex items-center gap-1">
                  {transformObj.name}
                  {transformObj.id === "tf_ai" && <Sparkles size={10} className="text-amber-400 animate-spin" />}
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-white font-bold uppercase">{destinationObj.name}</span>
              </div>

              {/* Dynamic metrics readout */}
              {isPlaying ? (
                <div className="grid grid-cols-3 gap-6 text-right items-center">
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Throughput</div>
                    <div className="text-sm font-mono font-extrabold text-[#3b82f6] animate-pulse">{pipelineMetrics.throughput}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Avg Latency</div>
                    <div className="text-sm font-mono font-extrabold text-slate-100">{pipelineMetrics.avgLatency}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono text-slate-500 font-bold">Stream Records</div>
                    <div className="text-sm font-mono font-extrabold text-slate-300">
                      {pipelineMetrics.recordsProcessed.toLocaleString()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs font-mono text-slate-500 italic">
                  Run the simulation block to trace architecture latency variables.
                </div>
              )}
            </div>

            {/* Custom Architectural explanation commentary based on nodes */}
            <div className="mt-5 border-t border-slate-800/80 pt-4 text-xs font-medium text-slate-400 leading-relaxed bg-slate-900/40 p-3.5 rounded border border-slate-800/50">
              <span className="text-white font-bold block mr-2 mb-1">ARCHITECTURAL ANALYSIS:</span>
              {selectedTransform === "tf_ai" ? (
                <span>
                  Using Rishu&apos;s custom <strong className="text-[#3b82f6]">GenAI Inference step</strong> with {sourceObj.name}. In this layout, transactional content arriving at S3 triggers custom metadata templates using cloud buffers. Calculated vector nodes are parsed and stored in Snowflake with an enterprise governance boundary. This enables secure in-line LLM calculations.
                </span>
              ) : (
                <span>
                  Standard low-latency business pipeline routing. Source tables are parsed with <strong className="text-[#3b82f6]">PDI schema mapping steps</strong>, ensuring absolute type conversions and ACID compliance before pushing bulk datasets into Snowflake analytics engines in less than 90 milliseconds.
                </span>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
