import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Terms & SMS Policy - SendKyleDeals",
  description: "Terms of use and SMS messaging policy for SendKyleDeals.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4">
              Terms & SMS Policy
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: February 24, 2026
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  About This Service
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  SendKyleDeals is operated by Kyle, an independent real estate investor.
                  By using this website or opting in to our communications, you agree to
                  these terms.
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  SMS Messaging Program
                </h2>

                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-6 border border-border/40">
                    <dl className="space-y-4">
                      <div>
                        <dt className="font-semibold text-foreground">Program Name</dt>
                        <dd className="text-muted-foreground">SendKyleDeals</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground">Program Description</dt>
                        <dd className="text-muted-foreground">
                          SMS messages about real estate investment opportunities in New
                          Jersey, including potential deals, property listings, and
                          investment updates.
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground">Message Frequency</dt>
                        <dd className="text-muted-foreground">Message frequency varies.</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-foreground">Costs</dt>
                        <dd className="text-muted-foreground">
                          Message and data rates may apply. Check with your mobile carrier
                          for details.
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Opt-In & Consent
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By submitting the contact form on our website and checking the SMS
                  consent checkbox, you expressly consent to receive SMS messages from
                  SendKyleDeals about real estate investment opportunities. Consent is not
                  a condition of any purchase or service.
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Opt-Out Instructions
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  You can opt out of receiving SMS messages at any time. Simply text{" "}
                  <strong className="text-foreground">STOP</strong> to any message you
                  receive from us. You will receive a one-time confirmation message, and no
                  further messages will be sent unless you opt in again.
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Help
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  For assistance, text <strong className="text-foreground">HELP</strong> to
                  any message you receive from us, or contact us directly:
                </p>
                <ul className="list-none space-y-2 text-muted-foreground mt-4">
                  <li>
                    Email:{" "}
                    <a
                      href="mailto:support@sendkyledeals.com"
                      className="text-[#00FF84] hover:underline"
                    >
                      support@sendkyledeals.com
                    </a>
                  </li>
                  <li>
                    Phone:{" "}
                    <a href="tel:+17324101010" className="text-[#00FF84] hover:underline">
                      (732) 410-1010
                    </a>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Use of This Website
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This website is provided for informational purposes related to real
                  estate investing. The information on this site does not constitute
                  financial, legal, or investment advice. All investment decisions should be
                  made based on your own due diligence.
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kyle, operating as SendKyleDeals, provides real estate deal information
                  and connections on an &ldquo;as is&rdquo; basis. We are not responsible
                  for any investment outcomes, property conditions, or third-party actions.
                  Use all information at your own risk and perform your own due diligence.
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Please review our{" "}
                  <Link href="/privacy-policy" className="text-[#00FF84] hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  for details on how we collect, use, and protect your personal information.
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Questions about these terms? Reach out:
                </p>
                <ul className="list-none space-y-2 text-muted-foreground mt-4">
                  <li>
                    Email:{" "}
                    <a
                      href="mailto:support@sendkyledeals.com"
                      className="text-[#00FF84] hover:underline"
                    >
                      support@sendkyledeals.com
                    </a>
                  </li>
                  <li>
                    Phone:{" "}
                    <a href="tel:+17324101010" className="text-[#00FF84] hover:underline">
                      (732) 410-1010
                    </a>
                  </li>
                </ul>
              </section>

              <section className="pt-8 border-t border-border/40">
                <p className="text-sm text-muted-foreground">
                  See also our{" "}
                  <Link href="/privacy-policy" className="text-[#00FF84] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
