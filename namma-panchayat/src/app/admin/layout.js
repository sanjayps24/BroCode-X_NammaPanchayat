"use client";
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';
import LanguageToggle from '@/components/LanguageToggle';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const { lang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('namma-panchayat-auth');
    if (!user && !saved) router.push('/login?role=admin');
  }, [user, router]);

  const navItems = [
    { label: { en: "Overview", kn: "ಸ್ಥಿತಿ" }, href: "/admin", icon: "📊", exact: true },
    { label: { en: "Complaints", kn: "ದೂರುಗಳು" }, href: "/admin/complaints", icon: "🎫" },
    { label: { en: "Citizens", kn: "ನಾಗರಿಕರು" }, href: "/admin/citizens", icon: "👥" },
    { label: { en: "Broadcast", kn: "ಪ್ರಕಟಣೆ" }, href: "/admin/broadcast", icon: "📢" },
  ];

  const isActive = (item) => item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)', fontFamily: 'var(--font-en)' }}>

      {/* Sidebar */}
      <aside style={{
        width: '260px', flexShrink: 0,
        background: 'var(--bg-sidebar)',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh',
        borderRight: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* Logo */}
        <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '14px',
              background: 'linear-gradient(135deg,#4a7c41,#2d5a27)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', boxShadow: '0 4px 12px rgba(45,90,39,0.4)'
            }}>🏛️</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'white', lineHeight: 1.1 }}>Namma Panchayat</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Admin Command Center</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', padding: '0 12px', marginBottom: '8px', letterSpacing: '1px' }}>NAVIGATION</div>
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 16px', borderRadius: '14px', marginBottom: '4px',
                color: active ? 'white' : 'rgba(255,255,255,0.55)',
                background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                textDecoration: 'none', fontWeight: active ? 700 : 400,
                fontSize: '0.9rem', transition: 'all 0.2s ease',
                borderLeft: active ? '3px solid #81c784' : '3px solid transparent'
              }}
                onMouseOver={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseOut={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span>{item.label[lang]}</span>
                {active && <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: '#81c784' }} />}
              </Link>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '14px', background: 'rgba(255,255,255,0.05)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#4a7c41,#d4af37)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>
              {user?.name?.[0] || 'A'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'white' }}>{user?.name || 'Admin'}</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>PDO</div>
            </div>
            <button onClick={logout} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '1rem', padding: '4px' }} title="Logout">🚪</button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <header style={{
          height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
          background: 'var(--glass-bg)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 50
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {navItems.find(i => isActive(i))?.label[lang] || 'Admin'}
            </h2>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {lang === 'en' ? 'Hoskote Grama Panchayat, Karnataka' : 'ಹೊಸಕೋಟೆ ಗ್ರಾಮ ಪಂಚಾಯತ್, ಕರ್ನಾಟಕ'}
            </p>
          </div>
          <LanguageToggle />
        </header>

        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
