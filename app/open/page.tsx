'use client';
import React, { useState, useEffect } from 'react';

export default function LandingPage() {
  // Logic to pick a random starting video from your 19 assets
  const [selectedVibe, setSelectedVibe] = useState('14'); 

  useEffect(() => {
    const randomVibe = Math.floor(Math.random() * 19) + 1;
    setSelectedVibe(randomVibe.toString());
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflow: 'hidden' }}>
      <video key={selectedVibe} autoPlay loop muted playsInline 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedVibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ textAlign: 'center', letterSpacing: '10px', fontSize: '1rem', marginTop: '60px' }}>HOW TO GIFT A HARMONICA</h3>
        
        {/* Navigation remains frozen for brand continuity */}
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '60px', padding: '30px', borderBottom: '1px solid rgba(212,175,55,0.2)', width: '80%' }}>
          <span>1. COMPOSE</span><span>2. STASH</span><span>3. PRODUCE</span><span>4. SHARE</span>
        </nav>

        <div style={{ textAlign: 'center', marginTop: '15vh' }}>
          <h1 style={{ fontSize: '5rem', letterSpacing: '30px', fontWeight: 'normal', margin: 0 }}>HARMONICA</h1>
          <p style={{ fontSize: '1.2rem', letterSpacing: '5px', opacity: 0.6, marginTop: '20px', fontStyle: 'italic' }}>
            A Sanctuary for Stashed Cognition
          </p>

          {/* User can still choose their own path */}
          <div style={{ marginTop: '10vh', display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px', maxWidth: '500px', margin: '10vh auto 0' }}>
            {Array.from({ length: 19 }, (_, i) => i + 1).map((num) => (
              <button key={num} onClick={() => setSelectedVibe(num.toString())}
                style={{ background: 'transparent', border: selectedVibe === num.toString() ? '1px solid gold' : 'none', color: 'gold', cursor: 'pointer', fontSize: '0.8rem' }}>
                {num}
              </button>
            ))}
          </div>

          <button onClick={() => window.location.href = `/composer?vibe=${selectedVibe}`}
            style={{ marginTop: '50px', padding: '15px 80px', border: '1px solid #D4AF37', color: '#D4AF37', background: 'transparent', letterSpacing: '8px', cursor: 'pointer', borderRadius: '50px' }}>
            CONFIRM PATH
          </button>
        </div>
      </div>
    </main>
  );
}
