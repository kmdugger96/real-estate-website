"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CheckCircle2, Loader2, CalendarIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredDate: Date | undefined
  preferredTime: string
  appointmentType: string
  message: string
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredDate: undefined,
  preferredTime: "",
  appointmentType: "",
  message: "",
}

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

export function AppointmentBookingForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const updateFormData = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill out all contact information fields.",
        variant: "destructive",
      })
      return false
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.preferredDate || !formData.preferredTime || !formData.appointmentType) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, and appointment type.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          preferredDate: formData.preferredDate ? format(formData.preferredDate, "yyyy-MM-dd") : null,
        }),
      })

      if (!response.ok) throw new Error("Booking failed")

      setIsSubmitted(true)
      toast({
        title: "Appointment Booked!",
        description: "We'll send you a confirmation email shortly.",
      })
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-[#00FF84]/20 bg-card/50 backdrop-blur">
        <CardContent className="p-12 text-center">
          <div className="h-16 w-16 rounded-full bg-[#00FF84]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-[#00FF84]" />
          </div>
          <h2 className="font-space-grotesk text-3xl font-bold mb-4">Appointment Booked!</h2>
          <p className="text-lg text-muted-foreground mb-2 leading-relaxed">Your appointment has been scheduled for:</p>
          <p className="text-xl font-semibold text-[#00FF84] mb-8">
            {formData.preferredDate && format(formData.preferredDate, "MMMM d, yyyy")} at {formData.preferredTime}
          </p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            We've sent a confirmation email to <span className="font-semibold">{formData.email}</span>. Our team will
            reach out to confirm the details.
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-[#00FF84] text-black hover:bg-[#00FF84]/90"
          >
            Return to Home
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="font-space-grotesk text-2xl">Schedule Your Consultation</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you to confirm your appointment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        {/* Appointment Details */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <Label>Preferred Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.preferredDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.preferredDate ? format(formData.preferredDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.preferredDate}
                  onSelect={(date) => updateFormData("preferredDate", date)}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredTime">Preferred Time *</Label>
            <Select value={formData.preferredTime} onValueChange={(value) => updateFormData("preferredTime", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentType">Appointment Type *</Label>
            <Select
              value={formData.appointmentType}
              onValueChange={(value) => updateFormData("appointmentType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deal-discussion">Deal Discussion</SelectItem>
                <SelectItem value="property-walkthrough">Property Walkthrough</SelectItem>
                <SelectItem value="general-consultation">General Consultation</SelectItem>
                <SelectItem value="follow-up">Follow-up Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => updateFormData("message", e.target.value)}
              placeholder="Tell us what you'd like to discuss..."
              rows={4}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#00FF84] text-black hover:bg-[#00FF84]/90"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking...
              </>
            ) : (
              "Book Appointment"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
