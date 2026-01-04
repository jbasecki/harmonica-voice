'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14';
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const toggleWord = (word: string) => {
    setSelectedWords(prev => 
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  const words = text.split(/[ \n]+/).filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '5vh' }}>
        
        {/* 1. THE STASH PREVIEW (Large & Responsive) */}
        <div style={{ width: '100%', maxWidth: '1100px', textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ letterSpacing: '6px', fontSize: '0.8rem', opacity: 0.7, marginBottom: '20px' }}>STASH PREVIEW</p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '20px', 
            justifyItems: 'center' 
          }}>
            {selectedWords.map((word, i) => {
              const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
              const first = cleanWord[0];
              const oneBeforeLast = cleanWord.length > 1 ? cleanWord[cleanWord.length - 2] : first;
              
              return (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', border: '2px solid #D4AF37', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 20px rgba(212,175,55,0.4)', background: 'rgba(0,0,0,0.8)' }}>
                    <img src={`${bucketUrl}/${first}.png`} style={{ width: '75px', height: '110px', objectFit: 'cover' }} alt="" />
                    <img src={`${bucketUrl}/${oneBeforeLast}.png`} style={{ width: '75px', height: '110px', objectFit: 'cover' }} alt="" />
                  </div>
                  <p style={{ color: '#D4AF37', marginTop: '10px', letterSpacing: '2px', fontSize: '0.7rem', fontWeight: 'bold' }}>{word.toUpperCase()}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. THE WRITING SPACE (Essential Area) */}
        <div style={{ width: '100%', maxWidth: '800px', padding: '30px', background: 'rgba(15, 15, 15, 0.9)', borderRadius: '30px', border: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <textarea 
            placeholder="Write your meditation here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.2rem', outline: 'none', height: '160px', resize: 'none', marginBottom: '20px', lineHeight: '1.5' }}
          />
          
          {/* THE TOUCH-TO-STASH SELECTOR */}
          <div style={{ borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {words.map((word, i) => (
              <span 
                key={i} 
                onClick={() => toggleWord(word)}
                style={{ 
                  cursor: 'pointer', padding: '8px 15px', borderRadius: '8px', fontSize: '0.95rem',
                  background: selectedWords.includes(word) ? '#D4AF37' : 'rgba(212, 175, 55, 0.05)',
                  color: selectedWords.includes(word) ? '#000' : '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  transition: '0.2s'
                }}>
                {word}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => window.location.href = `/orb?vibe=${vibe}&tiles=${encodeURIComponent(selectedWords.join(','))}`}
          style={{ marginTop: '50px', padding: '18px 80px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', letterSpacing: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>
          CREATE HARMONICA
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() {
  return <Suspense><ComposerContent /></Suspense>;
}
