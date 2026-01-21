import { AppointmentBookingForm } from "@/components/appointment-booking-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Form Section */}
      <section className="py-12 md:py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Schedule a call with our team to discuss your property and get expert advice.
              </p>
            </div>

            <AppointmentBookingForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
