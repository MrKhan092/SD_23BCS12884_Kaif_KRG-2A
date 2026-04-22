import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { PROBLEMS } from "../data/problem";
import { ChevronRightIcon, Code2Icon, SearchIcon } from "lucide-react";
import { useState } from "react";

const S = {
  bg: "#0a0a0a", surface: "#111", border: "#1f1f1f",
  accent: "#00ff87", muted: "#555", textSub: "#888",
};

function DifficultyBadge({ difficulty }) {
  const map = {
    Easy:   { color: "#00ff87", bg: "rgba(0,255,135,0.08)" },
    Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
    Hard:   { color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
  };
  const d = map[difficulty] || map.Easy;
  return (
    <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ color: d.color, background: d.bg, fontFamily: "'JetBrains Mono',monospace" }}>
      {difficulty}
    </span>
  );
}

function ProblemsPage() {
  const allProblems = Object.values(PROBLEMS);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("All");

  const filtered = allProblems.filter((p) => {
    const q = search.toLowerCase();
    return (p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q))
      && (filter === "All" || p.difficulty === filter);
  });

  const counts = {
    total: allProblems.length,
    Easy:  allProblems.filter((p) => p.difficulty === "Easy").length,
    Medium:allProblems.filter((p) => p.difficulty === "Medium").length,
    Hard:  allProblems.filter((p) => p.difficulty === "Hard").length,
  };

  return (
    <div className="min-h-screen relative" style={{ background: S.bg, fontFamily: "'Geist','DM Sans',sans-serif" }}>

      {/* GRID TEXTURE */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)`,
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse 100% 80% at 50% 0%,black 40%,transparent 100%)",
      }} />
      {/* GLOW */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div style={{ position:"absolute", top:"-180px", left:"50%", transform:"translateX(-50%)", width:"700px", height:"400px", background:"radial-gradient(ellipse,rgba(0,255,135,0.06) 0%,transparent 70%)", filter:"blur(40px)" }} />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* PAGE HEADER */}
        <div className="border-b" style={{ borderColor: S.border }}>
          <div className="max-w-5xl mx-auto px-6 py-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color:"#444", fontFamily:"'JetBrains Mono',monospace" }}>Practice</p>
            <h1 className="text-3xl font-black tracking-tight text-white mb-1.5" style={{ fontFamily:"'Geist',sans-serif", letterSpacing:"-0.04em" }}>Problems</h1>
            <p className="text-sm" style={{ color: S.muted }}>Sharpen your coding skills with these curated problems</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">

          {/* STAT CARDS */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {[
              { label:"Total",  val:counts.total,  color:"#fff" },
              { label:"Easy",   val:counts.Easy,   color:"#00ff87" },
              { label:"Medium", val:counts.Medium, color:"#f59e0b" },
              { label:"Hard",   val:counts.Hard,   color:"#ef4444" },
            ].map(({ label, val, color }) => (
              <div key={label} className="rounded-xl border px-5 py-4 transition-all duration-150" style={{ background:S.surface, borderColor:S.border }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = S.border)}
              >
                <div className="text-2xl font-black tracking-tight" style={{ color, fontFamily:"'Geist',monospace" }}>{val}</div>
                <div className="text-xs mt-0.5" style={{ color:S.muted }}>{label}</div>
              </div>
            ))}
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color:S.muted }} />
              <input
                type="text" placeholder="Search problems or categories…"
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm outline-none transition-all"
                style={{ background:S.surface, borderColor:S.border, color:"#fff", fontFamily:"'Geist',sans-serif" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,135,0.3)")}
                onBlur={(e)  => (e.target.style.borderColor = S.border)}
              />
            </div>
            <div className="flex rounded-lg border overflow-hidden" style={{ borderColor:S.border, background:S.surface }}>
              {["All","Easy","Medium","Hard"].map((d) => (
                <button key={d} onClick={() => setFilter(d)}
                  className="px-4 py-2.5 text-sm transition-all duration-150"
                  style={{ background:filter===d ? S.accent:"transparent", color:filter===d?"#000":S.textSub, fontWeight:filter===d?700:500 }}
                >{d}</button>
              ))}
            </div>
          </div>

          {/* PROBLEM ROWS */}
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <Code2Icon className="w-10 h-10 mx-auto mb-3" style={{ color:"#222" }} />
                <p className="text-sm" style={{ color:S.muted }}>No problems match your search.</p>
              </div>
            ) : filtered.map((problem, idx) => (
              <Link
                key={problem.id} to={`/problem/${problem.id}`}
                className="group flex items-center gap-5 px-5 py-4 rounded-xl border transition-all duration-150"
                style={{ background:S.surface, borderColor:S.border, textDecoration:"none" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(0,255,135,0.18)"; e.currentTarget.style.background="#121212"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor=S.border; e.currentTarget.style.background=S.surface; }}
              >
                {/* index */}
                <span className="w-7 text-right text-xs flex-shrink-0 tabular-nums" style={{ color:"#333", fontFamily:"'JetBrains Mono',monospace" }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                {/* icon */}
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"rgba(0,255,135,0.06)" }}>
                  <Code2Icon className="w-4 h-4" style={{ color:S.accent }} />
                </div>
                {/* info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-0.5">
                    <span className="text-sm font-semibold text-white truncate">{problem.title}</span>
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </div>
                  <p className="text-xs" style={{ color:S.muted }}>{problem.category}</p>
                </div>
                {/* snippet */}
                <p className="hidden lg:block text-xs max-w-xs truncate flex-shrink-0" style={{ color:"#333" }}>
                  {problem.description?.text?.slice(0, 72)}…
                </p>
                {/* cta */}
                <div className="flex items-center gap-1.5 text-xs font-bold flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color:S.accent }}>
                  Solve <ChevronRightIcon className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;