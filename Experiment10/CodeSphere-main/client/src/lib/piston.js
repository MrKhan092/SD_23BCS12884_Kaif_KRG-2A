// Judge0 CE - free public API, no auth needed
const JUDGE0_API = "https://ce.judge0.com";

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,  
};

export async function executeCode(language, code) {
  try {
    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return { success: false, error: `Unsupported language: ${language}` };
    }

    // Fix Java: Judge0 requires "Main" as the public class name
    let finalCode = code;
    if (language === "java") {
      finalCode = code.replace(/class Solution/g, "class Main");
    }

    const submitRes = await fetch(`${JUDGE0_API}/submissions?base64_encoded=false&wait=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_code: finalCode,
        language_id: languageId,
        stdin: "",
      }),
    });

    if (!submitRes.ok) {
      return { success: false, error: `HTTP error! status: ${submitRes.status}` };
    }

    const data = await submitRes.json();

    // Judge0 status 6 = compilation error
    if (data.status?.id === 6) {
      return { success: false, error: data.compile_output || "Compilation error" };
    }

    const stdout = data.stdout || "";
    const stderr = data.stderr || "";
    const compileError = data.compile_output || "";

    if (compileError) {
      return { success: false, error: compileError };
    }

    if (stderr) {
      return { success: false, output: stdout, error: stderr };
    }

    return { success: true, output: stdout.trimEnd() || "No output" };

  } catch (error) {
    return { success: false, error: `Failed to execute code: ${error.message}` };
  }
}