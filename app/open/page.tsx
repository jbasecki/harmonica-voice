'use client';
import React, { Suspense, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14'; // CONTINUITY: Lock the chosen video
  const tiles = searchParams.get('tiles') || ''; // The secret icons
  const fullText = searchParams.get('message') || ''; // THE HERO: Your original English text
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const wordsArray = decodeURIComponent(tiles).split(',').filter(Boolean).map(word => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const first = clean[0] || 'A';
    const oneBeforeLast = clean.length > 1 ? clean[clean.length - 2] : first;
    return { original: word.toUpperCase(), first, oneBeforeLast };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      {/* BACKGROUND CONTINUITY: The video is always there now */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', paddingTop: '10vh' }}>
        
        {/* THE MAIN FOCUS: THE USER'S MESSAGE */}
        <div style={{ maxWidth: '700px', textAlign: 'center', marginBottom: '60px', padding: '40px', background: 'rgba(0,0,0,0.6)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)' }}>
          <p style={{ color: '#D4AF37', fontSize: '1.8rem', lineHeight: '1.6', letterSpacing: '2px', fontStyle: 'italic' }}>
            "{decodeURIComponent(fullText)}"
          </p>
        </div>

        {/* THE DECORATION: HARMONICA TILES */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', maxWidth: '1000px' }}>
          {wordsArray.map((w, i) => (
            <div key={i} className="group" style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', border: '1px solid #D4AF37', borderRadius: '10px', overflow: 'hidden', opacity: 0.8 }}>
                {/* Rule: First/One-Before-Last */}
                <img src={`${bucketUrl}/${w.first}5.png`} style={{ width: '80px', height: '110px', objectFit: 'cover' }} />
                <img src={`${bucketUrl}/${w.oneBeforeLast}5.png`} style={{ width: '80px', height: '110px', objectFit: 'cover' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function OpenPage() { return <Suspense><OpenContent /></Suspense>; }
