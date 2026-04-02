'use client';

// ─────────────────────────────────────────────────────────────────────────────
// TODO: Team Collaborator — AI Chatbot Page
//
// This page renders a conversational chat UI that helps users find the right
// phone through natural language questions and AI responses.
//
// Suggested implementation steps:
//  1. Set up an LLM API (e.g. Google Gemini, OpenAI GPT) via app/api/ route
//  2. Build a chat bubble UI (alternating user + assistant messages)
//  3. Maintain a conversation history in useState
//  4. Extract user preferences from the conversation
//  5. Optionally call getRecommendations() from '@/src/utils/engine.js' at the
//     end to surface the top 3 matching phones inside the chat
//
// You can add your API key to a .env.local file:
//   GEMINI_API_KEY=your_key_here
//   OPENAI_API_KEY=your_key_here
// ─────────────────────────────────────────────────────────────────────────────

export default function Chatbot() {
  return (
    <main style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '16px',
      padding: '40px 24px',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '48px 40px',
        textAlign: 'center',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 4px 32px rgba(37,99,235,0.08)',
        border: '1px solid rgba(37,99,235,0.1)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
        <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#0a1628', marginBottom: '12px' }}>
          AI Chatbot
        </h1>
        <p style={{ color: '#4a6080', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
          This page is reserved for your teammate to build the conversational AI phone advisor feature.
        </p>
        <div style={{
          background: 'rgba(37,99,235,0.05)',
          border: '1px dashed rgba(37,99,235,0.25)',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '0.82rem',
          color: '#2563eb',
          fontFamily: 'monospace',
          textAlign: 'left',
          lineHeight: 1.6,
        }}>
          // TODO: Team Collaborator<br />
          // Insert AI Chatbot logic here
        </div>
      </div>
    </main>
  );
}
