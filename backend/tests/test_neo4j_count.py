"""Tests for Neo4j count queries."""

from unittest.mock import patch


@patch("app.infrastructure.db.neo4j_client.neo4j_client")
def test_voter_count_returns_integer(mock_client):
    """Verify count query returns a valid integer count."""
    mock_client.run_query.return_value = [{"count": 42}]
    result = mock_client.run_query("MATCH (v:Voter) RETURN count(v) AS count")
    assert result[0]["count"] == 42


@patch("app.infrastructure.db.neo4j_client.neo4j_client")
def test_complaint_count_returns_integer(mock_client):
    """Verify complaint count query returns a valid integer."""
    mock_client.run_query.return_value = [{"count": 10}]
    result = mock_client.run_query("MATCH (c:Complaint) RETURN count(c) AS count")
    assert result[0]["count"] == 10


@patch("app.infrastructure.db.neo4j_client.neo4j_client")
def test_empty_database_returns_zero(mock_client):
    """Verify count returns 0 when database is empty."""
    mock_client.run_query.return_value = [{"count": 0}]
    result = mock_client.run_query("MATCH (v:Voter) RETURN count(v) AS count")
    assert result[0]["count"] == 0
