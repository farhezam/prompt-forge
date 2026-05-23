# Prompt Forge — Visual Prompt Engineering IDE

## Overview

Prompt Forge is a visual prompt engineering IDE built for developers and researchers who design, test, and iterate on LLM prompts. It provides a structured workspace with live testing against the MiMo API, version tracking, and token-level analytics — all in a single interface.

## Features

- **Live Prompt Testing** — Execute prompts against MiMo models and inspect responses in real time
- **Version History** — Track every revision with diffs and rollback support
- **Template Library** — Save, organize, and share reusable prompt templates
- **Token Analytics** — Monitor token usage, cost estimates, and response latency
- **Smart Suggestions** — AI-powered recommendations to improve prompt clarity and effectiveness
- **Export Prompts** — Export prompts as JSON, Markdown, or raw text for integration into pipelines

## Tech Stack

- **Next.js 16** — App Router, Server Components, Server Actions
- **TypeScript** — End-to-end type safety
- **Tailwind CSS** — Utility-first styling with dark theme
- **MiMo API** — LLM backend for prompt execution and suggestions

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm 9+

### Installation

```bash
git clone https://github.com/your-org/prompt-forge.git
cd prompt-forge
npm install
```

### Environment Setup

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your MiMo API key:

```
MIMO_API_KEY=your_actual_api_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## MiMo API Setup

1. Sign up at the MiMo developer portal
2. Generate an API key
3. Add the key to `.env.local` as `MIMO_API_KEY`
4. Restart the dev server

The key is server-side only — never exposed to the client.

## Screenshots

> Coming soon. Screenshots and demo video will be added after the initial release.

## License

MIT
