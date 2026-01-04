'use client';
import React, { useState } from 'react';

export default function LandingPage() {
  const [selectedVibe, setSelectedVibe] = useState('14'); // Default: Rainforest

  const vibes = [
    { id: '14', name: 'RAINFOREST' },
    { id: '1', name: 'DESERT' },
    { id: '5', name: 'OCEAN' },
    { id: '19', name: 'NEBULA' }
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'gold', textAlign: 'center' }}>
      {/* 4 Points of Action Header */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '30px', letterSpacing: '3px', fontSize: '0.8rem', borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
        <span>SANCTUARY</span>
        <span>MUSEUM</span>
        <span>COLLECTION</span>
        <span>ABOUT</span>
      </nav>

      <div style={{ marginTop: '10vh' }}>
        <h1 style={{ fontSize: '3rem', letterSpacing: '15px' }}>HARMONICA</h1>
        <p style={{ opacity: 0.6, fontStyle: 'italic' }}>SELECT YOUR VIBE</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
          {vibes.map((v) => (
            <button key={v.id} onClick={() => setSelectedVibe(v.id)}
              style={{ padding: '10px 20px', border: selectedVibe === v.id ? '1px solid gold' : '1px solid transparent', background: 'transparent', color: 'gold', cursor: 'pointer' }}>
              {v.name}
            </button>
          ))}
        </div>

        <button onClick={() => window.location.href = `/composer?vibe=${selectedVibe}`}
          style={{ marginTop: '60px', padding: '15px 50px', border: '1px solid gold', background: 'transparent', color: 'gold', letterSpacing: '5px', cursor: 'pointer' }}>
          CONFIRM PATH
        </button>
      </div>
    </main>
  );
}
