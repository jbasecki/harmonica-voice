'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '18'; // Updated to your preferred Leaf Vibe
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const wordsArray = tiles.split(/[ ,]+/).filter(Boolean).map(word => {
    const first = word[0].toUpperCase();
    const oneBeforeLast = word.length > 1 ? word[word.length - 2].toUpperCase() : first;
    return { first, oneBeforeLast };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '15vh' }}>
        <h1 style={{ color: '#D4AF37', letterSpacing: '20px', fontSize: '3rem', fontWeight: 'normal', marginBottom: '10vh' }}>HARMONICA</h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '1000px' }}>
          {wordsArray.map((w, i) => (
            <div key={i} style={{ display: 'flex', boxShadow: '0 0 50px rgba(212, 175, 55, 0.5)', borderRadius: '10px', overflow: 'hidden' }}>
              <img src={`${bucketUrl}/${w.first}.png`} alt={w.first} style={{ width: '200px', height: '200px' }} />
              <img src={`${bucketUrl}/${w.oneBeforeLast}.png`} alt={w.oneBeforeLast} style={{ width: '200px', height: '200px' }} />
            </div>
          ))}
        </div>
        <p style={{ color: '#D4AF37', marginTop: '60px', opacity: 0.6, letterSpacing: '4px' }}>A GIFT OF STASHED COGNITION</p>
      </div>
    </main>
  );
}

export default function OpenPage() {
  return (
    <Suspense fallback={<div style={{ color: '#D4AF37', textAlign: 'center', marginTop: '30vh' }}>UNFOLDING YOUR HARMONICA...</div>}>
      <OpenContent />
    </Suspense>
  );
}
