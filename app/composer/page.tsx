'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '7'; // Your Golden Tree Vibe
  const [text, setText] = useState(''); // Text is now EMPTY for you to type
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      
      {/* PERSISTENT CINEMATIC VIDEO */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'rgba(0,0,0,0.1)' }}>
        
        {/* YOUR MESSAGE: Now fully editable */}
        <textarea 
          placeholder="Write your message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ 
            width: '80%', 
            maxWidth: '850px', 
            background: 'transparent', 
            border: 'none', 
            color: '#D4AF37', 
            fontSize: '2.4rem', 
            outline: 'none', 
            height: '300px', 
            resize: 'none', 
            textAlign: 'center', 
            fontFamily: 'serif', 
            fontStyle: 'italic',
            textShadow: '2px 2px 10px rgba(0,0,0,0.9)' 
          }}
        />

        {/* ONLY SHOW BUTTONS IF THERE IS TEXT */}
        {text.length > 0 && (
          <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
            
            <button 
              onClick={() => window.location.href = `/pay?vibe=${vibe}&message=${encodeURIComponent(text)}`}
              style={{ padding: '15px 40px', background: '#D4AF37', color: '#000', borderRadius: '50px', cursor: 'pointer', letterSpacing: '2px', fontWeight: 'bold', border: 'none', fontSize: '0.9rem' }}>
              PAY & SEND
            </button>

            <button 
              onClick={() => window.location.href = `/composer2?vibe=${vibe}&message=${encodeURIComponent(text)}`}
              style={{ padding: '15px 40px', background: 'transparent', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', letterSpacing: '1px', fontWeight: 'bold', border: '2px solid #D4AF37', fontSize: '0.9rem' }}>
              CLICK WORDS FOR VISUAL ENHANCEMENT
            </button>

          </div>
        )}
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
