'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OrbContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // The Harmonica Rule: First and One-Before-Last letter of every word
  const wordsArray = tiles.split(/[ ,]+/).filter(Boolean).map(word => {
    const first = word[0].toUpperCase();
    const oneBeforeLast = word.length > 1 ? word[word.length - 2].toUpperCase() : first;
    return { first, oneBeforeLast };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      {/* Background Vibe */}
      <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10vh' }}>
        <h2 style={{ color: '#D4AF37', letterSpacing: '12px', marginBottom: '8vh' }}>THE UNFOLDING</h2>
        
        {/* THE HARMONICA TILES */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', maxWidth: '1200px' }}>
          {wordsArray.map((w, i) => (
            <div key={i} style={{ 
              display: 'flex', border: '2px solid #D4AF37', borderRadius: '15px', overflow: 'hidden', 
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)', background: 'rgba(0,0,0,0.8)' 
            }}>
              <img src={`${bucketUrl}/${w.first}.png`} alt={w.first} style={{ width: '150px', height: '150px' }} />
              <img src={`${bucketUrl}/${w.oneBeforeLast}.png`} alt={w.oneBeforeLast} style={{ width: '150px', height: '150px' }} />
            </div>
          ))}
        </div>

        <button onClick={() => window.location.href = `/open?vibe=${vibe}&tiles=${tiles}`}
          style={{ marginTop: '10vh', padding: '15px 50px', border: '1px solid #D4AF37', color: '#D4AF37', background: 'transparent', letterSpacing: '5px', cursor: 'pointer', borderRadius: '50px' }}>
          SEAL & SHARE
        </button>
      </div>
    </main>
  );
}

export default function OrbPage() {
  return (
    <Suspense fallback={<div style={{ color: '#D4AF37', textAlign: 'center', marginTop: '20vh' }}>STASHING COGNITION...</div>}>
      <OrbContent />
    </Suspense>
  );
}
