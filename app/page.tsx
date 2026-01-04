'use client';
import React, { useState, useEffect } from 'react';

export default function LandingPage() {
  const [selectedVibe, setSelectedVibe] = useState('14'); 

  useEffect(() => {
    // Picks a random starting point (1-19) for fresh ad content every load
    const randomVibe = Math.floor(Math.random() * 19) + 1;
    setSelectedVibe(randomVibe.toString());
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflow: 'hidden', fontFamily: 'serif' }}>
      {/* FULL SCREEN MP4 ENGINE */}
      <video key={selectedVibe} autoPlay loop muted playsInline 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedVibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
        <h3 style={{ textAlign: 'center', letterSpacing: '10px', fontSize: '1rem', marginTop: '60px' }}>HOW TO GIFT A HARMONICA</h3>
        
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '60px', padding: '30px', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', width: '80%' }}>
          <span>1. COMPOSE</span><span>2. STASH</span><span>3. PRODUCE</span><span>4. SHARE</span>
        </nav>

        <div style={{ marginTop: '12vh', textAlign: 'center' }}>
          <h1 style={{ fontSize: '5.5rem', letterSpacing: '35px', margin: '0' }}>HARMONICA</h1>
          <p style={{ fontSize: '1.2rem', letterSpacing: '6px', opacity: 0.7, fontStyle: 'italic' }}>A Sanctuary for Stashed Cognition</p>

          {/* VIBE PICKER (NUMBERS ONLY) */}
          <div style={{ marginTop: '10vh', display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '15px', maxWidth: '500px', margin: '10vh auto 0' }}>
            {Array.from({ length: 19 }, (_, i) => i + 1).map((num) => (
              <button key={num} onClick={() => setSelectedVibe(num.toString())}
                style={{ background: 'transparent', border: 'none', color: selectedVibe === num.toString() ? '#D4AF37' : 'rgba(212, 175, 55, 0.4)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: selectedVibe === num.toString() ? 'bold' : 'normal' }}>
                {num}
              </button>
            ))}
          </div>

          <button onClick={() => window.location.href = `/composer?vibe=${selectedVibe}`}
            style={{ marginTop: '8vh', padding: '18px 90px', border: '1px solid #D4AF37', background: 'transparent', color: '#D4AF37', letterSpacing: '10px', borderRadius: '50px', cursor: 'pointer' }}>
            CONFIRM PATH
          </button>
        </div>
      </div>
    </main>
  );
}
