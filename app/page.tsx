'use client';
import React, { useState } from 'react';

export default function LandingPage() {
  const [selectedVibe, setSelectedVibe] = useState('14'); // Verified Rainforest ID

  // Your full list of 19 verified bucket IDs
  const vibes = [
    { id: '1', name: 'VIBE 1' }, { id: '2', name: 'VIBE 2' }, { id: '3', name: 'VIBE 3' },
    { id: '4', name: 'VIBE 4' }, { id: '5', name: 'VIBE 5' }, { id: '6', name: 'VIBE 6' },
    { id: '7', name: 'VIBE 7' }, { id: '8', name: 'VIBE 8' }, { id: '9', name: 'VIBE 9' },
    { id: '10', name: 'VIBE 10' }, { id: '11', name: 'VIBE 11' }, { id: '12', name: 'VIBE 12' },
    { id: '13', name: 'VIBE 13' }, { id: '14', name: 'RAINFOREST' }, { id: '15', name: 'VIBE 15' },
    { id: '16', name: 'VIBE 16' }, { id: '17', name: 'VIBE 17' }, { id: '18', name: 'VIBE 18' },
    { id: '19', name: 'VIBE 19' }
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'gold', position: 'relative', overflow: 'hidden' }}>
      {/* Background Video Engine */}
      <video key={selectedVibe} autoPlay loop muted playsInline 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedVibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* The 4 Points of Action Header */}
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '50px', padding: '40px', letterSpacing: '4px', fontSize: '0.75rem' }}>
          <span>SANCTUARY</span>
          <span>MUSEUM</span>
          <span>COLLECTION</span>
          <span>ABOUT</span>
        </nav>

        <div style={{ textAlign: 'center', marginTop: '15vh' }}>
          <h1 style={{ fontSize: '4rem', letterSpacing: '20px', fontWeight: 'normal' }}>HARMONICA</h1>
          
          <div style={{ marginTop: '10vh', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', maxWidth: '600px', margin: '10vh auto 0' }}>
            {vibes.map((v) => (
              <button key={v.id} onClick={() => setSelectedVibe(v.id)}
                style={{ padding: '8px', border: selectedVibe === v.id ? '1px solid gold' : '1px solid transparent', background: 'transparent', color: 'gold', cursor: 'pointer', fontSize: '0.6rem' }}>
                {v.id}
              </button>
            ))}
          </div>

          <button onClick={() => window.location.href = `/composer?vibe=${selectedVibe}`}
            style={{ marginTop: '50px', padding: '15px 60px', border: '1px solid gold', background: 'transparent', color: 'gold', letterSpacing: '6px', cursor: 'pointer' }}>
            CONFIRM PATH
          </button>
        </div>
      </div>
    </main>
  );
}
