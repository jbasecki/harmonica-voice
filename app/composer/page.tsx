'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '7'; 
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const toggleWord = (word: string) => {
    setSelectedWords(prev => prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]);
  };

  const words = text.split(/[ \n]+/).filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'rgba(0,0,0,0.1)' }}>
        
        {/* 1. TILE SHELF WITH LABELS */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', minHeight: '130px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {selectedWords.map((word, i) => {
            const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
            const char = clean[0] || 'A';
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', border: '2px solid #D4AF37', borderRadius: '8px', overflow: 'hidden', width: '75px', height: '105px', background: 'rgba(0,0,0,0.8)', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                  <img src={`${bucketUrl}/${char}5.png`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* Word Label under tile */}
                <p style={{ color: '#D4AF37', fontSize: '0.7rem', marginTop: '8px', fontWeight: 'bold', letterSpacing: '1px' }}>{word.toUpperCase()}</p>
              </div>
            );
          })}
        </div>

        <textarea 
          placeholder="Write your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '85%', maxWidth: '900px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '2.4rem', outline: 'none', height: '180px', resize: 'none', textAlign: 'center', fontFamily: 'serif', fontStyle: 'italic', textShadow: '2px 2px 10px rgba(0,0,0,0.9)' }}
        />

        {/* 2. HIGH-VISIBILITY BUTTONS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '850px', marginTop: '30px' }}>
          {words.map((word, i) => (
            <button 
              key={i} 
              onClick={() => toggleWord(word)} 
              style={{ 
                padding: '10px 18px', 
                border: '1px solid rgba(212,175,55,0.6)', 
                background: selectedWords.includes(word) ? '#D4AF37' : 'rgba(212,175,55,0.15)', 
                color: selectedWords.includes(word) ? '#000' : '#D4AF37', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontSize: '0.9rem',
                fontWeight: 'bold',
                backdropFilter: 'blur(5px)', // Premium glass effect
                transition: 'all 0.2s ease'
              }}>
              {word}
            </button>
          ))}
        </div>

        {text.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <button 
              onClick={() => window.location.href = `/pay?vibe=${vibe}&message=${encodeURIComponent(text)}&tiles=${encodeURIComponent(selectedWords.join(','))}`}
              style={{ padding: '20px 80px', background: '#D4AF37', color: '#000', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', border: 'none', letterSpacing: '4px', fontSize: '1rem', boxShadow: '0 4px 20px rgba(212,175,55,0.3)' }}>
              PAY & SEND
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
