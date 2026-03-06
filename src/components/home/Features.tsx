import {
  SproutIcon,
  WaterIcon,
  SoilIcon,
  AlertIcon,
  GrowthIcon,
  LayersIcon
} from "@/components/icons/FarmingIcons";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: SproutIcon,
      title: t("feat1_title"),
      description: t("feat1_desc"),
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: WaterIcon,
      title: t("feat2_title"),
      description: t("feat2_desc"),
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: SoilIcon,
      title: t("feat3_title"),
      description: t("feat3_desc"),
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: AlertIcon,
      title: t("feat4_title"),
      description: t("feat4_desc"),
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: GrowthIcon,
      title: t("feat5_title"),
      description: t("feat5_desc"),
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: LayersIcon,
      title: t("feat6_title"),
      description: t("feat6_desc"),
      color: "text-foreground",
      bgColor: "bg-muted",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("features_heading")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("features_subheading")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-border/50 bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
