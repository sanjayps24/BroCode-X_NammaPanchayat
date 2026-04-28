"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockMandiPrices, mockJobs } from '@/lib/mockData';

import Link from 'next/link';

export default function ProsperityPage() {
  const { lang } = useLanguage();
  const [applied, setApplied] = useState([]);
  const card = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', backdropFilter: 'blur(8px)', padding: '28px' };

  const trendIcon = (t) => t === 'up' ? '📈' : t === 'down' ? '📉' : '➖';
  const trendColor = (t) => t === 'up' ? '#388e3c' : t === 'down' ? '#d32f2f' : '#f57c00';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <header>
        <Link href="/dashboard" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>← {lang === 'en' ? 'Dashboard' : 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(56,142,60,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🌾</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{lang === 'en' ? 'Agriculture & Jobs' : 'ಕೃಷಿ ಮತ್ತು ಉದ್ಯೋಗ'}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{lang === 'en' ? 'Live mandi rates & local opportunities' : 'ನೇರ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಅವಕಾಶಗಳು'}</p>
          </div>

        </div>
      </header>

      {/* Mandi Prices */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>📊 {lang === 'en' ? 'TODAY\'S MANDI PRICES' : 'ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ದರಗಳು'}</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-app)', padding: '4px 12px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            🟢 {lang === 'en' ? 'Live' : 'ನೇರ'}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '14px' }}>
          {mockMandiPrices.map(item => (
            <div key={item.id} style={{ background: 'var(--bg-app)', borderRadius: '16px', padding: '18px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, padding: '8px 12px', fontSize: '1.4rem' }}>{trendIcon(item.trend)}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, fontWeight: 700, fontSize: '1rem' }}>{item.crop[lang]}</h4>

              </div>
              <div style={{ fontWeight: 900, fontSize: '1.6rem', color: trendColor(item.trend), lineHeight: 1 }}>{item.price}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>per {item.unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs */}
      <div style={card}>
        <h2 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>👷 {lang === 'en' ? 'LOCAL JOB BOARD' : 'ಸ್ಥಳೀಯ ಉದ್ಯೋಗ ಬೋರ್ಡ್'}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mockJobs.map(job => (
            <div key={job.id} style={{ background: 'var(--bg-app)', borderRadius: '18px', padding: '20px 24px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <h4 style={{ margin: 0, fontWeight: 700, fontSize: '1rem' }}>{job.title[lang]}</h4>

                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>📍 {job.location}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#388e3c' }}>💰 {job.pay}</span>
                </div>
              </div>
              {applied.includes(job.id) ? (
                <span style={{ background: 'rgba(56,142,60,0.12)', color: '#388e3c', padding: '8px 20px', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem' }}>
                  ✓ {lang === 'en' ? 'Applied' : 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ'}
                </span>
              ) : (
                <button onClick={() => setApplied(p => [...p, job.id])} className="btn-premium btn-primary" style={{ borderRadius: '50px', padding: '10px 24px', fontSize: '0.85rem' }}>
                  {lang === 'en' ? 'Apply →' : 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ →'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
