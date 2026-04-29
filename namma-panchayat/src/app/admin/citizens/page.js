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
  const [expandedId, setExpandedId] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', familyId: '', dob: '', age: '', gender: 'Male', phone: '', ward: '1', isHead: true,
    familyMembers: []
  });

  const [newMember, setNewMember] = useState({ name: '', relationship: 'Wife', age: '', gender: 'Female' });

  const filtered = citizens.filter(c => {
    // Only show heads in the main list
    if (!c.isHead) return false;
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
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setFormData({ name: '', familyId: '', dob: '', age: '', gender: 'Male', phone: '', ward: '1', isHead: true, familyMembers: [] });
    setEditingId(null);
  };

  const startEdit = (citizen) => {
    setFormData({ ...citizen, familyMembers: citizen.familyMembers || [] });
    setEditingId(citizen.id);
    setShowModal(true);
  };

  const addMember = () => {
    if (!newMember.name || !newMember.age) return;
    setFormData({ ...formData, familyMembers: [...(formData.familyMembers || []), newMember] });
    setNewMember({ name: '', relationship: 'Wife', age: '', gender: 'Female' });
  };

  const removeMember = (index) => {
    const updated = formData.familyMembers.filter((_, i) => i !== index);
    setFormData({ ...formData, familyMembers: updated });
  };

  const card = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', backdropFilter: 'blur(8px)', padding: '28px' };
  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-main)', marginBottom: '8px', fontSize: '0.85rem' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>{lang === 'en' ? 'Family Records' : 'ಕುಟುಂಬ ದಾಖಲೆಗಳು'}</h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {lang === 'en' ? 'Manage family heads and their registered members.' : 'ಕುಟುಂಬದ ಮುಖ್ಯಸ್ಥರು ಮತ್ತು ಅವರ ಸದಸ್ಯರನ್ನು ನಿರ್ವಹಿಸಿ.'}
          </p>
        </div>
        <button onClick={() => { resetForm(); setShowModal(true); }} 
          className="btn-premium btn-primary" style={{ borderRadius: '50px', padding: '12px 24px' }}>
          + {lang === 'en' ? 'Register Family' : 'ಕುಟುಂಬ ನೋಂದಾಯಿಸಿ'}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {[
          { label: lang === 'en' ? 'Total Families' : 'ಒಟ್ಟು ಕುಟುಂಬಗಳು', value: citizens.filter(c => c.isHead).length, icon: '🏠', color: '#1976d2' },
          { label: lang === 'en' ? 'Total Members' : 'ಒಟ್ಟು ಸದಸ್ಯರು', value: citizens.reduce((acc, c) => acc + (c.familyMembers?.length || 0) + 1, 0), icon: '👥', color: '#7b1fa2' },
          { label: lang === 'en' ? 'Average Size' : 'ಸರಾಸರಿ ಗಾತ್ರ', value: (citizens.reduce((acc, c) => acc + (c.familyMembers?.length || 0) + 1, 0) / citizens.length).toFixed(1), icon: '📊', color: '#388e3c' },
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
        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'en' ? 'Search head name or Family ID...' : 'ಯಜಮಾನನ ಹೆಸರು ಅಥವಾ ಕುಟುಂಬ ID ಹುಡುಕಿ...'}
            style={{ width: '100%', padding: '12px 16px 12px 46px', borderRadius: '50px', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)', outline: 'none' }} />
        </div>
        {['All', 'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'].map(w => (
          <button key={w} onClick={() => setWardFilter(w)} style={{
            padding: '10px 18px', borderRadius: '50px', cursor: 'pointer',
            border: `1px solid ${wardFilter === w ? 'var(--primary)' : 'var(--border-color)'}`,
            background: wardFilter === w ? 'var(--primary)' : 'var(--bg-card)',
            color: wardFilter === w ? 'white' : 'var(--text-muted)',
            fontWeight: 600, fontSize: '0.82rem'
          }}>{w}</button>
        ))}
      </div>

      {/* Main Table */}
      <div style={card}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ padding: '14px', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{lang === 'en' ? 'FAMILY ID' : 'ಕುಟುಂಬ ID'}</th>
              <th style={{ padding: '14px', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{lang === 'en' ? 'FAMILY HEAD' : 'ಕುಟುಂಬದ ಯಜಮಾನ'}</th>
              <th style={{ padding: '14px', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{lang === 'en' ? 'MEMBERS' : 'ಸದಸ್ಯರು'}</th>
              <th style={{ padding: '14px', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{lang === 'en' ? 'PHONE' : 'ಫೋನ್'}</th>
              <th style={{ padding: '14px', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{lang === 'en' ? 'ACTIONS' : 'ಕ್ರಮಗಳು'}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <React.Fragment key={c.id}>
                <tr onClick={() => setExpandedId(expandedId === c.id ? null : c.id)} 
                  style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '16px', fontWeight: 800, color: 'var(--primary)' }}>{c.familyId}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>{c.name[0]}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Ward {c.ward}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800 }}>
                      {c.familyMembers?.length || 0} + 1
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.85rem' }}>{c.phone}</td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={(e) => { e.stopPropagation(); startEdit(c); }} style={{ padding: '6px 12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'white', color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Edit</button>
                      <button onClick={(e) => { e.stopPropagation(); deleteCitizen(c.id); }} style={{ padding: '6px 12px', borderRadius: '12px', border: '1px solid var(--emergency)', background: 'white', color: 'var(--emergency)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
                {expandedId === c.id && (
                  <tr>
                    <td colSpan="5" style={{ padding: '0 16px 20px' }}>
                      <div style={{ background: 'var(--bg-app)', borderRadius: '16px', padding: '20px', border: '1px solid var(--border-color)', animation: 'fadeInDown 0.3s' }}>
                        <h4 style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>👨‍👩‍👧‍👦 {lang === 'en' ? 'Family Members' : 'ಕುಟುಂಬದ ಸದಸ್ಯರು'}</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                          <div style={{ background: 'white', padding: '12px', borderRadius: '12px', border: '2px solid var(--primary)' }}>
                            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary)' }}>{lang === 'en' ? 'HEAD' : 'ಯಜಮಾನ'}</div>
                            <div style={{ fontWeight: 700 }}>{c.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.age} yrs · {c.gender}</div>
                          </div>
                          {c.familyMembers?.map((m, idx) => (
                            <div key={idx} style={{ background: 'white', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)' }}>{m.relationship.toUpperCase()}</div>
                              <div style={{ fontWeight: 700 }}>{m.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.age} yrs · {m.gender}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 24px' }}>{editingId ? 'Edit Family Record' : 'Register New Family'}</h3>
            <form onSubmit={handleAddEdit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <section>
                  <h4 style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>👑 {lang === 'en' ? 'Family Head Info' : 'ಯಜಮಾನನ ಮಾಹಿತಿ'}</h4>
                  <input placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} />
                  <input placeholder="Family ID (e.g. FAM-101)" required value={formData.familyId} onChange={e => setFormData({...formData, familyId: e.target.value})} style={inputStyle} />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input placeholder="Age" type="number" required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} style={inputStyle} />
                    <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} style={inputStyle}>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <input placeholder="Phone Number" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={inputStyle} />
                  <input placeholder="Ward Number" required value={formData.ward} onChange={e => setFormData({...formData, ward: e.target.value})} style={inputStyle} />
                </section>

                <section style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '0.9rem' }}>👥 {lang === 'en' ? 'Manage Members' : 'ಸದಸ್ಯರನ್ನು ಸೇರಿಸಿ'}</h4>
                  <div style={{ background: 'var(--bg-app)', padding: '12px', borderRadius: '12px', marginBottom: '12px' }}>
                    <input placeholder="Member Name" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} style={inputStyle} />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <select value={newMember.relationship} onChange={e => setNewMember({...newMember, relationship: e.target.value})} style={inputStyle}>
                        <option>Wife</option><option>Husband</option><option>Son</option><option>Daughter</option><option>Mother</option><option>Father</option><option>Brother</option><option>Sister</option>
                      </select>
                      <input placeholder="Age" type="number" value={newMember.age} onChange={e => setNewMember({...newMember, age: e.target.value})} style={inputStyle} />
                    </div>
                    <button type="button" onClick={addMember} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--primary)', color: 'var(--primary)', background: 'white', fontWeight: 700, cursor: 'pointer' }}>+ Add to Family</button>
                  </div>
                  
                  <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                    {formData.familyMembers.map((m, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
                        <span>{m.name} ({m.relationship})</span>
                        <button type="button" onClick={() => removeMember(i)} style={{ color: 'var(--emergency)', border: 'none', background: 'none', cursor: 'pointer' }}>✕</button>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '14px', borderRadius: '14px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-premium btn-primary" style={{ flex: 1, padding: '14px', borderRadius: '14px', border: 'none', cursor: 'pointer' }}>{editingId ? 'Save Family Changes' : 'Register Family'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
