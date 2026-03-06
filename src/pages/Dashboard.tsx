import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { GrowthStageCard } from "@/components/dashboard/GrowthStageCard";
import { IrrigationCard } from "@/components/dashboard/IrrigationCard";
import { FertilizerCard } from "@/components/dashboard/FertilizerCard";
import { WeatherAlertCard } from "@/components/dashboard/WeatherAlertCard";
import { YieldEstimateCard } from "@/components/dashboard/YieldEstimateCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { CropIcon, LocationIcon, GaugeIcon, LeafIcon } from "@/components/icons/FarmingIcons";
import { Link } from "react-router-dom";
import { Plus, Tractor } from "lucide-react";
import { useFarms } from "@/hooks/useFarms";
import { useWeather } from "@/hooks/useWeather";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard() {
  const { farms, loading } = useFarms();
  const { t } = useLanguage();
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  // Pick the first farm by default once data loads
  const activeFarm = farms.find((f) => f.id === selectedFarmId) ?? farms[0] ?? null;

  // Live weather for the active farm's location
  const { alerts: liveWeatherAlerts, current: liveCurrentWeather } = useWeather(activeFarm?.location?.address ?? null);

  const [selectedCropId, setSelectedCropId] = useState<string>("");
  const selectedCrop =
    activeFarm?.crops.find((c) => c.id === selectedCropId) ??
    activeFarm?.crops[0] ??
    null;
  const plan = selectedCrop?.managementPlan ?? null;

  // ─── Loading skeleton ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8 space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-40" />
          <div className="grid lg:grid-cols-2 gap-6">
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  // ─── Empty state ──────────────────────────────────────────────────────────
  if (!activeFarm) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Tractor className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                {t("dash_welcome")}
              </h1>
              <p className="text-muted-foreground text-lg max-w-md">
                {t("dash_no_farms_desc")}
              </p>
            </div>
            <Link to="/add-farm">
              <Button variant="hero" size="lg">
                <Plus className="h-5 w-5" />
                {t("dash_add_first_farm")}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // ─── Main dashboard ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Farm selector (if user has multiple farms) */}
        {farms.length > 1 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {farms.map((farm) => (
              <Button
                key={farm.id}
                variant={farm.id === activeFarm.id ? "hero" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedFarmId(farm.id);
                  setSelectedCropId("");
                }}
              >
                {farm.name}
              </Button>
            ))}
          </div>
        )}

        {/* Farm Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              {activeFarm.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <LocationIcon className="h-4 w-4" />
                {activeFarm.location.address}
              </span>
              <span className="flex items-center gap-1.5">
                <GaugeIcon className="h-4 w-4" />
                {activeFarm.size} {activeFarm.sizeUnit}
              </span>
              <span className="flex items-center gap-1.5">
                <LeafIcon className="h-4 w-4" />
                {activeFarm.crops.length} {t("dash_crops_label")}{activeFarm.crops.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <Link to="/add-farm">
            <Button variant="hero">
              <Plus className="h-4 w-4" />
              {t("dash_add_crop")}
            </Button>
          </Link>
        </div>

        {/* No crops yet */}
        {activeFarm.crops.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CropIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">{t("dash_no_crops")}</h2>
              <p className="text-muted-foreground">{t("dash_no_crops_desc")}</p>
            </div>
            <Link to="/add-farm">
              <Button variant="hero">
                <Plus className="h-4 w-4" />
                {t("dash_add_a_crop")}
              </Button>
            </Link>
          </div>
        )}

        {/* Crop Tabs */}
        {activeFarm.crops.length > 0 && (
          <Tabs
            value={selectedCrop?.id ?? activeFarm.crops[0]?.id}
            onValueChange={setSelectedCropId}
            className="space-y-6"
          >
            <TabsList className="bg-muted/50 p-1">
              {activeFarm.crops.map((crop) => (
                <TabsTrigger
                  key={crop.id}
                  value={crop.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <CropIcon className="h-4 w-4" />
                  {crop.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {activeFarm.crops.map((crop) => (
              <TabsContent key={crop.id} value={crop.id} className="space-y-6 animate-fade-in">
                {/* Growth Stage */}
                {crop.currentStage && (
                  <GrowthStageCard
                    cropName={crop.name}
                    stage={crop.currentStage}
                    plantationDate={crop.plantationDate}
                  />
                )}

                {/* If plan exists, show it */}
                {crop.managementPlan ? (
                  <>
                    <div className="grid lg:grid-cols-2 gap-6">
                      {crop.managementPlan.irrigationPlans && (
                        <IrrigationCard
                          plans={crop.managementPlan.irrigationPlans}
                          currentStage={crop.currentStage?.type ?? "vegetative"}
                          stages={crop.managementPlan.stages}
                          plantationDate={crop.plantationDate instanceof Date ? crop.plantationDate : new Date(crop.plantationDate)}
                          farmLocation={activeFarm?.location?.address ?? ""}
                          cropName={crop.name}
                          farmName={activeFarm?.name ?? ""}
                        />
                      )}
                      {crop.managementPlan.fertilizerPlans && (
                        <FertilizerCard
                          plans={crop.managementPlan.fertilizerPlans}
                          currentStage={crop.currentStage?.type ?? "vegetative"}
                        />
                      )}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      <WeatherAlertCard alerts={liveWeatherAlerts.length > 0 ? liveWeatherAlerts : (crop.managementPlan.weatherAlerts ?? [])} current={liveCurrentWeather} />
                      {crop.managementPlan.expectedYield && (
                        <YieldEstimateCard
                          cropName={crop.name}
                          min={crop.managementPlan.expectedYield.min}
                          max={crop.managementPlan.expectedYield.max}
                          unit={crop.managementPlan.expectedYield.unit}
                          farmSize={activeFarm.size}
                          sizeUnit={activeFarm.sizeUnit}
                        />
                      )}
                    </div>

                    {crop.managementPlan.generalRecommendations?.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="font-display flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                              <LeafIcon className="h-4 w-4 text-primary" />
                            </div>
                            {t("dash_general_rec")}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="grid md:grid-cols-2 gap-3">
                            {crop.managementPlan.generalRecommendations.map((rec, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-primary font-bold mt-0.5">✓</span>
                                <span className="text-foreground">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center py-16 text-muted-foreground">
                    <p>{t("dash_generating")}</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </main>
    </div>
  );
}
