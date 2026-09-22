import { useMemo, useState } from "react";
import { BarChart3, BookOpen, FileText, MessageSquare, Sparkles, Users } from "lucide-react";
import { interviewGuide, transcripts } from "./data";
import "./App.css";

const stats = [
  ["Expert Calls", transcripts.length, "Markets represented"],
  ["Interview Questions", interviewGuide.length, "Questions in guide"],
  ["Evidence Segments", transcripts.reduce((n, t) => n + t.segments.length, 0), "Timestamped sources"],
];

function App() {
  const [active, setActive] = useState("dashboard");
  const [selectedExpert, setSelectedExpert] = useState("all");

  const visibleExperts = useMemo(
    () => selectedExpert === "all" ? transcripts : transcripts.filter((t) => t.id === selectedExpert),
    [selectedExpert],
  );

  const nav = [
    ["dashboard", "Dashboard", BarChart3],
    ["guide", "Interview Guide", BookOpen],
    ["calls", "Expert Calls", Users],
    ["ask", "Ask AI", MessageSquare],
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Sparkles size={18} /></div>
          <div><strong>Hasamex AI</strong><span>Expert Intelligence</span></div>
        </div>

        <nav className="navigation" aria-label="Primary navigation">
          {nav.map(([id, label, Icon]) => (
            <button key={id} className={`nav-item ${active === id ? "active" : ""}`} onClick={() => setActive(id)}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer"><span>AI Transcript Analyzer</span><small>Phase 3 · Dashboard</small></div>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">HASAMEX CASE STUDY</p>
            <h1>{active === "dashboard" ? "Expert Call Intelligence" : nav.find(([id]) => id === active)?.[1]}</h1>
            <p className="subtitle">Evidence-first analysis across three expert interviews.</p>
          </div>
          <div className="status-pill"><span /> {transcripts.length} calls loaded</div>
        </header>

        {active === "dashboard" && (
          <>
            <section className="stats-grid" aria-label="Project statistics">
              {stats.map(([label, value, detail]) => <article className="stat-card" key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>)}
            </section>
            <section className="workspace-grid">
              <div className="panel">
                <div className="panel-heading"><div><p className="eyebrow">CASE PACK</p><h2>Expert calls</h2></div><span className="count-badge">3 / 3</span></div>
                <div className="expert-list">
                  {transcripts.map((t) => <button key={t.id} className="expert-row" onClick={() => { setSelectedExpert(t.id); setActive("calls"); }}><div className="market-avatar">{t.market.slice(0, 2).toUpperCase()}</div><div><strong>{t.expert}</strong><span>{t.role} · {t.market}</span></div><b>View →</b></button>)}
                </div>
              </div>
              <div className="panel highlight-panel"><p className="eyebrow">INTERVIEW GUIDE</p><h2>Six questions ready for analysis</h2><p>Each question will eventually return an evidence-backed answer with exact quotes and timestamps.</p><button className="primary-button" onClick={() => setActive("guide")}>Open interview guide</button></div>
            </section>
          </>
        )}

        {active === "calls" && <CallsView experts={visibleExperts} selectedExpert={selectedExpert} setSelectedExpert={setSelectedExpert} />}
        {active === "guide" && <GuideView />}
        {active === "ask" && <AskPlaceholder />}
      </main>
    </div>
  );
}

function CallsView({ experts, selectedExpert, setSelectedExpert }) {
  return <section className="content-section"><div className="filter-row"><select value={selectedExpert} onChange={(e) => setSelectedExpert(e.target.value)}><option value="all">All experts</option>{transcripts.map((t) => <option key={t.id} value={t.id}>{t.market} · {t.expert}</option>)}</select><span>{experts.length} expert call{experts.length !== 1 ? "s" : ""}</span></div>{experts.map((t) => <article className="transcript-card" key={t.id}><div className="transcript-head"><div><p className="eyebrow">{t.market}</p><h2>{t.expert}</h2><span>{t.role}</span></div><span className="source-badge">{t.segments.length} evidence points</span></div><div className="segment-list">{t.segments.map((s) => <div className="segment" key={s.timestamp}><time>{s.timestamp}</time><p>{s.text}</p></div>)}</div></article>)}</section>;
}

function GuideView() {
  return <section className="guide-grid">{interviewGuide.map((item, index) => <article className="question-card" key={item.id}><span className="question-number">Q{index + 1}</span><div><p className="eyebrow">INTERVIEW GUIDE</p><h2>{item.question}</h2><div className="coming-soon"><Sparkles size={14} /> AI evidence analysis will appear here in Phase 5–7</div></div></article>)}</section>;
}

function AskPlaceholder() {
  return <section className="ask-card"><div className="ask-icon"><MessageSquare size={25} /></div><p className="eyebrow">CROSS-TRANSCRIPT RESEARCH</p><h2>Ask a question across all expert calls</h2><p>In a later phase, this workspace will retrieve supporting transcript evidence before generating an answer.</p><div className="ask-input"><input placeholder="e.g. What are the main barriers to adoption?" disabled /><button disabled>Ask AI</button></div></section>;
}

export default App;
