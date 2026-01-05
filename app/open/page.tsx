'use client';
import React, { Suspense, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const [isMuted, setIsMuted] = useState(false);
  const vibe = searchParams.get('vibe') || '14'; 
  const message = searchParams.get('message') || '';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const wordsArray = decodeURIComponent(tiles).split(',').filter(Boolean).map(word => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const first = clean[0] || 'A';
    const oneBeforeLast = clean.length > 1 ? clean[clean.length - 2] : first;
    return { original: word.toUpperCase(), first, oneBeforeLast };
  });

  const copyGiftLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Gift Link Copied to Clipboard!");
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      
      {/* VIDEO FIX: Forced reload with 'key' */}
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

      <audio ref={audioRef} autoPlay loop muted={isMuted} src={`${bucketUrl}/ambient.mp3`} preload="auto" />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '10vh' }}>
        
        {/* THE HERO MESSAGE */}
        <div style={{ maxWidth: '750px', textAlign: 'center', marginBottom: '8vh', padding: '40px', background: 'rgba(0,0,0,0.7)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.4)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
          <p style={{ color: '#D4AF37', fontSize: '1.8rem', fontStyle: 'italic', lineHeight: '1.7' }}>
            "{decodeURIComponent(message.replace(/\+/g, ' '))}"
          </p>
        </div>

        {/* TILES GRID */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap', maxWidth: '1100px', marginBottom: '10vh' }}>
          {wordsArray.map((w, i) => (
            <div key={i} className="group" style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ display: 'flex', border: '1px solid #D4AF37', borderRadius: '12px', overflow: 'hidden', background: 'rgba(0,0,0,0.8)' }}>
                <img src={`${bucketUrl}/${w.first}5.png`} style={{ width: '90px', height: '130px', objectFit: 'cover' }} />
                <img src={`${bucketUrl}/${w.oneBeforeLast}5.png`} style={{ width: '90px', height: '130px', objectFit: 'cover' }} />
              </div>
              <p className="secret-label" style={{ color: '#D4AF37', marginTop: '15px', letterSpacing: '4px', fontSize: '0.8rem', opacity: 0, transition: '0.5s' }}>{w.original}</p>
            </div>
          ))}
        </div>

        {/* THE DONE PRODUCT: COPY BUTTON */}
        <button onClick={copyGiftLink} style={{ padding: '15px 40px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' }}>
          COPY GIFT LINK TO SHARE
        </button>
      </div>
      <style jsx>{` .group:hover .secret-label { opacity: 1 !important; } `}</style>
    </main>
  );
}

export default function OpenPage() { 
  return <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}><OpenContent /></Suspense>; 
}
