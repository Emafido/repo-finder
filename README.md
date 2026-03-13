# RepoFinder: Discover Your Next Open Source Contribution 🔭

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)](https://github.com/Emafido/repo-finder/actions)


## Overview
RepoFinder is a modern, high-performance web application built with Next.js and TypeScript. It is designed to solve the "blank page" problem for developers looking to contribute to open source. By simply entering a programming language, RepoFinder interfaces with the GitHub API to instantly surface a random, highly-starred repository—complete with metrics like stargazers, forks, and open issues—to encourage exploration and contribution.

## Core Features
- **Random Repository Discovery**: Effortlessly bypass standard search fatigue and find new open-source projects based on specific language parameters.
- **Live GitHub Integration**: Fetches real-time repository data directly from the GitHub REST API.
- **Dynamic State Animations**: Utilizes Framer Motion for buttery-smooth transitions and zero-layout-shift UI interactions.
- **Responsive & Gamified UI**: Provides a seamless experience across all devices, capped off with SweetAlert2 notifications and a canvas-confetti celebration upon successful data retrieval.
- **Clear Project Metrics**: Displays essential repository statistics at a glance, allowing engineers to quickly evaluate a project's activity level.

## Technical Stack
| Category       | Technology                                      | Description                                                                 |
| :------------- | :---------------------------------------------- | :-------------------------------------------------------------------------- |
| **Framework** | [Next.js](https://nextjs.org/)                  | App Router setup for handling core rendering mechanics.                     |
| **Language** | [TypeScript](https://www.typescriptlang.org/)   | Strict type definitions to prevent runtime errors and ensure data integrity.|
| **UI Library** | [React](https://react.dev/)                     | Component-based architecture with robust hook-driven state management.      |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/)        | Utility-first framework powering the sleek, dark-mode glassmorphic design.  |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) | Production-ready motion library managing `AnimatePresence` DOM transitions. |
| **Icons** | [Lucide React](https://lucide.dev/)             | Clean, minimal SVG icon implementation.                                     |
| **Alerts** | [SweetAlert2](https://sweetalert2.github.io/)   | Themed, accessible modal dialogs replacing standard browser alerts.         |
| **Effects** | [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | High-performance particle physics for discovery celebrations.               |

## Getting Started

### Installation
To initialize RepoFinder in your local development environment, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/Emafido/repo-finder.git](https://github.com/Emafido/repo-finder.git)
   cd repo-finder
   Install Dependencies:

Bash
npm install
# or yarn install / pnpm install
Run the Development Server:

Bash
npm run dev
# or yarn dev / pnpm dev
Open http://localhost:3000 in your browser. The application features hot-reloading for immediate feedback on edits.

Environment Variables
This architecture connects directly to the public GitHub API. No authentication tokens or .env files are required for local execution of basic search queries.

Usage Guide
Initialize Search: Navigate to the dashboard at http://localhost:3000.

Set Parameters: Enter a target programming language in the input field (e.g., JavaScript, Go, Python).

Execute: Click the "Fetch Random Repository" button to ping the GitHub API.

Evaluate Metrics: If successful, the system will render a data card detailing the repository's Name, Description, Stars, Forks, and Open Issues.

Access Mainframe: Click the "View on GitHub" button to navigate directly to the repository's source code and start contributing.

Re-Roll: Click "Fetch Another Repository" to execute a new randomized search under the same language parameters.

Contributing
We warmly welcome contributions to optimize RepoFinder! Please ensure your code adheres to the existing strict TypeScript configurations.

✨ Fork the Repository: Clone to your personal GitHub account.

🌳 Create a New Branch: Use semantic naming (e.g., git checkout -b feature/search-optimization or git checkout -b bugfix/ui-shift).

💻 Commit Your Changes: Implement your logic and ensure styles match the existing dark-mode paradigm.

🧪 Test Thoroughly: Verify that transitions, API fetches, and edge cases (like empty inputs) resolve correctly.

🚀 Submit a Pull Request: Push your branch to origin and open a PR against the main branch with a concise description of your upgrades.

Author: Emafido Emmanuel Aridon <br>
Live Link : open-source-finder-drab.vercel.app <br>
Check the problem statement out here: https://roadmap.sh/projects/github-random-repo

GitHub: @Emafido
