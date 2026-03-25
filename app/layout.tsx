import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _inter = Inter({ subsets: ["latin"] });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Worth It? Index — Real Math, No Salesmen',
  description: 'Interactive financial calculators that cut through the noise. Compare HYSA vs big banks and calculate EV breakeven points.',
  generator: 'v0.app',
  metadataBase: new URL('https://worthitindex.com'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: "MKryDx7XS6jEgZCJVOESbTFfjhkY1MUgTfI0LtIRDLQ",
    other: {
      "impact-site-verification": "11c4d98e-c4d4-48ca-96ef-5cb368827ab4"
    }
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased flex flex-col min-h-screen bg-white">
        
        {/* Main Content Area */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* --- COMPLIANCE & TRUST FOOTER --- */}
        <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6 mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              
              {/* Brand Info */}
              <div>
                <h3 className="text-slate-900 font-bold text-xl mb-3 underline decoration-blue-500 decoration-2">
                  Worth It? Index
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The "Real Math" platform for financial optimizers. We build interactive tools to help you cut through marketing noise and see the actual numbers behind your money.
                </p>
              </div>

              {/* Contact & Support */}
              <div className="md:text-right">
                <h4 className="text-slate-800 font-semibold mb-2">Support & Partnerships</h4>
                <p className="text-slate-600 text-sm mb-2">Have a suggestion for a calculator?</p>
                <a href="mailto:worth.it.app@outlook.com" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                  worth.it.app@outlook.com
                </a>
              </div>
            </div>

            {/* LEGAL DISCLAIMER - Critical for AU/US Approval */}
            <div className="border-t border-slate-200 pt-8">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h5 className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-3">Legal & Disclosures</h5>
                <p className="text-slate-500 text-[12px] leading-relaxed">
                  <strong>Financial Disclaimer:</strong> The calculations provided by Worth It? Index are for illustrative and educational purposes only. 
                  Calculations are based on user inputs and market averages which may change. <strong>We do not provide financial advice.</strong> 
                  Please consult with a licensed financial professional in your jurisdiction (e.g., ASIC in Australia) before making financial decisions.
                </p>
                <p className="text-slate-500 text-[12px] mt-4 leading-relaxed">
                  <strong>Affiliate Disclosure:</strong> To keep this platform free and ad-free, we may receive a commission if you click on 
                  certain links or sign up for services mentioned on this site. This does not impact the objectivity of our math-driven results.
                </p>
              </div>
              <p className="text-center text-slate-400 text-[10px] mt-8 uppercase tracking-widest">
                © {new Date().getFullYear()} Worth It? Index — Built for the Optimizers.
              </p>
            </div>
          </div>
        </footer>
        
        <Analytics />
      </body>
    </html>
  )
}
