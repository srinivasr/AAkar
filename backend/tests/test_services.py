"""Tests for domain services: ask_service safety, ollama_client cleaning, etc."""

from unittest.mock import patch


# ─── ask_service safety check ───────────────────────────────────────────

class TestAskServiceSafety:
    """Test the BLOCKED_KEYWORDS regex in ask_service."""

    def test_blocks_delete_query(self):
        from app.domain.services.ask_service import BLOCKED_KEYWORDS

        assert BLOCKED_KEYWORDS.search("MATCH (n) DELETE n")

    def test_blocks_create_query(self):
        from app.domain.services.ask_service import BLOCKED_KEYWORDS

        assert BLOCKED_KEYWORDS.search("CREATE (n:Voter {name: 'x'})")

    def test_blocks_merge_query(self):
        from app.domain.services.ask_service import BLOCKED_KEYWORDS

        assert BLOCKED_KEYWORDS.search("MERGE (n:Voter {epic: '123'})")

    def test_allows_read_query(self):
        from app.domain.services.ask_service import BLOCKED_KEYWORDS

        assert BLOCKED_KEYWORDS.search("MATCH (v:Voter) RETURN v") is None

    def test_blocks_drop(self):
        from app.domain.services.ask_service import BLOCKED_KEYWORDS

        assert BLOCKED_KEYWORDS.search("DROP INDEX ON :Voter(epic)")


# ─── ollama_client._clean_cypher ────────────────────────────────────────

class TestCleanCypher:
    """Test the Cypher cleaning/extraction logic."""

    def setup_method(self):
        from app.infrastructure.ai.ollama_client import OllamaClient

        self.client = OllamaClient()

    def test_extracts_from_xml_tags(self):
        text = "<logic>I match voters</logic>\n<query>\nMATCH (v:Voter) RETURN v\n</query>"
        result = self.client._clean_cypher(text)
        assert result == "MATCH (v:Voter) RETURN v"

    def test_strips_semicolons(self):
        text = "<query>MATCH (v:Voter) RETURN v;</query>"
        result = self.client._clean_cypher(text)
        assert ";" not in result

    def test_blocks_destructive_queries(self):
        text = "<query>CREATE (n:Voter {name: 'hacker'})</query>"
        result = self.client._clean_cypher(text)
        assert result == "MATCH (n) RETURN n LIMIT 0"

    def test_fallback_without_tags(self):
        text = "MATCH (v:Voter) RETURN v"
        result = self.client._clean_cypher(text)
        assert result == "MATCH (v:Voter) RETURN v"

    def test_fallback_strips_markdown_fences(self):
        text = "```cypher\nMATCH (v:Voter) RETURN v\n```"
        result = self.client._clean_cypher(text)
        assert "```" not in result
        assert "MATCH (v:Voter) RETURN v" in result

    def test_blocks_detach_delete(self):
        text = "<query>MATCH (n) DETACH DELETE n</query>"
        result = self.client._clean_cypher(text)
        assert result == "MATCH (n) RETURN n LIMIT 0"


# ─── graph_enrichment ──────────────────────────────────────────────────

class TestGraphEnrichment:
    """Test booth metrics updates."""

    @patch("app.domain.services.graph_enrichment.neo4j_client")
    def test_update_booth_metrics_runs_two_queries(self, mock_client):
        mock_client.run_query.return_value = []
        from app.domain.services.graph_enrichment import update_booth_metrics

        result = update_booth_metrics()
        assert result == {"status": "booth metrics updated"}
        assert mock_client.run_query.call_count == 2  # reset + update


# ─── risk_engine ────────────────────────────────────────────────────────

class TestRiskEngine:
    """Test risk score updates."""

    @patch("app.domain.services.risk_engine.neo4j_client")
    def test_update_risk_scores(self, mock_client):
        mock_client.run_query.return_value = []
        from app.domain.services.risk_engine import update_risk_scores

        result = update_risk_scores()
        assert result == {"status": "risk scores updated"}
        mock_client.run_query.assert_called_once()


# ─── recommendation_engine ──────────────────────────────────────────────

class TestRecommendationEngine:
    """Test recommendation generation."""

    @patch("app.domain.services.recommendation_engine.neo4j_client")
    def test_generate_recommendations(self, mock_client):
        mock_client.run_query.return_value = []
        from app.domain.services.recommendation_engine import (
            generate_recommendations,
        )

        result = generate_recommendations()
        assert result == {"status": "recommendations generated"}
        assert mock_client.run_query.call_count == 2  # main + default


# ─── voter_segmentation ────────────────────────────────────────────────

class TestVoterSegmentation:
    """Test voter categorization."""

    @patch("app.domain.services.voter_segmentation.neo4j_client")
    def test_categorize_voters(self, mock_client):
        mock_client.run_query.return_value = []
        from app.domain.services.voter_segmentation import categorize_voters

        result = categorize_voters()
        assert result == {"status": "voters categorized"}
        mock_client.run_query.assert_called_once()


# ─── message_generator ──────────────────────────────────────────────────

class TestMessageGenerator:
    """Test booth message generation."""

    @patch("app.domain.services.message_generator.neo4j_client")
    def test_generates_mapped_messages(self, mock_client):
        mock_client.run_query.return_value = [
            {"booth_id": 1, "recommendation": "Deploy water inspection team"},
            {"booth_id": 2, "recommendation": "Contact electricity board"},
        ]
        from app.domain.services.message_generator import generate_booth_messages

        messages = generate_booth_messages()
        assert len(messages) == 2
        assert messages[0]["booth_id"] == 1
        assert (
            messages[0]["message"]
            == "Water pipeline repair is scheduled in your area."
        )
        assert messages[1]["message"] == "Power outage investigation initiated."

    @patch("app.domain.services.message_generator.neo4j_client")
    def test_fallback_message_for_unknown_recommendation(self, mock_client):
        mock_client.run_query.return_value = [
            {"booth_id": 99, "recommendation": "Something unexpected"},
        ]
        from app.domain.services.message_generator import generate_booth_messages

        messages = generate_booth_messages()
        assert len(messages) == 1
        assert messages[0]["message"].startswith("Governance action planned:")

    @patch("app.domain.services.message_generator.neo4j_client")
    def test_empty_results(self, mock_client):
        mock_client.run_query.return_value = []
        from app.domain.services.message_generator import generate_booth_messages

        messages = generate_booth_messages()
        assert messages == []
