import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

function mapRole(formRole: string): string {
  const roleMap: Record<string, string> = {
    "Sub 2 Student": "wholesaler",
    "Gator Student": "investor",
    Neither: "other",
  }
  return roleMap[formRole] || "other"
}

function normalizePropertyType(formType: string): string {
  // Convert any format to database format
  const normalized = formType.toLowerCase().replace(/-/g, "_")

  if (normalized === "single_family" || normalized === "singlefamily") return "single-family"
  if (normalized === "multifamily" || normalized === "multi_family") return "multifamily"
  if (normalized === "commercial") return "commercial"

  return "single-family" // default fallback
}

function normalizeContractStatus(formStatus: string): string {
  // Convert hyphenated to underscored format
  const normalized = formStatus.toLowerCase().replace(/-/g, "_")
  const validStatuses = ["under_contract", "not_under_contract", "own_the_property"]

  if (validStatuses.includes(normalized)) {
    return normalized
  }

  return "not_under_contract" // default fallback
}

function safeNumber(value: any): number | null {
  if (!value || value === "" || value === null || value === undefined) {
    return null
  }
  const num = Number(value)
  return isNaN(num) ? null : num
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      console.error("[v0] Missing Supabase environment variables")
      return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 })
    }

    const body = await request.json()

    console.log("[v0] Received form data:", body)

    const { data: existingContact } = await supabase.from("contacts").select("id").eq("email", body.email).maybeSingle()

    let contactId: string

    if (existingContact) {
      // Contact exists - reuse their ID
      console.log("[v0] Existing contact found:", existingContact.id)
      contactId = existingContact.id
    } else {
      // New contact - create it
      const contactData = {
        first_name: body.firstName || body.first_name,
        last_name: body.lastName || body.last_name,
        email: body.email,
        phone: body.phone,
        role: mapRole(body.role),
        intents: body.purposes || body.intents || [],
        notes: body.freeNotes || body.free_notes || null,
        terms_accepted: body.termsAccepted || false,
        liability_acknowledged: body.liabilityAcknowledged || false,
        final_acknowledgment: body.finalAcknowledgment || false,
        sms_opt_in: body.smsOptIn || false,
        terms_version: "1.0",
        status: "new",
      }

      const { data: contact, error: contactError } = await supabase
        .from("contacts")
        .insert(contactData)
        .select()
        .single()

      if (contactError) {
        console.error("[v0] Contact insert error:", contactError)
        return NextResponse.json(
          { success: false, message: `Failed to create contact: ${contactError.message}` },
          { status: 500 },
        )
      }

      console.log("[v0] Contact created:", contact.id)
      contactId = contact.id
    }

    const intents = body.purposes || body.intents || []
    console.log("[v0] Received intents:", intents)

    const isSubmittingDeal = intents.some(
      (intent: string) => intent.toLowerCase().replace(/[\s-]/g, "") === "submitdeal",
    )

    console.log("[v0] Is submitting deal:", isSubmittingDeal)

    if (isSubmittingDeal) {
      const dealData = {
        submitted_by: contactId,
        address_line1: body.propertyAddress || body.property_address,
        city: body.city,
        state: (body.state || "").toUpperCase(),
        zip: body.zipCode || body.zip_code || body.zip,
        property_type: normalizePropertyType(body.propertyType || body.property_type || "single-family"),
        asking_price: safeNumber(body.askingPrice || body.asking_price),
        arv: safeNumber(body.estimatedArv || body.estimated_arv),
        rehab_estimate: safeNumber(body.estimatedRepairCost || body.estimated_repair_cost),
        contract_status: normalizeContractStatus(body.contractStatus || body.contract_status || "not_under_contract"),
        occupancy: body.occupancyStatus || body.occupancy_status || null,
        deal_end_goals: body.dealEndGoals || body.deal_end_goals || [],
        status: "new",
        kind: "property",
      }

      console.log("[v0] Creating deal with normalized data:", dealData)

      const { data: deal, error: dealError } = await supabase.from("deals").insert(dealData).select().single()

      if (dealError) {
        console.error("[v0] Deal insert error:", dealError)
        return NextResponse.json(
          { success: false, message: `Failed to create deal: ${dealError.message}` },
          { status: 500 },
        )
      }

      console.log("[v0] Deal created:", deal.id)

      if (body.dealPhotos && Array.isArray(body.dealPhotos) && body.dealPhotos.length > 0) {
        console.log(`[v0] Processing ${body.dealPhotos.length} files for deal ${deal.id}`)

        for (const file of body.dealPhotos) {
          // Skip empty file objects
          if (!file.data || !file.name) {
            console.log("[v0] Skipping empty file object")
            continue
          }

          try {
            // Convert base64 to buffer
            const base64Data = file.data.split(",")[1]
            if (!base64Data) {
              console.error("[v0] Invalid base64 data for file:", file.name)
              continue
            }

            const fileBuffer = Buffer.from(base64Data, "base64")
            const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
            const filePath = `${deal.id}/${fileName}`

            console.log(`[v0] Uploading file: ${fileName} (${file.size} bytes)`)

            // Upload to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from("deal-files")
              .upload(filePath, fileBuffer, {
                contentType: file.type || "application/octet-stream",
                upsert: false,
              })

            if (uploadError) {
              console.error("[v0] File upload error:", uploadError)
              continue // Skip this file but continue with others
            }

            console.log("[v0] File uploaded successfully:", uploadData.path)

            // Get public URL
            const { data: urlData } = supabase.storage.from("deal-files").getPublicUrl(filePath)

            // Determine file kind based on MIME type
            const fileKind = file.type?.startsWith("image/") ? "photo" : "document"

            // Save to deal_files table
            const { error: fileRecordError } = await supabase.from("deal_files").insert({
              deal_id: deal.id,
              file_url: urlData.publicUrl,
              kind: fileKind,
            })

            if (fileRecordError) {
              console.error("[v0] File record insert error:", fileRecordError)
            } else {
              console.log(`[v0] File record saved: ${fileName} (${fileKind})`)
            }
          } catch (fileError) {
            console.error("[v0] File processing error:", fileError)
            // Continue with other files
          }
        }

        console.log("[v0] File upload processing complete")
      } else {
        console.log("[v0] No files to upload")
      }
    }

    return NextResponse.json({
      success: true,
      message: "Submission successful!",
      contact_id: contactId,
    })
  } catch (error: any) {
    console.error("[v0] API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to process submission",
      },
      { status: 500 },
    )
  }
}
