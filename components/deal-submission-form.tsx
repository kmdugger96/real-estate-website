"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Calendar,
  Mail,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AddressAutocomplete } from "@/components/address-autocomplete"
import { FileUpload } from "@/components/file-upload"

type FormData = {
  // Step 1: Identity & Purpose (7 fields)
  role: string
  purposes: string[]
  firstName: string
  lastName: string
  email: string
  phone: string
  freeNotes: string

  // Step 2A: Deal Submission (17 fields)
  propertyAddress: string
  city: string
  state: string
  zipCode: string
  placeId: string
  latitude: number
  longitude: number
  manualAddressEntry: boolean
  askingPrice: string
  contractStatus: string
  daysUntilClose: string
  estimatedArv: string
  estimatedRepairCost: string
  propertyCondition: string
  occupancyStatus: string
  liensEncumbrances: string
  propertyType: string
  dealEndGoals: string[]

  // Step 2B: Investor Acquisition (13 fields)
  investorState: string
  investorCounty: string
  investorCity: string
  priceRangeMin: string
  priceRangeMax: string
  investorPropertyTypes: string[]
  exitGoals: string[]
  rehabTolerance: string
  experienceLevel: string
  fundingMethods: string[]
  timelineToAcquire: string
  lastDealClosed: string
  proofOfFunds: string

  // Step 2C: Lender (7 fields)
  lendingRegions: string
  loanAmountRange: string
  preferredAssetTypes: string
  lendingPositionPreferences: string[]
  typesOfLending: string[]
  fundingSources: string[]
  cashSourceBreakdown: string[]

  // Step 2D: Get Funding (3 fields)
  amountRequested: string
  timelineToClose: string
  fundingTypeNeeded: string[]

  // Step 2E: Networking (2 fields)
  areaOfInterest: string
  networkingMessage: string

  // Step 3: General Context (3 fields - optional)
  accessType: string
  bestNextStep: string
  anythingElse: string

  // Step 3: Connect (New fields)
  smsOptIn: boolean
  consultationType: string
  requestedDate: string
  requestedTime: string

  termsAccepted: boolean
  liabilityAcknowledged: boolean
  finalAcknowledged: boolean
  selectedDate: string
  selectedTime: string
  timezone: string
  bookingOption: "schedule" | "contact" | null

  dealPhotos: File[]
  proofOfFundsFiles: File[]
  supportingDocuments: File[]
}

type FormErrors = {
  [key: string]: string
}

type TouchedFields = {
  [key: string]: boolean
}

const initialFormData: FormData = {
  // Step 1: Identity & Purpose (7 fields)
  role: "",
  purposes: [],
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  freeNotes: "",

  // Step 2A: Deal Submission (17 fields)
  propertyAddress: "",
  city: "",
  state: "",
  zipCode: "",
  placeId: "",
  latitude: 0,
  longitude: 0,
  manualAddressEntry: false,
  askingPrice: "",
  contractStatus: "",
  daysUntilClose: "",
  estimatedArv: "",
  estimatedRepairCost: "",
  propertyCondition: "",
  occupancyStatus: "",
  liensEncumbrances: "",
  propertyType: "",
  dealEndGoals: [],

  // Step 2B: Investor Acquisition (13 fields)
  investorState: "",
  investorCounty: "",
  investorCity: "",
  priceRangeMin: "",
  priceRangeMax: "",
  investorPropertyTypes: [],
  exitGoals: [],
  rehabTolerance: "",
  experienceLevel: "",
  fundingMethods: [],
  timelineToAcquire: "",
  lastDealClosed: "",
  proofOfFunds: "",

  // Step 2C: Lender (7 fields)
  lendingRegions: "",
  loanAmountRange: "",
  preferredAssetTypes: "",
  lendingPositionPreferences: [],
  typesOfLending: [],
  fundingSources: [],
  cashSourceBreakdown: [],

  // Step 2D: Get Funding (3 fields)
  amountRequested: "",
  timelineToClose: "",
  fundingTypeNeeded: [],

  // Step 2E: Networking (2 fields)
  areaOfInterest: "",
  networkingMessage: "",

  // Step 3: General Context (3 fields - optional)
  accessType: "",
  bestNextStep: "",
  anythingElse: "",

  // Step 3: Connect (New fields)
  smsOptIn: false,
  consultationType: "",
  requestedDate: "",
  requestedTime: "",

  termsAccepted: false,
  liabilityAcknowledged: false,
  finalAcknowledged: false,
  selectedDate: "",
  selectedTime: "",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  bookingOption: null,

  dealPhotos: [],
  proofOfFundsFiles: [],
  supportingDocuments: [],
}

const US_STATES = [
  "Haven't chosen my market yet",
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "Multiple States",
]

