"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface AddressComponents {
  address_line1: string
  city: string
  state: string
  zip: string
  place_id: string
  lat: number
  lng: number
}

interface AddressAutocompleteProps {
  onAddressSelect: (components: AddressComponents) => void
  initialValue?: string
  label?: string
  required?: boolean
  placeholder?: string
}

interface Prediction {
  description: string
  place_id: string
}

export function AddressAutocomplete({
  onAddressSelect,
  initialValue = "",
  label = "Property Address",
  required = false,
  placeholder = "Start typing an address...",
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout>()
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fetch predictions from server-side API
  const fetchPredictions = async (input: string) => {
    if (input.length < 3) {
      setPredictions([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(input)}`)
      const data = await response.json()

      if (data.predictions) {
        setPredictions(data.predictions)
        setShowDropdown(true)
      }
    } catch (error) {
      console.error("Error fetching predictions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle input change with debouncing
  const handleInputChange = (value: string) => {
    setInputValue(value)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      fetchPredictions(value)
    }, 300)
  }

  // Handle place selection
  const handleSelectPlace = async (prediction: Prediction) => {
    setInputValue(prediction.description)
    setShowDropdown(false)
    setPredictions([])

    try {
      const response = await fetch(`/api/places/details?placeId=${encodeURIComponent(prediction.place_id)}`)
      const data = await response.json()

      if (data.result) {
        const place = data.result

        let streetNumber = ""
        let route = ""
        let city = ""
        let state = ""
        let zip = ""

        place.address_components?.forEach((component: any) => {
          const types = component.types

          if (types.includes("street_number")) {
            streetNumber = component.long_name
          }
          if (types.includes("route")) {
            route = component.long_name
          }
          if (types.includes("locality")) {
            city = component.long_name
          }
          if (types.includes("administrative_area_level_1")) {
            state = component.short_name
          }
          if (types.includes("postal_code")) {
            zip = component.long_name
          }
        })

        const address_line1 = `${streetNumber} ${route}`.trim()
        const lat = place.geometry?.location?.lat || 0
        const lng = place.geometry?.location?.lng || 0

        onAddressSelect({
          address_line1,
          city,
          state,
          zip,
          place_id: prediction.place_id,
          lat,
          lng,
        })
      }
    } catch (error) {
      console.error("Error fetching place details:", error)
    }
  }

  return (
    <div className="space-y-2" ref={wrapperRef}>
      <Label htmlFor="address-autocomplete">
        {label} {required && "*"}
      </Label>
      <div className="relative">
        <Input
          id="address-autocomplete"
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
        {showDropdown && predictions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
            {predictions.map((prediction) => (
              <button
                key={prediction.place_id}
                type="button"
                onClick={() => handleSelectPlace(prediction)}
                className="w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b border-border last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">📍</span>
                  <span className="text-sm text-foreground">{prediction.description}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
