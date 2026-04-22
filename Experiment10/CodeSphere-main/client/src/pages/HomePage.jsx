import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  Globe,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

/* ─────────────────────────────────────────
   Design tokens (mirror these in index.css
   or a tailwind theme if you prefer)
───────────────────────────────────────── */
// accent : #00ff87   (electric green)
// bg     : #0a0a0a
// surface: #111111
// border : #1f1f1f
// muted  : #888888

function HomePage() {
  return (
    <div
      className="min-h-screen text-white antialiased"
      style={{
        background: "#0a0a0a",
        fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* ── GRID TEXTURE ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* ── GLOW ORBS ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            background:
              "radial-gradient(ellipse, rgba(0,255,135,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(10,10,10,0.85)",
          borderColor: "#1f1f1f",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
              style={{ background: "#00ff87", color: "#000" }}
            >
              CS
            </div>
            <span
              className="font-bold text-sm tracking-tight"
              style={{ fontFamily: "'Geist', monospace" }}
            >
              CodeSphere
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[["Features","/features"],["Pricing","/pricing"],["Docs","/docs"],["Blog","/blog"]].map(([label, to]) => (
              <Link
                key={to} to={to}
                className="text-sm transition-colors duration-150"
                style={{ color: "#888", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
              >
                {label}
              </Link>
            ))}
          </div>

          <SignInButton mode="modal">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-95"
              style={{ background: "#00ff87", color: "#000" }}
            >
              Get Started
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="space-y-7">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium"
              style={{
                background: "rgba(0,255,135,0.06)",
                borderColor: "rgba(0,255,135,0.2)",
                color: "#00ff87",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#00ff87" }}
              />
              Real-time Collaboration
            </div>

            {/* Headline */}
            <div>
              <h1
                className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Geist', sans-serif" }}
              >
                <span style={{ color: "#00ff87" }}>Code Together,</span>
                <br />
                <span style={{ color: "#fff" }}>Learn Together.</span>
              </h1>
            </div>

            <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#888" }}>
              The ultimate platform for collaborative coding interviews and pair
              programming. Connect face-to-face, code in real-time, and ace your
              technical interviews.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {["Live Video Chat", "Code Editor", "Multi-Language", "1-on-1 Sessions", "Secure Auth"].map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium"
                  style={{
                    background: "#111",
                    borderColor: "#1f1f1f",
                    color: "#888",
                  }}
                >
                  <CheckIcon className="w-3 h-3" style={{ color: "#00ff87" }} />
                  {f}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <SignInButton mode="modal">
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 hover:opacity-90 active:scale-[0.98]"
                  style={{
                    background: "#00ff87",
                    color: "#000",
                    boxShadow: "0 0 24px rgba(0,255,135,0.25)",
                  }}
                >
                  Start Coding Now
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </SignInButton>

              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border transition-all duration-150"
                style={{
                  background: "transparent",
                  borderColor: "#1f1f1f",
                  color: "#888",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#333";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1f1f1f";
                  e.currentTarget.style.color = "#888";
                }}
              >
                <VideoIcon className="w-4 h-4" />
                Watch Demo
              </button>
            </div>

            {/* Stats row */}
            <div
              className="flex gap-px rounded-xl overflow-hidden border"
              style={{ borderColor: "#1f1f1f" }}
            >
              {[
                { val: "10K+", label: "Active Users" },
                { val: "50K+", label: "Sessions" },
                { val: "99.9%", label: "Uptime" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex-1 px-5 py-4"
                  style={{ background: "#111" }}
                >
                  <div
                    className="text-2xl font-black tracking-tight"
                    style={{ color: "#00ff87", fontFamily: "'Geist', monospace" }}
                  >
                    {s.val}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#555" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — code preview card */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "#111",
              borderColor: "#1f1f1f",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px #1f1f1f",
            }}
          >
            {/* Window chrome */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b"
              style={{ borderColor: "#1f1f1f", background: "#0d0d0d" }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span
                className="text-xs"
                style={{
                  color: "#555",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                solution.py
              </span>
              <span
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "#00ff87", fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#00ff87" }}
                />
                2 live
              </span>
            </div>

            {/* Code body */}
            <pre
              className="p-6 text-sm leading-7 overflow-x-auto"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#666",
              }}
            >
              <code>
                <span style={{ color: "#555", fontStyle: "italic" }}># Two Sum — LeetCode #1{"\n"}</span>
                <span style={{ color: "#c792ea" }}>def </span>
                <span style={{ color: "#82aaff" }}>twoSum</span>
                <span style={{ color: "#fff" }}>(nums, target):{"\n"}</span>
                {"    "}seen = {"{}"}{"\n"}
                {"    "}
                <span style={{ color: "#c792ea" }}>for </span>
                i, num{" "}
                <span style={{ color: "#c792ea" }}>in </span>
                <span style={{ color: "#82aaff" }}>enumerate</span>(nums):{"\n"}
                {"        "}complement = target - num{"\n"}
                {"        "}
                <span style={{ color: "#c792ea" }}>if </span>
                complement{" "}
                <span style={{ color: "#c792ea" }}>in </span>
                seen:{"\n"}
                {"            "}
                <span style={{ color: "#c792ea" }}>return </span>
                [seen[complement], i]{"\n"}
                {"        "}seen[num] = i{"\n\n"}
                <span style={{ color: "#555", fontStyle: "italic" }}># Time: O(n) · Space: O(n){"\n"}</span>
                <span style={{ color: "#82aaff" }}>print</span>(twoSum([
                <span style={{ color: "#f78c6c" }}>2</span>,
                <span style={{ color: "#f78c6c" }}>7</span>,
                <span style={{ color: "#f78c6c" }}>11</span>,
                <span style={{ color: "#f78c6c" }}>15</span>],{" "}
                <span style={{ color: "#f78c6c" }}>9</span>))
                <span
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "14px",
                    background: "#00ff87",
                    verticalAlign: "middle",
                    marginLeft: "2px",
                    animation: "blink 1.1s step-end infinite",
                  }}
                />
              </code>
            </pre>

            {/* Bottom mini-cards */}
            <div
              className="grid grid-cols-2 gap-px border-t"
              style={{ borderColor: "#1f1f1f", background: "#1f1f1f" }}
            >
              {[
                { icon: "🎥", title: "Video Chat", desc: "Face-to-face interviews" },
                { icon: "⚡", title: "< 50ms Sync", desc: "Every keystroke, instant" },
                { icon: "🌐", title: "Multi-Language", desc: "JS, Python, Java & more" },
                { icon: "👥", title: "1-on-1 Sessions", desc: "Private, focused coding" },
              ].map((c) => (
                <div
                  key={c.title}
                  className="px-5 py-4 transition-colors duration-150"
                  style={{ background: "#111" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#141414")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#111")
                  }
                >
                  <div className="text-lg mb-1">{c.icon}</div>
                  <div className="text-sm font-semibold text-white">{c.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#555" }}>
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t" style={{ borderColor: "#1f1f1f" }} />
      </div>

      {/* ── FEATURES ── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2
            className="text-3xl font-black tracking-tight mb-3"
            style={{ fontFamily: "'Geist', sans-serif" }}
          >
            Everything you need to{" "}
            <span style={{ color: "#00ff87" }}>succeed</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#555" }}>
            Powerful features designed to make your coding interviews seamless
            and productive
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: VideoIcon,
              title: "HD Video Call",
              desc: "Crystal clear video and audio for seamless face-to-face communication during interviews.",
            },
            {
              icon: Code2Icon,
              title: "Live Code Editor",
              desc: "Monaco-powered editor with real-time collaboration, syntax highlighting, and multi-language support.",
            },
            {
              icon: UsersIcon,
              title: "1-on-1 Sessions",
              desc: "Private coding sessions built for two — create a room, share the link, and start coding together instantly.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-xl border p-7 transition-all duration-200"
              style={{ background: "#111", borderColor: "#1f1f1f" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,255,135,0.2)";
                e.currentTarget.style.background = "#121212";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1f1f1f";
                e.currentTarget.style.background = "#111";
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                style={{ background: "rgba(0,255,135,0.08)" }}
              >
                <Icon className="w-5 h-5" style={{ color: "#00ff87" }} />
              </div>
              <h3 className="font-bold text-base mb-2 text-white">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Blink keyframe */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
      `}</style>
    </div>
  );
}

export default HomePage;