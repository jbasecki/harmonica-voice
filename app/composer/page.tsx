'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '12';
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
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflow: 'hidden' }}>
      {/* Background Statue/Vibe */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5vh' }}>
        
        {/* STASH PREVIEW: The Golden Icons */}
        <div style={{ minHeight: '180px', textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ letterSpacing: '4px', fontSize: '0.7rem', opacity: 0.6 }}>STASH PREVIEW</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1000px', marginTop: '20px' }}>
            {selectedWords.map((word, i) => {
              // Forced Lowercase to match bucket filenames (i.e. 'i.png' instead of 'I.png')
              const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
              const first = cleanWord[0];
              const oneBeforeLast = cleanWord.length > 1 ? cleanWord[cleanWord.length - 2] : first;
              
              return (
                <div key={i} style={{ border: '1px solid #D4AF37', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 0 15px rgba(212,175,55,0.4)', background: 'rgba(0,0,0,0.8)' }}>
                  <img src={`${bucketUrl}/${first}.png`} style={{ width: '55px', height: '80px', objectFit: 'cover' }} alt={first} />
                  <img src={`${bucketUrl}/${oneBeforeLast}.png`} style={{ width: '55px', height: '80px', objectFit: 'cover' }} alt={oneBeforeLast} />
                </div>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE WRITING BOX */}
        <div style={{ width: '700px', padding: '40px', background: 'rgba(15, 15, 15, 0.85)', borderRadius: '30px', border: '1px solid #333' }}>
          <textarea 
            placeholder="How are you doing today?..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.2rem', outline: 'none', height: '140px', resize: 'none', marginBottom: '25px', fontFamily: 'monospace' }}
          />
          
          <div style={{ borderTop: '1px solid #222', paddingTop: '25px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {words.map((word, i) => (
              <span 
                key={i} 
                onClick={() => toggleWord(word)}
                style={{ 
                  cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem',
                  background: selectedWords.includes(word) ? '#D4AF37' : 'transparent',
                  color: selectedWords.includes(word) ? '#000' : '#D4AF37',
                  transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontWeight: selectedWords.includes(word) ? 'bold' : 'normal'
                }}>
                {word}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => window.location.href = `/orb?vibe=${vibe}&tiles=${encodeURIComponent(selectedWords.join(','))}`}
          style={{ marginTop: '5vh', padding: '18px 60px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', letterSpacing: '6px', fontSize: '0.9rem' }}>
          CREATE HARMONICA
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() {
  return <Suspense><ComposerContent /></Suspense>;
}
