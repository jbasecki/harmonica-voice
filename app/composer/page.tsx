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
        
        {/* STASH PREVIEW: Responsive Grid */}
        <div style={{ width: '100%', maxWidth: '1100px', textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ letterSpacing: '6px', fontSize: '0.8rem', opacity: 0.7, marginBottom: '20px' }}>STASH PREVIEW</p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
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
                    <img src={`${bucketUrl}/${first}.png`} style={{ width: '70px', height: '100px', objectFit: 'cover' }} alt="" />
                    <img src={`${bucketUrl}/${oneBeforeLast}.png`} style={{ width: '70px', height: '100px', objectFit: 'cover' }} alt="" />
                  </div>
                  <p style={{ color: '#D4AF37', marginTop: '10px', letterSpacing: '2px', fontSize: '0.65rem', fontWeight: 'bold' }}>{word.toUpperCase()}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE WRITING AREA: Auto-scaling width */}
        <div style={{ width: '100%', maxWidth: '750px', padding: 'clamp(20px, 5vw, 40px)', background: 'rgba(15, 15, 15, 0.9)', borderRadius: '30px', border: '1px solid #333' }}>
          <textarea 
            placeholder="Write your meditation here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.1rem', outline: 'none', height: '150px', resize: 'none', marginBottom: '25px' }}
          />
          
          <div style={{ borderTop: '1px solid #222', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {words.map((word, i) => (
              <span 
                key={i} 
                onClick={() => toggleWord(word)}
                style={{ 
                  cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem',
                  background: selectedWords.includes(word) ? '#D4AF37' : 'rgba(212, 175, 55, 0.1)',
                  color: selectedWords.includes(word) ? '#000' : '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}>
                {word}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => window.location.href = `/orb?vibe=${vibe}&tiles=${encodeURIComponent(selectedWords.join(','))}`}
          style={{ marginTop: '40px', padding: '15px 60px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', letterSpacing: '6px' }}>
          CREATE HARMONICA
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() {
  return <Suspense><ComposerContent /></Suspense>;
}
