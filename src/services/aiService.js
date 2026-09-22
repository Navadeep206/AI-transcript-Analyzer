import { buildGroundedContext } from "./evidenceEngine";

const API_URL = import.meta.env.VITE_AI_API_URL || "";

export async function generateGroundedAnswer(question) {
  const grounded = buildGroundedContext(question, 6);

  if (!grounded.evidence.length) {
    return {
      answer: "I could not find supporting evidence in the provided transcripts.",
      citations: [],
      grounded: false,
      context: grounded,
    };
  }

  if (!API_URL) {
    return {
      answer: "Evidence retrieved. Connect the Gemini API through the backend to generate the final synthesized answer.",
      citations: grounded.evidence,
      grounded: true,
      context: grounded,
    };
  }

  const response = await fetch(`${API_URL}/api/ai/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, context: grounded.context }),
  });

  if (!response.ok) throw new Error("AI service request failed");
  return response.json();
}

export const AI_SYSTEM_RULES = `
You are an evidence-grounded expert-call analyst.
Only use facts explicitly supported by the supplied transcript evidence.
Never invent names, numbers, quotes, timestamps, or conclusions.
When evidence is insufficient, say that the transcripts do not provide enough evidence.
Every material claim must reference one or more supplied source IDs.
Preserve exact transcript wording when presenting a quote.
`;
