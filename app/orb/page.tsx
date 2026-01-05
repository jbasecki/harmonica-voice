'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function OrbContent() {
  const searchParams = useSearchParams();
  // 1. We keep track of the vibe choice locally so it reacts to your clicks
  const [currentVibe, setCurrentVibe] = useState(searchParams.get('vibe') || '14');
  const message = searchParams.get('message') || '';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // 2. Map your buttons to your actual bucket files
  const vibesMenu = [
    { id: '1', label: 'SANCTUARY' },
    { id: '8', label: 'GOLDEN' },
    { id: '12', label: 'PLAYFUL' }
  ];

  const wordsArray = decodeURIComponent(tiles).split(',').filter(Boolean).map(word => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const first = clean[0] || 'A';
    const oneBeforeLast = clean.length > 1 ? clean[clean.length - 2] : first;
    return { original: word.toUpperCase(), first, oneBeforeLast };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      
      {/* 3. THE KEY FIX: key={currentVibe} forces the video to refresh on click */}
      <video 
        key={currentVibe} 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}
      >
        <source src={`${bucketUrl}/${currentVibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '6vh' }}>
        <div style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '40px', padding: '30px', background: 'rgba(0,0,0,0.6)', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.2)' }}>
          <p style={{ color: '#D4AF37', fontSize: '1.6rem', fontStyle: 'italic' }}>
            {decodeURIComponent(message.replace(/\+/g, ' '))}
          </p>
        </div>

        {/* 4. THE INTERACTIVE MENU: Sets the new vibe */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h3 style={{ color: '#D4AF37', letterSpacing: '8px', fontSize: '0.7rem', marginBottom: '20px', opacity: 0.7 }}>CHOOSE THE FINAL ATMOSPHERE</h3>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            {vibesMenu.map((v) => (
              <button 
                key={v.id}
                onClick={() => setCurrentVibe(v.id)}
                style={{ padding: '12px 25px', background: currentVibe === v.id ? '#D4AF37' : 'transparent', color: currentVibe === v.id ? '#000' : '#D4AF37', border: '1px solid #D4AF37', borderRadius: '5px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
                {v.label}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', maxWidth: '1000px', marginBottom: '60px' }}>
          {wordsArray.map((w, i) => (
            <div key={i} style={{ display: 'flex', border: '1px solid #D4AF37', borderRadius: '15px', overflow: 'hidden', background: 'rgba(0,0,0,0.8)' }}>
              <img src={`${bucketUrl}/${w.first}5.png`} style={{ width: '90px', height: '130px', objectFit: 'cover' }} />
              <img src={`${bucketUrl}/${w.oneBeforeLast}5.png`} style={{ width: '90px', height: '130px', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            params.set('vibe', currentVibe);
            window.location.href = `/open?${params.toString()}`;
          }}
          style={{ padding: '20px 80px', border: '1px solid #D4AF37', color: '#D4AF37', background: 'transparent', letterSpacing: '5px', cursor: 'pointer', borderRadius: '50px', fontWeight: 'bold' }}>
          SEAL & SHARE GIFT
        </button>
      </div>
    </main>
  );
}

export default function OrbPage() { return <Suspense><OrbContent /></Suspense>; }
