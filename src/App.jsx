import { FileText, MessageSquare, Sparkles, Users } from "lucide-react";
import "./App.css";

const stats = [
  ["Expert Calls", "3", "Transcripts to analyze"],
  ["Interview Questions", "6", "Guide questions"],
  ["AI Analysis", "Ready", "Evidence-grounded workflow"],
];

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Sparkles size={18} /></div>
          <div>
            <strong>Hasamex AI</strong>
            <span>Expert Intelligence</span>
          </div>
        </div>

        <nav className="navigation" aria-label="Primary navigation">
          <button className="nav-item active"><FileText size={17} /> Dashboard</button>
          <button className="nav-item"><Users size={17} /> Expert Calls</button>
          <button className="nav-item"><MessageSquare size={17} /> Ask AI</button>
        </nav>

        <div className="sidebar-footer">
          <span>AI Transcript Analyzer</span>
          <small>Phase 1 · Foundation</small>
        </div>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">HASAMEX CASE STUDY</p>
            <h1>Expert Call Intelligence</h1>
            <p className="subtitle">Analyze expert interviews with evidence-backed AI insights.</p>
          </div>
          <div className="status-pill"><span /> System Ready</div>
        </header>

        <section className="stats-grid" aria-label="Project statistics">
          {stats.map(([label, value, detail]) => (
            <article className="stat-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{detail}</small>
            </article>
          ))}
        </section>

        <section className="welcome-card">
          <div className="welcome-icon"><Sparkles size={25} /></div>
          <div>
            <p className="eyebrow">RESEARCH WORKSPACE</p>
            <h2>Evidence-first expert research</h2>
            <p>
              This application will analyze three expert-call transcripts, answer the interview guide,
              extract exact quotes with timestamps, identify common themes and differences, and support
              questions across all interviews.
            </p>
            <div className="feature-list">
              <span>✓ Evidence-backed answers</span>
              <span>✓ Exact transcript quotes</span>
              <span>✓ Timestamp citations</span>
              <span>✓ Cross-call analysis</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
