// Update these specific sections in your return statement:

<div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
  <h2 style={{ letterSpacing: '10px', fontSize: '0.8rem', marginBottom: '5vh', opacity: 0.6 }}>CHAPTER II: DUAL MODALITY CURATION</h2>
  
  {/* THE COGNITIVE UNIT: The original message */}
  <div style={{ background: 'rgba(0,0,0,0.7)', padding: '40px', borderRadius: '30px', border: '1px solid rgba(212,175,55,0.3)', textAlign: 'center', marginBottom: '40px', maxWidth: '850px' }}>
      <p style={{ color: '#888', fontSize: '0.6rem', letterSpacing: '2px', marginBottom: '10px' }}>THE THOUGHT</p>
      <p style={{ fontStyle: 'italic', fontSize: '1.6rem', lineHeight: '1.6' }}>"{decodeURIComponent(message.replace(/\+/g, ' '))}"</p>
  </div>

  {/* MODALITY 1: THE ATMOSPHERE (VIDEO) */}
  <div style={{ marginBottom: '50px', textAlign: 'center' }}>
    <p style={{ fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '20px', opacity: 0.8 }}>MODALITY I: CHOOSE THE ATMOSPHERE</p>
    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
      {gallery.map(v => (
        <button key={v.id} onClick={() => setVibe(v.id)} style={{ padding: '12px 24px', background: vibe === v.id ? '#D4AF37' : 'transparent', color: vibe === v.id ? '#000' : '#D4AF37', border: '1px solid #D4AF37', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          {v.name}
        </button>
      ))}
    </div>
  </div>

  {/* MODALITY 2: THE VISION (AI) */}
  <div style={{ textAlign: 'center', marginBottom: '60px' }}>
     <p style={{ fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '20px', opacity: 0.8 }}>MODALITY II: ACTIVATE NANO BANANA VISION</p>
     <button 
       onClick={triggerNanoBanana}
       style={{ padding: '18px 40px', border: '1px solid #D4AF37', background: isAiLoading ? '#222' : 'rgba(212,175,55,0.1)', color: '#D4AF37', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>
       {isAiLoading ? '⌛ TRANSLATING THOUGHT...' : '✨ GENERATE AI INTERPRETATION'}
     </button>
  </div>
</div>
