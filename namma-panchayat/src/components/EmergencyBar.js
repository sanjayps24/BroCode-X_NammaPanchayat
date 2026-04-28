"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function EmergencyBar() {
  const { t, lang } = useLanguage();

  const contacts = [
    { label: t('emergencyBar.ambulance'), number: '108', icon: '🚑', color: '#d32f2f', bg: 'rgba(211,47,47,0.08)' },
    { label: t('emergencyBar.police'), number: '100', icon: '👮', color: '#1565c0', bg: 'rgba(21,101,192,0.08)' },
    { label: t('emergencyBar.panchayat'), number: '080-123456', icon: '🏛️', color: '#e65100', bg: 'rgba(230,81,0,0.08)' },
  ];

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--border-color)',
      display: 'flex',
      padding: '6px 20px',
      paddingBottom: 'env(safe-area-inset-bottom, 6px)',
      gap: '8px'
    }}>
      {contacts.map((c, i) => (
        <a
          key={i}
          href={`tel:${c.number}`}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '10px 8px', borderRadius: '16px',
            background: c.bg, textDecoration: 'none', color: c.color,
            fontWeight: 700, fontSize: '0.75rem', gap: '2px',
            transition: 'transform 0.2s ease',
            border: `1px solid ${c.bg}`
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'none'}
        >
          <span style={{ fontSize: '1.4rem' }}>{c.icon}</span>
          <span>{c.label}</span>
          <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '1px' }}>{c.number}</span>
        </a>
      ))}
    </div>
  );
}
