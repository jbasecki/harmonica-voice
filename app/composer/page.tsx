'use client';
import React, { useState, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '7'; 
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const toggleWord = (word: string) => {
    setSelectedWords(prev => prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]);
  };

  const words = text.split(/[ \n]+/).filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      
      {/* PERSISTENT ATMOSPHERE */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      {/* PIANO SANCTUARY AUDIO CONTROL */}
      <audio ref={audioRef} autoPlay loop muted={isMuted} src={`${bucketUrl}/piano.mp3`} />
      <button 
        onClick={() => setIsMuted(!isMuted)}
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 10, background: 'rgba(0,0,0,0.5)', color: '#D4AF37', border: '1px solid #D4AF37', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}>
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* DARK GRADIENT FOR VISIBILITY IN BRIGHT VIDEOS */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)', zIndex: 2 }} />

      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        
        {/* TILE SHELF WITH LABELS */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', minHeight: '130px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {selectedWords.map((word, i) => {
            const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
            const char = clean[0] || 'A';
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', border: '2px solid #D4AF37', borderRadius: '8px', overflow: 'hidden', width: '75px', height: '105px', background: 'rgba(0,0,0,0.8)' }}>
                  <img src={`${bucketUrl}/${char}5.png`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ color: '#D4AF37', fontSize: '0.7rem', marginTop: '8px', fontWeight: 'bold' }}>{word.toUpperCase()}</p>
              </div>
            );
          })}
        </div>

        <textarea 
          placeholder="Write your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ 
            width: '85%', 
            maxWidth: '900px', 
            background: 'transparent', 
            border: 'none', 
            color: '#D4AF37', 
            fontSize: '2.4rem', 
            outline: 'none', 
            height: '180px', 
            resize: 'none', 
            textAlign: 'center', 
            fontFamily: 'serif', 
            fontStyle: 'italic',
            textShadow: '4px 4px 15px rgba(0,0,0,1)' // Maximum Visibility
          }}
        />

        {/* HIGH-VISIBILITY BUTTONS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '850px', marginTop: '30px' }}>
          {words.map((word, i) => (
            <button key={i} onClick={() => toggleWord(word)} 
              style={{ 
                padding: '10px 18px', 
                border: '1px solid rgba(212,175,55,0.8)', 
                background: selectedWords.includes(word) ? '#D4AF37' : 'rgba(0,0,0,0.5)', 
                color: selectedWords.includes(word) ? '#000' : '#D4AF37', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                backdropFilter: 'blur(5px)'
              }}>
              {word}
            </button>
          ))}
        </div>

        {text.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <button 
              onClick={() => alert("Proceeding to Stripe...")}
              style={{ padding: '20px 80px', background: '#D4AF37', color: '#000', borderRadius: '50px', fontWeight: 'bold', border: 'none', letterSpacing: '4px', fontSize: '1rem' }}>
              PAY & SEND
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
