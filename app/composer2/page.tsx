'use client';
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

function Composer2Content() {
  const searchParams = useSearchParams();
  const [vibe, setVibe] = useState(searchParams.get('vibe') || '14');
  const message = searchParams.get('message') || '';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const videoRef = useRef<HTMLVideoElement>(null);

  // Path A: Home Menu choices
  const gallery = [
    { id: '1', name: 'SANCTUARY' },
    { id: '8', label: 'GOLDEN' },
    { id: '18', label: 'SNOWY' }
  ];

  useEffect(() => {
    if (videoRef.current) { videoRef.current.load(); }
  }, [vibe]);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      <video ref={videoRef} key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
        <h2 style={{ letterSpacing: '10px', fontSize: '0.8rem', marginBottom: '5vh' }}>CHAPTER II: THE CURATION</h2>
        
        <div style={{ background: 'rgba(0,0,0,0.7)', padding: '30px', borderRadius: '20px', border: '1px solid #333', textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.4rem' }}>"{decodeURIComponent(message.replace(/\+/g, ' '))}"</p>
        </div>

        {/* PATH A: THE GALLERY */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '20px' }}>RECONFIRM ATMOSPHERE</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            {gallery.map(v => (
              <button key={v.id} onClick={() => setVibe(v.id)} style={{ padding: '10px 20px', background: vibe === v.id ? '#D4AF37' : 'transparent', color: vibe === v.id ? '#000' : '#D4AF37', border: '1px solid #D4AF37', borderRadius: '5px', cursor: 'pointer' }}>
                {v.name || v.label}
              </button>
            ))}
          </div>
        </div>

        {/* PATH B: THE AI PROMPT */}
        <button style={{ padding: '15px 30px', border: '1px solid #D4AF37', background: 'transparent', color: '#D4AF37', borderRadius: '50px', cursor: 'not-allowed', opacity: 0.5, marginBottom: '60px' }}>
          ✨ ASK AI TO MATCH YOUR WORDS (COMING SOON)
        </button>

        <button 
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set('vibe', vibe);
            window.location.href = `/open?${params.toString()}`;
          }}
          style={{ padding: '20px 80px', background: '#D4AF37', color: '#000', borderRadius: '50px', fontWeight: 'bold', letterSpacing: '5px', cursor: 'pointer' }}>
          SEAL & SHARE FINAL GIFT
        </button>
      </div>
    </main>
  );
}

export default function Composer2Page() { return <Suspense><Composer2Content /></Suspense>; }
