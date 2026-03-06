import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Button } from "@/components/ui/button";
import { LeafIcon } from "@/components/icons/FarmingIcons";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />

        {/* CTA Section */}
        <section className="py-24 hero-gradient">
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t("cta_heading")}
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
              {t("cta_subheading")}
            </p>
            <Link to="/add-farm">
              <Button size="xl" className="bg-background text-primary hover:bg-background/90 shadow-xl">
                <LeafIcon className="h-5 w-5" />
                {t("cta_button")}
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg hero-gradient">
                  <LeafIcon className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-foreground">AgriWise</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("footer_tagline")}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
