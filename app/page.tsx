"use client";

import { useState } from "react";
import {
  TrendingUp,
  Globe,
  ChevronDown,
  Shield,
  DollarSign,
  Car,
  ArrowRight,
} from "lucide-react";
import {
  PRESETS,
  CURRENCIES,
  type PresetKey,
  type UnitSystem,
} from "@/lib/calculator";
import { HYSACalculator } from "@/components/hysa-calculator";
import { EVCalculator } from "@/components/ev-calculator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const PRESET_FLAGS: Record<PresetKey, string> = {
  USA: "US",
  UK: "GB",
  EU: "EU",
  IN: "IN",
};

export default function WorthItPage() {
  const [currency, setCurrency] = useState("USD");
  const [unit, setUnit] = useState<UnitSystem>("imperial");
  const [preset, setPreset] = useState<PresetKey>("USA");
  const [showPresets, setShowPresets] = useState(false);

  const symbol =
    CURRENCIES.find((c) => c.code === currency)?.symbol || "$";

  function applyPreset(key: PresetKey) {
    const p = PRESETS[key];
    setPreset(key);
    setCurrency(p.currency);
    setUnit(p.unit);
    setShowPresets(false);
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-card/97 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <TrendingUp className="size-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-[15px] font-black leading-tight text-foreground">
                Worth It?
              </p>
              <p className="text-[11px] font-bold text-primary">Index</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Preset dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPresets(!showPresets)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <Globe className="size-3" />
                {PRESETS[preset].label}
                <ChevronDown
                  className={cn(
                    "size-2.5 transition-transform",
                    showPresets && "rotate-180"
                  )}
                />
              </button>
              {showPresets && (
                <div className="absolute right-0 top-[calc(100%+4px)] z-50 min-w-[130px] overflow-hidden rounded-xl border bg-card shadow-lg">
                  {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => applyPreset(key)}
                      className={cn(
                        "flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] font-bold transition-colors",
                        preset === key
                          ? "bg-accent text-accent-foreground"
                          : "text-card-foreground hover:bg-secondary"
                      )}
                    >
                      {PRESET_FLAGS[key]} {PRESETS[key].label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Unit toggle */}
            <div className="flex rounded-lg bg-secondary p-0.5">
              {(["imperial", "metric"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-bold transition-all",
                    unit === u
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {u === "imperial" ? "Miles" : "KM"}
                </button>
              ))}
            </div>

            {/* Currency select */}
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="h-8 w-[90px] text-xs font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="border-b border-border/50 bg-gradient-to-b from-secondary to-background">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/20 bg-accent px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-accent-foreground"
          >
            No ads. No affiliate links. Just math.
          </Badge>
          <h1 className="mb-3 text-4xl font-black leading-tight text-foreground sm:text-5xl text-balance">
            Is it actually <span className="text-primary">worth it?</span>
          </h1>
          <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground text-pretty">
            Real numbers. No salesmen. Move sliders, see the truth. Share the
            math with anyone who needs convincing.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
        <Tabs defaultValue="hysa" className="w-full">
          <TabsList className="mb-7 grid h-auto w-full grid-cols-2 gap-2 rounded-2xl bg-secondary p-1.5">
            <TabsTrigger
              value="hysa"
              className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-left data-[state=active]:shadow-md"
            >
              <DollarSign className="size-4 shrink-0" />
              <div className="min-w-0">
                <p className="text-[13px] font-extrabold leading-tight">
                  High-Yield Savings
                </p>
                <p className="text-[11px] text-muted-foreground">
                  HYSA vs Big Bank
                </p>
              </div>
              <ArrowRight className="ml-auto hidden size-3 text-primary data-[state=active]:block" />
            </TabsTrigger>
            <TabsTrigger
              value="ev"
              className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-left data-[state=active]:shadow-md"
            >
              <Car className="size-4 shrink-0" />
              <div className="min-w-0">
                <p className="text-[13px] font-extrabold leading-tight">
                  EV Breakeven
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Gas vs Electric
                </p>
              </div>
              <ArrowRight className="ml-auto hidden size-3 text-primary data-[state=active]:block" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hysa">
            <HYSACalculator symbol={symbol} />
          </TabsContent>
          <TabsContent value="ev">
            <EVCalculator symbol={symbol} unit={unit} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-secondary/50 py-7">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Shield className="size-3 text-muted-foreground" />
            <p className="text-xs font-bold text-muted-foreground">
              No ads. No affiliate links. No data collection. Ever.
            </p>
          </div>
          <p className="mx-auto mb-1.5 max-w-lg text-[11.5px] leading-relaxed text-muted-foreground/70">
            All calculations are estimates for educational purposes. Rates
            change. Actual savings vary. Talk to a financial advisor for major
            decisions. This tool just makes sure you{"'"}re asking the right
            questions first.
          </p>
          <p className="text-[10.5px] text-border">
            Worth It? Index -- Built with honest math
          </p>
        </div>
      </footer>
    </div>
  );
}
