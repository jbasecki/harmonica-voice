'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  // We use vibe 13 as your latest screen shows, or default to 1
  const [vibe, setVibe] = useState(searchParams.get('vibe') || '13'); 
  const [text, setText] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflow: 'hidden', fontFamily: 'serif' }}>
      
      {/* 1. THE VIDEO: We use a key to ensure it reloads correctly if the vibe changes */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '15vh' }}>
        
        {/* 2. THE MESSAGE BOX: Simplified and centered */}
        <div style={{ width: '100%', maxWidth: '850px', padding: '50px', background: 'rgba(0, 0, 0, 0.6)', borderRadius: '40px', border: '1px solid rgba(212,175,55,0.2)' }}>
          <textarea 
            placeholder="Write your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.8rem', outline: 'none', height: '250px', resize: 'none', textAlign: 'center', fontStyle: 'italic', lineHeight: '1.5' }}
          />
        </div>

        {/* 3. CONTINUE: Moves to the upgrade question */}
        <button 
          onClick={() => window.location.href = `/composer2?vibe=${vibe}&message=${encodeURIComponent(text)}`}
          style={{ marginTop: '60px', padding: '20px 100px', background: '#D4AF37', color: '#000', borderRadius: '50px', cursor: 'pointer', letterSpacing: '8px', fontWeight: 'bold', border: 'none', fontSize: '1.1rem' }}>
          CONTINUE
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
