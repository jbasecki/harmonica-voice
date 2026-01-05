'use client';
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

function Composer2Content() {
  const searchParams = useSearchParams();
  const [vibe, setVibe] = useState(searchParams.get('vibe') || '14');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const message = searchParams.get('message') || '';
  const tiles = searchParams.get('tiles') || '';
  const artist = searchParams.get('artist') || 'gold'; // From Chapter I Toggle
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. FILTER ENGINE: Transforms one set of images into many
  const artistFilters: Record<string, string> = {
    gold: 'none',
    silver: 'grayscale(100%) brightness(1.2) contrast(1.1) sepia(0.1)',
    noir: 'grayscale(100%) brightness(0.6) contrast(1.8)',
    rose: 'sepia(0.4) hue-rotate(290deg) brightness(1.1) contrast(1.2)'
  };

  const gallery = [{ id: '1', name: 'SANCTUARY' }, { id: '8', name: 'GOLDEN' }, { id: '18', name: 'SNOWY' }];

  const triggerNanoBanana = async () => {
    setIsAiLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3500));
    setIsAiLoading(false);
    alert("Nano Banana Vision Drafted. API link pending.");
  };

  useEffect(() => {
    if (videoRef.current) { videoRef.current.load(); }
  }, [vibe]);

  const selectedWords = tiles.split(',').filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      
      {/* ATMOSPHERIC MODALITY */}
      <video ref={videoRef} key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <audio autoPlay loop src={`${bucketUrl}/piano.mp3`} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
        <h2 style={{ letterSpacing: '10px', fontSize: '0.8rem', marginBottom: '5vh', opacity: 0.6 }}>CHAPTER II: DUAL MODALITY</h2>
        
        {/* PATENTED ARTISTIC MODALITY BOX */}
        <div style={{ background: 'rgba(212,175,55,0.05)', padding: '20px 40px', borderRadius: '15px', border: '1px solid rgba(212,175,55,0.2)', textAlign: 'center', marginBottom: '30px', maxWidth: '700px' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '3px', marginBottom: '10px', color: '#D4AF37' }}>ARTISTIC MODALITY: {artist.toUpperCase()}</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>"A patented cognitive stashing method. Your thought is preserved within abstract tiles, reflecting the structural resonance of the message."</p>
        </div>

        {/* TILES PREVIEW WITH FILTERS */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
            {selectedWords.slice(0, 3).map((word, i) => {
              const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
              const char = clean[0] || 'A';
              return (
                <img key={i} src={`${bucketUrl}/${char}5.png`} style={{ width: '60px', height: '80px', borderRadius: '5px', filter: artistFilters[artist] || 'none' }} />
              );
            })}
        </div>

        <div style={{ background: 'rgba(0,0,0,0.7)', padding: '40px', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.3)', textAlign: 'center', marginBottom: '40px', maxWidth: '850px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.6rem', lineHeight: '1.6' }}>"{decodeURIComponent(message.replace(/\+/g, ' '))}"</p>
        </div>

        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '20px', opacity: 0.8 }}>MODALITY I: CHOOSE ATMOSPHERE</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            {gallery.map(v => (
              <button key={v.id} onClick={() => setVibe(v.id)} style={{ padding: '12px 24px', background: vibe === v.id ? '#D4AF37' : 'transparent', color: vibe === v.id ? '#000' : '#D4AF37', border: '1px solid #D4AF37', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>{v.name}</button>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
           <p style={{ fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '20px', opacity: 0.8 }}>MODALITY II: NANO BANANA VISION</p>
           <button onClick={triggerNanoBanana} style={{ padding: '18px 40px', border: '1px solid #D4AF37', background: isAiLoading ? '#222' : 'rgba(212,175,55,0.1)', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>
             {isAiLoading ? '⌛ TRANSLATING...' : '✨ GENERATE AI INTERPRETATION'}
           </button>
        </div>

        <button onClick={() => window.location.href = `/open?${searchParams.toString()}&vibe=${vibe}`} style={{ padding: '22px 100px', background: '#D4AF37', color: '#000', borderRadius: '50px', fontWeight: 'bold', letterSpacing: '8px', cursor: 'pointer' }}>SEAL & SHARE</button>
      </div>
    </main>
  );
}

export default function Composer2Page() { return <Suspense><Composer2Content /></Suspense>; }
