'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14';
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // Interaction: Clicking a word adds it to the "Stash"
  const toggleWord = (word: string) => {
    setSelectedWords(prev => 
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  const words = text.split(/[ \n]+/).filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflow: 'hidden', fontFamily: 'serif' }}>
      {/* Background Cinematic Vibe */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5vh', paddingBottom: '10vh' }}>
        
        {/* STASH PREVIEW: Larger Icons with Word Identity Labels */}
        <div style={{ minHeight: '220px', textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ letterSpacing: '6px', fontSize: '0.8rem', opacity: 0.7, marginBottom: '20px' }}>STASH PREVIEW</p>
          <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1100px' }}>
            {selectedWords.map((word, i) => {
              const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
              const first = cleanWord[0];
              const oneBeforeLast = cleanWord.length > 1 ? cleanWord[cleanWord.length - 2] : first;
              
              return (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', border: '2px solid #D4AF37', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 25px rgba(212,175,55,0.5)', background: 'rgba(0,0,0,0.8)' }}>
                    {/* LARGER ICON SIZE */}
                    <img src={`${bucketUrl}/${first}.png`} style={{ width: '80px', height: '110px', objectFit: 'cover' }} alt="" />
                    <img src={`${bucketUrl}/${oneBeforeLast}.png`} style={{ width: '80px', height: '110px', objectFit: 'cover' }} alt="" />
                  </div>
                  {/* WORD IDENTITY LABEL */}
                  <p style={{ color: '#D4AF37', marginTop: '10px', letterSpacing: '3px', fontSize: '0.7rem', fontWeight: 'bold' }}>{word.toUpperCase()}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RESTORED: INTERACTIVE WRITING AREA */}
        <div style={{ width: '750px', padding: '40px', background: 'rgba(15, 15, 15, 0.9)', borderRadius: '30px', border: '1px solid #333', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <textarea 
            placeholder="Write your meditation here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.2rem', outline: 'none', height: '150px', resize: 'none', marginBottom: '25px', lineHeight: '1.6' }}
          />
          
          <div style={{ borderTop: '1px solid #222', paddingTop: '25px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {words.map((word, i) => (
              <span 
                key={i} 
                onClick={() => toggleWord(word)}
                style={{ 
                  cursor: 'pointer', padding: '8px 15px', borderRadius: '8px', fontSize: '1rem',
                  background: selectedWords.includes(word) ? '#D4AF37' : 'rgba(212, 175, 55, 0.05)',
                  color: selectedWords.includes(word) ? '#000' : '#D4AF37',
                  transition: '0.2s ease-out',
                  fontWeight: selectedWords.includes(word) ? 'bold' : 'normal',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
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
