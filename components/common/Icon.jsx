import {
  TrendingUp,
  Car,
  Calculator,
  RadioTower,
  GraduationCap,
  Hospital,
  HardHat,
  Factory,
  MonitorSmartphone,
  SlidersHorizontal,
  PenTool,
  Clock,
  Users,
  Wallet,
  FileSearch,
  Building2,
  Briefcase,
  Circle,
} from "lucide-react";

/** Map of icon names stored in data files to lucide components. */
const ICONS = {
  TrendingUp,
  Car,
  Calculator,
  RadioTower,
  GraduationCap,
  Hospital,
  HardHat,
  Factory,
  MonitorSmartphone,
  SlidersHorizontal,
  PenTool,
  Clock,
  Users,
  Wallet,
  FileSearch,
  Building2,
  Briefcase,
};

export default function Icon({ name, size = 24, strokeWidth = 1.5, ...props }) {
  const Component = ICONS[name] || Circle;
  return <Component size={size} strokeWidth={strokeWidth} aria-hidden="true" {...props} />;
}
