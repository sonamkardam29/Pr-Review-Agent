import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [prUrl, setPrUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [promptSaved, setPromptSaved] = useState(false);

  // Prompt load karo
  useEffect(() => {
    axios.get("http://localhost:8000/prompt")
      .then(res => setPrompt(res.data.prompt))
      .catch(() => {});
  }, []);

  const runReview = async () => {
    if (!prUrl) return alert("PR URL daalo!");
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("http://localhost:8000/review", {
        pr_url: prUrl,
        prompt: prompt
      });
      setResult(res.data);
    } catch (e) {
      alert("Error! Backend chalu hai?");
    }
    setLoading(false);
  };

  const savePrompt = async () => {
    await axios.post("http://localhost:8000/prompt", { prompt });
    setPromptSaved(true);
    setTimeout(() => setPromptSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">🤖 PR Review Agent</h1>
          <p className="text-gray-400 mt-1">Agentic AI powered code reviewer</p>
        </div>

        {/* PR URL Input */}
        <div className="bg-gray-900 rounded-xl p-5 mb-4 border border-gray-800">
          <label className="text-sm text-gray-400 mb-2 block">GitHub PR URL</label>
          <input
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white outline-none border border-gray-700 focus:border-blue-500"
            placeholder="https://github.com/owner/repo/pull/123"
            value={prUrl}
            onChange={e => setPrUrl(e.target.value)}
          />
        </div>

        {/* Prompt Editor */}
        <div className="bg-gray-900 rounded-xl p-5 mb-4 border border-gray-800">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-400">Agent Prompt (Editable)</label>
            <button
              onClick={savePrompt}
              className="text-xs bg-green-700 hover:bg-green-600 px-3 py-1 rounded-lg"
            >
              {promptSaved ? "✅ Saved!" : "Save Prompt"}
            </button>
          </div>
          <textarea
            className="w-full bg-gray-800 rounded-lg px-4 py-3 text-white outline-none border border-gray-700 focus:border-blue-500 h-32 resize-none font-mono text-sm"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
        </div>

        {/* Run Button */}
        <button
          onClick={runReview}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 py-3 rounded-xl font-semibold text-lg mb-6 transition-all"
        >
          {loading ? "⏳ Agent analyzing..." : "🚀 Run Review"}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-4">

            {/* Severity Badge */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400">Severity:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                result.severity === "High" ? "bg-red-900 text-red-300" :
                result.severity === "Medium" ? "bg-yellow-900 text-yellow-300" :
                "bg-green-900 text-green-300"
              }`}>{result.severity}</span>
            </div>

            {/* Bugs */}
            {result.bugs?.length > 0 && (
              <div className="bg-red-950 border border-red-800 rounded-xl p-4">
                <h3 className="text-red-400 font-semibold mb-2">🐛 Bugs Found</h3>
                {result.bugs.map((b, i) => (
                  <p key={i} className="text-red-200 text-sm py-1">• {b}</p>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {result.suggestions?.length > 0 && (
              <div className="bg-blue-950 border border-blue-800 rounded-xl p-4">
                <h3 className="text-blue-400 font-semibold mb-2">💡 Suggestions</h3>
                {result.suggestions.map((s, i) => (
                  <p key={i} className="text-blue-200 text-sm py-1">• {s}</p>
                ))}
              </div>
            )}

            {/* Security */}
            {result.security?.length > 0 && (
              <div className="bg-yellow-950 border border-yellow-800 rounded-xl p-4">
                <h3 className="text-yellow-400 font-semibold mb-2">🔐 Security Issues</h3>
                {result.security.map((s, i) => (
                  <p key={i} className="text-yellow-200 text-sm py-1">• {s}</p>
                ))}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}