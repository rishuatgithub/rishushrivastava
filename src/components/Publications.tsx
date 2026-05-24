import { useState } from "react";
import { BookOpen, ExternalLink, Calendar, Hourglass, Search } from "lucide-react";
import { BLOG_ARTICLES } from "../data";

export default function Publications() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", ...Array.from(new Set(BLOG_ARTICLES.map((art) => art.category)))];

  const filteredArticles = BLOG_ARTICLES.filter((art) => {
    const matchesCategory = activeCategory === "All" || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="publications_section" className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="text-[#3b82f6]" size={20} />
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Publications &amp; Insights
            </h2>
          </div>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl">
            Thought leadership writeups, architecture tutorials, and strategic commentary authored by Rishu on machine learning, cloud provisioning, and data frameworks.
          </p>
        </div>

        {/* Search Input bar */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-450" size={16} />
          <input
            type="text"
            placeholder="Search blogs or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded focus:border-[#3b82f6] focus:outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded text-xs font-semibold tracking-wide transition-all ${
              activeCategory === cat
                ? "bg-[#0f172a] text-white shadow-sm"
                : "bg-white border border-slate-205 hover:bg-[#f8fafc] text-slate-600 cursor-pointer"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid layout */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-12 rounded border border-dashed border-slate-300 bg-[#f8fafc] text-slate-400 font-medium text-sm">
          No matches found for &quot;{searchQuery}&quot; under Category: {activeCategory}. Click &quot;All&quot; to reset.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
            >
              <div className="space-y-3">
                {/* Meta details */}
                <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 font-mono font-semibold">
                  <span className="px-2 py-0.5 rounded bg-[#f1f5f9] border border-[#e2e8f0] font-bold text-[#475569] uppercase tracking-widest leading-none">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="flex items-center gap-0.5">
                      <Calendar size={11} />
                      {art.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Hourglass size={11} />
                      {art.readingTime}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-base font-bold text-[#0f172a] group-hover:text-[#3b82f6] transition-colors line-clamp-3 leading-tight pr-1">
                  {art.title}
                </h3>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-4 font-normal">
                  {art.summary}
                </p>
              </div>

              {/* Tags & Action CTA */}
              <div className="mt-5 space-y-4 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-1">
                  {art.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#f8fafc] border border-slate-200 text-[10px] text-slate-500 font-mono rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {art.tags.length > 3 && (
                    <span className="text-[10px] text-slate-400 font-mono pl-1">
                      +{art.tags.length - 3} more
                    </span>
                  )}
                </div>

                <a
                  href={art.url}
                  target="_blank"
                  rel="noreferrer"
                  id={`blog_link_${art.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3b82f6] hover:text-blue-800 transition-colors uppercase tracking-wider"
                >
                  <span>Read full write-up</span>
                  <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
