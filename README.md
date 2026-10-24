# CORTXAI — AI Business Operating System

**Building the future of intelligent business operations.**

CORTXAI is an AI-powered Business Operating System designed to help businesses simplify operations, manage workflows, and improve productivity through intelligent AI agents and centralized dashboards.

Our vision is to bring business operations, automation, and AI assistance together in one unified platform.

> **Project Status:** Under Active Development

---

## Overview

Modern businesses use multiple tools to manage employees, customers, projects, and daily operations. CORTXAI aims to simplify this experience by bringing essential business functions together in a unified, AI-powered environment.

The platform is being developed with modular architecture in mind, allowing new features, AI agents, and integrations to be introduced as the project evolves.

## Key Features

- **AI Business Dashboard** — A centralized interface for business operations.
- **Employee Dashboard** — An interface for employee-related activities.
- **Admin Dashboard** — Administrative access and management interfaces.
- **AI Agents** — A foundation for intelligent, task-oriented business automation.
- **Nora AI Assistant** — An AI assistant designed to support conversational interaction and platform navigation.
- **Voice Interaction** — Planned and evolving voice-based commands and assistance.
- **Modular Architecture** — A foundation for expanding business modules and integrations.
- **Modern UI/UX** — A responsive interface built for a streamlined user experience.

*Features and capabilities are actively evolving. Availability may vary by module.*

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Animations | Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB (integration and configuration may vary) |
| AI Integration | Google Gemini API |
| Deployment | Vercel, Render |

The architecture is intended to support additional AI providers and integrations as development progresses.

## Project Structure

The project follows a modular structure to keep frontend and backend development organized.

```text
CORTXAI/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── package.json
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── agents/
│   └── ...
├── LICENSE
└── README.md
```

*This is an illustrative overview. Refer to the repository for the actual directory structure.*

## Getting Started

### Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- Git
- A Google Gemini API key if you want to use Gemini-powered functionality
- MongoDB access if required by the configured backend

### 1. Clone the Repository

```bash
git clone https://github.com/545scsafcs/CORTXAI.git
cd CORTXAI
```

### 2. Install Dependencies

Install dependencies in the frontend and backend directories.

```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

If your repository uses different directory names or workspace scripts, follow the configuration in the corresponding `package.json` files.

### 3. Configure Environment Variables

Create the appropriate `.env` files based on the environment-variable names
