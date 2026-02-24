import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/app/supabase-server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Appointment booking received:", {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      date: body.preferredDate,
      time: body.preferredTime,
      type: body.appointmentType,
    })

    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          phone: body.phone,
          preferred_date: body.preferredDate,
          preferred_time: body.preferredTime,
          appointment_type: body.appointmentType,
          message: body.message,
          sms_opt_in: body.smsOptIn,
          created_at: new Date().toISOString(),
          ip_address: request.ip,
          user_agent: request.headers.get("user-agent"),
        },
      ])
      .select()

    if (error) {
      console.error("[v0] Error inserting appointment into database:", error)
      return NextResponse.json({ success: false, message: "Failed to save appointment to database" }, { status: 500 })
    }

    const appointmentId = data?.[0]?.id

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully",
      appointment_id: appointmentId,
    })
  } catch (error) {
    console.error("[v0] Error booking appointment:", error)
    return NextResponse.json({ success: false, message: "Failed to book appointment" }, { status: 500 })
  }
}
