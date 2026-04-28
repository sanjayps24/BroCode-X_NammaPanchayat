"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockSchemes } from '@/lib/mockData';

import Link from 'next/link';

export default function WelfarePage() {
  const { lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedScheme, setSelectedScheme] = useState(null);

  const allSchemes = [
    {
      id: 1,
      name: { en: "Gruha Lakshmi", kn: "ಗೃಹ ಲಕ್ಷ್ಮಿ" },
      benefit: { en: "₹2,000 monthly financial assistance for woman head of family.", kn: "ಕುಟುಂಬದ ಮಹಿಳಾ ಯಜಮಾನಿಗೆ ಮಾಸಿಕ ₹2,000 ಹಣಕಾಸಿನ ನೆರವು." },
      type: "guarantee",
      eligible: {
        en: "Woman head of family as identified in Ration Card (BPL/Antyodaya/APL).",
        kn: "ಪಡಿತರ ಚೀಟಿಯಲ್ಲಿ (ಬಿಪಿಎಲ್/ಅಂತ್ಯೋದಯ/ಎಪಿಎಲ್) ಗುರುತಿಸಲಾದ ಕುಟುಂಬದ ಮಹಿಳಾ ಮುಖ್ಯಸ್ಥೆ."
      },
      steps: {
        en: "1. Register at Karnataka-One, Grama-One or Bapuji-One centers. 2. Provide Aadhaar linked to Bank A/C. 3. Submit Ration Card details.",
        kn: "1. ಕರ್ನಾಟಕ-ಒನ್, ಗ್ರಾಮ-ಒನ್ ಅಥವಾ ಬಾಪೂಜಿ-ಒನ್ ಕೇಂದ್ರಗಳಲ್ಲಿ ನೋಂದಾಯಿಸಿ. 2. ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಲಿಂಕ್ ಮಾಡಲಾದ ಆಧಾರ್ ನೀಡಿ. 3. ಪಡಿತರ ಚೀಟಿ ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ."
      },
      website: "https://sevasindhugs.karnataka.gov.in/",
      phone: "1902",
      icon: "👩‍👩‍👧"
    },
    {
      id: 2,
      name: { en: "Anna Bhagya", kn: "ಅನ್ನ ಭಾಗ್ಯ" },
      benefit: { en: "10kg free rice per person (5kg rice + 5kg cash equivalent).", kn: "ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ 10 ಕೆಜಿ ಉಚಿತ ಅಕ್ಕಿ (5 ಕೆಜಿ ಅಕ್ಕಿ + 5 ಕೆಜಿ ನಗದು ಸಮಾನ)." },
      type: "guarantee",
      eligible: {
        en: "BPL and Antyodaya Ration Card holders in Karnataka.",
        kn: "ಕರ್ನಾಟಕದ ಬಿಪಿಎಲ್ ಮತ್ತು ಅಂತ್ಯೋದಯ ಪಡಿತರ ಚೀಟಿ ಹೊಂದಿರುವವರು."
      },
      steps: {
        en: "Automatic enrollment if Ration Card is active and Aadhaar is seeded with Bank Account.",
        kn: "ಪಡಿತರ ಚೀಟಿ ಸಕ್ರಿಯವಾಗಿದ್ದರೆ ಮತ್ತು ಆಧಾರ್ ಅನ್ನು ಬ್ಯಾಂಕ್ ಖಾತೆಯೊಂದಿಗೆ ಸೀಡ್ ಮಾಡಿದ್ದರೆ ಸ್ವಯಂಚಾಲಿತ ನೋಂದಣಿ."
      },
      website: "https://ahara.kar.nic.in/",
      phone: "1967",
      icon: "🌾"
    },
    {
      id: 3,
      name: { en: "Gruha Jyothi", kn: "ಗೃಹ ಜ್ಯೋತಿ" },
      benefit: { en: "Free electricity for households up to 200 units per month.", kn: "ತಿಂಗಳಿಗೆ 200 ಯುನಿಟ್‌ಗಳವರೆಗೆ ಮನೆಗಳಿಗೆ ಉಚಿತ ವಿದ್ಯುತ್." },
      type: "guarantee",
      eligible: {
        en: "Domestic consumers. Benefit based on average consumption + 10% allowance.",
        kn: "ಗೃಹ ಬಳಕೆದಾರರು. ಸರಾಸರಿ ಬಳಕೆ + 10% ಭತ್ಯೆಯ ಆಧಾರದ ಮೇಲೆ ಸೌಲಭ್ಯ."
      },
      steps: {
        en: "Apply via Seva Sindhu portal. Link your RR Number (Meter ID) with Aadhaar.",
        kn: "ಸೇವಾ ಸಿಂಧು ಪೋರ್ಟಲ್ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ. ನಿಮ್ಮ RR ಸಂಖ್ಯೆಯನ್ನು (ಮೀಟರ್ ಐಡಿ) ಆಧಾರ್‌ನೊಂದಿಗೆ ಲಿಂಕ್ ಮಾಡಿ."
      },
      website: "https://sevasindhugs.karnataka.gov.in/",
      phone: "1912",
      icon: "💡"
    },
    {
      id: 4,
      name: { en: "Shakti Scheme", kn: "ಶಕ್ತಿ ಯೋಜನೆ" },
      benefit: { en: "Free travel for women and gender minorities in Govt buses within Karnataka.", kn: "ಕರ್ನಾಟಕದೊಳಗೆ ಸರ್ಕಾರಿ ಬಸ್‌ಗಳಲ್ಲಿ ಮಹಿಳೆಯರು ಮತ್ತು ಲೈಂಗಿಕ ಅಲ್ಪಸಂಖ್ಯಾತರಿಗೆ ಉಚಿತ ಪ್ರಯಾಣ." },
      type: "guarantee",
      eligible: {
        en: "All women residents of Karnataka. Shakti Smart Card required for long term.",
        kn: "ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಮಹಿಳಾ ನಿವಾಸಿಗಳು. ದೀರ್ಘಾವಧಿಗೆ ಶಕ್ತಿ ಸ್ಮಾರ್ಟ್ ಕಾರ್ಡ್ ಅಗತ್ಯವಿದೆ."
      },
      steps: {
        en: "Show any valid Govt Photo ID (Aadhaar/Voter ID) to the bus conductor.",
        kn: "ಬಸ್ ಕಂಡಕ್ಟರ್‌ಗೆ ಯಾವುದೇ ಅಧಿಕೃತ ಫೋಟೋ ಐಡಿ (ಆಧಾರ್/ವೋಟರ್ ಐಡಿ) ತೋರಿಸಿ."
      },
      website: "https://ksrtc.karnataka.gov.in/",
      phone: "080-49596666",
      icon: "🚌"
    },
    {
      id: 5,
      name: { en: "Yuva Nidhi", kn: "ಯುವ ನಿಧಿ" },
      benefit: { en: "Unemployment stipend: ₹3,000 for Graduates, ₹1,500 for Diploma holders.", kn: "ನಿರುದ್ಯೋಗ ಭತ್ಯೆ: ಪದವೀಧರರಿಗೆ ₹3,000, ಡಿಪ್ಲೊಮಾ ಹೊಂದಿದವರಿಗೆ ₹1,500." },
      type: "guarantee",
      eligible: {
        en: "Graduates/Diploma holders who passed in 2023 onwards and unemployed for 6 months.",
        kn: "2023 ರಿಂದ ತೇರ್ಗಡೆಯಾದ ಮತ್ತು 6 ತಿಂಗಳಿನಿಂದ ನಿರುದ್ಯೋಗಿಗಳಾಗಿರುವ ಪದವೀಧರರು/ಡಿಪ್ಲೊಮಾ ಹೊಂದಿದವರು."
      },
      steps: {
        en: "Apply on Seva Sindhu. Self-declaration of unemployment status required monthly.",
        kn: "ಸೇವಾ ಸಿಂಧುನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ. ಪ್ರತಿ ತಿಂಗಳು ನಿರುದ್ಯೋಗ ಸ್ಥಿತಿಯ ಸ್ವಯಂ ಘೋಷಣೆ ಅಗತ್ಯವಿದೆ."
      },
      website: "https://sevasindhugs.karnataka.gov.in/",
      phone: "1800-599-9999",
      icon: "🎓"
    },
    {
      id: 6,
      name: { en: "SSP Post-Matric Scholarship", kn: "SSP ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ" },
      benefit: { en: "Tuition fee reimbursement and maintenance allowance for students.", kn: "ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಬೋನಸ್ ಶುಲ್ಕ ಮರುಪಾವತಿ ಮತ್ತು ನಿರ್ವಹಣಾ ಭತ್ಯೆ." },
      type: "student",
      eligible: {
        en: "SC/ST/OBC/Minority students with annual income < ₹2.5 Lakhs.",
        kn: "ವಾರ್ಷಿಕ ಆದಾಯ < ₹2.5 ಲಕ್ಷ ಇರುವ ಎಸ್‌ಸಿ/ಎಸ್‌ಟಿ/ಒಬಿಸಿ/ಅಲ್ಪಸಂಖ್ಯಾತ ವಿದ್ಯಾರ್ಥಿಗಳು."
      },
      steps: {
        en: "1. Login to SSP Portal. 2. Seed Aadhaar with NPCI mapping. 3. Upload caste/income/marks cards.",
        kn: "1. SSP ಪೋರ್ಟಲ್‌ಗೆ ಲಾಗಿನ್ ಮಾಡಿ. 2. NPCI ಮ್ಯಾಪಿಂಗ್‌ನೊಂದಿಗೆ ಆಧಾರ್ ಸೀಡ್ ಮಾಡಿ. 3. ಜಾತಿ/ಆದಾಯ/ಅಂಕಪಟ್ಟಿಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ."
      },
      website: "https://ssp.postmatric.karnataka.gov.in/",
      phone: "080-35254757",
      icon: "📝"
    },
    {
      id: 7,
      name: { en: "PMAY Rural Housing", kn: "PMAY ಗ್ರಾಮೀಣ ವಸತಿ" },
      benefit: { en: "Financial grant of ₹1.2 Lakh to ₹1.5 Lakh for building a pucca house.", kn: "ಪಕ್ಕಾ ಮನೆ ನಿರ್ಮಿಸಲು ₹1.2 ಲಕ್ಷದಿಂದ ₹1.5 ಲಕ್ಷದವರೆಗೆ ಆರ್ಥಿಕ ನೆರವು." },
      type: "poor",
      eligible: {
        en: "Families without a permanent home, living in kutcha houses. BPL status mandatory.",
        kn: "ಶಾಶ್ವತ ಮನೆ ಇಲ್ಲದ, ಕಚ್ಚಾ ಮನೆಗಳಲ್ಲಿ ವಾಸಿಸುತ್ತಿರುವ ಕುಟುಂಬಗಳು. ಬಿಪಿಎಲ್ ಸ್ಥಾನಮಾನ ಕಡ್ಡಾಯ."
      },
      steps: {
        en: "Apply through the Panchayat Development Officer (PDO). Geo-tagging of site is required.",
        kn: "ಪಂಚಾಯತ್ ಅಭಿವೃದ್ಧಿ ಅಧಿಕಾರಿ (PDO) ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ. ಸೈಟ್‌ನ ಜಿಯೋ-ಟ್ಯಾಗಿಂಗ್ ಅಗತ್ಯವಿದೆ."
      },
      website: "https://ashraya.karnataka.gov.in/",
      phone: "080-23118888",
      icon: "🏠"
    }
  ];

  const filtered = allSchemes.filter(s =>
    s.name[lang].toLowerCase().includes(search.toLowerCase()) ||
    s.name.en.toLowerCase().includes(search.toLowerCase())
  );

  const card = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', backdropFilter: 'blur(8px)', padding: '28px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <header>
        <Link href="/dashboard" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>← {lang === 'en' ? 'Dashboard' : 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(123,31,162,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👑</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{lang === 'en' ? 'Mega Schemes' : 'ಮೆಗಾ ಯೋಜನೆಗಳು'}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{lang === 'en' ? '5 Guarantees & Welfare Programs' : '5 ಗ್ಯಾರಂಟಿಗಳು ಮತ್ತು ಕಲ್ಯಾಣ ಕಾರ್ಯಕ್ರಮಗಳು'}</p>
          </div>
        </div>
      </header>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem' }}>🔍</span>
        <input type="text"
          placeholder={lang === 'en' ? 'Search schemes (e.g. Gruha...)' : 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...'}
          value={search} onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '16px 20px 16px 50px', fontSize: '1rem',
            borderRadius: '50px', border: '2px solid var(--border-color)',
            background: 'var(--bg-card)', color: 'var(--text-main)',
            outline: 'none', fontFamily: 'inherit'
          }}
        />
      </div>

      {/* Schemes List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map(s => (
          <div key={s.id} onClick={() => setSelectedScheme(selectedScheme === s.id ? null : s.id)} style={{ 
            ...card, cursor: 'pointer', border: `2px solid ${selectedScheme === s.id ? 'var(--primary)' : 'var(--border-color)'}`,
            transition: 'all 0.3s ease', position: 'relative'
          }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '2rem', background: 'white', padding: '12px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>{s.name[lang]}</h3>
                  <span style={{ fontSize: '0.65rem', padding: '3px 10px', borderRadius: '10px', background: s.type === 'guarantee' ? 'rgba(56,142,60,0.1)' : 'rgba(123,31,162,0.1)', color: s.type === 'guarantee' ? '#388e3c' : '#7b1fa2', fontWeight: 800, textTransform: 'uppercase' }}>
                    {s.type}
                  </span>
                </div>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.benefit[lang]}</p>
                
                {selectedScheme === s.id && (
                  <div style={{ marginTop: '24px', animation: 'fadeInUp 0.4s ease' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                      <div style={{ background: 'var(--bg-app)', padding: '16px', borderRadius: '16px' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.72rem', color: 'var(--primary)', marginBottom: '6px', textTransform: 'uppercase' }}>🎯 {lang === 'en' ? 'Eligibility' : 'ಅರ್ಹತೆ'}</div>
                        <div style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>{s.eligible[lang]}</div>
                      </div>
                      <div style={{ background: 'var(--bg-app)', padding: '16px', borderRadius: '16px' }}>
                        <div style={{ fontWeight: 800, fontSize: '0.72rem', color: 'var(--primary)', marginBottom: '6px', textTransform: 'uppercase' }}>🚀 {lang === 'en' ? 'Steps to Apply' : 'ಅರ್ಜಿ ವಿಧಾನ'}</div>
                        <div style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>{s.steps[lang]}</div>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>🌐 {lang === 'en' ? 'Official Website' : 'ಅಧಿಕೃತ ಜಾಲತಾಣ'}</div>
                        <a href={s.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>{s.website.replace('https://', '')}</a>
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>📞 {lang === 'en' ? 'Contact / Helpline' : 'ಸಹಾಯವಾಣಿ'}</div>
                        <a href={`tel:${s.phone}`} style={{ fontSize: '0.85rem', color: '#d32f2f', fontWeight: 800, textDecoration: 'none' }}>{s.phone}</a>
                      </div>
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-premium btn-primary" style={{ borderRadius: '50px', padding: '12px 32px' }}>
                          {lang === 'en' ? 'Proceed to Apply' : 'ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಮುಂದುವರಿಯಿರಿ'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
