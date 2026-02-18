"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Globe,
  ChevronDown,
  Shield,
  DollarSign,
  Car,
  ArrowRight,
  Loader2,
  Info,
} from "lucide-react";
import {
  PRESETS,
  CURRENCIES,
  detectUserCountry,
  type PresetKey,
  type UnitSystem,
} from "@/lib/calculator";
import { HYSACalculator } from "@/components/hysa-calculator";
import { EVCalculator } from "@/components/ev-calculator";
import { RecommendedTools } from "@/components/recommended-tools";
import { TrustFAQ } from "@/components/trust-faq";
import { TopReviews } from "@/components/top-reviews";
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

export default function WorthItPage() {
  const [currency, setCurrency] = useState("USD");
  const [unit, setUnit] = useState<UnitSystem>("imperial");
  const [preset, setPreset] = useState<PresetKey>("USA");
  const [showPresets, setShowPresets] = useState(false);
  const [geoLoading, setGeoLoading] = useState(true);

  // Auto-detect user's country on mount
  useEffect(() => {
    let cancelled = false;
    detectUserCountry().then((detected) => {
      if (cancelled) return;
      applyPreset(detected);
      setGeoLoading(false);
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {/* Top Affiliate Disclosure Bar */}
      <div className="border-b border-border/60 bg-muted">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 px-4 py-2">
          <Info className="size-3 shrink-0 text-muted-foreground" />
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Worth It? is reader-supported. We may earn a commission if you open
            an account through our links.
          </p>
        </div>
      </div>

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
            {/* Geo detection indicator */}
            {geoLoading && (
              <div className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1.5 text-[11px] font-semibold text-primary">
                <Loader2 className="size-3 animate-spin" />
                Detecting...
              </div>
            )}

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
                      {PRESETS[key].label}
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
          {!geoLoading && (
            <p className="mt-3 text-xs font-medium text-muted-foreground/60">
              Auto-configured for <span className="font-bold text-primary">{PRESETS[preset].label}</span> based on your location
            </p>
          )}
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
                  HYSA vs Lazy Bank
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

        {/* Recommended Tools by Region */}
        <section className="mt-10 rounded-2xl border bg-card p-6 shadow-sm">
          <RecommendedTools preset={preset} />
        </section>

        {/* Trust FAQ */}
        <section className="mt-10 rounded-2xl border bg-card p-6 shadow-sm">
          <TrustFAQ />
        </section>

        {/* Contextual Affiliate Disclosure */}
        <div className="mt-10 flex items-start gap-2.5 rounded-lg border border-primary/15 bg-accent/50 px-4 py-3">
          <Info className="mt-0.5 size-3.5 shrink-0 text-primary" />
          <p className="text-xs leading-relaxed text-foreground/70">
            <strong className="font-bold text-foreground/90">Disclosure:</strong>{" "}
            These recommendations are based on our math engine. We partner with
            some of these banks to keep this tool free for you.
          </p>
        </div>

        {/* Top Recommendations */}
        <section className="mt-4 rounded-2xl border bg-card p-6 shadow-sm">
          <TopReviews />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-secondary/50 py-8">
        <div className="mx-auto max-w-3xl px-4">
          {/* Trust strip */}
          <div className="mb-5 flex items-center justify-center gap-2">
            <Shield className="size-3 text-muted-foreground" />
            <p className="text-xs font-bold text-muted-foreground">
              No ads. No data collection. Reader-supported.
            </p>
          </div>

          {/* Legal section */}
          <div className="mb-5 rounded-xl border bg-card px-5 py-4">
            <p className="mb-1 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
              Legal
            </p>

            {/* Full affiliate disclosure */}
            <p className="mb-3 text-[11.5px] leading-relaxed text-muted-foreground">
              <strong className="font-bold text-foreground/80">
                Affiliate Disclosure:
              </strong>{" "}
              Worth It? is reader-supported. When you open an account through
              links on our site, we may earn a commission at no additional cost
              to you. This compensation helps us keep the calculators free and
              the math honest. Our recommendations are generated by our math
              engine and editorial team -- partners never influence placement or
              scoring.
            </p>

            {/* Estimates disclaimer */}
            <p className="mb-4 text-[11.5px] leading-relaxed text-muted-foreground">
              Calculations are estimates only. We are not financial advisors.
              Always verify rates directly with the bank. Past performance and
              current rates do not guarantee future results.
            </p>

            {/* Legal links */}
            <div className="flex items-center gap-4 border-t pt-3">
              <a
                href="#terms-of-use"
                className="text-[11px] font-semibold text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
              >
                Terms of Use
              </a>
              <span className="text-border">|</span>
              <a
                href="#privacy-policy"
                className="text-[11px] font-semibold text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Original education disclaimer */}
          <p className="mx-auto mb-1.5 max-w-lg text-center text-[11.5px] leading-relaxed text-muted-foreground/70">
            All calculations are estimates for educational purposes. Rates
            change. Actual savings vary. Talk to a financial advisor for major
            decisions. This tool just makes sure you{"'"}re asking the right
            questions first.
          </p>
          <p className="text-center text-[10.5px] text-border">
            Worth It? Index -- Built with honest math
          </p>
        </div>
      </footer>
    </div>
  );
}
