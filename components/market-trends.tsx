"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Search, RefreshCw, BarChart3, Activity } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from "recharts"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  sector: string
  volume: number
  marketCap: number
}

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
  volume: {
    label: "Volume",
    color: "hsl(var(--chart-2))",
  },
}

export function MarketTrends() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")

  const fetchStocks = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/market/stocks")
      const data = await response.json()
      setStocks(data.stocks || [])
    } catch (error) {
      console.error("Failed to fetch stocks:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStocks()
    // Refresh data every 30 seconds
    const interval = setInterval(fetchStocks, 30000)
    return () => clearInterval(interval)
  }, [])

  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === "all" || stock.sector === selectedSector
    return matchesSearch && matchesSector
  })

  const sectors = [...new Set(stocks.map((stock) => stock.sector))]
  const gainers = stocks
    .filter((s) => s.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5)
  const losers = stocks
    .filter((s) => s.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5)

  // Generate trend data for charts
  const trendData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    price: 100 + Math.sin(i / 4) * 10 + Math.random() * 5,
    volume: Math.floor(Math.random() * 1000000) + 500000,
  }))

  const sectorData = sectors.map((sector) => {
    const sectorStocks = stocks.filter((s) => s.sector === sector)
    const avgChange = sectorStocks.reduce((sum, s) => sum + s.changePercent, 0) / sectorStocks.length
    return {
      sector,
      change: Math.round(avgChange * 100) / 100,
      count: sectorStocks.length,
    }
  })

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Trends</h1>
          <p className="text-muted-foreground">Real-time market data and trending stocks analysis.</p>
        </div>
        <Button onClick={fetchStocks} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {/* Market Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Status</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">OPEN</div>
            <p className="text-xs text-muted-foreground">Market is currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stocks.length}</div>
            <p className="text-xs text-muted-foreground">Actively tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gainers</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{gainers.length}</div>
            <p className="text-xs text-muted-foreground">Stocks moving up</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Losers</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{losers.length}</div>
            <p className="text-xs text-muted-foreground">Stocks moving down</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
          <TabsTrigger value="losers">Top Losers</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Market Trend (24h)</CardTitle>
                <CardDescription>Overall market movement throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="price" stroke="var(--color-price)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trading Volume</CardTitle>
                <CardDescription>Market activity levels throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={trendData}>
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="volume" fill="var(--color-volume)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Stock List */}
          <Card>
            <CardHeader>
              <CardTitle>All Stocks</CardTitle>
              <CardDescription>Real-time stock prices and movements</CardDescription>
              <div className="flex gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search stocks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Sectors</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {loading ? (
                  <div className="text-center py-8">Loading stocks...</div>
                ) : (
                  filteredStocks.map((stock) => (
                    <div
                      key={stock.symbol}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-semibold">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground">{stock.name}</div>
                        </div>
                        <Badge variant="outline">{stock.sector}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${stock.price}</div>
                        <div
                          className={`text-sm flex items-center ${stock.change > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {stock.change > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {stock.change > 0 ? "+" : ""}
                          {stock.change} ({stock.changePercent > 0 ? "+" : ""}
                          {stock.changePercent}%)
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gainers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Top Gainers</span>
              </CardTitle>
              <CardDescription>Stocks with the highest percentage gains today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gainers.map((stock, index) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">{stock.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${stock.price}</div>
                      <div className="text-sm text-green-600 font-medium">
                        +{stock.change} (+{stock.changePercent}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="losers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <span>Top Losers</span>
              </CardTitle>
              <CardDescription>Stocks with the highest percentage losses today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {losers.map((stock, index) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground">{stock.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${stock.price}</div>
                      <div className="text-sm text-red-600 font-medium">
                        {stock.change} ({stock.changePercent}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sector Performance</CardTitle>
              <CardDescription>Performance breakdown by market sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sectorData.map((sector) => (
                  <div key={sector.sector} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="font-semibold">{sector.sector}</div>
                      <Badge variant="outline">{sector.count} stocks</Badge>
                    </div>
                    <div className={`font-medium ${sector.change > 0 ? "text-green-600" : "text-red-600"}`}>
                      {sector.change > 0 ? "+" : ""}
                      {sector.change}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
