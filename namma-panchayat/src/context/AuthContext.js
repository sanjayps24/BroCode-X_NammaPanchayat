"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { mockCitizens } from '@/lib/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); 
  const [citizens, setCitizens] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Load auth
    const savedAuth = localStorage.getItem('namma-panchayat-auth');
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      setUser(parsed.user);
      setRole(parsed.role);
    }

    // Load or Initialize Citizens
    const savedCitizens = localStorage.getItem('np-citizens');
    if (savedCitizens) {
      setCitizens(JSON.parse(savedCitizens));
    } else {
      setCitizens(mockCitizens);
      localStorage.setItem('np-citizens', JSON.stringify(mockCitizens));
    }

    // Load Complaints
    const savedComplaints = localStorage.getItem('np-complaints');
    if (savedComplaints) {
      setComplaints(JSON.parse(savedComplaints));
    }
  }, []);

  const loginAsCitizen = (name, dob) => {
    const found = citizens.find(c => c.name.toLowerCase() === name.toLowerCase() && c.dob === dob);
    
    if (!found) return { success: false, error: "User not found or DOB incorrect" };
    if (!found.isHead) return { success: false, error: "Access denied. Only family heads can login." };

    setUser(found);
    setRole('citizen');
    localStorage.setItem('namma-panchayat-auth', JSON.stringify({ user: found, role: 'citizen' }));
    router.push('/dashboard');
    return { success: true };
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

  // Complaints logic
  const addComplaint = (complaint) => {
    const newComplaint = {
      ...complaint,
      id: `#PAN-${Math.floor(8000 + Math.random() * 2000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    const updated = [newComplaint, ...complaints];
    setComplaints(updated);
    localStorage.setItem('np-complaints', JSON.stringify(updated));
    return newComplaint.id;
  };

  // Admin CRUD for citizens
  const addCitizen = (newCitizen) => {
    const updated = [...citizens, { ...newCitizen, id: `CIT-${Date.now()}` }];
    setCitizens(updated);
    localStorage.setItem('np-citizens', JSON.stringify(updated));
  };

  const deleteCitizen = (id) => {
    const updated = citizens.filter(c => c.id !== id);
    setCitizens(updated);
    localStorage.setItem('np-citizens', JSON.stringify(updated));
  };

  const updateCitizen = (updatedCitizen) => {
    const updated = citizens.map(c => c.id === updatedCitizen.id ? updatedCitizen : c);
    setCitizens(updated);
    localStorage.setItem('np-citizens', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ 
      user, role, citizens, complaints,
      loginAsCitizen, loginAsAdmin, logout,
      addCitizen, deleteCitizen, updateCitizen,
      addComplaint
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
