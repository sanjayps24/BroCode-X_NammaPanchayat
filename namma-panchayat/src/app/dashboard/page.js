"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import DashboardTile from '@/components/DashboardTile';


export default function CitizenDashboard() {
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  const [broadcast, setBroadcast] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('village_broadcast');
    if (data) {
      const parsed = JSON.parse(data);
      // Only show if broadcast is less than 48 hours old
      const ageHours = (new Date() - new Date(parsed.timestamp)) / (1000 * 60 * 60);
      if (ageHours < 48) {
        setBroadcast(parsed);
      }
    }
  }, []);

  const now = new Date();
  const hour = now.getHours();
  const greeting = lang === 'en'
    ? hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'
    : hour < 12 ? 'ಶುಭೋದಯ' : hour < 17 ? 'ಶುಭ ಮಧ್ಯಾಹ್ನ' : 'ಶುಭ ಸಂಜೆ';

  const tiles = [
    { id: 'education', icon: "🏫", color: "#1976d2", title: t('dashboard.education'), subtitle: lang === 'en' ? "School repairs & scholarships" : "ಶಾಲಾ ದುರಸ್ತಿ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ", href: "/dashboard/education" },
    { id: 'farmers', icon: "🚜", color: "#2e7d32", title: t('dashboard.farmers'), subtitle: lang === 'en' ? "Economic growth & agri-tools" : "ಕೃಷಿ ಆರ್ಥಿಕ ಅಭಿವೃದ್ಧಿ", href: "/dashboard/farmers" },
    { id: 'grievance', icon: "🎤", color: "#d32f2f", title: t('dashboard.grievance'), subtitle: lang === 'en' ? "Record voice complaint" : "ಧ್ವನಿ ದೂರು ದಾಖಲಿಸಿ", href: "/dashboard/grievance" },
    { id: 'prosperity', icon: "🌾", color: "#388e3c", title: t('dashboard.prosperity'), subtitle: lang === 'en' ? "Mandi prices & local jobs" : "ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ಉದ್ಯೋಗ", href: "/dashboard/prosperity" },
    { id: 'welfare', icon: "📋", color: "#7b1fa2", title: t('dashboard.welfare'), subtitle: lang === 'en' ? "Govt schemes & eligibility" : "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಅರ್ಹತೆ", href: "/dashboard/welfare" },
    { id: 'emergency', icon: "🚨", color: "#f57c00", title: t('dashboard.emergency'), subtitle: lang === 'en' ? "Emergency contacts" : "ತುರ್ತು ಸಂಪರ್ಕಗಳು", href: "/dashboard/emergency" },
  ];

  const quickStats = [
    { label: lang === 'en' ? "Agri-Aid Status" : "ಕೃಷಿ ಸಹಾಯ ಸ್ಥಿತಿ", value: "Active", icon: "🌱", color: "#2e7d32" },
    { label: lang === 'en' ? "Complaints Raised" : "ದಾಖಲಾದ ದೂರುಗಳು", value: "1", icon: "🎫", color: "#d32f2f" },
    { label: lang === 'en' ? "New Schemes" : "ಹೊಸ ಯೋಜನೆಗಳು", value: "3", icon: "📋", color: "#7b1fa2" },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <style jsx>{`
        .stat-card {
          background: var(--bg-card);
          border-radius: 20px;
          padding: 20px;
          border: 1px solid var(--border-color);
          backdrop-filter: blur(8px);
          text-align: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }
        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
          border-color: var(--primary);
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      {/* Live Admin Broadcast Alert */}
      {broadcast && (
        <section className="animate-fade-in" style={{
          background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
          color: 'white', padding: '16px 24px', borderRadius: '20px',
          display: 'flex', alignItems: 'center', gap: '16px',
          boxShadow: '0 8px 24px rgba(211,47,47,0.3)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ fontSize: '1.8rem', animation: 'pulse 2s infinite' }}>📢</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.9, marginBottom: '2px', letterSpacing: '0.5px' }}>
              {lang === 'en' ? 'IMPORTANT ANNOUNCEMENT' : 'ಪ್ರಮುಖ ಪ್ರಕಟಣೆ'}
            </div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4 }}>{broadcast.message}</p>
            <div style={{ fontSize: '0.65rem', opacity: 0.8, marginTop: '4px' }}>
              {new Date(broadcast.timestamp).toLocaleString()} · {lang === 'en' ? 'Panchayat Office' : 'ಪಂಚಾಯತ್ ಕಚೇರಿ'}
            </div>
          </div>
          <button onClick={() => setBroadcast(null)} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
            width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer',
            fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>×</button>
        </section>
      )}

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
          <div key={i} className="stat-card">
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
