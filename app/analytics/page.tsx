'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Hash,
  Zap,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';

/* ── Mock data ─────────────────────────────────────────────── */

const statsCards = [
  { label: 'Total Prompts', value: '1,284', change: '+12%', icon: Hash, color: 'indigo' },
  { label: 'Total Tokens Used', value: '2.4M', change: '+8%', icon: Zap, color: 'purple' },
  { label: 'Avg Tokens / Run', value: '1,870', change: '-3%', icon: Activity, color: 'pink' },
  { label: 'Success Rate', value: '97.2%', change: '+0.4%', icon: CheckCircle2, color: 'green' },
];

interface Run {
  id: number;
  name: string;
  tokensIn: number;
  tokensOut: number;
  latency: number;
  status: 'success' | 'error' | 'running';
  timestamp: string;
}

const recentRuns: Run[] = [
  { id: 1, name: 'Code Review Assistant', tokensIn: 1240, tokensOut: 890, latency: 1420, status: 'success', timestamp: '2 min ago' },
  { id: 2, name: 'API Doc Generator', tokensIn: 980, tokensOut: 1120, latency: 1890, status: 'success', timestamp: '15 min ago' },
  { id: 3, name: 'SQL Query Builder', tokensIn: 340, tokensOut: 520, latency: 670, status: 'success', timestamp: '1 hour ago' },
  { id: 4, name: 'Bug Analyzer v2', tokensIn: 2100, tokensOut: 1580, latency: 3200, status: 'success', timestamp: '2 hours ago' },
  { id: 5, name: 'Commit Message Writer', tokensIn: 450, tokensOut: 180, latency: 410, status: 'success', timestamp: '3 hours ago' },
  { id: 6, name: 'Regex Builder', tokensIn: 290, tokensOut: 380, latency: 550, status: 'error', timestamp: '5 hours ago' },
  { id: 7, name: 'Test Generator', tokensIn: 1680, tokensOut: 2200, latency: 2800, status: 'success', timestamp: '6 hours ago' },
  { id: 8, name: 'PR Description Bot', tokensIn: 920, tokensOut: 740, latency: 1100, status: 'running', timestamp: '7 hours ago' },
  { id: 9, name: 'Code Review Lite', tokensIn: 600, tokensOut: 430, latency: 780, status: 'success', timestamp: '10 hours ago' },
  { id: 10, name: 'Documentation Writer', tokensIn: 1100, tokensOut: 1600, latency: 2100, status: 'success', timestamp: '1 day ago' },
];

interface ChartBar {
  label: string;
  value: number;
}

const tokenChartData: ChartBar[] = [
  { label: 'Mon', value: 42000 },
  { label: 'Tue', value: 38000 },
  { label: 'Wed', value: 56000 },
  { label: 'Thu', value: 61000 },
  { label: 'Fri', value: 48000 },
  { label: 'Sat', value: 29000 },
  { label: 'Sun', value: 35000 },
];

/* ── Helpers ───────────────────────────────────────────────── */

const statIconBg: Record<string, string> = {
  indigo: 'bg-indigo-500/10 text-indigo-400',
  purple: 'bg-purple-500/10 text-purple-400',
  pink: 'bg-pink-500/10 text-pink-400',
  green: 'bg-green-500/10 text-green-400',
};

const statusConfig: Record<
  Run['status'],
  { label: string; icon: typeof CheckCircle2; color: string }
> = {
  success: { label: 'Success', icon: CheckCircle2, color: 'text-green-400' },
  error: { label: 'Error', icon: XCircle, color: 'text-red-400' },
  running: { label: 'Running', icon: Clock, color: 'text-yellow-400' },
};

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

/* ── Component ─────────────────────────────────────────────── */

export default function AnalyticsPage() {
  const maxChartValue = Math.max(...tokenChartData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0f0f0f]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold">Prompt Forge</h1>
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/editor" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
              Editor
            </Link>
            <Link href="/library" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
              Library
            </Link>
            <Link href="/analytics" className="text-sm text-gray-100 transition-colors">
              Analytics
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Analytics</h2>
          <p className="text-gray-400">
            Track prompt performance, token usage, and run history.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statIconBg[stat.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="flex items-center gap-1 text-xs text-green-400 font-medium">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Token usage chart */}
          <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Token Usage (Last 7 Days)</h3>
            <div className="flex items-end justify-between gap-3 h-56">
              {tokenChartData.map((bar) => {
                const heightPct = (bar.value / maxChartValue) * 100;
                return (
                  <div key={bar.label} className="flex flex-col items-center flex-1 h-full justify-end">
                    <span className="text-xs text-gray-500 mb-2">
                      {bar.value >= 1000 ? `${(bar.value / 1000).toFixed(0)}k` : bar.value}
                    </span>
                    <div className="w-full flex justify-center">
                      <div
                        className="w-full max-w-[40px] rounded-t-md bg-gradient-to-t from-indigo-600 to-purple-500 transition-all duration-500"
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{bar.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
              <span>Total this week: 309,000 tokens</span>
              <span>Avg/day: 44,143 tokens</span>
            </div>
          </div>

          {/* Quick stats panel */}
          <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
            <h3 className="text-lg font-semibold mb-6">Performance Summary</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Avg Latency</span>
                <span className="text-sm font-medium">1,492 ms</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '62%' }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Cache Hit Rate</span>
                <span className="text-sm font-medium">84.3%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '84%' }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Error Rate</span>
                <span className="text-sm font-medium">2.8%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full" style={{ width: '3%' }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Avg Input / Run</span>
                <span className="text-sm font-medium">1,120 tokens</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full" style={{ width: '56%' }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Avg Output / Run</span>
                <span className="text-sm font-medium">750 tokens</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{ width: '38%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent runs table */}
        <div className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-800">
            <h3 className="text-lg font-semibold">Recent Runs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 text-gray-500 text-left">
                  <th className="px-6 py-3 font-medium">Prompt</th>
                  <th className="px-6 py-3 font-medium text-right">Tokens In</th>
                  <th className="px-6 py-3 font-medium text-right">Tokens Out</th>
                  <th className="px-6 py-3 font-medium text-right">Latency</th>
                  <th className="px-6 py-3 font-medium text-right">Time</th>
                  <th className="px-6 py-3 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRuns.map((run) => {
                  const cfg = statusConfig[run.status];
                  const StatusIcon = cfg.icon;
                  return (
                    <tr
                      key={run.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-200">
                        {run.name}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400">
                        {formatNumber(run.tokensIn)}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400">
                        {formatNumber(run.tokensOut)}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400">
                        {run.latency.toLocaleString()} ms
                      </td>
                      <td className="px-6 py-4 text-right text-gray-500">
                        {run.timestamp}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center justify-center gap-1.5 ${cfg.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {cfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
