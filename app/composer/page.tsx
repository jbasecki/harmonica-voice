'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OrbContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // Split the words and keep their identities
  const wordsArray = decodeURIComponent(tiles).split(',').filter(Boolean).map(word => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    const first = cleanWord[0];
    const oneBeforeLast = cleanWord.length > 1 ? cleanWord[cleanWord.length - 2] : first;
    return { original: word.toUpperCase(), first, oneBeforeLast };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8vh' }}>
        <h2 style={{ color: '#D4AF37', letterSpacing: '12px', marginBottom: '6vh', fontSize: '1.5rem' }}>THE UNFOLDING</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', maxWidth: '1200px' }}>
          {wordsArray.map((w, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'flex', border: '2px solid #D4AF37', borderRadius: '15px', overflow: 'hidden', 
                boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)', background: 'rgba(0,0,0,0.8)' 
              }}>
                <img src={`${bucketUrl}/${w.first}.png`} style={{ width: '130px', height: '180px', objectFit: 'cover' }} alt="" />
                <img src={`${bucketUrl}/${w.oneBeforeLast}.png`} style={{ width: '130px', height: '180px', objectFit: 'cover' }} alt="" />
              </div>
              {/* THE IDENTITY LABEL */}
              <p style={{ color: '#D4AF37', marginTop: '15px', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{w.original}</p>
            </div>
          ))}
        </div>

        <button onClick={() => window.location.href = `/open?vibe=${vibe}&tiles=${encodeURIComponent(tiles)}`}
          style={{ marginTop: '8vh', padding: '15px 60px', border: '1px solid #D4AF37', color: '#D4AF37', background: 'transparent', letterSpacing: '5px', cursor: 'pointer', borderRadius: '50px' }}>
          SEAL & SHARE
        </button>
      </div>
    </main>
  );
}

export default function OrbPage() {
  return <Suspense fallback={<div style={{color:'#D4AF37', textAlign:'center', marginTop:'30vh'}}>STASHING...</div>}><OrbContent /></Suspense>;
}
