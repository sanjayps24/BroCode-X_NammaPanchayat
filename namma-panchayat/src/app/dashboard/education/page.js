"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockSchoolUpdates } from '@/lib/mockData';
import Link from 'next/link';

export default function EducationPage() {
  const { lang } = useLanguage();
  const [rating, setRating] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const card = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', backdropFilter: 'blur(8px)', padding: '28px' };

  const schemes = [
    {
      id: 1,
      title: { en: "Vidya Siri", kn: "ವಿದ್ಯಾಸಿರಿ" },
      desc: { en: "Food and accommodation for rural students.", kn: "ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಆಹಾರ ಮತ್ತು ವಸತಿ." },
      details: { 
        en: "Provides monthly stipend of ₹1,500 for 10 months for rural students studying in cities to cover food and lodging expenses.",
        kn: "ನಗರಗಳಲ್ಲಿ ಓದುತ್ತಿರುವ ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಆಹಾರ ಮತ್ತು ವಸತಿ ವೆಚ್ಚವನ್ನು ಭರಿಸಲು 10 ತಿಂಗಳವರೆಗೆ ತಿಂಗಳಿಗೆ ₹1,500 ನೀಡಲಾಗುತ್ತದೆ."
      },
      apply: {
        en: "1. Visit SSP portal. 2. Login with Student ID. 3. Select 'Hostel/Food' category. 4. Upload income certificate.",
        kn: "1. SSP ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ. 2. ವಿದ್ಯಾರ್ಥಿ ಐಡಿಯೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ. 3. 'ವಸತಿ ನಿಲಯ/ಆಹಾರ' ವರ್ಗವನ್ನು ಆರಿಸಿ. 4. ಆದಾಯ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
      },
      deadline: "June 15, 2026",
      type: "poor", icon: "🍱"
    },
    {
      id: 2,
      title: { en: "Pratibha Puraskara", kn: "ಪ್ರತಿಭಾ ಪುರಸ್ಕಾರ" },
      desc: { en: "Rewards for high-achieving students.", kn: "ಹೆಚ್ಚು ಅಂಕ ಗಳಿಸಿದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಬಹುಮಾನ." },
      details: {
        en: "A reward of ₹10,000 - ₹25,000 given to students who secure more than 90% in SSLC/PUC exams.",
        kn: "ಎಸ್‌ಎಸ್‌ಎಲ್‌ಸಿ/ಪಿಯುಸಿ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಶೇ.90 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಅಂಕ ಪಡೆದ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ₹10,000 - ₹25,000 ಬಹುಮಾನ ನೀಡಲಾಗುತ್ತದೆ."
      },
      apply: {
        en: "1. Apply via Seva Sindhu or BCM portal. 2. Submit marks card and caste certificate. 3. Link bank account with Aadhaar.",
        kn: "1. ಸೇವಾ ಸಿಂಧು ಅಥವಾ ಬಿಸಿಎಂ ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ. 2. ಅಂಕಪಟ್ಟಿ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಸಲ್ಲಿಸಿ. 3. ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ಆಧಾರ್‌ನೊಂದಿಗೆ ಲಿಂಕ್ ಮಾಡಿ."
      },
      deadline: "August 30, 2026",
      type: "merit", icon: "🏅"
    },
    {
      id: 3,
      title: { en: "Cycle Bhagya", kn: "ಸೈಕಲ್ ಭಾಗ್ಯ" },
      desc: { en: "Free bicycles for 8th standard students.", kn: "8ನೇ ತರಗತಿಯ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉಚಿತ ಸೈಕಲ್." },
      details: {
        en: "Distribution of free bicycles to all girl students and rural boys studying in government/aided schools to improve attendance.",
        kn: "ಹಾಜರಾತಿಯನ್ನು ಹೆಚ್ಚಿಸಲು ಸರ್ಕಾರಿ/ಅನುದಾನಿತ ಶಾಲೆಗಳಲ್ಲಿ ಓದುತ್ತಿರುವ ಎಲ್ಲಾ ಹೆಣ್ಣು ಮಕ್ಕಳಿಗೆ ಮತ್ತು ಗ್ರಾಮೀಣ ಗಂಡು ಮಕ್ಕಳಿಗೆ ಉಚಿತ ಸೈಕಲ್‌ಗಳ ವಿತರಣೆ."
      },
      apply: {
        en: "1. Automatic enrollment via school headmaster. 2. Ensure SATS ID is updated. 3. Provide residential certificate.",
        kn: "1. ಶಾಲಾ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರ ಮೂಲಕ ಸ್ವಯಂಚಾಲಿತ ನೋಂದಣಿ. 2. SATS ಐಡಿ ಅಪ್‌ಡೇಟ್ ಆಗಿದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. 3. ವಾಸಸ್ಥಳದ ಪ್ರಮಾಣಪತ್ರವನ್ನು ನೀಡಿ."
      },
      deadline: "July 20, 2026",
      type: "general", icon: "🚲"
    },
    {
      id: 4,
      title: { en: "Vidya Vikas", kn: "ವಿದ್ಯಾ ವಿಕಾಸ" },
      desc: { en: "Free uniforms and textbooks.", kn: "ಉಚಿತ ಸಮವಸ್ತ್ರ ಮತ್ತು ಪಠ್ಯಪುಸ್ತಕಗಳು." },
      details: {
        en: "Two sets of free uniforms, one pair of shoes, two pairs of socks, and a complete set of textbooks for every student.",
        kn: "ಪ್ರತಿ ವಿದ್ಯಾರ್ಥಿಗೆ ಎರಡು ಸೆಟ್ ಉಚಿತ ಸಮವಸ್ತ್ರ, ಒಂದು ಜೋಡಿ ಶೂ, ಎರಡು ಜೋಡಿ ಸಾಕ್ಸ್ ಮತ್ತು ಪಠ್ಯಪುಸ್ತಕಗಳ ಸಂಪೂರ್ಣ ಸೆಟ್."
      },
      apply: {
        en: "Collect directly from the school office at the start of the academic year. No separate application needed.",
        kn: "ಶೈಕ್ಷಣಿಕ ವರ್ಷದ ಪ್ರಾರಂಭದಲ್ಲಿ ನೇರವಾಗಿ ಶಾಲಾ ಕಚೇರಿಯಿಂದ ಪಡೆದುಕೊಳ್ಳಿ. ಯಾವುದೇ ಪ್ರತ್ಯೇಕ ಅರ್ಜಿ ಅಗತ್ಯವಿಲ್ಲ."
      },
      deadline: "Continuous",
      type: "general", icon: "📚"
    }
  ];

  const infraUpdates = [
    { id: 1, title: { en: "Smart Classroom Setup", kn: "ಸ್ಮಾರ್ಟ್ ತರಗತಿ ವ್ಯವಸ್ಥೆ" }, progress: 85, status: "Ongoing" },
    { id: 2, title: { en: "Toilet Block Renovation", kn: "ಶೌಚಾಲಯ ಬ್ಲಾಕ್ ನವೀಕರಣ" }, progress: 100, status: "Completed" },
    { id: 3, title: { en: "New Science Lab Equipment", kn: "ಹೊಸ ವಿಜ್ಞಾನ ಪ್ರಯೋಗಾಲಯ ಉಪಕರಣ" }, progress: 45, status: "Ongoing" },
    { id: 4, title: { en: "Playground Leveling", kn: "ಆಟದ ಮೈದಾನ ಸಮತಟ್ಟು" }, progress: 20, status: "Delayed" }
  ];

  const mealInfo = [
    { title: { en: "Mid-day Meal Menu", kn: "ಬಿಸಿ ಊಟದ ಮೆನು" }, content: { en: "Rice, Sambar, Egg (Wed), Peanut Chikki.", kn: "ಅನ್ನ, ಸಾಂಬಾರ್, ಮೊಟ್ಟೆ (ಬುಧ), ಶೇಂಗಾ ಚಿಕ್ಕಿ." } },
    { title: { en: "Ksheera Bhagya (Milk)", kn: "ಕ್ಷೀರ ಭಾಗ್ಯ (ಹಾಲು)" }, content: { en: "Fresh milk served 5 days a week for all students.", kn: "ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ವಾರದಲ್ಲಿ 5 ದಿನ ತಾಜಾ ಹಾಲು ನೀಡಲಾಗುತ್ತದೆ." } }
  ];

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

        </div>
      </header>

      {/* Infrastructure */}
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>🏗️ {lang === 'en' ? 'INFRASTRUCTURE TRACKER' : 'ಮೂಲಸೌಕರ್ಯ ಟ್ರ್ಯಾಕರ್'}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {infraUpdates.map(u => (
            <div key={u.id} style={{ background: 'var(--bg-app)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h4 style={{ margin: 0, fontWeight: 700 }}>{u.title[lang]}</h4>

                </div>
                <span style={{
                  padding: '4px 14px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700,
                  background: u.status === 'Completed' ? 'rgba(56,142,60,0.12)' : u.status === 'Delayed' ? 'rgba(211,47,47,0.12)' : 'rgba(245,124,0,0.12)',
                  color: u.status === 'Completed' ? '#388e3c' : u.status === 'Delayed' ? '#d32f2f' : '#f57c00'
                }}>{u.status}</span>
              </div>
              <div style={{ height: '10px', background: 'var(--border-color)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${u.progress}%`, height: '100%', background: u.status === 'Completed' ? '#388e3c' : u.status === 'Delayed' ? '#d32f2f' : '#1976d2', borderRadius: '5px', transition: 'width 1.5s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: u.status === 'Completed' ? '#388e3c' : '#1976d2' }}>{u.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal & Milk Scheme */}
      <div style={{ ...card, background: 'linear-gradient(135deg, rgba(56,142,60,0.05), rgba(56,142,60,0.02))' }}>
        <h2 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>🍲 {lang === 'en' ? "NUTRITION PROGRAMS" : "ಪೌಷ್ಟಿಕಾಂಶ ಯೋಜನೆಗಳು"}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {mealInfo.map((m, i) => (
            <div key={i} style={{ background: 'var(--bg-app)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, marginBottom: '6px', color: '#388e3c' }}>{m.title[lang]}</div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{m.content[lang]}</p>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
          <p style={{ margin: '0 0 16px', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            {lang === 'en' ? "Rate today's meal quality:" : "ಇಂದಿನ ಆಹಾರದ ಗುಣಮಟ್ಟ ತಿಳಿಸಿ:"}
          </p>
          {!feedbackSent ? (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', fontSize: '2rem' }}>
                {[1,2,3,4,5].map(s => (
                  <span key={s} onClick={() => setRating(s)} style={{ cursor: 'pointer', filter: rating >= s ? 'none' : 'grayscale(1) opacity(0.4)', transition: 'all 0.15s ease' }}>⭐</span>
                ))}
              </div>
              {rating > 0 && (
                <button onClick={() => setFeedbackSent(true)} className="btn-premium btn-primary" style={{ borderRadius: '50px', padding: '10px 24px', fontSize: '0.85rem' }}>
                  {lang === 'en' ? 'Submit' : 'ಸಲ್ಲಿಸಿ'}
                </button>
              )}
            </div>
          ) : (
            <div style={{ padding: '12px 20px', background: 'rgba(56,142,60,0.1)', borderRadius: '12px', color: '#388e3c', fontWeight: 700, fontSize: '0.85rem' }}>
              ✅ {lang === 'en' ? 'Feedback received!' : 'ಅಭಿಪ್ರಾಯ ಸ್ವೀಕರಿಸಲಾಗಿದೆ!'}
            </div>
          )}
        </div>
      </div>

      {/* Gov Schemes */}
      <div style={card}>
        <h2 style={{ margin: '0 0 20px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>📜 {lang === 'en' ? "GOVERNMENT SCHEMES" : "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು"}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {schemes.map((s) => (
            <div key={s.id} onClick={() => setSelectedScheme(selectedScheme?.id === s.id ? null : s)} style={{ 
              display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'var(--bg-app)', padding: '20px', 
              borderRadius: '16px', border: `2px solid ${selectedScheme?.id === s.id ? 'var(--primary)' : 'var(--border-color)'}`,
              cursor: 'pointer', transition: 'all 0.2s ease'
            }}>
              <div style={{ fontSize: '1.8rem', background: 'white', padding: '10px', borderRadius: '12px' }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h4 style={{ margin: 0, fontWeight: 700 }}>{s.title[lang]}</h4>
                  <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', background: s.type === 'merit' ? 'rgba(25,118,210,0.1)' : 'rgba(123,31,162,0.1)', color: s.type === 'merit' ? '#1976d2' : '#7b1fa2', fontWeight: 800, textTransform: 'uppercase' }}>
                    {s.type === 'merit' ? (lang === 'en' ? 'Merit' : 'ಪ್ರತಿಭೆ') : (lang === 'en' ? 'General' : 'ಸಾಮಾನ್ಯ')}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.desc[lang]}</p>
                
                {selectedScheme?.id === s.id && (
                  <div style={{ marginTop: '20px', padding: '20px', background: 'white', borderRadius: '14px', border: '1px solid var(--border-color)', animation: 'slideDown 0.3s ease' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '4px', textTransform: 'uppercase' }}>📋 {lang === 'en' ? 'Details' : 'ವಿವರಗಳು'}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{s.details[lang]}</div>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '4px', textTransform: 'uppercase' }}>🚀 {lang === 'en' ? 'How to Apply' : 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ'}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{s.apply[lang]}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.8rem', color: '#d32f2f', fontWeight: 700 }}>⏳ {lang === 'en' ? 'Deadline:' : 'ಕೊನೆಯ ದಿನಾಂಕ:'} {s.deadline}</div>

                    </div>
                  </div>
                )}
              </div>
              <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', transform: selectedScheme?.id === s.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>▼</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scholarship */}
      <div style={{ ...card, border: '2px solid var(--primary)' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.5px' }}>🎓 {lang === 'en' ? 'STATE SCHOLARSHIP PORTAL (SSP)' : 'ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪೋರ್ಟಲ್'}</h2>
        <div style={{ padding: '20px', background: 'var(--bg-app)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ margin: '0 0 4px', fontWeight: 700 }}>SSP Post-Matric 2026</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {lang === 'en' ? 'Applications open for SC/ST/OBC students. Keep your Aadhaar and Income certificate ready.' : 'ಪರಿಶಿಷ್ಟ ಜಾತಿ/ಪಂಗಡ/ಹಿಂದುಳಿದ ವರ್ಗಗಳ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಅರ್ಜಿ ಮುಕ್ತ.'}
              </p>
            </div>
            <span style={{ background: 'rgba(211,47,47,0.1)', color: '#d32f2f', padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
              {lang === 'en' ? 'Due May 30' : 'ಮೇ 30 ವರೆಗೆ'}
            </span>
          </div>
          <a 
            href="https://ssp.postmatric.karnataka.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-premium btn-primary" 
            style={{ display: 'inline-block', marginTop: '20px', borderRadius: '50px', fontSize: '0.9rem', padding: '12px 32px', textDecoration: 'none', textAlign: 'center' }}
          >
            {lang === 'en' ? 'Go to SSP Portal →' : 'SSP ಪೋರ್ಟಲ್‌ಗೆ ಹೋಗಿ →'}
          </a>
        </div>
      </div>
    </div>
  );
}
