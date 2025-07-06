import { type NextRequest, NextResponse } from "next/server"

// In-memory portfolio storage (in real app, use database)
const portfolioData = {
  cash: 100000,
  positions: [
    { symbol: "AAPL", shares: 50, avgPrice: 170.0, currentPrice: 175.23 },
    { symbol: "GOOGL", shares: 25, avgPrice: 140.0, currentPrice: 142.67 },
    { symbol: "MSFT", shares: 30, avgPrice: 375.0, currentPrice: 378.91 },
  ],
  trades: [
    {
      id: 1,
      symbol: "AAPL",
      type: "BUY",
      shares: 50,
      price: 170.0,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      total: 8500,
    },
    {
      id: 2,
      symbol: "GOOGL",
      type: "BUY",
      shares: 25,
      price: 140.0,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      total: 3500,
    },
  ],
}

export async function GET() {
  // Calculate portfolio value
  const totalValue =
    portfolioData.cash + portfolioData.positions.reduce((sum, pos) => sum + pos.shares * pos.currentPrice, 0)

  const totalCost =
    portfolioData.positions.reduce((sum, pos) => sum + pos.shares * pos.avgPrice, 0) + (100000 - portfolioData.cash)

  const totalReturn = totalValue - 100000
  const totalReturnPercent = (totalReturn / 100000) * 100

  return NextResponse.json({
    ...portfolioData,
    totalValue: Math.round(totalValue * 100) / 100,
    totalReturn: Math.round(totalReturn * 100) / 100,
    totalReturnPercent: Math.round(totalReturnPercent * 100) / 100,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  const { action, symbol, shares, price, type } = await request.json()

  if (action === "trade") {
    const total = shares * price
    const newTrade = {
      id: Date.now(),
      symbol,
      type: type.toUpperCase(),
      shares: Number(shares),
      price: Number(price),
      timestamp: new Date().toISOString(),
      total,
    }

    if (type.toLowerCase() === "buy") {
      if (portfolioData.cash >= total) {
        portfolioData.cash -= total
        portfolioData.trades.push(newTrade)

        // Update or add position
        const existingPosition = portfolioData.positions.find((p) => p.symbol === symbol)
        if (existingPosition) {
          const totalShares = existingPosition.shares + shares
          const totalCost = existingPosition.shares * existingPosition.avgPrice + total
          existingPosition.avgPrice = totalCost / totalShares
          existingPosition.shares = totalShares
        } else {
          portfolioData.positions.push({
            symbol,
            shares: Number(shares),
            avgPrice: Number(price),
            currentPrice: Number(price),
          })
        }

        return NextResponse.json({ success: true, trade: newTrade })
      } else {
        return NextResponse.json({ success: false, error: "Insufficient funds" }, { status: 400 })
      }
    } else if (type.toLowerCase() === "sell") {
      const position = portfolioData.positions.find((p) => p.symbol === symbol)
      if (position && position.shares >= shares) {
        portfolioData.cash += total
        portfolioData.trades.push(newTrade)

        position.shares -= shares
        if (position.shares === 0) {
          portfolioData.positions = portfolioData.positions.filter((p) => p.symbol !== symbol)
        }

        return NextResponse.json({ success: true, trade: newTrade })
      } else {
        return NextResponse.json({ success: false, error: "Insufficient shares" }, { status: 400 })
      }
    }
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
}
