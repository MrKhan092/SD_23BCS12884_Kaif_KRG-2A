import { Link } from "react-router";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const S = { bg:"#0a0a0a", surface:"#111", border:"#1f1f1f", accent:"#00ff87", muted:"#555", textSub:"#888" };

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for getting started with practice interviews.",
    accent: S.textSub,
    features: [
      "5 sessions per month",
      "Access to 20 problems",
      "JavaScript & Python only",
      "Standard video quality",
      "Session history (7 days)",
    ],
    cta: "Get started free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    desc: "For developers actively preparing for technical interviews.",
    accent: S.accent,
    features: [
      "Unlimited sessions",
      "Full problem library (200+)",
      "60+ languages supported",
      "HD video + screen share",
      "Session history (unlimited)",
      "AI hints & suggestions",
      "Priority infrastructure",
    ],
    cta: "Start Pro",
    highlight: true,
  },
  {
    name: "Team",
    price: "$39",
    period: "per month",
    desc: "For engineering teams running structured interview loops.",
    accent: "#818cf8",
    features: [
      "Everything in Pro",
      "Up to 10 interviewers",
      "Interview scorecard templates",
      "Candidate invite links",
      "Team analytics dashboard",
      "Zapier / webhook integrations",
      "Dedicated support",
    ],
    cta: "Start Team trial",
    highlight: false,
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
            <Link key={to} to={to} className="text-sm transition-colors duration-150" style={{ color:to==="/pricing"?S.accent:S.textSub, textDecoration:"none" }}
              onMouseEnter={(e)=>(e.currentTarget.style.color="#fff")}
              onMouseLeave={(e)=>(e.currentTarget.style.color=to==="/pricing"?S.accent:S.textSub)}
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

function PricingPage() {
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
          <div className="max-w-3xl mx-auto px-6 py-20 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color:"#444", fontFamily:"'JetBrains Mono',monospace" }}>Pricing</p>
            <h1 className="text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily:"'Geist',sans-serif", letterSpacing:"-0.04em" }}>
              Simple, honest pricing
            </h1>
            <p className="text-lg" style={{ color:S.muted }}>No hidden fees. No surprise charges. Cancel any time.</p>
          </div>
        </div>

        {/* PLANS */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl border p-7 flex flex-col transition-all duration-150 relative"
                style={{
                  background: plan.highlight ? "#0f1a14" : S.surface,
                  borderColor: plan.highlight ? "rgba(0,255,135,0.3)" : S.border,
                  boxShadow: plan.highlight ? "0 0 40px rgba(0,255,135,0.06)" : "none",
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold" style={{ background:S.accent, color:"#000", fontFamily:"'JetBrains Mono',monospace" }}>
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color:plan.accent, fontFamily:"'JetBrains Mono',monospace" }}>{plan.name}</span>
                  <div className="flex items-end gap-1.5 mt-2 mb-1">
                    <span className="text-4xl font-black tracking-tight text-white" style={{ fontFamily:"'Geist',monospace" }}>{plan.price}</span>
                    <span className="text-sm pb-1.5" style={{ color:S.muted }}>{plan.period}</span>
                  </div>
                  <p className="text-sm" style={{ color:S.muted }}>{plan.desc}</p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color:"#ccc" }}>
                      <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background:`${plan.accent}18` }}>
                        <CheckIcon className="w-2.5 h-2.5" style={{ color:plan.accent }}/>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <SignInButton mode="modal">
                  <button
                    className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-150"
                    style={{
                      background: plan.highlight ? S.accent : "transparent",
                      color: plan.highlight ? "#000" : plan.accent,
                      border: plan.highlight ? "none" : `1px solid ${plan.accent}44`,
                    }}
                  >
                    {plan.cta}
                  </button>
                </SignInButton>
              </div>
            ))}
          </div>

          {/* FAQ strip */}
          <div className="mt-14 rounded-2xl border p-8" style={{ background:S.surface, borderColor:S.border }}>
            <h3 className="text-base font-bold text-white mb-6" style={{ fontFamily:"'Geist',sans-serif" }}>Common questions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                ["Can I cancel anytime?", "Yes — no contracts, no commitments. Cancel in one click from your account settings."],
                ["Is there a free trial for Pro?", "Pro comes with a 14-day free trial. No credit card required to start."],
                ["What counts as a session?", "Any room you create or join counts. You can have up to 5 concurrent sessions on Pro."],
                ["Do you offer student discounts?", "Yes — 50% off Pro for verified students. Email us with your .edu address."],
              ].map(([q, a]) => (
                <div key={q}>
                  <p className="text-sm font-semibold text-white mb-1">{q}</p>
                  <p className="text-xs leading-relaxed" style={{ color:S.muted }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PricingPage;