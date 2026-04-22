import { Link } from "react-router";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const S = { bg:"#0a0a0a", surface:"#111", border:"#1f1f1f", accent:"#00ff87", muted:"#555", textSub:"#888" };

const POSTS = [
  {
    tag:"Engineering", tagColor:"#818cf8",
    title:"How we built sub-50ms real-time sync for collaborative coding",
    excerpt:"A deep dive into our WebSocket architecture, CRDT-based conflict resolution, and the infrastructure decisions that make CodeSphere feel instant.",
    author:"Ahmad Karimi", date:"Mar 18, 2026", readTime:"8 min read",
    featured: true,
  },
  {
    tag:"Product", tagColor:"#00ff87",
    title:"Introducing AI hints — smart nudges without spoilers",
    excerpt:"We spent 6 months figuring out how to make AI assistance feel helpful rather than cheating. Here's what we learned.",
    author:"Sarah Chen", date:"Mar 12, 2026", readTime:"5 min read",
    featured: false,
  },
  {
    tag:"Guide", tagColor:"#f59e0b",
    title:"The definitive guide to passing FAANG system design interviews",
    excerpt:"Patterns, frameworks, and common mistakes — compiled from 500+ mock sessions on CodeSphere.",
    author:"DevRel Team", date:"Mar 8, 2026", readTime:"12 min read",
    featured: false,
  },
  {
    tag:"Engineering", tagColor:"#818cf8",
    title:"Migrating from REST to tRPC: lessons from a 6-month journey",
    excerpt:"Why we switched, what we'd do differently, and the performance wins that made it worth it.",
    author:"Ahmad Karimi", date:"Feb 28, 2026", readTime:"7 min read",
    featured: false,
  },
  {
    tag:"Community", tagColor:"#f472b6",
    title:"10,000 sessions milestone — what we've learned from watching developers interview",
    excerpt:"After 10K recorded sessions, patterns have emerged. Here's what separates candidates who get offers from those who don't.",
    author:"Mia Torres", date:"Feb 20, 2026", readTime:"6 min read",
    featured: false,
  },
  {
    tag:"Guide", tagColor:"#f59e0b",
    title:"Dynamic programming patterns every senior engineer should know",
    excerpt:"Bottom-up vs top-down, state compression, and the 8 core patterns that cover 90% of DP interview questions.",
    author:"DevRel Team", date:"Feb 14, 2026", readTime:"10 min read",
    featured: false,
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
            <Link key={to} to={to} className="text-sm transition-colors duration-150" style={{ color:to==="/blog"?S.accent:S.textSub, textDecoration:"none" }}
              onMouseEnter={(e)=>(e.currentTarget.style.color="#fff")}
              onMouseLeave={(e)=>(e.currentTarget.style.color=to==="/blog"?S.accent:S.textSub)}
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

function BlogPage() {
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

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

        {/* HEADER */}
        <div className="border-b" style={{ borderColor:S.border }}>
          <div className="max-w-5xl mx-auto px-6 py-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color:"#444", fontFamily:"'JetBrains Mono',monospace" }}>Blog</p>
            <h1 className="text-4xl font-black tracking-tight text-white mb-2" style={{ fontFamily:"'Geist',sans-serif", letterSpacing:"-0.04em" }}>From the team</h1>
            <p className="text-base" style={{ color:S.muted }}>Engineering deep dives, product updates, and interview guides.</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">

          {/* FEATURED POST */}
          {featured && (
            <div className="rounded-2xl border p-8 mb-8 group cursor-pointer transition-all duration-150" style={{ background:S.surface, borderColor:S.border }}
              onMouseEnter={(e)=>(e.currentTarget.style.borderColor="rgba(0,255,135,0.2)")}
              onMouseLeave={(e)=>(e.currentTarget.style.borderColor=S.border)}
            >
              <span className="inline-block text-xs font-bold px-2 py-0.5 rounded mb-4" style={{ color:featured.tagColor, background:`${featured.tagColor}14`, fontFamily:"'JetBrains Mono',monospace" }}>
                {featured.tag}
              </span>
              <h2 className="text-2xl font-black tracking-tight text-white mb-3 group-hover:text-[#00ff87] transition-colors" style={{ fontFamily:"'Geist',sans-serif", letterSpacing:"-0.03em" }}>
                {featured.title}
              </h2>
              <p className="text-sm leading-relaxed mb-5 max-w-2xl" style={{ color:S.muted }}>{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs" style={{ color:S.muted }}>
                  <span>{featured.author}</span>
                  <span className="flex items-center gap-1"><ClockIcon className="w-3 h-3"/>{featured.readTime}</span>
                  <span>{featured.date}</span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color:S.accent }}>
                  Read more <ArrowRightIcon className="w-3.5 h-3.5"/>
                </span>
              </div>
            </div>
          )}

          {/* POST GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((post) => (
              <div key={post.title}
                className="rounded-xl border p-6 group cursor-pointer flex flex-col transition-all duration-150"
                style={{ background:S.surface, borderColor:S.border }}
                onMouseEnter={(e)=>(e.currentTarget.style.borderColor=`${post.tagColor}33`)}
                onMouseLeave={(e)=>(e.currentTarget.style.borderColor=S.border)}
              >
                <span className="inline-block text-xs font-bold px-2 py-0.5 rounded mb-3 self-start" style={{ color:post.tagColor, background:`${post.tagColor}14`, fontFamily:"'JetBrains Mono',monospace" }}>
                  {post.tag}
                </span>
                <h3 className="text-sm font-bold text-white mb-2 leading-snug flex-1 group-hover:text-[#00ff87] transition-colors" style={{ fontFamily:"'Geist',sans-serif" }}>
                  {post.title}
                </h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color:S.muted }}>{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs" style={{ color:"#444" }}>
                  <span className="flex items-center gap-1"><ClockIcon className="w-3 h-3"/>{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogPage;