"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function AdminCitizens() {
  const { lang } = useLanguage();
  const { citizens, addCitizen, updateCitizen, deleteCitizen } = useAuth();
  const [search, setSearch] = useState('');
  const [wardFilter, setWardFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', familyId: '', dob: '', age: '', gender: 'Male', phone: '', ward: '1', isHead: false
  });

  const filtered = citizens.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.familyId.toLowerCase().includes(search.toLowerCase());
    const matchWard = wardFilter === 'All' || c.ward === wardFilter.replace('Ward ', '');
    return matchSearch && matchWard;
  });

  const handleAddEdit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateCitizen({ ...formData, id: editingId });
    } else {
      addCitizen(formData);
    }
    setFormData({ name: '', familyId: '', dob: '', age: '', gender: 'Male', phone: '', ward: '1', isHead: false });
    setEditingId(null);
    setShowModal(false);
  };

  const startEdit = (citizen) => {
    setFormData(citizen);
    setEditingId(citizen.id);
    setShowModal(true);
  };

  const toggleHead = (citizen) => {
    updateCitizen({ ...citizen, isHead: !citizen.isHead });
  };

  const card = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', backdropFilter: 'blur(8px)', padding: '28px' };
  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'inherit' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header with Add Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>{lang === 'en' ? 'User Management' : 'ಬಳಕೆದಾರರ ನಿರ್ವಹಣೆ'}</h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {lang === 'en' ? 'Manage village families and portal access.' : 'ಗ್ರಾಮದ ಕುಟುಂಬಗಳು ಮತ್ತು ಪೋರ್ಟಲ್ ಪ್ರವೇಶವನ್ನು ನಿರ್ವಹಿಸಿ.'}
          </p>
        </div>
        <button onClick={() => { setEditingId(null); setFormData({ name: '', familyId: '', dob: '', age: '', gender: 'Male', phone: '', ward: '1', isHead: false }); setShowModal(true); }} 
          className="btn-premium btn-primary" style={{ borderRadius: '50px', padding: '12px 24px' }}>
          + {lang === 'en' ? 'Add User' : 'ಬಳಕೆದಾರರನ್ನು ಸೇರಿಸಿ'}
        </button>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {[
          { label: lang === 'en' ? 'Total Population' : 'ಒಟ್ಟು ಜನಸಂಖ್ಯೆ', value: '600+', icon: '👥', color: '#7b1fa2' },
          { label: lang === 'en' ? 'Managed Users' : 'ನಿರ್ವಹಿಸಿದ ಬಳಕೆದಾರರು', value: citizens.length, icon: '📋', color: '#1976d2' },
          { label: lang === 'en' ? 'Family Heads' : 'ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರು', value: citizens.filter(c => c.isHead).length, icon: '👑', color: '#388e3c' },
        ].map((s, i) => (
          <div key={i} style={{ ...card, padding: '22px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontWeight: 900, fontSize: '1.6rem', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'en' ? 'Search by name or family ID...' : 'ಹೆಸರು ಅಥವಾ ಕುಟುಂಬ ID ಮೂಲಕ ಹುಡುಕಿ...'}
            style={{
              width: '100%', padding: '12px 16px 12px 46px',
              borderRadius: '50px', border: '1px solid var(--border-color)',
              background: 'var(--bg-card)', color: 'var(--text-main)',
              fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none'
            }} />
        </div>
        {['All', 'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'].map(w => (
          <button key={w} onClick={() => setWardFilter(w)} style={{
            padding: '10px 18px', borderRadius: '50px', cursor: 'pointer', fontFamily: 'inherit',
            border: `1px solid ${wardFilter === w ? 'var(--primary)' : 'var(--border-color)'}`,
            background: wardFilter === w ? 'var(--primary)' : 'var(--bg-card)',
            color: wardFilter === w ? 'white' : 'var(--text-muted)',
            fontWeight: 600, fontSize: '0.82rem', transition: 'all 0.2s'
          }}>{w}</button>
        ))}
      </div>

      {/* Citizens Table */}
      <div style={card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                {[
                  lang === 'en' ? 'Family ID' : 'ಕುಟುಂಬ ID',
                  lang === 'en' ? 'Citizen' : 'ನಾಗರಿಕ',
                  lang === 'en' ? 'Head Access' : 'ಪ್ರವೇಶ',
                  lang === 'en' ? 'Age/Gender' : 'ವಯಸ್ಸು/ಲಿಂಗ',
                  lang === 'en' ? 'Phone' : 'ಫೋನ್',
                  lang === 'en' ? 'Actions' : 'ಕ್ರಮಗಳು'
                ].map((h, i) => (
                  <th key={i} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--bg-app)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '16px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)' }}>{c.familyId}</span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary),var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                        {c.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DOB: {c.dob}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button onClick={() => toggleHead(c)} style={{
                      padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                      background: c.isHead ? 'rgba(56,142,60,0.1)' : 'rgba(158,158,158,0.1)',
                      color: c.isHead ? '#388e3c' : '#757575', transition: 'all 0.2s'
                    }}>
                      {c.isHead ? (lang === 'en' ? '👑 Head' : '👑 ಮುಖ್ಯಸ್ಥ') : (lang === 'en' ? 'Member' : 'ಸದಸ್ಯ')}
                    </button>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.85rem' }}>
                    {c.age} / {c.gender}
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {c.phone}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => startEdit(c)} style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.75rem', padding: '6px 12px', borderRadius: '14px' }}>
                        {lang === 'en' ? 'Edit' : 'ತಿದ್ದು'}
                      </button>
                      <button onClick={() => deleteCitizen(c.id)} style={{ background: 'none', border: '1px solid var(--emergency)', color: 'var(--emergency)', cursor: 'pointer', fontSize: '0.75rem', padding: '6px 12px', borderRadius: '14px' }}>
                        {lang === 'en' ? 'Delete' : 'ಅಳಿಸು'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '500px', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '24px' }}>{editingId ? 'Edit Citizen' : 'Add New Citizen'}</h3>
            <form onSubmit={handleAddEdit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Family ID</label>
                  <input type="text" required value={formData.familyId} onChange={e => setFormData({...formData, familyId: e.target.value})} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>DOB</label>
                  <input type="date" required value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Age</label>
                  <input type="number" required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Gender</label>
                  <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} style={inputStyle}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Ward</label>
                  <input type="text" required value={formData.ward} onChange={e => setFormData({...formData, ward: e.target.value})} style={inputStyle} />
                </div>
              </div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Phone Number</label>
              <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={inputStyle} />
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.isHead} onChange={e => setFormData({...formData, isHead: e.target.checked})} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Family Head (Authorized to Login)</span>
              </label>

              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '14px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-premium btn-primary" style={{ flex: 1, padding: '14px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                  {editingId ? 'Save Changes' : 'Add Citizen'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
