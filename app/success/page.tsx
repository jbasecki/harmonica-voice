'use client';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '7'; 
  const message = searchParams.get('message') || '';
  const tiles = searchParams.get('tiles') || '';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  
  // Construct the final link for the recipient
  const finalLink = `https://harmonica-voice.vercel.app/open?vibe=${vibe}&message=${message}&tiles=${tiles}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalLink);
    alert("Gift Link Copied! Send it to your loved one.");
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflow: 'hidden', fontFamily: 'serif' }}>
      
      {/* PERSISTENT CINEMATIC VIDEO */}
      <video key={vibe} autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, opacity: 0.6 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '20px' }}>
        
        <div style={{ background: 'rgba(0,0,0,0.8)', padding: '50px', borderRadius: '40px', border: '2px solid #D4AF37', maxWidth: '600px', boxShadow: '0 0 50px rgba(212,175,55,0.3)' }}>
          <h1 style={{ letterSpacing: '8px', marginBottom: '20px' }}>GIFT SEALED</h1>
          <p style={{ fontStyle: 'italic', fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9 }}>
            Your patented cognitive stash has been created and is ready for delivery.
          </p>

          <div style={{ background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #333', marginBottom: '30px' }}>
            <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '10px', letterSpacing: '2px' }}>YOUR UNIQUE SHARE LINK</p>
            <p style={{ fontSize: '0.8rem', wordBreak: 'break-all', color: '#D4AF37' }}>{finalLink}</p>
          </div>

          <button 
            onClick={copyToClipboard}
            style={{ padding: '20px 60px', background: '#D4AF37', color: '#000', borderRadius: '50px', fontWeight: 'bold', border: 'none', cursor: 'pointer', letterSpacing: '4px', fontSize: '1rem' }}>
            COPY & SEND GIFT
          </button>
          
          <p onClick={() => window.location.href = '/'} style={{ marginTop: '30px', fontSize: '0.7rem', cursor: 'pointer', opacity: 0.6, letterSpacing: '2px' }}>
            CREATE ANOTHER STASH
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SuccessPage() { return <Suspense><SuccessContent /></Suspense>; }
