'use client';
import React, { useState } from 'react';

export default function LandingPage() {
  const [selectedVibe, setSelectedVibe] = useState('14'); 

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'gold', position: 'relative', overflow: 'hidden' }}>
      {/* Immersive Background Video */}
      <video key={selectedVibe} autoPlay loop muted playsInline 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedVibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
        {/* RESTORED: 4-Step Instructions Header */}
        <h3 style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '0.9rem', marginTop: '40px', fontWeight: 'bold' }}>
          HOW TO GIFT A HARMONICA
        </h3>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '60px', padding: '30px 10px', borderBottom: '1px solid #333', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}><p style={{ margin: 0, fontWeight: 'bold' }}>1. COMPOSE</p><p style={{ fontSize: '0.6rem', opacity: 0.7 }}>Write in the sanctuary.</p></div>
          <div style={{ textAlign: 'center' }}><p style={{ margin: 0, fontWeight: 'bold' }}>2. STASH</p><p style={{ fontSize: '0.6rem', opacity: 0.7 }}>Touch words into gold.</p></div>
          <div style={{ textAlign: 'center' }}><p style={{ margin: 0, fontWeight: 'bold' }}>3. PRODUCE</p><p style={{ fontSize: '0.6rem', opacity: 0.7 }}>Seal your unique link.</p></div>
          <div style={{ textAlign: 'center' }}><p style={{ margin: 0, fontWeight: 'bold' }}>4. SHARE</p><p style={{ fontSize: '0.6rem', opacity: 0.7 }}>Send the unfolding light.</p></div>
        </nav>

        {/* RESTORED: Main Branding with Subtitle */}
        <div style={{ textAlign: 'center', marginTop: '12vh' }}>
          <h1 style={{ fontSize: '5rem', letterSpacing: '25px', fontWeight: 'normal', margin: 0 }}>HARMONICA</h1>
          <p style={{ fontSize: '1.2rem', letterSpacing: '5px', opacity: 0.6, marginTop: '20px', fontFamily: 'serif' }}>
            A Sanctuary for Stashed Cognition
          </p>

          {/* Vibe Selection Grid */}
          <div style={{ marginTop: '10vh', display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px', maxWidth: '500px', margin: '10vh auto 0' }}>
            {Array.from({ length: 19 }, (_, i) => i + 1).map((num) => (
              <button key={num} onClick={() => setSelectedVibe(num.toString())}
                style={{ padding: '5px', border: selectedVibe === num.toString() ? '1px solid gold' : '1px solid transparent', background: 'transparent', color: 'gold', cursor: 'pointer', fontSize: '0.7rem' }}>
                {num}
              </button>
            ))}
          </div>

          <button onClick={() => window.location.href = `/composer?vibe=${selectedVibe}`}
            style={{ marginTop: '50px', padding: '18px 80px', border: '1px solid gold', background: 'transparent', color: 'gold', letterSpacing: '8px', cursor: 'pointer', borderRadius: '50px' }}>
            CONFIRM PATH
          </button>
        </div>
      </div>
    </main>
  );
}
