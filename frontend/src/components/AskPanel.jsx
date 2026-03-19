import React, { useState, useRef, useEffect } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import './AskPanel.css';

const API_URL = 'http://localhost:8000/api/v1/ask';

// Color palette for node groups (labels)
const GROUP_COLORS = {
  Voter:      { background: '#3498db', border: '#2980b9', font: '#fff' },
  Booth:      { background: '#e74c3c', border: '#c0392b', font: '#fff' },
  House:      { background: '#2ecc71', border: '#27ae60', font: '#fff' },
  Complaint:  { background: '#f39c12', border: '#e67e22', font: '#fff' },
  Default:    { background: '#9b59b6', border: '#8e44ad', font: '#fff' },
};

function getGroupColor(group) {
  return GROUP_COLORS[group] || GROUP_COLORS.Default;
}

const AskPanel = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const graphRef = useRef(null);
  const networkRef = useRef(null);

  // Render vis-network whenever result.graph changes
  useEffect(() => {
    if (!result?.graph || !graphRef.current) return;
    const { nodes, edges } = result.graph;
    if (!nodes.length && !edges.length) return;

    // Destroy previous network
    if (networkRef.current) {
      networkRef.current.destroy();
      networkRef.current = null;
    }

    const visNodes = new DataSet(
      nodes.map((n) => {
        const colors = getGroupColor(n.group);
        return {
          id: n.id,
          label: n.properties?.name || n.properties?.voter_id || n.properties?.booth_id || n.properties?.complaint_id || n.label,
          title: n.title,
          group: n.group,
          color: {
            background: colors.background,
            border: colors.border,
            highlight: { background: colors.background, border: '#fff' },
          },
          font: { color: colors.font, size: 13, face: 'Inter, sans-serif' },
          shape: 'dot',
          size: 18,
        };
      })
    );

    const visEdges = new DataSet(
      edges.map((e, i) => ({
        id: `edge-${i}`,
        from: e.from,
        to: e.to,
        label: e.label,
        arrows: 'to',
        color: { color: '#95a5a6', highlight: '#2c3e50' },
        font: { size: 11, color: '#7f8c8d', strokeWidth: 0, face: 'Inter, sans-serif' },
        smooth: { type: 'continuous' },
      }))
    );

    const options = {
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -30,
          centralGravity: 0.005,
          springLength: 150,
          springConstant: 0.04,
        },
        solver: 'forceAtlas2Based',
        stabilization: { iterations: 100 },
      },
      interaction: {
        hover: true,
        tooltipDelay: 200,
        zoomView: true,
        dragView: true,
      },
      edges: {
        width: 1.5,
      },
      nodes: {
        borderWidth: 2,
      },
    };

    networkRef.current = new Network(graphRef.current, { nodes: visNodes, edges: visEdges }, options);

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [result]);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Server error (${res.status})`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  // Build table columns from data
  const columns = result?.data?.length
    ? Object.keys(result.data[0])
    : [];

  return (
    <div className="ask-panel">
      {/* Input */}
      <div className="ask-input-area">
        <input
          id="ask-input"
          className="ask-input"
          type="text"
          placeholder="Ask a question about your civic data..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button id="ask-btn" className="ask-btn" onClick={handleAsk} disabled={loading || !question.trim()}>
          {loading ? 'Thinking...' : '🚀 Ask'}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="loading-area">
          <div className="spinner" />
          <span>Querying the knowledge graph and generating answer...</span>
        </div>
      )}

      {/* Error */}
      {error && <div className="error-block">❌ {error}</div>}

      {/* Results */}
      {result && (
        <div className="results-area">
          {/* Answer */}
          <div className="answer-card">
            <h4>💡 Answer</h4>
            {result.answer}
          </div>

          {/* Cypher */}
          <div className="cypher-card">
            <h4>Generated Cypher</h4>
            <pre>{result.cypher}</pre>
          </div>

          {/* Graph Visualization */}
          <div className="graph-section">
            <h4>🔗 Graph Visualization</h4>
            {result.graph?.nodes?.length > 0 ? (
              <div className="graph-container" ref={graphRef} />
            ) : (
              <div className="graph-empty">No graph data to visualize for this query.</div>
            )}
          </div>

          {/* Data Table */}
          {result.data?.length > 0 && (
            <div className="data-section">
              <h4>📊 Query Results</h4>
              <div className="result-table-wrapper">
                <table className="result-table">
                  <thead>
                    <tr>
                      {columns.map((col) => (
                        <th key={col}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.data.map((row, i) => (
                      <tr key={i}>
                        {columns.map((col) => (
                          <td key={col}>
                            {typeof row[col] === 'object'
                              ? JSON.stringify(row[col])
                              : String(row[col] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AskPanel;
