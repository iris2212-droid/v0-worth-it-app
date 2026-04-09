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
} as const;

export type PresetKey = keyof typeof PRESETS;
export type UnitSystem = "imperial" | "metric";

export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "$ USD" },
  { code: "GBP", symbol: "\u00A3", label: "\u00A3 GBP" },
  { code: "EUR", symbol: "\u20AC", label: "\u20AC EUR" },
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

// --- Auto-Localization ---

const COUNTRY_TO_PRESET: Record<string, PresetKey> = {
  US: "USA",
  GB: "UK",
  // Major EU countries
  DE: "EU", FR: "EU", IT: "EU", ES: "EU", NL: "EU", BE: "EU",
  AT: "EU", PT: "EU", IE: "EU", FI: "EU", GR: "EU", SE: "EU",
  PL: "EU", CZ: "EU", DK: "EU", RO: "EU", HU: "EU", SK: "EU",
  HR: "EU", BG: "EU", LT: "EU", LV: "EU", EE: "EU", SI: "EU",
  LU: "EU", MT: "EU", CY: "EU",
};

export async function detectUserCountry(): Promise<PresetKey> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return "USA";
    const data = await res.json();
    const code = (data.country_code ?? "US").toUpperCase();
    return COUNTRY_TO_PRESET[code] ?? "USA";
  } catch {
    return "USA";
  }
}

// --- Recommended Tools by Region ---

export interface RecommendedTool {
  name: string;
  description: string;
  cta: string;
  href: string;
  tag: string;
}

export const RECOMMENDED_TOOLS: Record<PresetKey, RecommendedTool[]> = {
  USA: [
    { 
      name: "Centier Bank (via Raisin)", 
      description: "Earn 3.95% APY + up to $1,500 bonus with code FRESHSTART.", 
      cta: "Claim $1,500 Bonus", 
      href: "https://raisin.sjv.io/c/7012475/3806997/14380", 
      tag: "Best Rate" 
    },
    { 
      name: "Raisin", 
      description: "Access high-yield savings products from dozens of banks through a single account.", 
      cta: "Explore All Rates", 
      href: "https://raisin.sjv.io/c/7012475/3806997/14380",
      tag: "Marketplace" 
    },
  ],

  UK: [
    {
      name: "Raisin UK",
      description: "Compare UK savings rates and see how much more your money could earn. Access fixed and easy-access accounts up to ~4.60% AER.",
      cta: "Compare savings accounts",
      href: "https://raisin-uk.pxf.io/VOOLK3",
      tag: "Best Rates",
    },
    {
      name: "Zopa",
      description: "Simple, high-interest savings with FSCS protection and flexible access.",
      cta: "Open Zopa Account",
      href: "#zopa-uk",
      tag: "Savings",
    },
  ],

  EU: [
    { 
      name: "Revolut", 
      description: "Multi-currency savings vaults across the EU.", 
      cta: "Open Revolut Account", 
      href: "#revolut-eu", 
      tag: "Savings" 
    },
    { 
      name: "N26", 
      description: "German-licensed neobank with instant savings.", 
      cta: "Open N26 Account", 
      href: "#n26-eu", 
      tag: "Savings" 
    },
    { 
      name: "Trade Republic", 
      description: "Interest on uninvested cash with no lock-in.", 
      cta: "Open Trade Republic Account", 
      href: "#traderepublic-eu", 
      tag: "Savings + Investing" 
    },
  ],
};
