import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WaterIcon } from "@/components/icons/FarmingIcons";
import { Bell, CheckCircle2, CloudRain, Droplets, CalendarDays, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IrrigationPlan, CropStage } from "@/types/farming";
import { buildIrrigationCalendar, getNextIrrigationDay, type IrrigationDay } from "@/lib/irrigationSchedule";
import { fetchForecastByDay } from "@/lib/weatherService";
import { sendIrrigationReminder, isEmailConfigured } from "@/lib/emailReminder";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface IrrigationCardProps {
  plans: IrrigationPlan[];
  currentStage: string;
  stages: CropStage[];
  plantationDate: Date;
  farmLocation: string;
  cropName: string;
  farmName: string;
}

export function IrrigationCard({
  plans,
  currentStage,
  stages,
  plantationDate,
  farmLocation,
  cropName,
  farmName,
}: IrrigationCardProps) {
  const { currentUser } = useAuth();
  const { t } = useLanguage();
  const currentPlan = plans.find(p => p.stage === currentStage) || plans[0];
  const [calendar, setCalendar] = useState<IrrigationDay[]>([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const statusConfig = {
    irrigate: {
      icon: <Droplets className="h-4 w-4 text-primary" />,
      bg: "bg-primary/10 border-primary/30",
      label: t("irr_label_irrigate"),
      textColor: "text-primary",
    },
    skip_rain: {
      icon: <CloudRain className="h-4 w-4 text-accent" />,
      bg: "bg-accent/10 border-accent/30",
      label: t("irr_label_skip_rain"),
      textColor: "text-accent",
    },
    done: {
      icon: <CheckCircle2 className="h-4 w-4 text-muted-foreground" />,
      bg: "bg-muted/50 border-muted",
      label: t("irr_label_done"),
      textColor: "text-muted-foreground",
    },
    none: {
      icon: null,
      bg: "bg-transparent border-border/30",
      label: "",
      textColor: "text-muted-foreground",
    },
  };

  useEffect(() => {
    if (!currentPlan || !plantationDate) return;

    // Build calendar with weather forecast if location available
    const buildWithForecast = async () => {
      let forecast: { date: Date; rainMm: number; pop: number }[] = [];
      if (farmLocation) {
        forecast = await fetchForecastByDay(farmLocation).catch(() => []);
      }
      const cal = buildIrrigationCalendar(plantationDate, stages, plans, forecast, 14);
      setCalendar(cal);
    };

    buildWithForecast();
  }, [currentPlan, plantationDate, farmLocation, stages, plans]);

  const nextDay = getNextIrrigationDay(calendar);

  const handleSendReminder = async () => {
    if (!currentUser?.email || !nextDay) return;
    setSending(true);
    const notes = currentPlan?.notes?.join("; ") ?? "Irrigate in early morning for best results.";
    const ok = await sendIrrigationReminder({
      toEmail: currentUser.email,
      farmerName: currentUser.displayName ?? "Farmer",
      cropName,
      farmName,
      irrigationDate: nextDay.dateLabel,
      quantity: nextDay.quantity,
      cropStage: currentStage,
      weatherNote: nextDay.note,
      tips: notes,
    });
    setSending(false);
    if (ok) setSent(true);
  };

  if (!currentPlan) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg water-gradient">
            <WaterIcon className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display">{t("irr_title")}</span>
          <span className="ml-auto text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
            {currentStage}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Frequency + Quantity strip */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">{t("irr_frequency")}</p>
            <p className="font-semibold text-foreground text-sm">{currentPlan.frequency}</p>
          </div>
          <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">{t("irr_per_hectare")}</p>
            <p className="font-semibold text-foreground text-sm">{currentPlan.quantityPerHectare}</p>
          </div>
        </div>

        {/* Next irrigation highlight */}
        {nextDay && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/25">
            <CalendarDays className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{t("irr_next")}</p>
              <p className="font-semibold text-foreground">{nextDay.dateLabel}</p>
              <p className="text-xs text-muted-foreground">{nextDay.quantity} · {nextDay.note}</p>
            </div>
            {/* Email reminder button */}
            {isEmailConfigured() && currentUser?.email && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleSendReminder}
                disabled={sending || sent}
                className="flex items-center gap-1.5 text-xs"
              >
                {sending ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : sent ? (
                  <CheckCircle2 className="h-3 w-3 text-success" />
                ) : (
                  <Mail className="h-3 w-3" />
                )}
                {sending ? t("irr_sending") : sent ? t("irr_sent") : t("irr_remind_me")}
              </Button>
            )}
          </div>
        )}

        {/* 14-day calendar strip */}
        {calendar.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <CalendarDays className="h-3 w-3" />
              {t("irr_calendar_title")}
            </p>
            <div className="space-y-1">
              {calendar.map((day, i) => {
                const cfg = statusConfig[day.status];
                const isToday = day.date.getTime() === today.getTime();
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-md border text-xs
                      ${cfg.bg}
                      ${isToday ? "ring-1 ring-primary/60" : ""}
                      ${day.status === "none" ? "opacity-40" : ""}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {cfg.icon ?? <div className="h-4 w-4" />}
                      <span className={`font-medium ${isToday ? "text-primary" : "text-foreground"}`}>
                        {day.dateLabel}
                        {isToday && <span className="ml-1 text-primary"> ({t("irr_today")})</span>}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      {day.status !== "none" && (
                        <span className={`font-medium ${cfg.textColor}`}>{cfg.label}</span>
                      )}
                      {day.rainMm > 0 && (
                        <span className="text-muted-foreground flex items-center gap-0.5">
                          <CloudRain className="h-3 w-3" />
                          {day.rainMm.toFixed(1)}mm
                        </span>
                      )}
                      {day.quantity !== "—" && day.status === "irrigate" && (
                        <span className="text-muted-foreground">{day.quantity}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tips */}
        {currentPlan.notes.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t("irr_tips")}</p>
            <ul className="space-y-1">
              {currentPlan.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-accent mt-0.5">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
