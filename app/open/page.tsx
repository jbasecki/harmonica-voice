'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // Rule: Extract First and One-Before-Last
  const wordsArray = decodeURIComponent(tiles).split(',').filter(Boolean).map(word => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    const first = cleanWord[0] || 'a';
    const oneBeforeLast = cleanWord.length > 1 ? cleanWord[cleanWord.length - 2] : first;
    return { original: word.toUpperCase(), first, oneBeforeLast };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '10vh' }}>
        <h1 style={{ color: '#D4AF37', letterSpacing: '20px', fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '8vh', textAlign: 'center' }}>HARMONICA</h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '40px', 
          width: '100%', 
          maxWidth: '1200px', 
          justifyItems: 'center' 
        }}>
          {wordsArray.map((w, i) => (
            <div key={i} className="group" style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ 
                display: 'flex', border: '2px solid #D4AF37', borderRadius: '15px', overflow: 'hidden', 
                boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)', background: 'rgba(0,0,0,0.8)' 
              }}>
                {/* LARGE TILES */}
                <img src={`${bucketUrl}/${w.first}.png`} style={{ width: '130px', height: '185px', objectFit: 'cover' }} alt="" />
                <img src={`${bucketUrl}/${w.oneBeforeLast}.png`} style={{ width: '130px', height: '185px', objectFit: 'cover' }} alt="" />
              </div>
              
              {/* SECRET REVEAL: Hidden until touch/hover */}
              <p className="opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ 
                color: '#D4AF37', marginTop: '15px', letterSpacing: '4px', fontSize: '0.9rem', fontWeight: 'bold' 
              }}>
                {w.original}
              </p>
            </div>
          ))}
        </div>
        <p style={{ color: '#D4AF37', marginTop: '80px', opacity: 0.4, letterSpacing: '6px', fontSize: '0.7rem' }}>A GIFT OF STASHED COGNITION</p>
      </div>

      <style jsx>{`
        .group:hover p { opacity: 1 !important; transform: translateY(0); }
        p { transform: translateY(10px); }
      `}</style>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense><OpenContent /></Suspense>;
}
