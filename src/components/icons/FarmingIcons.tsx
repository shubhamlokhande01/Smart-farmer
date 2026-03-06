import { 
  Leaf, 
  Droplets, 
  Sun, 
  Cloud, 
  ThermometerSun,
  Sprout,
  TreeDeciduous,
  Wheat,
  MapPin,
  Calendar,
  FlaskConical,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Layers,
  MessageCircle,
  type LucideProps
} from "lucide-react";

export const LeafIcon = (props: LucideProps) => <Leaf {...props} />;
export const WaterIcon = (props: LucideProps) => <Droplets {...props} />;
export const SunIcon = (props: LucideProps) => <Sun {...props} />;
export const CloudIcon = (props: LucideProps) => <Cloud {...props} />;
export const TemperatureIcon = (props: LucideProps) => <ThermometerSun {...props} />;
export const SproutIcon = (props: LucideProps) => <Sprout {...props} />;
export const TreeIcon = (props: LucideProps) => <TreeDeciduous {...props} />;
export const CropIcon = (props: LucideProps) => <Wheat {...props} />;
export const LocationIcon = (props: LucideProps) => <MapPin {...props} />;
export const CalendarIcon = (props: LucideProps) => <Calendar {...props} />;
export const SoilIcon = (props: LucideProps) => <FlaskConical {...props} />;
export const GaugeIcon = (props: LucideProps) => <Gauge {...props} />;
export const AlertIcon = (props: LucideProps) => <AlertTriangle {...props} />;
export const SuccessIcon = (props: LucideProps) => <CheckCircle2 {...props} />;
export const GrowthIcon = (props: LucideProps) => <TrendingUp {...props} />;
export const LayersIcon = (props: LucideProps) => <Layers {...props} />;
export const ChatIcon = (props: LucideProps) => <MessageCircle {...props} />;
