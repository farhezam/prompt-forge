# 🛠️ Prompt Forge — AI Prompt Engineering IDE

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A production-grade prompt engineering workspace for developers and AI creators.**

Craft, test, and optimize LLM prompts through a VS Code-inspired interface with live execution, template library, and analytics dashboard.

[Live Demo](https://prompt-forge-five-mu.vercel.app) · [Report Bug](https://github.com/farhezam/prompt-forge/issues) · [Request Feature](https://github.com/farhezam/prompt-forge/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Configuration](#configuration)

- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Prompt Forge solves a critical problem in AI-assisted development: **prompt iteration is unstructured, undocumented, and inefficient**. Developers waste hours crafting prompts without visibility into token usage, performance patterns, or reusable templates.

Prompt Forge provides:

- **Structured workspace** — Split-view editor for writing and testing prompts with real-time AI responses
- **Template library** — 8 professional prompt categories pre-built for immediate use
- **Token analytics** — Track consumption, cost, and performance across all executions
- **Secure architecture** — API keys never leave the server; client-side storage for user data

Built for developers who take prompt engineering seriously.

---

## ✨ Features

### 🖊️ Interactive Editor
Split-panel layout with syntax-aware prompt builder on the left and real-time response panel on the right. Auto-save functionality preserves drafts across sessions. After execution, token usage metrics (input tokens, output tokens, total) are displayed alongside the AI response.

### 📚 Template Library
8 professionally crafted prompt categories:
- **Code Generation** — Generate boilerplate, functions, and modules
- **Code Review** — Analyze code quality and suggest improvements
- **Creative Writing** — Stories, narratives, and creative content
- **Business Writing** — Emails, proposals, and professional documents
- **Data Analysis** — Query generation and data interpretation
- **Technical Documentation** — API docs, READMEs, and guides
- **Brainstorming** — Idea generation and concept exploration
- **Translation** — Multi-language translation and localization

### 📊 Analytics Dashboard
Comprehensive tracking with:
- Total tokens consumed across all sessions
- Prompt execution count and history
- Average tokens per prompt
- Estimated cost breakdown
- Visual charts for daily token usage trends
- Execution history table with timestamps and status

### 🔐 Secure API Integration
- API key stored in browser localStorage — never transmitted to third parties
- LLM API calls routed through Next.js server-side API routes
- Server-side proxy pattern ensures zero key exposure to client
- Request/response logging for debugging

### 🎨 VS Code-Inspired Dark Theme
Professional dark interface with:
- Slate/zinc + indigo accent color palette
- Glassmorphism panels with backdrop blur
- Smooth transitions and loading states
- Responsive layout for desktop, tablet, and mobile

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (Client)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Editor UI   │  │  Templates   │  │    Analytics     │  │
│  │  (React)      │  │  (React)     │  │    (React)       │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
│         │                  │                    │            │
│         └──────────────────┼────────────────────┘            │
│                            │                                 │
│                    localStorage API key                      │
└────────────────────────────┼─────────────────────────────────┘
                             │ POST /api/run-prompt
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js Server (API Route)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /api/run-prompt                                      │   │
│  │  - Extracts prompt from request body                   │   │
│  │  - Adds API key from request body                      │   │
│  │  - Forwards to LLM API                                  │   │
│  │  - Extracts token usage from response                  │   │
│  │  - Returns result + metrics to client                  │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────────┼─────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                        LLM API                              │
│  - Xiaomi MiMo inference endpoint                            │
│  - Returns generated text + token usage                     │
│  - Supports multiple model variants                         │
└─────────────────────────────────────────────────────────────┘
```

**Data Flow:**
1. User writes prompt in editor → saves to localStorage (auto-save)
2. User clicks Execute → POST to `/api/run-prompt` with prompt + API key
3. API route adds key, forwards to LLM → receives response + token metrics
4. Client displays response + updates analytics in localStorage
5. Analytics page reads localStorage → renders charts and history

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | Full-stack framework (App Router, SSR, API Routes) | 16.x |
| **React** | UI components and state management | 19.x |
| **TypeScript** | End-to-end type safety | 5.x |
| **Tailwind CSS** | Utility-first styling with dark theme | 4.x |
| **LLM API** | Xiaomi MiMo backend for prompt execution | v1 |
| **Vercel** | Deployment and hosting | — |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9 or later
- **Xiaomi MiMo API key**

### Installation

```bash
# Clone repository
git clone https://github.com/farhezam/prompt-forge.git
cd prompt-forge

# Install dependencies
npm install

# Setup environment
cp .env.local.example .env.local

# Edit .env.local with your LLM API key
# OPENAI_API_KEY=your_api_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variable `OPENAI_API_KEY` in Vercel dashboard under **Settings → Environment Variables**.

---

## 📡 API Reference

### `POST /api/run-prompt`

Execute a prompt against LLM API.

**Request Body:**
```json
{
  "systemPrompt": "You are a helpful coding assistant.",
  "userPrompt": "Write a function to reverse a string in TypeScript.",
  "apiKey": "your_llm_api_key"
}
```

**Response:**
```json
{
  "success": true,
  "result": "Here's a TypeScript function to reverse a string...",
  "usage": {
    "inputTokens": 45,
    "outputTokens": 120,
    "totalTokens": 165
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid API key"
}
```

---

## 📁 Project Structure

```
prompt-forge/
├── app/
│   ├── page.tsx                    # Homepage — hero + features
│   ├── editor/
│   │   └── page.tsx                # Split-view prompt editor
│   ├── library/
│   │   └── page.tsx                # Template library (8 categories)
│   ├── analytics/
│   │   └── page.tsx                # Token analytics + charts
│   ├── api/
│   │   └── run-prompt/
│   │       └── route.ts            # LLM API proxy endpoint
│   ├── layout.tsx                  # Root layout + navigation
│   └── globals.css                 # Tailwind + custom theme
├── components/
│   ├── Navigation.tsx              # Top nav bar
│   ├── SettingsModal.tsx           # API key + token stats modal
│   └── ...                         # Shared UI components
├── lib/
│   └── ...                         # Utility functions
├── public/                         # Static assets
├── README.md                       # This file
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
└── tailwind.config.ts              # Tailwind configuration
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No | LLM API key for prompt execution. If not set, app works in offline mode with template browsing only. |

### Client-Side Settings

The application stores the following in browser localStorage:
- `prompt-forge-api-key` — User's LLM API key
- `prompt-forge-analytics` — Execution history and token usage data
- `prompt-forge-drafts` — Auto-saved prompt drafts

Clear all data via Settings Modal → Reset.

---



## 🗺️ Roadmap

- [ ] Prompt versioning with diff comparison
- [ ] Export prompts as JSON, Markdown, or raw text
- [ ] Keyboard shortcuts for editor actions
- [ ] Multi-model support (additional Xiaomi MiMo models)
- [ ] Collaborative prompt editing
- [ ] Prompt performance scoring
- [ ] Custom template creation UI
- [ ] Dark/light theme toggle
- [ ] Prompt execution history search
- [ ] API key validation on settings save

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

</div>
