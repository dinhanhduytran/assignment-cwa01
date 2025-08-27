# Assignment CSE3CWA 01

**Student:** Noel Tran  
**Student Number:** 21654197

A modern, interactive web application built with Next.js 14, featuring a tab generator, theme switching, and multiple interactive pages.

## 🚀 Features

### Core Functionality

- **Tab Generator**: Create, edit, and manage up to 15 tabs with real-time HTML generation
- **Theme Switching**: Dark/Light mode with system preference detection
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Local Storage**: Persistent data storage for tabs and preferences

### Pages & Components

- **Home**: Main tab generator interface
- **About**: Video showcase page

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About page with video
│   ├── coding-races/      # Coming soon page
│   ├── court-room/        # Coming soon page
│   ├── escape-room/       # Coming soon page
│   ├── pre-lab-question/  # Coming soon page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (tab generator)
├── components/             # Reusable components
│   ├── ui/                # UI components (buttons, dropdowns)
│   ├── Header.tsx         # Site header
│   ├── Footer.tsx         # Site footer
│   ├── NavBar.tsx         # Navigation bar
│   ├── TabGenerator.tsx   # Main tab generator component
│   ├── ThemeProvider.tsx  # Theme context provider
│   ├── ThemeToggle.tsx    # Theme switch button
│   └── CommingSoon.tsx   # Coming soon page component
├── hooks/                  # Custom React hooks
│   ├── useClipboard.ts    # Clipboard functionality
│   ├── useHtmlGenerator.ts # HTML generation logic
│   ├── useTabManager.ts   # Tab state management
│   └── index.ts           # Hooks export
├── types/                  # TypeScript type definitions
│   └── tab.ts             # Tab interface
└── lib/                    # Utility functions
    └── utils.ts           # Helper functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd assignment-cwa01
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

### Tab Generator

1. **Create Tabs**: Click "Create New Tab" to add new tabs (max 15)
2. **Edit Content**: Click on any tab to edit its title and content
3. **Preview**: See real-time preview of your tabs
4. **Generate HTML**: Copy the generated HTML code for use in other projects
5. **Delete Tabs**: Use the X button to remove unwanted tabs

### Theme Switching

- **Toggle Button**: Click the theme toggle in the header
- **System Preference**: Automatically detects and follows system theme
- **Persistent**: Your choice is saved in local storage

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

### Components

- All components are built with Tailwind CSS
- Easy to customize colors, spacing, and layout
- Consistent design system throughout

---
