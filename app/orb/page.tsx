'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OrbContent() {
  const searchParams = useSearchParams();
  
  // 1. CATCH THE DATA: Grab vibe, message, and tiles from the URL
  const vibe = searchParams.get('vibe') || '14';
  const message = searchParams.get('message') || '';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";

  // 2. THE HARMONICA RULE: First and One-Before-Last with '5' suffix
  const wordsArray = decodeURIComponent(tiles).split(',').filter(Boolean).map(word => {
    const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const first = clean[0] || 'A';
    const oneBeforeLast = clean.length > 1 ? clean[clean.length - 2] : first;
    return { original: word.toUpperCase(), first, oneBeforeLast };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#000', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      
      {/* 3. ATMOSPHERIC CONTINUITY: The chosen video background */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', paddingTop: '6vh' }}>
        
        {/* 4. THE HERO: The sender's original English words */}
        <div style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '40px', padding: '30px', background: 'rgba(0,0,0,0.5)', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.2)' }}>
          <p style={{ color: '#D4AF37', fontSize: '1.6rem', fontStyle: 'italic', lineHeight: '1.6' }}>
             {decodeURIComponent(message) || "Your message awaits..."}
          </p>
        </div>

        <h2 style={{ color: '#D4AF37', letterSpacing: '12px', fontSize: '0.8rem', opacity: 0.7, marginBottom: '4vh' }}>THE HARMONICA UNFOLDING</h2>
        
        {/* 5. THE ART: Grid of golden abstracts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', width: '100%', maxWidth: '1100px', justifyItems: 'center' }}>
          {wordsArray.map((w, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', border: '1px solid #D4AF37', borderRadius: '15px', overflow: 'hidden', background: 'rgba(0,0,0,0.8)', boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
                <img src={`${bucketUrl}/${w.first}5.png`} style={{ width: '120px', height: '170px', objectFit: 'cover' }} alt={w.first} />
                <img src={`${bucketUrl}/${w.oneBeforeLast}5.png`} style={{ width: '120px', height: '170px', objectFit: 'cover' }} alt={w.oneBeforeLast} />
              </div>
              <p style={{ color: '#D4AF37', marginTop: '12px', letterSpacing: '3px', fontSize: '0.75rem', fontWeight: 'bold' }}>{w.original}</p>
            </div>
          ))}
        </div>

        {/* 6. THE SEAL: Carry everything to the final Open page */}
        <button 
          onClick={() => {
            const currentParams = new URLSearchParams(window.location.search);
            window.location.href = `/open?${currentParams.toString()}`;
          }}
          style={{ marginTop: '8vh', padding: '18px 70px', border: '1px solid #D4AF37', color: '#D4AF37', background: 'transparent', letterSpacing: '5px', cursor: 'pointer', borderRadius: '50px', fontWeight: 'bold', marginBottom: '60px', transition: '0.3s' }}>
          SEAL & SHARE
        </button>

      </div>
    </main>
  );
}

export default function OrbPage() {
  return <Suspense><OrbContent /></Suspense>;
}
