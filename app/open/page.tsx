'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '1'; // The curated Atmosphere
  const message = searchParams.get('message') || '';
  const tilesStr = searchParams.get('tiles') || '';
  const artist = searchParams.get('artist') || 'gold';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  
  const selectedWords = tilesStr.split(',').filter(Boolean);
  const folder = artist === 'gold' ? '5' : '6'; // Mapping the Artist Modality

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      
      {/* THE CURATED ATMOSPHERE */}
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      {/* THE PIANO SANCTUARY AUDIO */}
      <audio autoPlay loop src={`${bucketUrl}/piano.mp3`} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
        
        {/* THE MESSAGE */}
        <div style={{ background: 'rgba(0,0,0,0.6)', padding: '40px', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', textAlign: 'center', marginBottom: '40px', maxWidth: '800px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.8rem' }}>"{decodeURIComponent(message.replace(/\+/g, ' '))}"</p>
        </div>

        {/* THE STASHED ARTISTIC TILES */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {selectedWords.map((word, i) => {
            const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
            const first = clean[0] || 'A';
            const oneBeforeLast = clean.length > 1 ? clean[clean.length - 2] : first;
            return (
              <div key={i} style={{ border: '1px solid #D4AF37', borderRadius: '8px', overflow: 'hidden', width: '100px', height: '140px' }}>
                <img src={`${bucketUrl}/${first}${folder}.png`} style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
                <img src={`${bucketUrl}/${oneBeforeLast}${folder}.png`} style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default function OpenPage() { return <Suspense><OpenContent /></Suspense>; }
