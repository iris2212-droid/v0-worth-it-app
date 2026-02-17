import { formatCurrency } from "@/lib/calculator";
import type { TooltipProps } from "recharts";

interface ChartTooltipProps extends TooltipProps<number, string> {
  symbol: string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  symbol,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border bg-card px-3.5 py-2.5 shadow-lg">
      <p className="mb-1 text-[13px] font-bold text-card-foreground">
        Year {label}
      </p>
      {payload.map((p) => (
        <p
          key={p.name}
          className="text-[13px] font-semibold"
          style={{ color: p.color }}
        >
          {p.name}: {formatCurrency(p.value ?? 0, symbol)}
        </p>
      ))}
    </div>
  );
}
