'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14';
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1); // Zoom scale: 1 = standard, 1.5 = zoomed
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

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '2vh' }}>
        
        {/* ZOOM CONTROLS */}
        <div style={{ marginBottom: '10px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setZoom(zoom > 0.8 ? zoom - 0.2 : 0.8)} style={{ background: 'none', border: '1px solid gold', color: 'gold', cursor: 'pointer', borderRadius: '50%', width: '30px', height: '30px' }}>-</button>
          <span style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>SCALE ART</span>
          <button onClick={() => setZoom(zoom < 1.8 ? zoom + 0.2 : 1.8)} style={{ background: 'none', border: '1px solid gold', color: 'gold', cursor: 'pointer', borderRadius: '50%', width: '30px', height: '30px' }}>+</button>
        </div>

        {/* 1. THE STASH PREVIEW (With Dynamic Zoom) */}
        <div style={{ width: '100%', maxWidth: '1200px', textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(auto-fit, minmax(${150 * zoom}px, 1fr))`, 
            gap: `${20 * zoom}px`, 
            justifyItems: 'center',
            transition: 'all 0.3s ease'
          }}>
            {selectedWords.map((word, i) => {
              const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
              const first = cleanWord[0] || 'a';
              const oneBeforeLast = cleanWord.length > 1 ? cleanWord[cleanWord.length - 2] : first;
              
              return (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    display: 'flex', border: `${2 * zoom}px solid #D4AF37`, borderRadius: `${12 * zoom}px`, 
                    overflow: 'hidden', boxShadow: `0 0 ${20 * zoom}px rgba(212,175,55,0.4)`, 
                    background: 'rgba(0,0,0,0.8)',
                    width: `${150 * zoom}px`, height: `${210 * zoom}px`
                  }}>
                    <img src={`${bucketUrl}/${first}.png`} style={{ width: '50%', height: '100%', objectFit: 'cover' }} alt="" />
                    <img src={`${bucketUrl}/${oneBeforeLast}.png`} style={{ width: '50%', height: '100%', objectFit: 'cover' }} alt="" />
                  </div>
                  <p style={{ color: '#D4AF37', marginTop: '10px', letterSpacing: '2px', fontSize: `${0.7 * zoom}rem`, fontWeight: 'bold' }}>{word.toUpperCase()}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. THE WRITING SPACE */}
        <div style={{ width: '100%', maxWidth: '800px', padding: '30px', background: 'rgba(15, 15, 15, 0.9)', borderRadius: '30px', border: '1px solid #333' }}>
          <textarea 
            placeholder="Write your meditation here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.2rem', outline: 'none', height: '120px', resize: 'none', marginBottom: '20px' }}
          />
          <div style={{ borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {words.map((word, i) => (
              <span key={i} onClick={() => toggleWord(word)}
                style={{ cursor: 'pointer', padding: '8px 15px', borderRadius: '8px', fontSize: '0.95rem',
                  background: selectedWords.includes(word) ? '#D4AF37' : 'rgba(212, 175, 55, 0.05)',
                  color: selectedWords.includes(word) ? '#000' : '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                {word}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => window.location.href = `/orb?vibe=${vibe}&tiles=${encodeURIComponent(selectedWords.join(','))}`}
          style={{ marginTop: '30px', padding: '15px 60px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', letterSpacing: '8px', fontWeight: 'bold' }}>
          CREATE HARMONICA
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() {
  return <Suspense><ComposerContent /></Suspense>;
}
