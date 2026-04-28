"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockMandiPrices, mockJobs } from '@/lib/mockData';

import Link from 'next/link';

export default function ProsperityPage() {
  const { lang } = useLanguage();
  const [applied, setApplied] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const card = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', backdropFilter: 'blur(8px)', padding: '28px' };

  const today = new Date().toLocaleDateString(lang === 'en' ? 'en-IN' : 'kn-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const mandiData = [
    { id: 1, crop: { en: "Tomato", kn: "ಟೊಮ್ಯಾಟೊ" }, price: "₹1,200", unit: "15kg Box", trend: 'up', market: { en: "Hoskote Mandi", kn: "ಹೊಸಕೋಟೆ ಮಾರುಕಟ್ಟೆ" } },
    { id: 2, crop: { en: "Onion", kn: "ಈರುಳ್ಳಿ" }, price: "₹2,400", unit: "Quintal", trend: 'down', market: { en: "Malur Mandi", kn: "ಮಾಲೂರು ಮಾರುಕಟ್ಟೆ" } },
    { id: 3, crop: { en: "Ragi", kn: "ರಾಗಿ" }, price: "₹3,850", unit: "Quintal", trend: 'up', market: { en: "Kolar Mandi", kn: "ಕೋಲಾರ ಮಾರುಕಟ್ಟೆ" } },
    { id: 4, crop: { en: "Silk Cocoon", kn: "ರೇಷ್ಮೆ ಗೂಡು" }, price: "₹520", unit: "kg", trend: 'stable', market: { en: "Ramanagara", kn: "ರಾಮನಗರ" } }
  ];

  const jobs = [
    {
      id: 1,
      title: { en: "Panchayat Data Operator", kn: "ಪಂಚಾಯತ್ ಡೇಟಾ ಆಪರೇಟರ್" },
      location: "Hoskote Office",
      pay: "₹18,000/month",
      desc: { 
        en: "Maintaining digital records of village citizens, processing scheme applications, and assisting the PDO with administrative tasks.",
        kn: "ಗ್ರಾಮದ ನಾಗರಿಕರ ಡಿಜಿಟಲ್ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸುವುದು, ಯೋಜನೆಗಳ ಅರ್ಜಿಗಳನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುವುದು ಮತ್ತು ಪಿಡಿಒಗೆ ಆಡಳಿತಾತ್ಮಕ ಕೆಲಸಗಳಲ್ಲಿ ಸಹಾಯ ಮಾಡುವುದು."
      },
      eligibility: {
        en: "Minimum 12th Pass, Basic Computer Knowledge, Residents of Hoskote preferred.",
        kn: "ಕನಿಷ್ಠ 12ನೇ ತರಗತಿ ಪಾಸಾಗಿರಬೇಕು, ಮೂಲಭೂತ ಕಂಪ್ಯೂಟರ್ ಜ್ಞಾನ, ಹೊಸಕೋಟೆ ನಿವಾಸಿಗಳಿಗೆ ಆದ್ಯತೆ."
      },
      salary: {
        en: "Fixed ₹18k + EPF + Yearly Bonus.",
        kn: "ಸ್ಥಿರ ₹18ಸಾವಿರ + ಇಪಿಎಫ್ + ವಾರ್ಷಿಕ ಬೋನಸ್."
      }
    },
    {
      id: 2,
      title: { en: "Solar Grid Technician", kn: "ಸೌರ ಗ್ರಿಡ್ ತಂತ್ರಜ್ಞ" },
      location: "Village Solar Plant",
      pay: "₹22,000/month",
      desc: {
        en: "Monitoring and maintenance of the village community solar grid. Troubleshooting basic electrical issues and ensuring 24/7 power supply.",
        kn: "ಗ್ರಾಮದ ಸಮುದಾಯ ಸೌರ ಗ್ರಿಡ್‌ನ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ನಿರ್ವಹಣೆ. ಮೂಲಭೂತ ವಿದ್ಯುತ್ ಸಮಸ್ಯೆಗಳನ್ನು ಸರಿಪಡಿಸುವುದು ಮತ್ತು 24/7 ವಿದ್ಯುತ್ ಪೂರೈಕೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳುವುದು."
      },
      eligibility: {
        en: "ITI in Electrical/Electronics, Physical Fitness, Experience in Solar Panels preferred.",
        kn: "ಎಲೆಕ್ಟ್ರಿಕಲ್/ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್‌ನಲ್ಲಿ ಐಟಿಐ, ದೈಹಿಕ ಸಾಮರ್ಥ್ಯ, ಸೋಲಾರ್ ಪ್ಯಾನಲ್‌ಗಳಲ್ಲಿ ಅನುಭವ ಹೊಂದಿದವರಿಗೆ ಆದ್ಯತೆ."
      },
      salary: {
        en: "₹22k + Insurance + Travel Allowance.",
        kn: "₹22ಸಾವಿರ + ವಿಮೆ + ಪ್ರಯಾಣ ಭತ್ಯೆ."
      }
    },
    {
      id: 3,
      title: { en: "MGNREGA Canal Work", kn: "ನರೇಗಾ ಕಾಲುವೆ ಕೆಲಸ" },
      location: "Ward 4 / Irrigation Area",
      pay: "₹316/day",
      desc: {
        en: "Maintenance and cleaning of village drainage canals and irrigation channels to ensure smooth water flow for agriculture.",
        kn: "ಕೃಷಿಗೆ ಸುಗಮ ನೀರಿನ ಹರಿವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ಗ್ರಾಮದ ಚರಂಡಿ ಕಾಲುವೆಗಳು ಮತ್ತು ನೀರಾವರಿ ಕಾಲುವೆಗಳ ನಿರ್ವಹಣೆ ಮತ್ತು ಶುಚಿಗೊಳಿಸುವಿಕೆ."
      },
      eligibility: {
        en: "Valid MGNREGA Job Card holder, Resident of Ward 4, Physically fit for manual labor.",
        kn: "ಸಿಂಧುವಾದ ನರೇಗಾ ಜಾಬ್ ಕಾರ್ಡ್ ಹೊಂದಿರಬೇಕು, ವಾರ್ಡ್ 4 ರ ನಿವಾಸಿಯಾಗಿರಬೇಕು, ದೈಹಿಕವಾಗಿ ಸದೃಢರಾಗಿರಬೇಕು."
      },
      salary: {
        en: "₹316 per day (Direct Benefit Transfer to Bank).",
        kn: "ದಿನಕ್ಕೆ ₹316 (ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆಯಾಗುತ್ತದೆ)."
      }
    },
    {
      id: 4,
      title: { en: "Factory Helper", kn: "ಕಾರ್ಖಾನೆ ಸಹಾಯಕ" },
      location: "Industrial Area (Near NH-75)",
      pay: "₹12,000/month",
      desc: {
        en: "Assisting in packaging, loading, and unloading at the local food processing unit. Basic inventory counting required.",
        kn: "ಸ್ಥಳೀಯ ಆಹಾರ ಸಂಸ್ಕರಣಾ ಘಟಕದಲ್ಲಿ ಪ್ಯಾಕೇಜಿಂಗ್, ಲೋಡಿಂಗ್ ಮತ್ತು ಅನ್‌ಲೋಡಿಂಗ್‌ನಲ್ಲಿ ಸಹಾಯ ಮಾಡುವುದು. ಮೂಲಭೂತ ದಾಸ್ತಾನು ಎಣಿಕೆ ಅಗತ್ಯವಿದೆ."
      },
      eligibility: {
        en: "Minimum 8th Pass, Punctual, Willing to work in 8-hour shifts.",
        kn: "ಕನಿಷ್ಠ 8ನೇ ತರಗತಿ ಪಾಸಾಗಿರಬೇಕು, ಸಮಯಪ್ರಜ್ಞೆ ಇರಬೇಕು, 8 ಗಂಟೆಗಳ ಶಿಫ್ಟ್‌ಗಳಲ್ಲಿ ಕೆಲಸ ಮಾಡಲು ಸಿದ್ಧರಿರಬೇಕು."
      },
      salary: {
        en: "₹12,000 per month + Overtime (OT) Pay + Lunch.",
        kn: "ತಿಂಗಳಿಗೆ ₹12,000 + ಓವರ್‌ಟೈಮ್ (OT) ವೇತನ + ಮಧ್ಯಾಹ್ನದ ಊಟ."
      }
    },
    {
      id: 5,
      title: { en: "Anganwadi Assistant", kn: "ಅಂಗನವಾಡಿ ಸಹಾಯಕರು" },
      location: "Sector 4 School",
      pay: "₹12,500/month",
      desc: {
        en: "Assisting teachers with daily child care, managing mid-day meal distribution, and monitoring child health records.",
        kn: "ಶಿಕ್ಷಕರಿಗೆ ದೈನಂದಿನ ಮಕ್ಕಳ ಆರೈಕೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡುವುದು, ಮಧ್ಯಾಹ್ನದ ಊಟದ ವಿತರಣೆಯನ್ನು ನಿರ್ವಹಿಸುವುದು ಮತ್ತು ಮಕ್ಕಳ ಆರೋಗ್ಯ ದಾಖಲೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುವುದು."
      },
      eligibility: {
        en: "Minimum 10th Pass, Female Candidates preferred, Patient and friendly nature.",
        kn: "ಕನಿಷ್ಠ 10ನೇ ತರಗತಿ ಪಾಸಾಗಿರಬೇಕು, ಮಹಿಳಾ ಅಭ್ಯರ್ಥಿಗಳಿಗೆ ಆದ್ಯತೆ, ತಾಳ್ಮೆ ಮತ್ತು ಸ್ನೇಹಪರ ಸ್ವಭಾವ."
      },
      salary: {
        en: "₹12,500 with Government Benefits.",
        kn: "₹12,500 ಜೊತೆಗೆ ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳು."
      }
    }
  ];

  const trendIcon = (t) => t === 'up' ? '📈' : t === 'down' ? '📉' : '➖';
  const trendColor = (t) => t === 'up' ? '#388e3c' : t === 'down' ? '#d32f2f' : '#f57c00';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <header>
        <Link href="/dashboard" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>← {lang === 'en' ? 'Dashboard' : 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(56,142,60,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🌾</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{lang === 'en' ? 'Agriculture & Jobs' : 'ಕೃಷಿ ಮತ್ತು ಉದ್ಯೋಗ'}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{lang === 'en' ? 'Live mandi rates & local opportunities' : 'ನೇರ ಮಾರುಕಟ್ಟೆ ದರಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಅವಕಾಶಗಳು'}</p>
          </div>
        </div>
      </header>

      {/* Mandi Prices */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>📊 {lang === 'en' ? 'LIVE MANDI PRICES' : 'ನೇರ ಮಾರುಕಟ್ಟೆ ದರಗಳು'}</h2>
            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>📅 {lang === 'en' ? 'Updated on' : 'ಅಪ್‌ಡೇಟ್ ದಿನಾಂಕ'}: {today}</p>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#388e3c', background: 'rgba(56,142,60,0.08)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(56,142,60,0.2)', fontWeight: 700 }}>
            ● {lang === 'en' ? 'Market Open' : 'ಮಾರುಕಟ್ಟೆ ತೆರೆದಿದೆ'}
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '16px' }}>
          {mandiData.map(item => (
            <div key={item.id} style={{ background: 'var(--bg-app)', borderRadius: '20px', padding: '20px', border: '1px solid var(--border-color)', transition: 'transform 0.2s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem' }}>{item.crop[lang]}</h4>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>🏛️ {item.market[lang]}</div>
                </div>
                <div style={{ fontSize: '1.5rem' }}>{trendIcon(item.trend)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontWeight: 900, fontSize: '1.8rem', color: 'var(--text-main)' }}>{item.price}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ {item.unit}</span>
              </div>
              <div style={{ marginTop: '10px', fontSize: '0.72rem', color: trendColor(item.trend), fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                {item.trend === 'up' ? '▲ ' + (lang === 'en' ? 'Price rising' : 'ಬೆಲೆ ಏರುತ್ತಿದೆ') : item.trend === 'down' ? '▼ ' + (lang === 'en' ? 'Price falling' : 'ಬೆಲೆ ಕುಸಿಯುತ್ತಿದೆ') : '• ' + (lang === 'en' ? 'Stable' : 'ಸ್ಥಿರವಾಗಿದೆ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs Board */}
      <div style={card}>
        <h2 style={{ margin: '0 0 24px', fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>👷 {lang === 'en' ? 'PREMIUM JOB BOARD' : 'ಸ್ಥಳೀಯ ಉದ್ಯೋಗ ಬೋರ್ಡ್'}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {jobs.map(job => (
            <div key={job.id} onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)} style={{ 
              background: 'var(--bg-app)', borderRadius: '22px', border: `2px solid ${selectedJob === job.id ? 'var(--primary)' : 'var(--border-color)'}`,
              overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem' }}>{job.title[lang]}</h3>
                    <span style={{ fontSize: '0.65rem', padding: '3px 10px', borderRadius: '10px', background: 'var(--primary-glow)', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase' }}>
                      {lang === 'en' ? 'New' : 'ಹೊಸದು'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>📍 {job.location}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#388e3c', display: 'flex', alignItems: 'center', gap: '4px' }}>💰 {job.pay}</span>
                  </div>
                </div>
                <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', transform: selectedJob === job.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>▼</div>
              </div>

              {selectedJob === job.id && (
                <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.4)', animation: 'fadeInUp 0.4s ease' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '24px' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>📝 {lang === 'en' ? 'Job Description' : 'ಉದ್ಯೋಗದ ವಿವರ'}</div>
                      <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>{job.desc[lang]}</p>
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>🎓 {lang === 'en' ? 'Eligibility' : 'ಅರ್ಹತೆ'}</div>
                      <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>{job.eligibility[lang]}</p>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '4px', textTransform: 'uppercase' }}>💵 {lang === 'en' ? 'Salary & Benefits' : 'ವೇತನ ಮತ್ತು ಸೌಲಭ್ಯಗಳು'}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#388e3c' }}>{job.salary[lang]}</div>
                    </div>
                    
                    {applied.includes(job.id) ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(56,142,60,0.1)', color: '#388e3c', padding: '12px 28px', borderRadius: '50px', fontWeight: 800 }}>
                        ✅ {lang === 'en' ? 'Application Sent' : 'ಅರ್ಜಿ ಕಳುಹಿಸಲಾಗಿದೆ'}
                      </div>
                    ) : (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setApplied(p => [...p, job.id]); }} 
                        className="btn-premium btn-primary" 
                        style={{ borderRadius: '50px', padding: '14px 40px', fontSize: '0.95rem' }}
                      >
                        {lang === 'en' ? 'APPLY NOW →' : 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ →'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
