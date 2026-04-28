"use client";
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import EmergencyBar from '@/components/EmergencyBar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('namma-panchayat-auth');
    if (!user && !saved) router.push('/login?role=citizen');
  }, [user, router]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', position: 'relative' }}>
      {/* Background ambient blobs */}
      <div style={{ position: 'fixed', top: '10%', right: '-15%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--primary-glow)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(212,175,55,0.06)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <main style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px 120px' }}>
          {children}
        </main>
      </div>
      <EmergencyBar />
    </div>
  );
}
