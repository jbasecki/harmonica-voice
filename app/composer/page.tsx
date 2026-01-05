'use client';
import React, { useState, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '12'; // Ayahuasca Vibe
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showStripe, setShowStripe] = useState(false);
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const toggleWord = (word: string) => {
    setSelectedWords(prev => prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]);
  };

  const words = text.split(/[ \n]+/).filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      
      {/* PERSISTENT CINEMATIC BACKGROUND */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      {/* STRIPE MODAL: THE CORNER BOX */}
      {showStripe && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#111', border: '2px solid #D4AF37', padding: '40px', borderRadius: '20px', width: '400px', textAlign: 'center' }}>
            <h3 style={{ color: '#D4AF37', marginBottom: '20px' }}>SEAL YOUR GIFT</h3>
            <p style={{ color: '#ccc', fontSize: '0.8rem', marginBottom: '30px' }}>Secure Payment via Stripe: $0.99</p>
            {/* Stripe Element Placeholder */}
            <div style={{ padding: '20px', background: '#222', borderRadius: '10px', marginBottom: '20px', border: '1px solid #444', color: '#888' }}>
              Card Details Entry...
            </div>
            <button onClick={() => setShowStripe(false)} style={{ background: '#D4AF37', color: '#000', padding: '10px 30px', borderRadius: '5px', border: 'none', fontWeight: 'bold' }}>COMPLETE & SEND</button>
            <p onClick={() => setShowStripe(false)} style={{ color: '#D4AF37', marginTop: '15px', fontSize: '0.7rem', cursor: 'pointer', textDecoration: 'underline' }}>Cancel</p>
          </div>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', background: 'rgba(0,0,0,0.1)' }}>
        
        {/* TILE SHELF WITH LABELS */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', minHeight: '130px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {selectedWords.map((word, i) => {
            const char = word.replace(/[^a-zA-Z]/g, "").toUpperCase()[0] || 'A';
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', border: '2px solid #D4AF37', borderRadius: '8px', overflow: 'hidden', width: '75px', height: '105px', background: 'rgba(0,0,0,0.8)' }}>
                  <img src={`${bucketUrl}/${char}5.png`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ color: '#D4AF37', fontSize: '0.7rem', marginTop: '8px', fontWeight: 'bold' }}>{word.toUpperCase()}</p>
              </div>
            );
          })}
        </div>

        <textarea 
          placeholder="Write your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '85%', maxWidth: '900px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '2.4rem', outline: 'none', height: '180px', resize: 'none', textAlign: 'center', fontFamily: 'serif', fontStyle: 'italic', textShadow: '4px 4px 15px rgba(0,0,0,1)' }}
        />

        {/* INTERACTIVE BUTTONS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '850px', marginTop: '30px' }}>
          {words.map((word, i) => (
            <button key={i} onClick={() => toggleWord(word)} style={{ padding: '10px 18px', border: '1px solid rgba(212,175,55,0.8)', background: selectedWords.includes(word) ? '#D4AF37' : 'rgba(0,0,0,0.5)', color: selectedWords.includes(word) ? '#000' : '#D4AF37', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              {word}
            </button>
          ))}
        </div>

        {text.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <button 
              onClick={() => setShowStripe(true)} 
              style={{ padding: '20px 80px', background: '#D4AF37', color: '#000', borderRadius: '50px', fontWeight: 'bold', border: 'none', letterSpacing: '4px', fontSize: '1rem' }}>
              PAY & SEND
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
