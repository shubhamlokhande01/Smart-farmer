import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import translations, { SupportedLanguage, TranslationKeys } from "@/lib/translations";
import { updateUserLanguage } from "@/lib/firestore";

const STORAGE_KEY = "agriwise_language";

interface LanguageContextType {
    language: SupportedLanguage;
    setLanguage: (lang: SupportedLanguage, uid?: string) => void;
    setLanguageFromFirestore: (lang: string) => void;
    t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<SupportedLanguage>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return (stored as SupportedLanguage) ?? "en";
    });

    /** Called when user manually picks a language */
    const setLanguage = useCallback((lang: SupportedLanguage, uid?: string) => {
        setLanguageState(lang);
        localStorage.setItem(STORAGE_KEY, lang);
        if (uid) {
            // Fire-and-forget – save to Firestore for logged-in users
            updateUserLanguage(uid, lang).catch(console.error);
        }
    }, []);

    /** Called by AuthContext after login to load Firestore preference */
    const setLanguageFromFirestore = useCallback((lang: string) => {
        const valid = lang as SupportedLanguage;
        setLanguageState(valid);
        localStorage.setItem(STORAGE_KEY, valid);
    }, []);

    const t = useCallback(
        (key: keyof TranslationKeys): string => {
            return translations[language][key] ?? translations["en"][key] ?? key;
        },
        [language]
    );

    return (
        <LanguageContext.Provider value={{ language, setLanguage, setLanguageFromFirestore, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
    return ctx;
}
