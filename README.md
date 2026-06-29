# Abhishek Yelmamdi | Portfolio |LIVE: [Portfolio](https://abhishek-yelmamdi-portfolio.vercel.app/)

A responsive software engineering portfolio built with React and Vite. The site presents selected projects, technical strengths, experience, education, and contact links through an interactive single-page interface.

## Overview

This portfolio is designed to communicate engineering range with a focus on full-stack applications, backend systems, distributed workflows, and applied machine learning. It includes project case-study sections with architecture notes, stack tags, key metrics, and links to repositories or live demos where available.

## Features

- Interactive project lab with selectable project details
- System design boards for project architecture summaries
- Featured project section for high-signal work
- Experience, achievements, and education timeline
- Light and dark theme toggle with local preference persistence
- Responsive layout for desktop, tablet, and mobile screens
- Resume download link from the public assets folder
- Smooth section reveal animations with reduced-motion support

## Tech Stack

- React 19
- Vite 6
- JavaScript
- CSS
- HTML

## Project Structure

```txt
.
+-- public/
|   +-- Abhishek_Yelmamdi_Resume.pdf
+-- src/
|   +-- main.jsx
|   +-- styles.css
+-- .gitignore
+-- index.html
+-- package-lock.json
+-- package.json
+-- README.md
```

## Getting Started

### Prerequisites

Install Node.js LTS before running the project.

```powershell
node -v
npm -v
```

### Installation

```powershell
npm install
```

### Development

```powershell
npm run dev
```

The app will run locally on the Vite development server, usually at:

```txt
http://localhost:5173
```

### Production Build

```powershell
npm run build
```

### Preview Production Build

```powershell
npm run preview
```

## Deployment

This project is ready to deploy on Vercel, Netlify, or any static hosting provider that supports Vite builds.

Recommended Vercel settings:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Notes

- `node_modules/`, `dist/`, environment files, and logs are ignored through `.gitignore`.
- The resume PDF is stored in `public/` so it can be served and downloaded from the live site.
- Google Fonts are imported in `src/styles.css`, so the final typography depends on browser network access.

## Contact

- GitHub: [ABHISHEK-YELMAMDI](https://github.com/ABHISHEK-YELMAMDI)
- LinkedIn: [Abhishek Yelmamdi](https://www.linkedin.com/in/abhishek-yelmamdi-5169a32aa)
- Email: [yelmadgiabhi25@gmail.com](mailto:yelmadgiabhi25@gmail.com)
