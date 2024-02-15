import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return userCredential;
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const updateUserProfile = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return userCredential;
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const logOutUser = async () => {
    try {
      setUser(null);
      return await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const sendVerificationEmail = async () => {
    try {
      return await sendEmailVerification(auth.currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  const authInfo = {
    registerUser,
    updateUserProfile,
    user,
    signInUser,
    logOutUser,
    loading,
    handleGoogleSignIn,
    sendVerificationEmail,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;