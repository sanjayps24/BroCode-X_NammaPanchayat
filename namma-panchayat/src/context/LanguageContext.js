"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('kn'); // Default to Kannada

  useEffect(() => {
    const savedLang = localStorage.getItem('namma-panchayat-lang');
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'kn' : 'en';
    setLang(newLang);
    localStorage.setItem('namma-panchayat-lang', newLang);
  };

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[lang];
    for (const key of keys) {
      if (result[key] === undefined) return path;
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
