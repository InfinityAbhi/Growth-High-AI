"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Target, Brain, RefreshCw } from "lucide-react"
import { PortfolioChart } from "@/components/portfolio-chart"
import { RecentTrades } from "@/components/recent-trades"
import { AIInsights } from "@/components/ai-insights"
import { MarketSentiment } from "@/components/market-sentiment"
import Link from "next/link"

// Static demo portfolio data
const demoPortfolio = {
  totalValue: 125430,
  totalReturn: 25430,
  totalReturnPercent: 25.43,
  cash: 75000,
  positions: [
    { symbol: "AAPL", shares: 50, avgPrice: 170.0, currentPrice: 175.23 },
    { symbol: "GOOGL", shares: 25, avgPrice: 140.0, currentPrice: 142.67 },
    { symbol: "MSFT", shares: 30, avgPrice: 375.0, currentPrice: 378.91 },
  ],
}

export function DashboardContent() {
  const [portfolio, setPortfolio] = useState(demoPortfolio)
  const [loading, setLoading] = useState(false)

  const fetchPortfolio = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setPortfolio(demoPortfolio)
      setLoading(false)
    }, 500)
  }

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6 w-full">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome to AI TradePro!</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Here's your trading performance and AI-powered insights for today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchPortfolio} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/trading">
            <Button>
              <DollarSign className="mr-2 h-4 w-4" />
              Start Trading
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">${portfolio.totalValue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3 shrink-0" />
              Live updates
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              +${portfolio.totalReturn.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3 shrink-0" />+{portfolio.totalReturnPercent.toFixed(2)}% overall
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">${portfolio.cash.toLocaleString()}</div>
            <Progress value={(portfolio.cash / 100000) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Available for trading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{portfolio.positions.length}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                Active Holdings
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        <div className="space-y-6 min-w-0">
          <PortfolioChart />
          <RecentTrades />
        </div>
        <div className="space-y-6 min-w-0">
          <AIInsights />
          <MarketSentiment />
        </div>
      </div>
    </div>
  )
}
