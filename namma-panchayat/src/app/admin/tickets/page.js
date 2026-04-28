"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const allTickets = [
  { id: "#PAN-8823", user: "Basavaraj", phone: "9876543210", ward: "4", category: "Roads", issue: "Large pothole in front of primary school on main road.", status: "New", date: "2026-04-28", priority: "High" },
  { id: "#PAN-8820", user: "Lakshmi", phone: "9876543211", ward: "2", category: "Water", issue: "Main water pipe leaking at Ward 2 junction since 3 days.", status: "In Progress", date: "2026-04-27", priority: "High" },
  { id: "#PAN-8815", user: "Gowda", phone: "9876543212", ward: "1", category: "Streetlights", issue: "Streetlight bulb fused near temple, unsafe at night.", status: "Resolved", date: "2026-04-25", priority: "Medium" },
  { id: "#PAN-8812", user: "Suresh", phone: "9876543213", ward: "4", category: "Roads", issue: "Drainage blocked near school gate after heavy rain.", status: "New", date: "2026-04-28", priority: "Medium" },
];

const deptOptions = ["KEB (Power)", "PWD (Roads)", "Education Dept", "Water Board", "Health Dept"];

export default function AdminTickets() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [forwarded, setForwarded] = useState({});
  const [selected, setSelected] = useState(null);

  const filters = ['All', 'New', 'In Progress', 'Resolved'];
  const shown = filter === 'All' ? allTickets : allTickets.filter(t => t.status === filter);

  const statusStyle = (s) => ({
    padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700,
    background: s === 'Resolved' ? 'rgba(56,142,60,0.12)' : s === 'New' ? 'rgba(211,47,47,0.12)' : 'rgba(245,124,0,0.12)',
    color: s === 'Resolved' ? '#388e3c' : s === 'New' ? '#d32f2f' : '#f57c00',
    display: 'inline-block'
  });

  const priorityStyle = (p) => ({
    padding: '3px 10px', borderRadius: '20px', fontSize: '0.67rem', fontWeight: 700,
    background: p === 'High' ? 'rgba(211,47,47,0.08)' : 'rgba(245,124,0,0.08)',
    color: p === 'High' ? '#d32f2f' : '#f57c00', display: 'inline-block'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '9px 22px', borderRadius: '50px',
            border: `1px solid ${filter === f ? 'var(--primary)' : 'var(--border-color)'}`,
            background: filter === f ? 'var(--primary)' : 'var(--bg-card)',
            color: filter === f ? 'white' : 'var(--text-muted)',
            fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
            fontFamily: 'inherit', transition: 'all 0.2s ease'
          }}>{f}</button>
        ))}
        <span style={{ marginLeft: 'auto', alignSelf: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {shown.length} {lang === 'en' ? 'tickets' : 'ದೂರುಗಳು'}
        </span>
      </div>

      {/* Tickets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {shown.map(t => (
          <div key={t.id} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-color)',
            borderRadius: '20px', padding: '22px 26px',
            backdropFilter: 'blur(8px)', transition: 'box-shadow 0.2s ease',
            boxShadow: selected === t.id ? 'var(--shadow-md)' : 'none'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--primary)' }}>{t.id}</span>
                <span style={statusStyle(t.status)}>{t.status}</span>
                <span style={priorityStyle(t.priority)}>{t.priority}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.date}</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', background: 'var(--bg-app)', padding: '4px 12px', borderRadius: '20px', fontWeight: 600, border: '1px solid var(--border-color)' }}>
                🏷️ {t.category}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>👤 {t.user} · 📱 {t.phone} · Ward {t.ward}</span>
            </div>

            <p style={{ margin: '0 0 18px', color: 'var(--text-main)', lineHeight: 1.5 }}>{t.issue}</p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button style={{ padding: '8px 18px', borderRadius: '50px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit', color: 'var(--text-main)' }}>
                🎧 {lang === 'en' ? 'Play Audio' : 'ಆಡಿಯೋ ಕೇಳಿ'}
              </button>

              {forwarded[t.id] ? (
                <span style={{ padding: '8px 18px', background: 'rgba(56,142,60,0.1)', color: '#388e3c', borderRadius: '50px', fontWeight: 700, fontSize: '0.8rem' }}>
                  ✓ {lang === 'en' ? `Forwarded to ${forwarded[t.id]}` : `${forwarded[t.id]}ಗೆ ಫಾರ್ವರ್ಡ್ ಮಾಡಲಾಗಿದೆ`}
                </span>
              ) : (
                <select
                  onChange={e => { if (e.target.value) setForwarded(p => ({ ...p, [t.id]: e.target.value })); }}
                  defaultValue=""
                  style={{ padding: '9px 16px', borderRadius: '50px', border: '1px solid var(--primary)', background: 'var(--primary)', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}
                >
                  <option value="" disabled>➡️ {lang === 'en' ? 'Forward to Dept...' : 'ಇಲಾಖೆಗೆ ಫಾರ್ವರ್ಡ್...'}</option>
                  {deptOptions.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
