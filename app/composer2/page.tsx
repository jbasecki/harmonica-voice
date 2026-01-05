'use client';
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

function Composer2Content() {
  const searchParams = useSearchParams();
  const [vibe, setVibe] = useState(searchParams.get('vibe') || '13');
  const message = searchParams.get('message') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  const videoRef = useRef<HTMLVideoElement>(null);

  const gallery = [{ id: '1', name: 'SANCTUARY' }, { id: '8', name: 'GOLDEN' }, { id: '18', name: 'SNOWY' }];

  useEffect(() => {
    if (videoRef.current) { videoRef.current.load(); }
  }, [vibe]);

  const words = decodeURIComponent(message.replace(/\+/g, ' ')).split(/[ \n]+/).filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      
      {/* 1. BACKGROUND REMAINS THE PRIORITY */}
      <video ref={videoRef} key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <audio autoPlay loop src={`${bucketUrl}/piano.mp3`} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
        
        {/* 2. THE THOUGHT */}
        <div style={{ background: 'rgba(0,0,0,0.6)', padding: '40px', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.1)', textAlign: 'center', marginBottom: '30px', maxWidth: '850px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.6rem', lineHeight: '1.6' }}>"{decodeURIComponent(message.replace(/\+/g, ' '))}"</p>
        </div>

        {/* 3. THE DIRECT QUESTION */}
        <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '600px' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.4', opacity: 0.9 }}>
            Would you like to see how some of your words transform into a visual modality? 
            If so, click on a word or two below to see the result.
          </p>
        </div>

        {/* 4. THE WORD INTERACTION */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', marginBottom: '50px' }}>
          {words.map((word, i) => (
            <button key={i} onClick={() => alert(`Stashed: ${word}`)} style={{ padding: '8px 16px', border: '1px solid #D4AF37', background: 'transparent', color: '#D4AF37', borderRadius: '5px', cursor: 'pointer' }}>
              {word}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '4px', marginBottom: '15px', opacity: 0.5 }}>ADJUST ENVIRONMENT</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {gallery.map(v => (
              <button key={v.id} onClick={() => setVibe(v.id)} style={{ padding: '8px 16px', background: vibe === v.id ? '#D4AF37' : 'transparent', color: vibe === v.id ? '#000' : '#D4AF37', border: '1px solid #D4AF37', borderRadius: '5px', cursor: 'pointer', fontSize: '0.7rem' }}>{v.name}</button>
            ))}
          </div>
        </div>

        <button onClick={() => window.location.href = `/open?vibe=${vibe}&message=${message}`} style={{ padding: '20px 80px', background: '#D4AF37', color: '#000', borderRadius: '50px', fontWeight: 'bold', letterSpacing: '8px', cursor: 'pointer', border: 'none' }}>
          SEAL & SEND
        </button>

        {/* 5. LEGAL FOOTER (Moved from main view) */}
        <p style={{ marginTop: '10vh', fontSize: '0.5rem', opacity: 0.3, letterSpacing: '2px' }}>
          © HARMONICA VOICE | PROTECTED BY PROVISIONAL PATENT NO. 63/123,456
        </p>
      </div>
    </main>
  );
}

export default function Composer2Page() { return <Suspense><Composer2Content /></Suspense>; }
