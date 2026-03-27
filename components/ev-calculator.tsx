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
import { BarChart2 } from "lucide-react";
import { formatCurrency, formatCompact } from "@/lib/calculator";
import type { UnitSystem } from "@/lib/calculator";
import { ParamSlider } from "@/components/param-slider";
import { InfoCard } from "@/components/info-card";
import { CopyButton } from "@/components/copy-button";
import { ChartTooltip } from "@/components/chart-tooltip";
import { cn } from "@/lib/utils";

interface EVProps {
  symbol: string;
  unit: UnitSystem;
}

export function EVCalculator({ symbol, unit }: EVProps) {
  const isMetric = unit === "metric";
  const [gasPrice, setGasPrice] = useState(isMetric ? 1.65 : 3.45);
  const [mpg, setMpg] = useState(isMetric ? 7.5 : 28);
  const [annualMiles, setAnnualMiles] = useState(isMetric ? 20000 : 12000);
  const [premium, setPremium] = useState(8000);
  const [kwhCost, setKwhCost] = useState(0.13);
  const [maintSavings, setMaintSavings] = useState(400);

  const calc = useMemo(() => {
    const normalizedMPG = isMetric ? (100 / mpg) * 2.352 : mpg;
    const normalizedMiles = isMetric ? annualMiles * 0.621 : annualMiles;
    const annualGas =
      (normalizedMiles / normalizedMPG) * (isMetric ? gasPrice * 3.785 : gasPrice);
    const annualElec = (normalizedMiles / 3.5) * kwhCost;
    const annualSaving = annualGas - annualElec + maintSavings;
    const breakevenMonths =
      annualSaving > 0 ? Math.ceil((premium / annualSaving) * 12) : Infinity;

    const chartData = Array.from({ length: 11 }, (_, i) => ({
      year: i,
      "EV Total Cost": Math.round(premium + i * annualElec - i * maintSavings),
      "ICE Total Cost": Math.round(i * annualGas),
    }));

    return {
      annualGas,
      annualElec,
      annualSaving,
      breakevenMonths,
      breakevenYears: breakevenMonths / 12,
      chartData,
    };
  }, [gasPrice, mpg, annualMiles, premium, kwhCost, maintSavings, isMetric]);

  const shareText = `Worth It? -- EV Breakeven\nGas: ${formatCurrency(calc.annualGas, symbol)}/yr -> EV: ${formatCurrency(calc.annualElec, symbol)}/yr\nNet Saving: ${formatCurrency(calc.annualSaving, symbol)}/yr\nBreakeven: ${calc.breakevenMonths === Infinity ? "Never" : `${calc.breakevenMonths} months`}\nworthitindex.app`;

  const bgClass =
    calc.breakevenYears <= 5
      ? "from-[#065f46] to-[#047857]"
      : calc.breakevenYears <= 8
        ? "from-[#92400e] to-[#b45309]"
        : "from-[#7f1d1d] to-[#b91c1c]";

  return (
    <div className="flex flex-col gap-6">
      {/* Sliders */}
      <div className="grid grid-cols-1 gap-5 rounded-xl border bg-card p-5 sm:grid-cols-2">
        <ParamSlider
          label={isMetric ? "Gas Price (per liter)" : "Gas Price (per gallon)"}
          value={gasPrice}
          min={0.5}
          max={isMetric ? 3 : 7}
          step={0.05}
          onChange={setGasPrice}
          format={(v) => `${symbol}${v.toFixed(2)}`}
        />
        <ParamSlider
          label={
            isMetric ? "ICE Efficiency (L/100km)" : "ICE Efficiency (MPG)"
          }
          value={mpg}
          min={isMetric ? 4 : 15}
          max={isMetric ? 15 : 60}
          step={isMetric ? 0.5 : 1}
          onChange={setMpg}
          format={(v) =>
            isMetric ? `${v}L/100km` : `${v} MPG`
          }
        />
        <ParamSlider
          label={isMetric ? "Annual KM Driven" : "Annual Miles Driven"}
          value={annualMiles}
          min={isMetric ? 5000 : 3000}
          max={isMetric ? 50000 : 30000}
          step={isMetric ? 1000 : 500}
          onChange={setAnnualMiles}
          format={(v) =>
            `${v.toLocaleString()} ${isMetric ? "km" : "mi"}`
          }
        />
        <ParamSlider
          label="EV Price Premium"
          value={premium}
          min={0}
          max={30000}
          step={500}
          onChange={setPremium}
          format={(v) => formatCurrency(v, symbol)}
          hint="Extra EV cost vs equivalent ICE"
        />
        <ParamSlider
          label="Electricity Cost (per kWh)"
          value={kwhCost}
          min={0.05}
          max={0.5}
          step={0.01}
          onChange={setKwhCost}
          format={(v) => `${symbol}${v.toFixed(2)}`}
          hint="Your home charging rate"
        />
        <ParamSlider
          label="Annual Maintenance Savings"
          value={maintSavings}
          min={0}
          max={1500}
          step={50}
          onChange={setMaintSavings}
          format={(v) => formatCurrency(v, symbol)}
          hint="No oil changes, fewer brakes, etc."
        />
      </div>

      {/* Hero stat */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-card",
          bgClass
        )}
      >
        <div className="absolute -right-16 -top-16 size-52 rounded-full bg-card/5" />
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-card/60">
          EV Breakeven Point
        </p>
        {calc.breakevenMonths === Infinity ? (
          <p className="mb-2 text-3xl font-black">
            {"EV doesn't break even with these inputs"}
          </p>
        ) : (
          <>
            <p className="mb-1 text-5xl font-black leading-none">
              {calc.breakevenMonths} Months
            </p>
            <p className="mb-4 text-[13px] text-card/75">
              ({calc.breakevenYears.toFixed(1)} years) -- then you{"'"}re in{" "}
              <strong className="text-card">pure profit</strong>. Saving{" "}
              {formatCurrency(calc.annualSaving, symbol)}/yr after.
            </p>
          </>
        )}
        <div className="mb-4 grid grid-cols-3 gap-2.5">
          {[
            {
              label: "Annual Gas Cost",
              value: calc.annualGas,
              color: "text-red-300",
            },
            {
              label: "Annual Elec Cost",
              value: calc.annualElec,
              color: "text-emerald-300",
            },
            {
              label: "Net Annual Saving",
              value: calc.annualSaving,
              color: "text-card",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-xl bg-card/10 p-3 text-center"
            >
              <p className={cn("mb-0.5 text-[17px] font-black", color)}>
                {formatCurrency(value, symbol)}
              </p>
              <p className="text-[10px] text-card/60">{label}</p>
            </div>
          ))}
        </div>
        <CopyButton text={shareText} />
      </div>
      
{/* Affiliate: Lease End */}
{calc.annualSaving > 0 && (
  <div className="mt-4 rounded-xl border bg-card p-4 shadow-sm">
    <p className="text-xs text-muted-foreground mb-1">Partner</p>

    <h3 className="font-semibold mb-1">
      Ready to switch to electric?
    </h3>

    <p className="text-sm text-muted-foreground mb-3">
      If the numbers make sense, explore EV leasing and financing options tailored to your budget.
    </p>

    <a
      href="https://leaseend.sjv.io/DWWeby"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block text-sm font-medium text-green-600 hover:underline"
    >
      View EV lease options →
    </a>
  </div>
)}
      
      {/* Chart */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <p className="mb-4 flex items-center gap-2 text-[13px] font-bold text-card-foreground">
          <BarChart2 className="size-4 text-chart-3" />
          Total Cost Over Time: EV vs Gas
        </p>
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={calc.chartData}>
            <defs>
              <linearGradient id="evGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="iceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
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
              dataKey="EV Total Cost"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#evGrad)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="ICE Total Cost"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#iceGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Info cards grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoCard
          type="info"
          title="The Real EV Math Nobody Discusses"
          items={[
            "Federal EV tax credit (US): up to <b>$7,500</b>. That alone kills a 2-year payback period instantly.",
            "Home charger install: $500-$1,500 once. Then fill up in your pajamas at 3c/mile forever.",
            "1-2yr used EVs are <b>the sweet spot</b>. Buy someone else's depreciation hit right now.",
          ]}
        />
        <InfoCard
          type="warning"
          title="When the Math Says Skip It"
          items={[
            "Under <b>8,000 miles/year</b>? Fuel savings rarely justify the premium. Math is math.",
            "Apartment + no home charging = public charger rates that can rival or exceed gas costs.",
            "Low-gas regions: breakeven can stretch <b>past 10 years</b>. Wait for cheaper EVs in 2026-27.",
          ]}
        />
        <InfoCard
          type="success"
          title="Hidden EV Wins People Miss"
          items={[
            "No oil changes ever: $120-$200/yr <b>forever</b>. $2,000+ over a decade. Don't ignore this.",
            "Regen braking = brake pads last <b>2-3x longer</b>. Quietly significant over 10 years.",
            "HOV lane access in many US states = real commute time saved = <b>real monetary value</b>.",
          ]}
        />
        <InfoCard
          type="info"
          title="The Anti-Salesman EV Verdict"
          items={[
            "<b>Worth it now:</b> 12k+ miles/yr, home charging, tax credit eligible. Math is clearly green.",
            "<b>Wait:</b> Under 8k/yr or can't charge at home. A 2026-27 EV will be cheaper anyway.",
            "<b>Best move:</b> 1-2yr old used EV. Someone else takes the depreciation. You take the savings.",
          ]}
        />
      </div>
    </div>
  );
}
