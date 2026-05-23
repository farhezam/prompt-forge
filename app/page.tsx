'use client';

import { useState } from 'react';
import { Sparkles, Play, Save, Trash2, Copy, Download } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [prompts, setPrompts] = useState([
    { id: 1, name: 'Code Review Assistant', lastEdited: '2 hours ago' },
    { id: 2, name: 'API Documentation Generator', lastEdited: '1 day ago' },
    { id: 3, name: 'Bug Report Analyzer', lastEdited: '3 days ago' },
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0f0f0f]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Prompt Forge</h1>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/editor" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
              Editor
            </Link>
            <Link href="/library" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
              Library
            </Link>
            <Link href="/analytics" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
              Analytics
            </Link>
            <button className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
              Settings
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Visual Prompt Engineering IDE</span>
          </div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Build, Test, and Debug AI Prompts
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Professional prompt engineering environment with real-time testing, version control, and transparent token metrics.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/editor"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start Building
            </Link>
            <Link
              href="/library"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-2xl font-semibold mb-8 text-center">Why Prompt Forge?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-indigo-400" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Live Testing</h4>
            <p className="text-gray-400 text-sm">
              Test prompts instantly with MiMo API. See responses, token usage, and latency in real-time.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <Save className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Version Control</h4>
            <p className="text-gray-400 text-sm">
              Save iterations, compare results, and roll back to previous versions. Never lose a working prompt.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700">
            <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-pink-400" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Smart Suggestions</h4>
            <p className="text-gray-400 text-sm">
              Get AI-powered suggestions to improve clarity, reduce tokens, and increase response quality.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Prompts */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">Recent Prompts</h3>
          <Link href="/library" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            View All →
          </Link>
        </div>
        <div className="grid gap-4">
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium mb-1 group-hover:text-indigo-400 transition-colors">
                    {prompt.name}
                  </h4>
                  <p className="text-sm text-gray-500">Last edited {prompt.lastEdited}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <Copy className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
          <p>Prompt Forge — Professional prompt engineering environment</p>
          <p className="mt-2">Powered by user-provided MiMo API key</p>
        </div>
      </footer>
    </div>
  );
}
