import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - Worth It? Index",
  description:
    "How Worth It? Index handles your data. We collect minimal anonymous data and never sell personal information.",
};

export default function PrivacyPolicyPage() {
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
              <Shield className="size-4 text-primary" />
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
              Legal Document
            </p>
          </div>
          <h1 className="mb-2 text-3xl font-black text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: February 2026
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8">
          <Section title="1. Overview">
            <p>
              Worth It? Index {"(\"we,\" \"us,\" or \"our\")"} operates the
              worthitindex.app website. This page informs you of our policies
              regarding the collection, use, and disclosure of information when
              you use our service.
            </p>
            <p>
              We are committed to transparency. This site exists to help you
              make better financial decisions with math -- not to harvest your
              data.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <Subsection title="Anonymous Location Data">
              <p>
                We use your IP address to detect your approximate country of
                residence. This allows us to auto-configure the correct
                currency, unit system, and regional recommendations. This data
                is processed anonymously through a third-party geolocation
                service (ipapi.co) and is <strong>not stored</strong> on our
                servers or linked to any personal identifier.
              </p>
            </Subsection>
            <Subsection title="Cookies and Tracking">
              <p>
                We use cookies strictly for affiliate link attribution. When you
                click a partner link (e.g., {"\"Open SoFi Account\""}), a cookie
                may be set so that the partner bank can credit us for the
                referral. These cookies are:
              </p>
              <ul className="ml-1 mt-2 flex list-none flex-col gap-1.5">
                <Li>First-party or partner-set only -- no ad networks</Li>
                <Li>Used solely for affiliate commission tracking</Li>
                <Li>Never used to build advertising profiles</Li>
                <Li>
                  Subject to standard browser controls (you can block them
                  anytime)
                </Li>
              </ul>
            </Subsection>
            <Subsection title="Calculator Inputs">
              <p>
                All values you enter into our calculators (deposit amounts,
                rates, mileage, etc.) are processed entirely in your browser.
                We <strong>do not</strong> transmit, store, or log any
                calculator inputs.
              </p>
            </Subsection>
          </Section>

          <Section title="3. Information We Do NOT Collect">
            <ul className="ml-1 flex list-none flex-col gap-1.5">
              <Li>Names, email addresses, or phone numbers</Li>
              <Li>Financial account numbers or balances</Li>
              <Li>Social Security numbers or government IDs</Li>
              <Li>Browsing history outside of this site</Li>
            </ul>
          </Section>

          <Section title="4. We Do Not Sell Personal Data">
            <p>
              We do not sell, rent, trade, or otherwise share personal
              information with third parties for their marketing purposes.
              Period. This is not a data business. It is a math tool.
            </p>
          </Section>

          <Section title="5. Third-Party Services">
            <p>
              Our site may contain links to partner bank websites. When you
              click these links, you leave our site and are subject to the
              privacy policies of those third parties. We encourage you to read
              their policies before providing any personal information.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              Since we do not collect personal data, there is nothing to retain
              or delete. Anonymous geolocation lookups are not logged. Cookie
              data is managed by your browser and the partner{"'"}s standard
              cookie policies.
            </p>
          </Section>

          <Section title="7. Children's Privacy">
            <p>
              Our service is not directed to anyone under the age of 18. We do
              not knowingly collect information from children.
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated {"\"Last updated\""} date.
              Continued use of the site after changes constitutes acceptance.
            </p>
          </Section>

          <Section title="9. Contact Us">
            <p>
              If you have questions about this Privacy Policy, contact us at{" "}
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

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-secondary/30 px-4 py-3">
      <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-foreground/70">
        {title}
      </p>
      {children}
    </div>
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
