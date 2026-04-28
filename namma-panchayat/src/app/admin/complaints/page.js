"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

const deptOptions = [
  { name: "KEB (Electricity)", url: "https://bescom.karnataka.gov.in/", phone: "1912" },
  { name: "Water Board", url: "https://bwssb.karnataka.gov.in/", phone: "1916" },
  { name: "Fire & Emergency", url: "https://ksfes.karnataka.gov.in/", phone: "101" },
  { name: "PWD (Roads)", url: "https://kpwd.karnataka.gov.in/", phone: "080-22210211" },
  { name: "Streetlights (Municipal)", url: "https://mrc.gov.in/", phone: "080-22660000" },
  { name: "Other related departments", url: "https://karnataka.gov.in/", phone: "100" }
];

const emergencyContacts = [
  { label: "Ambulance", phone: "108", icon: "🚑" },
  { label: "Police", phone: "100 / 112", icon: "👮" },
  { label: "Women Helpline", phone: "1091", icon: "👩" },
  { label: "Child Helpline", phone: "1098", icon: "👶" },
  { label: "Village PDO", phone: "9845012345", icon: "👔" }
];

export default function AdminComplaints() {
  const { lang } = useLanguage();
  const { complaints } = useAuth();
  const [filter, setFilter] = useState('All');
  const [forwarded, setForwarded] = useState({});
  const [selected, setSelected] = useState(null);

  const filters = ['All', 'New', 'In Progress', 'Resolved'];
  const shown = filter === 'All' ? complaints : complaints.filter(t => t.status === filter);

  const statusStyle = (s) => ({
    padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700,
    background: s === 'Resolved' ? 'rgba(56,142,60,0.12)' : s === 'New' ? 'rgba(211,47,47,0.12)' : 'rgba(245,124,0,0.12)',
    color: s === 'Resolved' ? '#388e3c' : s === 'New' ? '#d32f2f' : '#f57c00',
    display: 'inline-block'
  });

  const priorityStyle = (p) => ({
    padding: '3px 10px', borderRadius: '20px', fontSize: '0.67rem', fontWeight: 700,
    background: p === 'High' ? 'rgba(211,47,47,0.08)' : 'rgba(245,124,0,0.08)',
    color: p === 'High' ? '#d32f2f' : '#f57c00', display: 'inline-block'
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '28px' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '9px 22px', borderRadius: '50px',
              border: `1px solid ${filter === f ? 'var(--primary)' : 'var(--border-color)'}`,
              background: filter === f ? 'var(--primary)' : 'var(--bg-card)',
              color: filter === f ? 'white' : 'var(--text-muted)',
              fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
              fontFamily: 'inherit', transition: 'all 0.2s ease'
            }}>{f}</button>
          ))}
          <span style={{ marginLeft: 'auto', alignSelf: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {shown.length} {lang === 'en' ? 'complaints' : 'ದೂರುಗಳು'}
          </span>
        </div>

        {/* Complaints */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {shown.length > 0 ? shown.map(t => (
            <div key={t.id} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              borderRadius: '20px', padding: '22px 26px',
              backdropFilter: 'blur(8px)', transition: 'box-shadow 0.2s ease',
              boxShadow: selected === t.id ? 'var(--shadow-md)' : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--primary)' }}>{t.id}</span>
                  <span style={statusStyle(t.status)}>{t.status}</span>
                  <span style={priorityStyle(t.priority)}>{t.priority}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.date}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.82rem', background: 'var(--bg-app)', padding: '4px 12px', borderRadius: '20px', fontWeight: 600, border: '1px solid var(--border-color)' }}>
                    🏷️ {t.category}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>👤 {t.user} · 📱 {t.phone} · Ward {t.ward}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                  📍 <strong>Address:</strong> {t.address}
                </div>
              </div>

              <p style={{ margin: '0 0 18px', color: 'var(--text-main)', lineHeight: 1.5 }}>{t.issue}</p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button style={{ padding: '8px 18px', borderRadius: '50px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit', color: 'var(--text-main)' }}>
                  🎧 {lang === 'en' ? 'Play Audio' : 'ಆಡಿಯೋ ಕೇಳಿ'}
                </button>

                {forwarded[t.id] ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ padding: '8px 18px', background: 'rgba(56,142,60,0.1)', color: '#388e3c', borderRadius: '50px', fontWeight: 700, fontSize: '0.8rem' }}>
                      ✓ {lang === 'en' ? `Forwarded to ${forwarded[t.id].name}` : `${forwarded[t.id].name}ಗೆ ಫಾರ್ವರ್ಡ್ ಮಾಡಲಾಗಿದೆ`}
                    </span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <a href={forwarded[t.id].url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline' }}>
                        Website 🔗
                      </a>
                      <a href={`tel:${forwarded[t.id].phone}`} style={{ fontSize: '0.75rem', color: '#1976d2', fontWeight: 600, textDecoration: 'none' }}>
                        📞 {forwarded[t.id].phone}
                      </a>
                    </div>
                  </div>
                ) : (
                  <select
                    onChange={e => { 
                      const dept = deptOptions.find(d => d.name === e.target.value);
                      if (dept) setForwarded(p => ({ ...p, [t.id]: dept })); 
                    }}
                    defaultValue=""
                    style={{ padding: '9px 16px', borderRadius: '50px', border: '1px solid var(--primary)', background: 'var(--primary)', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}
                  >
                    <option value="" disabled>➡️ {lang === 'en' ? 'Forward to Dept...' : 'ಇಲಾಖೆಗೆ ಫಾರ್ವರ್ಡ್...'}</option>
                    {deptOptions.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                  </select>
                )}
              </div>
            </div>
          )) : (
            <div style={{ padding: '60px', textAlign: 'center', background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
              <h3 style={{ margin: 0, color: 'var(--text-muted)' }}>{lang === 'en' ? "No complaints found" : "ಯಾವುದೇ ದೂರುಗಳು ಕಂಡುಬಂದಿಲ್ಲ"}</h3>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar with Contacts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '24px', position: 'sticky', top: '96px' }}>
          <h3 style={{ margin: '0 0 20px', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            🚨 {lang === 'en' ? "Emergency Contacts" : "ತುರ್ತು ಸಂಪರ್ಕಗಳು"}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {emergencyContacts.map((contact, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.2rem' }}>{contact.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{contact.label}</div>
                  <a href={`tel:${contact.phone}`} style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', textDecoration: 'none' }}>{contact.phone}</a>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ margin: '32px 0 20px', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            🏢 {lang === 'en' ? "Department Directory" : "ಇಲಾಖೆ ಮಾಹಿತಿ"}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {deptOptions.map((dept, i) => (
              <div key={i} style={{ paddingBottom: '12px', borderBottom: i < deptOptions.length - 1 ? '1px dashed var(--border-color)' : 'none' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>{dept.name}</div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href={`tel:${dept.phone}`} style={{ fontSize: '0.8rem', color: '#1976d2', fontWeight: 600, textDecoration: 'none' }}>📞 {dept.phone}</a>
                  <a href={dept.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'underline' }}>Web</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
