'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '14';
  const [text, setText] = useState('');
  const [signature, setSignature] = useState('');
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // Harmonica Rule: Extract first and one-before-last for the preview
  const getTiles = (input: string) => {
    return input.split(/[ ,]+/).filter(Boolean).map(word => {
      const first = word[0].toLowerCase();
      const oneBeforeLast = word.length > 1 ? word[word.length - 2].toLowerCase() : first;
      return { word: word.toUpperCase(), first, oneBeforeLast };
    });
  };

  const activeTiles = getTiles(text);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflow: 'hidden', fontFamily: 'serif' }}>
      {/* Background Vibe */}
      <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5vh' }}>
        
        {/* STASH PREVIEW AREA */}
        <div style={{ minHeight: '200px', textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ letterSpacing: '4px', fontSize: '0.7rem', opacity: 0.8, marginBottom: '20px' }}>STASH PREVIEW</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '900px' }}>
            {activeTiles.map((tile, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', border: '1px solid #D4AF37', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}>
                  <img src={`${bucketUrl}/${tile.first}.png`} style={{ width: '60px', height: '60px' }} alt="" />
                  <img src={`${bucketUrl}/${tile.oneBeforeLast}.png`} style={{ width: '60px', height: '60px' }} alt="" />
                </div>
                <p style={{ fontSize: '0.6rem', marginTop: '8px', letterSpacing: '1px' }}>{tile.word}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN INPUT BOX */}
        <div style={{ 
          width: '600px', padding: '40px', background: 'rgba(20, 20, 20, 0.8)', 
          borderRadius: '30px', border: '1px solid #D4AF37', position: 'relative' 
        }}>
          {/* Meditative Info Icon */}
          <div className="info-group" style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'help' }}>
            <div style={{ border: '1px solid #D4AF37', borderRadius: '50%', width: '20px', height: '20px', textAlign: 'center', fontSize: '0.7rem' }}>i</div>
            <span className="info-text">Words of meditative meaning are formed by association with visual abstracts rather than specific symbols seen in text.</span>
          </div>

          <textarea 
            placeholder="paste your quote or start writing here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '1.2rem', outline: 'none', height: '150px', resize: 'none' }}
          />
          
          <input 
            placeholder="Signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            style={{ width: '100%', background: 'transparent', borderTop: '1px solid #333', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', color: '#D4AF37', paddingTop: '20px', marginTop: '20px', outline: 'none', textAlign: 'center' }}
          />
        </div>

        <button 
          onClick={() => window.location.href = `/orb?vibe=${vibe}&tiles=${encodeURIComponent(text)}&sig=${encodeURIComponent(signature)}`}
          style={{ marginTop: '40px', padding: '15px 60px', background: '#D4AF37', color: '#000', border: 'none', borderRadius: '50px', fontWeight: 'bold', letterSpacing: '3px', cursor: 'pointer' }}>
          PRODUCE & OPEN HARMONICA
        </button>
      </div>

      <style jsx>{`
        .info-group .info-text {
          visibility: hidden; width: 200px; background-color: #111; color: #D4AF37; text-align: center;
          padding: 10px; border-radius: 10px; position: absolute; z-index: 1; bottom: 125%; right: 0;
          opacity: 0; transition: opacity 0.3s; border: 1px solid #D4AF37; font-size: 0.7rem;
        }
        .info-group:hover .info-text { visibility: visible; opacity: 1; }
      `}</style>
    </main>
  );
}

export default function ComposerPage() {
  return <Suspense><ComposerContent /></Suspense>;
}
