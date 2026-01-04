'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OrbContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const wordsArray = decodeURIComponent(tiles).split(',').filter(Boolean).map(word => {
    // FORCE UPPERCASE: To match your A5.png, K5.png bucket files
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const first = clean[0] || 'A';
    const oneBeforeLast = clean.length > 1 ? clean[clean.length - 2] : first;
    return { original: word.toUpperCase(), first, oneBeforeLast };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflowX: 'hidden' }}>
      {/* BACKGROUND CONTINUITY */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '8vh' }}>
        <h2 style={{ color: '#D4AF37', letterSpacing: '12px', marginBottom: '6vh', textAlign: 'center' }}>THE UNFOLDING</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', width: '100%', maxWidth: '1200px', justifyItems: 'center' }}>
          {wordsArray.map((w, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', border: '2px solid #D4AF37', borderRadius: '15px', overflow: 'hidden', background: 'rgba(0,0,0,0.8)' }}>
                {/* LARGE ICONS: Now strictly calling UpperCase + 5 */}
                <img src={`${bucketUrl}/${w.first}5.png`} style={{ width: '135px', height: '190px', objectFit: 'cover' }} />
                <img src={`${bucketUrl}/${w.oneBeforeLast}5.png`} style={{ width: '135px', height: '190px', objectFit: 'cover' }} />
              </div>
              <p style={{ color: '#D4AF37', marginTop: '15px', letterSpacing: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>{w.original}</p>
            </div>
          ))}
        </div>

        <button onClick={() => window.location.href = `/open?vibe=${vibe}&tiles=${encodeURIComponent(tiles)}`}
          style={{ marginTop: '8vh', padding: '15px 60px', border: '1px solid #D4AF37', color: '#D4AF37', background: 'transparent', letterSpacing: '5px', cursor: 'pointer', borderRadius: '50px', marginBottom: '50px' }}>
          SEAL & SHARE
        </button>
      </div>
    </main>
  );
}

export default function OrbPage() { return <Suspense><OrbContent /></Suspense>; }
