'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Code2,
  FileText,
  BarChart2,
  Database,
  TestTube2,
  GitCommit,
  GitPullRequest,
  Regex,
  ArrowRight,
  Zap,
} from 'lucide-react';

type Category = 'All' | 'Code' | 'Writing' | 'Analysis';

interface Template {
  id: number;
  title: string;
  description: string;
  category: Exclude<Category, 'All'>;
  tokenEstimate: number;
  icon: React.ReactNode;
  prompt: string;
}

const templates: Template[] = [
  {
    id: 1,
    title: 'Code Review',
    description:
      'Analyze code for bugs, performance issues, security vulnerabilities, and style improvements.',
    category: 'Code',
    tokenEstimate: 320,
    icon: <Code2 className="w-5 h-5" />,
    prompt:
      'You are an expert code reviewer. Analyze the following code for bugs, performance, security, and style.',
  },
  {
    id: 2,
    title: 'API Docs',
    description:
      'Generate clear, structured API documentation from code or endpoint descriptions.',
    category: 'Writing',
    tokenEstimate: 280,
    icon: <FileText className="w-5 h-5" />,
    prompt:
      'You are a technical writer. Generate comprehensive API documentation for the following endpoint or code.',
  },
  {
    id: 3,
    title: 'Bug Analyzer',
    description:
      'Diagnose bugs from stack traces, error messages, or broken code snippets.',
    category: 'Analysis',
    tokenEstimate: 260,
    icon: <BarChart2 className="w-5 h-5" />,
    prompt:
      'You are a debugging expert. Analyze the following error or stack trace and identify the root cause with a fix.',
  },
  {
    id: 4,
    title: 'SQL Generator',
    description:
      'Convert natural language descriptions into optimized SQL queries for any database.',
    category: 'Code',
    tokenEstimate: 200,
    icon: <Database className="w-5 h-5" />,
    prompt:
      'You are a SQL expert. Convert the following natural language description into an optimized SQL query.',
  },
  {
    id: 5,
    title: 'Test Writer',
    description:
      'Generate comprehensive unit and integration tests for functions, classes, or modules.',
    category: 'Code',
    tokenEstimate: 350,
    icon: <TestTube2 className="w-5 h-5" />,
    prompt:
      'You are a QA engineer. Write thorough unit tests for the following code, covering edge cases and error paths.',
  },
  {
    id: 6,
    title: 'Commit Message',
    description:
      'Write clear, conventional commit messages from diffs or change descriptions.',
    category: 'Writing',
    tokenEstimate: 150,
    icon: <GitCommit className="w-5 h-5" />,
    prompt:
      'You are a senior engineer. Write a concise, conventional commit message for the following code diff or change description.',
  },
  {
    id: 7,
    title: 'PR Description',
    description:
      'Generate detailed pull request descriptions with context, changes, and testing notes.',
    category: 'Writing',
    tokenEstimate: 310,
    icon: <GitPullRequest className="w-5 h-5" />,
    prompt:
      'You are a senior engineer. Write a detailed pull request description for the following changes, including summary, motivation, and testing steps.',
  },
  {
    id: 8,
    title: 'Regex Builder',
    description:
      'Build and explain regular expressions from plain English descriptions or examples.',
    category: 'Analysis',
    tokenEstimate: 180,
    icon: <Regex className="w-5 h-5" />,
    prompt:
      'You are a regex expert. Create a regular expression that matches the following description, and explain each part of the pattern.',
  },
];

const categoryColors: Record<Exclude<Category, 'All'>, string> = {
  Code: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
  Writing: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  Analysis: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
};

const categoryIconColors: Record<Exclude<Category, 'All'>, string> = {
  Code: 'bg-indigo-500/10 text-indigo-400',
  Writing: 'bg-purple-500/10 text-purple-400',
  Analysis: 'bg-pink-500/10 text-pink-400',
};

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const categories: Category[] = ['All', 'Code', 'Writing', 'Analysis'];

  const filtered = templates.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
            <Link href="/library" className="text-sm text-gray-100 transition-colors">
              Library
            </Link>
            <Link href="/analytics" className="text-sm text-gray-400 hover:text-gray-100 transition-colors">
              Analytics
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Template Library</h2>
          <p className="text-gray-400">
            Ready-made prompt templates to jumpstart your workflow.
          </p>
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0f0f0f] border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} template{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          {search ? ` matching "${search}"` : ''}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((template) => (
              <div
                key={template.id}
                className="flex flex-col p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all group"
              >
                {/* Icon + category */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${categoryIconColors[template.category]}`}
                  >
                    {template.icon}
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[template.category]}`}
                  >
                    {template.category}
                  </span>
                </div>

                {/* Title + description */}
                <h3 className="font-semibold text-gray-100 mb-2 group-hover:text-indigo-400 transition-colors">
                  {template.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-4">
                  {template.description}
                </p>

                {/* Token estimate + button */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Zap className="w-3.5 h-3.5 text-yellow-500" />
                    ~{template.tokenEstimate} tokens
                  </span>
                  <Link
                    href={`/editor?template=${template.id}`}
                    className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Use Template
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search className="w-10 h-10 text-gray-700 mb-4" />
            <p className="text-gray-400 font-medium">No templates found</p>
            <p className="text-sm text-gray-600 mt-1">
              Try a different search term or category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
