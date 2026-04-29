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
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative', 
      overflow: 'hidden', 
      background: 'var(--bg-app)',
      color: 'var(--text-main)'
    }}>
      {/* Premium Nature Background with Subtle Animation */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '110%',
        height: '110%',
        backgroundImage: 'url("/lush_nature_bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.5,
        zIndex: 0,
        filter: 'contrast(1.1) brightness(1)',
        animation: 'natureMotion 60s ease-in-out infinite alternate',
        pointerEvents: 'none'
      }} />

      {/* Subtle overlay to ensure text contrast */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(253,250,245,0.4), rgba(253,250,245,0.1))',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <style jsx global>{`
        @keyframes natureMotion {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.05) translate(-2%, -2%); }
          100% { transform: scale(1) translate(0, 0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <LanguageToggle />

      {/* Background blobs */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'var(--primary-glow)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(212,175,55,0.08)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <main style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Hero */}
        <header className="animate-fade-in" style={{ textAlign: 'center', marginTop: '60px', marginBottom: '60px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px', animation: 'float 4s ease-in-out infinite' }}>🏛️</div>
          <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-1.5px', lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            {t('appName')}
          </h1>
          <p style={{ fontSize: 'clamp(1.2rem,3.5vw,1.6rem)', fontWeight: 500, color: 'var(--text-muted)', marginTop: '16px', maxWidth: '600px', margin: '16px auto 0' }}>
            {t('tagline')}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
            {['Karnataka Rural Digital Hub','PWA','Bilingual','Offline Ready'].map((tag,i) => (
              <span key={i} style={{ background: 'var(--primary)', color: 'white', padding: '6px 16px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 700, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>{tag}</span>
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
          backdropFilter: 'blur(20px)',
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
            width: '120px', height: '120px', borderRadius: '50%',
            background: step.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '4rem', marginBottom: '32px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            transition: 'background 0.5s ease',
            animation: 'float 5s ease-in-out infinite'
          }}>
            {step.icon}
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-main)' }}>
            {t(`${step.key}.title`)}
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.6 }}>
            {t(`${step.key}.desc`)}
          </p>

          {/* Dot nav */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '40px' }}>
            {steps.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                width: i === current ? '32px' : '12px',
                height: '12px',
                borderRadius: '6px',
                background: i === current ? 'var(--primary)' : 'var(--border-color)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease'
              }} />
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in delay-2" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/login?role=citizen" className="btn-premium btn-primary" style={{ minWidth: '240px', borderRadius: '50px', fontSize: '1.2rem', padding: '18px 32px' }}>
            👤 {t('citizenLogin')}
          </Link>
          <Link href="/login?role=admin" style={{
            minWidth: '240px', borderRadius: '50px', fontSize: '1.2rem',
            padding: '18px 32px', fontWeight: 600,
            border: '3px solid var(--primary)', color: 'var(--primary)',
            background: 'var(--bg-card)', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            transition: 'all 0.3s ease', textDecoration: 'none',
            backdropFilter: 'blur(10px)'
          }}>
            🏛️ {t('officialLogin')}
          </Link>
        </div>

        {/* How to Use Section */}
        <section className="animate-fade-in delay-3" style={{
          marginTop: '80px',
          padding: '48px',
          background: 'var(--bg-card)',
          borderRadius: '32px',
          border: '1px solid var(--border-color)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '32px', textAlign: 'center', color: 'var(--primary)' }}>
            📖 {t('howToUse.title')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div key={stepNum} style={{
                padding: '24px',
                background: 'var(--bg-app)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                transition: 'transform 0.3s ease'
              }}>
                <p style={{ fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.6, color: 'var(--text-main)' }}>
                  {t(`howToUse.step${stepNum}`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features row */}
        <div className="animate-fade-in delay-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginTop: '60px' }}>
          {[
            { icon: '🌐', label: lang === 'en' ? 'Fully Bilingual' : 'ಸಂಪೂರ್ಣ ದ್ವಿಭಾಷಾ' },
            { icon: '🔊', label: lang === 'en' ? 'Voice Enabled' : 'ಧ್ವನಿ ಸಕ್ರಿಯ' },
            { icon: '📱', label: lang === 'en' ? 'Works Offline' : 'ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ' },
          ].map((f, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '20px', padding: '24px', textAlign: 'center',
              backdropFilter: 'blur(12px)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>{f.label}</div>
            </div>
          ))}
        </div>

        <footer style={{ textAlign: 'center', marginTop: '80px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
          © 2026 {t('appName')} · BroCode-X Team · Karnataka Digital Mission
        </footer>
      </main>
    </div>
  );
}
