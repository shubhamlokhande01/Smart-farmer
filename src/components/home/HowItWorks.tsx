import { LocationIcon, SoilIcon, CropIcon, GrowthIcon } from "@/components/icons/FarmingIcons";
import { useLanguage } from "@/contexts/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      icon: LocationIcon,
      title: t("step1_title"),
      description: t("step1_desc"),
    },
    {
      number: "02",
      icon: SoilIcon,
      title: t("step2_title"),
      description: t("step2_desc"),
    },
    {
      number: "03",
      icon: CropIcon,
      title: t("step3_title"),
      description: t("step3_desc"),
    },
    {
      number: "04",
      icon: GrowthIcon,
      title: t("step4_title"),
      description: t("step4_desc"),
    },
  ];

  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("how_heading")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("how_subheading")}
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step Number Circle */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute inset-0 hero-gradient rounded-full opacity-20 blur-xl" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full hero-gradient shadow-lg">
                    <step.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-card border-2 border-primary text-xs font-bold text-primary">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
