import React, { useState } from 'react';
import {
  Home, MessageSquare, Plus, Send, Settings, Search,
  CheckCircle2, Clock, ShieldAlert, ClipboardList, Users, Database, ArrowLeft
} from 'lucide-react';

export default function App() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');

  // Dashboard Logic
  const [voterFile, setVoterFile] = useState(null);
  const [complaintFile, setComplaintFile] = useState(null);
  const [boothId, setBoothId] = useState('');
  const [showBoothResults, setShowBoothResults] = useState(false);

  // Complaints/Graph Page Logic
  const [query, setQuery] = useState('');
  const [hasGraphSearched, setHasGraphSearched] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans text-slate-900">

      {/* LEFT SIDEBAR */}
      <div
        onMouseEnter={() => setLeftOpen(true)}
        onMouseLeave={() => setLeftOpen(false)}
        className={`relative h-full bg-white border-r border-slate-100 transition-all duration-300 flex flex-col justify-between z-30 ${leftOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="flex flex-col w-full pt-6">
          <div className="px-6 mb-8 font-black text-blue-600 tracking-tighter text-xl uppercase italic">
            {leftOpen ? 'Civix AI' : 'CX'}
          </div>
          <nav className="flex flex-col px-3 gap-2">
            <NavItem icon={<Home size={22} />} label="HOME" active={activePage === 'home'} isOpen={leftOpen} onClick={() => setActivePage('home')} />
            <NavItem icon={<ClipboardList size={22} />} label="COMPLAINTS" active={activePage === 'complaints'} isOpen={leftOpen} onClick={() => setActivePage('complaints')} />
            <NavItem icon={<Database size={22} />} label="ANALYTICS" isOpen={leftOpen} />
          </nav>
        </div>
        <div className="px-3 pb-8 text-slate-300">
          <NavItem icon={<Settings size={22} />} label="SETTINGS" isOpen={leftOpen} />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto transition-all duration-300">

        {activePage === 'home' ? (
          /* --- HOME PAGE (MATCHING SCREENSHOT) --- */
          <div className="p-6 flex flex-col gap-6 animate-in fade-in duration-500">
            {/* 1. TOP STATS ROW */}
            <div className="grid grid-cols-4 gap-4">
              <MiniStat icon={<Users size={18} className="text-blue-500" />} label="TOTAL VOTERS" value="0" />
              <MiniStat icon={<ClipboardList size={18} className="text-orange-500" />} label="TOTAL COMPLAINTS" value="0" />
              <MiniStat icon={<CheckCircle2 size={18} className="text-green-500" />} label="RESOLVED" value="0" />
              <MiniStat icon={<Clock size={18} className="text-red-500" />} label="UNRESOLVED" value="0" />
            </div>

            {/* 2. UPLOAD PANEL HERO */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50 flex items-center justify-between">
              <div className="flex gap-12">
                <UploadCircle label="Voter Details" file={voterFile} onUpload={(e) => setVoterFile(e.target.files[0])} />
                <UploadCircle label="Complaints Data" file={complaintFile} onUpload={(e) => setComplaintFile(e.target.files[0])} />
              </div>
              <div className="max-w-[300px] text-left border-l pl-8 border-slate-100">
                <h2 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tighter leading-none">Upload PDF</h2>
                <p className="text-slate-400 text-[11px] leading-relaxed font-bold italic">
                  Upload voter and complaint PDFs to analyze booth data instantly.
                </p>
              </div>
            </div>

            {/* 3. SEARCH PANEL (Bottom) */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50 min-h-[400px] flex flex-col">
              <div className="max-w-md relative mb-10">
                <input
                  type="text"
                  placeholder="Search Booth ID..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                  onChange={(e) => { setBoothId(e.target.value); setShowBoothResults(e.target.value.length > 0) }}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              </div>

              {showBoothResults ? (
                <div className="flex gap-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="w-80 bg-[#1e293b] text-white rounded-[2.5rem] p-8 space-y-6 shadow-xl">
                    <MetricLine label="Total Complaints" value="12" />
                    <MetricLine label="Resolved" value="08" color="text-green-400" />
                    <MetricLine label="Unresolved" value="04" color="text-orange-400" />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                  <Database size={40} className="text-slate-100 mb-4" />
                  <p className="text-slate-300 font-bold text-sm tracking-tight italic">Waiting for Booth ID input...</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* --- COMPLAINTS PAGE (LLM & GRAPH INTELLIGENCE) --- */
          <div className="flex-1 flex flex-col p-6 gap-4 overflow-hidden animate-in slide-in-from-right-4 duration-500">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Ask a query (e.g., 'voters above age of 50')"
                  className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-medium text-sm outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => setHasGraphSearched(true)}
                className="bg-black text-white px-8 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
              >
                Ask
              </button>
            </div>

            {hasGraphSearched ? (
              <div className="flex-1 flex flex-col gap-4 overflow-hidden animate-in fade-in duration-500">
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Answer</span>
                  <p className="text-sm text-slate-600 leading-relaxed italic">The query returned 6 voters over 50 years of age in this constituency.</p>
                </div>
                <div className="bg-[#0a0a0a] rounded-xl p-4 flex items-center gap-4">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest pr-4 border-r border-slate-800">Cypher Query</span>
                  <code className="text-blue-400 font-mono text-xs">MATCH (v:Voter) WHERE v.age {">"} 50 RETURN v</code>
                </div>
                <div className="flex-1 flex gap-4 overflow-hidden">
                  <div className="flex-1 bg-white border border-slate-100 rounded-xl flex items-center justify-center relative shadow-sm overflow-hidden">
                    <svg width="400" height="300" className="opacity-80">
                      <circle cx="200" cy="150" r="25" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                      <circle cx="150" cy="80" r="20" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                      <circle cx="250" cy="80" r="20" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
                      <line x1="200" y1="150" x2="150" y2="80" stroke="#e2e8f0" />
                      <line x1="200" y1="150" x2="250" y2="80" stroke="#e2e8f0" />
                    </svg>
                  </div>
                  <div className="w-80 bg-white border border-slate-100 rounded-xl overflow-y-auto p-4 shadow-sm">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Results (6 rows)</span>
                    <div className="mt-4 space-y-2">
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs font-bold">Vikram Malhotra (55)</div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs font-bold">Suresh Kumar (62)</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center opacity-20">
                <Database size={64} className="mb-4" />
                <p className="font-bold tracking-tight">Run a query to generate the database graph</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT SIDEBAR */}
      <div
        onMouseEnter={() => setRightOpen(true)}
        onMouseLeave={() => setRightOpen(false)}
        className={`relative h-full bg-white border-l border-slate-100 transition-all duration-500 ease-in-out flex flex-col z-30 ${rightOpen ? 'w-80' : 'w-16'}`}
      >
        <div className={`flex items-center p-5 gap-4 transition-colors ${rightOpen ? 'bg-[#1e293b] text-white' : 'bg-white text-slate-400 justify-center h-20'}`}>
          <MessageSquare size={rightOpen ? 20 : 24} />
          {rightOpen && <span className="font-black text-[10px] uppercase tracking-[0.2em]">Assistant</span>}
        </div>
        <div className={`flex-1 p-6 flex flex-col justify-between transition-opacity duration-300 ${rightOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="bg-slate-50 p-5 rounded-3xl rounded-tl-none text-[11px] font-bold text-slate-500 border border-slate-100 shadow-sm">
            I can help you build queries for the Neo4j graph on the Complaints page.
          </div>
          <div className="flex gap-2 items-center">
            <input type="text" placeholder="Type..." className="bg-slate-50 flex-1 rounded-2xl px-4 py-4 text-xs border border-slate-100 outline-none font-bold text-slate-400 shadow-inner" disabled />
            <button className="bg-blue-600 text-white p-3.5 rounded-2xl active:scale-95 transition-transform"><Send size={18} /></button>
          </div>
        </div>
      </div>

    </div>
  );
}

/* --- HELPERS --- */

function MiniStat({ icon, label, value }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
      <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
      <div>
        <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest mb-1 leading-none">{label}</p>
        <p className="text-2xl font-black text-slate-800 leading-none">{value}</p>
      </div>
    </div>
  );
}

function UploadCircle({ label, file, onUpload }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <label className={`w-28 h-24 rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${file ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-100 hover:border-blue-400 text-slate-300'}`}>
        <Plus size={28} strokeWidth={3} />
        <input type="file" className="hidden" onChange={onUpload} />
      </label>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 w-28 text-center leading-none">{label}</span>
    </div>
  );
}

function MetricLine({ label, value, color = "text-white" }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-700/50 pb-3 last:border-0">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{label}</span>
      <span className={`text-xl font-black ${color} leading-none`}>{value}</span>
    </div>
  );
}

function NavItem({ icon, label, active, isOpen, onClick }) {
  return (
    <div onClick={onClick} className={`flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-200 ${active ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-50 hover:text-slate-900'} ${isOpen ? 'gap-4 px-6' : 'justify-center px-0'}`}>
      <div className="shrink-0">{icon}</div>
      {isOpen && <span className="font-black text-[10px] uppercase tracking-widest leading-none">{label}</span>}
    </div>
  );
}