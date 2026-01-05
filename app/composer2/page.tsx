'use client';
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

function Composer2Content() {
  const searchParams = useSearchParams();
  const [vibe, setVibe] = useState(searchParams.get('vibe') || '14');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const message = searchParams.get('message') || '';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const videoRef = useRef<HTMLVideoElement>(null);

  // Gallery of confirmed atmospheres
  const gallery = [
    { id: '1', name: 'SANCTUARY' },
    { id: '8', name: 'GOLDEN' },
    { id: '18', name: 'SNOWY' }
  ];

  // Logic to trigger the AI visual prompt
  const triggerNanoBanana = () => {
    setIsAiLoading(true);
    // Future: Connect this to the actual Nano Banana API
    setTimeout(() => {
      setIsAiLoading(false);
      alert("Nano Banana Vision Drafted! (API connection pending)");
    }, 2500);
  };

  useEffect(() => {
    if (videoRef.current) { videoRef.current.load(); }
  }, [vibe]);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      
      {/* BACKGROUND CINEMA */}
      <video ref={videoRef} key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      {/* PIANO TRACK: The refined auditory layer */}
      <audio autoPlay loop src={`${bucketUrl}/piano.mp3`} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
        <h2 style={{ letterSpacing: '10px', fontSize: '0.8rem', marginBottom: '5vh', opacity: 0.6 }}>CHAPTER II: DYNAMIC VISION</h2>
        
        {/* THE MESSAGE PREVIEW */}
        <div style={{ background: 'rgba(0,0,0,0.7)', padding: '40px', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.3)', textAlign: 'center', marginBottom: '40px', maxWidth: '850px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.6rem', lineHeight: '1.6' }}>"{decodeURIComponent(message.replace(/\+/g, ' '))}"</p>
        </div>

        {/* CHOICE A: THE ESTABLISHED GALLERY */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '20px', opacity: 0.8 }}>PREVIEW ESTABLISHED ATMOSPHERE</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            {gallery.map(v => (
              <button key={v.id} onClick={() => setVibe(v.id)} style={{ padding: '12px 24px', background: vibe === v.id ? '#D4AF37' : 'transparent', color: vibe === v.id ? '#000' : '#D4AF37', border: '1px solid #D4AF37', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                {v.name}
              </button>
            ))}
          </div>
        </div>

        {/* CHOICE B: NANO BANANA AI PATHWAY */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
           <p style={{ fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '20px', opacity: 0.8 }}>OR ACTIVATE NANO BANANA VISION</p>
           <button 
             onClick={triggerNanoBanana}
             style={{ padding: '18px 40px', border: '1px solid #D4AF37', background: isAiLoading ? '#222' : 'rgba(212,175,55,0.1)', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>
             {isAiLoading ? '⌛ ANALYZING WORDS...' : '✨ GENERATE CUSTOM AI VIDEO'}
           </button>
           <p style={{ fontSize: '0.6rem', marginTop: '15px', opacity: 0.5 }}>
             Prompts will pull from your stashed tiles: {decodeURIComponent(tiles.split(',').slice(0, 2).join(', '))}...
           </p>
        </div>

        <button 
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set('vibe', vibe);
            window.location.href = `/open?${params.toString()}`;
          }}
          style={{ padding: '22px 100px', background: '#D4AF37', color: '#000', borderRadius: '50px', fontWeight: 'bold', letterSpacing: '8px', cursor: 'pointer' }}>
          SEAL & SHARE
        </button>
      </div>
    </main>
  );
}

// THIS DEFAULT EXPORT CLEARS THE BLOCKAGE
export default function Composer2Page() { 
  return <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }} />}><Composer2Content /></Suspense>; 
}
