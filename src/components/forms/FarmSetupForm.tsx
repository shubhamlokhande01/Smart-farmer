import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationIcon, GaugeIcon } from "@/components/icons/FarmingIcons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { LocationAutocomplete } from "./LocationAutocomplete";

const farmSchema = z.object({
  name: z.string().min(2, "Farm name must be at least 2 characters"),
  location: z.string().min(5, "Please enter a valid location"),
  size: z.coerce.number().min(0.1, "Farm size must be at least 0.1"),
  sizeUnit: z.enum(["hectares", "acres"]),
  irrigationMethod: z.enum(["drip", "sprinkler", "flood", "furrow", "rainfed"]),
});

type FarmFormData = z.infer<typeof farmSchema>;

interface FarmSetupFormProps {
  onSubmit: (data: FarmFormData) => void;
}

export function FarmSetupForm({ onSubmit }: FarmSetupFormProps) {
  const { t } = useLanguage();
  const form = useForm<FarmFormData>({
    resolver: zodResolver(farmSchema),
    defaultValues: {
      name: "",
      location: "",
      size: 1,
      sizeUnit: "hectares",
      irrigationMethod: "drip",
    },
  });

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="font-display flex items-center gap-2">
          <LocationIcon className="h-5 w-5 text-primary" />
          {t("farm_form_title")}
        </CardTitle>
        <CardDescription>
          {t("farm_form_desc")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("farm_name_label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("farm_name_placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("farm_location_label")}</FormLabel>
                  <FormControl>
                    <LocationAutocomplete
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={t("farm_location_placeholder")}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("farm_size_label")}</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" min="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sizeUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("farm_unit_label")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hectares">{t("farm_unit_hectares")}</SelectItem>
                        <SelectItem value="acres">{t("farm_unit_acres")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="irrigationMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <GaugeIcon className="h-4 w-4 text-accent" />
                    {t("farm_irrigation_label")}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="drip">{t("farm_irr_drip")}</SelectItem>
                      <SelectItem value="sprinkler">{t("farm_irr_sprinkler")}</SelectItem>
                      <SelectItem value="flood">{t("farm_irr_flood")}</SelectItem>
                      <SelectItem value="furrow">{t("farm_irr_furrow")}</SelectItem>
                      <SelectItem value="rainfed">{t("farm_irr_rainfed")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant="hero" className="w-full">
              {t("farm_submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
