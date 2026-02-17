import { Info, AlertTriangle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type CardType = "info" | "warning" | "success";

interface InfoCardProps {
  title: string;
  items: string[];
  type?: CardType;
}

const typeStyles: Record<
  CardType,
  { border: string; bg: string; iconColor: string }
> = {
  info: {
    border: "border-chart-3/30",
    bg: "bg-chart-3/5",
    iconColor: "text-chart-3",
  },
  warning: {
    border: "border-chart-4/40",
    bg: "bg-chart-4/5",
    iconColor: "text-chart-4",
  },
  success: {
    border: "border-primary/30",
    bg: "bg-primary/5",
    iconColor: "text-primary",
  },
};

const typeIcons: Record<CardType, React.ReactNode> = {
  info: <Info className="size-3.5" />,
  warning: <AlertTriangle className="size-3.5" />,
  success: <Star className="size-3.5" />,
};

export function InfoCard({ title, items, type = "info" }: InfoCardProps) {
  const styles = typeStyles[type];

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-4",
        styles.border,
        styles.bg
      )}
    >
      <div className={cn("mb-3 flex items-center gap-2", styles.iconColor)}>
        {typeIcons[type]}
        <strong className="text-[13px] text-foreground">{title}</strong>
      </div>
      <ul className="flex flex-col gap-2 list-none p-0 m-0">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2 text-xs text-muted-foreground leading-relaxed"
          >
            <span className="text-border font-bold shrink-0" aria-hidden="true">
              {"->"}
            </span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
