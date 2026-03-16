import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - Worth It? Index",
  description:
    "Terms of Service for Worth It? Index. Important financial disclaimers and usage terms.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Minimal header */}
      <header className="border-b bg-card/97 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to Calculators
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-12">
        {/* Title */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="size-4 text-primary" />
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
              Legal Document
            </p>
          </div>
          <h1 className="mb-2 text-3xl font-black text-foreground">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: February 2026
          </p>
        </div>

        {/* Financial Disclaimer -- prominent */}
        <div className="mb-10 rounded-xl border-2 border-destructive/25 bg-destructive/5 px-5 py-4">
          <p className="mb-1.5 text-[11px] font-extrabold uppercase tracking-widest text-destructive">
            Financial Disclaimer
          </p>
          <p className="text-[13.5px] font-semibold leading-relaxed text-foreground/90">
            We are not financial advisors. All calculations are estimates. Users
            should verify all rates and terms with the bank directly before
            signing up. Nothing on this site constitutes financial, legal, or tax
            advice. Always consult a licensed professional for decisions
            involving your money.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using Worth It? Index
              {"(\"the Service\", \"we\", \"us\")"}, you agree to be bound by
              these Terms of Service. If you do not agree, do not use the
              Service.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              Worth It? Index provides free, interactive financial calculators
              for educational purposes. The Service includes savings
              comparisons, EV breakeven analysis, and general financial
              information. We also display recommendations for financial
              products from partner banks.
            </p>
          </Section>

          <Section title="3. Not Financial Advice">
            <p>
              The information provided by this Service is for{" "}
              <strong>general informational and educational purposes only</strong>.
              It does not constitute financial advice, investment advice, tax
              advice, or legal advice.
            </p>
            <div className="rounded-lg border bg-secondary/30 px-4 py-3">
              <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-foreground/70">
                Specifically:
              </p>
              <ul className="ml-1 flex list-none flex-col gap-1.5">
                <Li>
                  All interest rates, APYs, and savings projections are{" "}
                  <strong>estimates based on user inputs</strong> and are not
                  guaranteed
                </Li>
                <Li>
                  Rates shown are point-in-time and may change without notice
                </Li>
                <Li>
                  Actual returns depend on bank terms, compounding frequency,
                  fees, and other factors not modeled here
                </Li>
                <Li>
                  EV breakeven calculations use simplified models and do not
                  account for all ownership variables
                </Li>
                <Li>
                  Tax implications (capital gains, state taxes, EV credits) vary
                  by jurisdiction and individual circumstances
                </Li>
              </ul>
            </div>
            <p>
              You should always verify rates, terms, and eligibility directly
              with the financial institution before opening any account or
              making financial decisions.
            </p>
          </Section>

          <Section title="4. Affiliate Relationships">
            <p>
              Worth It? Index participates in affiliate programs with certain
              financial institutions. When you click a partner link and open an
              account, we may receive a commission at no additional cost to you.
            </p>
            <p>
              Affiliate relationships{" "}
              <strong>do not influence our calculator results</strong>. The math
              engine operates independently of our commercial partnerships.
              Recommended products are selected based on publicly available
              rates, features, and user-region relevance.
            </p>
          </Section>

          <Section title="5. Accuracy and Completeness">
            <p>
              We make reasonable efforts to ensure the accuracy of the
              information on this site, but we make{" "}
              <strong>no warranties or guarantees</strong> regarding its
              completeness, accuracy, reliability, or suitability for any
              purpose. Information may be outdated, incomplete, or contain
              errors.
            </p>
          </Section>

          <Section title="6. User Conduct">
            <p>You agree not to:</p>
            <ul className="ml-1 mt-2 flex list-none flex-col gap-1.5">
              <Li>
                Use the Service for any unlawful purpose or in violation of
                any applicable laws
              </Li>
              <Li>
                Attempt to reverse-engineer, scrape, or automate access to the
                Service beyond normal usage
              </Li>
              <Li>
                Misrepresent results from the Service as professional financial
                advice to others
              </Li>
            </ul>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Worth It? Index and its
              creators shall not be liable for any direct, indirect, incidental,
              special, or consequential damages arising from your use of the
              Service, reliance on calculator outputs, or actions taken based on
              information presented on this site.
            </p>
          </Section>

          <Section title="8. Third-Party Links">
            <p>
              The Service contains links to third-party websites (e.g., bank
              account opening pages). We are not responsible for the content,
              privacy practices, or terms of any third-party site. Use of
              third-party services is at your own risk and subject to their
              respective terms.
            </p>
          </Section>

          <Section title="9. Modifications to Terms">
            <p>
              We reserve the right to modify these Terms at any time. Changes
              will be posted on this page with an updated{" "}
              {"\"Last updated\""} date. Your continued use of the Service
              after any changes constitutes acceptance of the new Terms.
            </p>
          </Section>

          <Section title="10. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the United States, without regard to conflict of law
              provisions.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              For questions about these Terms, contact us at{" "}
              <a
                href="mailto:worth.it.app@outlook.com"
                className="font-semibold text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
              >
                worth.it.app@outlook.com
              </a>
              .
            </p>
          </Section>
        </div>
      </main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-extrabold text-foreground">{title}</h2>
      <div className="flex flex-col gap-3 text-[13.5px] leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/60" />
      <span>{children}</span>
    </li>
  );
}
