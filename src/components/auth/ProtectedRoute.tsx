import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LeafIcon } from "@/components/icons/FarmingIcons";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl hero-gradient shadow-lg animate-pulse">
                        <LeafIcon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground text-sm animate-pulse">Loading...</p>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
