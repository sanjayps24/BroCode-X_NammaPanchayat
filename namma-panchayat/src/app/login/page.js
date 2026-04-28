"use client";
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import LanguageToggle from '@/components/LanguageToggle';
import Link from 'next/link';

function LoginContent() {
  const { t, lang } = useLanguage();
  const { loginAsCitizen, loginAsAdmin } = useAuth();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') || 'citizen';

  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCitizenLogin = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !dob) {
      setError(lang === 'en' ? 'Please enter both Name and DOB' : 'ಹೆಸರು ಮತ್ತು ಜನ್ಮ ದಿನಾಂಕ ಎರಡನ್ನೂ ನಮೂದಿಸಿ');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const res = loginAsCitizen(name, dob);
      if (!res.success) setError(res.error);
    }, 1200);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const ok = loginAsAdmin(email, password);
      if (!ok) setError(lang === 'en' ? 'Invalid credentials. Try admin@panchayat.gov.in / admin123' : 'ತಪ್ಪಾದ ರುಜುವಾತುಗಳು');
    }, 1200);
  };

  const inputStyle = {
    width: '100%', padding: '16px 20px', fontSize: '1.05rem',
    borderRadius: '14px',
    border: '2px solid var(--border-color)',
    background: 'var(--bg-app)',
    color: 'var(--text-main)',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit'
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative' }}>
      <LanguageToggle />

      {/* Background blobs */}
      <div style={{ position: 'fixed', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--primary-glow)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '460px', position: 'relative', zIndex: 1 }}>
        {/* Back link */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '28px', textDecoration: 'none', fontWeight: 500 }}>
          ← {lang === 'en' ? 'Back to Home' : 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ'}
        </Link>

        {/* Card */}
        <div style={{
          background: 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-color)',
          borderRadius: '28px',
          padding: '40px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {/* Role Toggle Tabs */}
          <div style={{ display: 'flex', background: 'var(--bg-app)', borderRadius: '14px', padding: '4px', marginBottom: '36px', gap: '4px' }}>
            {['citizen', 'admin'].map(r => (
              <button key={r} onClick={() => { setRole(r); setError(''); }} style={{
                flex: 1, padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: role === r ? 'var(--primary)' : 'transparent',
                color: role === r ? 'white' : 'var(--text-muted)',
                fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.3s ease',
                fontFamily: 'inherit'
              }}>
                {r === 'citizen' ? `👤 ${t('citizenLogin')}` : `🏛️ ${lang === 'en' ? 'Admin' : 'ಅಧಿಕಾರಿ'}`}
              </button>
            ))}
          </div>

          <h1 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '1.6rem', fontWeight: 700 }}>
            {role === 'citizen' ? t('citizenLogin') : t('officialLogin')}
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px', fontSize: '0.9rem' }}>
            {role === 'citizen'
              ? (lang === 'en' ? 'Login with your registered Name & Date of Birth' : 'ನಿಮ್ಮ ನೋಂದಾಯಿತ ಹೆಸರು ಮತ್ತು ಜನ್ಮ ದಿನಾಂಕ ಬಳಸಿ ಲಾಗಿನ್ ಮಾಡಿ')
              : (lang === 'en' ? 'Panchayat Development Officers only' : 'ಪಂಚಾಯತ್ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿಗಳು ಮಾತ್ರ')}
          </p>

          {role === 'citizen' ? (
            <form onSubmit={handleCitizenLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                  👤 {lang === 'en' ? 'Full Name' : 'ಪೂರ್ಣ ಹೆಸರು'}
                </label>
                <input type="text" placeholder="Basavaraj" value={name}
                  onChange={e => setName(e.target.value)}
                  style={inputStyle} autoFocus />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                  📅 {lang === 'en' ? 'Date of Birth' : 'ಜನ್ಮ ದಿನಾಂಕ'}
                </label>
                <input type="date" value={dob}
                  onChange={e => setDob(e.target.value)}
                  style={inputStyle} />
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  {lang === 'en' ? '* Your DOB acts as your password' : '* ನಿಮ್ಮ ಜನ್ಮ ದಿನಾಂಕವೇ ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್'}
                </p>
              </div>
              
              {error && <p style={{ color: 'var(--emergency)', fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}
              <button className="btn-premium btn-primary" style={{ width: '100%', borderRadius: '14px', marginTop: '8px', opacity: loading ? 0.7 : 1 }} disabled={loading}>
                {loading ? '⏳ ...' : (lang === 'en' ? 'Login →' : 'ಲಾಗಿನ್ →')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>✉️ Email</label>
                <input type="email" placeholder="admin@panchayat.gov.in" value={email}
                  onChange={e => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>🔑 Password</label>
                <input type="password" placeholder="••••••••" value={password}
                  onChange={e => setPassword(e.target.value)} style={inputStyle} />
              </div>
              {error && <p style={{ color: 'var(--emergency)', fontSize: '0.8rem', textAlign: 'center' }}>{error}</p>}
              <button className="btn-premium btn-primary" style={{ width: '100%', borderRadius: '14px', marginTop: '8px', opacity: loading ? 0.7 : 1 }} disabled={loading}>
                {loading ? '⏳ ...' : (lang === 'en' ? 'Login to Command Center →' : 'ಕಮಾಂಡ್ ಸೆಂಟರ್‌ಗೆ ಲಾಗಿನ್ →')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
