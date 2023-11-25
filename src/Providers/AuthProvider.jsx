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
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  //  current user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      const user = {email: currentUser.email}
    if(currentUser){
      // post use to backend
      axios.post('http://localhost:5000/jwt',user,{withCredentials:true}).then(res=>{
        console.log(res.data)
      })
    }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // logout user
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // send verification email to user
  const sendVerificationEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };


  const authInfo = {
    registerUser,
    updateUserProfile,
    user,
    signInUser,
    logOutUser,
    loading,
    handleGoogleSignIn,
    sendVerificationEmail
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
