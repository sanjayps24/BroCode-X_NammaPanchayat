"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockSchemes } from '@/lib/mockData';

import Link from 'next/link';

export default function WelfarePage() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');

  const filtered = mockSchemes.filter(s =>
    s.name[lang].toLowerCase().includes(search.toLowerCase()) ||
    s.name.en.toLowerCase().includes(search.toLowerCase())
  );

  const card = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', backdropFilter: 'blur(8px)', padding: '28px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <header>
        <Link href="/dashboard" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>← {lang === 'en' ? 'Dashboard' : 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(123,31,162,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📋</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{lang === 'en' ? 'Govt Schemes' : 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು'}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{lang === 'en' ? 'Find schemes you are eligible for' : 'ನೀವು ಅರ್ಹರಾಗಿರುವ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ'}</p>
          </div>

        </div>
      </header>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem' }}>🔍</span>
        <input type="text"
          placeholder={lang === 'en' ? 'Search schemes...' : 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...'}
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '16px 20px 16px 50px', fontSize: '1rem',
            borderRadius: '50px', border: '2px solid var(--border-color)',
            background: 'var(--bg-card)', color: 'var(--text-main)',
            outline: 'none', fontFamily: 'inherit',
            backdropFilter: 'blur(8px)', transition: 'border-color 0.2s ease'
          }}
          onFocus={e => e.target.style.borderColor = 'var(--primary)'}
          onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
        />
      </div>

      {/* Schemes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map(scheme => (
          <div key={scheme.id} style={{ ...card, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: 'linear-gradient(135deg,#7b1fa2,#ab47bc)' }} />
            <div style={{ paddingLeft: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>{scheme.name[lang]}</h3>

                </div>
                {scheme.eligible && (
                  <span style={{ background: 'rgba(56,142,60,0.12)', color: '#388e3c', padding: '5px 14px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0 }}>
                    ✓ {lang === 'en' ? 'ELIGIBLE' : 'ಅರ್ಹರು'}
                  </span>
                )}
              </div>
              <p style={{ margin: '0 0 20px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>{scheme.benefit[lang]}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn-premium btn-primary" style={{ borderRadius: '50px', padding: '10px 24px', fontSize: '0.85rem' }}>
                  {lang === 'en' ? 'Apply Now →' : 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ →'}
                </button>
                <button style={{ borderRadius: '50px', padding: '10px 24px', fontSize: '0.85rem', background: 'var(--bg-app)', border: '1px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer', fontFamily: 'inherit' }}>
                  {lang === 'en' ? 'Details' : 'ವಿವರ'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
            <p style={{ margin: 0 }}>{lang === 'en' ? 'No schemes found.' : 'ಯಾವುದೇ ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.'}</p>
          </div>
        )}
      </div>

      {/* Eligibility Checker */}
      <div style={{ background: 'linear-gradient(135deg,#7b1fa2,#ab47bc)', borderRadius: '24px', padding: '28px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎯</div>
        <h3 style={{ margin: '0 0 8px', color: 'white', fontSize: '1.2rem', fontWeight: 800 }}>{lang === 'en' ? 'Eligibility Checker' : 'ಅರ್ಹತಾ ಪರಿಶೀಲಕ'}</h3>
        <p style={{ margin: '0 0 20px', opacity: 0.85, fontSize: '0.9rem' }}>{lang === 'en' ? 'Answer 3 quick questions to find all schemes you qualify for.' : '3 ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ.'}</p>
        <button style={{ background: 'white', border: 'none', color: '#7b1fa2', fontWeight: 800, padding: '14px 32px', borderRadius: '50px', cursor: 'pointer', fontSize: '1rem', fontFamily: 'inherit' }}>
          {lang === 'en' ? 'Check Eligibility →' : 'ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ →'}
        </button>
      </div>
    </div>
  );
}
