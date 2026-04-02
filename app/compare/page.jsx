'use client';

// ─────────────────────────────────────────────────────────────────────────────
// TODO: Team Collaborator — Compare Page
//
// This page allows users to select 2 or 3 phones from the dataset and view
// a detailed side-by-side spec comparison table.
//
// Suggested implementation steps:
//  1. Import `phones` and `FEATURE_CONFIG` from '@/src/api/mobileData.js'
//  2. Add a search/dropdown UI for the user to select phones to compare
//  3. Render a comparison table with all 14 attributes as rows
//  4. Highlight the "best" value in each row (e.g. highest = green cell)
//  5. Add a "Clear" button to reset the selection
//
// You can use the existing CSS design tokens in app/globals.css for styling.
// ─────────────────────────────────────────────────────────────────────────────

export default function Compare() {
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
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
        <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#0a1628', marginBottom: '12px' }}>
          Compare Phones
        </h1>
        <p style={{ color: '#4a6080', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
          This page is reserved for your teammate to build the side-by-side phone comparison feature.
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
          // Insert Compare logic here
        </div>
      </div>
    </main>
  );
}
