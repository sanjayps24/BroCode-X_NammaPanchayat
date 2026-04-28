"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockSchoolUpdates } from '@/lib/mockData';
import ListenButton from '@/components/ListenButton';
import Link from 'next/link';

export default function EducationPage() {
  const { lang } = useLanguage();
  const [rating, setRating] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const card = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', backdropFilter: 'blur(8px)', padding: '28px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <header>
        <Link href="/dashboard" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>← {lang === 'en' ? 'Dashboard' : 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(25,118,210,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🏫</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{lang === 'en' ? 'Namma Shale' : 'ನಮ್ಮ ಶಾಲೆ'}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{lang === 'en' ? 'School updates, meals & scholarships' : 'ಶಾಲಾ ಅಪ್‌ಡೇಟ್‌ಗಳು, ಊಟ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ'}</p>
          </div>
          <ListenButton text={lang === 'en' ? 'Namma Shale education page.' : 'ನಮ್ಮ ಶಾಲೆ ಶಿಕ್ಷಣ ಪುಟ.'} />
        </div>
      </header>

      {/* Infrastructure */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>🏗️ {lang === 'en' ? 'INFRASTRUCTURE TRACKER' : 'ಮೂಲಸೌಕರ್ಯ ಟ್ರ್ಯಾಕರ್'}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {mockSchoolUpdates.map(u => (
            <div key={u.id} style={{ background: 'var(--bg-app)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h4 style={{ margin: 0, fontWeight: 700 }}>{u.title[lang]}</h4>
                  <ListenButton text={`${u.title[lang]}. ${u.progress} percent complete.`} />
                </div>
                <span style={{
                  padding: '4px 14px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700,
                  background: u.status === 'Completed' ? 'rgba(56,142,60,0.12)' : 'rgba(245,124,0,0.12)',
                  color: u.status === 'Completed' ? '#388e3c' : '#f57c00'
                }}>{u.status}</span>
              </div>
              <div style={{ height: '10px', background: 'var(--border-color)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${u.progress}%`, height: '100%', background: u.status === 'Completed' ? '#388e3c' : '#1976d2', borderRadius: '5px', transition: 'width 1.5s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: u.status === 'Completed' ? '#388e3c' : '#1976d2' }}>{u.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Feedback */}
      <div style={{ ...card, background: 'linear-gradient(135deg, rgba(25,118,210,0.05), rgba(25,118,210,0.02))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>🍲 {lang === 'en' ? "MID-DAY MEAL FEEDBACK" : "ಮಧ್ಯಾಹ್ನ ಊಟದ ಅಭಿಪ್ರಾಯ"}</h2>
        </div>
        <p style={{ margin: '0 0 20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {lang === 'en' ? "How was today's meal quality?" : "ಇಂದಿನ ಆಹಾರ ಗುಣಮಟ್ಟ ಹೇಗಿತ್ತು?"}
        </p>
        {!feedbackSent ? (
          <>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', fontSize: '2.5rem' }}>
              {[1,2,3,4,5].map(s => (
                <span key={s} onClick={() => setRating(s)} style={{ cursor: 'pointer', filter: rating >= s ? 'none' : 'grayscale(1) opacity(0.4)', transition: 'all 0.2s ease', transform: rating === s ? 'scale(1.2)' : 'scale(1)' }}>⭐</span>
              ))}
            </div>
            <button onClick={() => rating > 0 && setFeedbackSent(true)} className="btn-premium btn-primary" style={{ borderRadius: '50px', opacity: rating === 0 ? 0.5 : 1 }}>
              {lang === 'en' ? 'Submit Feedback' : 'ಅಭಿಪ್ರಾಯ ಸಲ್ಲಿಸಿ'}
            </button>
          </>
        ) : (
          <div style={{ padding: '16px 24px', background: 'rgba(56,142,60,0.1)', borderRadius: '14px', color: '#388e3c', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            ✅ {lang === 'en' ? 'Thank you for your feedback!' : 'ನಿಮ್ಮ ಅಭಿಪ್ರಾಯಕ್ಕೆ ಧನ್ಯವಾದ!'}
          </div>
        )}
      </div>

      {/* Scholarship */}
      <div style={card}>
        <h2 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>🎓 {lang === 'en' ? 'SCHOLARSHIP ALERTS' : 'ವಿದ್ಯಾರ್ಥಿವೇತನ ಅಲರ್ಟ್‌ಗಳು'}</h2>
        <div style={{ padding: '20px', background: 'var(--bg-app)', borderRadius: '16px', border: '1px solid var(--border-color)', borderLeft: '4px solid #1976d2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h4 style={{ margin: 0, fontWeight: 700 }}>SSP Post-Matric 2026</h4>
                <ListenButton text="SSP Post Matric Scholarship 2026. Applications open for SC ST students. Deadline May 30." />
              </div>
              <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {lang === 'en' ? 'Applications open for SC/ST students.' : 'ಪರಿಶಿಷ್ಟ ಜಾತಿ/ಪಂಗಡ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಅರ್ಜಿ ಮುಕ್ತ.'}
              </p>
            </div>
            <span style={{ background: 'rgba(211,47,47,0.1)', color: '#d32f2f', padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {lang === 'en' ? 'Due May 30' : 'ಮೇ 30 ವರೆಗೆ'}
            </span>
          </div>
          <button className="btn-premium btn-primary" style={{ marginTop: '16px', borderRadius: '50px', fontSize: '0.85rem', padding: '10px 24px' }}>
            {lang === 'en' ? 'Apply Now →' : 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ →'}
          </button>
        </div>
      </div>
    </div>
  );
}
