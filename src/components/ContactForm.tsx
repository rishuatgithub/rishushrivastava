import { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Linkedin, Github, Globe, MapPin, Send, Copy, Check, MessageSquare, AlertCircle, RefreshCw } from "lucide-react";
import { INTRO_HIGHLIGHTS } from "../data";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    category: "Consulting",
    message: ""
  });
  
  const [copied, setCopied] = useState(false);
  
  // Custom fetch-based Formspree state management for highest reliability
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rishu.shrivastava@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("https://formspree.io/f/xjgzakjz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || "Not specified",
          category: formData.category,
          message: formData.message
        })
      });

      if (response.ok) {
        setSucceeded(true);
        // Reset inputs
        setFormData({
          name: "",
          email: "",
          company: "",
          category: "Consulting",
          message: ""
        });
      } else {
        const data = await response.json().catch(() => ({}));
        if (data && data.errors && Array.isArray(data.errors)) {
          const errMsg = data.errors.map((err: any) => err.message).join(", ");
          setError(errMsg);
        } else {
          setError("Submission rejected by provider. Please double check details or email me directly.");
        }
      }
    } catch (err) {
      setError("Unable to connect to service. Please verify your internet connection or try again.");
      console.error("Formspree submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact_section" className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Connection details on the left (Direct Connection Hub) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-slate-900 text-white rounded-2xl p-6 md:p-8 xl:p-10 shadow-lg">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded">
                Direct Connection Hub
              </span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight pt-1">
                Let&apos;s build something exceptional.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect directly for board-level advisory, systemic AI engineering blueprints, or enterprise data capability integration.
              </p>
            </div>

            {/* Direct contact info list */}
            <div className="space-y-4 pt-4">
              {/* Copyable Email item */}
              <div 
                onClick={handleCopyEmail}
                className="group p-4 bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">Direct Email</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                      rishu.shrivastava@gmail.com
                    </span>
                  </div>
                </div>
                <div className="text-slate-500 group-hover:text-slate-300 transition-colors p-1">
                  {copied ? <Check size={14} className="text-[#22c55e]" /> : <Copy size={14} />}
                </div>
              </div>

              {/* Location item */}
              <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl flex items-center gap-3.5 select-none">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">Location</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    London, UK (GMT+1)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social connections drawer */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <span className="block text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              Corporate profiles
            </span>
            <div className="grid grid-cols-3 gap-3">
              <a
                href={INTRO_HIGHLIGHTS.linkedIn}
                target="_blank"
                rel="noreferrer"
                id="contact_linkedin_hub"
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-800/20 border border-slate-800 hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/10 transition-all text-center group"
              >
                <Linkedin size={18} className="text-slate-400 group-hover:text-[#3b82f6] transition-colors mb-1.5" />
                <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">LinkedIn</span>
              </a>
              <a
                href={INTRO_HIGHLIGHTS.github}
                target="_blank"
                rel="noreferrer"
                id="contact_github_hub"
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-800/20 border border-slate-800 hover:border-slate-500 hover:bg-slate-700/20 transition-all text-center group"
              >
                <Github size={18} className="text-slate-400 group-hover:text-slate-200 transition-colors mb-1.5" />
                <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">GitHub</span>
              </a>
              <a
                href="https://tech-spaghetti.com/"
                target="_blank"
                rel="noreferrer"
                id="contact_blog_hub"
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-800/20 border border-slate-800 hover:border-amber-500/40 hover:bg-amber-500/10 transition-all text-center group"
              >
                <Globe size={18} className="text-slate-400 group-hover:text-amber-500 transition-colors mb-1.5" />
                <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">Tech Blog</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact message form on the right */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 xl:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <MessageSquare className="text-[#3b82f6]" size={20} />
              <h3 className="font-display text-xl font-extrabold text-[#0f172a] tracking-tight">
                Send a Direct Message
              </h3>
            </div>

            {succeeded ? (
              <div className="text-center py-12 px-6 bg-emerald-50/40 border border-emerald-200 rounded-2xl flex flex-col items-center justify-center space-y-4 animate-fade-in my-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-full">
                  <Check size={32} />
                </div>
                <h4 className="font-display text-lg font-bold text-[#0f172a]">
                  Enquiry Transmitted!
                </h4>
                <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                  Thank you! Your message has been successfully generated and delivered through **Formspree.io** to **rishu.shrivastava@gmail.com**. Rishu will respond as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setSucceeded(false)}
                  className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-bold font-mono tracking-wider hover:bg-slate-800 transition-colors cursor-pointer uppercase"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-1">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-slate-200 hover:border-slate-300 focus:border-[#3b82f6] focus:outline-none transition-all rounded placeholder:text-slate-400 font-semibold"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-1">
                      Your Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-slate-200 hover:border-slate-300 focus:border-[#3b82f6] focus:outline-none transition-all rounded placeholder:text-slate-400 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-1">
                      Company Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Acme Corp"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-slate-200 hover:border-slate-300 focus:border-[#3b82f6] focus:outline-none transition-all rounded placeholder:text-slate-400 font-semibold"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-1">
                      Interest Area
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-slate-200 hover:border-slate-300 focus:border-[#3b82f6] focus:outline-none transition-all rounded font-semibold text-slate-700"
                    >
                      <option value="Consulting">Consulting Advisory</option>
                      <option value="Hiring">Architectural Role Hiring</option>
                      <option value="General">General Networking</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest mb-1">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Share details on your strategic requirements, platform challenges, or project parameters..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#f8fafc] border border-slate-200 hover:border-slate-300 focus:border-[#3b82f6] focus:outline-none transition-all rounded placeholder:text-slate-400 font-medium leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  id="contact_form_submit_trigger"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded bg-[#0f172a] border border-[#0f172a] text-white font-bold font-display text-sm tracking-wide shadow-sm hover:bg-[#1e293b] hover:border-[#1e293b] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
