'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '12'; 
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showStripe, setShowStripe] = useState(false);
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

      {/* MODAL: EMBEDDED STRIPE ATMOSPHERE */}
      {showStripe && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
          <div style={{ background: '#0a0a0a', border: '2px solid #D4AF37', padding: '40px', borderRadius: '30px', width: '450px', textAlign: 'center', boxShadow: '0 0 50px rgba(212,175,55,0.2)' }}>
            <h3 style={{ color: '#D4AF37', letterSpacing: '4px', marginBottom: '10px' }}>SEAL YOUR GIFT</h3>
            <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '30px' }}>Secure Processing via Stripe • $0.99</p>
            
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ color: '#D4AF37', fontSize: '0.6rem', letterSpacing: '1px' }}>PAYMENT METHOD</label>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #333', padding: '15px', borderRadius: '10px', marginTop: '5px', color: '#555', fontSize: '0.9rem' }}>
                Secure Checkout Powered by Stripe
              </div>
            </div>

            <button 
              onClick={() => window.location.href = 'https://buy.stripe.com/eVq00k2iM8hneYX73ofnO0d'} 
              style={{ width: '100%', background: '#D4AF37', color: '#000', padding: '18px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' }}>
              COMPLETE TRANSACTION
            </button>

            <p onClick={() => setShowStripe(false)} style={{ color: '#D4AF37', marginTop: '20px', fontSize: '0.7rem', cursor: 'pointer', opacity: 0.6 }}>Return to Sanctuary</p>
          </div>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        
        {/* TILE SHELF: DUAL-LETTER LOGIC WITH LABELS */}
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
          style={{ width: '85%', maxWidth: '900px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '2.4rem', outline: 'none', height: '180px', resize: 'none', textAlign: 'center', fontStyle: 'italic', textShadow: '4px 4px 15px rgba(0,0,0,1)' }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '850px', marginTop: '30px' }}>
          {words.map((word, i) => (
            <button key={i} onClick={() => toggleWord(word)} 
              style={{ padding: '10px 20px', border: '1px solid rgba(212,175,55,0.4)', background: selectedWords.includes(word) ? '#D4AF37' : 'rgba(0,0,0,0.5)', color: selectedWords.includes(word) ? '#000' : '#D4AF37', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}>
              {word}
            </button>
          ))}
        </div>

        {text.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <button 
              onClick={() => setShowStripe(true)} 
              style={{ padding: '20px 80px', background: '#D4AF37', color: '#000', borderRadius: '50px', fontWeight: 'bold', border: 'none', letterSpacing: '4px', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}>
              PAY & SEND
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
