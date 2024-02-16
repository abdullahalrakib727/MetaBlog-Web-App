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
import toast from "react-hot-toast";

type AuthProviderProps = {
  children: React.ReactNode;
};

export interface AuthInfo {
  registerUser: (email: string, password: string) => void;
  updateUserProfile: (name: string, photo: string) => void;
  user: User | null;
  signInUser: (email: string, password: string) => Promise<boolean>;
  logOutUser: () => void;
  loading: boolean;
  handleGoogleSignIn: () => void;
  sendVerificationEmail: () => void;
}

const defaultAuthInfo: AuthInfo = {
  registerUser: () => {},
  updateUserProfile: () => {},
  user: null,
  signInUser: () => Promise.resolve(false),
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

  //! Register user
  const registerUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      toast.success("Signup successful!");
      return userCredential;
    } catch (error) {
      setLoading(true);
      toast.error("Please try again !!!");
      console.error(error);
    }
  };

  // ! Update user profile
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

  // ! Sign in user
  const signInUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(true);
      console.error(error);
      toast.error("Invalid credentials !!!");
      return false;
    }
  };

  const provider = new GoogleAuthProvider();

  // ! Google Sign in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success("Login Successful!");
      return setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // ! Auth state change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false); 
    });
    return () => {
      unSubscribe();
    };
  }, []);
  // ! Logout user
  const logOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);

      return setLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  // ! Send verification email
  const sendVerificationEmail = async () => {
    try {
      if (auth.currentUser) {
        const verification = await sendEmailVerification(auth.currentUser);
        toast.success("Verification email sent");
        return verification;
      }
    } catch (error) {
      toast.error("Too many requests, please try again later");
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
