import { transcripts } from "../data";

const STOP_WORDS = new Set([
  "what", "which", "where", "when", "does", "do", "the", "are", "and", "for", "from", "with", "about", "how", "would", "could", "should", "main", "your", "their", "this", "that", "into", "over", "next",
]);

function tokenize(value) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(word => word.length > 2 && !STOP_WORDS.has(word));
}

export function retrieveEvidence(query, limit = 8) {
  const queryTokens = [...new Set(tokenize(query))];
  if (!queryTokens.length) return [];

  return transcripts
    .flatMap(expert => expert.segments.map(segment => ({ expert, segment })))
    .map(item => {
      const text = item.segment.text.toLowerCase();
      const matched = queryTokens.filter(token => text.includes(token));
      const score = matched.length / queryTokens.length;
      return { ...item, score, matchedTokens: matched };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function buildGroundedContext(query, limit = 6) {
  const evidence = retrieveEvidence(query, limit);
  return {
    query,
    evidence,
    context: evidence.map((item, index) => (
      `[SOURCE ${index + 1}] ${item.expert.expert} | ${item.expert.market} | ${item.segment.timestamp}\n` +
      `QUOTE: "${item.segment.text}"`
    )).join("\n\n"),
  };
}

export function evidenceToCitation(item) {
  return {
    expert: item.expert.expert,
    market: item.expert.market,
    timestamp: item.segment.timestamp,
    quote: item.segment.text,
  };
}

export function hasSufficientEvidence(query) {
  return retrieveEvidence(query, 1).length > 0;
}
