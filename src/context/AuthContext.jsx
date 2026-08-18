import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 1. Current Active User Session
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

  // Sync active user to pb_auth
  useEffect(() => {
    if (user) {
      localStorage.setItem('pb_auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('pb_auth');
    }
  }, [user]);

  // Helper to get all registered users from pb_users_db
  const getRegisteredUsers = () => {
    try {
      const stored = localStorage.getItem('pb_users_db');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse pb_users_db:', e);
      return [];
    }
  };

  // Helper to save registered users database
  const saveRegisteredUsers = (users) => {
    try {
      localStorage.setItem('pb_users_db', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save to pb_users_db:', e);
    }
  };

  // 2. User Registration
  const register = (name, email, phone, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    const users = getRegisteredUsers();
    const existingIndex = users.findIndex(u => u.email.toLowerCase() === trimmedEmail);

    let userRecord;
    if (existingIndex >= 0) {
      // Update existing record
      userRecord = {
        ...users[existingIndex],
        name: trimmedName,
        phone: trimmedPhone,
        password: password,
        isLoggedIn: true
      };
      users[existingIndex] = userRecord;
    } else {
      // Create new user record
      userRecord = {
        id: `usr_${Date.now()}`,
        name: trimmedName,
        email: email.trim(),
        phone: trimmedPhone,
        address: '',
        city: '',
        password: password,
        isLoggedIn: true,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      users.push(userRecord);
    }

    saveRegisteredUsers(users);
    setUser(userRecord);
    return { success: true, user: userRecord };
  };

  // 3. User Login - Strictly validates that account exists and password matches
  const login = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const users = getRegisteredUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === trimmedEmail);

    // If account not found in database
    if (!existingUser) {
      return {
        success: false,
        errorBn: 'এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি। অনুগ্রহ করে সাইন আপ করুন।',
        errorEn: 'No account found with this email. Please register first.'
      };
    }

    // If password does not match
    if (existingUser.password && existingUser.password !== password) {
      return {
        success: false,
        errorBn: 'পাসওয়ার্ড সঠিক নয়। অনুগ্রহ করে সঠিক পাসওয়ার্ড দিয়ে চেষ্টা করুন।',
        errorEn: 'Incorrect password. Please verify and try again.'
      };
    }

    // Restore previously saved real name, phone, address, and joinedDate
    const loggedInUser = {
      ...existingUser,
      isLoggedIn: true
    };

    setUser(loggedInUser);
    return {
      success: true,
      user: loggedInUser
    };
  };

  // 4. Update Profile & Sync into Persistent User Database
  const updateUser = (updatedFields) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...updatedFields };

      // Also sync update into pb_users_db
      try {
        const users = getRegisteredUsers();
        const userIdx = users.findIndex(u => 
          u.email.toLowerCase() === prev.email.toLowerCase() || u.id === prev.id
        );
        if (userIdx >= 0) {
          users[userIdx] = { ...users[userIdx], ...updatedFields };
          saveRegisteredUsers(users);
        }
      } catch (e) {
        console.error('Failed to sync updateUser to pb_users_db:', e);
      }

      return updated;
    });
  };

  // 5. User Logout
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
