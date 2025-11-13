import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧩 Register user
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile (name + photo)
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || "https://i.ibb.co/0fJqL5r/default.png",
      });

      // Force refresh user info after update
      const updatedUser = { ...result.user, displayName: name };
      setUser(updatedUser);

      return result;
    } catch (error) {
      console.error("❌ Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Login with Email
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🧩 Google Login
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 🧩 Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // 🧩 Observe User State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    logout,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
