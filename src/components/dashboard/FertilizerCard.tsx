import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SoilIcon } from "@/components/icons/FarmingIcons";
import { ShieldAlert, CheckSquare, FlaskConical, Tag, Scale } from "lucide-react";
import type { FertilizerPlan } from "@/types/farming";
import { useLanguage } from "@/contexts/LanguageContext";

interface FertilizerCardProps {
  plans: FertilizerPlan[];
  currentStage: string;
}

export function FertilizerCard({ plans, currentStage }: FertilizerCardProps) {
  const { t } = useLanguage();
  const currentPlan = plans.find(p => p.stage === currentStage) || plans[0];

  if (!currentPlan) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg earth-gradient">
            <SoilIcon className="h-4 w-4 text-secondary-foreground" />
          </div>
          <span className="font-display">{t("fert_title")}</span>
          <span className="ml-auto text-xs px-2 py-1 rounded-full bg-secondary/20 text-secondary font-medium capitalize">
            {currentPlan.stage}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Fertilizer name + brand + NPK */}
        <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 space-y-2">
          <p className="text-sm font-semibold text-foreground">{currentPlan.fertilizerType}</p>
          <div className="flex flex-wrap gap-2">
            {currentPlan.brand && (
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                <Tag className="h-3 w-3" />
                {currentPlan.brand}
              </span>
            )}
            {currentPlan.npkRatio && (
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-accent/20 text-accent-foreground font-medium">
                <FlaskConical className="h-3 w-3" />
                NPK {currentPlan.npkRatio}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{t("fert_quantity")}</p>
              <p className="text-base font-bold text-foreground flex items-center gap-1">
                <Scale className="h-3.5 w-3.5 text-secondary" />
                {currentPlan.quantity}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{t("fert_timing")}</p>
              <p className="text-sm font-medium text-foreground">{currentPlan.timing}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{t("fert_method")}</p>
            <p className="text-sm text-foreground">{currentPlan.applicationMethod}</p>
          </div>
        </div>

        {/* Guidelines */}
        {currentPlan.guidelines?.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 uppercase tracking-wide">
              <CheckSquare className="h-3.5 w-3.5 text-success" />
              {t("fert_how_to_apply")}
            </p>
            <ol className="space-y-1.5 list-none pl-0">
              {currentPlan.guidelines.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-foreground leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Precautions */}
        {currentPlan.precautions?.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldAlert className="h-3.5 w-3.5 text-warning" />
              {t("fert_precautions")}
            </p>
            <ul className="space-y-1.5">
              {currentPlan.precautions.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-warning mt-0.5">⚠</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stage pills */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">{t("fert_schedule")}</p>
          <div className="flex flex-wrap gap-2">
            {plans.map((plan, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${plan.stage === currentStage
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
                  }`}
              >
                {plan.stage}
                {plan.brand && (
                  <span className="ml-1 opacity-70">· {plan.fertilizerType.split(" ")[0]}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
