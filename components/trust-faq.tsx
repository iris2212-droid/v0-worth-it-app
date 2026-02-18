"use client";

import { ShieldCheck, Zap, TrendingDown, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FaqEntry {
  id: string;
  question: string;
  icon: React.ReactNode;
  tag: string;
  reality: string;
  tip: string;
}

const FAQ_ENTRIES: FaqEntry[] = [
  {
    id: "safety",
    question: "Is my money safe? This feels like a scam.",
    icon: <ShieldCheck className="size-4" />,
    tag: "Safety",
    reality:
      "If the bank is FDIC insured (USA), FSCS protected (UK), or covered by the EU Deposit Guarantee, your money is legally as safe as it is at a giant bank like Chase or Barclays.",
    tip: 'Never put your money in a "Fintech" that isn\'t backed by a regulated bank. All our recommendations are 100% insured up to local limits (e.g., $250k in the US).',
  },
  {
    id: "access",
    question: "How fast can I get my money if my car breaks down?",
    icon: <Zap className="size-4" />,
    tag: "Access",
    reality:
      'This is the #1 reason people don\'t switch. Most online banks take 1 to 3 business days to transfer money back to your "normal" checking account.',
    tip: "Keep $500-$1,000 in your old bank for immediate \"right now\" emergencies. Move the rest to the high-yield account to earn the interest.",
  },
  {
    id: "rates",
    question: "Will the interest rate drop next month?",
    icon: <TrendingDown className="size-4" />,
    tag: "Rates",
    reality:
      'Yes, it might. High-yield rates are "variable," meaning they follow the Central Bank. If the economy changes, the rate changes.',
    tip: "Even if the rate drops from 4.5% to 3.5%, it is still 350x better than the 0.01% your old bank is likely paying you.",
  },
  {
    id: "setup",
    question: "Is it a hassle to set up?",
    icon: <Clock className="size-4" />,
    tag: "Setup",
    reality:
      "It takes about 8 minutes. You just need your ID and your current bank's login. It's easier than ordering a pizza on a slow app.",
    tip: "Most banks verify your identity instantly. You can link your existing checking account during signup and set a recurring transfer in under 2 minutes.",
  },
];

export function TrustFAQ() {
  return (
    <div className="flex flex-col gap-6">
      {/* Section header */}
      <div className="flex flex-col items-center text-center">
        <Badge
          variant="outline"
          className="mb-3 border-primary/20 bg-accent px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-accent-foreground"
        >
          Trust Package
        </Badge>
        <h2 className="mb-2 text-2xl font-black text-foreground sm:text-3xl text-balance">
          Is it actually <span className="text-primary">worth it?</span> FAQ
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
          The four questions everyone asks before switching. No fluff, real
          answers, zero sales pitch.
        </p>
      </div>

      <Separator />

      {/* Accordion FAQ */}
      <Accordion type="single" collapsible className="w-full">
        {FAQ_ENTRIES.map((entry, index) => (
          <AccordionItem
            key={entry.id}
            value={entry.id}
            className="border-b border-border/60 last:border-b-0"
          >
            <AccordionTrigger className="gap-3 py-5 hover:no-underline [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  {entry.icon}
                </span>
                <div className="flex flex-col items-start gap-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-muted-foreground/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Badge
                      variant="outline"
                      className="border-border/50 px-1.5 py-0 text-[9px] font-bold text-muted-foreground"
                    >
                      {entry.tag}
                    </Badge>
                  </div>
                  <span className="text-sm font-bold text-foreground leading-snug">
                    {`"${entry.question}"`}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-5 pl-11">
              <div className="flex flex-col gap-4">
                {/* The Reality */}
                <div className="rounded-lg border border-border/60 bg-secondary/50 p-4">
                  <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                    The Reality
                  </p>
                  <p className="text-[13px] leading-relaxed text-foreground">
                    {entry.reality}
                  </p>
                </div>

                {/* Worth It Tip */}
                <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <div className="size-1.5 rounded-full bg-primary" />
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                      Worth It Tip
                    </p>
                  </div>
                  <p className="text-[13px] leading-relaxed text-foreground">
                    {entry.tip}
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Bottom trust strip */}
      <div className="flex items-center justify-center gap-4 rounded-lg bg-secondary/60 px-4 py-3">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
          <ShieldCheck className="size-3 text-primary" />
          FDIC / FSCS / EU Covered
        </div>
        <Separator orientation="vertical" className="h-3" />
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
          <Zap className="size-3 text-primary" />
          8-Minute Setup
        </div>
        <Separator orientation="vertical" className="h-3" />
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
          <Clock className="size-3 text-primary" />
          1-3 Day Transfers
        </div>
      </div>
    </div>
  );
}
