import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Privacy Policy - SendKyleDeals",
  description: "Privacy policy for SendKyleDeals real estate investment communications.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: February 24, 2026
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Who We Are
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  SendKyleDeals is operated by Kyle, an independent real estate investor
                  based in New Jersey. This website is used to connect with wholesalers,
                  investors, and lenders about real estate investment opportunities.
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  What Data We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you use our website or submit information through our forms, we may
                  collect the following personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                </ul>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  How We Use Your Data
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use the personal information we collect solely to communicate with you
                  about real estate investment opportunities in New Jersey. This includes
                  sending SMS messages, emails, and phone calls related to potential deals,
                  property listings, and investment updates that may be relevant to you.
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Data Sharing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your personal information is <strong className="text-foreground">not shared with
                  third parties</strong> and is <strong className="text-foreground">not used for
                  marketing purposes</strong> beyond the stated use of communicating about real
                  estate investment opportunities. We do not sell, rent, or trade your
                  personal data.
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  SMS/Text Messaging Privacy
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  No mobile information will be shared with third parties/affiliates for
                  marketing/promotional purposes. All the above categories exclude text
                  messaging originator opt-in data and consent; this information will not
                  be shared with any third parties.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By opting in to SMS messaging from SendKyleDeals, you consent to receive
                  recurring text messages about real estate investment opportunities.
                  Message frequency varies. Message and data rates may apply. You may opt
                  out at any time by replying <strong className="text-foreground">STOP</strong> to
                  any message. For help, reply <strong className="text-foreground">HELP</strong> or
                  contact us at{" "}
                  <a
                    href="mailto:support@sendkyledeals.com"
                    className="text-[#00FF84] hover:underline"
                  >
                    support@sendkyledeals.com
                  </a>{" "}
                  or{" "}
                  <a href="tel:+17324101010" className="text-[#00FF84] hover:underline">
                    (732) 410-1010
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Data Retention
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to
                  communicate with you about real estate opportunities, or until you
                  request that your data be deleted.
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Request access to the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Opt out of SMS communications at any time by replying <strong className="text-foreground">STOP</strong></li>
                </ul>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Data Deletion Requests
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To request deletion of your personal data, please contact us at{" "}
                  <a
                    href="mailto:support@sendkyledeals.com"
                    className="text-[#00FF84] hover:underline"
                  >
                    support@sendkyledeals.com
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+17324101010" className="text-[#00FF84] hover:underline">
                    (732) 410-1010
                  </a>
                  . We will process your request within 30 days.
                </p>
              </section>

              <section>
                <h2 className="font-space-grotesk text-2xl font-bold mb-4 text-foreground">
                  Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions or concerns about this privacy policy or how
                  your data is handled, please contact us:
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
                  <Link href="/terms" className="text-[#00FF84] hover:underline">
                    Terms & SMS Policy
                  </Link>{" "}
                  for information about our SMS messaging program.
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
