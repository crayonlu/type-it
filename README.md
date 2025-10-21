# Type-it

A modern blog and portfolio website built with Next.js, featuring markdown-based content management, internationalization, and a clean, responsive design.

## Tech Stack

- **Framework:** Next.js 15 with React 19
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **UI Components:** Radix UI
- **Markdown:** Unified, Rehype, Remark
- **Animations:** GSAP
- **Internationalization:** next-intl
- **Theme:** next-themes

## Features

- Markdown-based blog with syntax highlighting
- Multi-language support (English/Chinese)
- Dark/Light theme support
- Dynamic category and tag filtering
- Project showcase
- Reading progress tracking
- Table of contents generation
- Responsive design

## Getting Started

### Prerequisites

- Bun

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

The application will start on `http://localhost:3001`

### Build

```bash
bun run build
```

### Production

```bash
bun start
```

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── config/           # Configuration and content
│   └── docs/        # Markdown content
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── types/           # TypeScript type definitions
```
