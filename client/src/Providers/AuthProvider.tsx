import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { FC, createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import toast from "react-hot-toast";
import useAxiosPublic from "../api/useAxiosPublic";

type AuthProviderProps = {
  children: React.ReactNode;
};

export interface AuthInfo {
  registerUser: (email: string, password: string) => Promise<boolean>;
  updateUserProfile: (name: string, photo: string) => void;
  user: User | null;
  signInUser: (email: string, password: string) => Promise<boolean>;
  logOutUser: () => void;
  loading: boolean;
  handleGoogleSignIn: () => void;
  sendVerificationEmail: () => void;
  sendResetPasswordEmail: (email: string) => void;
}

const defaultAuthInfo: AuthInfo = {
  registerUser: () => Promise.resolve(false),
  updateUserProfile: () => {},
  user: null,
  signInUser: () => Promise.resolve(false),
  logOutUser: () => {},
  loading: true,
  handleGoogleSignIn: () => {},
  sendVerificationEmail: () => {},
  sendResetPasswordEmail: () => {},
};

export const AuthContext = createContext<AuthInfo>(defaultAuthInfo);

const auth = getAuth(app);

const AuthProvider: FC<AuthProviderProps> = ({ children }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const axiosPublic = useAxiosPublic();

  //! Register user
  const registerUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("Signup successful!");
      return true;
    } catch (error) {
      setLoading(true);
      if (
        (error as Error).message ===
        "Firebase: Error (auth/email-already-in-use)."
      ) {
        toast.error("Email already in use");
        return false;
      } else {
        toast.error("Something went Wrong.Please try again !!!");
        console.error(error);
        return false;
      }
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
      const result = await signInWithEmailAndPassword(auth, email, password);
      const loggedUser = result.user;

      const userId = loggedUser?.uid;

      //? sending user data to server for cookie
      await axiosPublic.post(
        "/jwt",
        { userId },
        {
          withCredentials: true,
        }
      );

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
      const result = await signInWithPopup(auth, provider);
      const userId = result.user?.uid;

      // Send user data to server for cookie

      await axiosPublic.post(
        "/jwt",
        { userId },
        {
          withCredentials: true,
        }
      );

      toast.success("Login Successful!");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // ! Auth state change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await axiosPublic.post("/users", {
          uid: currentUser.uid,
          email: currentUser.email,
          photo: currentUser.photoURL,
          name: currentUser.displayName,
          role: "user",
        });

        setLoading(false);
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

      await axiosPublic.post("/logout");
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

  // ! Send reset Password mail

  const sendResetPasswordEmail = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("We have sent you a reset password mail!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Too many requests, please try again later");
        console.error(error);
      }
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
    sendResetPasswordEmail,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
