'use client';
import React, { Suspense, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
export const metadata = {
  title: 'A Harmonica Message for You',
  description: 'You have received a secret visual gift.',
  openGraph: {
    title: 'Harmonica',
    description: 'Unfold a stashed cognition message.',
    images: [{ url: 'https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png' }],
  },
};

function OpenContent() {
  const searchParams = useSearchParams();
  const [isMuted, setIsMuted] = useState(false);
  const vibe = searchParams.get('vibe') || '14'; 
  const message = searchParams.get('message') || '';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Decoding logic for the secret harmonica abstracts
  const wordsArray = decodeURIComponent(tiles).split(',').filter(Boolean).map(word => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const first = clean[0] || 'A';
    const oneBeforeLast = clean.length > 1 ? clean[clean.length - 2] : first;
    return { original: word.toUpperCase(), first, oneBeforeLast };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      
      {/* VIDEO WAKE-UP FIX: The 'key' attribute forces the player to load */}
      <video 
        key={vibe} 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}
      >
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      {/* THE SANCTUARY VOICE: Ambient backdrop */}
      <audio ref={audioRef} autoPlay loop muted={isMuted} src={`${bucketUrl}/ambient.mp3`} preload="auto" />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '10vh' }}>
        <button 
          onClick={() => setIsMuted(!isMuted)} 
          style={{ position: 'absolute', top: '20px', right: '20px', border: '1px solid gold', background: 'none', color: 'gold', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', zIndex: 10 }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        
        {/* THE HERO MESSAGE: Your English heart */}
        <div style={{ maxWidth: '750px', textAlign: 'center', marginBottom: '8vh', padding: '40px', background: 'rgba(0,0,0,0.65)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
          <p style={{ color: '#D4AF37', fontSize: '1.8rem', fontStyle: 'italic', lineHeight: '1.7', letterSpacing: '1px' }}>
            "{decodeURIComponent(message.replace(/\+/g, ' '))}"
          </p>
        </div>

        <h2 style={{ color: '#D4AF37', letterSpacing: '15px', fontSize: '0.7rem', opacity: 0.5, marginBottom: '40px' }}>H A R M O N I C A</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', maxWidth: '1100px' }}>
          {wordsArray.map((w, i) => (
            <div key={i} className="group" style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ display: 'flex', border: '1px solid #D4AF37', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)', background: 'rgba(0,0,0,0.8)' }}>
                {/* LARGE ICONS: Uppercase letters with 5 suffix */}
                <img src={`${bucketUrl}/${w.first}5.png`} style={{ width: '90px', height: '130px', objectFit: 'cover' }} alt="" />
                <img src={`${bucketUrl}/${w.oneBeforeLast}5.png`} style={{ width: '90px', height: '130px', objectFit: 'cover' }} alt="" />
              </div>
              <p className="secret-label" style={{ color: '#D4AF37', marginTop: '15px', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 'bold', opacity: 0, transition: '0.5s', transform: 'translateY(10px)' }}>
                {w.original}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{` .group:hover .secret-label { opacity: 1 !important; transform: translateY(0) !important; } `}</style>
    </main>
  );
}

export default function OpenPage() { return <Suspense><OpenContent /></Suspense>; }
