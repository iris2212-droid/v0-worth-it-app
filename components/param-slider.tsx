"use client";

import { Slider } from "@/components/ui/slider";

interface ParamSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
  hint?: string;
}

export function ParamSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  hint,
}: ParamSliderProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-muted-foreground">
          {label}
        </label>
        <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-extrabold text-foreground font-mono tabular-nums">
          {format(value)}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="cursor-pointer"
      />
      {hint && (
        <p className="text-[11px] text-muted-foreground leading-tight">
          {hint}
        </p>
      )}
    </div>
  );
}
