'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function OrbContent() {
  const searchParams = useSearchParams();
  const [currentVibe, setCurrentVibe] = useState(searchParams.get('vibe') || '14');
  const message = searchParams.get('message') || '';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // Suggested vibes based on common gift themes
  const suggestedVibes = [
    { id: '1', name: 'Sanctuary' },
    { id: '8', name: 'Golden' },
    { id: '12', name: 'Playful' }
  ];

  const wordsArray = decodeURIComponent(tiles).split(',').filter(Boolean).map(word => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const first = clean[0] || 'A';
    const oneBeforeLast = clean.length > 1 ? clean[clean.length - 2] : first;
    return { original: word.toUpperCase(), first, oneBeforeLast };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      {/* THE LIVE BACKGROUND: Changes instantly when a new vibe is clicked */}
      <video key={currentVibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}>
        <source src={`${bucketUrl}/${currentVibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '6vh' }}>
        <div style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '40px', padding: '30px', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.2)' }}>
          <p style={{ color: '#D4AF37', fontSize: '1.6rem', fontStyle: 'italic' }}>{decodeURIComponent(message.replace(/\+/g, ' '))}</p>
        </div>

        {/* 1. ATMOSPHERE REFINEMENT: The new "decision making" moment */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <p style={{ color: '#D4AF37', letterSpacing: '3px', fontSize: '0.7rem', marginBottom: '15px', opacity: 0.8 }}>CHOOSE THE FINAL ATMOSPHERE</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            {suggestedVibes.map((v) => (
              <button 
                key={v.id}
                onClick={() => setCurrentVibe(v.id)}
                style={{ padding: '10px 20px', background: currentVibe === v.id ? '#D4AF37' : 'transparent', color: currentVibe === v.id ? '#000' : '#D4AF37', border: '1px solid #D4AF37', borderRadius: '5px', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '2px', transition: '0.3s' }}>
                {v.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        {/* 2. THE ART PREVIEW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', width: '100%', maxWidth: '1000px', justifyItems: 'center', marginBottom: '60px' }}>
          {wordsArray.map((w, i) => (
            <div key={i} style={{ display: 'flex', border: '1px solid #D4AF37', borderRadius: '15px', overflow: 'hidden', background: 'rgba(0,0,0,0.8)' }}>
              <img src={`${bucketUrl}/${w.first}5.png`} style={{ width: '80px', height: '110px', objectFit: 'cover' }} />
              <img src={`${bucketUrl}/${w.oneBeforeLast}5.png`} style={{ width: '80px', height: '110px', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        {/* 3. SEAL & SHARE: Now packs the NEWLY chosen vibe */}
        <button 
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            params.set('vibe', currentVibe); // Update to the refined vibe
            window.location.href = `/open?${params.toString()}`;
          }}
          style={{ padding: '18px 70px', border: '1px solid #D4AF37', color: '#D4AF37', background: 'transparent', letterSpacing: '5px', cursor: 'pointer', borderRadius: '50px', fontWeight: 'bold' }}>
          SEAL & SHARE GIFT
        </button>
      </div>
    </main>
  );
}

export default function OrbPage() { return <Suspense><OrbContent /></Suspense>; }
