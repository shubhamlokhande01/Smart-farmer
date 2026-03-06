import React, { createContext, useContext, useEffect, useState } from "react";
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { saveUserProfile, getUserLanguage } from "@/lib/firestore";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { setLanguageFromFirestore } = useLanguage();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setLoading(false);
            if (user) {
                // Ensure a Firestore profile doc exists for every user
                await saveUserProfile(user.uid, user.email, user.displayName);
                // Restore saved language preference
                const lang = await getUserLanguage(user.uid);
                if (lang) setLanguageFromFirestore(lang);
            }
        });
        return unsubscribe;
    }, [setLanguageFromFirestore]);

    const signInWithEmail = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signUpWithEmail = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };

    const logout = async () => {
        await firebaseSignOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{ currentUser, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
