import { LeafIcon } from "@/components/icons/FarmingIcons";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { LogOut, User } from "lucide-react";

export function Header() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/", label: t("nav_home") },
    { href: "/dashboard", label: t("nav_dashboard") },
    { href: "/add-farm", label: t("nav_addFarm") },
  ];

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  // Get initials from displayName or email
  const getInitials = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return currentUser?.email?.[0]?.toUpperCase() ?? "U";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl hero-gradient shadow-md group-hover:shadow-lg transition-shadow">
            <LeafIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            CODER शेतकरी
          </span>
        </Link>

        {/* Nav links + Language selector side by side */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              <Button
                variant={location.pathname === link.href ? "default" : "ghost"}
                size="sm"
              >
                {link.label}
              </Button>
            </Link>
          ))}

          {/* Language selector right after nav links */}
          <div className="ml-2">
            <LanguageSelector />
          </div>
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile language selector */}
          <div className="md:hidden">
            <LanguageSelector />
          </div>

          {currentUser ? (
            <>
              {/* User avatar */}
              <div className="flex items-center gap-2">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover border-2 border-primary/30"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full hero-gradient text-primary-foreground text-xs font-bold">
                    {getInitials()}
                  </div>
                )}
                <span className="hidden sm:block text-sm text-foreground font-medium max-w-[120px] truncate">
                  {currentUser.displayName ?? currentUser.email?.split("@")[0]}
                </span>
              </div>

              {/* Sign out */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-destructive gap-1.5"
                id="signout-btn"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:block">{t("nav_signOut")}</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" id="signin-link">
                  <User className="h-4 w-4 mr-1.5" />
                  {t("nav_signIn")}
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero" size="sm">
                  {t("nav_getStarted")}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
