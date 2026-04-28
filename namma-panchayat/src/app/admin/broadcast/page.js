"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import VoiceRecorder from '@/components/VoiceRecorder';

export default function AdminBroadcast() {
  const { lang } = useLanguage();
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('all');
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = useState('text');

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setMessage(''); }, 4000);
  };

  const targets = [
    { value: 'all', label: { en: 'All Citizens (1,240)', kn: 'ಎಲ್ಲಾ ನಾಗರಿಕರು (1,240)' } },
    { value: 'ward1', label: { en: 'Ward 1 (312)', kn: 'ವಾರ್ಡ್ 1 (312)' } },
    { value: 'ward2', label: { en: 'Ward 2 (298)', kn: 'ವಾರ್ಡ್ 2 (298)' } },
    { value: 'ward3', label: { en: 'Ward 3 (322)', kn: 'ವಾರ್ಡ್ 3 (322)' } },
    { value: 'ward4', label: { en: 'Ward 4 (308)', kn: 'ವಾರ್ಡ್ 4 (308)' } },
    { value: 'farmers', label: { en: 'Farmers (480)', kn: 'ರೈತರು (480)' } },
  ];

  const card = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', backdropFilter: 'blur(8px)', padding: '28px' };

  return (
    <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

      <div style={card}>
        <h3 style={{ margin: '0 0 24px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
          📢 {lang === 'en' ? 'CREATE BROADCAST' : 'ಪ್ರಕಟಣೆ ರಚಿಸಿ'}
        </h3>

        {/* Target */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, fontSize: '0.88rem' }}>
            {lang === 'en' ? 'Send To' : 'ಕಳುಹಿಸಿ'}
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {targets.map(t => (
              <button key={t.value} onClick={() => setTarget(t.value)} style={{
                padding: '9px 18px', borderRadius: '50px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.82rem',
                border: `1px solid ${target === t.value ? 'var(--primary)' : 'var(--border-color)'}`,
                background: target === t.value ? 'var(--primary)' : 'var(--bg-app)',
                color: target === t.value ? 'white' : 'var(--text-muted)', fontWeight: 600, transition: 'all 0.2s'
              }}>{t.label[lang]}</button>
            ))}
          </div>
        </div>

        {/* Tab: Text / Voice */}
        <div style={{ display: 'flex', background: 'var(--bg-app)', borderRadius: '14px', padding: '4px', marginBottom: '20px', gap: '4px' }}>
          {['text', 'voice'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              flex: 1, padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: activeTab === tab ? 'var(--primary)' : 'transparent',
              color: activeTab === tab ? 'white' : 'var(--text-muted)',
              fontWeight: 600, fontSize: '0.9rem', fontFamily: 'inherit', transition: 'all 0.2s'
            }}>
              {tab === 'text' ? `✉️ ${lang === 'en' ? 'Text Message' : 'ಪಠ್ಯ ಸಂದೇಶ'}` : `🎤 ${lang === 'en' ? 'Voice Alert' : 'ಧ್ವನಿ ಅಲರ್ಟ್'}`}
            </button>
          ))}
        </div>

        {activeTab === 'text' ? (
          <textarea value={message} onChange={e => setMessage(e.target.value)}
            placeholder={lang === 'en' ? 'Type your alert message here...' : 'ನಿಮ್ಮ ಅಲರ್ಟ್ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...'}
            style={{
              width: '100%', height: '140px', padding: '18px 20px', fontSize: '1rem',
              borderRadius: '18px', border: '2px solid var(--border-color)',
              background: 'var(--bg-app)', color: 'var(--text-main)',
              resize: 'none', fontFamily: 'inherit', outline: 'none', marginBottom: '20px',
              transition: 'border-color 0.2s'
            }}
            onFocus={e => e.target.style.borderColor = 'var(--primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
          />
        ) : (
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <VoiceRecorder />
          </div>
        )}

        {sent ? (
          <div style={{ padding: '18px', background: 'rgba(56,142,60,0.1)', borderRadius: '16px', color: '#388e3c', fontWeight: 700, textAlign: 'center', fontSize: '1rem' }}>
            ✅ {lang === 'en' ? 'Broadcast sent to 1,240 citizens!' : '1,240 ನಾಗರಿಕರಿಗೆ ಪ್ರಕಟಣೆ ಕಳುಹಿಸಲಾಗಿದೆ!'}
          </div>
        ) : (
          <button onClick={handleSend} className="btn-premium btn-primary" style={{ width: '100%', borderRadius: '50px', padding: '18px', fontSize: '1rem' }}>
            📢 {lang === 'en' ? 'BROADCAST TO VILLAGE' : 'ಗ್ರಾಮಕ್ಕೆ ಪ್ರಕಟಿಸಿ'}
          </button>
        )}
      </div>

      {/* History */}
      <div style={card}>
        <h3 style={{ margin: '0 0 20px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
          {lang === 'en' ? 'RECENT BROADCASTS' : 'ಇತ್ತೀಚಿನ ಪ್ರಕಟಣೆಗಳು'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { date: '2026-04-28', type: 'Text', target: 'All', msg: 'Water supply timing changed to 7 AM tomorrow morning.', delivered: 1240 },
            { date: '2026-04-26', type: 'Voice', target: 'Ward 4', msg: 'Vaccination drive at Govt Primary School on Monday.', delivered: 308 },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'var(--bg-app)', borderRadius: '16px', border: '1px solid var(--border-color)', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', background: 'var(--primary-glow)', color: 'var(--primary)', padding: '2px 10px', borderRadius: '10px', fontWeight: 700 }}>{b.type}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{b.date} · To: {b.target}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)' }}>{b.msg}</p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontWeight: 800, color: '#388e3c', fontSize: '1.1rem' }}>{b.delivered.toLocaleString()}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>delivered</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
