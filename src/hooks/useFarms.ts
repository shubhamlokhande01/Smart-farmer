import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { subscribeFarms } from "@/lib/firestore";
import type { Farm } from "@/types/farming";

interface UseFarmsResult {
    farms: Farm[];
    loading: boolean;
    error: string | null;
}

export function useFarms(): UseFarmsResult {
    const { currentUser } = useAuth();
    const [farms, setFarms] = useState<Farm[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!currentUser) {
            setFarms([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const unsubscribe = subscribeFarms(currentUser.uid, (data) => {
            setFarms(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    return { farms, loading, error };
}
