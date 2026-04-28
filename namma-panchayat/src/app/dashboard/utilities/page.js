"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { mockBills } from '@/lib/mockData';
import ListenButton from '@/components/ListenButton';
import Link from 'next/link';

export default function UtilitiesPage() {
  const { lang } = useLanguage();
  const [paying, setPaying] = useState(null);
  const [paid, setPaid] = useState([]);

  const handlePay = (bill) => {
    setPaying(bill.id);
    setTimeout(() => {
      setPaying(null);
      setPaid(p => [...p, bill.id]);
    }, 2000);
  };

  const billIcons = { 1: '⚡', 2: '🚰' };
  const billColors = { 1: { color: '#f57c00', bg: 'rgba(245,124,0,0.08)', stripe: '#f57c00' }, 2: { color: '#1976d2', bg: 'rgba(25,118,210,0.08)', stripe: '#1976d2' } };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <header>
        <Link href="/dashboard" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>← {lang === 'en' ? 'Dashboard' : 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್'}</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(251,192,45,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>⚡</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>{lang === 'en' ? 'Bill Pay' : 'ಬಿಲ್ ಪಾವತಿ'}</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>{lang === 'en' ? 'Electricity & Water bills' : 'ವಿದ್ಯುತ್ ಮತ್ತು ನೀರಿನ ಬಿಲ್‌ಗಳು'}</p>
          </div>
          <ListenButton text={lang === 'en' ? 'Bill Pay page. Pay your bills here.' : 'ಬಿಲ್ ಪಾವತಿ ಪುಟ. ನಿಮ್ಮ ಬಿಲ್‌ಗಳನ್ನು ಇಲ್ಲಿ ಪಾವತಿಸಿ.'} />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {mockBills.map(bill => {
          const bc = billColors[bill.id];
          const isPaid = paid.includes(bill.id);
          return (
            <div key={bill.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', overflow: 'hidden', backdropFilter: 'blur(8px)', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
              <div style={{ height: '4px', background: bc.stripe }} />
              <div style={{ padding: '28px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: bc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                      {billIcons[bill.id]}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{bill.type[lang]}</h3>
                        <ListenButton text={`${bill.type[lang]}. Amount due ${bill.amount} rupees.`} />
                      </div>
                      <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {lang === 'en' ? 'Account No:' : 'ಖಾತೆ ಸಂ:'} KEB-9823-4410
                      </p>
                    </div>
                  </div>
                  {isPaid && (
                    <span style={{ background: 'rgba(56,142,60,0.12)', color: '#388e3c', padding: '6px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '0.82rem' }}>
                      ✓ {lang === 'en' ? 'PAID' : 'ಪಾವತಿಸಲಾಗಿದೆ'}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      {lang === 'en' ? 'Amount Due' : 'ಪಾವತಿಸಬೇಕಾದ ಮೊತ್ತ'}
                    </p>
                    <div style={{ fontSize: '3.5rem', fontWeight: 900, color: isPaid ? '#388e3c' : bc.color, lineHeight: 1, marginTop: '4px' }}>
                      ₹{bill.amount}
                    </div>
                    <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: isPaid ? '#388e3c' : 'var(--emergency)', fontWeight: 600 }}>
                      {isPaid ? (lang === 'en' ? 'Payment complete' : 'ಪಾವತಿ ಪೂರ್ಣವಾಗಿದೆ') : `${lang === 'en' ? 'Due by' : 'ಕೊನೆ ದಿನಾಂಕ'}: ${bill.dueDate}`}
                    </p>
                  </div>
                  {!isPaid && (
                    <button onClick={() => handlePay(bill)} disabled={paying === bill.id}
                      className="btn-premium btn-primary"
                      style={{ borderRadius: '50px', minWidth: '160px', opacity: paying === bill.id ? 0.7 : 1 }}>
                      {paying === bill.id ? `⏳ ${lang === 'en' ? 'Processing...' : 'ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ...'}` : `💳 ${lang === 'en' ? 'Pay Now' : 'ಈಗ ಪಾವತಿಸಿ'}`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px', backdropFilter: 'blur(8px)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
          {lang === 'en' ? 'PAYMENT HISTORY' : 'ಪಾವತಿ ಇತಿಹಾಸ'}
        </h3>
        <p style={{ margin: 0, color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0', fontSize: '0.9rem' }}>
          {lang === 'en' ? 'No recent transactions.' : 'ಇತ್ತೀಚಿನ ವ್ಯವಹಾರಗಳಿಲ್ಲ.'}
        </p>
      </div>
    </div>
  );
}
