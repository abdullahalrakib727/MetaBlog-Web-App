import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
export const  AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

const registerUser = (email,password)=>{
    setLoading(true)
   return createUserWithEmailAndPassword(auth,email,password)
}

const updateUserProfile = (name,photo)=>{
updateProfile(auth.currentUser,{
    displayName : name,
    photoURL : photo
})
}


// sign in user
const signInUser = (email,password)=>{
    setLoading(true);
   return signInWithEmailAndPassword(auth, email, password)
}









 //  current user 
 useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
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



    const authInfo = {
        registerUser,
        updateUserProfile,
        user,signInUser,
        logOutUser,
        loading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;