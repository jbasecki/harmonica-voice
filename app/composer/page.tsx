'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const [vibe, setVibe] = useState(searchParams.get('vibe') || '13'); 
  const [text, setText] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      
      {/* THE PRIORITY: Full Screen Video */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      {/* THE OVERLAY: Only appears when the user is ready to type */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'rgba(0,0,0,0.3)' }}>
        
        <textarea 
          placeholder="Tap to start your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ 
            width: '80%', 
            maxWidth: '600px', 
            background: 'transparent', 
            border: 'none', 
            color: '#D4AF37', 
            fontSize: '2rem', 
            outline: 'none', 
            height: '300px', 
            resize: 'none', 
            textAlign: 'center', 
            fontFamily: 'serif', 
            fontStyle: 'italic',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)' 
          }}
        />

        {text.length > 0 && (
          <button 
            onClick={() => window.location.href = `/composer2?vibe=${vibe}&message=${encodeURIComponent(text)}`}
            style={{ marginTop: '40px', padding: '15px 60px', background: 'rgba(214, 175, 55, 0.8)', color: '#000', borderRadius: '50px', cursor: 'pointer', letterSpacing: '5px', fontWeight: 'bold', border: 'none' }}>
            CONTINUE
          </button>
        )}
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
