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
    setSelectedWords(prev => prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]);
  };

  const words = text.split(/[ \n]+/).filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '5vh' }}>
        
        {/* ART PREVIEW: Showing the golden alphabet */}
        <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '30px', minHeight: '180px' }}>
          {selectedWords.map((word, i) => {
            const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
            const first = clean[0] || 'A';
            const oneBeforeLast = clean.length > 1 ? clean[clean.length - 2] : first;
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', border: '1px solid #D4AF37', borderRadius: '8px', overflow: 'hidden', width: '100px', height: '140px', background: 'rgba(0,0,0,0.8)' }}>
                  <img src={`${bucketUrl}/${first}5.png`} style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
                  <img src={`${bucketUrl}/${oneBeforeLast}5.png`} style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ fontSize: '0.7rem', marginTop: '8px' }}>{word.toUpperCase()}</p>
              </div>
            );
          })}
        </div>

        <div style={{ width: '100%', maxWidth: '800px', padding: '40px', background: 'rgba(15, 15, 15, 0.9)', borderRadius: '30px', border: '1px solid #333' }}>
          <textarea 
            placeholder="Write your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.4rem', outline: 'none', height: '150px', resize: 'none' }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
            {words.map((word, i) => (
              <button key={i} onClick={() => toggleWord(word)} style={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '8px', background: selectedWords.includes(word) ? '#D4AF37' : 'transparent', color: selectedWords.includes(word) ? '#000' : '#D4AF37', border: '1px solid #D4AF37' }}>{word}</button>
            ))}
          </div>
        </div>

        {/* NAVIGATION: Sends the user to the Chapter II Curation */}
        <button 
          onClick={() => {
            const params = new URLSearchParams();
            params.set('vibe', vibe);
            params.set('message', text);
            params.set('tiles', selectedWords.join(','));
            window.location.href = `/composer2?${params.toString()}`;
          }}
          style={{ marginTop: '50px', padding: '18px 80px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', letterSpacing: '8px', fontWeight: 'bold' }}>
          CONTINUE TO CURATION
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
