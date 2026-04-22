import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problem";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Loader2Icon, LogOutIcon, PhoneOffIcon, UsersIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

const S = {
  bg: "#0a0a0a", surface: "#111", surfaceAlt: "#0d0d0d",
  border: "#1f1f1f", accent: "#00ff87", muted: "#555", textSub: "#888",
};

function DifficultyBadge({ difficulty }) {
  const map = {
    easy:   { color: "#00ff87", bg: "rgba(0,255,135,0.08)" },
    medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
    hard:   { color: "#ef4444", bg: "rgba(239,68,68,0.08)" },
  };
  const d = map[difficulty?.toLowerCase()] || map.easy;
  const label = difficulty ? difficulty[0].toUpperCase() + difficulty.slice(1) : "—";
  return (
    <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ color:d.color, background:d.bg, fontFamily:"'JetBrains Mono',monospace" }}>
      {label}
    </span>
  );
}

/* ── thin accent resizer handles ── */
function VResizer() {
  return (
    <PanelResizeHandle>
      <div className="w-px h-full cursor-col-resize transition-colors duration-150" style={{ background:S.border }}
        onMouseEnter={(e) => (e.currentTarget.style.background = S.accent)}
        onMouseLeave={(e) => (e.currentTarget.style.background = S.border)}
      />
    </PanelResizeHandle>
  );
}
function HResizer() {
  return (
    <PanelResizeHandle>
      <div className="h-px cursor-row-resize transition-colors duration-150" style={{ background:S.border }}
        onMouseEnter={(e) => (e.currentTarget.style.background = S.accent)}
        onMouseLeave={(e) => (e.currentTarget.style.background = S.border)}
      />
    </PanelResizeHandle>
  );
}

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);
  const joinSessionMutation = useJoinSession();
  const endSessionMutation  = useEndSession();

  const session      = sessionData?.session;
  const isHost       = session?.host?.clerkId === user?.id;
  const isParticipant= session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session, loadingSession, isHost, isParticipant
  );

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

  useEffect(() => {
    if (!session || !user || loadingSession || isHost || isParticipant) return;
    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(problemData?.starterCode?.[newLang] || "");
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("End this session? All participants will be disconnected.")) {
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: S.bg, fontFamily:"'Geist','DM Sans',sans-serif" }}>
      <Navbar />

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">

          {/* ══ LEFT — Problem + Code ══ */}
          <Panel defaultSize={50} minSize={28}>
            <PanelGroup direction="vertical">

              {/* Problem description panel */}
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto" style={{ background: S.bg, borderRight:`1px solid ${S.border}` }}>

                  {/* Sticky header */}
                  <div className="sticky top-0 z-10 px-6 py-4 border-b" style={{ background: S.surfaceAlt, borderColor: S.border }}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h1 className="text-lg font-black tracking-tight text-white truncate" style={{ fontFamily:"'Geist',sans-serif", letterSpacing:"-0.03em" }}>
                          {session?.problem || "Loading…"}
                        </h1>
                        <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: S.muted }}>
                          {problemData?.category && <span>{problemData.category}</span>}
                          <span className="flex items-center gap-1">
                            <UsersIcon className="w-3 h-3" />
                            {session?.host?.name || "…"} · {session?.participant ? 2 : 1}/2
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <DifficultyBadge difficulty={session?.difficulty} />

                        {session?.status === "completed" && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ color:S.muted, background:"#1a1a1a" }}>
                            Completed
                          </span>
                        )}

                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                            style={{ background:"rgba(239,68,68,0.1)", color:"#ef4444", border:"1px solid rgba(239,68,68,0.2)" }}
                          >
                            {endSessionMutation.isPending
                              ? <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
                              : <LogOutIcon className="w-3.5 h-3.5" />
                            }
                            End Session
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Problem body */}
                  <div className="px-6 py-5 space-y-4">

                    {/* Description */}
                    {problemData?.description && (
                      <div className="rounded-xl border p-5" style={{ background:S.surfaceAlt, borderColor:S.border }}>
                        <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color:S.muted, fontFamily:"'JetBrains Mono',monospace" }}>Description</h2>
                        <div className="space-y-2 text-sm leading-relaxed" style={{ color:"#aaa" }}>
                          <p>{problemData.description.text}</p>
                          {problemData.description.notes?.map((note, i) => <p key={i}>{note}</p>)}
                        </div>
                      </div>
                    )}

                    {/* Examples */}
                    {problemData?.examples?.length > 0 && (
                      <div className="rounded-xl border p-5" style={{ background:S.surfaceAlt, borderColor:S.border }}>
                        <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color:S.muted, fontFamily:"'JetBrains Mono',monospace" }}>Examples</h2>
                        <div className="space-y-3">
                          {problemData.examples.map((ex, i) => (
                            <div key={i} className="rounded-lg border p-4" style={{ background:"#0a0a0a", borderColor:S.border }}>
                              <p className="text-xs font-semibold mb-2" style={{ color:"#444", fontFamily:"'JetBrains Mono',monospace" }}>
                                Example {i + 1}
                              </p>
                              <div className="space-y-1 text-xs" style={{ fontFamily:"'JetBrains Mono',monospace" }}>
                                <p><span style={{ color:S.accent }}>Input: </span><span style={{ color:"#ccc" }}>{ex.input}</span></p>
                                <p><span style={{ color:"#818cf8" }}>Output: </span><span style={{ color:"#ccc" }}>{ex.output}</span></p>
                                {ex.explanation && (
                                  <p className="pt-2 border-t mt-2 text-xs" style={{ borderColor:S.border, color:S.muted, fontFamily:"'Geist',sans-serif" }}>
                                    <span className="font-semibold">Explanation:</span> {ex.explanation}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Constraints */}
                    {problemData?.constraints?.length > 0 && (
                      <div className="rounded-xl border p-5" style={{ background:S.surfaceAlt, borderColor:S.border }}>
                        <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color:S.muted, fontFamily:"'JetBrains Mono',monospace" }}>Constraints</h2>
                        <ul className="space-y-1.5">
                          {problemData.constraints.map((c, i) => (
                            <li key={i} className="flex gap-2 text-xs" style={{ color:"#aaa" }}>
                              <span style={{ color:S.accent }}>•</span>
                              <code style={{ fontFamily:"'JetBrains Mono',monospace" }}>{c}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <HResizer />

              {/* Code editor + output */}
              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(v) => setCode(v)}
                      onRunCode={handleRunCode}
                    />
                  </Panel>
                  <HResizer />
                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <VResizer />

          {/* ══ RIGHT — Video + Chat ══ */}
          <Panel defaultSize={50} minSize={28}>
            <div className="h-full" style={{ background:"#0d0d0d" }}>
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loader2Icon className="w-10 h-10 mx-auto animate-spin mb-3" style={{ color:S.accent }} />
                    <p className="text-sm" style={{ color:S.textSub }}>Connecting to video call…</p>
                  </div>
                </div>

              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center rounded-2xl border p-10 max-w-xs w-full" style={{ background:S.surface, borderColor:S.border }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background:"rgba(239,68,68,0.08)" }}>
                      <PhoneOffIcon className="w-8 h-8" style={{ color:"#ef4444" }} />
                    </div>
                    <h2 className="text-base font-bold text-white mb-2">Connection Failed</h2>
                    <p className="text-sm" style={{ color:S.muted }}>
                      Unable to connect to the video call. Check your connection and try again.
                    </p>
                  </div>
                </div>

              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;