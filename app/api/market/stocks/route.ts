import { type NextRequest, NextResponse } from "next/server"

// Real stock data simulation with realistic price movements
const stockDatabase = new Map([
  ["AAPL", { name: "Apple Inc.", basePrice: 175.23, sector: "Technology" }],
  ["GOOGL", { name: "Alphabet Inc.", basePrice: 142.67, sector: "Technology" }],
  ["MSFT", { name: "Microsoft Corp.", basePrice: 378.91, sector: "Technology" }],
  ["TSLA", { name: "Tesla Inc.", basePrice: 234.56, sector: "Automotive" }],
  ["AMZN", { name: "Amazon.com Inc.", basePrice: 145.78, sector: "E-commerce" }],
  ["NVDA", { name: "NVIDIA Corp.", basePrice: 456.89, sector: "Technology" }],
  ["META", { name: "Meta Platforms Inc.", basePrice: 298.45, sector: "Technology" }],
  ["NFLX", { name: "Netflix Inc.", basePrice: 432.1, sector: "Entertainment" }],
  ["JPM", { name: "JPMorgan Chase & Co.", basePrice: 156.78, sector: "Finance" }],
  ["JNJ", { name: "Johnson & Johnson", basePrice: 167.89, sector: "Healthcare" }],
])

function generateRealtimePrice(basePrice: number, symbol: string): number {
  // Create realistic price movements based on time and symbol
  const now = Date.now()
  const dayStart = new Date().setHours(0, 0, 0, 0)
  const timeProgress = (now - dayStart) / (24 * 60 * 60 * 1000)

  // Different volatility for different stocks
  const volatility = symbol === "TSLA" ? 0.05 : symbol.includes("NVDA") ? 0.04 : 0.02

  // Simulate intraday movement
  const randomWalk = Math.sin(timeProgress * Math.PI * 4) * volatility
  const noise = (Math.random() - 0.5) * volatility * 0.5

  return Math.round(basePrice * (1 + randomWalk + noise) * 100) / 100
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbols = searchParams.get("symbols")?.split(",") || Array.from(stockDatabase.keys())

  const stocks = symbols
    .map((symbol) => {
      const stock = stockDatabase.get(symbol.toUpperCase())
      if (!stock) return null

      const currentPrice = generateRealtimePrice(stock.basePrice, symbol)
      const change = currentPrice - stock.basePrice
      const changePercent = (change / stock.basePrice) * 100

      return {
        symbol: symbol.toUpperCase(),
        name: stock.name,
        price: currentPrice,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        sector: stock.sector,
        volume: Math.floor(Math.random() * 10000000) + 1000000,
        marketCap: Math.floor(Math.random() * 1000000000000) + 100000000000,
        timestamp: new Date().toISOString(),
      }
    })
    .filter(Boolean)

  return NextResponse.json({ stocks, timestamp: new Date().toISOString() })
}
