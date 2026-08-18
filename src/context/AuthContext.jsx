import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pb_auth');
        return saved ? JSON.parse(saved) : null;
      } catch (e) {
        console.error('Failed to parse auth user from localStorage:', e);
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('pb_auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('pb_auth');
    }
  }, [user]);

  const login = (email, password) => {
    // Authenticated user session
    const newUser = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0] || '',
      email: email,
      phone: '',
      address: '',
      city: '',
      isLoggedIn: true,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    return newUser;
  };

  const register = (name, email, phone, password) => {
    // User registration session
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: '',
      city: '',
      isLoggedIn: true,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    return newUser;
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        updateUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
