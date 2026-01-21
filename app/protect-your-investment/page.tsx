"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, FileCheck, Building2, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ProtectYourInvestmentPage() {
  const router = useRouter()
  const safetyGuidelines = [
    {
      number: 1,
      title: "Never Wire Money Directly to Individuals",
      description:
        "For lenders: Never send funds directly to a borrower's personal or business bank account. For borrowers: No legitimate lender will ask you to wire money directly to them.",
      highlight: false,
    },
    {
      number: 2,
      title: "Legitimate Transactions Use Third Parties",
      description:
        "All legitimate real estate transactions involve neutral third parties like title companies or closing attorneys. If someone is pressuring you to skip this step, it's a red flag.",
      highlight: false,
    },
    {
      number: 3,
      title: "Always Use a Title Company or Closing Attorney",
      description:
        "All funds must go through a licensed title company or closing attorney. No exceptions. This protects both parties and ensures proper documentation and legal compliance.",
      highlight: true,
    },
    {
      number: 4,
      title: "Always Get a Receipt",
      description:
        "Keep documentation of every transaction. Receipts, wire confirmations, and closing statements are your proof of payment and protect you in case of disputes.",
      highlight: false,
    },
    {
      number: 5,
      title: "Be Skeptical of 'Too Good to Be True' Deals",
      description:
        "If something seems unusually cheap or the returns seem impossibly high, investigate thoroughly. There's usually a catch—hidden repairs, title issues, or worse.",
      highlight: false,
    },
    {
      number: 6,
      title: "Secure Investments with a Promissory Note",
      description:
        "Ensure all terms and conditions are documented in a formal promissory note. This legally binding document protects both lender and borrower by clearly defining repayment terms.",
      highlight: false,
    },
    {
      number: 7,
      title: "Record a Mortgage Against the Property",
      description:
        "Protect your investment with a recorded mortgage so the property cannot be sold or refinanced without your approval. This gives you a legal claim to the property.",
      highlight: false,
    },
    {
      number: 8,
      title: "Require Insurance Coverage",
      description:
        "Make sure you're listed as a beneficiary or loss payee on all relevant insurance policies (builder's risk, lender policy, landlord policy). This protects your investment if something goes wrong.",
      highlight: false,
    },
    {
      number: 9,
      title: "Read Everything Before Signing",
      description:
        "Never sign documents that give someone else permission to move your money without your explicit consent. Take time to review all contracts and ask questions if anything is unclear.",
      highlight: false,
    },
    {
      number: 10,
      title: "Know Your Title Policy Coverage",
      description:
        "If something goes wrong with the property title, file a claim through your title policy to see if your loss is covered. Title insurance exists to protect you from hidden defects.",
      highlight: false,
    },
    {
      number: 11,
      title: "Reminder: All Funds Go Through Title Companies",
      description:
        "This is so important we're saying it twice. Always use a title company or closing attorney for all fund transfers. This single rule prevents the majority of real estate fraud.",
      highlight: false,
    },
  ]

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00FF84]/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#00FF84]/10 text-[#00FF84] border-[#00FF84]/20 hover:bg-[#00FF84]/20">
              <Shield className="h-3 w-3 mr-1" />
              Safety First
            </Badge>
            <h1 className="font-space-grotesk text-5xl md:text-7xl font-bold mb-6 text-balance">
              Protect Your <span className="text-[#00FF84]">Investment</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4 text-pretty max-w-2xl mx-auto leading-relaxed">
              Essential Safety Guidelines for Real Estate Transactions
            </p>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
              Knowledge is your best defense. Review these important safety measures to protect yourself and your
              investments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Safety Guidelines */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {safetyGuidelines.map((guideline) => (
              <Card
                key={guideline.number}
                className={`border-border/50 backdrop-blur ${
                  guideline.highlight ? "bg-[#00FF84]/5 border-[#00FF84]/30" : "bg-card/50"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`h-12 w-12 rounded-lg flex items-center justify-center font-bold text-xl ${
                          guideline.highlight ? "bg-[#00FF84] text-black" : "bg-[#00FF84]/10 text-[#00FF84]"
                        }`}
                      >
                        {guideline.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-space-grotesk text-xl font-bold mb-2 flex items-start gap-2">
                        {guideline.title}
                        {guideline.highlight && <AlertTriangle className="h-5 w-5 text-[#00FF84] flex-shrink-0 mt-1" />}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{guideline.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Critical Reminder Callout */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-[#00FF84]/30 bg-[#00FF84]/5 backdrop-blur">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-lg bg-[#00FF84] flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-black" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-space-grotesk text-2xl md:text-3xl font-bold mb-4">
                    Critical Rule: Use a Title Company
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    This single rule prevents the majority of real estate fraud. A licensed title company or closing
                    attorney acts as a neutral third party, ensuring all funds are handled properly and all legal
                    requirements are met.
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    If someone asks you to skip this step, walk away immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold mb-4">Stay Informed, Stay Protected</h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                These guidelines are just the beginning. Continue your education with our free resources.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mb-4">
                    <FileCheck className="h-6 w-6 text-[#00FF84]" />
                  </div>
                  <h3 className="font-space-grotesk text-xl font-bold mb-2">Download Contract Templates</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Access professionally drafted contracts and agreements to protect your deals.
                  </p>
                  <Link href="/resources">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-[#00FF84]" />
                  </div>
                  <h3 className="font-space-grotesk text-xl font-bold mb-2">Work With Trusted Partners</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    I only connect you with vetted professionals who follow these safety guidelines.
                  </p>
                  <Link href="/submit-deal">
                    <Button variant="outline" className="w-full bg-transparent">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#00FF84]/5 to-transparent">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-[#00FF84]/20 bg-card/50 backdrop-blur">
            <CardContent className="p-12 text-center">
              <h2 className="font-space-grotesk text-3xl md:text-4xl font-bold mb-4">
                Questions? Contact Us for Guidance
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
                Not sure if a deal is legitimate? Need help understanding these guidelines? I'm here to help you
                navigate safely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/submit-deal">
                  <Button size="lg" className="bg-[#00FF84] text-black hover:bg-[#00FF84]/90 text-lg px-8">
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-transparent"
                  onClick={() => {
                    router.push("/resources")
                    setTimeout(() => window.scrollTo(0, 0), 100)
                  }}
                >
                  Download Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
