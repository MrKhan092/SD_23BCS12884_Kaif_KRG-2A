import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

const S = { bg: "rgba(10,10,10,0.85)", border: "#1f1f1f", accent: "#00ff87", textSub: "#888" };

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="sticky top-0 z-50"
      style={{ background: S.bg, borderBottom: `1px solid ${S.border}`, backdropFilter: "blur(20px)", fontFamily: "'Geist','DM Sans',sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2.5" style={{ textDecoration: "none" }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black" style={{ background: S.accent, color: "#000", fontFamily: "'JetBrains Mono',monospace" }}>
            CS
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm tracking-tight text-white" style={{ fontFamily: "'Geist',sans-serif" }}>CodeSphere</span>
            <span className="text-[10px]" style={{ color: S.textSub }}>Code Together</span>
          </div>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-1">
          {[
            { to: "/problems", label: "Problems", icon: BookOpenIcon },
            { to: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
          ].map(({ to, label, icon: Icon }) => {
            const active = isActive(to);
            return (
              <Link
                key={to} to={to}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                style={{ textDecoration: "none", background: active ? "rgba(0,255,135,0.08)" : "transparent", color: active ? S.accent : S.textSub, border: active ? "1px solid rgba(0,255,135,0.15)" : "1px solid transparent" }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "#111"; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = S.textSub; e.currentTarget.style.background = "transparent"; } }}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
          <div className="ml-3"><UserButton appearance={{ elements: { avatarBox: "w-7 h-7" } }} /></div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;