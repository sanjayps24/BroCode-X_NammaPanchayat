"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function FarmersDevelopmentPage() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('economic');
  const [expandedFeature, setExpandedFeature] = useState(null);
  
  // Soil Analyzer State
  const [soilType, setSoilType] = useState('');
  const [lastCrop, setLastCrop] = useState('');
  const [soilIssue, setSoilIssue] = useState('');
  const [soilReport, setSoilReport] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const categories = [
    { id: 'economic', title: { en: "Economic Growth", kn: "ಆರ್ಥಿಕ ಅಭಿವೃದ್ಧಿ" }, icon: "💰" },
    { id: 'tools', title: { en: "Modern Tools", kn: "ಆಧುನಿಕ ಉಪಕರಣಗಳು" }, icon: "🚜" },
    { id: 'health', title: { en: "Soil Analyzer", kn: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಕ" }, icon: "🌱" },
  ];

  const features = {
    economic: [
      { 
        id: 'fpo',
        title: { en: "FPO Marketplace", kn: "ರೈತ ಉತ್ಪಾದಕ ಸಂಸ್ಥೆಗಳ ಮಾರುಕಟ್ಟೆ" }, 
        desc: { en: "Sell your crops directly to FPOs for 20% higher profits.", kn: "ಎಫ್‌ಪಿಒಗಳಿಗೆ ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ನೇರವಾಗಿ ಮಾರಾಟ ಮಾಡಿ." },
        details: {
          en: "Current high demand for Ragi. Payments processed within 24 hours via Krishi Marata.",
          kn: "ರಾಗಿಗೆ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆಯಿದೆ. ಕೃಷಿ ಮಾರಾಟ ಮೂಲಕ 24 ಗಂಟೆಗಳಲ್ಲಿ ಹಣ ಪಾವತಿ."
        },
        url: "https://www.krishimarata.karnataka.gov.in/",
        action: { en: "Go to Marketplace", kn: "ಮಾರುಕಟ್ಟೆಗೆ ಹೋಗಿ" },
        icon: "🏪"
      },
      { 
        id: 'loan',
        title: { en: "KCC Loan Portal", kn: "KCC ಸಾಲ ಪೋರ್ಟಲ್" }, 
        desc: { en: "Apply for Kisan Credit Card loans with 0% interest.", kn: "0% ಬಡ್ಡಿಯ ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಸಾಲಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ." },
        details: {
          en: "Requires Aadhar and Land Records (Pahani). Apply on Seva Sindhu official portal.",
          kn: "ಆಧಾರ್ ಮತ್ತು ಪಹಣಿ ಅಗತ್ಯವಿದೆ. ಸೇವಾ ಸಿಂಧು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ."
        },
        url: "https://sevasindhu.karnataka.gov.in/",
        action: { en: "Apply on Seva Sindhu", kn: "ಸೇವಾ ಸಿಂಧುನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" },
        icon: "🏦"
      }
    ],
    tools: [
      { 
        id: 'tractor',
        title: { en: "Tractor & Harvester", kn: "ಟ್ರಾಕ್ಟರ್ ಮತ್ತು ಹಾರ್ವೆಸ್ಟರ್" }, 
        desc: { en: "Rent high-end tractors at 50% subsidized rates.", kn: "50% ಸಬ್ಸಿಡಿ ದರದಲ್ಲಿ ಟ್ರಾಕ್ಟರ್‌ ಬಾಡಿಗೆಗೆ ಪಡೆಯಿರಿ." },
        details: {
          en: "Doorstep delivery available via RaitaMitra. Operator included.",
          kn: "ರೈತಮಿತ್ರ ಮೂಲಕ ಮನೆಬಾಗಿಲಿಗೆ ವಿತರಣೆ ಲಭ್ಯ. ಚಾಲಕನ ಸೌಲಭ್ಯವಿದೆ."
        },
        url: "https://raitamitra.karnataka.gov.in/",
        action: { en: "Book on RaitaMitra", kn: "ರೈತಮಿತ್ರದಲ್ಲಿ ಬುಕ್ ಮಾಡಿ" },
        icon: "🚜"
      },
      { 
        id: 'tiller',
        title: { en: "Power Tiller", kn: "ಪವರ್ ಟಿಲ್ಲರ್" }, 
        desc: { en: "Subsidized power tillers for small scale farming.", kn: "ಸಣ್ಣ ಪ್ರಮಾಣದ ಕೃಷಿಗಾಗಿ ಸಬ್ಸಿಡಿ ದರದ ಪವರ್ ಟಿಲ್ಲರ್." },
        details: {
          en: "Available for 8-hour or 24-hour rentals. Check RaitaMitra for availability.",
          kn: "8 ಅಥವಾ 24 ಗಂಟೆಗಳ ಬಾಡಿಗೆಗೆ ಲಭ್ಯವಿದೆ. ಲಭ್ಯತೆಗಾಗಿ ರೈತಮಿತ್ರ ಪರಿಶೀಲಿಸಿ."
        },
        url: "https://raitamitra.karnataka.gov.in/",
        action: { en: "Check Availability", kn: "ಲಭ್ಯತೆ ಪರಿಶೀಲಿಸಿ" },
        icon: "⚙️"
      },
      { 
        id: 'seed_drill',
        title: { en: "Seed Drill", kn: "ಬೀಜ ಬಿತ್ತನೆ ಯಂತ್ರ" }, 
        desc: { en: "Modern seed drills for uniform sowing.", kn: "ಸಮಾನ ಬಿತ್ತನೆಗಾಗಿ ಆಧುನಿಕ ಬಿತ್ತನೆ ಯಂತ್ರ." },
        details: {
          en: "Reduces labor cost by 60%. Official booking via K-Agri portal.",
          kn: "ಕಾರ್ಮಿಕ ವೆಚ್ಚ 60% ಉಳಿಸುತ್ತದೆ. ಕೆ-ಅಗ್ರಿ ಪೋರ್ಟಲ್ ಮೂಲಕ ಅಧಿಕೃತ ಬುಕಿಂಗ್."
        },
        url: "https://raitamitra.karnataka.gov.in/",
        action: { en: "Book Seed Drill", kn: "ಬೀಜ ಬಿತ್ತನೆ ಯಂತ್ರ ಬುಕ್ ಮಾಡಿ" },
        icon: "🛠️"
      }
    ]
  };

  const handleAnalyzeSoil = () => {
    if (!soilType || !lastCrop) return;
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Dynamic Logic Based on Input
      let score = 70 + Math.floor(Math.random() * 25);
      let n = "Medium", p = "Medium", k = "Medium";
      let adviceEn = "";
      let adviceKn = "";

      // 1. Analyze by Issue
      if (soilIssue.toLowerCase().includes('yellow') || soilIssue.includes('ಹಳದಿ')) {
        n = "Low";
        adviceEn = "Your soil is likely deficient in Nitrogen. ";
        adviceKn = "ನಿಮ್ಮ ಮಣ್ಣಿನಲ್ಲಿ ಸಾರಜನಕದ ಕೊರತೆಯಿರುವ ಸಾಧ್ಯತೆಯಿದೆ. ";
        score -= 15;
      } else if (soilIssue.toLowerCase().includes('slow') || soilIssue.includes('growth') || soilIssue.includes('ಬೆಳವಣಿಗೆ')) {
        p = "Low";
        adviceEn = "Phosphorus levels seem inadequate for root growth. ";
        adviceKn = "ಬೇರುಗಳ ಬೆಳವಣಿಗೆಗೆ ರಂಜಕದ ಮಟ್ಟವು ಅಸಮರ್ಪಕವಾಗಿದೆ. ";
        score -= 10;
      }

      // 2. Analyze by Soil Type
      if (soilType === 'Red Soil') {
        k = "Medium";
        adviceEn += `Red soil needs more organic carbon. For your ${lastCrop}, use compost mixed with Neem cake. `;
        adviceKn += `ಕೆಂಪು ಮಣ್ಣಿಗೆ ಹೆಚ್ಚಿನ ಸಾವಯವ ಇಂಗಾಲದ ಅಗತ್ಯವಿದೆ. ನಿಮ್ಮ ${lastCrop} ಬೆಳೆಗೆ, ಬೇವಿನ ಹಿಂಡಿಯೊಂದಿಗೆ ಮಿಶ್ರಣ ಮಾಡಿದ ಕಾಂಪೋಸ್ಟ್ ಬಳಸಿ. `;
      } else if (soilType === 'Black Soil') {
        adviceEn += `Black soil has good moisture retention. Ensure proper drainage for ${lastCrop} to avoid root rot. `;
        adviceKn += `ಕಪ್ಪು ಮಣ್ಣು ಉತ್ತಮ ತೇವಾಂಶ ಉಳಿಸಿಕೊಳ್ಳುವ ಸಾಮರ್ಥ್ಯ ಹೊಂದಿದೆ. ${lastCrop} ಬೆಳೆಗೆ ಬೇರು ಕೊಳೆತವನ್ನು ತಪ್ಪಿಸಲು ಸರಿಯಾದ ಬಸಿದುಹೋಗುವ ವ್ಯವಸ್ಥೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. `;
      } else if (soilType === 'Sandy Soil') {
        n = "Low";
        adviceEn += "Sandy soil leaches nutrients quickly. Use split doses of fertilizer. ";
        adviceKn += "ಮರಳು ಮಣ್ಣು ಪೋಷಕಾಂಶಗಳನ್ನು ಬೇಗನೆ ಕಳೆದುಕೊಳ್ಳುತ್ತದೆ. ರಸಗೊಬ್ಬರವನ್ನು ಹಂತ ಹಂತವಾಗಿ ಬಳಸಿ. ";
        score -= 5;
      }

      // 3. Crop Specific Logic
      if (lastCrop.toLowerCase().includes('ragi') || lastCrop.includes('ರಾಗಿ')) {
        adviceEn += "Ragi needs Zinc for better grain filling.";
        adviceKn += "ರಾಗಿಗೆ ಉತ್ತಮ ಕಾಳು ಕಟ್ಟಲು ಸತುವಿನ (Zinc) ಅಗತ್ಯವಿದೆ.";
      } else if (lastCrop.toLowerCase().includes('paddy') || lastCrop.includes('ಭತ್ತ')) {
        p = "Low";
        adviceEn += "Paddy requires balanced Phosphorus. Check for water logging.";
        adviceKn += "ಭತ್ತಕ್ಕೆ ಸಮತೋಲಿತ ರಂಜಕದ ಅಗತ್ಯವಿದೆ. ನೀರು ನಿಲ್ಲುವಿಕೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ.";
      }

      setSoilReport({
        healthScore: Math.max(score, 45),
        nitrogen: n,
        phosphorus: p,
        potassium: k,
        advice: {
          en: adviceEn || "Soil quality is generally good. Maintain with organic mulch.",
          kn: adviceKn || "ಮಣ್ಣಿನ ಗುಣಮಟ್ಟ ಸಾಮಾನ್ಯವಾಗಿ ಉತ್ತಮವಾಗಿದೆ. ಸಾವಯವ ಮಲ್ಚ್‌ನೊಂದಿಗೆ ನಿರ್ವಹಿಸಿ."
        }
      });
    }, 2000);
  };

  const cardStyle = { 
    background: 'var(--bg-card)', 
    border: '1px solid var(--border-color)', 
    borderRadius: '24px', 
    padding: '24px', 
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <header>
        <Link href="/dashboard" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>← {lang === 'en' ? 'Dashboard' : 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(46,125,50,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🚜</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{lang === 'en' ? "Farmer's Development" : "ಕೃಷಿ ಅಭಿವೃದ್ಧಿ"}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{lang === 'en' ? 'Empowering rural agriculture economically' : 'ಗ್ರಾಮೀಣ ಕೃಷಿಯನ್ನು ಆರ್ಥಿಕವಾಗಿ ಸಬಲೀಕರಣಗೊಳಿಸುವುದು'}</p>
          </div>
        </div>
      </header>

      {/* Advisory Widget */}
      <div style={{ 
        background: 'rgba(251,192,45,0.1)', border: '1.5px solid #fbc02d', borderRadius: '20px', padding: '20px',
        display: 'flex', alignItems: 'center', gap: '20px'
      }}>
        <div style={{ fontSize: '2.5rem' }}>☀️</div>
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f57c00', textTransform: 'uppercase' }}>
            {lang === 'en' ? 'Today\'s Advisory' : 'ಇಂದಿನ ಸಲಹೆ'}
          </div>
          <p style={{ margin: '4px 0 0', fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>
            {lang === 'en' 
              ? "32°C Sunny · Perfect time for Ragi harvesting. Low pest risk detected." 
              : "32°C ಬಿಸಿಲು · ರಾಗಿ ಕೊಯ್ಲಿಗೆ ಸೂಕ್ತ ಸಮಯ. ಕಡಿಮೆ ಕೀಟಬಾಧೆ ಪತ್ತೆಯಾಗಿದೆ."}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: 'var(--bg-card)', padding: '6px', borderRadius: '18px', border: '1px solid var(--border-color)', gap: '6px' }}>
        {categories.map(cat => (
          <button 
            key={cat.id} 
            onClick={() => { setSelectedCategory(cat.id); setExpandedFeature(null); }}
            style={{
              flex: 1, padding: '12px', borderRadius: '14px', border: 'none', cursor: 'pointer',
              background: selectedCategory === cat.id ? 'var(--primary)' : 'transparent',
              color: selectedCategory === cat.id ? 'white' : 'var(--text-muted)',
              fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.3s ease', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            <span>{cat.icon}</span>
            <span style={{ whiteSpace: 'nowrap' }}>{cat.title[lang]}</span>
          </button>
        ))}
      </div>

      {/* Category Content */}
      {selectedCategory === 'health' ? (
        <div style={cardStyle}>
          <h2 style={{ margin: '0 0 20px', fontSize: '1.3rem', fontWeight: 800 }}>{lang === 'en' ? 'Interactive Soil Health Analyzer' : 'ಪಾರಸ್ಪರಿಕ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಕ'}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem' }}>{lang === 'en' ? 'Select Soil Type' : 'ಮಣ್ಣಿನ ವಿಧ ಆಯ್ಕೆಮಾಡಿ'}</label>
              <select value={soilType} onChange={e => setSoilType(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)' }}>
                <option value="">-- {lang === 'en' ? 'Select' : 'ಆಯ್ಕೆಮಾಡಿ'} --</option>
                <option value="Red Soil">{lang === 'en' ? 'Red Soil' : 'ಕೆಂಪು ಮಣ್ಣು'}</option>
                <option value="Black Soil">{lang === 'en' ? 'Black Soil' : 'ಕಪ್ಪು ಮಣ್ಣು'}</option>
                <option value="Sandy Soil">{lang === 'en' ? 'Sandy Soil' : 'ಮರಳು ಮಣ್ಣು'}</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem' }}>{lang === 'en' ? 'Last Crop Grown' : 'ಕೊನೆಯದಾಗಿ ಬೆಳೆದ ಬೆಳೆ'}</label>
              <input type="text" value={lastCrop} onChange={e => setLastCrop(e.target.value)} placeholder={lang === 'en' ? 'e.g. Ragi, Maize' : 'ಉದಾ: ರಾಗಿ, ಮೆಕ್ಕೆಜೋಳ'} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, fontSize: '0.85rem' }}>{lang === 'en' ? 'Current Soil Issues' : 'ಪ್ರಸ್ತುತ ಮಣ್ಣಿನ ಸಮಸ್ಯೆಗಳು'}</label>
              <textarea value={soilIssue} onChange={e => setSoilIssue(e.target.value)} placeholder={lang === 'en' ? 'e.g. Yellowing leaves, slow growth' : 'ಉದಾ: ಎಲೆ ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವುದು'} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)', height: '80px', resize: 'none' }} />
            </div>
            <button onClick={handleAnalyzeSoil} disabled={isAnalyzing || !soilType || !lastCrop} className="btn-premium btn-primary" style={{ padding: '16px', borderRadius: '50px', fontSize: '1rem' }}>
              {isAnalyzing ? (lang === 'en' ? 'Analyzing...' : 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...') : (lang === 'en' ? 'Analyze Soil Now' : 'ಮಣ್ಣನ್ನು ಈಗ ವಿಶ್ಲೇಷಿಸಿ')}
            </button>
          </div>

          {soilReport && (
            <div style={{ marginTop: '24px', padding: '24px', background: 'var(--primary-glow)', borderRadius: '20px', border: '1.5px solid var(--primary)', animation: 'fadeInUp 0.4s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, color: 'var(--primary)', fontWeight: 800 }}>{lang === 'en' ? 'AI Health Report' : 'AI ಆರೋಗ್ಯ ವರದಿ'}</h3>
                <div style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 800 }}>Score: {soilReport.healthScore}%</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                <div style={{ textAlign: 'center', background: 'white', padding: '10px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>N (Nitrogen)</div>
                  <div style={{ fontWeight: 800, color: '#f57c00' }}>{soilReport.nitrogen}</div>
                </div>
                <div style={{ textAlign: 'center', background: 'white', padding: '10px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>P (Phosphorus)</div>
                  <div style={{ fontWeight: 800, color: '#d32f2f' }}>{soilReport.phosphorus}</div>
                </div>
                <div style={{ textAlign: 'center', background: 'white', padding: '10px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>K (Potassium)</div>
                  <div style={{ fontWeight: 800, color: '#388e3c' }}>{soilReport.potassium}</div>
                </div>
              </div>
              <div style={{ background: 'white', padding: '16px', borderRadius: '16px' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, fontWeight: 500 }}>{soilReport.advice[lang]}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {features[selectedCategory].map((f) => (
            <div key={f.id} onClick={() => setExpandedFeature(expandedFeature === f.id ? null : f.id)} style={{ ...cardStyle, border: expandedFeature === f.id ? '2px solid var(--primary)' : '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>
                  {f.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{f.title[lang]}</h3>
                    <span style={{ fontSize: '1.2rem', opacity: 0.5, transform: expandedFeature === f.id ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>▼</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>{f.desc[lang]}</p>
                  
                  {expandedFeature === f.id && (
                    <div style={{ marginTop: '20px', animation: 'fadeInUp 0.3s ease' }}>
                      <div style={{ background: 'var(--bg-app)', padding: '16px', borderRadius: '16px', marginBottom: '20px', borderLeft: '4px solid var(--primary)' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500 }}>{f.details[lang]}</p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <a href={f.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="btn-premium btn-primary" style={{ textDecoration: 'none', borderRadius: '50px', padding: '12px 32px', fontSize: '0.9rem', display: 'inline-block' }}>
                          {f.action[lang]} ↗
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Impact Stat */}
      <div style={{ background: 'linear-gradient(135deg, #2e7d32, #1b5e20)', borderRadius: '24px', padding: '32px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '1.5rem', fontWeight: 800 }}>{lang === 'en' ? 'Panchayat Agri-Shield' : 'ಪಂಚಾಯತ್ ಕೃಷಿ-ರಕ್ಷೆ'}</h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem' }}>{lang === 'en' ? 'Empowering 450+ farmers with modern tools and economic growth.' : 'ಆಧುನಿಕ ಉಪಕರಣಗಳು ಮತ್ತು ಆರ್ಥಿಕ ಬೆಳವಣಿಗೆಯೊಂದಿಗೆ 450+ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು.'}</p>
        </div>
        <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', padding: '20px 32px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 900 }}>₹1.2 Cr</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{lang === 'en' ? 'Total Agri-Credit Disbursed' : 'ಒಟ್ಟು ವಿತರಿಸಿದ ಕೃಷಿ ಸಾಲ'}</div>
        </div>
      </div>
    </div>
  );
}
