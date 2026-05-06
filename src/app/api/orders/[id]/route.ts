import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "@/lib/get-session"

export async function PATCH(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const session = await getServerSession()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params 
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: status.toUpperCase() },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("PATCH /api/orders failed:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}