"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ListenButton from './ListenButton';

export default function Carousel() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const steps = [
    { id: 1, icon: "🎤", translationKey: "onboarding.step1" },
    { id: 2, icon: "🏫", translationKey: "onboarding.step2" },
    { id: 3, icon: "🌾", translationKey: "onboarding.step3" },
    { id: 4, icon: "✅", translationKey: "onboarding.step4" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [steps.length]);

  const step = steps[current];
  const title = t(`${step.translationKey}.title`);
  const desc = t(`${step.translationKey}.desc`);

  return (
    <div style={{
      background: 'white',
      borderRadius: 'var(--radius-lg)',
      padding: '40px',
      boxShadow: 'var(--shadow-lg)',
      maxWidth: '500px',
      margin: '0 auto',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      border: '1px solid var(--color-border)'
    }}>
      <div style={{ fontSize: '5rem', marginBottom: '24px' }}>{step.icon}</div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <ListenButton text={`${title}. ${desc}`} />
      </div>
      
      <p style={{ fontSize: '1.2rem', color: '#666' }}>{desc}</p>
      
      <div style={{ display: 'flex', gap: '8px', marginTop: '32px' }}>
        {steps.map((_, idx) => (
          <div 
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: idx === current ? 'var(--color-primary)' : 'var(--color-border)',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
}
