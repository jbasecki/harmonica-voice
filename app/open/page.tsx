'use client';
import React, { Suspense, useState } from 'react';
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

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '10vh' }}>
        <h1 style={{ color: '#D4AF37', letterSpacing: '20px', fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '8vh', textAlign: 'center' }}>HARMONICA</h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', maxWidth: '1100px' }}>
          {wordsArray.map((w, i) => (
            <div key={i} className="tile-container" style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ display: 'flex', boxShadow: '0 0 50px rgba(212, 175, 55, 0.3)', borderRadius: '12px', overflow: 'hidden', border: '1px solid #D4AF37', background: 'rgba(0,0,0,0.8)' }}>
                <img src={`${bucketUrl}/${w.first}.png`} style={{ width: 'clamp(100px, 20vw, 150px)', height: 'auto', objectFit: 'cover' }} alt="" />
                <img src={`${bucketUrl}/${w.oneBeforeLast}.png`} style={{ width: 'clamp(100px, 20vw, 150px)', height: 'auto', objectFit: 'cover' }} alt="" />
              </div>
              
              {/* THE SECRET REVEAL LABEL */}
              <p className="secret-label" style={{ 
                color: '#D4AF37', marginTop: '20px', letterSpacing: '5px', fontSize: '1rem', 
                fontWeight: 'bold', opacity: 0, transition: 'opacity 0.5s ease', transform: 'translateY(10px)'
              }}>
                {w.original}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tile-container:hover .secret-label {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @media (max-width: 768px) {
          .secret-label { opacity: 0.3; } /* Hint on mobile */
        }
      `}</style>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense><OpenContent /></Suspense>;
}
