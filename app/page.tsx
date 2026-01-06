'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '12'; 
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const toggleWord = (word: string) => {
    setSelectedWords(prev => prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]);
  };

  const words = text.split(/[ \n]+/).filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'serif' }}>
      
      {/* THE CINEMATIC FLOOR */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      {/* PIANO SANCTUARY AUDIO */}
      <audio autoPlay loop src={`${bucketUrl}/piano.mp3`} />

      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        
        {/* TILE SHELF: DUAL-LETTER LOGIC WITH GOLD LABELS */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', minHeight: '160px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {selectedWords.map((word, i) => {
            const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
            const first = clean[0] || 'A';
            const penult = clean.length > 1 ? clean[clean.length - 2] : first;
            
            return (
              <div key={i} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ border: '2px solid #D4AF37', borderRadius: '10px', overflow: 'hidden', width: '60px', height: '85px', background: 'rgba(0,0,0,0.8)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
                    <img src={`${bucketUrl}/${first}5.png`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ border: '2px solid #D4AF37', borderRadius: '10px', overflow: 'hidden', width: '60px', height: '85px', background: 'rgba(0,0,0,0.8)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
                    <img src={`${bucketUrl}/${penult}5.png`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
                <p style={{ color: '#D4AF37', fontSize: '0.75rem', marginTop: '12px', fontWeight: 'bold', letterSpacing: '2px', textShadow: '2px 2px 4px #000' }}>
                  {word.toLowerCase()}
                </p>
              </div>
            );
          })}
        </div>

        <textarea 
          placeholder="Write your thought..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '85%',
