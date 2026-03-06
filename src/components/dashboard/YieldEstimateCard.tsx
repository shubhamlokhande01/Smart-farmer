import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GrowthIcon } from "@/components/icons/FarmingIcons";
import { useLanguage } from "@/contexts/LanguageContext";

interface YieldEstimateCardProps {
  cropName: string;
  min: number;
  max: number;
  unit: string;
  farmSize: number;
  sizeUnit: string;
}

export function YieldEstimateCard({ cropName, min, max, unit, farmSize, sizeUnit }: YieldEstimateCardProps) {
  const { t } = useLanguage();
  const totalMin = min * farmSize;
  const totalMax = max * farmSize;

  return (
    <Card className="overflow-hidden">
      <div className="h-1.5 hero-gradient" />
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
            <GrowthIcon className="h-4 w-4 text-primary" />
          </div>
          <span className="font-display">{t("yield_title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-sm text-muted-foreground mb-1">{cropName}</p>
            <p className="text-3xl font-bold text-foreground">
              {totalMin.toLocaleString()} - {totalMax.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {unit} ({t("yield_total_label")} {farmSize} {sizeUnit})
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">{t("yield_per_unit")} {sizeUnit.slice(0, -1)}</p>
              <p className="font-semibold text-foreground">
                {min}-{max} {unit}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1">{t("yield_farm_size")}</p>
              <p className="font-semibold text-foreground">
                {farmSize} {sizeUnit}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
