import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problem";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";
import { executeCode } from "../lib/piston";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

/* ─── Resizer override – render a thin accent stripe ─── */
function HResizer() {
  return (
    <PanelResizeHandle>
      <div
        className="h-px transition-colors duration-150 cursor-row-resize hover:h-0.5"
        style={{ background: "#1f1f1f" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#00ff87")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#1f1f1f")}
      />
    </PanelResizeHandle>
  );
}

function VResizer() {
  return (
    <PanelResizeHandle>
      <div
        className="w-px h-full transition-colors duration-150 cursor-col-resize"
        style={{ background: "#1f1f1f" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#00ff87")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#1f1f1f")}
      />
    </PanelResizeHandle>
  );
}

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) => navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.2, y: 0.6 } });
    confetti({ particleCount: 80, spread: 250, origin: { x: 0.8, y: 0.6 } });
  };

  const normalizeOutput = (output) =>
    output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");

  const checkIfTestsPassed = (actualOutput, expectedOutput) =>
    normalizeOutput(actualOutput) == normalizeOutput(expectedOutput);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
    if (result.success) {
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
      if (checkIfTestsPassed(result.output, expectedOutput)) {
        triggerConfetti();
        toast.success("All tests passed! Great job!");
      } else {
        toast.error("Tests failed. Check your output!");
      }
    } else {
      toast.error("Code execution failed!");
    }
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{ background: "#0a0a0a", fontFamily: "'Geist', 'DM Sans', sans-serif" }}
    >
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* LEFT – Problem description */}
          <Panel defaultSize={40} minSize={28}>
            <div
              className="h-full overflow-hidden"
              style={{ borderRight: "1px solid #1f1f1f" }}
            >
              <ProblemDescription
                problem={currentProblem}
                currentProblemId={currentProblemId}
                onProblemChange={handleProblemChange}
                allProblems={Object.values(PROBLEMS)}
              />
            </div>
          </Panel>

          <VResizer />

          {/* RIGHT – Editor + Output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <HResizer />

              <Panel defaultSize={30} minSize={20}>
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;