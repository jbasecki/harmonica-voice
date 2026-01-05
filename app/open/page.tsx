'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const vibe = searchParams.get('vibe') || '1';
  const message = searchParams.get('message') || '';
  const tilesStr = searchParams.get('tiles') || '';
  const artist = searchParams.get('artist') || 'gold';
  const bucketUrl = "https://storage.googleapis.com/simple-bucket-27";
  
  // THE FILTER ENGINE: Matches the curation studio
  const artistFilters: Record<string, string> = {
    gold: 'none',
    silver: 'grayscale(100%) brightness(1.2) contrast(1.1) sepia(0.1)',
    noir: 'grayscale(100%) brightness(0.6) contrast(1.8)',
    rose: 'sepia(0.4) hue-rotate(290deg) brightness(1.1) contrast(1.2)'
  };

  const selectedWords = tilesStr.split(',').filter(Boolean);

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: '#D4AF37', position: 'relative', overflowX: 'hidden', fontFamily: 'serif' }}>
      
      {/* ATMOSPHERIC MODALITY: Curated Background */}
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, zIndex: -1 }}>
        <source src={`${bucketUrl}/${vibe}.mp4`} type="video/mp4" />
      </video>

      {/* PIANO SANCTUARY */}
      <audio autoPlay loop src={`${bucketUrl}/piano.mp3`} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
        
        {/* THE COGNITIVE UNIT */}
        <div style={{ background: 'rgba(0,0,0,0.6)', padding: '40px', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.2)', textAlign: 'center', marginBottom: '40px', maxWidth: '800px' }}>
            <p style={{ fontStyle: 'italic', fontSize: '1.8rem' }}>"{decodeURIComponent(message.replace(/\+/g, ' '))}"</p>
        </div>

        {/* ARTISTIC MODALITY: Stashed Tiles with Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {selectedWords.map((word, i) => {
            const clean = word.replace(/[^a-zA-Z]/g, "").toUpperCase();
            const first = clean[0] || 'A';
            const oneBeforeLast = clean.length > 1 ? clean[clean.length - 2] : first;
            return (
              <div key={i} style={{ border: '1px solid #D4AF37', borderRadius: '8px', overflow: 'hidden', width: '100px', height: '140px', filter: artistFilters[artist] || 'none' }}>
                <img src={`${bucketUrl}/${first}5.png`} style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
                <img src={`${bucketUrl}/${oneBeforeLast}5.png`} style={{ width: '50%', height: '100%', objectFit: 'cover' }} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default function OpenPage() { return <Suspense><OpenContent /></Suspense>; }
