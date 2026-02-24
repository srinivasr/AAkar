from fastapi import FastAPI
from app.infrastructure.db.neo4j_client import neo4j_client

app = FastAPI()

@app.get("/")
def health():
    return {"status": "Backend running"}

@app.get("/test-db")
def test_db():
    result = neo4j_client.run_query(
        "RETURN 'Neo4j Connected Successfully' AS message"
    )
    return result