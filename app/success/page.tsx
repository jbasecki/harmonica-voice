'use client';
import React from 'react';

export default function SuccessPage() {
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  return (
    <main style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', fontFamily: 'serif', textAlign: 'center', padding: '20px' }}>
      
      {/* SUCCESS BACKGROUND: MUSHROOM SANCTUARY */}
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, opacity: 0.5 }}>
        <source src={`${bucketUrl}/12.mp4`} type="video/mp4" />
      </video>

      {/* PIANO SANCTUARY AUDIO */}
      <audio autoPlay loop src={`${bucketUrl}/piano.mp3`} />

      <div style={{ position: 'relative', zIndex: 2, background: 'rgba(0,0,0,0.7)', padding: '50px', borderRadius: '30px', border: '2px solid #D4AF37', maxWidth: '600px', backdropFilter: 'blur(10px)' }}>
        <h1 style={{ letterSpacing: '8px', fontSize: '2.5rem', marginBottom: '20px' }}>GIFT SEALED</h1>
        <p style={{ fontStyle: 'italic', fontSize: '1.2rem', marginBottom: '40px' }}>Your cognitive stash has been secured within the sanctuary.</p>
        
        <div style={{ background: 'rgba(212,175,55,0.1)', padding: '20px', borderRadius: '15px', border: '1px dashed #D4AF37' }}>
          <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '10px', letterSpacing: '2px' }}>SHAREABLE RECIPIENT LINK:</p>
          <p style={{ fontWeight: 'bold', fontSize: '1rem', wordBreak: 'break-all' }}>https://harmonica-voice.vercel.app/open?id=demo</p>
        </div>

        <button 
          onClick={() => window.location.href = '/composer'} 
          style={{ marginTop: '40px', background: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', padding: '12px 40px', borderRadius: '50px', cursor: 'pointer', letterSpacing: '2px', fontWeight: 'bold' }}>
          RETURN TO STUDIO
        </button>
      </div>
    </main>
  );
}
