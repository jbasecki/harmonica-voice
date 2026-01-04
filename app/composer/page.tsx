'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14';
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const words = text.split(/[ \n]+/).filter(Boolean);

  const toggleWord = (word: string) => {
    setSelectedWords(prev => 
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflow: 'hidden', fontFamily: 'serif' }}>
      <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5vh' }}>
        
        {/* STASH PREVIEW: Only shows words you have "touched" */}
        <div style={{ minHeight: '180px', textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ letterSpacing: '4px', fontSize: '0.7rem', opacity: 0.6 }}>STASH PREVIEW</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '900px', marginTop: '20px' }}>
            {selectedWords.map((word, i) => {
              const first = word[0].toLowerCase();
              const oneBeforeLast = word.length > 1 ? word[word.length - 2].toLowerCase() : first;
              return (
                <div key={i} style={{ border: '1px solid #D4AF37', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 0 15px rgba(212,175,55,0.4)' }}>
                  <img src={`${bucketUrl}/${first}.png`} style={{ width: '50px', height: '75px' }} alt="" />
                  <img src={`${bucketUrl}/${oneBeforeLast}.png`} style={{ width: '50px', height: '75px' }} alt="" />
                </div>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE WRITING AREA */}
        <div style={{ width: '700px', padding: '40px', background: 'rgba(15, 15, 15, 0.9)', borderRadius: '25px', border: '1px solid #333' }}>
          <textarea 
            placeholder="Write your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.1rem', outline: 'none', height: '120px', resize: 'none', marginBottom: '20px' }}
          />
          
          {/* TOUCH WORDS TO STASH */}
          <div style={{ borderTop: '1px solid #333', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {words.map((word, i) => (
              <span 
                key={i} 
                onClick={() => toggleWord(word)}
                style={{ 
                  cursor: 'pointer', padding: '5px 10px', borderRadius: '5px',
                  background: selectedWords.includes(word) ? '#D4AF37' : 'transparent',
                  color: selectedWords.includes(word) ? '#000' : '#D4AF37',
                  transition: '0.2s'
                }}>
                {word}
              </span>
            ))}
          </div>
        </div>

        <button 
          onClick={() => window.location.href = `/orb?vibe=${vibe}&tiles=${selectedWords.join(',')}`}
          style={{ marginTop: '40px', padding: '15px 50px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', letterSpacing: '4px' }}>
          CREATE HARMONICA
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() {
  return <Suspense><ComposerContent /></Suspense>;
}
