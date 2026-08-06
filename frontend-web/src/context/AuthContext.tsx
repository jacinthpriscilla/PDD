import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../../../shared/src';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  specialization?: string;
  age?: number;
  gender?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  updateUser: (updatedData: Partial<User>) => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('periorisk_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('periorisk_token') || null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUser(userData);
            localStorage.setItem('periorisk_user', JSON.stringify(userData));
          }
        } catch (e) {
          console.warn('Firestore offline/fallback mode active.');
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('periorisk_token', newToken);
    localStorage.setItem('periorisk_user', JSON.stringify(newUser));

    // Async sync to Firestore
    try {
      const userRef = doc(db, 'users', newUser.id);
      setDoc(userRef, newUser, { merge: true }).catch(() => {});
    } catch (e) {}
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {}
    setToken(null);
    setUser(null);
    localStorage.removeItem('periorisk_token');
    localStorage.removeItem('periorisk_user');
  };

  const updateUser = (updatedData: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const nextUser = { ...prev, ...updatedData };
      localStorage.setItem('periorisk_user', JSON.stringify(nextUser));
      try {
        const userRef = doc(db, 'users', nextUser.id);
        setDoc(userRef, nextUser, { merge: true }).catch(() => {});
      } catch (e) {}
      return nextUser;
    });
  };

  const switchRole = (role: UserRole) => {
    const uid = `${role}_${Date.now()}`;
    const newUser: User = {
      id: uid,
      email: `${role}@periorisk.com`,
      name: role === 'doctor' ? 'Dr. Marcus Vance' : role === 'admin' ? 'System Administrator' : 'Sarah Jenkins',
      role,
      createdAt: new Date().toISOString()
    };
    login('token_' + Date.now(), newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
