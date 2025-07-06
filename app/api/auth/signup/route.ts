import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { users } from "@/lib/in-memory-db"

// In-memory user storage (in real app, use database)
// const users = new Map()

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if user already exists
    if (users.has(email)) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      profile: {
        bio: "",
        phone: "",
        riskTolerance: "Medium",
        tradingStyle: "Swing Trading",
        preferredSectors: "Technology, Healthcare",
        investmentGoals: "",
        achievements: [],
      },
      portfolio: {
        cash: 100000,
        positions: [],
        trades: [],
        totalValue: 100000,
        totalReturn: 0,
        totalReturnPercent: 0,
      },
    }

    users.set(email, user)

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ success: true, user: userWithoutPassword })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
