import React from 'react';

const AboutPanel = () => {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', paddingBottom: 40 }}>
      {/* ── Header ── */}
      <div className="card card-dark" style={{ padding: '40px 32px' }}>
        <div style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '0.05em', color: 'var(--white)', marginBottom: 16 }}>
            SYSTEM OVERVIEW : CIVIX AI
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.9, letterSpacing: '-0.01em' }}>
            The <strong>National Intelligence Booth Management System</strong> is a dedicated digital secretariat. 
            It is designed to ingest static voter rolls, geographic markers, and active complaint streams, 
            transforming them into a dynamic, hyper-local Knowledge Graph for predictive risk modeling.
          </p>
        </div>
      </div>

      {/* ── Architecture Split Section ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        
        {/* Left Col: Text & Capabilities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Platform Architecture</h3>
            <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 20 }}>
              At the core of CIVIX AI lies a Neo4j-powered Graph Intelligence layer. 
              By mapping entities rather than just rows—Voters, Booths, Geographies, and Incidents—the system 
              can detect spatial relationships and systemic risk indicators that traditional SQL databases miss.
            </p>
            <div className="summary-stats">
              <div className="summary-row">
                <span className="summary-label">Compute Engine</span>
                <span className="summary-value">Graph Neural Network (GNN)</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Ingestion Pipeline</span>
                <span className="summary-value">Real-time Kafka Streams</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Data Redundancy</span>
                <span className="summary-value badge badge-low">Tier 3 Active</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Core Capabilities</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <CapabilityRow num="1" title="Real-time Risk Analytics" desc="Continuous monitoring of booth vulnerability scores based on historical and real-time incident data." />
              <CapabilityRow num="2" title="Graph-based Insights" desc="Identifies hidden clustering of complaints and malicious actors across administrative boundaries." />
              <CapabilityRow num="3" title="Automated Complaint Triage" desc="Natural Language Processing (NLP) categorizes and prioritizes citizen reports instantly." />
              <CapabilityRow num="4" title="Resource Allocation AI" desc="Predictive modeling to deploy security and administrative personnel exactly where needed." />
            </div>
          </div>
        </div>

        {/* Right Col: Knowledge Graph Image */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--gray-200)', background: 'var(--gray-50)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--gray-600)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Visualization : Topology Map
            </span>
            <span className="badge badge-med">CLASSIFIED</span>
          </div>
          <div style={{ flex: 1, background: 'var(--blue-600)', position: 'relative' }}>
            <img 
              src="/kg_bg.png" 
              alt="Knowledge Graph Visualization" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </div>
        </div>

      </div>

      {/* ── Predictive Analytics Image Section ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: 24 }}>
        
        {/* Security / Clearance Col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="card card-dark">
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
              Predictive Risk Engine
            </h3>
            <p style={{ fontSize: 13, color: 'var(--blue-100)', lineHeight: 1.6, marginBottom: 16 }}>
              The Risk Engine fuses topological mapping with real-time heuristic evaluations. 
              Hotspots are identified via predictive anomaly detection before situations escalate.
            </p>
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.1)', padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: 'var(--gray-400)', letterSpacing: '0.05em' }}>ENGINE STATUS</span>
                <span style={{ fontSize: 11, color: 'var(--green-500)', fontWeight: 800 }}>ONLINE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--gray-400)', letterSpacing: '0.05em' }}>PREDICTION CONFIDENCE</span>
                <span style={{ fontSize: 11, color: 'var(--amber-500)', fontWeight: 800 }}>94.2%</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ border: '1px solid var(--gray-200)', flex: 1 }}>
            <h3 style={{ color: 'var(--gray-900)' }}>Security & Compliance</h3>
            <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 16 }}>
              All node traversals and heuristic evaluations run within air-gapped security perimeters. 
              Audit logs are cryptographically sealed.
            </p>
            <div style={{ background: 'var(--red-50)', border: '1px solid var(--red-100)', padding: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--red-500)', letterSpacing: '0.05em', marginBottom: 4 }}>AUTHORIZATION LEVEL</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--gray-900)' }}>CLEARANCE_04 REQUIRED</div>
            </div>
          </div>
        </div>

        {/* Risk Image */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', minHeight: 400 }}>
          <img 
            src="/risk_bg.png" 
            alt="Risk Analytics Engine" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
          />
        </div>

      </div>

    </div>
  );
};

/* ── Helper Component for Capabilities ── */
function CapabilityRow({ num, title, desc }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, paddingBottom: 12, borderBottom: '1px solid var(--gray-100)' }}>
      <div style={{ 
        background: 'var(--amber-50)', 
        color: 'var(--amber-500)', 
        minWidth: 24, 
        height: 24, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: 11, 
        fontWeight: 800 
      }}>
        {num}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
}

export default AboutPanel;
