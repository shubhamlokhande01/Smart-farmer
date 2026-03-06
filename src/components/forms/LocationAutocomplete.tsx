import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Loader2, ChevronDown, X } from "lucide-react";

const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;

interface GeoResult {
    name: string;
    state?: string;
    country: string;
    lat: number;
    lon: number;
}

interface LocationAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

function buildLabel(r: GeoResult): string {
    const parts = [r.name];
    if (r.state && r.state !== r.name) parts.push(r.state);
    parts.push(r.country);
    return parts.join(", ");
}

export function LocationAutocomplete({ value, onChange, placeholder, disabled }: LocationAutocompleteProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<GeoResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
                // If user typed but didn't select, revert query to empty (force selection)
                if (!value) setQuery("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [value]);

    const search = useCallback((q: string) => {
        if (!q || q.length < 2) { setResults([]); setOpen(false); return; }
        if (!WEATHER_KEY || WEATHER_KEY === "your_openweathermap_api_key_here") return;

        setLoading(true);
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=6&appid=${WEATHER_KEY}`)
            .then(r => r.json())
            .then((data: GeoResult[]) => {
                setResults(Array.isArray(data) ? data : []);
                setOpen(Array.isArray(data) && data.length > 0);
            })
            .catch(() => setResults([]))
            .finally(() => setLoading(false));
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value;
        setQuery(q);
        // Clear the committed value when user starts typing again
        if (value) onChange("");

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => search(q), 350);
    };

    const handleSelect = (result: GeoResult) => {
        const label = buildLabel(result);
        setQuery(label);
        onChange(label);
        setOpen(false);
        setResults([]);
    };

    const handleClear = () => {
        setQuery("");
        onChange("");
        setResults([]);
        setOpen(false);
        inputRef.current?.focus();
    };

    const isSelected = !!value;

    return (
        <div ref={containerRef} className="relative">
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <MapPin className="h-4 w-4" />
                </div>
                <input
                    ref={inputRef}
                    value={query}
                    onChange={handleInput}
                    placeholder={placeholder ?? "Type to search your location…"}
                    disabled={disabled}
                    autoComplete="off"
                    className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background 
                        file:border-0 file:bg-transparent file:text-sm file:font-medium 
                        placeholder:text-muted-foreground 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                        disabled:cursor-not-allowed disabled:opacity-50
                        pl-9 pr-9
                        ${isSelected ? "border-primary/60 bg-primary/5" : "border-input"}
                    `}
                />
                {/* Right side icon: spinner / clear / chevron */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isSelected ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="hover:text-destructive transition-colors"
                            tabIndex={-1}
                            aria-label="Clear location"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    ) : (
                        <ChevronDown className="h-4 w-4 pointer-events-none" />
                    )}
                </div>
            </div>

            {/* Selection confirmation badge */}
            {isSelected && (
                <p className="mt-1 text-xs text-primary flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {value}
                </p>
            )}

            {/* Dropdown */}
            {open && results.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full rounded-md border border-border bg-card shadow-lg overflow-hidden">
                    {results.map((r, i) => (
                        <li
                            key={i}
                            onMouseDown={(e) => { e.preventDefault(); handleSelect(r); }}
                            className="flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-muted cursor-pointer transition-colors"
                        >
                            <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                            <div>
                                <span className="font-medium">{r.name}</span>
                                {r.state && r.state !== r.name && (
                                    <span className="text-muted-foreground">, {r.state}</span>
                                )}
                                <span className="text-muted-foreground">, {r.country}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* No results message */}
            {open && !loading && results.length === 0 && query.length >= 2 && (
                <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-card shadow-lg px-4 py-3 text-sm text-muted-foreground">
                    No locations found for "{query}". Try a city name.
                </div>
            )}
        </div>
    );
}
