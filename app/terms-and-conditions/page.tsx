"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp, Menu, X } from "lucide-react"
import Link from "next/link"

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)

      // Update active section based on scroll position
      const sections = document.querySelectorAll(".terms-section")
      let current = ""

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        if (window.scrollY >= sectionTop - 100) {
          current = section.id
        }
      })

      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setTocOpen(false)
    }
  }

  const tocSections = [
    { id: "section-1", title: "1. Acceptance of Terms" },
    { id: "section-2", title: "2. Definitions" },
    { id: "section-3", title: "3. Business Entity Structure" },
    { id: "section-4", title: "4. Employment Disclaimer", critical: true },
    { id: "section-5", title: "5. Eligibility" },
    { id: "section-6", title: "6. Services Provided" },
    { id: "section-7", title: "7. User Obligations" },
    { id: "section-8", title: "8. Confidentiality" },
    { id: "section-9", title: "9. Intellectual Property" },
    { id: "section-10", title: "10. Fees and Payment" },
    { id: "section-11", title: "11. Disclaimers", critical: true },
    { id: "section-12", title: "12. Limitation of Liability", critical: true },
    { id: "section-13", title: "13. Indemnification" },
    { id: "section-14", title: "14. Dispute Resolution", critical: true },
    { id: "section-15", title: "15. Termination" },
    { id: "section-16", title: "16. Modifications" },
    { id: "section-17", title: "17. General Provisions" },
    { id: "section-18", title: "18. Real Estate Law Compliance" },
    { id: "section-19", title: "19. SMS Terms" },
    { id: "section-20", title: "20. Contact Information" },
    { id: "section-21", title: "21. Acknowledgment" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#00FF84] flex items-center justify-center">
                <span className="text-black font-bold text-lg">S</span>
              </div>
              <span className="font-space-grotesk text-xl font-bold">SendKyleDeals</span>
            </Link>
            <Button variant="ghost" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex gap-8">
          {/* Desktop Sticky Sidebar TOC */}
          <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <h3 className="font-space-grotesk font-semibold mb-4 text-sm uppercase tracking-wide">
                Table of Contents
              </h3>
              <ul className="space-y-1">
                {tocSections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`text-sm text-left w-full py-1.5 px-2 rounded transition-colors ${
                        activeSection === section.id
                          ? "text-[#00FF84] bg-[#00FF84]/10 font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      } ${section.critical ? "flex items-center gap-2" : ""}`}
                    >
                      {section.critical && <span className="h-1.5 w-1.5 rounded-full bg-red-500" />}
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Mobile TOC Toggle */}
          <div className="lg:hidden fixed bottom-4 right-4 z-50">
            <Button
              onClick={() => setTocOpen(!tocOpen)}
              className="rounded-full h-12 w-12 shadow-lg bg-[#00FF84] text-black hover:bg-[#00FF84]/90"
            >
              {tocOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile TOC Overlay */}
          {tocOpen && (
            <div className="lg:hidden fixed inset-0 bg-background/95 backdrop-blur z-40 overflow-y-auto p-4">
              <div className="max-w-md mx-auto pt-16">
                <h3 className="font-space-grotesk font-semibold mb-4 text-lg">Table of Contents</h3>
                <ul className="space-y-2">
                  {tocSections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`text-sm text-left w-full py-2 px-3 rounded transition-colors ${
                          activeSection === section.id
                            ? "text-[#00FF84] bg-[#00FF84]/10 font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        } ${section.critical ? "flex items-center gap-2" : ""}`}
                      >
                        {section.critical && <span className="h-2 w-2 rounded-full bg-red-500" />}
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold text-[#00FF84] mb-4">
                TERMS AND CONDITIONS
              </h1>
              <div className="text-sm text-muted-foreground space-y-1 mb-6">
                <p>Last Updated: January 15, 2025</p>
                <p>Effective Date: January 15, 2025</p>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Please read these terms carefully before using our platform. By using SendKyleDeals, you agree to be
                bound by these terms.
              </p>
            </div>

            {/* Section 1: Acceptance of Terms */}
            <section id="section-1" className="terms-section mb-12 scroll-mt-24">
              <h2 className="font-space-grotesk text-2xl font-bold mb-4">1. ACCEPTANCE OF TERMS</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms and Conditions ("Terms") constitute a legally binding agreement between you and
                MikeLowreyHoldingsLLC, doing business as SendKyleDeals ("we," "us," "our," or "the Platform"). By
                accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound
                by these Terms.
              </p>
              <div className="bg-[#00FF84]/10 border-l-4 border-[#00FF84] p-4 rounded">
                <p className="text-sm">
                  <strong>IMPORTANT:</strong> These terms contain a binding arbitration clause and class action waiver
                  in Section 14.
                </p>
              </div>
            </section>

            {/* Section 2: Definitions */}
            <section id="section-2" className="terms-section mb-12 scroll-mt-24">
              <h2 className="font-space-grotesk text-2xl font-bold mb-4">2. DEFINITIONS</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <strong className="text-foreground">"Platform"</strong> refers to SendKyleDeals, including the
                  website, services, and all related tools.
                </li>
                <li>
                  <strong className="text-foreground">"User"</strong> refers to any individual or entity accessing or
                  using the Platform.
                </li>
                <li>
                  <strong className="text-foreground">"Deal"</strong> refers to any real estate investment opportunity
                  submitted, shared, or facilitated through the Platform.
                </li>
                <li>
                  <strong className="text-foreground">"Services"</strong> refers to connection, facilitation, and
                  networking services provided by the Platform.
                </li>
              </ul>
            </section>

            {/* Section 3: Business Entity Structure */}
            <section id="section-3" className="terms-section mb-12 scroll-mt-24">
              <h2 className="font-space-grotesk text-2xl font-bold mb-4">3. BUSINESS ENTITY STRUCTURE</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SendKyleDeals is a trade name of MikeLowreyHoldingsLLC, a Wyoming limited liability company. All
                references to "SendKyleDeals," "we," "us," or "our" refer to MikeLowreyHoldingsLLC.
              </p>
            </section>

            {/* Section 4: Employment Disclaimer (CRITICAL) */}
            <section id="section-4" className="terms-section critical-section mb-12 scroll-mt-24">
              <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-red-400">4. EMPLOYMENT DISCLAIMER</h2>
              <div className="bg-red-950/30 border-2 border-red-500 rounded-lg p-6 mb-6">
                <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                  <span>⚠️</span> IMPORTANT DISCLAIMER
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  The owner/operator of SendKyleDeals is employed by JPMorgan Chase & Co. in a capacity completely
                  separate from this platform. SendKyleDeals is an independent business venture with no connection,
                  affiliation, endorsement, or relationship with JPMorgan Chase & Co.
                </p>
              </div>

              <h3 className="font-semibold text-lg mb-3">4.1 No Connection to JPMorgan Chase</h3>
              <p className="text-muted-foreground mb-3">
                <strong>YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT:</strong>
              </p>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex gap-3">
                  <span className="text-[#00FF84] font-bold">•</span>
                  <span>
                    <strong className="text-foreground">No Affiliation:</strong> SendKyleDeals has no connection,
                    affiliation, partnership, or relationship with JPMorgan Chase & Co.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00FF84] font-bold">•</span>
                  <span>
                    <strong className="text-foreground">Separate Business:</strong> This is a completely independent
                    business venture operated outside of employment hours.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00FF84] font-bold">•</span>
                  <span>
                    <strong className="text-foreground">No Liability:</strong> JPMorgan Chase & Co. has zero liability,
                    responsibility, or involvement with SendKyleDeals.
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 5: Eligibility */}
            <section id="section-5" className="terms-section mb-12 scroll-mt-24">
              <h2 className="font-space-grotesk text-2xl font-bold mb-4">5. ELIGIBILITY</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You must be at least 18 years old and legally capable of entering into binding contracts to use this
                Platform. By using the Platform, you represent and warrant that you meet these requirements.
              </p>
            </section>

            {/* Section 6: Services Provided */}
            <section id="section-6" className="terms-section mb-12 scroll-mt-24">
              <h2 className="font-space-grotesk text-2xl font-bold mb-4">6. SERVICES PROVIDED</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SendKyleDeals provides connection and facilitation services for real estate investors, including but not
                limited to:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-6">
                <li className="flex gap-2">
                  <span className="text-[#00FF84]">→</span> Connecting deal submitters with potential buyers
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00FF84]">→</span> Facilitating introductions between investors and lenders
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00FF84]">→</span> Providing networking opportunities
                </li>
                <li className="flex gap-2">
                  <span className="text-[#00FF84]">→</span> Sharing market information and resources
                </li>
              </ul>
            </section>

            {/* Section 11: Disclaimers (CRITICAL) */}
            <section id="section-11" className="terms-section mb-12 scroll-mt-24">
              <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-red-400">11. DISCLAIMERS</h2>
              <div className="bg-[#00FF84]/10 border-l-4 border-[#00FF84] p-6 mb-6">
                <p className="font-bold uppercase tracking-wide leading-relaxed">
                  THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE MAKE NO
                  GUARANTEES REGARDING DEAL QUALITY, TRANSACTION SUCCESS, OR INVESTMENT RETURNS.
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We are not licensed real estate agents, brokers, attorneys, CPAs, or financial advisors. Nothing on this
                Platform constitutes professional advice. You must conduct your own due diligence and consult with
                licensed professionals.
              </p>
            </section>

            {/* Section 12: Limitation of Liability (CRITICAL) */}
            <section id="section-12" className="terms-section mb-12 scroll-mt-24">
              <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-red-400">12. LIMITATION OF LIABILITY</h2>
              <div className="bg-[#00FF84]/10 border-l-4 border-[#00FF84] p-6 mb-6">
                <p className="font-bold uppercase tracking-wide leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR
                  OPPORTUNITIES.
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our total liability shall not exceed the amount you paid to use the Platform in the 12 months preceding
                the claim, or $100, whichever is greater.
              </p>
            </section>

            {/* Section 20: Contact Information */}
            <section id="section-20" className="terms-section contact-section mb-12 scroll-mt-24">
              <h2 className="font-space-grotesk text-2xl font-bold mb-4">20. CONTACT INFORMATION</h2>
              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">MikeLowreyHoldingsLLC</h3>
                <p className="text-sm text-muted-foreground mb-4">d/b/a SendKyleDeals</p>
                <div className="space-y-4 text-sm">
                  <div>
                    <strong className="text-foreground">Mailing Address:</strong>
                    <p className="text-muted-foreground mt-1">
                      30 N GOULD ST STE R
                      <br />
                      SHERIDAN, WY 82801
                    </p>
                  </div>
                  <div>
                    <strong className="text-foreground">Email:</strong>
                    <p className="text-muted-foreground mt-1">support@sendkyledeals.com</p>
                  </div>
                  <div>
                    <strong className="text-foreground">Phone:</strong>
                    <p className="text-muted-foreground mt-1">(732) 410-1010</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 21: Final Acknowledgment */}
            <section id="section-21" className="terms-section acknowledgment-section mb-12 scroll-mt-24">
              <h2 className="font-space-grotesk text-2xl font-bold mb-4">21. ACKNOWLEDGMENT AND ACCEPTANCE</h2>
              <div className="bg-[#00FF84]/10 border-2 border-[#00FF84] rounded-lg p-6">
                <p className="font-semibold text-lg mb-4">BY USING THE PLATFORM, YOU ACKNOWLEDGE THAT:</p>
                <ul className="space-y-2 text-sm">
                  {[
                    "You have read these Terms in their entirety",
                    "You understand all provisions including disclaimers and limitations",
                    "You have had opportunity to consult with an attorney",
                    "You agree to be legally bound by these Terms",
                    "You understand real estate investing involves substantial risk",
                    "You will conduct your own due diligence",
                    "You will consult with licensed professionals",
                    "You understand we provide no guarantees of results",
                    "You accept all disclaimers and limitations of liability",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#00FF84] mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-bold text-red-400 mt-6 text-center">
                  IF YOU DO NOT AGREE, YOU MUST NOT USE THE PLATFORM.
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border/40 pt-8 mt-12 text-center text-sm text-muted-foreground">
              <p className="mb-2">Last Updated: January 15, 2025 | Version 1.0</p>
              <p>© 2025 MikeLowreyHoldingsLLC. All rights reserved.</p>
            </footer>
          </main>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 lg:bottom-4 rounded-full h-12 w-12 shadow-lg bg-muted hover:bg-muted/80"
          size="icon"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
