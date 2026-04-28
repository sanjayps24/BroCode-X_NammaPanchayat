"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import LanguageToggle from './LanguageToggle';
import Link from 'next/link';

export default function Header() {
  const { t, lang } = useLanguage();
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="premium-header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--primary), #4a7c41)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem', boxShadow: '0 4px 12px var(--primary-glow)'
        }}>🏛️</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary)', lineHeight: 1.1 }}>{t('appName')}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 500 }}>{t('tagline')}</div>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Language + Theme */}
        <div style={{ position: 'relative' }}>
          <LanguageToggle />
        </div>

        {/* Separator */}
        <div style={{ width: '1px', height: '28px', background: 'var(--border-color)' }} />

        {/* User pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: '0.9rem'
          }}>
            {user?.name?.[0] || 'U'}
          </div>
          <div style={{ display: 'none' }}>
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{user?.name}</span>
          </div>
          <button onClick={logout} style={{
            background: 'none', border: '1px solid var(--border-color)',
            color: 'var(--text-muted)', padding: '6px 14px', borderRadius: '20px',
            fontSize: '0.8rem', cursor: 'pointer', fontWeight: 500,
            transition: 'all 0.2s ease', fontFamily: 'inherit'
          }}
            onMouseOver={e => e.currentTarget.style.borderColor = 'var(--emergency)'}
            onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
          >
            {lang === 'en' ? 'Logout' : 'ನಿಷ್ಕ್ರಮಿಸಿ'}
          </button>
        </div>
      </div>
    </header>
  );
}
