export const PRESETS = {
  USA: {
    gasPrice: 3.45,
    mpg: 28,
    hyRate: 4.3,
    bigBankRate: 0.01,
    kwhCost: 0.13,
    currency: "USD",
    unit: "imperial" as const,
    symbol: "$",
    label: "USA",
    flag: "US",
  },
  UK: {
    gasPrice: 1.65,
    mpg: 40,
    hyRate: 5.1,
    bigBankRate: 0.1,
    kwhCost: 0.24,
    currency: "GBP",
    unit: "metric" as const,
    symbol: "\u00A3",
    label: "UK",
    flag: "GB",
  },
  EU: {
    gasPrice: 1.72,
    mpg: 18,
    hyRate: 3.5,
    bigBankRate: 0.05,
    kwhCost: 0.28,
    currency: "EUR",
    unit: "metric" as const,
    symbol: "\u20AC",
    label: "EU",
    flag: "EU",
  },
  IN: {
    gasPrice: 1.06,
    mpg: 22,
    hyRate: 6.8,
    bigBankRate: 2.5,
    kwhCost: 0.08,
    currency: "INR",
    unit: "metric" as const,
    symbol: "\u20B9",
    label: "India",
    flag: "IN",
  },
} as const;

export type PresetKey = keyof typeof PRESETS;
export type UnitSystem = "imperial" | "metric";

export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "$ USD" },
  { code: "GBP", symbol: "\u00A3", label: "\u00A3 GBP" },
  { code: "EUR", symbol: "\u20AC", label: "\u20AC EUR" },
  { code: "INR", symbol: "\u20B9", label: "\u20B9 INR" },
] as const;

export function formatCurrency(
  n: number,
  sym = "$",
  dec = 0,
): string {
  return `${sym}${Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  })}`;
}

export function formatCompact(n: number, sym = "$"): string {
  if (n >= 1000) return `${sym}${(n / 1000).toFixed(1)}k`;
  return formatCurrency(n, sym);
}

export function compound(
  principal: number,
  monthly: number,
  rate: number,
  years: number,
): number {
  const monthlyRate = rate / 100 / 12;
  let balance = principal;
  for (let i = 0; i < years * 12; i++) {
    balance = balance * (1 + monthlyRate) + monthly;
  }
  return balance;
}
