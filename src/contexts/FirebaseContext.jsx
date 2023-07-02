import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { auth, googleProvider, db, storage } from '../firebase-config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { v4 } from 'uuid';

export const FirebaseContext = createContext({});

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const signUp = async (displayName, email, password, file) => {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const storageRef = ref(storage, `/images/${displayName + v4()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadUrl) => {
                        await updateProfile(response.user, {
                            displayName,
                            photoURL: downloadUrl,
                        });

                        await setDoc(doc(db, 'users', response.user.uid), {
                            uid: response.user.uid,
                            displayName,
                            email,
                            photoURL: downloadUrl,
                        });

                        await setDoc(
                            doc(db, 'userChats', response.user.uid),
                            {}
                        );
                    }
                );
            }
        );
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
