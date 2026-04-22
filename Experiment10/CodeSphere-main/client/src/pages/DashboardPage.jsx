import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions";

import Navbar from "../components/Navbar";
import CreateSessionModal from "../components/CreateSessionModal";
import {
  PlusIcon,
  ZapIcon,
  ClockIcon,
  UsersIcon,
  ArrowRightIcon,
  ActivityIcon,
} from "lucide-react";

/* ─── tiny helper ─────────────────────────────── */
const S = {
  bg: "#0a0a0a",
  surface: "#111111",
  border: "#1f1f1f",
  accent: "#00ff87",
  muted: "#555555",
  text: "#ffffff",
  textSub: "#888888",
};

function Card({ children, className = "", style = {}, ...props }) {
  return (
    <div
      className={`rounded-xl border ${className}`}
      style={{ background: S.surface, borderColor: S.border, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

function DifficultyBadge({ difficulty }) {
  const map = {
    easy: { color: "#00ff87", bg: "rgba(0,255,135,0.08)" },
    medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
    hard: { color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
  };
  const d = map[difficulty?.toLowerCase()] || map.easy;
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-semibold capitalize"
      style={{ color: d.color, background: d.bg, fontFamily: "'JetBrains Mono', monospace" }}
    >
      {difficulty}
    </span>
  );
}

function SessionCard({ session, isUserInSession, isActive }) {
  const navigate = useNavigate();
  const inSession = isUserInSession(session);
  return (
    <div
      className="group flex items-center justify-between px-5 py-4 rounded-lg border transition-all duration-150 cursor-pointer"
      style={{
        background: "#0d0d0d",
        borderColor: S.border,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,255,135,0.15)";
        e.currentTarget.style.background = "#111";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = S.border;
        e.currentTarget.style.background = "#0d0d0d";
      }}
      onClick={() => navigate(`/session/${session._id}`)}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(0,255,135,0.06)" }}
        >
          <ZapIcon className="w-4 h-4" style={{ color: S.accent }} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-white">{session.problem || "Untitled"}</span>
            <DifficultyBadge difficulty={session.difficulty} />
            {inSession && (
              <span
                className="px-2 py-0.5 rounded text-xs font-medium"
                style={{ background: "rgba(0,255,135,0.1)", color: S.accent }}
              >
                You're in
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs" style={{ color: S.muted }}>
            <span className="flex items-center gap-1">
              <UsersIcon className="w-3 h-3" />
              {session.host?.name || "Unknown"}
            </span>
            {isActive && (
              <span className="flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: S.accent }}
                />
                Live
              </span>
            )}
          </div>
        </div>
      </div>
      <ArrowRightIcon
        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: S.accent }}
      />
    </div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();
  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;
    createSessionMutation.mutate(
      { problem: roomConfig.problem, difficulty: roomConfig.difficulty.toLowerCase() },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user?.id) return false;
    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
  };

  const Skeleton = () => (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-16 rounded-lg animate-pulse"
          style={{ background: "#141414" }}
        />
      ))}
    </div>
  );

  return (
    <>
      <div
        className="min-h-screen relative"
        style={{ background: S.bg, fontFamily: "'Geist', 'DM Sans', sans-serif" }}
      >
        {/* ── GRID TEXTURE ── */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
        {/* ── TOP GLOW ── */}
        <div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          aria-hidden
        >
          <div style={{
            position: "absolute", top: "-180px", left: "50%",
            transform: "translateX(-50%)",
            width: "700px", height: "400px",
            background: "radial-gradient(ellipse, rgba(0,255,135,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }} />
        </div>

        <div className="relative z-10">
        <Navbar />

        {/* ── HERO HEADER ── */}
        <div className="border-b" style={{ borderColor: S.border }}>
          <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#444", fontFamily: "'JetBrains Mono',monospace" }}>
                Overview
              </p>
              <h1
                className="text-3xl font-black tracking-tight text-white mb-1"
                style={{ fontFamily: "'Geist', sans-serif", letterSpacing: "-0.04em" }}
              >
                Welcome back,{" "}
                <span style={{ color: S.accent }}>{user?.firstName || "Coder"}</span> 👋
              </h1>
              <p className="text-sm" style={{ color: S.muted }}>
                Ready to crush your next interview?
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-150 active:scale-[0.97] flex-shrink-0"
              style={{
                background: S.accent,
                color: "#000",
                boxShadow: "0 0 28px rgba(0,255,135,0.25)",
                fontFamily: "'Geist', sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 40px rgba(0,255,135,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 28px rgba(0,255,135,0.25)")}
            >
              <PlusIcon className="w-4 h-4" />
              New Session
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              {
                icon: ActivityIcon,
                label: "Active Sessions",
                val: activeSessions.length,
                accent: S.accent,
              },
              {
                icon: ClockIcon,
                label: "Recent Sessions",
                val: recentSessions.length,
                accent: "#818cf8",
              },
              {
                icon: ZapIcon,
                label: "Problems Solved",
                val: recentSessions.filter((s) => s.status === "completed").length,
                accent: "#f59e0b",
              },
              {
                icon: UsersIcon,
                label: "Collaborators",
                val: new Set(
                  recentSessions
                    .map((s) => s.participant?.clerkId)
                    .filter(Boolean)
                ).size,
                accent: "#f472b6",
              },
            ].map(({ icon: Icon, label, val, accent }) => (
              <Card key={label} className="px-5 py-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${accent}14` }}
                >
                  <Icon className="w-4 h-4" style={{ color: accent }} />
                </div>
                <div
                  className="text-2xl font-black tracking-tight"
                  style={{ color: accent, fontFamily: "'Geist', monospace" }}
                >
                  {val}
                </div>
                <div className="text-xs mt-0.5" style={{ color: S.muted }}>
                  {label}
                </div>
              </Card>
            ))}
          </div>

          {/* ── MAIN GRID ── */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Active Sessions */}
            <Card>
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: S.border }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: S.accent }}
                  />
                  <span className="text-sm font-semibold text-white">Active Sessions</span>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(0,255,135,0.08)", color: S.accent }}
                >
                  {activeSessions.length} live
                </span>
              </div>
              <div className="p-4 space-y-2">
                {loadingActiveSessions ? (
                  <Skeleton />
                ) : activeSessions.length === 0 ? (
                  <div className="py-12 text-center">
                    <ZapIcon className="w-8 h-8 mx-auto mb-3" style={{ color: "#222" }} />
                    <p className="text-sm" style={{ color: S.muted }}>
                      No active sessions right now
                    </p>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="mt-3 text-xs font-medium transition-colors"
                      style={{ color: S.accent }}
                    >
                      Start one →
                    </button>
                  </div>
                ) : (
                  activeSessions.map((s) => (
                    <SessionCard
                      key={s._id}
                      session={s}
                      isUserInSession={isUserInSession}
                      isActive
                    />
                  ))
                )}
              </div>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: S.border }}
              >
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" style={{ color: S.muted }} />
                  <span className="text-sm font-semibold text-white">Recent Sessions</span>
                </div>
                <span className="text-xs" style={{ color: S.muted }}>
                  {recentSessions.length} total
                </span>
              </div>
              <div className="p-4 space-y-2">
                {loadingRecentSessions ? (
                  <Skeleton />
                ) : recentSessions.length === 0 ? (
                  <div className="py-12 text-center">
                    <ClockIcon className="w-8 h-8 mx-auto mb-3" style={{ color: "#222" }} />
                    <p className="text-sm" style={{ color: S.muted }}>
                      No sessions yet
                    </p>
                  </div>
                ) : (
                  recentSessions.slice(0, 8).map((s) => (
                    <SessionCard
                      key={s._id}
                      session={s}
                      isUserInSession={isUserInSession}
                      isActive={false}
                    />
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
        </div>{/* /relative z-10 */}
      </div>{/* /min-h-screen */}

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;