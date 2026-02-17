"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BarChart2, Clock, AlertTriangle } from "lucide-react";
import { compound, formatCurrency, formatCompact } from "@/lib/calculator";
import { ParamSlider } from "@/components/param-slider";
import { InfoCard } from "@/components/info-card";
import { CopyButton } from "@/components/copy-button";
import { ChartTooltip } from "@/components/chart-tooltip";
import { Progress } from "@/components/ui/progress";

interface HYSAProps {
  symbol: string;
}

const SMART_RATE = 4.5;
const LAZY_RATE = 0.01;

export function HYSACalculator({ symbol }: HYSAProps) {
  const [deposit, setDeposit] = useState(10000);
  const [monthly, setMonthly] = useState(200);
  const [hyRate, setHyRate] = useState(SMART_RATE);
  const [bbRate, setBbRate] = useState(LAZY_RATE);

  const milestones = useMemo(
    () =>
      [1, 5, 10].map((y) => ({
        year: y,
        hy: Math.round(compound(deposit, monthly, hyRate, y)),
        big: Math.round(compound(deposit, monthly, bbRate, y)),
        gap: Math.round(
          compound(deposit, monthly, hyRate, y) -
            compound(deposit, monthly, bbRate, y)
        ),
      })),
    [deposit, monthly, hyRate, bbRate]
  );

  const chartData = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => ({
        year: i,
        "High-Yield": Math.round(compound(deposit, monthly, hyRate, i)),
        "Lazy Bank": Math.round(compound(deposit, monthly, bbRate, i)),
      })),
    [deposit, monthly, hyRate, bbRate]
  );

  const gap10 = milestones[2].gap;

  // Hype vs Reality: explicit interest-earned comparison at locked rates
  const hyInterest10 = useMemo(
    () => Math.round(compound(deposit, monthly, SMART_RATE, 10) - (deposit + monthly * 120)),
    [deposit, monthly]
  );
  const lazyInterest10 = useMemo(
    () => Math.round(compound(deposit, monthly, LAZY_RATE, 10) - (deposit + monthly * 120)),
    [deposit, monthly]
  );
  const lazyTax = hyInterest10 - lazyInterest10;

  const shareText = `Worth It? -- HYSA\nDeposit: ${formatCurrency(deposit, symbol)} | +${formatCurrency(monthly, symbol)}/mo\nRate: ${hyRate}% vs ${bbRate}%\n10-Year Gap: ${formatCurrency(gap10, symbol)}\nThe Lazy Tax: ${formatCurrency(lazyTax, symbol)}\nworthitindex.app`;

  return (
    <div className="flex flex-col gap-6">
      {/* Sliders */}
      <div className="grid grid-cols-1 gap-5 rounded-xl border bg-card p-5 sm:grid-cols-2">
        <ParamSlider
          label="Initial Deposit"
          value={deposit}
          min={500}
          max={100000}
          step={500}
          onChange={setDeposit}
          format={(v) => formatCurrency(v, symbol)}
          hint="Your starting balance"
        />
        <ParamSlider
          label="Monthly Contribution"
          value={monthly}
          min={0}
          max={2000}
          step={50}
          onChange={setMonthly}
          format={(v) => `${formatCurrency(v, symbol)}/mo`}
          hint="Added each month"
        />
        <ParamSlider
          label="HYSA Rate"
          value={hyRate}
          min={1}
          max={8}
          step={0.05}
          onChange={setHyRate}
          format={(v) => `${v.toFixed(2)}%`}
          hint="Current best HYSA ~4-5%"
        />
        <ParamSlider
          label="Lazy Bank Rate"
          value={bbRate}
          min={0.01}
          max={2}
          step={0.01}
          onChange={setBbRate}
          format={(v) => `${v.toFixed(2)}%`}
          hint="Chase / BofA / Wells avg: 0.01%"
        />
      </div>

      {/* Hero stat */}
      <div className="relative overflow-hidden rounded-2xl bg-foreground p-6 text-card">
        <div className="absolute -right-16 -top-16 size-52 rounded-full bg-primary/10" />
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-card/50">
          10-Year Interest Lost at Your Big Bank
        </p>
        <p className="mb-1.5 text-5xl font-black leading-none text-destructive">
          {formatCurrency(gap10, symbol)}
        </p>
        <p className="mb-4 text-[13px] text-card/60">
          Not a typo. Not a trick. Just{" "}
          <strong className="text-card">compound math.</strong>
        </p>
        <CopyButton text={shareText} />
      </div>

      {/* Lazy Tax callout */}
      <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-5">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-destructive/10">
            <AlertTriangle className="size-4 text-destructive" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-destructive">
              Hype vs. Reality
            </p>
            <p className="text-[11px] text-muted-foreground">
              {SMART_RATE}% HYSA vs {LAZY_RATE}% Lazy Bank -- 10 year comparison
            </p>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg border bg-card p-3 text-center">
            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Interest Earned at {SMART_RATE}%
            </p>
            <p className="text-lg font-black text-primary">
              {formatCurrency(hyInterest10, symbol)}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-3 text-center">
            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Interest Earned at {LAZY_RATE}%
            </p>
            <p className="text-lg font-black text-muted-foreground">
              {formatCurrency(lazyInterest10, symbol)}
            </p>
          </div>
          <div className="rounded-lg border-2 border-destructive/20 bg-destructive/5 p-3 text-center">
            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wide text-destructive">
              The Difference
            </p>
            <p className="text-lg font-black text-destructive">
              {formatCurrency(lazyTax, symbol)}
            </p>
          </div>
        </div>
        <p className="text-center text-sm font-extrabold text-destructive">
          {"\"The Lazy Tax you are paying\""}
          <span className="ml-1 font-normal text-muted-foreground">
            -- {formatCurrency(lazyTax, symbol)} in lost interest over 10 years by keeping your money at {LAZY_RATE}%.
          </span>
        </p>
      </div>

      {/* Milestone cards */}
      <div className="grid grid-cols-3 gap-3">
        {milestones.map(({ year, hy, gap }) => (
          <div
            key={year}
            className="flex flex-col items-center rounded-xl border bg-card p-4 text-center shadow-sm"
          >
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {year} Year{year > 1 ? "s" : ""}
            </p>
            <p className="mb-0.5 text-xl font-black text-primary">
              {formatCompact(hy, symbol)}
            </p>
            <p className="mb-3 text-[10px] text-muted-foreground">
              High-Yield balance
            </p>
            <div className="w-full border-t-2 border-dashed border-border pt-3">
              <p className="mb-0.5 text-[15px] font-extrabold text-destructive">
                {"-"}{formatCompact(gap, symbol)}
              </p>
              <p className="text-[10px] text-muted-foreground">
                lost at lazy bank
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <p className="mb-4 flex items-center gap-2 text-[13px] font-bold text-card-foreground">
          <BarChart2 className="size-4 text-primary" />
          Growth vs. Stagnation
        </p>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="hyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="bbGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickFormatter={(v) => `Yr ${v}`}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              tickFormatter={(v) => formatCompact(v, symbol)}
            />
            <Tooltip content={<ChartTooltip symbol={symbol} />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="High-Yield"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#hyGrad)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="Lazy Bank"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#bbGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Liquidity score */}
      <div className="rounded-xl border bg-card p-5">
        <p className="mb-3 flex items-center gap-2 text-[13px] font-bold text-card-foreground">
          <Clock className="size-3.5 text-chart-3" />
          Liquidity Score: 8.2 / 10
        </p>
        <div className="flex items-center gap-4">
          <Progress value={82} className="h-2.5 flex-1" />
          <span className="text-lg font-black text-primary">8.2</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          <strong>1-3 business day transfers.</strong> Full access, not locked
          like a CD. Keep 1 month{"'"}s expenses in checking as a buffer --
          problem solved. -1.8 pts for no same-day emergency access.
        </p>
      </div>

      {/* Info cards grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard
          type="info"
          title="The 3-Day Rule (Transfers)"
          items={[
            "HYSA to checking takes <b>1-3 business days</b>. Keep 1 month buffer in regular bank.",
            "Set up a <b>recurring auto-transfer</b> after payday. You'll never notice it leaving.",
            "ACH push (you pushing out) is often faster than a pull. Learn the difference.",
          ]}
        />
        <InfoCard
          type="success"
          title="The FDIC Safety Check"
          items={[
            "Every legit HYSA is <b>FDIC-insured up to $250k</b>. Ally is as safe as Chase -- FDIC is FDIC.",
            "Verify any bank at <b>fdic.gov BankFind Suite</b>. Takes 30 seconds. Worth it.",
            "Ally, Marcus, SoFi, Wealthfront -- all legit. Don't let 'online-only' scare you.",
          ]}
        />
        <InfoCard
          type="warning"
          title="The Rate-Chasing Trap"
          items={[
            "Moving banks for +0.1%? <b>The time cost rarely justifies it.</b> Pick a top-3 and stick.",
            "Only move if a bank drops 1%+ below peers for 2+ months. Otherwise: noise.",
            "<b>Watch promo rates</b> -- Wealthfront/SoFi sometimes run 3-month introductory offers.",
          ]}
        />
        <InfoCard
          type="success"
          title="The Anti-Salesman Verdict"
          items={[
            "<b>Ally:</b> Best app, no minimums, consistently top-tier. Default choice for beginners.",
            "<b>Marcus by Goldman:</b> Boring in the best way. No games, no tricks, clean UI.",
            "<b>Wealthfront:</b> Often highest rate -- but verify it's the permanent base rate.",
          ]}
        />
      </div>
    </div>
  );
}
