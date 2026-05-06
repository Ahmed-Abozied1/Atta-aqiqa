import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "@/lib/get-session"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit
    const searchTerm = searchParams.get("searchTerm") || ""
    const role = searchParams.get("role") || "all"
    const status = searchParams.get("status") || "all"
    const sortBy = searchParams.get("sortBy") || "newest"
    const getAll = searchParams.get("getAll") === "true"

    const conditions: any[] = []
    if (role !== "all") conditions.push({ role: role.toUpperCase() })
    if (status !== "all") conditions.push({ isActive: status === "active" })
    if (searchTerm) {
      conditions.push({
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
          { phone: { contains: searchTerm, mode: "insensitive" } },
        ],
      })
    }
    const where = conditions.length ? { AND: conditions } : {}

    let orderBy: any = { createdAt: "desc" }
    if (sortBy === "name") orderBy = { name: "asc" }
    if (sortBy === "oldest") orderBy = { createdAt: "asc" }

    if (getAll) {
      const allUsers = await prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          isActive: true,
          createdAt: true,
          _count: {
    select: {
      orders: true // هذا سيجلب إجمالي عدد الطلبات للمستخدم
    }
  }
        },
        orderBy,
      })
      return NextResponse.json({ users: allUsers, total: allUsers.length, totalPages: 1, page: 1 })
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          isActive: true,
          createdAt: true,
        },
        orderBy,
      }),
      prisma.user.count({ where }),
    ])

    return NextResponse.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalUsers: total,
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}