import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { auth, googleProvider, db } from '../firebase-config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { v4 } from 'uuid';

export const FirebaseContext = createContext({});

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const signUp = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', v4()), {
            email,
            followers: [],
            following: [],
        });
    };

    const signIn = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

    const logOut = () => signOut(auth);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <FirebaseContext.Provider
            value={{
                user,
                signUp,
                signIn,
                signInWithGoogle,
                logOut,
            }}
        >
            {!isLoading && children ? children : <Outlet />}
        </FirebaseContext.Provider>
    );
};

export const useFirebaseContext = () => {
    const state = useContext(FirebaseContext);
    return state;
};
