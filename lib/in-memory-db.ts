//
// A simple in-memory store shared by ALL API routes.
// In real life you would replace this with a real database.
//
export type UserRecord = {
  id: string
  email: string
  firstName: string
  lastName: string
  password: string
  createdAt: string
  profile: any
  portfolio: any
}

export const users = new Map<string, UserRecord>()

// Seed demo account once
if (!users.has("demo@example.com")) {
  users.set("demo@example.com", {
    id: "demo",
    email: "demo@example.com",
    firstName: "Demo",
    lastName: "User",
    // password = "password"
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uO.G",
    createdAt: new Date().toISOString(),
    profile: {
      bio: "Demo user for testing the platform",
      phone: "+1 (555) 123-4567",
      riskTolerance: "Medium",
      tradingStyle: "Swing Trading",
      preferredSectors: "Technology, Healthcare, Finance",
      investmentGoals: "Long-term wealth building through diversified portfolio",
      achievements: ["First Trade", "Profitable Month", "Risk Manager"],
    },
    portfolio: {
      cash: 75_000,
      positions: [
        { symbol: "AAPL", shares: 50, avgPrice: 170.0, currentPrice: 175.23 },
        { symbol: "GOOGL", shares: 25, avgPrice: 140.0, currentPrice: 142.67 },
        { symbol: "MSFT", shares: 30, avgPrice: 375.0, currentPrice: 378.91 },
      ],
      trades: [],
      totalValue: 125_430,
      totalReturn: 25_430,
      totalReturnPercent: 25.43,
    },
  })
}
