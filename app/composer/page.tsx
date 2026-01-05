'use client';
import React, { useState, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

// This pulls the key from your Vercel Environment Variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '12'; 
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showStripe, setShowStripe] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
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

      {/* THE PIANO SANCTUARY */}
      <audio autoPlay loop src={`${bucketUrl}/piano.mp3`} />

      {/* GALLERY INFO BUTTON */}
      <button 
        onClick={() => setShowInfo(true)}
        style={{ position: 'fixed', top: '30px', left: '30px', zIndex: 10, background: 'rgba(0,0,0,0.4)', color: '#D4AF37', border: '1px solid #D4AF37', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', backdropFilter: 'blur(10px)' }}>
        i
      </button>

      {/* MODAL: INFO */}
      {showInfo && (
        <div onClick={() => setShowInfo(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <div style={{ maxWidth: '500px', textAlign: 'center', border: '1px solid #D4AF37', padding: '40px', borderRadius: '30px', background: 'rgba(10,10,10,0.9)' }}>
            <h2 style={{ color: '#D4AF37', letterSpacing: '5px', marginBottom: '20px' }}>COGNITIVE STASHING</h2>
            <p style={{ color: '#fff', lineHeight: '1.8', opacity: 0.9 }}>
              A patented dual-modality method. Your thought is preserved within abstract geometric tiles, reflecting the structural resonance of the message within a cinematic sanctuary.
            </p>
          </div>
        </div>
      )}

      {/* MODAL: STRIPE CHECKOUT */}
      {showStripe && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0a0a0a', border: '2px solid #D4AF37', padding: '50px', borderRadius: '30px', width: '450px', textAlign: 'center', boxShadow: '0 0 50px rgba(212,175,55,0.2)' }}>
            <h3 style={{ color: '#D4AF37', letterSpacing: '4px', marginBottom: '10px' }}>SEAL YOUR GIFT</h3>
            <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '30px' }}>Secure Processing via Stripe • $0.99</p>
            <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '10px', marginBottom: '30px', border: '1px solid #333', color: '#555' }}>
              Stripe Credit Card Element loads here...
            </div>
            <button 
  onClick={() => window.location.href = https://buy.stripe.com/00w28s3mQ7dj6srevQfnO0b
  style={{ width: '100%', background: '#D4AF37', color: '#000', padding: '18px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' }}>
  COMPLETE TRANSACTION
</button>
<p onClick={() => setShowStripe(false)} style={{ color: '#D4AF37', marginTop: '20px', fontSize: '0.7rem', cursor: 'pointer', opacity: 0.6 }}>Return to Sanctuary</p>
          </div>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        
        {/* TILE SHELF */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', minHeight: '140px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {selectedWords.map((word, i) => {
            const char = word.replace(/[^a-zA-Z]/g, "").toUpperCase()[0] || 'A';
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ border: '2px solid #D4AF37', borderRadius: '10px', overflow: 'hidden', width: '85px', height: '120px', background: 'rgba(0,0,0,0.8)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
                  <img src={`${bucketUrl}/${char}5.png`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ color: '#D4AF37', fontSize: '0.7rem', marginTop: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>{word.toUpperCase()}</p>
              </div>
            );
          })}
        </div>

        <textarea 
          placeholder="Enter your thought..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '85%', maxWidth: '950px', background: 'transparent', border: 'none', color: '#D4AF37', fontSize: '2.6rem', outline: 'none', height: '200px', resize: 'none', textAlign: 'center', fontStyle: 'italic', textShadow: '4px 4px 15px rgba(0,0,0,1)' }}
        />

        {/* INTERACTIVE BUTTONS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', maxWidth: '900px', marginTop: '40px' }}>
          {words.map((word, i) => (
            <button key={i} onClick={() => toggleWord(word)} 
              style={{ padding: '12px 22px', border: '1px solid rgba(212,175,55,0.6)', background: selectedWords.includes(word) ? '#D4AF37' : 'rgba(0,0,0,0.3)', color: selectedWords.includes(word) ? '#000' : '#D4AF37', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', backdropFilter: 'blur(5px)' }}>
              {word}
            </button>
          ))}
        </div>

        {text.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <button 
              onClick={() => setShowStripe(true)} 
              style={{ padding: '22px 100px', background: '#D4AF37', color: '#000', borderRadius: '60px', fontWeight: 'bold', border: 'none', letterSpacing: '5px', fontSize: '1.1rem', boxShadow: '0 15px 30px rgba(0,0,0,0.5)' }}>
              PAY & SEND
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ComposerPage() { return <Suspense><ComposerContent /></Suspense>; }
