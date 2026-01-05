'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const [vibe, setVibe] = useState(searchParams.get('vibe') || '1'); // The Atmosphere
  const [text, setText] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const atmospheres = [
    { id: '1', name: 'SANCTUARY' },
    { id: '8', name: 'GOLDEN' },
    { id: '18', name: 'SNOWY' }
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflow: 'hidden', fontFamily: 'serif' }}>
      
      {/* 1. ATMOSPHERE: The persistent video background */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '10vh' }}>
        
        {/* 2. ATMOSPHERE SELECTOR: Change the mood instantly */}
        <div style={{ marginBottom: '40px', display: 'flex', gap: '15px' }}>
          {atmospheres.map(a => (
            <button key={a.id} onClick={() => setVibe(a.id)} style={{ padding: '10px 20px', background: vibe === a.id ? '#D4AF37' : 'transparent', color: vibe === a.id ? '#000' : '#D4AF37', border: '1px solid #D4AF37', borderRadius: '5px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '2px' }}>
              {a.name}
            </button>
          ))}
        </div>

        {/* 3. THE MESSAGE: Clean overlay on top of video */}
        <div style={{ width: '100%', maxWidth: '800px', padding: '40px', background: 'rgba(0, 0, 0, 0.7)', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.3)' }}>
          <textarea 
            placeholder="Write your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.6rem', outline: 'none', height: '200px', resize: 'none', textAlign: 'center', fontStyle: 'italic' }}
          />
        </div>

        {/* 4. THE BRIDGE: Move to the Choice Phase */}
        <button 
          onClick={() => window.location.href = `/composer2?vibe=${vibe}&message=${encodeURIComponent(text)}`}
          style={{ marginTop: '50px', padding: '18px 80px', background: '#D4AF37', color: '#000', borderRadius: '50px', cursor: 'pointer', letterSpacing: '8px', fontWeight: 'bold' }}>
          CONTINUE
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
