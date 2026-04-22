import { TerminalIcon, CheckCircleIcon, XCircleIcon, CircleDotIcon } from "lucide-react";

function OutputPanel({ output }) {
  const isEmpty = output === null;
  const isSuccess = output?.success === true;
  const isError = output?.success === false;

  return (
    <div
      className="h-full flex flex-col font-mono text-sm"
      style={{ background: "#0d1117" }}
    >
      {/* Terminal Header */}
      <div
        className="flex items-center gap-2 px-4 py-2 shrink-0"
        style={{
          background: "#161b22",
          borderBottom: "1px solid #30363d",
          borderTop: "1px solid #30363d",
        }}
      >
        <TerminalIcon className="w-3.5 h-3.5" style={{ color: "#8b949e" }} />
        <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#8b949e" }}>
          Output
        </span>

        {/* Status badge */}
        {!isEmpty && (
          <div className="ml-auto flex items-center gap-1.5">
            {isSuccess ? (
              <span
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                style={{ background: "#1a4731", color: "#3fb950", border: "1px solid #2ea04344" }}
              >
                <CheckCircleIcon className="w-3 h-3" />
                Passed
              </span>
            ) : (
              <span
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                style={{ background: "#3d1a1a", color: "#f85149", border: "1px solid #f8514944" }}
              >
                <XCircleIcon className="w-3 h-3" />
                Error
              </span>
            )}
          </div>
        )}
      </div>

      {/* Terminal Body */}
      <div className="flex-1 overflow-auto p-4">
        {isEmpty ? (
          <div className="flex items-start gap-2" style={{ color: "#484f58" }}>
            <span style={{ color: "#388bfd" }}>$</span>
            <span className="text-xs">Click &quot;Run Code&quot; to execute your solution...</span>
            <span
              className="inline-block w-2 h-4 ml-0.5"
              style={{
                background: "#388bfd",
                animation: "blink 1.2s step-end infinite",
              }}
            />
            <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
          </div>
        ) : (
          <div className="space-y-3">
            {/* stdout */}
            {output.output && (
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span style={{ color: "#388bfd" }}>$</span>
                  <span className="text-xs" style={{ color: "#484f58" }}>stdout</span>
                </div>
                <pre
                  className="text-xs leading-relaxed whitespace-pre-wrap pl-4"
                  style={{
                    color: isSuccess ? "#3fb950" : "#e6edf3",
                    borderLeft: `2px solid ${isSuccess ? "#2ea043" : "#30363d"}`,
                  }}
                >
                  {output.output}
                </pre>
              </div>
            )}

            {/* stderr */}
            {output.error && (
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span style={{ color: "#f85149" }}>✕</span>
                  <span className="text-xs" style={{ color: "#484f58" }}>stderr</span>
                </div>
                <pre
                  className="text-xs leading-relaxed whitespace-pre-wrap pl-4"
                  style={{
                    color: "#f85149",
                    borderLeft: "2px solid #f8514944",
                  }}
                >
                  {output.error}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;