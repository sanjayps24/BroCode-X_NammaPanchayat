"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export default function LanguageToggle() {
  const { lang, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    }}>
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          border: '1px solid var(--border-color)',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(10px)',
          fontSize: '1.2rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.3s ease'
        }}
        title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Language Toggle */}
      <button 
        onClick={toggleLanguage}
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'var(--shadow-sm)',
          borderRadius: '50px',
          padding: '10px 22px',
          fontSize: '0.85rem',
          fontWeight: 600,
          border: '1px solid var(--border-color)',
          color: 'var(--primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease'
        }}
      >
        🌐 {t('languageToggle')}
      </button>
    </div>
  );
}
