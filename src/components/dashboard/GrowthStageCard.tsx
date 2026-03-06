import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SproutIcon, LeafIcon, SunIcon, CropIcon } from "@/components/icons/FarmingIcons";
import type { CropStage, CropStageType } from "@/types/farming";
import { useLanguage } from "@/contexts/LanguageContext";

interface GrowthStageCardProps {
  cropName: string;
  stage: CropStage;
  plantationDate: Date;
}

const stageIconMap: Record<CropStageType, typeof SproutIcon> = {
  germination: SproutIcon,
  seedling: SproutIcon,
  vegetative: LeafIcon,
  flowering: SunIcon,
  fruiting: CropIcon,
  maturity: CropIcon,
  harvest: CropIcon,
};

const stageColorMap: Record<CropStageType, string> = {
  germination: "text-green-600",
  seedling: "text-green-500",
  vegetative: "text-success",
  flowering: "text-warning",
  fruiting: "text-secondary",
  maturity: "text-primary",
  harvest: "text-success",
};

export function GrowthStageCard({ cropName, stage, plantationDate }: GrowthStageCardProps) {
  const { t } = useLanguage();

  const stageLabelKey = `growth_stage_${stage.type}` as
    | "growth_stage_germination"
    | "growth_stage_seedling"
    | "growth_stage_vegetative"
    | "growth_stage_flowering"
    | "growth_stage_fruiting"
    | "growth_stage_maturity"
    | "growth_stage_harvest";

  const Icon = stageIconMap[stage.type];
  const color = stageColorMap[stage.type];
  const stageLabel = t(stageLabelKey);

  return (
    <Card className="overflow-hidden">
      <div className="h-2 growth-gradient" />
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="font-display text-lg">{cropName}</span>
          <span className={`text-sm font-medium ${color}`}>
            {stageLabel}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Icon className={`h-7 w-7 ${color}`} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">
              {t("growth_planted")} {plantationDate.toLocaleDateString()}
            </p>
            <p className="text-sm font-medium text-foreground">
              {stage.daysRemaining} {t("growth_days_until_next")}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("growth_stage_progress")}</span>
            <span className="font-medium text-foreground">{stage.progress}%</span>
          </div>
          <Progress value={stage.progress} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
