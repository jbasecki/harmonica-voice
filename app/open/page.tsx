'use client';
import React, { Suspense, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const [isMuted, setIsMuted] = useState(false);
  const vibe = searchParams.get('vibe') || '2'; // Restores chosen continuity
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const wordsArray = decodeURIComponent(tiles).split(',').filter(Boolean).map(word => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const first = clean[0] || 'A';
    const oneBeforeLast = clean.length > 1 ? clean[clean.length - 2] : first;
    return { original: word.toUpperCase(), first, oneBeforeLast };
  });

  const playSound = () => { if (!isMuted && audioRef.current) audioRef.current.play().catch(() => {}); };

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      {/* CONTINUITY FIX: Uses the vibe ID passed through the URL */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      {/* AUDIO SOURCE: Ensure reveal_chime.mp3 is in your bucket */}
      <audio ref={audioRef} src={`${bucketUrl}/reveal_chime.mp3`} preload="auto" />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '10vh' }}>
        <button onClick={() => setIsMuted(!isMuted)} style={{ position: 'absolute', top: '20px', right: '20px', border: '1px solid gold', background: 'none', color: 'gold', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 10 }}>{isMuted ? '🔇' : '🔊'}</button>
        
        <h1 style={{ color: '#D4AF37', letterSpacing: '20px', fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '8vh', textAlign: 'center' }}>HARMONICA</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', width: '100%', maxWidth: '1200px', justifyItems: 'center' }}>
          {wordsArray.map((w, i) => (
            <div key={i} className="group" onMouseEnter={playSound} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ display: 'flex', border: '2px solid #D4AF37', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)', background: 'rgba(0,0,0,0.8)' }}>
                {/* FIXED: Uses Uppercase to match your I5.png, B5.png bucket files */}
                <img src={`${bucketUrl}/${w.first}5.png`} style={{ width: '125px', height: '185px', objectFit: 'cover' }} />
                <img src={`${bucketUrl}/${w.oneBeforeLast}5.png`} style={{ width: '125px', height: '185px', objectFit: 'cover' }} />
              </div>
              <p className="secret-label" style={{ color: '#D4AF37', marginTop: '15px', letterSpacing: '4px', fontSize: '0.9rem', opacity: 0, transition: '0.5s', transform: 'translateY(10px)' }}>{w.original}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{` .group:hover .secret-label { opacity: 1 !important; transform: translateY(0) !important; } `}</style>
    </main>
  );
}

export default function OpenPage() { return <Suspense><OpenContent /></Suspense>; }
