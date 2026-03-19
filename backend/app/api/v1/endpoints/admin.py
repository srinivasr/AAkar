from fastapi import APIRouter, HTTPException
from app.infrastructure.db.neo4j_client import neo4j_client

router = APIRouter()


@router.get("/overview")
def get_admin_overview():
    try:
        # Total booths
        total_booths_query = """
        MATCH (b:Booth)
        RETURN count(b) AS total_booths
        """
        total_booths_result = neo4j_client.run_query(total_booths_query)
        total_booths = total_booths_result[0]["total_booths"] if total_booths_result else 0

        # Total complaints
        total_complaints_query = """
        MATCH (c:Complaint)
        RETURN count(c) AS total_complaints
        """
        total_complaints_result = neo4j_client.run_query(total_complaints_query)
        total_complaints = total_complaints_result[0]["total_complaints"] if total_complaints_result else 0

        # Aggregate booth metrics
        metrics_query = """
        MATCH (b:Booth)
        RETURN
            sum(b.open_count) AS total_open,
            sum(b.resolved_count) AS total_resolved
        """
        metrics_result = neo4j_client.run_query(metrics_query)
        metrics = metrics_result[0] if metrics_result else {}

        total_open = metrics.get("total_open") or 0
        total_resolved = metrics.get("total_resolved") or 0

        avg_open_ratio = 0
        if total_complaints > 0:
            avg_open_ratio = total_open / total_complaints

        return {
            "total_booths": total_booths,
            "total_complaints": total_complaints,
            "total_open_complaints": total_open,
            "total_resolved_complaints": total_resolved,
            "avg_open_ratio": round(avg_open_ratio, 2),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch overview: {str(e)}")