from fastapi import APIRouter
from app.infrastructure.db.neo4j_client import neo4j_client

router = APIRouter()

@router.get("/overview")
def get_admin_overview():

    # Total booths
    total_booths_query = """
    MATCH (b:Booth)
    RETURN count(b) AS total_booths
    """
    total_booths = neo4j_client.run_query(total_booths_query)[0]["total_booths"]

    # Total complaints
    total_complaints_query = """
    MATCH (c:Complaint)
    RETURN count(c) AS total_complaints
    """
    total_complaints = neo4j_client.run_query(total_complaints_query)[0]["total_complaints"]

    # Aggregate booth metrics
    metrics_query = """
    MATCH (b:Booth)
    RETURN
        sum(b.open_count) AS total_open,
        sum(b.resolved_count) AS total_resolved
    """
    metrics = neo4j_client.run_query(metrics_query)[0]

    total_open = metrics["total_open"] or 0
    total_resolved = metrics["total_resolved"] or 0

    avg_open_ratio = 0
    if total_complaints > 0:
        avg_open_ratio = total_open / total_complaints

    return {
        "total_booths": total_booths,
        "total_complaints": total_complaints,
        "total_open_complaints": total_open,
        "total_resolved_complaints": total_resolved,
        "avg_open_ratio": round(avg_open_ratio, 2)
    }