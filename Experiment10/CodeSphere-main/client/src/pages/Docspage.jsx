import { Link } from "react-router";
import { ArrowRightIcon, BookOpenIcon, CodeIcon, ZapIcon, VideoIcon, KeyIcon, TerminalIcon, ChevronRightIcon } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const S = { bg:"#0a0a0a", surface:"#111", border:"#1f1f1f", accent:"#00ff87", muted:"#555", textSub:"#888" };

const SECTIONS = [
  {
    icon: ZapIcon, accent:"#00ff87", title:"Getting started",
    items:["Quick start guide","Creating your first session","Joining a session","Account setup"],
  },
  {
    icon: CodeIcon, accent:"#818cf8", title:"Code editor",
    items:["Supported languages","Keyboard shortcuts","Syntax themes","Running code"],
  },
  {
    icon: VideoIcon, accent:"#f59e0b", title:"Video & audio",
    items:["Browser permissions","Connection quality","Screen sharing","Troubleshooting"],
  },
  {
    icon: KeyIcon, accent:"#f472b6", title:"Authentication",
    items:["Sign in with Google","Sign in with GitHub","Session tokens","Security FAQ"],
  },
  {
    icon: TerminalIcon, accent:"#34d399", title:"API reference",
    items:["REST API overview","Sessions endpoints","Problems endpoints","Webhooks"],
  },
  {
    icon: BookOpenIcon, accent:"#fb923c", title:"Guides",
    items:["Interview best practices","Problem-solving patterns","Time management tips","Mock interview checklist"],
  },
];

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b" style={{ background:"rgba(10,10,10,0.85)", borderColor:S.border, backdropFilter:"blur(20px)" }}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" style={{ textDecoration:"none" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ background:S.accent, color:"#000", fontFamily:"'JetBrains Mono',monospace" }}>CS</div>
          <span className="font-bold text-sm tracking-tight text-white" style={{ fontFamily:"'Geist',sans-serif" }}>CodeSphere</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {[["Features","/features"],["Pricing","/pricing"],["Docs","/docs"],["Blog","/blog"]].map(([label,to])=>(
            <Link key={to} to={to} className="text-sm transition-colors duration-150" style={{ color:to==="/docs"?S.accent:S.textSub, textDecoration:"none" }}
              onMouseEnter={(e)=>(e.currentTarget.style.color="#fff")}
              onMouseLeave={(e)=>(e.currentTarget.style.color=to==="/docs"?S.accent:S.textSub)}
            >{label}</Link>
          ))}
        </div>
        <SignInButton mode="modal">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold" style={{ background:S.accent, color:"#000" }}>
            Get Started <ArrowRightIcon className="w-3.5 h-3.5"/>
          </button>
        </SignInButton>
      </div>
    </nav>
  );
}

function DocsPage() {
  return (
    <div className="min-h-screen relative" style={{ background:S.bg, fontFamily:"'Geist','DM Sans',sans-serif" }}>
      <div className="pointer-events-none fixed inset-0 z-0" style={{
        backgroundImage:`linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)`,
        backgroundSize:"72px 72px",
        maskImage:"radial-gradient(ellipse 100% 80% at 50% 0%,black 40%,transparent 100%)",
      }}/>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div style={{ position:"absolute", top:"-180px", left:"50%", transform:"translateX(-50%)", width:"700px", height:"400px", background:"radial-gradient(ellipse,rgba(0,255,135,0.06) 0%,transparent 70%)", filter:"blur(40px)" }}/>
      </div>

      <div className="relative z-10">
        <NavBar/>

        {/* HERO */}
        <div className="border-b" style={{ borderColor:S.border }}>
          <div className="max-w-5xl mx-auto px-6 py-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color:"#444", fontFamily:"'JetBrains Mono',monospace" }}>Documentation</p>
            <h1 className="text-4xl font-black tracking-tight text-white mb-3" style={{ fontFamily:"'Geist',sans-serif", letterSpacing:"-0.04em" }}>
              CodeSphere Docs
            </h1>
            <p className="text-base mb-8" style={{ color:S.muted }}>Everything you need to get up and running.</p>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs" style={{ color:S.muted, fontFamily:"'JetBrains Mono',monospace" }}>⌘K</span>
              <input
                type="text" placeholder="Search documentation…"
                className="w-full pl-12 pr-4 py-3 rounded-xl border text-sm outline-none transition-all"
                style={{ background:S.surface, borderColor:S.border, color:"#fff", fontFamily:"'Geist',sans-serif" }}
                onFocus={(e)=>(e.target.style.borderColor="rgba(0,255,135,0.3)")}
                onBlur={(e)=>(e.target.style.borderColor=S.border)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">

          {/* Quick start banner */}
          <div className="rounded-2xl border p-6 mb-10 flex items-center justify-between gap-6" style={{ background:"#0f1a14", borderColor:"rgba(0,255,135,0.2)" }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color:S.accent, fontFamily:"'JetBrains Mono',monospace" }}>New here?</p>
              <h3 className="text-base font-bold text-white mb-1">Start with the Quick Start guide</h3>
              <p className="text-sm" style={{ color:S.muted }}>Get your first session running in under 2 minutes.</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold flex-shrink-0" style={{ background:S.accent, color:"#000" }}>
              Quick Start <ArrowRightIcon className="w-4 h-4"/>
            </button>
          </div>

          {/* Doc sections grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTIONS.map(({ icon:Icon, accent, title, items }) => (
              <div key={title} className="rounded-xl border p-6 transition-all duration-150" style={{ background:S.surface, borderColor:S.border }}
                onMouseEnter={(e)=>(e.currentTarget.style.borderColor=`${accent}33`)}
                onMouseLeave={(e)=>(e.currentTarget.style.borderColor=S.border)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background:`${accent}12` }}>
                    <Icon className="w-4 h-4" style={{ color:accent }}/>
                  </div>
                  <h3 className="text-sm font-bold text-white" style={{ fontFamily:"'Geist',sans-serif" }}>{title}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item}>
                      <a href="#" className="flex items-center gap-2 text-xs transition-colors duration-150 group" style={{ color:S.muted, textDecoration:"none" }}
                        onMouseEnter={(e)=>(e.currentTarget.style.color="#fff")}
                        onMouseLeave={(e)=>(e.currentTarget.style.color=S.muted)}
                      >
                        <ChevronRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color:accent }}/>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DocsPage;