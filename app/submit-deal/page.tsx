import { DealSubmissionForm } from "@/components/deal-submission-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function SubmitDealPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Form Section */}
      <section className="py-12 md:py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4">Submit Your Deal</h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Fill out the form below and we'll get back to you within 24 hours with a fair market analysis.
              </p>
            </div>

            <DealSubmissionForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
