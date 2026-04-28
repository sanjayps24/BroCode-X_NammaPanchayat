"use client";
import React from 'react';
import Link from 'next/link';
import ListenButton from './ListenButton';

const tileColors = {
  '#1976d2': { bg: 'rgba(25,118,210,0.1)', shadow: 'rgba(25,118,210,0.2)' },
  '#fbc02d': { bg: 'rgba(251,192,45,0.1)', shadow: 'rgba(251,192,45,0.2)' },
  '#d32f2f': { bg: 'rgba(211,47,47,0.1)', shadow: 'rgba(211,47,47,0.2)' },
  '#388e3c': { bg: 'rgba(56,142,60,0.1)', shadow: 'rgba(56,142,60,0.2)' },
  '#7b1fa2': { bg: 'rgba(123,31,162,0.1)', shadow: 'rgba(123,31,162,0.2)' },
  '#f57c00': { bg: 'rgba(245,124,0,0.1)', shadow: 'rgba(245,124,0,0.2)' },
};

export default function DashboardTile({ icon, title, subtitle, color, href }) {
  const colors = tileColors[color] || { bg: 'var(--primary-glow)', shadow: 'rgba(0,0,0,0.1)' };

  return (
    <Link href={href} className="premium-tile" style={{ textDecoration: 'none', color: 'inherit' }}>
      {/* Colored stripe at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: color, borderRadius: '32px 32px 0 0' }} />

      <div className="tile-icon-wrapper" style={{ background: colors.bg, boxShadow: `0 4px 16px ${colors.shadow}` }}>
        <span style={{ fontSize: '2.2rem' }}>{icon}</span>
      </div>

      <div style={{ zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '6px' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>{title}</h3>
          <ListenButton text={`${title}. ${subtitle}`} />
        </div>
        <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{subtitle}</p>
      </div>
    </Link>
  );
}
