'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14';
  const [words, setWords] = useState('');

  const handleStash = () => {
    if (!words.trim()) return;
    // Move to the Cinematic Orb stage
    window.location.href = `/orb?vibe=${vibe}&tiles=${encodeURIComponent(words)}`;
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'gold', position: 'relative' }}>
      {/* Stripe Payment Corner */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', padding: '15px', border: '1px solid gold', fontSize: '0.7rem', opacity: 0.8 }}>
        PAYMENT SECURED BY STRIPE
      </div>

      <div style={{ padding: '10vh 20px', textAlign: 'center' }}>
        <h2 style={{ letterSpacing: '8px' }}>STASH COGNITION</h2>
        <input type="text" placeholder="ENTER YOUR MESSAGE..." value={words} onChange={(e) => setWords(e.target.value)}
          style={{ background: 'transparent', border: 'none', borderBottom: '1px solid gold', color: 'white', padding: '15px', width: '300px', textAlign: 'center', outline: 'none', marginTop: '40px' }} 
        />
        <br />
        <button onClick={handleStash} style={{ marginTop: '40px', padding: '15px 40px', border: '1px solid gold', color: 'gold', background: 'transparent', cursor: 'pointer' }}>
          CREATE HARMONICA
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() {
  return <Suspense><ComposerContent /></Suspense>;
}
