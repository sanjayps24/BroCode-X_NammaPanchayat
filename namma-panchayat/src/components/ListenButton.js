"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function ListenButton({ text }) {
  const { lang } = useLanguage();

  const speak = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button 
      onClick={speak}
      className="listen-btn-pulse"
      title="Listen"
      aria-label="Listen to this text"
      style={{ marginLeft: '8px', flexShrink: 0 }}
    >
      <span style={{ fontSize: '0.9rem' }}>🔊</span>
    </button>
  );
}
