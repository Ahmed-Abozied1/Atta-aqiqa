import { NextRequest, NextResponse } from "next/server"
import { Prisma } from "@/generated/prisma/client"
import prisma from "@/lib/prisma"
import { getServerSession } from "@/lib/get-session"

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await prisma.order.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 })
    }
    console.error("DELETE /api/orders failed:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

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

    const validStatuses = ["PENDING", "RECEIVED", "EXECUTING", "COMPLETED"];
    if (!status || !validStatuses.includes(status.toUpperCase())) {
      return NextResponse.json({ error: "حالة غير صحيحة" }, { status: 400 })
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: status.toUpperCase() },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 })
    }
    console.error("PATCH /api/orders failed:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}