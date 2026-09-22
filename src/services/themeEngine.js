import { transcripts } from "../data";

const THEME_RULES = [
  { id: "adoption", label: "Adoption & growth", keywords: ["adoption", "growth", "uptake", "demand"] },
  { id: "cost", label: "Cost & economics", keywords: ["cost", "price", "budget", "funding", "reimbursement", "economic"] },
  { id: "training", label: "Training & clinical capability", keywords: ["training", "surgeon", "clinical", "learning", "outcomes"] },
  { id: "purchasing", label: "Purchasing & decision-making", keywords: ["purchasing", "purchase", "decision", "hospital", "procurement"] },
  { id: "competition", label: "Competition & alternatives", keywords: ["competition", "competitor", "alternative", "incumbent"] },
];

function matchesTheme(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.some(keyword => lower.includes(keyword));
}

export function analyzeThemes() {
  return THEME_RULES.map(theme => {
    const sources = transcripts.flatMap(expert => expert.segments.filter(segment => matchesTheme(segment.text, theme.keywords)).map(segment => ({ expert, segment })));
    const experts = [...new Set(sources.map(source => source.expert.id))];
    return { ...theme, sources, expertCount: experts.length, coverage: `${experts.length}/${transcripts.length}` };
  }).filter(theme => theme.sources.length > 0).sort((a, b) => b.sources.length - a.sources.length);
}

export function analyzeDisagreements() {
  const themes = analyzeThemes();
  return themes.map(theme => {
    const byExpert = transcripts.map(expert => ({ expert, sources: theme.sources.filter(source => source.expert.id === expert.id) })).filter(item => item.sources.length > 0);
    return { ...theme, byExpert, requiresReview: byExpert.length > 1 };
  }).filter(theme => theme.requiresReview);
}

export function getThemeSummary() {
  return { themes: analyzeThemes(), disagreements: analyzeDisagreements(), expertCount: transcripts.length };
}
