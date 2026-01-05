'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const [artist, setArtist] = useState('gold'); 
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const artists = [
    { id: 'gold', name: 'GOLDEN HARMONICA' },
    { id: 'silver', name: 'STERLING SILVER' },
    { id: 'noir', name: 'NOIR ETCHING' }
  ];

  const artistFilters: Record<string, string> = {
    gold: 'none',
    silver: 'grayscale(100%) brightness(1.2) contrast(1.1) sepia(0.1)',
    noir: 'grayscale(100%) brightness(0.6) contrast(1.8)'
  };

  const toggleWord = (word: string) => {
    setSelectedWords(prev => prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]);
  };

  const words = text.split(/[ \n]+/).filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', padding: '20px', fontFamily: 'serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5vh' }}>
        
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '3px', marginBottom: '15px', opacity: 0.6 }}>SELECT ARTISTIC MODALITY</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {artists.map(a => (
              <button key={a.id} onClick={() => setArtist(a.id)} style={{ padding: '8px 20px', background: artist === a.id ? '#D4AF37' : 'transparent', color: artist === a.id ? '#000' : '#D4AF37', border: '1px solid #D4AF37', borderRadius: '5px', cursor: 'pointer', fontSize: '0.7rem' }}>
                {a.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '30px', minHeight: '180px' }}>
          {selectedWords.map((word, i) => {
            const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
            const first = clean[0] || 'A';
            return (
              <div key={i} style={{ border: '1px solid #D4AF37', borderRadius: '8px', overflow: 'hidden', width: '100px', height: '140px', filter: artistFilters[artist] }}>
                <img src={`${bucketUrl}/${first}5.png`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            );
          })}
        </div>

        <div style={{ width: '100%', maxWidth: '800px', padding: '40px', background: 'rgba(15, 15, 15, 0.9)', borderRadius: '30px', border: '1px solid #333' }}>
          <textarea placeholder="Write your message..." value={text} onChange={(e) => setText(e.target.value)} style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.4rem', outline: 'none', height: '150px', resize: 'none' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
            {words.map((word, i) => (
              <button key={i} onClick={() => toggleWord(word)} style={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '8px', background: selectedWords.includes(word) ? '#D4AF37' : 'transparent', color: selectedWords.includes(word) ? '#000' : '#D4AF37', border: '1px solid #D4AF37' }}>{word}</button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => window.location.href = `/composer2?artist=${artist}&message=${encodeURIComponent(text)}&tiles=${encodeURIComponent(selectedWords.join(','))}`}
          style={{ marginTop: '50px', padding: '18px 80px', background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', letterSpacing: '8px', fontWeight: 'bold' }}>
          CONTINUE TO CURATION
        </button>
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
