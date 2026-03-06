import { Button } from "@/components/ui/button";
import { LeafIcon, WaterIcon, SunIcon, GrowthIcon } from "@/components/icons/FarmingIcons";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-farm.jpg";

import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  const featurePills = [
    { icon: GrowthIcon, label: t("hero_pill_growth") },
    { icon: WaterIcon, label: t("hero_pill_irrigation") },
    { icon: LeafIcon, label: t("hero_pill_fertilizer") },
    { icon: SunIcon, label: t("hero_pill_weather") },
  ];

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />

        {/* Floating Elements */}
        <div className="absolute top-20 right-[15%] animate-float opacity-30 hidden lg:block">
          <LeafIcon className="h-16 w-16 text-primary" />
        </div>
        <div className="absolute bottom-32 right-[25%] animate-float opacity-25 hidden lg:block" style={{ animationDelay: '2s' }}>
          <WaterIcon className="h-12 w-12 text-accent" />
        </div>
        <div className="flex justify-center items-center">
          <div className="container relative z-10">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm text-primary mb-8 animate-fade-in border border-primary/20">
                <LeafIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{t("hero_badge")}</span>
              </div>

              {/* Heading */}
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {t("hero_heading1")}{" "}
                <span className="text-transparent bg-clip-text hero-gradient">
                  {t("hero_heading2")}
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {t("hero_subheading")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Link to="/add-farm">
                  <Button variant="hero" size="xl">
                    <LeafIcon className="h-5 w-5" />
                    {t("hero_cta_primary")}
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="xl" className="backdrop-blur-sm">
                    {t("hero_cta_secondary")}
                  </Button>
                </Link>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-start gap-3 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {featurePills.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-sm"
                  >
                    <feature.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
