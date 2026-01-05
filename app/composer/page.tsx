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
      
      {/* THE ANCHOR: Persistent Cinematic Video */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'rgba(0,0,0,0.1)' }}>
        
        {/* THE TILE SHELF: Appears dynamically as you click words */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', minHeight: '120px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {selectedWords.map((word, i) => {
            const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
            const char = clean[0] || 'A';
            return (
              <div key={i} style={{ display: 'flex', border: '1px solid #D4AF37', borderRadius: '5px', overflow: 'hidden', width: '60px', height: '85px', background: 'rgba(0,0,0,0.8)' }}>
                <img src={`${bucketUrl}/${char}5.png`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            );
          })}
        </div>

        {/* INPUT AREA: Type and then click the words below */}
        <textarea 
          placeholder="Write your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '80%', maxWidth: '850px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '2.4rem', outline: 'none', height: '200px', resize: 'none', textAlign: 'center', fontStyle: 'italic', textShadow: '2px 2px 10px rgba(0,0,0,0.9)' }}
        />

        {/* INTERACTIVE WORDS: Click to stash */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', maxWidth: '800px', marginTop: '20px' }}>
          {words.map((word, i) => (
            <button key={i} onClick={() => toggleWord(word)} style={{ padding: '6px 12px', border: '1px solid #D4AF37', background: selectedWords.includes(word) ? '#D4AF37' : 'transparent', color: selectedWords.includes(word) ? '#000' : '#D4AF37', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}>
              {word}
            </button>
          ))}
        </div>

        {/* FINAL ACTIONS */}
        {text.length > 0 && (
          <div style={{ display: 'flex', gap: '20px', marginTop: '50px' }}>
            <button 
              onClick={() => alert("Stripe Box Opening in Corner...")}
              style={{ padding: '15px 40px', background: '#D4AF37', color: '#000', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', border: 'none' }}>
              PAY & SEND
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
