'use client'

import { auth } from "/firebase.config";
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, _user => {
      setUser(_user);
      setAuthLoaded(true);
    });

    return () => unsub();
  }, []);

  const register = async (values) => {
    const toastId = toast.loading('Creating account...');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);

      if (!userCredential.user) {
        throw new Error('Failed to create account. Please try again.');
      }

      await updateProfile(userCredential.user, {
        displayName: `${values.firstName} ${values.lastName}`
      });

      toast.success('Account created successfully', { id: toastId });
      return userCredential.user.uid;
    } catch (err) {
      console.error(err.message);
      const message = err.code.split('/')[1].replace(/-/g, ' ');
      toast.error(message || err.message, { id: toastId });
    }
  };

  const login = async (values) => {
    const toastId = toast.loading('Signing in...');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);

      if (!userCredential.user) {
        throw new Error('Failed to sign in. Please try again.');
      }

      toast.success('Logged in successfully', { id: toastId });
    } catch (err) {
      console.error(err.message);
      const message = err.code.split('/')[1].replace(/-/g, ' ');
      toast.error(message || err.message, { id: toastId });
    }
  };

  const value = {
    user,
    authLoaded,
    register,
    login
  };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside of an AuthContextProvider');
  return context;
};
