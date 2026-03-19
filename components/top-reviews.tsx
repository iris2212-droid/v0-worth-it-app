"use client";

import {
  ShieldCheck,
  ExternalLink,
  Zap,
  Building2,
  AlertTriangle,
  ArrowRight,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ReviewHighlight {
  icon: React.ReactNode;
  label: string;
}

interface ReviewCard {
  id: string;
  name: string;
  apy: string;
  highlights: ReviewHighlight[];
  caveat?: { label: string; text: string };
  verdict: string;
  cta: string;
  href: string;
}

const REVIEWS: ReviewCard[] = [
  {
    id: "sofi",
    name: "SoFi",
    apy: "4.50%",
    highlights: [
      { icon: <Star className="size-3.5" />, label: "4.50% APY with direct deposit" },
      { icon: <ShieldCheck className="size-3.5" />, label: "FDIC insured up to $2M via partner banks" },
      { icon: <Zap className="size-3.5" />, label: "No account fees, no minimums" },
    ],
    caveat: {
      label: "Wait! Read this",
      text: "The 4.50% rate requires a qualifying direct deposit. Without it, you get 1.00%. Make sure your paycheck goes here first.",
    },
    verdict:
      "Best all-in-one option if you route your paycheck through it. The direct deposit unlock is the key -- do that, and it beats almost everyone.",
    cta: "Check SoFi Rates",
    href: "https://www.sofi.com/banking/", // Replace with your link if applicable
  },
  {
    id: "wealthfront",
    name: "Wealthfront",
    apy: "4.25%",
    highlights: [
      { icon: <Zap className="size-3.5" />, label: "Fastest transfers -- often same-day" },
      { icon: <Star className="size-3.5" />, label: "High APY with no hoops to jump through" },
      { icon: <ShieldCheck className="size-3.5" />, label: "FDIC insured up to $8M via partner banks" },
    ],
    verdict:
      "The no-strings-attached pick. High APY without needing direct deposit, plus the fastest transfer times in the category. Set it and forget it.",
    cta: "View Wealthfront",
    href: "https://www.wealthfront.com/cash", // Replace with your link if applicable
  },
  {
    id: "centier-bank",
    name: "Centier Bank (via Raisin)",
    apy: "3.95% APY + Bonus",
    highlights: [
      { icon: <Building2 className="size-3.5" />, label: "Up to $1,500 bonus with code HEADSTART" },
      { icon: <ShieldCheck className="size-3.5" />, label: "No monthly fees or minimums" },
      { icon: <Star className="size-3.5" />, label: "FDIC insured via partner banks" },
    ],
    verdict:
      "The 'Mathematical Winner.' When you factor in the potential Up to $1,500 bonus, this is the highest effective yield on the market for 2026.",
    cta: "Claim Up to $1,500 Bonus",
    href: "https://raisin.sjv.io/c/7012475/3806997/14380",
  },
];

export function TopReviews() {
  return (
    <div className="flex flex-col gap-6">
      {/* Section header */}
      <div className="flex flex-col items-center text-center px-4">
        <Badge
          variant="outline"
          className="mb-3 border-primary/20 bg-accent px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-accent-foreground"
        >
          Verified Reviews
        </Badge>
        <h2 className="mb-2 text-2xl font-black text-foreground sm:text-3xl text-balance">
          Top Recommendations
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
          Three US-based banks we actually trust. Verified for 2026 through honest math and first-hand research.
        </p>
      </div>

      <Separator />

      {/* Review cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {REVIEWS.map((review) => (
          <Card
            key={review.id}
            className="flex flex-col gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md"
          >
            {/* Top verified strip */}
            <div className="flex items-center justify-between bg-secondary/60 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Verified
                </span>
              </div>
              <Badge
                variant="outline"
                className="border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-black text-primary whitespace-nowrap"
              >
                {review.apy} APY
              </Badge>
            </div>

            <CardHeader className="gap-1 px-5 pt-5 pb-3">
              <CardTitle className="text-base font-black text-foreground leading-tight">
                {review.name}
              </CardTitle>
              <CardDescription className="text-[11px] leading-relaxed">
                US-based, FDIC insured
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow flex flex-col gap-4 px-5 pb-4">
              {/* Highlight list */}
              <ul className="flex flex-col gap-2.5" role="list">
                {review.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      {h.icon}
                    </span>
                    <span className="text-xs font-medium leading-tight text-foreground">
                      {h.label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Caveat callout */}
              {review.caveat && (
                <div className="rounded-lg border-2 border-chart-4/30 bg-chart-4/5 p-3">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="size-3.5 text-chart-4" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-chart-4">
                      {review.caveat.label}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-foreground/80">
                    {review.caveat.text}
                  </p>
                </div>
              )}

              {/* The Verdict */}
              <div className="mt-auto rounded-lg bg-secondary/70 p-3">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <div className="size-1.5 rounded-full bg-primary" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                    The Verdict
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-foreground/80 italic">
                  &ldquo;{review.verdict}&rdquo;
                </p>
              </div>
            </CardContent>

            <CardFooter className="px-5 pb-5 pt-0">
              <Button asChild className="w-full h-auto py-3 px-2 gap-2 font-bold leading-tight text-center whitespace-normal overflow-hidden">
                <a
                  href={review.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <span className="text-[11px]">{review.cta}</span>
                  <ArrowRight className="size-3.5 shrink-0" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex items-center justify-center gap-2 rounded-lg bg-secondary/50 px-4 py-2.5 text-center">
        <ExternalLink className="size-3 text-muted-foreground/50 shrink-0" />
        <p className="text-[10px] text-muted-foreground/60">
          Worth It? is reader-supported. We may earn a commission if you open an account. Rates as of early 2026.
        </p>
      </div>
    </div>
  );
}
