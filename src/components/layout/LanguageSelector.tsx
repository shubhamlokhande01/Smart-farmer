import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { LANGUAGE_OPTIONS, SupportedLanguage } from "@/lib/translations";

export function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const { currentUser } = useAuth();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const current = LANGUAGE_OPTIONS.find((l) => l.code === language)!;

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleSelect = (code: SupportedLanguage) => {
        // Pass uid so context can save to Firestore if user is logged in
        setLanguage(code, currentUser?.uid);
        setOpen(false);
    };

    return (
        <div ref={ref} className="relative" id="language-selector">
            {/* Trigger button */}
            <button
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="
          flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
          border border-border/60 bg-background/80 text-foreground
          hover:bg-muted hover:border-primary/40
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/40
        "
            >
                <Globe className="h-4 w-4 text-primary shrink-0" />
                <span className="max-w-[70px] truncate">{current.label}</span>
                <ChevronDown
                    className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    role="listbox"
                    className="
            absolute right-0 top-[calc(100%+6px)] z-50
            min-w-[160px] rounded-xl border border-border/60
            bg-background/95 backdrop-blur-md shadow-xl
            py-1.5 animate-fade-in
          "
                >
                    {LANGUAGE_OPTIONS.map((opt) => (
                        <button
                            key={opt.code}
                            role="option"
                            aria-selected={language === opt.code}
                            onClick={() => handleSelect(opt.code)}
                            className={`
                w-full flex items-center justify-between px-4 py-2 text-sm
                hover:bg-primary/10 transition-colors duration-150
                ${language === opt.code
                                    ? "text-primary font-semibold bg-primary/5"
                                    : "text-foreground"
                                }
              `}
                        >
                            <span>{opt.label}</span>
                            <span className="text-xs text-muted-foreground ml-2">{opt.englishLabel}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
