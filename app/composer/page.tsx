'use client';
import React, { useState, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '12'; 
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showStripe, setShowStripe] = useState(false);
  const [showInfo, setShowInfo] = useState(false); // [i] Button state
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  const toggleWord = (word: string) => {
    setSelectedWords(prev => prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]);
  };

  const words = text.split(/[ \n]+/).filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'serif' }}>
      
      {/* 1. CINEMATIC ATMOSPHERE */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      {/* 2. THE [i] INFORMATION BUTTON */}
      <button 
        onClick={() => setShowInfo(!showInfo)}
        style={{ position: 'fixed', top: '25px', left: '25px', zIndex: 10, background: 'rgba(0,0,0,0.6)', color: '#D4AF37', border: '1px solid #D4AF37', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer', fontWeight: 'bold' }}>
        i
      </button>

      {/* INFO OVERLAY */}
      {showInfo && (
        <div onClick={() => setShowInfo(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
          <div style={{ maxWidth: '500px', textAlign: 'center', border: '1px solid #D4AF37', padding: '30px', borderRadius: '20px' }}>
            <h2 style={{ color: '#D4AF37', letterSpacing: '3px', marginBottom: '20px' }}>COGNITIVE STASHING</h2>
            <p style={{ color: '#fff', lineHeight: '1.6', fontSize: '0.9rem' }}>
              Your words are preserved through a patented dual-modality method. 
              The **Artistic Modality** transforms thought into structural resonance using geometric tiles, 
              while the **Atmospheric Modality** creates a cinematic sanctuary for the message to live in.
            </p>
            <p style={{ color: '#D4AF37', marginTop: '20px', fontSize: '0.7rem' }}>Click anywhere to close.</p>
          </div>
        </div>
      )}

      {/* 3. THE STRIPE MODAL */}
      {showStripe && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#111', border: '2px solid #D4AF37', padding: '40px', borderRadius: '20px', width: '400px', textAlign: 'center', boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}>
            <h3 style={{ color: '#D4AF37', marginBottom: '20px', letterSpacing: '4px' }}>SEAL YOUR GIFT</h3>
            <p style={{ color: '#ccc', fontSize: '0.8rem', marginBottom: '30px' }}>Secure Payment via Stripe: $0.99</p>
            <div style={{ padding: '20px', background: '#222', borderRadius: '10px', marginBottom: '20px', border: '1px solid #444', color: '#888' }}>
              Secure Card Entry...
            </div>
            <button style={{ width: '100%', background: '#D4AF37', color: '#000', padding: '15px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>COMPLETE & SEND</button>
            <p onClick={() => setShowStripe(false)} style={{ color: '#D4AF37', marginTop: '15px', fontSize: '0.7rem', cursor: 'pointer' }}>Cancel</p>
          </div>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        
        {/* TILE PREVIEW */}
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
          style={{ width: '85%', maxWidth: '900px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '2.4rem', outline: 'none', height: '180px', resize: 'none', textAlign: 'center', fontStyle: 'italic', textShadow: '4px 4px 15px rgba(0,0,0,1)' }}
        />

        {/* INTERACTIVE BUTTONS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '850px', marginTop: '30px' }}>
          {words.map((word, i) => (
            <button key={i} onClick={() => toggleWord(word)} style={{ padding: '10px 18px', border: '1px solid rgba(212,175,55,0.8)', background: selectedWords.includes(word) ? '#D4AF37' : 'rgba(0,0,0,0.5)', color: selectedWords.includes(word) ? '#000' : '#D4AF37', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', backdropFilter: 'blur(4px)' }}>
              {word}
            </button>
          ))}
        </div>

        {text.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <button 
              onClick={() => setShowStripe(true)} 
              style={{ padding: '20px 80px', background: '#D4AF37', color: '#000', borderRadius: '50px', fontWeight: 'bold', border: 'none', letterSpacing: '4px', fontSize: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }}>
              PAY & SEND
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
