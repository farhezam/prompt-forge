'use client';

import { useState, useEffect } from 'react';
import { Play, Save, Trash2, Copy, Settings, History, ChevronDown, ChevronUp, Sparkles, Terminal, Activity } from 'lucide-react';

export default function Editor() {
  const [prompt, setPrompt] = useState(`You are an expert code reviewer. Analyze the following code for:
1. Potential bugs and edge cases
2. Performance optimizations
3. Code style and best practices
4. Security vulnerabilities

Format your response as:
- Bugs: [list]
- Optimizations: [list]
- Style: [list]
- Security: [list]`);
  
  const [testInput, setTestInput] = useState(`function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}`);

  const [response, setResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [tokenStats, setTokenStats] = useState({ input: 0, output: 0, total: 0 });
  const [latency, setLatency] = useState(0);

  const countTokens = (text: string) => Math.ceil(text.length / 4);

  useEffect(() => {
    setTokenStats({
      input: countTokens(prompt) + countTokens(testInput),
      output: countTokens(response),
      total: countTokens(prompt) + countTokens(testInput) + countTokens(response),
    });
  }, [prompt, testInput, response]);

  const handleTest = async () => {
    setIsTesting(true);
    const startTime = Date.now();

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setResponse(`## Code Review Analysis

### Bugs
- No handling for empty array
- No validation for negative prices

### Optimizations
- Consider using ` + '`' + `Array.prototype.reduce()` + '`' + ` with initial value
- Add error boundary for invalid input

### Style
- Consider extracting price extraction to separate function
- Add JSDoc comments

### Security
- No input validation for price field
- Consider rate limiting if this is API endpoint

**Total tokens used:** ${tokenStats.input + 150}`);
    setLatency(Date.now() - startTime);
    setIsTesting(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0f0f0f]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
            <h1 className="text-lg font-medium">New Prompt</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors flex items-center gap-2">
              <History className="w-4 h-4" />
              History
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Prompt Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Prompt Template</h2>
              <span className="text-xs text-gray-500">{countTokens(prompt)} tokens</span>
            </div>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-96 bg-[#0f0f0f] border border-gray-700 rounded-xl p-4 font-mono text-sm text-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                placeholder="Enter your prompt template here..."
              />
              <div className="absolute bottom-4 right-4">
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <Copy className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Test & Response */}
          <div className="space-y-4">
            {/* Test Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium">Test Input</h2>
                <span className="text-xs text-gray-500">{countTokens(testInput)} tokens</span>
              </div>
              <div className="relative">
                <textarea
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  className="w-full h-48 bg-[#0f0f0f] border border-gray-700 rounded-xl p-4 font-mono text-sm text-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                  placeholder="Enter test input..."
                />
              </div>
            </div>

            {/* Test Button */}
            <div className="flex justify-end">
              <button
                onClick={handleTest}
                disabled={isTesting}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTesting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Test Prompt
                  </>
                )}
              </button>
            </div>

            {/* Response */}
            {response && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Response</h2>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {latency}ms
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {tokenStats.total} tokens
                    </span>
                  </div>
                </div>
                <div className="bg-[#0f0f0f] border border-gray-700 rounded-xl p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap min-h-[200px]">
                  {response}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
