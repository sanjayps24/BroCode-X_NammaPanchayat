"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const citizens = [
  { name: "Basavaraj", phone: "9876543210", ward: "4", issues: 3, resolved: 3, status: "Verified" },
  { name: "Lakshmi", phone: "9876543211", ward: "2", issues: 2, resolved: 2, status: "Verified" },
  { name: "Gowda", phone: "9876543212", ward: "1", issues: 5, resolved: 4, status: "Verified" },
  { name: "Suresh", phone: "9876543213", ward: "4", issues: 2, resolved: 1, status: "Pending" },
  { name: "Mala", phone: "9876543214", ward: "3", issues: 1, resolved: 1, status: "Verified" },
  { name: "Raju", phone: "9876543215", ward: "2", issues: 4, resolved: 3, status: "Verified" },
];

export default function AdminCitizens() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [wardFilter, setWardFilter] = useState('All');

  const filtered = citizens.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    const matchWard = wardFilter === 'All' || c.ward === wardFilter.replace('Ward ', '');
    return matchSearch && matchWard;
  });

  const getRate = (c) => c.issues === 0 ? 0 : Math.round((c.resolved / c.issues) * 100);
  const rateColor = (r) => r >= 90 ? '#388e3c' : r >= 70 ? '#f57c00' : '#d32f2f';

  const card = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', backdropFilter: 'blur(8px)', padding: '28px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
        {[
          { label: lang === 'en' ? 'Total Citizens' : 'ಒಟ್ಟು ನಾಗರಿಕರು', value: '1,240', icon: '👥', color: '#7b1fa2' },
          { label: lang === 'en' ? 'Verified' : 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ', value: '1,192', icon: '✅', color: '#388e3c' },
          { label: lang === 'en' ? 'Avg Success Rate' : 'ಸರಾಸರಿ ಯಶಸ್ಸಿನ ದರ', value: '87%', icon: '📊', color: '#1976d2' },
        ].map((s, i) => (
          <div key={i} style={{ ...card, padding: '22px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontWeight: 900, fontSize: '1.6rem', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'en' ? 'Search citizens...' : 'ನಾಗರಿಕರನ್ನು ಹುಡುಕಿ...'}
            style={{
              width: '100%', padding: '12px 16px 12px 46px',
              borderRadius: '50px', border: '1px solid var(--border-color)',
              background: 'var(--bg-card)', color: 'var(--text-main)',
              fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none'
            }} />
        </div>
        {['All', 'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'].map(w => (
          <button key={w} onClick={() => setWardFilter(w)} style={{
            padding: '10px 18px', borderRadius: '50px', cursor: 'pointer', fontFamily: 'inherit',
            border: `1px solid ${wardFilter === w ? 'var(--primary)' : 'var(--border-color)'}`,
            background: wardFilter === w ? 'var(--primary)' : 'var(--bg-card)',
            color: wardFilter === w ? 'white' : 'var(--text-muted)',
            fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.2s'
          }}>{w}</button>
        ))}
      </div>

      {/* Citizens Table */}
      <div style={card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                {[
                  lang === 'en' ? 'Citizen' : 'ನಾಗರಿಕ',
                  lang === 'en' ? 'Ward' : 'ವಾರ್ಡ್',
                  lang === 'en' ? 'Issues' : 'ದೂರುಗಳು',
                  lang === 'en' ? 'Success Rate' : 'ಯಶಸ್ಸಿನ ದರ',
                  lang === 'en' ? 'Status' : 'ಸ್ಥಿತಿ',
                  ''
                ].map((h, i) => (
                  <th key={i} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const rate = getRate(c);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.background = 'var(--bg-app)'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary),var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                          {c.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📱 {c.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
                        Ward {c.ward}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '0.9rem' }}>
                      <span style={{ fontWeight: 700 }}>{c.resolved}</span>
                      <span style={{ color: 'var(--text-muted)' }}>/{c.issues}</span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, height: '6px', background: 'var(--border-color)', borderRadius: '3px', minWidth: '60px' }}>
                          <div style={{ width: `${rate}%`, height: '100%', background: rateColor(rate), borderRadius: '3px', transition: 'width 1s ease' }} />
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '0.85rem', color: rateColor(rate), minWidth: '36px' }}>{rate}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700,
                        background: c.status === 'Verified' ? 'rgba(56,142,60,0.1)' : 'rgba(245,124,0,0.1)',
                        color: c.status === 'Verified' ? '#388e3c' : '#f57c00'
                      }}>
                        {c.status === 'Verified' ? '✓' : '⏳'} {c.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <button style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.78rem', padding: '6px 14px', borderRadius: '20px', fontFamily: 'inherit' }}>
                        {lang === 'en' ? 'View' : 'ನೋಡಿ'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
