import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { User } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { User as UserInterface } from '../../interfaces/user';
import { getUser } from '@/app/services/firebaseService';

type AuthContextType = {
  firebaseUser: User | null;
  userData: UserInterface | null;
  loading: boolean;
  setUserData: (userData: UserInterface | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setFirebaseUser(user);
        
        const userAuth = await getUser(user.uid);

        if (userAuth) {
          setUserData(userAuth);
        } else {
          setUserData(null);
        }
      } else {
        setFirebaseUser(null);
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    firebaseUser,
    userData,
    loading,
    setUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};