export function DealSubmissionForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const { toast } = useToast()
  const formRef = useRef<HTMLDivElement>(null)

  const updateFormData = (field: keyof FormData, value: string | string[] | number | boolean | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const toggleArrayValue = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[]
    const newArray = currentArray.includes(value) ? currentArray.filter((v) => v !== value) : [...currentArray, value]
    updateFormData(field, newArray)
  }

  const showDealSubmission = formData.purposes.includes("submit-deal")
  const showInvestorAcquisition = formData.purposes.includes("acquire-deal")
  const showLenderPath = formData.purposes.includes("provide-funding")
  const showBorrowerPath = formData.purposes.includes("get-funding")
  const showNetworking = formData.purposes.includes("network")

  const getTotalSteps = () => {
    return 4
  }

  const totalSteps = getTotalSteps()

  const validateStepWithErrors = (currentStep: number): FormErrors => {
    const newErrors: FormErrors = {}

    console.log("[v0] Validating step:", currentStep)
    console.log("[v0] Form data:", formData)

    if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.email) {
        newErrors.email = "Email is required"
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
          newErrors.email = "Please enter a valid email address"
        }
      }
      if (!formData.phone) {
        newErrors.phone = "Phone number is required"
      } else {
        const phoneRegex = /^[\d\s\-()]+$/
        if (!phoneRegex.test(formData.phone) || formData.phone.replace(/\D/g, "").length < 10) {
          newErrors.phone = "Please enter a valid phone number"
        }
      }
      if (formData.purposes.length === 0) {
        newErrors.purposes = "Please select at least one option"
      }
    }

    if (currentStep === 2) {
      if (showDealSubmission) {
        if (!formData.propertyAddress) newErrors.propertyAddress = "Property address is required"
        if (!formData.city) newErrors.city = "City is required"
        if (!formData.state) newErrors.state = "State is required"
        if (!formData.zipCode) newErrors.zipCode = "ZIP code is required"
        if (!formData.propertyType) newErrors.propertyType = "Property type is required"
        if (!formData.contractStatus) newErrors.contractStatus = "Contract status is required"

        // Conditional: Days until close only required if under contract
        if (formData.contractStatus === "under-contract" && !formData.daysUntilClose) {
          newErrors.daysUntilClose = "Days until close is required when under contract"
        }

        // All other fields are now OPTIONAL:
        // - askingPrice (optional)
        // - estimatedArv (optional)
        // - estimatedRepairCost (optional)
        // - propertyCondition (optional)
        // - occupancyStatus (optional)
        // - liensEncumbrances (optional)
        // - dealEndGoals (optional)
        // - dealPhotos (optional)
      }

      // Investor Acquisition validation
      if (showInvestorAcquisition) {
        if (formData.investorPropertyTypes.length === 0) {
          newErrors.investorPropertyTypes = "Please select at least one property type"
        }
        if (formData.exitGoals.length === 0) {
          newErrors.exitGoals = "Please select at least one exit goal"
        }
        if (!formData.experienceLevel) newErrors.experienceLevel = "Experience level is required"
        if (formData.fundingMethods.length === 0) {
          newErrors.fundingMethods = "Please select at least one funding method"
        }
        if (!formData.timelineToAcquire) newErrors.timelineToAcquire = "Timeline to acquire is required"
        if (!formData.lastDealClosed) newErrors.lastDealClosed = "Last deal closed information is required"
      }

      // Lender validation
      if (showLenderPath) {
        if (!formData.lendingRegions) newErrors.lendingRegions = "Lending regions is required"
        if (!formData.loanAmountRange) newErrors.loanAmountRange = "Loan amount range is required"
        if (!formData.preferredAssetTypes) newErrors.preferredAssetTypes = "Preferred asset types is required"
        if (formData.lendingPositionPreferences.length === 0) {
          newErrors.lendingPositionPreferences = "Please select at least one lending position preference"
        }
        if (formData.typesOfLending.length === 0) {
          newErrors.typesOfLending = "Please select at least one type of lending"
        }
        if (formData.fundingSources.length === 0) {
          newErrors.fundingSources = "Please select at least one funding source"
        }
        if (formData.cashSourceBreakdown.length === 0) {
          newErrors.cashSourceBreakdown = "Please select at least one cash source"
        }
      }

      // Get Funding validation
      if (showBorrowerPath) {
        if (!formData.amountRequested) newErrors.amountRequested = "Amount requested is required"
        if (!formData.timelineToClose) newErrors.timelineToClose = "Timeline to close is required"
        if (formData.fundingTypeNeeded.length === 0) {
          newErrors.fundingTypeNeeded = "Please select at least one funding type needed"
        }
      }

      // Networking validation
      if (showNetworking) {
        if (!formData.areaOfInterest) newErrors.areaOfInterest = "Area of interest is required"
        if (!formData.networkingMessage) newErrors.networkingMessage = "Message is required"
      }
    }

    if (currentStep === 3) {
      if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the Terms and Conditions"
      if (!formData.liabilityAcknowledged) {
        newErrors.liabilityAcknowledged = "You must acknowledge the liability disclaimer"
      }
      if (!formData.finalAcknowledged) {
        newErrors.finalAcknowledged = "You must complete the final acknowledgment"
      }
    }

    console.log("[v0] Validation errors:", newErrors)
    return newErrors
  }

  const validateStep = (currentStep: number): boolean => {
    // This function is now a simplified version of validateStepWithErrors,
    // primarily used to trigger toasts for immediate feedback if needed,
    // but the primary validation logic is in validateStepWithErrors.
    const stepErrors = validateStepWithErrors(currentStep)
    if (Object.keys(stepErrors).length > 0) {
      // Show specific toasts for critical issues if desired,
      // but the main error handling is managed by `handleNext` and `FieldError`.
      if (currentStep === 1 && !formData.purposes.length) {
        toast({
          title: "Missing Information",
          description: "Please select at least one option for what brings you here.",
          variant: "destructive",
        })
      }
      if (currentStep === 3 && !formData.termsAccepted) {
        toast({
          title: "Terms Required",
          description: "You must accept the Terms and Conditions to continue.",
          variant: "destructive",
        })
      }
      if (currentStep === 3 && !formData.liabilityAcknowledged) {
        toast({
          title: "Acknowledgment Required",
          description: "You must acknowledge the liability disclaimer to continue.",
          variant: "destructive",
        })
      }
      if (currentStep === 3 && !formData.finalAcknowledged) {
        toast({
          title: "Final Acknowledgment Required",
          description: "You must complete the final acknowledgment to continue.",
          variant: "destructive",
        })
      }
      return false
    }
    return true
  }

  const handleNext = () => {
    console.log("[v0] Next button clicked, current step:", step)

    const newErrors = validateStepWithErrors(step)

    if (Object.keys(newErrors).length > 0) {
      console.log("[v0] Validation failed with errors:", newErrors)
      setErrors(newErrors)

      // Mark all fields in current step as touched
      const touchedFields: TouchedFields = {}
      Object.keys(newErrors).forEach((key) => {
        touchedFields[key] = true
      })
      setTouched((prev) => ({ ...prev, ...touchedFields }))

      // Scroll to first error
      setTimeout(() => {
        const firstErrorField = document.querySelector('[data-error="true"]')
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 100)

      // Show toast for overall feedback
      toast({
        title: "Please complete required fields",
        description: "Some fields need your attention. Please review the highlighted fields below.",
        variant: "destructive",
      })

      return
    }

    console.log("[v0] Validation passed, advancing to next step")
    setStep((prev) => prev + 1)
    setErrors({})
    setTouched({}) // Reset touched for the next step
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleScheduleClick = () => {
    if (!formData.selectedDate || !formData.selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both a date and time",
        variant: "destructive",
      })
      return
    }

    updateFormData("bookingOption", "schedule")
    console.log("[v0] Calendar integration point - will connect to Calendly/Cal.com")
    // alert(`Calendar booking will be integrated here.\nSelected: ${formData.selectedDate} at ${formData.selectedTime}`)

    handleSubmitWithType("scheduled_call")
  }

  const handleSubmitClick = () => {
    updateFormData("bookingOption", "contact")
    handleSubmitWithType("contact_me")
  }

  const handleSubmitWithType = async (consultationType: string) => {
    if (!validateStep(step)) return // Use existing validateStep for initial broad check before detailed error handling

    // Perform detailed validation again to ensure all fields are checked before submission
    const newErrors = validateStepWithErrors(step)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched((prev) => {
        const touchedFields: TouchedFields = {}
        Object.keys(newErrors).forEach((key) => {
          touchedFields[key] = true
        })
        return { ...prev, ...touchedFields }
      })

      // Scroll to first error
      setTimeout(() => {
        const firstErrorField = document.querySelector('[data-error="true"]')
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }, 100)

      toast({
        title: "Submission Failed",
        description: "Please correct the highlighted fields before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const submissionData = {
        ...formData,
        consultationType,
        requestedDate: consultationType === "scheduled_call" ? formData.selectedDate : undefined,
        requestedTime: consultationType === "scheduled_call" ? formData.selectedTime : undefined,
      }

      const convertFilesToBase64 = async (
        files: File[],
      ): Promise<Array<{ name: string; type: string; size: number; data: string }>> => {
        const filePromises = files.map((file) => {
          return new Promise<{ name: string; type: string; size: number; data: string }>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
              resolve({
                name: file.name,
                type: file.type,
                size: file.size,
                data: reader.result as string,
              })
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
        })
        return Promise.all(filePromises)
      }

      // Convert file arrays to base64
      const dealPhotosBase64 = formData.dealPhotos.length > 0 ? await convertFilesToBase64(formData.dealPhotos) : []
      const proofOfFundsBase64 =
        formData.proofOfFundsFiles.length > 0 ? await convertFilesToBase64(formData.proofOfFundsFiles) : []
      const supportingDocsBase64 =
        formData.supportingDocuments.length > 0 ? await convertFilesToBase64(formData.supportingDocuments) : []

      // Build JSON payload with file data
      const jsonData = {
        ...submissionData,
        dealPhotos: dealPhotosBase64,
        proofOfFundsFiles: proofOfFundsBase64,
        supportingDocuments: supportingDocsBase64,
      }

      const response = await fetch("/api/submit-deal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.JSON.stringify(jsonData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Submission failed: ${errorText}`)
      }

      setIsSubmitted(true)
      const message =
        consultationType === "scheduled_call"
          ? "Thank you! We look forward to speaking with you."
          : "Thank you! We'll contact you within 24-48 hours."

      toast({
        title: "Submission Successful!",
        description: message,
      })
    } catch (error) {
      console.error("Submission error:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your information. Please try again.",
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
          <h2 className="font-space-grotesk text-3xl font-bold mb-4">Submission Successful!</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Thank you for your submission. Our team will review your information and get back to you within 24 hours.
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

  const CalendarPlaceholder = () => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const sampleDates = [15, 17, 18, 22, 23, 24, 25]
    const bookedDates = [16, 19, 21]
    const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"]
    const bookedTimes = ["3:00 PM"]

    return (
      <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/20">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = i + 1
            const isAvailable = sampleDates.includes(date)
            const isBooked = bookedDates.includes(date)
            const isSelected = formData.selectedDate === `${monthNames[currentMonth.getMonth()]} ${date}`

            return (
              <button
                key={date}
                onClick={() =>
                  isAvailable ? updateFormData("selectedDate", `${monthNames[currentMonth.getMonth()]} ${date}`) : null
                }
                disabled={!isAvailable || isBooked}
                className={`
                  p-2 rounded-md text-sm transition-colors
                  ${isSelected ? "bg-[#00FF84] text-black font-semibold" : ""}
                  ${isAvailable && !isSelected ? "hover:bg-muted cursor-pointer" : ""}
                  ${isBooked ? "text-muted-foreground line-through cursor-not-allowed" : ""}
                  ${!isAvailable && !isBooked ? "text-muted-foreground/50 cursor-not-allowed" : ""}
                `}
              >
                {date}
              </button>
            )
          })}
        </div>

        {formData.selectedDate && (
          <div className="space-y-2 pt-4 border-t">
            <Label className="text-sm font-medium">Select a time:</Label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => {
                const isBooked = bookedTimes.includes(time)
                const isSelected = formData.selectedTime === time

                return (
                  <button
                    key={time}
                    onClick={() => (!isBooked ? updateFormData("selectedTime", time) : null)}
                    disabled={isBooked}
                    className={`
                      p-2 rounded-md text-sm transition-colors
                      ${isSelected ? "bg-[#00FF84] text-black font-semibold" : ""}
                      ${!isSelected && !isBooked ? "bg-muted hover:bg-muted/70 cursor-pointer" : ""}
                      ${isBooked ? "bg-muted/50 text-muted-foreground line-through cursor-not-allowed" : ""}
                    `}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center pt-2">Times shown in {formData.timezone}</p>
      </div>
    )
  }

  const FieldError = ({ name }: { name: string }) => {
    if (!errors[name] || !touched[name]) return null
    return <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
  }

  const getInputClassName = (fieldName: string, baseClassName = "") => {
    const hasError = errors[fieldName] && touched[fieldName]
    const isValid = touched[fieldName] && !errors[fieldName] && formData[fieldName as keyof FormData]

    return `${baseClassName} ${hasError ? "border-red-500 focus-visible:ring-red-500" : ""} ${
      isValid ? "border-green-500 focus-visible:ring-green-500" : ""
    }`
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur" ref={formRef}>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-12 rounded-full transition-colors ${i + 1 <= step ? "bg-[#00FF84]" : "bg-muted"}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            Step {step} of {totalSteps}
          </span>
        </div>
        <CardTitle className="font-space-grotesk text-2xl">
          {step === 1 && "Identity & Purpose"}
          {step === 2 && "Your Information"}
          {step === 3 && "Terms & Professional Acknowledgment"}
          {step === 4 && "Let's Connect"}
        </CardTitle>
        <CardDescription>
          {step === 1 && "Tell us about yourself and what brings you here"}
          {step === 2 && "Provide details based on your selections"}
          {step === 3 &&
            "Before we connect you with opportunities, please review and acknowledge our terms and the importance of professional guidance."}
          {step === 4 && "Ready to take the next step? Choose how you'd like to connect with us:"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role">Role (Optional)</Label>
              <Select value={formData.role} onValueChange={(value) => updateFormData("role", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sub2-student">Sub 2 Student</SelectItem>
                  <SelectItem value="gator-student">Gator Student</SelectItem>
                  <SelectItem value="neither">Neither</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3" data-error={errors.purposes && touched.purposes ? "true" : "false"}>
              <Label>What brings you here? (Select all that apply) *</Label>
              <div className="space-y-2">
                {[
                  { value: "submit-deal", label: "Submit a Deal" },
                  { value: "acquire-deal", label: "Acquire a Deal" },
                  { value: "provide-funding", label: "Provide Funding (Lender / Private Money Partner)" },
                  { value: "get-funding", label: "Get Funding" },
                  { value: "network", label: "Other / Network" },
                ].map((purpose) => (
                  <div key={purpose.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={purpose.value}
                      checked={formData.purposes.includes(purpose.value)}
                      onCheckedChange={() => toggleArrayValue("purposes", purpose.value)}
                    />
                    <label
                      htmlFor={purpose.value}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {purpose.label}
                    </label>
                  </div>
                ))}
              </div>
              <FieldError name="purposes" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2" data-error={errors.firstName && touched.firstName ? "true" : "false"}>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, firstName: true }))}
                  placeholder="John"
                  className={getInputClassName("firstName")}
                />
                <FieldError name="firstName" />
              </div>
              <div className="space-y-2" data-error={errors.lastName && touched.lastName ? "true" : "false"}>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, lastName: true }))}
                  placeholder="Doe"
                  className={getInputClassName("lastName")}
                />
                <FieldError name="lastName" />
              </div>
            </div>

            <div className="space-y-2" data-error={errors.email && touched.email ? "true" : "false"}>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                placeholder="john@example.com"
                className={getInputClassName("email")}
              />
              <FieldError name="email" />
            </div>

            <div className="space-y-2" data-error={errors.phone && touched.phone ? "true" : "false"}>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                placeholder="(555) 123-4567"
                className={getInputClassName("phone")}
              />
              <FieldError name="phone" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="freeNotes">Free Notes (Optional)</Label>
              <Textarea
                id="freeNotes"
                value={formData.freeNotes}
                onChange={(e) => updateFormData("freeNotes", e.target.value)}
                placeholder="Any additional context or hashtags..."
                rows={3}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            {showDealSubmission && (
              <div className="space-y-4 p-4 border border-[#00FF84]/20 rounded-lg">
                <h3 className="font-space-grotesk text-lg font-semibold text-[#00FF84]">Deal Submission</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <Label>Property Address *</Label>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="manualAddressEntry"
                          checked={formData.manualAddressEntry}
                          onCheckedChange={(checked) => updateFormData("manualAddressEntry", checked as boolean)}
                        />
                        <label htmlFor="manualAddressEntry" className="text-sm cursor-pointer">
                          Enter manually
                        </label>
                      </div>
                    </div>

                    <div data-error={errors.propertyAddress && touched.propertyAddress ? "true" : "false"}>
                      {!formData.manualAddressEntry ? (
                        <>
                          <AddressAutocomplete
                            label=""
                            required
                            placeholder="Start typing an address..."
                            initialValue={formData.propertyAddress}
                            onAddressSelect={(components) => {
                              updateFormData("propertyAddress", components.address_line1)
                              updateFormData("city", components.city)
                              updateFormData("state", components.state)
                              updateFormData("zipCode", components.zip)
                              updateFormData("placeId", components.place_id)
                              updateFormData("latitude", components.lat)
                              updateFormData("longitude", components.lng)
                            }}
                          />

                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="space-y-2" data-error={errors.city && touched.city ? "true" : "false"}>
                              <Label htmlFor="city">City *</Label>
                              <Input id="city" value={formData.city} readOnly className="bg-muted" />
                              <FieldError name="city" />
                            </div>
                            <div className="space-y-2" data-error={errors.state && touched.state ? "true" : "false"}>
                              <Label htmlFor="state">State *</Label>
                              <Input id="state" value={formData.state} readOnly className="bg-muted" />
                              <FieldError name="state" />
                            </div>
                            <div
                              className="space-y-2"
                              data-error={errors.zipCode && touched.zipCode ? "true" : "false"}
                            >
                              <Label htmlFor="zipCode">ZIP *</Label>
                              <Input id="zipCode" value={formData.zipCode} readOnly className="bg-muted" />
                              <FieldError name="zipCode" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <Input
                            id="propertyAddress"
                            value={formData.propertyAddress}
                            onChange={(e) => updateFormData("propertyAddress", e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, propertyAddress: true }))}
                            placeholder="123 Main St"
                            className={getInputClassName("propertyAddress")}
                          />
                          <FieldError name="propertyAddress" />
                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="space-y-2" data-error={errors.city && touched.city ? "true" : "false"}>
                              <Label htmlFor="city">City *</Label>
                              <Input
                                id="city"
                                value={formData.city}
                                onChange={(e) => updateFormData("city", e.target.value)}
                                onBlur={() => setTouched((prev) => ({ ...prev, city: true }))}
                                placeholder="Los Angeles"
                                className={getInputClassName("city")}
                              />
                              <FieldError name="city" />
                            </div>
                            <div className="space-y-2" data-error={errors.state && touched.state ? "true" : "false"}>
                              <Label htmlFor="state">State *</Label>
                              <Input
                                id="state"
                                value={formData.state}
                                onChange={(e) => updateFormData("state", e.target.value)}
                                onBlur={() => setTouched((prev) => ({ ...prev, state: true }))}
                                placeholder="CA"
                                maxLength={2}
                                className={getInputClassName("state")}
                              />
                              <FieldError name="state" />
                            </div>
                            <div
                              className="space-y-2"
                              data-error={errors.zipCode && touched.zipCode ? "true" : "false"}
                            >
                              <Label htmlFor="zipCode">ZIP *</Label>
                              <Input
                                id="zipCode"
                                value={formData.zipCode}
                                onChange={(e) => updateFormData("zipCode", e.target.value)}
                                onBlur={() => setTouched((prev) => ({ ...prev, zipCode: true }))}
                                placeholder="90001"
                                className={getInputClassName("zipCode")}
                              />
                              <FieldError name="zipCode" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2" data-error={errors.askingPrice && touched.askingPrice ? "true" : "false"}>
                    <Label htmlFor="askingPrice">Asking Price *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="askingPrice"
                        type="text"
                        value={formData.askingPrice}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "")
                          updateFormData("askingPrice", value)
                        }}
                        onBlur={() => setTouched((prev) => ({ ...prev, askingPrice: true }))}
                        placeholder="250,000"
                        className={getInputClassName("askingPrice", "pl-7")}
                      />
                    </div>
                    <FieldError name="askingPrice" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.contractStatus && touched.contractStatus ? "true" : "false"}
                  >
                    <Label htmlFor="contractStatus">Contract Status *</Label>
                    <Select
                      value={formData.contractStatus}
                      onValueChange={(value) => updateFormData("contractStatus", value)}
                    >
                      <SelectTrigger className={getInputClassName("contractStatus")}>
                        <SelectValue placeholder="Select contract status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-contract">Under Contract</SelectItem>
                        <SelectItem value="not-under-contract">Not Under Contract</SelectItem>
                        <SelectItem value="own-property">Own the Property</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError name="contractStatus" />
                  </div>

                  {formData.contractStatus === "under-contract" && (
                    <div
                      className="space-y-2"
                      data-error={errors.daysUntilClose && touched.daysUntilClose ? "true" : "false"}
                    >
                      <Label htmlFor="daysUntilClose">Days Until Close *</Label>
                      <Input
                        id="daysUntilClose"
                        type="number"
                        value={formData.daysUntilClose}
                        onChange={(e) => updateFormData("daysUntilClose", e.target.value)}
                        onBlur={() => setTouched((prev) => ({ ...prev, daysUntilClose: true }))}
                        placeholder="30"
                        className={getInputClassName("daysUntilClose")}
                      />
                      <FieldError name="daysUntilClose" />
                    </div>
                  )}

                  <div
                    className="space-y-2"
                    data-error={errors.estimatedArv && touched.estimatedArv ? "true" : "false"}
                  >
                    <Label htmlFor="estimatedArv">Estimated ARV (After Repair Value) *</Label>
                    <p className="text-sm text-muted-foreground">Put zero if unsure</p>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="estimatedArv"
                        type="text"
                        value={formData.estimatedArv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "")
                          updateFormData("estimatedArv", value)
                        }}
                        onBlur={() => setTouched((prev) => ({ ...prev, estimatedArv: true }))}
                        placeholder="350,000"
                        className={getInputClassName("estimatedArv", "pl-7")}
                      />
                    </div>
                    <FieldError name="estimatedArv" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.estimatedRepairCost && touched.estimatedRepairCost ? "true" : "false"}
                  >
                    <Label htmlFor="estimatedRepairCost">Estimated Repair Cost *</Label>
                    <p className="text-sm text-muted-foreground">Put zero if unsure</p>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="estimatedRepairCost"
                        type="text"
                        value={formData.estimatedRepairCost}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "")
                          updateFormData("estimatedRepairCost", value)
                        }}
                        onBlur={() => setTouched((prev) => ({ ...prev, estimatedRepairCost: true }))}
                        placeholder="50,000"
                        className={getInputClassName("estimatedRepairCost", "pl-7")}
                      />
                    </div>
                    <FieldError name="estimatedRepairCost" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.propertyCondition && touched.propertyCondition ? "true" : "false"}
                  >
                    <Label htmlFor="propertyCondition">Current Condition *</Label>
                    <Select
                      value={formData.propertyCondition}
                      onValueChange={(value) => updateFormData("propertyCondition", value)}
                    >
                      <SelectTrigger className={getInputClassName("propertyCondition")}>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="turnkey">Turnkey / Move-In Ready</SelectItem>
                        <SelectItem value="cosmetic">Cosmetic Updates Needed</SelectItem>
                        <SelectItem value="medium-rehab">Medium Rehab</SelectItem>
                        <SelectItem value="heavy-rehab">Heavy Rehab / Gut Job</SelectItem>
                        <SelectItem value="teardown">Teardown / Land Value</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError name="propertyCondition" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.occupancyStatus && touched.occupancyStatus ? "true" : "false"}
                  >
                    <Label htmlFor="occupancyStatus">Occupancy Status *</Label>
                    <Select
                      value={formData.occupancyStatus}
                      onValueChange={(value) => updateFormData("occupancyStatus", value)}
                    >
                      <SelectTrigger className={getInputClassName("occupancyStatus")}>
                        <SelectValue placeholder="Select occupancy status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vacant">Vacant</SelectItem>
                        <SelectItem value="owner-occupied">Owner Occupied</SelectItem>
                        <SelectItem value="tenant-occupied">Tenant Occupied</SelectItem>
                        <SelectItem value="squatters">Squatters / Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError name="occupancyStatus" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.liensEncumbrances && touched.liensEncumbrances ? "true" : "false"}
                  >
                    <Label htmlFor="liensEncumbrances">Liens / Encumbrances *</Label>
                    <Select
                      value={formData.liensEncumbrances}
                      onValueChange={(value) => updateFormData("liensEncumbrances", value)}
                    >
                      <SelectTrigger className={getInputClassName("liensEncumbrances")}>
                        <SelectValue placeholder="Select liens status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None / Clear Title</SelectItem>
                        <SelectItem value="mortgage-only">Mortgage Only</SelectItem>
                        <SelectItem value="multiple-liens">Multiple Liens</SelectItem>
                        <SelectItem value="tax-liens">Tax Liens</SelectItem>
                        <SelectItem value="unknown">Unknown / Need Title Search</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError name="liensEncumbrances" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.propertyType && touched.propertyType ? "true" : "false"}
                  >
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => updateFormData("propertyType", value)}
                    >
                      <SelectTrigger className={getInputClassName("propertyType")}>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-family">Single Family</SelectItem>
                        <SelectItem value="multi-family">Multi-Family (2-4 units)</SelectItem>
                        <SelectItem value="apartment">Apartment Building (5+ units)</SelectItem>
                        <SelectItem value="condo">Condo / Townhome</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="land">Land / Lot</SelectItem>
                        <SelectItem value="mobile-home">Mobile Home</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError name="propertyType" />
                  </div>

                  <FileUpload
                    label="Upload Photos/Documents (Optional)"
                    description="Upload property photos, inspection reports, or other relevant documents. You can always add more files later."
                    maxFiles={10}
                    maxSizeMB={10}
                    acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"]}
                    value={formData.dealPhotos}
                    onFilesChange={(files) => updateFormData("dealPhotos", files)}
                  />
                </div>
              </div>
            )}

            {showInvestorAcquisition && (
              <div className="space-y-4 p-4 border border-[#00FF84]/20 rounded-lg">
                <h3 className="font-space-grotesk text-lg font-semibold text-[#00FF84]">Investor Acquisition</h3>
                <p className="text-sm text-muted-foreground">All fields in this section are optional</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="investorState">Target State (Optional)</Label>
                    <Select
                      value={formData.investorState}
                      onValueChange={(value) => updateFormData("investorState", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state..." />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((state) => (
                          <SelectItem key={state} value={state.toLowerCase().replace(/ /g, "-")}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Which state are you targeting for investment?</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investorCounty">Target County/Township (Optional)</Label>
                    <Input
                      id="investorCounty"
                      value={formData.investorCounty}
                      onChange={(e) => updateFormData("investorCounty", e.target.value)}
                      placeholder="Los Angeles"
                    />
                    <p className="text-xs text-muted-foreground">
                      Specific counties or townships you're targeting (leave blank if unsure)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investorCity">City (Optional)</Label>
                    <Input
                      id="investorCity"
                      value={formData.investorCity}
                      onChange={(e) => updateFormData("investorCity", e.target.value)}
                      placeholder="Los Angeles"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priceRangeMin">Minimum Price (Optional)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="priceRangeMin"
                          type="text"
                          value={formData.priceRangeMin}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "")
                            updateFormData("priceRangeMin", value)
                          }}
                          placeholder="100,000"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Lowest price you're willing to consider (optional)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priceRangeMax">Maximum Price (Optional)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="priceRangeMax"
                          type="text"
                          value={formData.priceRangeMax}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "")
                            updateFormData("priceRangeMax", value)
                          }}
                          placeholder="500,000"
                          className="pl-7"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Highest price you're willing to consider (optional)
                      </p>
                    </div>
                  </div>

                  <div
                    className="space-y-3"
                    data-error={errors.investorPropertyTypes && touched.investorPropertyTypes ? "true" : "false"}
                  >
                    <Label>Property Type (Select all that apply) *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Single Family",
                        "Multi-Family (2-4 units)",
                        "Apartment Building (5+ units)",
                        "Condo / Townhome",
                        "Commercial",
                        "Land / Lot",
                        "Mobile Home",
                        "Other",
                      ].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`investor-type-${type}`}
                            checked={formData.investorPropertyTypes.includes(type)}
                            onCheckedChange={() => toggleArrayValue("investorPropertyTypes", type)}
                          />
                          <label htmlFor={`investor-type-${type}`} className="text-sm cursor-pointer">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FieldError name="investorPropertyTypes" />
                  </div>

                  <div className="space-y-3" data-error={errors.exitGoals && touched.exitGoals ? "true" : "false"}>
                    <Label>Exit Goals (Select all that apply) *</Label>
                    <div className="space-y-2">
                      {[
                        "Fix & Flip",
                        "Fix & Hold",
                        "Buy & Hold",
                        "House Hack",
                        "Homestead Buyer",
                        "Partnerships / Joint Ventures",
                        "Wrap",
                      ].map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={`exit-goal-${goal}`}
                            checked={formData.exitGoals.includes(goal)}
                            onCheckedChange={() => toggleArrayValue("exitGoals", goal)}
                          />
                          <label htmlFor={`exit-goal-${goal}`} className="text-sm cursor-pointer">
                            {goal}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FieldError name="exitGoals" />
                  </div>

                  {formData.exitGoals.includes("Fix & Flip") && (
                    <div className="space-y-2">
                      <Label htmlFor="rehabTolerance">Rehab Tolerance (Optional)</Label>
                      <Select
                        value={formData.rehabTolerance}
                        onValueChange={(value) => updateFormData("rehabTolerance", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rehab tolerance..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="turnkey">Turnkey / Move-in Ready</SelectItem>
                          <SelectItem value="cosmetic">Cosmetic / Light Updates Only</SelectItem>
                          <SelectItem value="medium">Value-Add / Medium Rehab</SelectItem>
                          <SelectItem value="heavy">Full Renovation / Heavy Lift</SelectItem>
                          <SelectItem value="any">Any Level of Rehab</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        What level of renovation are you comfortable with?
                      </p>
                    </div>
                  )}

                  <div
                    className="space-y-2"
                    data-error={errors.experienceLevel && touched.experienceLevel ? "true" : "false"}
                  >
                    <Label htmlFor="experienceLevel">Experience Level *</Label>
                    <Select
                      value={formData.experienceLevel}
                      onValueChange={(value) => updateFormData("experienceLevel", value)}
                    >
                      <SelectTrigger className={getInputClassName("experienceLevel")}>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first-time">First-time</SelectItem>
                        <SelectItem value="1-3-deals">1-3 deals</SelectItem>
                        <SelectItem value="4-10-deals">4-10 deals</SelectItem>
                        <SelectItem value="10-plus-deals">10+ deals</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError name="experienceLevel" />
                  </div>

                  <div
                    className="space-y-3"
                    data-error={errors.fundingMethods && touched.fundingMethods ? "true" : "false"}
                  >
                    <Label>Preferred Funding Method (Select all that apply) *</Label>
                    <div className="space-y-2">
                      {[
                        "Conventional Loan",
                        "Hard Money",
                        "Private Money",
                        "Private Money Partners",
                        "Retirement Funds",
                        "Morby Method",
                        "Sub 2",
                        "Not Sure",
                        "Other",
                      ].map((method) => (
                        <div key={method} className="flex items-center space-x-2">
                          <Checkbox
                            id={`funding-method-${method}`}
                            checked={formData.fundingMethods.includes(method)}
                            onCheckedChange={() => toggleArrayValue("fundingMethods", method)}
                          />
                          <label htmlFor={`funding-method-${method}`} className="text-sm cursor-pointer">
                            {method}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FieldError name="fundingMethods" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.timelineToAcquire && touched.timelineToAcquire ? "true" : "false"}
                  >
                    <Label htmlFor="timelineToAcquire">Timeline to Acquire *</Label>
                    <Select
                      value={formData.timelineToAcquire}
                      onValueChange={(value) => updateFormData("timelineToAcquire", value)}
                    >
                      <SelectTrigger className={getInputClassName("timelineToAcquire")}>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="1-3-months">1-3 Months</SelectItem>
                        <SelectItem value="3-6-months">3-6 Months</SelectItem>
                        <SelectItem value="6-plus-months">6+ Months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError name="timelineToAcquire" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.lastDealClosed && touched.lastDealClosed ? "true" : "false"}
                  >
                    <Label htmlFor="lastDealClosed">Last Deal Closed *</Label>
                    <Input
                      id="lastDealClosed"
                      value={formData.lastDealClosed}
                      onChange={(e) => updateFormData("lastDealClosed", e.target.value)}
                      onBlur={() => setTouched((prev) => ({ ...prev, lastDealClosed: true }))}
                      placeholder="e.g., 6 months ago, Never, etc."
                      className={getInputClassName("lastDealClosed")}
                    />
                    <FieldError name="lastDealClosed" />
                  </div>

                  <FileUpload
                    label="Proof of Funds / Pre-Approval (Optional)"
                    description="Upload bank statements, pre-approval letters, or proof of funds to boost priority. You can add these later if needed."
                    maxFiles={5}
                    maxSizeMB={10}
                    acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
                    value={formData.proofOfFundsFiles}
                    onFilesChange={(files) => updateFormData("proofOfFundsFiles", files)}
                  />
                </div>
              </div>
            )}

            {showLenderPath && (
              <div className="space-y-4 p-4 border border-[#00FF84]/20 rounded-lg">
                <h3 className="font-space-grotesk text-lg font-semibold text-[#00FF84]">
                  Lender / Private Money Partner
                </h3>
                <p className="text-sm text-muted-foreground">All fields required</p>
                <div className="space-y-4">
                  <div
                    className="space-y-2"
                    data-error={errors.lendingRegions && touched.lendingRegions ? "true" : "false"}
                  >
                    <Label htmlFor="lendingRegions">Lending Regions *</Label>
                    <Input
                      id="lendingRegions"
                      value={formData.lendingRegions}
                      onChange={(e) => updateFormData("lendingRegions", e.target.value)}
                      onBlur={() => setTouched((prev) => ({ ...prev, lendingRegions: true }))}
                      placeholder="e.g., California, Texas, Nationwide"
                      className={getInputClassName("lendingRegions")}
                    />
                    <FieldError name="lendingRegions" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.loanAmountRange && touched.loanAmountRange ? "true" : "false"}
                  >
                    <Label htmlFor="loanAmountRange">Typical Loan Amount Range *</Label>
                    <Input
                      id="loanAmountRange"
                      value={formData.loanAmountRange}
                      onChange={(e) => updateFormData("loanAmountRange", e.target.value)}
                      onBlur={() => setTouched((prev) => ({ ...prev, loanAmountRange: true }))}
                      placeholder="e.g., $50k - $500k"
                      className={getInputClassName("loanAmountRange")}
                    />
                    <FieldError name="loanAmountRange" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.preferredAssetTypes && touched.preferredAssetTypes ? "true" : "false"}
                  >
                    <Label htmlFor="preferredAssetTypes">Preferred Asset Types *</Label>
                    <Input
                      id="preferredAssetTypes"
                      value={formData.preferredAssetTypes}
                      onChange={(e) => updateFormData("preferredAssetTypes", e.target.value)}
                      onBlur={() => setTouched((prev) => ({ ...prev, preferredAssetTypes: true }))}
                      placeholder="e.g., Single Family, Multi-Family"
                      className={getInputClassName("preferredAssetTypes")}
                    />
                    <FieldError name="preferredAssetTypes" />
                  </div>

                  <div
                    className="space-y-3"
                    data-error={
                      errors.lendingPositionPreferences && touched.lendingPositionPreferences ? "true" : "false"
                    }
                  >
                    <Label>Lending Position Preferences *</Label>
                    <div className="space-y-2">
                      {["First Lien", "Second Lien"].map((position) => (
                        <div key={position} className="flex items-center space-x-2">
                          <Checkbox
                            id={`lending-position-${position}`}
                            checked={formData.lendingPositionPreferences.includes(position)}
                            onCheckedChange={() => toggleArrayValue("lendingPositionPreferences", position)}
                          />
                          <label htmlFor={`lending-position-${position}`} className="text-sm cursor-pointer">
                            {position}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FieldError name="lendingPositionPreferences" />
                  </div>

                  <div
                    className="space-y-3"
                    data-error={errors.typesOfLending && touched.typesOfLending ? "true" : "false"}
                  >
                    <Label>Types of Lending * (Select all that apply)</Label>
                    <div className="space-y-2">
                      {[
                        "EMD / Gator Loans",
                        "Double Close Funding",
                        "Short-Term Lending (bridge / hard money)",
                        "Long-Term Lending (buy & hold)",
                        "Equity Participation / Partnership",
                      ].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`lending-type-${type}`}
                            checked={formData.typesOfLending.includes(type)}
                            onCheckedChange={() => toggleArrayValue("typesOfLending", type)}
                          />
                          <label htmlFor={`lending-type-${type}`} className="text-sm cursor-pointer">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FieldError name="typesOfLending" />
                  </div>

                  <div
                    className="space-y-3"
                    data-error={errors.fundingSources && touched.fundingSources ? "true" : "false"}
                  >
                    <Label>Funding Sources * (Select all that apply)</Label>
                    <div className="space-y-2">
                      {[
                        "Conventional Loan",
                        "Hard Money",
                        "Private Money",
                        "Private Money Partners",
                        "Retirement Funds",
                        "Morby Method",
                        "Sub 2",
                        "Other",
                      ].map((source) => (
                        <div key={source} className="flex items-center space-x-2">
                          <Checkbox
                            id={`funding-source-${source}`}
                            checked={formData.fundingSources.includes(source)}
                            onCheckedChange={() => toggleArrayValue("fundingSources", source)}
                          />
                          <label htmlFor={`funding-source-${source}`} className="text-sm cursor-pointer">
                            {source}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FieldError name="fundingSources" />
                  </div>

                  <div
                    className="space-y-3"
                    data-error={errors.cashSourceBreakdown && touched.cashSourceBreakdown ? "true" : "false"}
                  >
                    <Label>Cash Source Breakdown * (Select all that apply)</Label>
                    <div className="space-y-2">
                      {[
                        "Physical Cash (non-retirement)",
                        "Cash in Retirement Account",
                        "Line of Credit",
                        "Other People's Money (OPM)",
                      ].map((cash) => (
                        <div key={cash} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cash-source-${cash}`}
                            checked={formData.cashSourceBreakdown.includes(cash)}
                            onCheckedChange={() => toggleArrayValue("cashSourceBreakdown", cash)}
                          />
                          <label htmlFor={`cash-source-${cash}`} className="text-sm cursor-pointer">
                            {cash}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FieldError name="cashSourceBreakdown" />
                  </div>
                </div>
              </div>
            )}

            {showBorrowerPath && (
              <div className="space-y-4 p-4 border border-[#00FF84]/20 rounded-lg">
                <h3 className="font-space-grotesk text-lg font-semibold text-[#00FF84]">Get Funding</h3>
                <div className="space-y-4">
                  <div
                    className="space-y-2"
                    data-error={errors.amountRequested && touched.amountRequested ? "true" : "false"}
                  >
                    <Label htmlFor="amountRequested">Amount Requested *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="amountRequested"
                        type="text"
                        value={formData.amountRequested}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "")
                          updateFormData("amountRequested", value)
                        }}
                        onBlur={() => setTouched((prev) => ({ ...prev, amountRequested: true }))}
                        placeholder="100,000"
                        className={getInputClassName("amountRequested", "pl-7")}
                      />
                    </div>
                    <FieldError name="amountRequested" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.timelineToClose && touched.timelineToClose ? "true" : "false"}
                  >
                    <Label htmlFor="timelineToClose">Timeline to Close *</Label>
                    <Input
                      id="timelineToClose"
                      value={formData.timelineToClose}
                      onChange={(e) => updateFormData("timelineToClose", e.target.value)}
                      onBlur={() => setTouched((prev) => ({ ...prev, timelineToClose: true }))}
                      placeholder="e.g., 30 days, ASAP"
                      className={getInputClassName("timelineToClose")}
                    />
                    <FieldError name="timelineToClose" />
                  </div>

                  <div
                    className="space-y-3"
                    data-error={errors.fundingTypeNeeded && touched.fundingTypeNeeded ? "true" : "false"}
                  >
                    <Label>Funding Type Needed (Select all that apply) *</Label>
                    <div className="space-y-2">
                      {[
                        "EMD / Gator Loan",
                        "Double Close Funding",
                        "Short-Term Lending (bridge / hard money)",
                        "Long-Term Lending (buy & hold)",
                        "Equity Participation / Partnership",
                        "Morby Method",
                        "Sub 2",
                        "Other",
                      ].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`funding-type-needed-${type}`}
                            checked={formData.fundingTypeNeeded.includes(type)}
                            onCheckedChange={() => toggleArrayValue("fundingTypeNeeded", type)}
                          />
                          <label htmlFor={`funding-type-needed-${type}`} className="text-sm cursor-pointer">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FieldError name="fundingTypeNeeded" />
                  </div>

                  <FileUpload
                    label="Supporting Documents (Optional)"
                    description="Upload property details, financial statements, or other supporting documents. You can always add more files later."
                    maxFiles={10}
                    maxSizeMB={10}
                    acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"]}
                    value={formData.supportingDocuments}
                    onFilesChange={(files) => updateFormData("supportingDocuments", files)}
                  />
                </div>
              </div>
            )}

            {showNetworking && (
              <div className="space-y-4 p-4 border border-[#00FF84]/20 rounded-lg">
                <h3 className="font-space-grotesk text-lg font-semibold text-[#00FF84]">Networking</h3>
                <div className="space-y-4">
                  <div
                    className="space-y-2"
                    data-error={errors.areaOfInterest && touched.areaOfInterest ? "true" : "false"}
                  >
                    <Label htmlFor="areaOfInterest">Area of Interest *</Label>
                    <Select
                      value={formData.areaOfInterest}
                      onValueChange={(value) => updateFormData("areaOfInterest", value)}
                    >
                      <SelectTrigger className={getInputClassName("areaOfInterest")}>
                        <SelectValue placeholder="Select area of interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deals">Deals</SelectItem>
                        <SelectItem value="funding">Funding</SelectItem>
                        <SelectItem value="partnerships">Partnerships</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError name="areaOfInterest" />
                  </div>

                  <div
                    className="space-y-2"
                    data-error={errors.networkingMessage && touched.networkingMessage ? "true" : "false"}
                  >
                    <Label htmlFor="networkingMessage">Message *</Label>
                    <Textarea
                      id="networkingMessage"
                      value={formData.networkingMessage}
                      onChange={(e) => updateFormData("networkingMessage", e.target.value)}
                      onBlur={() => setTouched((prev) => ({ ...prev, networkingMessage: true }))}
                      placeholder="Tell us more about what you're looking for..."
                      rows={4}
                      className={getInputClassName("networkingMessage")}
                    />
                    <FieldError name="networkingMessage" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {/* Terms Acceptance Section */}
            <div className="space-y-4 p-6 border border-border rounded-lg bg-muted/20">
              <h3 className="font-space-grotesk text-lg font-semibold">Terms and Conditions</h3>

              <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By using SendKyleDeals, you agree to our Terms and Conditions, including important disclaimers about
                  liability, investment risk, and the separation from JPMorgan Chase.
                </p>

                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#00FF84] hover:underline font-medium"
                >
                  📄 Read Full Terms and Conditions
                </a>

                <div className="pt-2">
                  <p className="text-sm font-semibold mb-2">Key Points:</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-[#00FF84]">•</span>
                      <span>We provide connections and facilitation only - not legal, tax, or financial advice</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#00FF84]">•</span>
                      <span>You must conduct your own due diligence on all deals</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#00FF84]">•</span>
                      <span>Real estate investing involves substantial risk of loss</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#00FF84]">•</span>
                      <span>We make no guarantees of results or transaction success</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#00FF84]">•</span>
                      <span>Our services are completely separate from JPMorgan Chase</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/30 transition-colors"
                  data-error={errors.termsAccepted && touched.termsAccepted ? "true" : "false"}
                >
                  <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => updateFormData("termsAccepted", checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="termsAccepted" className="text-sm cursor-pointer leading-relaxed">
                      <strong>I have read and agree to the Terms and Conditions *</strong>
                    </label>
                    <FieldError name="termsAccepted" />
                  </div>
                </div>

                <div
                  className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/30 transition-colors"
                  data-error={errors.liabilityAcknowledged && touched.liabilityAcknowledged ? "true" : "false"}
                >
                  <Checkbox
                    id="liabilityAcknowledged"
                    checked={formData.liabilityAcknowledged}
                    onCheckedChange={(checked) => updateFormData("liabilityAcknowledged", checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="liabilityAcknowledged" className="text-sm cursor-pointer">
                      <strong>I acknowledge and agree that: *</strong>
                    </label>
                    <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                      <li className="flex gap-2">
                        <span className="text-[#00FF84]">→</span>
                        <span>I will conduct my own independent due diligence on all properties and transactions</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#00FF84]">→</span>
                        <span>
                          I understand real estate investing involves risk of loss, including total loss of capital
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#00FF84]">→</span>
                        <span>I will not rely solely on information or analysis provided by SendKyleDeals</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#00FF84]">→</span>
                        <span>
                          I release SendKyleDeals and MikeLowreyHoldingsLLC from all liability related to my investment
                          decisions
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-[#00FF84]">→</span>
                        <span>
                          SendKyleDeals is completely separate from JPMorgan Chase, which has no liability for this
                          platform
                        </span>
                      </li>
                    </ul>
                    <FieldError name="liabilityAcknowledged" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    If you are uncomfortable or unsure about any investment decision, we recommend consulting with a
                    qualified financial professional.
                  </p>

                  <div
                    className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/30 transition-colors"
                    data-error={errors.finalAcknowledged && touched.finalAcknowledged ? "true" : "false"}
                  >
                    <Checkbox
                      id="finalAcknowledged"
                      checked={formData.finalAcknowledged}
                      onCheckedChange={(checked) => updateFormData("finalAcknowledged", checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label htmlFor="finalAcknowledged" className="text-sm cursor-pointer leading-relaxed">
                        <strong>
                          I acknowledge that investing in real estate involves risk and can result in partial or total
                          loss of capital. *
                        </strong>
                      </label>
                      <FieldError name="finalAcknowledged" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            {/* Option 1: Schedule Consultation (Primary) */}
            <Card className="border-[#00FF84]/30 bg-card shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 text-[#00FF84] mt-1" />
                  <div className="flex-1">
                    <h3 className="font-space-grotesk text-xl font-semibold mb-2">Schedule a Consultation Call</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pick a time that works for you. We'll discuss your goals, answer questions, and explore
                      opportunities together.
                    </p>
                  </div>
                </div>

                <CalendarPlaceholder />

                <Button
                  onClick={handleScheduleClick}
                  disabled={isSubmitting}
                  className="w-full bg-[#00FF84] text-black hover:bg-[#00FF84]/90 font-semibold"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      View Available Times & Schedule
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">OR</span>
              </div>
            </div>

            {/* Option 2: Submit (Secondary) */}
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-6 w-6 text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <h3 className="font-space-grotesk text-lg font-semibold mb-2">We'll Reach Out to You</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Prefer we contact you? Submit your information and we'll reach out within 24-48 hours.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitClick}
                  disabled={isSubmitting}
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit & We'll Contact You"
                  )}
                </Button>
              </CardContent>
            </Card>

            <div className="bg-muted/30 border border-border rounded-lg p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">Stay Updated (Optional)</h3>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="smsOptIn"
                  checked={formData.smsOptIn}
                  onCheckedChange={(checked) => updateFormData("smsOptIn", checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="smsOptIn" className="text-sm cursor-pointer leading-relaxed">
                  Send me text message updates about new deals, funding opportunities, and market insights
                </label>
              </div>

              <p className="text-xs text-muted-foreground pl-7">
                By checking this box, you agree to receive text messages. Message and data rates may apply. Reply STOP
                to opt out anytime.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < totalSteps && (
            <Button onClick={handleNext} className="bg-[#00FF84] text-black hover:bg-[#00FF84]/90">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
