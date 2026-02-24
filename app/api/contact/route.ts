import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const nameParts = (body.name || "").trim().split(/\s+/)
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ") || null

    // Check for existing contact by email
    const { data: existing } = await supabase
      .from("contacts")
      .select("id")
      .eq("email", body.email)
      .maybeSingle()

    let contactId: string

    if (existing) {
      contactId = existing.id

      // Update phone and SMS consent if provided
      if (body.phone) {
        await supabase
          .from("contacts")
          .update({
            phone: body.phone,
            sms_opt_in: body.smsConsent || false,
          })
          .eq("id", contactId)
      }
    } else {
      const { data: contact, error } = await supabase
        .from("contacts")
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: body.email,
          phone: body.phone || null,
          role: "other",
          sms_opt_in: body.smsConsent || false,
          status: "new",
          lead_source: "website_contact",
        })
        .select()
        .single()

      if (error) {
        console.error("[contact] Insert error:", error)
        return NextResponse.json(
          { success: false, message: "Failed to save contact" },
          { status: 500 }
        )
      }

      contactId = contact.id
    }

    return NextResponse.json({
      success: true,
      message: "Contact saved successfully",
      contact_id: contactId,
    })
  } catch (error: any) {
    console.error("[contact] API error:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process" },
      { status: 500 }
    )
  }
}
