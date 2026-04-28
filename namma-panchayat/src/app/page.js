"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import LanguageToggle from '@/components/LanguageToggle';
import Link from 'next/link';

const steps = [
  { icon: "🎤", key: "onboarding.step1", gradient: "linear-gradient(135deg,#2d5a27,#4a7c41)" },
  { icon: "🏫", key: "onboarding.step2", gradient: "linear-gradient(135deg,#1565c0,#1976d2)" },
  { icon: "🌾", key: "onboarding.step3", gradient: "linear-gradient(135deg,#e65100,#f57c00)" },
  { icon: "✅", key: "onboarding.step4", gradient: "linear-gradient(135deg,#6a1b9a,#8e24aa)" },
];

export default function LandingPage() {
  const { t, lang } = useLanguage();
  const { theme } = useTheme();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % steps.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const step = steps[current];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: 'var(--bg-app)' }}>
      <LanguageToggle />

      {/* Background blobs */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'var(--primary-glow)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(212,175,55,0.08)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <main style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Hero */}
        <header className="animate-fade-in" style={{ textAlign: 'center', marginTop: '60px', marginBottom: '60px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🏛️</div>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-1px', lineHeight: 1.1 }}>
            {t('appName')}
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem,3vw,1.5rem)', fontWeight: 500, color: 'var(--text-muted)', marginTop: '12px' }}>
            {t('tagline')}
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
            {['Karnataka Rural Digital Hub','PWA','Bilingual'].map((tag,i) => (
              <span key={i} style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>{tag}</span>
            ))}
          </div>
        </header>

        {/* Onboarding Carousel */}
        <div className="animate-fade-in delay-1" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '32px',
          padding: '48px 40px',
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '48px',
          minHeight: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* gradient bg glow */}
          <div style={{ position: 'absolute', inset: 0, background: step.gradient, opacity: 0.04, transition: 'background 0.8s ease', borderRadius: '32px' }} />

          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: step.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3.5rem', marginBottom: '28px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            transition: 'background 0.5s ease'
          }}>
            {step.icon}
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-main)' }}>
            {t(`${step.key}.title`)}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '460px' }}>
            {t(`${step.key}.desc`)}
          </p>

          {/* Dot nav */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '32px' }}>
            {steps.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                width: i === current ? '28px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: i === current ? 'var(--primary)' : 'var(--border-color)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease'
              }} />
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in delay-2" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/login?role=citizen" className="btn-premium btn-primary" style={{ minWidth: '220px', borderRadius: '50px', fontSize: '1.1rem' }}>
            👤 {t('citizenLogin')}
          </Link>
          <Link href="/login?role=admin" style={{
            minWidth: '220px', borderRadius: '50px', fontSize: '1.1rem',
            padding: '14px 28px', fontWeight: 600,
            border: '2px solid var(--primary)', color: 'var(--primary)',
            background: 'transparent', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            transition: 'all 0.3s ease', textDecoration: 'none'
          }}>
            🏛️ {t('officialLogin')}
          </Link>
        </div>

        {/* Features row */}
        <div className="animate-fade-in delay-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginTop: '60px' }}>
          {[
            { icon: '🌐', label: lang === 'en' ? 'Fully Bilingual' : 'ಸಂಪೂರ್ಣ ದ್ವಿಭಾಷಾ' },
            { icon: '🔊', label: lang === 'en' ? 'Voice Enabled' : 'ಧ್ವನಿ ಸಕ್ರಿಯ' },
            { icon: '📱', label: lang === 'en' ? 'Works Offline' : 'ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ' },
          ].map((f, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '16px', padding: '20px', textAlign: 'center',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{f.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{f.label}</div>
            </div>
          ))}
        </div>

        <footer style={{ textAlign: 'center', marginTop: '60px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          © 2026 {t('appName')} · BroCode-X Team · Karnataka Digital Mission
        </footer>
      </main>
    </div>
  );
}
