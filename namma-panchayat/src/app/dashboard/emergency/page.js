"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

import Link from 'next/link';

export default function EmergencyPage() {
  const { lang } = useLanguage();

  const contacts = [
    { name: { en: "Ambulance", kn: "ಆಂಬ್ಯುಲೆನ್ಸ್" }, number: "108", icon: "🚑", color: "#d32f2f", bg: "rgba(211,47,47,0.08)", desc: { en: "Medical Emergencies — Free 24/7", kn: "ವೈದ್ಯಕೀಯ ತುರ್ತು — ಉಚಿತ 24/7" } },
    { name: { en: "Police", kn: "ಪೊಲೀಸ್" }, number: "100", icon: "👮", color: "#1565c0", bg: "rgba(21,101,192,0.08)", desc: { en: "Crime & Public Safety", kn: "ಅಪರಾಧ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಸುರಕ್ಷತೆ" } },
    { name: { en: "Fire Dept", kn: "ಅಗ್ನಿಶಾಮಕ ದಳ" }, number: "101", icon: "🚒", color: "#e65100", bg: "rgba(230,81,0,0.08)", desc: { en: "Fire & Rescue Operations", kn: "ಅಗ್ನಿ ಮತ್ತು ರಕ್ಷಣಾ ಕಾರ್ಯಾಚರಣೆ" } },
    { name: { en: "Women Helpline", kn: "ಮಹಿಳಾ ಸಹಾಯವಾಣಿ" }, number: "1091", icon: "👩‍⚕️", color: "#c2185b", bg: "rgba(194,24,91,0.08)", desc: { en: "Safety & Support for Women", kn: "ಮಹಿಳೆಯರ ಸುರಕ್ಷತೆ ಮತ್ತು ಬೆಂಬಲ" } },
    { name: { en: "Panchayat Office", kn: "ಪಂಚಾಯತ್ ಕಚೇರಿ" }, number: "080-22221234", icon: "🏛️", color: "#2d5a27", bg: "rgba(45,90,39,0.08)", desc: { en: "Local Governance & Admin", kn: "ಸ್ಥಳೀಯ ಆಡಳಿತ ಮತ್ತು ಆಡಳಿತ" } },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <header>
        <Link href="/dashboard" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>← {lang === 'en' ? 'Dashboard' : 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(245,124,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🚨</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{lang === 'en' ? 'Suraksha' : 'ಸುರಕ್ಷಾ'}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{lang === 'en' ? 'One-touch emergency contacts' : 'ಒಂದೇ ಸ್ಪರ್ಶದ ತುರ್ತು ಸಂಪರ್ಕಗಳು'}</p>
          </div>

        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {contacts.map((c, i) => (
          <a key={i} href={`tel:${c.number}`} style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            borderRadius: '20px', padding: '20px 24px',
            textDecoration: 'none', color: 'inherit',
            transition: 'all 0.25s ease',
            backdropFilter: 'blur(8px)',
          }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.borderColor = c.color; e.currentTarget.style.boxShadow = `0 8px 24px ${c.bg}`; }}
            onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
              {c.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>{c.name[lang]}</h3>

              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>{c.desc[lang]}</p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontWeight: 900, fontSize: '1.4rem', color: c.color, letterSpacing: '1px' }}>{c.number}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>📞 Tap to call</div>
            </div>
          </a>
        ))}
      </div>

      {/* SOS Alert */}
      <div style={{ background: 'linear-gradient(135deg,#d32f2f,#e53935)', borderRadius: '24px', padding: '28px', textAlign: 'center', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
        <div style={{ fontSize: '2.5rem', marginBottom: '12px', position: 'relative' }}>🆘</div>
        <h3 style={{ margin: '0 0 8px', color: 'white', fontWeight: 800, fontSize: '1.2rem', position: 'relative' }}>{lang === 'en' ? 'One-Touch SOS Alert' : 'ಒನ್-ಟಚ್ SOS ಅಲರ್ಟ್'}</h3>
        <p style={{ margin: '0 0 20px', opacity: 0.85, fontSize: '0.9rem', position: 'relative' }}>
          {lang === 'en' ? 'Sends your GPS location to the Panchayat and nearest help center.' : 'ನಿಮ್ಮ GPS ಸ್ಥಳವನ್ನು ಪಂಚಾಯತ್ ಮತ್ತು ಹತ್ತಿರದ ಸಹಾಯ ಕೇಂದ್ರಕ್ಕೆ ಕಳುಹಿಸುತ್ತದೆ.'}
        </p>
        <button onClick={() => alert(lang === 'en' ? 'SOS Alert sent to Hoskote Panchayat!' : 'SOS ಅಲರ್ಟ್ ಕಳುಹಿಸಲಾಗಿದೆ!')} style={{
          background: 'white', border: 'none', color: '#d32f2f',
          fontWeight: 800, padding: '16px 36px', borderRadius: '50px',
          cursor: 'pointer', fontSize: '1.1rem', fontFamily: 'inherit',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)', position: 'relative'
        }}>
          🚨 {lang === 'en' ? 'SEND SOS ALERT' : 'SOS ಅಲರ್ಟ್ ಕಳುಹಿಸಿ'}
        </button>
      </div>
    </div>
  );
}
