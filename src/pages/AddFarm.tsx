import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { FarmSetupForm } from "@/components/forms/FarmSetupForm";
import { CropForm } from "@/components/forms/CropForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { createFarm, addCrop, savePlan, type FarmInput, type CropInput } from "@/lib/firestore";
import { generateManagementPlan } from "@/lib/aiPlanGenerator";

type Step = "farm" | "crop" | "generating" | "complete";

export default function AddFarm() {
  const [step, setStep] = useState<Step>("farm");
  const [farmData, setFarmData] = useState<FarmInput | null>(null);
  const [farmId, setFarmId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  const handleFarmSubmit = async (data: FarmInput) => {
    if (!currentUser) return;
    try {
      const id = await createFarm(currentUser.uid, data);
      setFarmId(id);
      setFarmData(data);
      setStep("crop");
      toast({
        title: "Farm saved!",
        description: "Now add your crop information.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error saving farm",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCropSubmit = async (data: CropInput) => {
    if (!currentUser || !farmId || !farmData) return;

    setStep("generating");

    try {
      // 1. Save crop to Firestore
      const cropId = await addCrop(currentUser.uid, farmId, data);

      // 2. Generate AI management plan
      const plan = await generateManagementPlan({
        cropName: data.name,
        plantationDate: data.plantationDate,
        soilData: {
          type: data.soilType,
          nitrogen: data.nitrogen,
          phosphorus: data.phosphorus,
          potassium: data.potassium,
          ph: data.ph,
          waterHoldingCapacity: data.waterHoldingCapacity,
        },
        irrigationMethod: farmData.irrigationMethod,
        farmSize: farmData.size,
        sizeUnit: farmData.sizeUnit,
        location: farmData.location,  // for live weather alerts
      });

      // 3. Save the plan to Firestore
      await savePlan(currentUser.uid, farmId, cropId, plan);

      setStep("complete");
      toast({
        title: "Crop & plan saved!",
        description: "Your personalized farming plan is ready.",
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error saving crop",
        description: "Please try again.",
        variant: "destructive",
      });
      setStep("crop");
    }
  };

  const stepLabels = [t("addfarm_step1"), t("addfarm_step2"), t("addfarm_step3")];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-4">
            {stepLabels.map((label, index) => {
              const stepMap: Step[] = ["farm", "crop", "generating"];
              const currentIndex = ["farm", "crop", "generating", "complete"].indexOf(step);
              const isActive = index <= currentIndex;
              const isCurrent = index === currentIndex || (index === 2 && step === "complete");

              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all ${isActive
                      ? "hero-gradient text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                      } ${isCurrent ? "ring-2 ring-primary ring-offset-2" : ""}`}
                  >
                    {index < currentIndex ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className={`text-sm ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                  {index < 2 && (
                    <div className={`w-12 h-0.5 ${index < currentIndex ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex justify-center">
          {step === "farm" && (
            <FarmSetupForm onSubmit={handleFarmSubmit} />
          )}

          {step === "crop" && (
            <div className="w-full max-w-2xl space-y-4">
              <Button
                variant="ghost"
                onClick={() => setStep("farm")}
                className="mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("addfarm_back")}
              </Button>
              <CropForm onSubmit={handleCropSubmit} />
            </div>
          )}

          {step === "generating" && (
            <Card className="w-full max-w-md text-center">
              <CardContent className="pt-8 pb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 mx-auto mb-4">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  {t("addfarm_generating_title")}
                </h2>
                <p className="text-muted-foreground">
                  {t("addfarm_generating_desc")}
                </p>
              </CardContent>
            </Card>
          )}

          {step === "complete" && (
            <Card className="w-full max-w-md text-center">
              <CardContent className="pt-8 pb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full hero-gradient mx-auto mb-4 animate-scale-in">
                  <Check className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  {t("addfarm_done_title")}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t("addfarm_done_desc")}
                </p>
                <div className="flex justify-center">
                  <div className="h-1 w-32 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full growth-gradient animate-grow origin-left" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
