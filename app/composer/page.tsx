'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // The unified background video choice
  const unifiedVibe = "15"; 

  const toggleWord = (word: string) => {
    setSelectedWords(prev => 
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  const words = text.split(/[ \n]+/).filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflowX: 'hidden' }}>
      {/* UNIFIED BACKGROUND MP4 */}
      <video key={unifiedVibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: -1 }}>
        <source src={`${bucketUrl}/${unifiedVibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        
        {/* SCALE ART CONTROL */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setZoom(Math.max(0.7, zoom - 0.1))} style={{ background: 'none', border: '1px solid gold', color: 'gold', cursor: 'pointer', borderRadius: '50%', width: '35px', height: '35px' }}>-</button>
          <span style={{ fontSize: '0.8rem', letterSpacing: '3px' }}>SCALE ART</span>
          <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} style={{ background: 'none', border: '1px solid gold', color: 'gold', cursor: 'pointer', borderRadius: '50%', width: '35px', height: '35px' }}>+</button>
        </div>

        {/* STASH PREVIEW: Fixed for your "5" Bucket Suffix */}
        <div style={{ width: '100%', maxWidth: '1200px', textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${140 * zoom}px, 1fr))`, gap: '20px', justifyItems: 'center' }}>
            {selectedWords.map((word, i) => {
              const cleanWord = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
              const first = cleanWord[0] || 'A';
              const oneBeforeLast = cleanWord.length > 1 ? cleanWord[cleanWord.length - 2] : first;
              
              return (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', border: '1px solid #D4AF37', borderRadius: '10px', overflow: 'hidden', width: `${140 * zoom}px`, height: `${190 * zoom}px`, background: 'rgba(0,0,0,0.8)' }}>
                    {/* UPDATED PATHS TO MATCH YOUR BUCKET */}
                    <img src={`${bucketUrl}/${first}5.png`} style={{ width: '50%', height: '100%', objectFit: 'cover' }} alt="" />
                    <img src={`${bucketUrl}/${oneBeforeLast}5.png`} style={{ width: '50%', height: '100%', objectFit: 'cover' }} alt="" />
                  </div>
                  <p style={{ color: '#D4AF37', marginTop: '10px', letterSpacing: '2px', fontSize: '0.7rem', fontWeight: 'bold' }}>{word.toUpperCase()}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* WRITING AREA (THE TURTLE) */}
        <div style={{ width: '100%', maxWidth: '750px', padding: '30px', background: 'rgba(15, 15, 15, 0.9)', borderRadius: '25px', border: '1px solid #333' }}>
          <textarea 
            placeholder="Write your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.2rem', outline: 'none', height: '140px', resize: 'none', marginBottom: '20px' }}
          />
          <div style={{ borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {words.map((word, i) => (
              <span key={i} onClick={() => toggleWord(word)}
                style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem',
                  background: selectedWords.includes(word) ? '#D4AF37' : 'rgba(212, 175, 55, 0.1)',
                  color: selectedWords.includes(word) ? '#000' : '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                {word}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => window.location.href = `/orb?vibe=${unifiedVibe}&tiles=${encodeURIComponent(selectedWords.join(','))}`}
          style={{ marginTop: '40px', padding: '15px 70px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', letterSpacing: '8px' }}>
          CREATE HARMONICA
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() {
  return <Suspense><ComposerContent /></Suspense>;
}
