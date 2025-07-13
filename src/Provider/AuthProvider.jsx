import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../Firebase/Firebase.config';
import axios from 'axios';

export const AuthContext = createContext()


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const provider = new GoogleAuthProvider

    const googleLogIn = () => {
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser?.email) {
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
                    email: currentUser?.email
                },
                    {
                        withCredentials: true
                    }
                )
                    .then(res =>
                        localStorage.setItem('token',res.data.token)
                    )
            }
            else{
                localStorage.removeItem('token')
            }
            
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        googleLogIn,
        loading,
        setLoading,
        updateUser,
        resetPassword,
        email,
        setEmail,
    }
    return <AuthContext value={authData}>
         {!loading && children}
    </AuthContext>

};

export default AuthProvider;