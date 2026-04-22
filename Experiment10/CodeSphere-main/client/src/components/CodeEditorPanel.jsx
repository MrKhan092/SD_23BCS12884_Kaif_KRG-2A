import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon, ChevronDownIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problem";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full flex flex-col" style={{ background: "#0d1117" }}>
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 shrink-0"
        style={{
          background: "#161b22",
          borderBottom: "1px solid #30363d",
        }}
      >
        {/* Left: Language selector */}
        <div className="flex items-center gap-2">
          {/* Fake window dots */}
          <div className="flex items-center gap-1.5 mr-3">
            <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>

          <div className="relative flex items-center">
            <img
              src={LANGUAGE_CONFIG[selectedLanguage].icon}
              alt={LANGUAGE_CONFIG[selectedLanguage].name}
              className="w-4 h-4 absolute left-2.5 z-10 pointer-events-none"
            />
            <select
              className="appearance-none pl-8 pr-7 py-1.5 text-xs font-mono rounded-md cursor-pointer focus:outline-none focus:ring-1"
              style={{
                background: "#21262d",
                border: "1px solid #30363d",
                color: "#e6edf3",
                focusRingColor: "#388bfd",
              }}
              value={selectedLanguage}
              onChange={onLanguageChange}
            >
              {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                <option key={key} value={key} style={{ background: "#21262d" }}>
                  {lang.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              className="w-3 h-3 absolute right-2 pointer-events-none"
              style={{ color: "#8b949e" }}
            />
          </div>
        </div>

        {/* Right: Run button */}
        <button
          onClick={onRunCode}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: isRunning ? "#238636aa" : "#238636",
            color: "#ffffff",
            border: "1px solid #2ea043",
            boxShadow: isRunning ? "none" : "0 0 8px #2ea04344",
          }}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="w-3.5 h-3.5" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
            fontLigatures: true,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            padding: { top: 16, bottom: 16 },
            lineHeight: 1.7,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            renderLineHighlight: "line",
            bracketPairColorization: { enabled: true },
            guides: { bracketPairs: true },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;