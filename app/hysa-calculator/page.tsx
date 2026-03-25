import { Metadata } from 'next'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { BestHighYieldCalculator } from "@/components/best-high-yield-calculator"
import { TopReviews } from "@/components/top-reviews"

export const metadata: Metadata = {
  title: 'High Yield Savings Calculator — Worth It? Index',
  description: 'Calculate your "Lazy Tax" and see how much interest you are losing at big banks. Find the best HYSA rates for 2026.',
  alternates: {
    canonical: 'https://worthitindex.com/hysa-calculator',
  },
}

export default function HYSAPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              High Yield Savings Index
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The mathematical truth about your savings. Calculate the "Lazy Tax" you pay to big banks every year.
            </p>
          </section>

          <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <BestHighYieldCalculator />
          </div>

          <section className="pt-8 border-t">
            <h2 className="text-3xl font-bold text-center mb-8">
              Stop the Bleeding: Top Mathematical Winners
            </h2>
            <TopReviews />
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
