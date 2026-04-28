"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import DashboardTile from '@/components/DashboardTile';


export default function CitizenDashboard() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();

  const now = new Date();
  const hour = now.getHours();
  const greeting = lang === 'en'
    ? hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'
    : hour < 12 ? 'ಶುಭೋದಯ' : hour < 17 ? 'ಶುಭ ಮಧ್ಯಾಹ್ನ' : 'ಶುಭ ಸಂಜೆ';

  const tiles = [
    { id: 'education', icon: "🏫", color: "#1976d2", title: t('dashboard.education'), subtitle: lang === 'en' ? "School repairs & scholarships" : "ಶಾಲಾ ದುರಸ್ತಿ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ", href: "/dashboard/education" },
    { id: 'utilities', icon: "⚡", color: "#fbc02d", title: t('dashboard.utilities'), subtitle: lang === 'en' ? "Electricity & water bills" : "ವಿದ್ಯುತ್ ಮತ್ತು ನೀರಿನ ಬಿಲ್", href: "/dashboard/utilities" },
    { id: 'grievance', icon: "🎤", color: "#d32f2f", title: t('dashboard.grievance'), subtitle: lang === 'en' ? "Record voice complaint" : "ಧ್ವನಿ ದೂರು ದಾಖಲಿಸಿ", href: "/dashboard/grievance" },
    { id: 'prosperity', icon: "🌾", color: "#388e3c", title: t('dashboard.prosperity'), subtitle: lang === 'en' ? "Mandi prices & local jobs" : "ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ಉದ್ಯೋಗ", href: "/dashboard/prosperity" },
    { id: 'welfare', icon: "📋", color: "#7b1fa2", title: t('dashboard.welfare'), subtitle: lang === 'en' ? "Govt schemes & eligibility" : "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಅರ್ಹತೆ", href: "/dashboard/welfare" },
    { id: 'emergency', icon: "🚨", color: "#f57c00", title: t('dashboard.emergency'), subtitle: lang === 'en' ? "Emergency contacts" : "ತುರ್ತು ಸಂಪರ್ಕಗಳು", href: "/dashboard/emergency" },
  ];

  const quickStats = [
    { label: lang === 'en' ? "Pending Bills" : "ಬಾಕಿ ಬಿಲ್‌ಗಳು", value: "₹570", icon: "⚡", color: "#fbc02d" },
    { label: lang === 'en' ? "Active Tickets" : "ತೆರೆದ ದೂರುಗಳು", value: "1", icon: "🎫", color: "#d32f2f" },
    { label: lang === 'en' ? "New Schemes" : "ಹೊಸ ಯೋಜನೆಗಳು", value: "3", icon: "📋", color: "#7b1fa2" },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Welcome Banner */}
      <section className="animate-fade-in" style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #4a7c41 60%, #6a9e3f 100%)',
        borderRadius: '28px', padding: '32px', color: 'white',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '180px', height: '180px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-40px', right: '60px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ margin: 0, fontSize: '1rem', opacity: 0.85, fontWeight: 500 }}>{greeting},</p>
          <h1 style={{ margin: '4px 0 8px', fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, color: 'white' }}>
            {user?.name || 'Basavaraj'} 👋
          </h1>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
            {lang === 'en' ? "Hoskote Grama Panchayat · Ward 4" : "ಹೊಸಕೋಟೆ ಗ್ರಾಮ ಪಂಚಾಯತ್ · ವಾರ್ಡ್ 4"}
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="animate-fade-in delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
        {quickStats.map((s, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)', borderRadius: '20px',
            padding: '20px', border: '1px solid var(--border-color)',
            backdropFilter: 'blur(8px)', textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>{s.icon}</div>
            <div style={{ fontWeight: 800, fontSize: '1.4rem', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Heading */}
      <div className="animate-fade-in delay-2" style={{ display: 'flex', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
          {lang === 'en' ? "What do you need today?" : "ಇಂದು ನಿಮಗೆ ಏನು ಬೇಕು?"}
        </h2>

      </div>

      {/* Tiles */}
      <div className="dashboard-grid animate-fade-in delay-3">
        {tiles.map(tile => <DashboardTile key={tile.id} {...tile} />)}
      </div>
    </div>
  );
}
