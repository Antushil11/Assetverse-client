import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
const googlePrevider = new GoogleAuthProvider()



const AuthProvider = ({ children }) => {

    const[user, setUser] = useState(null);
    const [loading,setLoading] = useState(true)





  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () =>{
    setLoading(true);
    return signInWithPopup(auth, googlePrevider)
  }

  const logOut =() =>{
    setLoading(true);
    return signOut(auth)
  }



  //observer user state

  useEffect(() =>{
    const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
        setLoading(false);
    })
    return ()=>{
        unSubscribe()
    }

  }, [])

  const authInfo = {
    registerUser,
    signInUser,
    signInGoogle,
    user,
    loading,
    logOut
  };

  return (
    <AuthContext value={authInfo}>
    {children}
  </AuthContext>
  );
};

export default AuthProvider;
