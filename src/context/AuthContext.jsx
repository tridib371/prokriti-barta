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
    // Simulated authentication login
    const newUser = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0] || 'সাব্বির রহমান',
      email: email,
      phone: '+880 1717-279166',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isLoggedIn: true,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    return newUser;
  };

  const register = (name, email, phone, password) => {
    // Simulated registration
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name || 'নতুন গ্রাহক',
      email: email,
      phone: phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      isLoggedIn: true,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    return newUser;
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
