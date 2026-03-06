import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CropIcon, SoilIcon, CalendarIcon } from "@/components/icons/FarmingIcons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";

const cropSchema = z.object({
  name: z.string().min(2, "Crop name must be at least 2 characters"),
  plantationDate: z.string().min(1, "Please select a plantation date"),
  soilType: z.enum(["clay", "sandy", "loamy", "silt", "peat", "chalky"]),
  nitrogen: z.coerce.number().min(0).max(300),
  phosphorus: z.coerce.number().min(0).max(200),
  potassium: z.coerce.number().min(0).max(400),
  ph: z.coerce.number().min(0).max(14),
  waterHoldingCapacity: z.enum(["low", "medium", "high"]),
});

type CropFormData = z.infer<typeof cropSchema>;

interface CropFormProps {
  onSubmit: (data: CropFormData) => void;
  onCancel?: () => void;
}

const commonCrops = [
  "Wheat", "Rice", "Corn (Maize)", "Soybean", "Cotton",
  "Tomato", "Potato", "Onion", "Cabbage", "Carrot",
  "Sugarcane", "Groundnut", "Sunflower", "Mustard", "Chickpea"
];

export function CropForm({ onSubmit, onCancel }: CropFormProps) {
  const { t } = useLanguage();
  const form = useForm<CropFormData>({
    resolver: zodResolver(cropSchema),
    defaultValues: {
      name: "",
      plantationDate: "",
      soilType: "loamy",
      nitrogen: 50,
      phosphorus: 30,
      potassium: 40,
      ph: 6.5,
      waterHoldingCapacity: "medium",
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2">
          <CropIcon className="h-5 w-5 text-primary" />
          {t("crop_form_title")}
        </CardTitle>
        <CardDescription>
          {t("crop_form_desc")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Crop Info Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CropIcon className="h-4 w-4 text-primary" />
                {t("crop_info_section")}
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("crop_name_label")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("crop_name_placeholder")} list="crops" {...field} />
                      </FormControl>
                      <datalist id="crops">
                        {commonCrops.map(crop => (
                          <option key={crop} value={crop} />
                        ))}
                      </datalist>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="plantationDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        {t("crop_date_label")}
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Soil Info Section */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <SoilIcon className="h-4 w-4 text-secondary" />
                {t("crop_soil_section")}
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="soilType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("crop_soil_type_label")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="clay">{t("crop_soil_clay")}</SelectItem>
                          <SelectItem value="sandy">{t("crop_soil_sandy")}</SelectItem>
                          <SelectItem value="loamy">{t("crop_soil_loamy")}</SelectItem>
                          <SelectItem value="silt">{t("crop_soil_silt")}</SelectItem>
                          <SelectItem value="peat">{t("crop_soil_peat")}</SelectItem>
                          <SelectItem value="chalky">{t("crop_soil_chalky")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="waterHoldingCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("crop_whc_label")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">{t("crop_whc_low")}</SelectItem>
                          <SelectItem value="medium">{t("crop_whc_medium")}</SelectItem>
                          <SelectItem value="high">{t("crop_whc_high")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* NPK Sliders */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="nitrogen"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>{t("crop_nitrogen")}</FormLabel>
                        <span className="text-sm text-muted-foreground">{field.value} kg/ha</span>
                      </div>
                      <FormControl>
                        <Slider
                          min={0} max={300} step={5}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="py-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phosphorus"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>{t("crop_phosphorus")}</FormLabel>
                        <span className="text-sm text-muted-foreground">{field.value} kg/ha</span>
                      </div>
                      <FormControl>
                        <Slider
                          min={0} max={200} step={5}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="py-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="potassium"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>{t("crop_potassium")}</FormLabel>
                        <span className="text-sm text-muted-foreground">{field.value} kg/ha</span>
                      </div>
                      <FormControl>
                        <Slider
                          min={0} max={400} step={5}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="py-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ph"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>{t("crop_ph")}</FormLabel>
                        <span className="text-sm text-muted-foreground">{field.value.toFixed(1)}</span>
                      </div>
                      <FormControl>
                        <Slider
                          min={0} max={14} step={0.1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="py-2"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        {t("crop_ph_desc")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                  {t("crop_cancel")}
                </Button>
              )}
              <Button type="submit" variant="hero" className="flex-1">
                {t("crop_submit")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
