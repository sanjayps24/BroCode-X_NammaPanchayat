"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'citizen' or 'admin'
  const router = useRouter();

  useEffect(() => {
    const savedAuth = localStorage.getItem('namma-panchayat-auth');
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      setUser(parsed.user);
      setRole(parsed.role);
    }
  }, []);

  const loginAsCitizen = (phone) => {
    // Simulated OTP success
    const userData = { phone, name: "Basavaraj" };
    setUser(userData);
    setRole('citizen');
    localStorage.setItem('namma-panchayat-auth', JSON.stringify({ user: userData, role: 'citizen' }));
    router.push('/dashboard');
  };

  const loginAsAdmin = (email, password) => {
    if (email === 'admin@panchayat.gov.in' && password === 'admin123') {
      const userData = { email, name: "PDO Shivanna" };
      setUser(userData);
      setRole('admin');
      localStorage.setItem('namma-panchayat-auth', JSON.stringify({ user: userData, role: 'admin' }));
      router.push('/admin');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem('namma-panchayat-auth');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, role, loginAsCitizen, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
