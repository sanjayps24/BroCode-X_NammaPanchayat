"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import VoiceRecorder from '@/components/VoiceRecorder';
import ListenButton from '@/components/ListenButton';
import Link from 'next/link';

export default function GrievancePage() {
  const { t, lang } = useLanguage();
  const { user, addComplaint } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [recording, setRecording] = useState(null);
  const [category, setCategory] = useState('');
  const [transcribing, setTranscribing] = useState(false);
  const [complaintText, setComplaintText] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const categories = [
    { id: 'roads', label: { en: "Roads", kn: "ರಸ್ತೆಗಳು" }, icon: "🛣️", color: "#8b4513", bg: "rgba(139,69,19,0.1)" },
    { id: 'water', label: { en: "Water", kn: "ನೀರು" }, icon: "🚰", color: "#1976d2", bg: "rgba(25,118,210,0.1)" },
    { id: 'lights', label: { en: "Streetlights", kn: "ಬೀದಿ ದೀಪಗಳು" }, icon: "💡", color: "#f57c00", bg: "rgba(245,124,0,0.1)" },
  ];

  const handleStop = (blob, url) => {
    setRecording(url);
    setTranscribing(true);
    setTimeout(() => {
      const text = lang === 'en' ? "The road near my house has a big pothole causing problems." : "ನನ್ನ ಮನೆ ಬಳಿ ದೊಡ್ಡ ಗುಂಡಿ ಇದ್ದು ತೊಂದರೆಯಾಗುತ್ತಿದೆ.";
      setComplaintText(text);
      setTranscribing(false);
    }, 2000);
  };

  const handleSubmit = () => {
    const selectedCat = categories.find(c => c.id === category);
    const newId = addComplaint({
      user: user?.name || "Guest User",
      phone: user?.phone || "N/A",
      ward: user?.ward || "Unknown",
      address: userAddress || `Ward ${user?.ward || '?'}, Hoskote, Karnataka`, 
      category: selectedCat ? selectedCat.label.en : "General",
      issue: complaintText,
      priority: "High", 
    });
    setTicketId(newId);
    setSubmitted(true);
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
          <h3 style={{ margin: '8px 0', color: 'var(--primary)', fontWeight: 900, fontSize: '1.6rem', letterSpacing: '2px' }}>{ticketId}</h3>
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

      {/* Step 2: Input */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '28px', backdropFilter: 'blur(8px)' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
          STEP 2 · {lang === 'en' ? "DESCRIBE YOUR PROBLEM" : "ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ"}
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <VoiceRecorder onStop={handleStop} />
            {transcribing && (
              <div style={{ marginTop: '16px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                ✨ {lang === 'en' ? "AI is transcribing..." : "AI ಪ್ರತಿಲಿಪಿ ಮಾಡುತ್ತಿದೆ..."}
              </div>
            )}
          </div>

          <div style={{ width: '100%', position: 'relative' }}>
             <div style={{ position: 'absolute', left: '16px', top: '12px', zIndex: 10 }}>
               
             </div>
             <textarea 
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              placeholder={lang === 'en' ? "Type your complaint here or use the voice recorder above..." : "ನಿಮ್ಮ ದೂರನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಮೇಲಿನ ಧ್ವನಿ ರೆಕಾರ್ಡರ್ ಬಳಸಿ..."}
              style={{
                width: '100%', minHeight: '120px', padding: '16px 16px 16px 48px', borderRadius: '16px',
                background: 'var(--bg-app)', border: '1px solid var(--border-color)',
                color: 'var(--text-main)', fontFamily: 'inherit', fontSize: '0.95rem',
                resize: 'vertical', outline: 'none', transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
             />
          </div>

          <div style={{ width: '100%' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
              🏠 {lang === 'en' ? "Your Address (Optional)" : "ನಿಮ್ಮ ವಿಳಾಸ (ಐಚ್ಛಿಕ)"}
            </label>
            <input 
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              placeholder={lang === 'en' ? "Share your location for faster resolution..." : "ವೇಗವಾಗಿ ಪರಿಹರಿಸಲು ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ..."}
              style={{
                width: '100%', padding: '14px 18px', borderRadius: '12px',
                background: 'var(--bg-app)', border: '1px solid var(--border-color)',
                color: 'var(--text-main)', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      {category && complaintText && (
        <button onClick={handleSubmit} className="btn-premium btn-primary" style={{ width: '100%', borderRadius: '50px', padding: '18px', fontSize: '1.1rem' }}>
          🚀 {lang === 'en' ? "Submit Grievance" : "ದೂರು ಸಲ್ಲಿಸಿ"}
        </button>
      )}
    </div>
  );
}
