'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ComposerContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '12'; 
  const [text, setText] = useState('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showStripe, setShowStripe] = useState(false);
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

      {/* PIANO SANCTUARY AUDIO */}
      <audio autoPlay loop src={`${bucketUrl}/piano.mp3`} />

      {/* MODAL: STRIPE CHECKOUT */}
      {showStripe && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0a0a0a', border: '2px solid #D4AF37', padding: '40px', borderRadius: '30px', width: '450px', textAlign: 'center', boxShadow: '0 0 50px rgba(212,175,55,0.2)' }}>
            <h3 style={{ color: '#D4AF37', letterSpacing: '4px', marginBottom: '10px' }}>SEAL YOUR GIFT</h3>
            <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '30px' }}>Secure Processing via Stripe • $0.99</p>
            
            <button 
              onClick={() => window.location.href = 'https://buy.stripe.com/00w28s3mQ7dj6srevQfn00b'} 
              style={{ width: '100%', background: '#D4AF37
