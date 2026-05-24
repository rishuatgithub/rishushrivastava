import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Mail, Check, Bell, Inbox, Send, Trash2 } from "lucide-react";
import { Message } from "../types";

export default function ContactForm() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    category: "Hiring" as const,
    message: ""
  });
  
  const [showToast, setShowToast] = useState(false);

  // Load old simulated messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_inquiry_inbox");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to read inquiries inbox", e);
      }
    } else {
      // Setup a friendly diagnostic initial message
      const welcomeMsg: Message = {
        id: "wel_1",
        name: "Acme Analytics Inc.",
        email: "vp@acmeanalytics.com",
        company: "Acme Corp",
        category: "Consulting",
        message: "Hi Rishu, we saw your custom GenAI Suite plugin work and would love to consult you on introducing LLM pipelines into our data streams under AWS Redshift. Excellent visual summary here!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcomeMsg]);
      localStorage.setItem("portfolio_inquiry_inbox", JSON.stringify([welcomeMsg]));
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const newMsg: Message = {
      id: "msg_" + Date.now(),
      name: formData.name,
      email: formData.email,
      company: formData.company || "Self-Employed",
      category: formData.category,
      message: formData.message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem("portfolio_inquiry_inbox", JSON.stringify(updated));

    // Reset fields
    setFormData({
      name: "",
      email: "",
      company: "",
      category: "Hiring",
      message: ""
    });

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleDeleteMessage = (id: string) => {
    const filtered = messages.filter((m) => m.id !== id);
    setMessages(filtered);
    localStorage.setItem("portfolio_inquiry_inbox", JSON.stringify(filtered));
  };

  return (
    <section id="contact_section" className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact form on the left */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Mail className="text-[#3b82f6]" size={20} />
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0f172a] tracking-tight">
              Inquire / Connect
            </h2>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-1">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-slate-200 hover:border-slate-350 focus:border-[#3b82f6] focus:outline-none transition-all rounded placeholder:text-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-1">
                  YOUR EMAIL *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane@company.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-slate-200 hover:border-slate-350 focus:border-[#3b82f6] focus:outline-none transition-all rounded placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-1">
                  COMPANY NAME
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Acme Analytics"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-slate-200 hover:border-slate-350 focus:border-[#3b82f6] focus:outline-none transition-all rounded placeholder:text-slate-400 font-medium"
                />
              </div>

              {/* Category selector */}
              <div>
                <label className="block text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-1">
                  TOPIC OF INQUIRY
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-slate-200 hover:border-slate-350 focus:border-[#3b82f6] focus:outline-none transition-all rounded font-semibold text-slate-700"
                >
                  <option value="Hiring">Open Hiring Role</option>
                  <option value="Consulting">Consulting Advisory</option>
                  <option value="General">General Networking</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-1">
                YOUR MESSAGE *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Share your architectural proposal, project timelines, or custom inquiries..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-slate-200 hover:border-slate-350 focus:border-[#3b82f6] focus:outline-none transition-all rounded placeholder:text-slate-400 font-medium leading-relaxed"
              />
            </div>

            <button
              type="submit"
              id="contact_form_submit_trigger"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#0f172a] border border-[#0f172a] text-white font-bold font-display text-sm tracking-wide shadow-sm hover:bg-[#1e293b] transition-colors cursor-pointer"
            >
              <Send size={15} />
              <span>Broadcast simulated message</span>
            </button>
          </form>

          {/* Toast notifications */}
          {showToast && (
            <div className="mt-4 p-3 rounded bg-emerald-50 text-emerald-800 border border-emerald-250 flex items-center gap-2 text-xs font-semibold leading-none">
              <Check size={14} className="text-[#22c55e] shrink-0" />
              <span>Simulated inquiry sent! Trace it in Rishu&apos;s Inbox on the right.</span>
            </div>
          )}
        </div>

        {/* Local Inbox Simulator monitor */}
        <div className="lg:col-span-7 bg-[#f8fafc] rounded-2xl p-6 md:p-8 border border-slate-200 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Inbox className="text-slate-600" size={20} />
                <h3 className="font-display text-base font-bold text-[#0f172a]">
                  Rishu Shrivastava&apos;s Sim-Inbox
                </h3>
              </div>
              <span className="text-[10px] uppercase font-mono font-bold bg-[#0f172a] text-white px-2.5 py-0.5 rounded shadow-sm border border-[#0f172a]">
                {messages.length} Live Trace Item{messages.length !== 1 ? "s" : ""}
              </span>
            </div>

            <p className="text-slate-500 text-xs mb-4 leading-relaxed font-normal">
              Any message sent via the contact form yields realistic instant status streams here:
            </p>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <div className="text-center py-10 bg-white border border-slate-200 rounded text-slate-400 font-medium text-xs font-mono">
                  Inbox is currently clear. Shoot any inquiry!
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded bg-white border border-slate-200 shadow-sm relative space-y-1 sm:space-y-1.5 hover:border-slate-350 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold block bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] px-2 py-0.5 rounded uppercase tracking-wider">
                            {m.category}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold font-mono">{m.timestamp}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] mt-1">
                          {m.name} <span className="font-medium text-slate-400">({m.company})</span>
                        </h4>
                      </div>

                      {/* delete action trigger */}
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-slate-50 transition-colors cursor-pointer"
                        title="Delete receipt"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-650 leading-relaxed pt-1 whitespace-pre-line">
                      {m.message}
                    </p>
                    <div className="text-[10px] font-mono font-semibold text-[#3b82f6]">
                      email to target: {m.email}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded bg-white border border-slate-200 text-[11px] sm:text-xs text-slate-500 leading-relaxed font-mono">
            <strong>System notification:</strong> This environment persists records securely in the localized browser context (window.localStorage). No remote network calls triggered.
          </div>
        </div>

      </div>
    </section>
  );
}
