'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '1'; // Using the Sanctuary vibe from your screenshot
  const [text, setText] = useState('I love my trip so much! I wish you could join me soon!');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      
      {/* THE PRIORITY: Full Screen Video */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      {/* THE INTERFACE OVERLAY */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'rgba(0,0,0,0.2)' }}>
        
        {/* THE MESSAGE */}
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ 
            width: '80%', 
            maxWidth: '800px', 
            background: 'transparent', 
            border: 'none', 
            color: '#D4AF37', 
            fontSize: '2.2rem', 
            outline: 'none', 
            height: '250px', 
            resize: 'none', 
            textAlign: 'center', 
            fontFamily: 'serif', 
            fontStyle: 'italic',
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)' 
          }}
        />

        {/* THE TWO-BUTTON FINAL CHOICE */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '60px' }}>
          
          {/* CHOICE 1: PAY & SEND */}
          <button 
            onClick={() => window.location.href = `/pay?vibe=${vibe}&message=${encodeURIComponent(text)}`}
            style={{ padding: '15px 40px', background: '#D4AF37', color: '#000', borderRadius: '50px', cursor: 'pointer', letterSpacing: '2px', fontWeight: 'bold', border: 'none', fontSize: '0.9rem' }}>
            PAY & SEND
          </button>

          {/* CHOICE 2: VISUAL ENHANCEMENT */}
          <button 
            onClick={() => window.location.href = `/composer2?vibe=${vibe}&message=${encodeURIComponent(text)}`}
            style={{ padding: '15px 40px', background: 'transparent', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', letterSpacing: '1px', fontWeight: 'bold', border: '2px solid #D4AF37', fontSize: '0.9rem' }}>
            CLICK WORDS FOR VISUAL ENHANCEMENT
          </button>

        </div>
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
