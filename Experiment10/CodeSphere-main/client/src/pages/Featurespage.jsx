import { Link } from "react-router";
import { ArrowRightIcon, Code2Icon, VideoIcon, UsersIcon, ZapIcon, ShieldIcon, GlobeIcon, TerminalIcon, GitBranchIcon } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const S = { bg:"#0a0a0a", surface:"#111", border:"#1f1f1f", accent:"#00ff87", muted:"#555", textSub:"#888" };

const FEATURES = [
  {
    icon: VideoIcon,
    title: "HD Video Interviews",
    desc: "Crystal-clear video with adaptive bitrate. No downloads, no plugins — just open a link and you're live.",
    tag: "Communication",
    accent: "#00ff87",
  },
  {
    icon: Code2Icon,
    title: "Live Code Editor",
    desc: "Monaco-powered editor with real-time collaboration. Every keystroke synced in under 50ms globally.",
    tag: "Editor",
    accent: "#818cf8",
  },
  {
    icon: TerminalIcon,
    title: "Code Execution",
    desc: "Run code instantly in sandboxed containers via Piston. Supports JavaScript, Python, Java, C++ and more.",
    tag: "Runtime",
    accent: "#f59e0b",
  },
  {
    icon: UsersIcon,
    title: "1-on-1 Sessions",
    desc: "Private two-person sessions built for deep collaboration. Create a room, share the link, start coding.",
    tag: "Collaboration",
    accent: "#f472b6",
  },
  {
    icon: GitBranchIcon,
    title: "Session History",
    desc: "Every session is tracked with timestamps. Review past problems and monitor your progress over time.",
    tag: "Analytics",
    accent: "#34d399",
  },
  {
    icon: ShieldIcon,
    title: "Secure & Private",
    desc: "Clerk-powered authentication with Google and GitHub OAuth. Your sessions are protected and private.",
    tag: "Security",
    accent: "#fb923c",
  },
  {
    icon: ZapIcon,
    title: "Real-time Sync",
    desc: "Sub-50ms latency for every keystroke, cursor move, and code change — feels like sitting side by side.",
    tag: "Performance",
    accent: "#a78bfa",
  },
  {
    icon: GlobeIcon,
    title: "Multi-Language",
    desc: "Write and run code in JavaScript, Python, Java, C++, and more — all without any local setup.",
    tag: "Languages",
    accent: "#22d3ee",
  },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen relative" style={{ background: S.bg, fontFamily:"'Geist','DM Sans',sans-serif" }}>

      {/* GRID */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{
        backgroundImage:`linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)`,
        backgroundSize:"72px 72px",
        maskImage:"radial-gradient(ellipse 100% 80% at 50% 0%,black 40%,transparent 100%)",
      }}/>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div style={{ position:"absolute", top:"-180px", left:"50%", transform:"translateX(-50%)", width:"700px", height:"400px", background:"radial-gradient(ellipse,rgba(0,255,135,0.06) 0%,transparent 70%)", filter:"blur(40px)" }}/>
      </div>

      <div className="relative z-10">
        {/* NAV */}
        <nav className="sticky top-0 z-50 border-b" style={{ background:"rgba(10,10,10,0.85)", borderColor:S.border, backdropFilter:"blur(20px)" }}>
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5" style={{ textDecoration:"none" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ background:S.accent, color:"#000", fontFamily:"'JetBrains Mono',monospace" }}>CS</div>
              <span className="font-bold text-sm tracking-tight text-white" style={{ fontFamily:"'Geist',sans-serif" }}>CodeSphere</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {[["Features","/features"],["Pricing","/pricing"],["Docs","/docs"],["Blog","/blog"]].map(([label, to]) => (
                <Link key={to} to={to} className="text-sm transition-colors duration-150" style={{ color: to==="/features" ? S.accent : S.textSub, textDecoration:"none" }}
                  onMouseEnter={(e)=>(e.currentTarget.style.color="#fff")}
                  onMouseLeave={(e)=>(e.currentTarget.style.color= to==="/features" ? S.accent : S.textSub)}
                >{label}</Link>
              ))}
            </div>
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all" style={{ background:S.accent, color:"#000" }}>
                Get Started <ArrowRightIcon className="w-3.5 h-3.5"/>
              </button>
            </SignInButton>
          </div>
        </nav>

        {/* HERO */}
        <div className="border-b" style={{ borderColor:S.border }}>
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-6" style={{ background:"rgba(0,255,135,0.06)", borderColor:"rgba(0,255,135,0.2)", color:S.accent, fontFamily:"'JetBrains Mono',monospace" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:S.accent }}/>
              Everything you need
            </div>
            <h1 className="text-5xl font-black tracking-tight text-white mb-5" style={{ fontFamily:"'Geist',sans-serif", letterSpacing:"-0.04em" }}>
              Built for serious<br/><span style={{ color:S.accent }}>technical interviews</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color:S.muted }}>
              Every feature is designed around one goal — helping developers perform their best when it matters most.
            </p>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background:S.border }}>
            {FEATURES.map(({ icon: Icon, title, desc, tag, accent }) => (
              <div key={title} className="group p-7 transition-all duration-150" style={{ background:S.bg }}
                onMouseEnter={(e)=>(e.currentTarget.style.background=S.surface)}
                onMouseLeave={(e)=>(e.currentTarget.style.background=S.bg)}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background:`${accent}12` }}>
                  <Icon className="w-5 h-5" style={{ color:accent }}/>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded mb-3 inline-block" style={{ color:accent, background:`${accent}10`, fontFamily:"'JetBrains Mono',monospace" }}>{tag}</span>
                <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily:"'Geist',sans-serif" }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color:S.muted }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t" style={{ borderColor:S.border }}>
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl font-black tracking-tight text-white mb-4" style={{ fontFamily:"'Geist',sans-serif", letterSpacing:"-0.04em" }}>Ready to start coding?</h2>
            <p className="text-base mb-8" style={{ color:S.muted }}>Join 50,000+ developers already using CodeSphere.</p>
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all" style={{ background:S.accent, color:"#000", boxShadow:"0 0 30px rgba(0,255,135,0.2)" }}>
                Start for free <ArrowRightIcon className="w-4 h-4"/>
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FeaturesPage;