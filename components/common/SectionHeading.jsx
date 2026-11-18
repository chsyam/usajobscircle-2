import { cn } from "@/lib/utils";
import { SECTION_SUBTITLE } from "@/lib/constants";

export default function SectionHeading({ title, subtitle = SECTION_SUBTITLE, align = "center", as: Tag = "h2", className }) {
  return (
    <div className={cn("section-heading", align === "left" && "section-heading--left", className)}>
      <Tag>{title}</Tag>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
