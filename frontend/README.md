# 🎨 Civix AI - Frontend

The presentation layer of **Civix AI**. Built with speed, reactivity, and a premium aesthetic in mind. It uses a modern glassmorphic design system and integrates interactive network structures to represent the Knowledge Graph natively in the browser.

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS (Dark Theme + Glassmorphism)
- **Graph Visualization**: `vis-network` & `vis-data`
- **Tooling**: ESLint, Node.js

---

## 📂 Project Structure

```text
frontend/
 ├── public/             # Static Assets
 ├── src/
 │   ├── components/     # Reusable UI Blocks (Glassmorphic Panels, Ask Panel)
 │   ├── pages/          # Main Views (Dashboard)
 │   ├── App.css         # Global Styles & Theming Variables
 │   ├── App.jsx         # Main React Component & Routing
 │   └── main.jsx        # React DOM Entry Point
 ├── package.json        # Dependencies and Scripts
 ├── vite.config.js      # Vite Configurations
 └── README.md           # Frontend Documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.x or later)
- **npm** (v9.x or later)

### 2. Installation

Navigate to the frontend directory and install the necessary dependencies:

```bash
cd frontend
npm install
```

### 3. Running the Development Server

Fire up the Vite server with Hot Module Replacement (HMR) capabilities:

```bash
npm run dev
```

The frontend will be instantly accessible, normally at: `http://localhost:5173`

*(Note: Make sure the FastAPI backend is concurrently running on port 8000 so the frontend can successfully retrieve and display the graph data!)*

---

## 💠 Design Principles

The UI of Civix AI is built around the concept of a **Living Dashboard**:
- **Premium Aesthetics**: Deep, carefully curated custom dark palettes combined with vibrant, purposeful accent colors.
- **Glassmorphism Integration**: Floating panels and transparent blurs that bring the interactive Knowledge Graph to the forefront.
- **Dynamic Interaction**: Utilizes `vis-network` to allow users to physically drag, zoom, and explore connections within the civic dataset.

---

## 🔧 Scripts Available

- `npm run dev`: Starts the development server.
- `npm run build`: Bundles the application for production.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to verify code quality.
