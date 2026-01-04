'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const wordsArray = decodeURIComponent(tiles).split(',').filter(Boolean).map(word => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    const first = cleanWord[0] || 'a';
    const oneBeforeLast = cleanWord.length > 1 ? cleanWord[cleanWord.length - 2] : first;
    return { original: word.toUpperCase(), first, oneBeforeLast };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflowX: 'hidden' }}>
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '15vh' }}>
        <h1 style={{ color: '#D4AF37', letterSpacing: '20px', fontSize: '3.5rem', fontWeight: 'normal', marginBottom: '10vh', textAlign: 'center' }}>HARMONICA</h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap', maxWidth: '1100px' }}>
          {wordsArray.map((w, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', boxShadow: '0 0 60px rgba(212, 175, 55, 0.5)', borderRadius: '12px', overflow: 'hidden', border: '1px solid #D4AF37', background: 'rgba(0,0,0,0.8)' }}>
                <img src={`${bucketUrl}/${w.first}.png`} style={{ width: '150px', height: '210px', objectFit: 'cover' }} alt={w.first} />
                <img src={`${bucketUrl}/${w.oneBeforeLast}.png`} style={{ width: '150px', height: '210px', objectFit: 'cover' }} alt={w.oneBeforeLast} />
              </div>
              {/* RESTORED LABEL */}
              <p style={{ color: '#D4AF37', marginTop: '20px', letterSpacing: '5px', fontSize: '1rem', fontWeight: 'bold' }}>{w.original}</p>
            </div>
          ))}
        </div>
        <p style={{ color: '#D4AF37', marginTop: '80px', opacity: 0.5, letterSpacing: '6px', fontSize: '0.7rem' }}>A GIFT OF STASHED COGNITION</p>
      </div>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense><OpenContent /></Suspense>;
}
