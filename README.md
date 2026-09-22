# Hasamex AI Transcript Analyzer

An evidence-first React application for analyzing three expert-call transcripts for the Hasamex AI Engineer technical case study.

## Requirements covered

- Answer interview-guide questions for each expert
- Extract exact quotes
- Preserve supporting timestamps
- Identify common themes and potential differences
- Ask questions across all transcripts
- Keep important answers traceable to transcript evidence

## Architecture

```text
React UI
  |
  +--> Case-pack data
  +--> Evidence retrieval engine
  |       +--> ranked transcript segments
  |       +--> source metadata
  |
  +--> Gemini AI service interface
  |       +--> grounded context
  |       +--> answer + citations
  |
  +--> Answer validation / hallucination guard
```

## Tech stack

- React + Vite
- JavaScript
- Lucide React
- Gemini 2.5 Flash integration interface

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## AI configuration

The frontend does not store an API key. Configure the backend URL through:

```env
VITE_AI_API_URL=http://localhost:5000
```

The backend should expose:

```text
POST /api/ai/answer
```

with `question` and grounded `context` in the request body.

## Grounding strategy

The application retrieves relevant transcript segments before asking the model to synthesize an answer. Source records retain expert, market, timestamp, and exact quote. If evidence is missing or an answer cannot be validated against the supplied sources, the application refuses to present it as a reliable claim.

## Scaling to 30+ calls

1. Transcript ingestion and normalization
2. Chunking with stable source IDs
3. Embeddings/vector search for semantic retrieval
4. Metadata filters by market, expert, date, or project
5. Reranking before LLM generation
6. Cached embeddings and model responses
7. Evaluation sets for retrieval and citation accuracy

## Demo flow

1. Dashboard — show the three calls and case-pack scope.
2. Expert Calls — search a transcript and open an exact timestamped source.
3. Interview Guide — select a question and inspect supporting excerpts.
4. Ask AI — ask a cross-transcript question and show citations.
5. Themes — compare recurring evidence across experts.
6. Explain grounding, validation, and scaling decisions.

## Important

The Gemini integration is separated from the frontend and requires a backend endpoint. Never commit a Gemini API key to the repository.
