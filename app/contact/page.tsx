"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle2, Mail, Phone } from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [smsConsent, setSmsConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!smsConsent) return

    setSubmitting(true)

    // TODO: Wire up to your backend/Supabase
    // For now, simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Interested in real estate investment opportunities in New Jersey?
                Leave your info and I&apos;ll reach out.
              </p>
            </div>

            {submitted ? (
              <Card className="border-[#00FF84]/20 bg-card/50 backdrop-blur">
                <CardContent className="p-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-[#00FF84]/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-8 w-8 text-[#00FF84]" />
                  </div>
                  <h2 className="font-space-grotesk text-2xl font-bold mb-3">
                    Thanks for reaching out!
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    I&apos;ll be in touch soon with real estate investment opportunities.
                    You can opt out at any time by replying <strong>STOP</strong> to any
                    message.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="flex items-start space-x-3 pt-2">
                      <Checkbox
                        id="sms-consent"
                        checked={smsConsent}
                        onCheckedChange={(checked) =>
                          setSmsConsent(checked === true)
                        }
                        className="mt-1"
                      />
                      <Label
                        htmlFor="sms-consent"
                        className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                      >
                        I agree to receive SMS messages from Kyle about real estate
                        investment opportunities. Message frequency varies. Message and
                        data rates may apply. Reply STOP to unsubscribe at any time.
                        View our{" "}
                        <Link
                          href="/privacy-policy"
                          className="text-[#00FF84] hover:underline"
                        >
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/terms"
                          className="text-[#00FF84] hover:underline"
                        >
                          Terms & SMS Policy
                        </Link>
                        .
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      disabled={!smsConsent || submitting}
                      className="w-full bg-[#00FF84] text-black hover:bg-[#00FF84]/90 text-lg py-6 disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </Button>

                    {!smsConsent && (
                      <p className="text-xs text-muted-foreground text-center">
                        Please check the SMS consent box above to continue.
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Direct contact info */}
            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-[#00FF84]" />
                  </div>
                  <div>
                    <h3 className="font-space-grotesk font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:support@sendkyledeals.com"
                      className="text-sm text-muted-foreground hover:text-[#00FF84] transition-colors"
                    >
                      support@sendkyledeals.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#00FF84]/10 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-[#00FF84]" />
                  </div>
                  <div>
                    <h3 className="font-space-grotesk font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+17324101010"
                      className="text-sm text-muted-foreground hover:text-[#00FF84] transition-colors"
                    >
                      (732) 410-1010
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
