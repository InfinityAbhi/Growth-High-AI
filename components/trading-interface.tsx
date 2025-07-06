"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Search, TrendingUp, TrendingDown, DollarSign, Brain, Loader2 } from "lucide-react"
import { StockChart } from "@/components/stock-chart"
import { AITradingAssistant } from "@/components/ai-trading-assistant"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  sector: string
}

export function TradingInterface() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null)
  const [orderType, setOrderType] = useState("market")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(true)
  const [trading, setTrading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {
    try {
      const response = await fetch("/api/market/stocks")
      const data = await response.json()
      setStocks(data.stocks || [])
      if (!selectedStock && data.stocks?.length > 0) {
        setSelectedStock(data.stocks[0])
      }
    } catch (error) {
      console.error("Failed to fetch stocks:", error)
      toast({
        title: "Error",
        description: "Failed to fetch stock data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const executeTrade = async (type: "buy" | "sell") => {
    if (!selectedStock || !quantity) {
      toast({
        title: "Error",
        description: "Please select a stock and enter quantity",
        variant: "destructive",
      })
      return
    }

    const shares = Number.parseInt(quantity)
    const tradePrice = orderType === "market" ? selectedStock.price : Number.parseFloat(price)

    if (isNaN(shares) || shares <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid quantity",
        variant: "destructive",
      })
      return
    }

    if (orderType !== "market" && (isNaN(tradePrice) || tradePrice <= 0)) {
      toast({
        title: "Error",
        description: "Please enter a valid price",
        variant: "destructive",
      })
      return
    }

    setTrading(true)
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "trade",
          symbol: selectedStock.symbol,
          shares,
          price: tradePrice,
          type,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Trade Executed",
          description: `Successfully ${type === "buy" ? "bought" : "sold"} ${shares} shares of ${selectedStock.symbol} at $${tradePrice}`,
        })
        setQuantity("")
        setPrice("")
      } else {
        toast({
          title: "Trade Failed",
          description: result.error || "Failed to execute trade",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Trade execution failed:", error)
      toast({
        title: "Error",
        description: "Failed to execute trade",
        variant: "destructive",
      })
    } finally {
      setTrading(false)
    }
  }

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading trading interface...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trading Interface</h1>
          <p className="text-muted-foreground">
            Execute paper trades with AI-powered insights and real-time market data.
          </p>
        </div>
        <Button onClick={fetchStocks}>
          <TrendingUp className="mr-2 h-4 w-4" />
          Refresh Prices
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Stock Search and List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Stock Search</CardTitle>
            <CardDescription>Find and select stocks to trade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                <Label className="text-sm font-medium">Available Stocks</Label>
                {filteredStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedStock?.symbol === stock.symbol ? "bg-primary/10 border-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedStock(stock)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="font-semibold">{stock.symbol}</div>
                        <div className="text-sm text-muted-foreground truncate">{stock.name}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-medium">${stock.price}</div>
                        <div
                          className={`text-sm flex items-center ${
                            stock.change > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stock.change > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {stock.change > 0 ? "+" : ""}
                          {stock.change}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart and Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {selectedStock?.symbol} - {selectedStock?.name}
              </span>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Brain className="h-3 w-3" />
                <span>Live Data</span>
              </Badge>
            </CardTitle>
            <CardDescription>
              Current Price: ${selectedStock?.price}
              <span className={`ml-2 ${selectedStock && selectedStock.change > 0 ? "text-green-600" : "text-red-600"}`}>
                ({selectedStock && selectedStock.change > 0 ? "+" : ""}
                {selectedStock?.change})
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>{selectedStock && <StockChart symbol={selectedStock.symbol} />}</CardContent>
        </Card>

        {/* AI Assistant */}
        <div className="lg:col-span-1">
          {selectedStock && <AITradingAssistant symbol={selectedStock.symbol} price={selectedStock.price} />}
        </div>
      </div>

      {/* Trading Panel */}
      {selectedStock && (
        <Card>
          <CardHeader>
            <CardTitle>Place Order</CardTitle>
            <CardDescription>Execute a paper trade for {selectedStock.symbol}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="buy" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="order-type">Order Type</Label>
                    <Select value={orderType} onValueChange={setOrderType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Market Order</SelectItem>
                        <SelectItem value="limit">Limit Order</SelectItem>
                        <SelectItem value="stop">Stop Order</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Number of shares"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  {orderType !== "market" && (
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="Price per share"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Estimated Total</Label>
                    <div className="flex items-center h-10 px-3 border rounded-md bg-muted">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="font-medium">
                        {quantity
                          ? (
                              Number.parseInt(quantity) *
                              (orderType === "market" ? selectedStock.price : Number.parseFloat(price) || 0)
                            ).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => executeTrade("buy")}
                    disabled={trading}
                  >
                    {trading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <DollarSign className="mr-2 h-4 w-4" />
                    )}
                    {trading ? "Executing..." : "Place Buy Order"}
                  </Button>
                  <Button variant="outline">Add to Watchlist</Button>
                </div>
              </TabsContent>

              <TabsContent value="sell" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="order-type-sell">Order Type</Label>
                    <Select value={orderType} onValueChange={setOrderType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Market Order</SelectItem>
                        <SelectItem value="limit">Limit Order</SelectItem>
                        <SelectItem value="stop">Stop Order</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity-sell">Quantity</Label>
                    <Input
                      id="quantity-sell"
                      type="number"
                      placeholder="Number of shares"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  {orderType !== "market" && (
                    <div className="space-y-2">
                      <Label htmlFor="price-sell">Price</Label>
                      <Input
                        id="price-sell"
                        type="number"
                        step="0.01"
                        placeholder="Price per share"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Estimated Total</Label>
                    <div className="flex items-center h-10 px-3 border rounded-md bg-muted">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span className="font-medium">
                        {quantity
                          ? (
                              Number.parseInt(quantity) *
                              (orderType === "market" ? selectedStock.price : Number.parseFloat(price) || 0)
                            ).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => executeTrade("sell")}
                    disabled={trading}
                  >
                    {trading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <DollarSign className="mr-2 h-4 w-4" />
                    )}
                    {trading ? "Executing..." : "Place Sell Order"}
                  </Button>
                  <Button variant="outline">Set Stop Loss</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
