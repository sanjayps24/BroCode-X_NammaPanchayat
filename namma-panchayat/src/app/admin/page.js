"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function AdminOverview() {
  const { lang } = useLanguage();

  const stats = [
    { label: { en: "Total Tickets", kn: "ಒಟ್ಟು ದೂರುಗಳು" }, value: "124", delta: "+8 today", color: "#1976d2", bg: "rgba(25,118,210,0.08)", icon: "🎫" },
    { label: { en: "Resolved", kn: "ಪರಿಹರಿಸಲಾಗಿದೆ" }, value: "85%", delta: "↑ 3% this week", color: "#388e3c", bg: "rgba(56,142,60,0.08)", icon: "✅" },
    { label: { en: "Pending", kn: "ಬಾಕಿ" }, value: "18", delta: "Needs action", color: "#f57c00", bg: "rgba(245,124,0,0.08)", icon: "⏳" },
    { label: { en: "Citizens", kn: "ನಾಗರಿಕರು" }, value: "1,240", delta: "+12 this month", color: "#7b1fa2", bg: "rgba(123,31,162,0.08)", icon: "👥" },
  ];

  const tickets = [
    { id: "#PAN-8823", user: "Basavaraj", issue: "Road Pothole - Ward 4", status: "New", time: "2h ago" },
    { id: "#PAN-8820", user: "Lakshmi", issue: "Water Pipe Leak - Ward 2", status: "In Progress", time: "5h ago" },
    { id: "#PAN-8815", user: "Gowda", issue: "Streetlight Off - Temple Rd", status: "Resolved", time: "1d ago" },
    { id: "#PAN-8812", user: "Suresh", issue: "Drainage Blocked - Ward 4", status: "New", time: "3h ago" },
  ];

  const statusStyle = (s) => ({
    padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700,
    background: s === 'Resolved' ? 'rgba(56,142,60,0.12)' : s === 'New' ? 'rgba(211,47,47,0.12)' : 'rgba(245,124,0,0.12)',
    color: s === 'Resolved' ? '#388e3c' : s === 'New' ? '#d32f2f' : '#f57c00',
    display: 'inline-block'
  });

  const card = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', backdropFilter: 'blur(8px)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...card, padding: '24px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: s.color }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px' }}>{s.label[lang]}</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>{s.delta}</div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                {s.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
        {/* Recent Tickets */}
        <div style={{ ...card, padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{lang === 'en' ? "Recent Grievances" : "ಇತ್ತೀಚಿನ ದೂರುಗಳು"}</h3>
            <Link href="/admin/tickets" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
              {lang === 'en' ? "View all →" : "ಎಲ್ಲವನ್ನೂ ನೋಡಿ →"}
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tickets.map((t, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-app)', borderRadius: '14px', gap: '12px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '2px' }}>{t.id}</div>
                  <div style={{ fontWeight: 500, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.issue}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>by {t.user} · {t.time}</div>
                </div>
                <span style={statusStyle(t.status)}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Village Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ ...card, padding: '24px' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700 }}>{lang === 'en' ? "Village Status" : "ಗ್ರಾಮದ ಸ್ಥಿತಿ"}</h3>
            {[
              { icon: '🍲', label: lang === 'en' ? 'Meal Rating' : 'ಊಟದ ರೇಟಿಂಗ್', value: '4.8/5', color: '#1976d2' },
              { icon: '🚰', label: lang === 'en' ? 'Water Status' : 'ನೀರಿನ ಸ್ಥಿತಿ', value: lang === 'en' ? 'Normal' : 'ಸಾಮಾನ್ಯ', color: '#388e3c' },
              { icon: '💡', label: lang === 'en' ? 'Streetlights' : 'ಬೀದಿ ದೀಪಗಳು', value: '92%', color: '#f57c00' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none' }}>
                <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.label}</div>
                  <div style={{ fontWeight: 700, color: item.color }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action */}
          <Link href="/admin/broadcast" style={{
            ...card, padding: '20px', textDecoration: 'none', color: 'inherit',
            display: 'flex', alignItems: 'center', gap: '14px',
            background: 'linear-gradient(135deg, var(--primary), #4a7c41)',
            border: 'none', cursor: 'pointer', transition: 'transform 0.2s ease'
          }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'none'}
          >
            <span style={{ fontSize: '2rem' }}>📢</span>
            <div>
              <div style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>{lang === 'en' ? "Broadcast Alert" : "ಅಲರ್ಟ್ ಕಳುಹಿಸಿ"}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>{lang === 'en' ? "Send to all citizens →" : "ಎಲ್ಲ ನಾಗರಿಕರಿಗೆ ಕಳುಹಿಸಿ →"}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
