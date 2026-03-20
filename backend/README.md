# ⚙️ Civix AI - Backend

The robust Python-based backend for **Civix AI**. It connects to a **Neo4j Knowledge Graph**, exposes RESTful APIs using **FastAPI**, and seamlessly integrates with **Ollama** for natural language Cypher generation and AI insights.

---

## 🛠 Tech Stack

- **Framework**: FastAPI (Asynchronous, fast, and highly performant)
- **Database**: Neo4j (Graph Database for profound relationship tracking)
- **NLP/LLM**: Ollama (Locally hosted LLM for secure, private analysis)
- **Data Processing**: Pandas, Numpy

---

## 📂 Architecture

```text
backend/
 ├── app/
 │   ├── api/             # FastAPI Route Handlers (Endpoints)
 │   ├── core/            # Configuration, Security, Middlewares
 │   ├── domain/          # Pydantic Models for Validation
 │   ├── infrastructure/  # Neo4j Driver Connection & LLM Integration
 │   └── main.py          # Application Entry Point
 ├── .env                 # Environment variables (Neo4j URI, Passwords)
 ├── requirements.txt     # Python dependencies
 ├── reset_db.py          # Utility script to wipe the database
 ├── count_all.py         # Utility script to check node counts
 └── README.md            # Backend Documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Python 3.9+**
- **Neo4j Database**: You can use Neo4j Desktop, Neo4j Aura (Cloud), or a local Docker instance.
- **Ollama**: Install [Ollama](https://ollama.ai/) and pull your required model (e.g., `ollama run llama3`).

### 2. Installation Setup

Navigate to your backend directory and set up a virtual environment:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Or .venv\Scripts\activate on Windows

# Install the dependencies
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_password
OLLAMA_URL=http://localhost:11434
```

### 4. Running the Development Server

Start the FastAPI application natively using `uvicorn`:

```bash
uvicorn app.main:app --reload
```

The API will be accessible at: `http://localhost:8000`  
Swagger UI Documentation: `http://localhost:8000/docs`

---

## 🧩 Key Functionalities

- **Graph Retrieval**: Executes complex Cypher queries against the Neo4j database to fetch booth-level insights and structural community data.
- **LLM Context Generation**: Processes natural language questions from the frontend, securely translates them into Neo4j Cypher queries using strict schemas, and formats the output into readable AI suggestions.
- **Safety Middleware**: Implements prompt-safety boundaries to refuse queries that attempt to access personally identifiable information or violate ethical guidelines.
