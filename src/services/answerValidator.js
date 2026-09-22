import { retrieveEvidence } from "./evidenceEngine";

export function validateAnswer(answer, citations = []) {
  const text = String(answer || "").trim();
  if (!text) return { valid: false, reason: "EMPTY_ANSWER", unsupportedClaims: [] };
  if (!citations.length) return { valid: false, reason: "NO_EVIDENCE", unsupportedClaims: [] };

  const sourceText = citations.map(c => c.segment?.text || c.quote || "").join(" ").toLowerCase();
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const unsupportedClaims = sentences.filter(sentence => {
    const words = sentence.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(w => w.length > 4);
    const supportedWords = words.filter(word => sourceText.includes(word));
    return words.length >= 4 && supportedWords.length / words.length < 0.25;
  });

  return {
    valid: unsupportedClaims.length === 0,
    reason: unsupportedClaims.length ? "POTENTIAL_UNSUPPORTED_CLAIM" : "GROUNDED",
    unsupportedClaims,
    evidenceCount: citations.length,
  };
}

export function validateQuestion(question) {
  const evidence = retrieveEvidence(question, 6);
  return {
    hasEvidence: evidence.length > 0,
    evidenceCount: evidence.length,
    evidence,
    message: evidence.length ? "Supporting transcript evidence found." : "No supporting evidence was found in the provided transcripts.",
  };
}

export function safeAnswer(question, answer, citations = []) {
  const validation = validateAnswer(answer, citations);
  if (!validation.valid) {
    return {
      answer: "I can't make a reliable claim from the provided transcripts without stronger supporting evidence.",
      citations,
      grounded: false,
      validation,
    };
  }
  return { answer, citations, grounded: true, validation };
}
