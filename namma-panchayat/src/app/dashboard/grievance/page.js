"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import VoiceRecorder from '@/components/VoiceRecorder';
import ListenButton from '@/components/ListenButton';
import Link from 'next/link';

export default function GrievancePage() {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [recording, setRecording] = useState(null);
  const [category, setCategory] = useState('');
  const [transcribing, setTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('');

  const categories = [
    { id: 'roads', label: { en: "Roads", kn: "ರಸ್ತೆಗಳು" }, icon: "🛣️", color: "#8b4513", bg: "rgba(139,69,19,0.1)" },
    { id: 'water', label: { en: "Water", kn: "ನೀರು" }, icon: "🚰", color: "#1976d2", bg: "rgba(25,118,210,0.1)" },
    { id: 'lights', label: { en: "Streetlights", kn: "ಬೀದಿ ದೀಪಗಳು" }, icon: "💡", color: "#f57c00", bg: "rgba(245,124,0,0.1)" },
  ];

  const handleStop = (blob, url) => {
    setRecording(url);
    setTranscribing(true);
    setTimeout(() => {
      setTranscript(lang === 'en' ? "The road near my house has a big pothole causing problems." : "ನನ್ನ ಮನೆ ಬಳಿ ದೊಡ್ಡ ಗುಂಡಿ ಇದ್ದು ತೊಂದರೆಯಾಗುತ್ತಿದೆ.");
      setTranscribing(false);
    }, 2000);
  };

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '24px', textAlign: 'center' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(56,142,60,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>✅</div>
        <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800, color: '#388e3c' }}>
          {lang === 'en' ? "Grievance Submitted!" : "ದೂರು ಸಲ್ಲಿಸಲಾಗಿದೆ!"}
        </h2>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px 32px', backdropFilter: 'blur(8px)' }}>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{lang === 'en' ? "Your Ticket ID" : "ನಿಮ್ಮ ಟಿಕೆಟ್ ಸಂಖ್ಯೆ"}</p>
          <h3 style={{ margin: '8px 0', color: 'var(--primary)', fontWeight: 900, fontSize: '1.6rem', letterSpacing: '2px' }}>#PAN-8824</h3>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lang === 'en' ? "You will be notified once the PDO reviews this." : "PDO ಪರಿಶೀಲಿಸಿದ ನಂತರ ನಿಮಗೆ ತಿಳಿಸಲಾಗುತ್ತದೆ."}</p>
        </div>
        <Link href="/dashboard" className="btn-premium btn-primary" style={{ borderRadius: '50px' }}>
          {lang === 'en' ? "← Back to Dashboard" : "← ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ"}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <header>
        <Link href="/dashboard" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
          ← {lang === 'en' ? 'Dashboard' : 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px', gap: '8px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(211,47,47,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🎤</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{t('dashboard.grievance')}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{lang === 'en' ? "Your voice reaches the Panchayat" : "ನಿಮ್ಮ ಧ್ವನಿ ಪಂಚಾಯತ್ ತಲುಪುತ್ತದೆ"}</p>
          </div>
          <ListenButton text={lang === 'en' ? "Voice Grievance. Record your complaint." : "ಧ್ವನಿ ದೂರು. ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ದಾಖಲಿಸಿ."} />
        </div>
      </header>

      {/* Step 1: Category */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '28px', backdropFilter: 'blur(8px)' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
          STEP 1 · {lang === 'en' ? "SELECT ISSUE TYPE" : "ಸಮಸ್ಯೆಯ ವರ್ಗ"}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
              padding: '20px 12px', borderRadius: '18px', border: `2px solid ${category === cat.id ? cat.color : 'var(--border-color)'}`,
              background: category === cat.id ? cat.bg : 'var(--bg-app)',
              cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
              transition: 'all 0.25s ease', fontFamily: 'inherit'
            }}>
              <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: category === cat.id ? cat.color : 'var(--text-main)' }}>
                {cat.label[lang]}
              </span>
              {category === cat.id && <div style={{ width: '20px', height: '3px', borderRadius: '2px', background: cat.color }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Voice */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '28px', backdropFilter: 'blur(8px)', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 28px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
          STEP 2 · {lang === 'en' ? "RECORD YOUR COMPLAINT" : "ನಿಮ್ಮ ದೂರನ್ನು ದಾಖಲಿಸಿ"}
        </h3>
        <VoiceRecorder onStop={handleStop} />
      </div>

      {/* Transcript */}
      {transcribing && (
        <div style={{ textAlign: 'center', padding: '20px', background: 'var(--primary-glow)', borderRadius: '16px', color: 'var(--primary)', fontWeight: 600 }}>
          ✨ {lang === 'en' ? "AI is transcribing your voice..." : "AI ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಅನುವಾದಿಸುತ್ತಿದೆ..."}
        </div>
      )}

      {transcript && (
        <div style={{ background: 'var(--bg-card)', border: '2px solid var(--primary)', borderRadius: '20px', padding: '24px', backdropFilter: 'blur(8px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>📝</span>
            <h4 style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)', letterSpacing: '0.5px' }}>
              {lang === 'en' ? "AI TRANSCRIPT" : "AI ಪ್ರತಿಲಿಪಿ"}
            </h4>
            <ListenButton text={transcript} />
          </div>
          <p style={{ margin: '0 0 16px', fontStyle: 'italic', color: 'var(--text-main)', lineHeight: 1.6 }}>"{transcript}"</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'var(--bg-app)', borderRadius: '12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            📍 <span style={{ fontWeight: 600 }}>Ward 4, Hoskote · 13.0706° N, 77.7937° E</span>
          </div>
        </div>
      )}

      {/* Submit */}
      {recording && category && (
        <button onClick={() => setSubmitted(true)} className="btn-premium btn-primary" style={{ width: '100%', borderRadius: '50px', padding: '18px', fontSize: '1.1rem' }}>
          🚀 {lang === 'en' ? "Submit Grievance" : "ದೂರು ಸಲ್ಲಿಸಿ"}
        </button>
      )}
    </div>
  );
}
