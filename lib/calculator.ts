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
  // India
  IN: "IN",
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
    { name: "SoFi", description: "4.50% APY, no minimums, FDIC-insured. The default starter HYSA.", cta: "Open SoFi Account", href: "#sofi-us", tag: "HYSA" },
    { name: "Ally Bank", description: "Consistently top-tier rates with the best banking app in the US.", cta: "Open Ally Account", href: "#ally-us", tag: "HYSA" },
    { name: "Wealthfront", description: "Often the highest APY. Automated savings features built in.", cta: "Open Wealthfront Account", href: "#wealthfront-us", tag: "HYSA + Investing" },
  ],
  UK: [
    { name: "Zopa", description: "Leading UK savings rate with easy instant access and FSCS protection.", cta: "Open Zopa Account", href: "#zopa-uk", tag: "Savings" },
    { name: "Chase UK", description: "1.5% everyday cashback on debit, linked savings at competitive rates.", cta: "Open Chase UK Account", href: "#chase-uk", tag: "Current + Savings" },
    { name: "Monzo", description: "Instant access pots with competitive rates and smart budgeting tools.", cta: "Open Monzo Account", href: "#monzo-uk", tag: "Savings" },
  ],
  EU: [
    { name: "Revolut", description: "Multi-currency savings vaults with competitive flexible rates across the EU.", cta: "Open Revolut Account", href: "#revolut-eu", tag: "Savings" },
    { name: "N26", description: "German-licensed neobank with instant savings and no hidden fees.", cta: "Open N26 Account", href: "#n26-eu", tag: "Savings" },
    { name: "Trade Republic", description: "4% interest on uninvested cash with no lock-in. Simple, no-nonsense.", cta: "Open Trade Republic Account", href: "#traderepublic-eu", tag: "Savings + Investing" },
  ],
  IN: [
    { name: "FD via Bajaj Finance", description: "Up to 8.60% on fixed deposits. India's top-rated NBFC.", cta: "Open Bajaj FD", href: "#bajaj-in", tag: "Fixed Deposit" },
    { name: "Fi Money", description: "Smart deposits with up to 7%+ returns and instant liquidity.", cta: "Open Fi Account", href: "#fi-in", tag: "Smart Deposit" },
    { name: "Kuvera", description: "Invest in debt mutual funds with no commissions. Clean, ad-free.", cta: "Open Kuvera Account", href: "#kuvera-in", tag: "Debt Funds" },
  ],
};
