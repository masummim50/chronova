# 🌌 Chronova

**A Next-Generation Project Management Suite with a Premium Glassmorphic Experience.**

[![Status](https://img.shields.io/badge/Status-Active-emerald.svg?style=for-the-badge)]()
[![Frontend](https://img.shields.io/badge/Frontend-React_18-blue.svg?style=for-the-badge)]()
[![Styling](https://img.shields.io/badge/Styling-Tailwind_CSS_4-blueviolet.svg?style=for-the-badge)]()
[![Animations](https://img.shields.io/badge/Animations-Framer_Motion-rose.svg?style=for-the-badge)]()

---

## ✨ Overview

**Chronova** is not just another task manager; it's a productivity workspace designed for the modern era. Built with a focus on **visual excellence** and **operational efficiency**, it combines a high-fidelity glassmorphic UI with robust management tools for both solo developers and high-velocity teams.

Through subtle blur effects, glowing accents, and smooth animations, Chronova transforms mundane project tracking into a premium digital experience.

---

## 🚀 Key Features

### 💎 Premium Interface
- **Glassmorphism**: A stunning UI depth achieved via `backdrop-blur` and translucent layers.
- **Micro-Animations**: Fluid transitions and interactive elements powered by **Framer Motion**.
- **Dark-First Design**: A sophisticated aesthetic optimized for modern developer workspaces.

### 🛡️ Project Management
- **Personal & Team Scopes**: Seamlessly switch between solo deep-work and collaborative team sprints.
- **Granular Decomposition**: Break down massive projects into tasks, and tasks into subtasks with real-time progress tracking.
- **Dynamic Kanban**: Drag-and-drop task management with distinct "Pending", "Running", and "Complete" states.

### 📊 Real-time Intelligence
- **Operational Overviews**: High-fidelity dashboard widgets providing instant stats on task density and time allocation.
- **Member Insights**: (Team Mode) Track individual contributions and bandwidth within collective projects.
- **Time Pulse**: Active tracking of operational time for running tasks.

### 📓 Digital Journaling
- Integrated workspace for post-sprint reflections or daily technical logs.

---

## 🛠️ Technology Stack

| Layer          | Technology                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| **Core**       | [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)                            |
| **Build Tool** | [Vite](https://vitejs.dev/)                                                                                 |
| **State**      | [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) |
| **Styling**    | [Tailwind CSS 4](https://tailwindcss.com/) + [Headless UI](https://headlessui.com/)                         |
| **Icons**      | [Lucide React](https://lucide.dev/) + [MUI Icons](https://mui.com/material-ui/material-icons/)              |
| **Animations** | [Framer Motion](https://www.framer.com/motion/)                                                             |

---

## 🚦 Getting Started

### 📋 Prerequisites
- **Node.js**: `v18.x` or higher
- **NPM** or **Yarn**

### ⚙️ Installation

1. **Clone the Hub**
   ```bash
   git clone https://github.com/masummim50/chronova.git
   cd chronova
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Ignite Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Interface**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧬 Architecture

The project follows a modular architecture for scalability:

- `src/app/redux`: Centralized state management and API orchestration.
- `src/app/components/project`: Core project board and card components.
- `src/app/components/loadingSkeletons`: Custom-engineered shimmering skeletons for high-fidelity loading states.
- `src/app/lib`: Helper functions and shared utilities.

---

## 🎨 Design Philosophy

Chronova is built on the principle of **"Aesthetics that Empower"**. Every shadow, blur, and motion is designed to reduce cognitive load while providing a feeling of status and speed.

> "A project management tool shouldn't just be functional; it should be inspiring."

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <i>Chronova — Synchronize your workflow with the future.</i><br>
  Built with ❤️ by <a href="https://github.com/masummim50">masummim50</a>
</p>
