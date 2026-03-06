import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertIcon, SuccessIcon } from "@/components/icons/FarmingIcons";
import type { WeatherAlert } from "@/types/farming";
import type { CurrentWeather } from "@/hooks/useWeather";
import { useLanguage } from "@/contexts/LanguageContext";

interface WeatherAlertCardProps {
  alerts: WeatherAlert[];
  current?: CurrentWeather | null;
}

const severityStyles = {
  low: "bg-muted border-muted-foreground/20",
  medium: "bg-warning/10 border-warning/30",
  high: "bg-destructive/10 border-destructive/30",
};

const severityTextStyles = {
  low: "text-muted-foreground",
  medium: "text-warning",
  high: "text-destructive",
};

const weatherEmoji: Record<string, string> = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Fog: "🌫️",
  Haze: "🌫️",
};

export function WeatherAlertCard({ alerts, current }: WeatherAlertCardProps) {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${alerts.length > 0 ? "bg-warning/20" : "bg-success/20"}`}>
            {alerts.length > 0
              ? <AlertIcon className="h-4 w-4 text-warning" />
              : <SuccessIcon className="h-4 w-4 text-success" />}
          </div>
          <span className="font-display">
            {alerts.length > 0 ? t("weather_alerts_title") : t("weather_status_title")}
          </span>
          {alerts.length > 0 && (
            <span className="ml-auto text-xs px-2 py-1 rounded-full bg-warning/20 text-warning font-medium">
              {alerts.length} alert{alerts.length > 1 ? "s" : ""}
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Live current conditions strip */}
        {current && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 text-sm">
            <span className="text-2xl" aria-hidden>
              {weatherEmoji[current.icon] ?? "🌤️"}
            </span>
            <div className="flex-1">
              <p className="font-semibold text-foreground capitalize">
                {current.description} — {current.temp}°C
              </p>
              <p className="text-xs text-muted-foreground">
                {current.cityName} &nbsp;·&nbsp; {t("weather_humidity")} {current.humidity}% &nbsp;·&nbsp; {t("weather_wind")} {current.windSpeed} km/h
              </p>
            </div>
          </div>
        )}

        {/* All clear */}
        {alerts.length === 0 && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
            <SuccessIcon className="h-5 w-5 text-success" />
            <div>
              <p className="font-medium text-foreground">{t("weather_all_clear")}</p>
              <p className="text-sm text-muted-foreground">
                {current
                  ? t("weather_all_clear_desc")
                  : t("weather_all_clear_desc_no_current")}
              </p>
            </div>
          </div>
        )}

        {/* Alert list */}
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${severityStyles[alert.severity]}`}
          >
            <div className="flex items-start gap-3">
              <AlertIcon className={`h-5 w-5 mt-0.5 ${severityTextStyles[alert.severity]}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-medium capitalize ${severityTextStyles[alert.severity]}`}>
                    {alert.type.replace(/_/g, " ")}
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded capitalize ${severityTextStyles[alert.severity]}`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-foreground mb-2">{alert.message}</p>
                {alert.preventiveMeasures.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">{t("weather_preventive")}</p>
                    <ul className="space-y-0.5">
                      {alert.preventiveMeasures.map((measure, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="text-primary">→</span>
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
