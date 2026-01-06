'use client';
import React from 'react';

export default function SuccessPage() {
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', fontFamily: 'serif', textAlign: 'center', padding: '20px' }}>
      
      {/* CINEMATIC BACKGROUND: MUSHROOM SANCTUARY */}
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, opacity: 0.4 }}>
        <source src={`${bucketUrl}/12.mp4`} type="video/mp4" />
      </video>

      {/* PIANO SANCTUARY AUDIO */}
      <audio autoPlay loop src={`${bucketUrl}/piano.mp3`} />

      <div style={{ position: 'relative', zIndex: 2, background: 'rgba(0,0,0,0.85)', padding: '60px', borderRadius: '40px', border: '2px solid #D4AF37', maxWidth: '650px', backdropFilter: 'blur(15px)', boxShadow: '0 0 60px rgba(212,175,55,0.2)' }}>
        <h1 style={{ letterSpacing: '10px', fontSize: '2.8rem', marginBottom: '20px' }}>GIFT SEALED</h1>
        <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '40px', color: '#aaa' }}>Your cognitive stash is secured. The sanctuary awaits your recipient.</p>
        
        <div style={{ background: 'rgba(212,175,55,0.05)', padding: '30px', borderRadius: '20px', border: '1px dashed rgba(212,175,55,0.5)', marginBottom: '40px' }}>
          <p style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '15px', letterSpacing: '3px' }}>RECIPIENT GIFT LINK</p>
          <p style={{ fontWeight: 'bold', fontSize: '1rem', wordBreak: 'break-all', color: '#fff' }}>
            https://harmonica-voice.vercel.app/open?id=demo
          </p>
        </div>

        <button 
          onClick={() => window.location.href = '/composer'} 
          style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '15px 50px', borderRadius: '50px', cursor: 'pointer', letterSpacing: '3px', fontWeight: 'bold' }}>
          RETURN TO STUDIO
        </button>
      </div>
    </main>
  );
}
