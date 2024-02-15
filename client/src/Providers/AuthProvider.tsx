import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { FC, createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

type AuthProviderProps = {
  children: React.ReactNode;
};

interface AuthInfo {
  registerUser: (email: string, password: string) => void;
  updateUserProfile: (name: string, photo: string) => void;
  user: User | null;
  signInUser: (email: string, password: string) => void;
  logOutUser: () => void;
  loading: boolean;
  handleGoogleSignIn: () => void;
  sendVerificationEmail: () => void;
}

const defaultAuthInfo: AuthInfo = {
  registerUser: () => {},
  updateUserProfile: () => {},
  user: null,
  signInUser: () => {},
  logOutUser: () => {},
  loading: true,
  handleGoogleSignIn: () => {},
  sendVerificationEmail: () => {},
};

export const AuthContext = createContext<AuthInfo>(defaultAuthInfo);

const auth = getAuth(app);

const AuthProvider: FC<AuthProviderProps> = ({ children }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      return userCredential;
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const updateUserProfile = async (name: string, photo: string) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signInUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
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
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        console.log(currentUser);
      } else {
        setUser(null);
      }
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
      if (auth.currentUser) {
        const verification = await sendEmailVerification(auth.currentUser);
        return verification;
      }
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
