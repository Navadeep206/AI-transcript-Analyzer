export const aiConfig = {
  provider: "Gemini",
  model: "Gemini 2.5 Flash",
  mode: "grounded-evidence",
  apiConfigured: Boolean(import.meta.env.VITE_AI_API_URL),
};
