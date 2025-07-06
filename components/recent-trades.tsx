import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

const trades = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "BUY",
    shares: 50,
    price: 175.23,
    change: +2.34,
    time: "2 hours ago",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    type: "SELL",
    shares: 25,
    price: 142.67,
    change: -1.23,
    time: "5 hours ago",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    type: "BUY",
    shares: 30,
    price: 378.91,
    change: +5.67,
    time: "1 day ago",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    type: "SELL",
    shares: 15,
    price: 234.56,
    change: -8.9,
    time: "2 days ago",
  },
]

export function RecentTrades() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Trades</CardTitle>
        <CardDescription>Your latest trading activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trades.map((trade, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{trade.symbol}</span>
                    <Badge variant={trade.type === "BUY" ? "default" : "secondary"}>{trade.type}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{trade.name}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">${trade.price}</span>
                  <div className={`flex items-center ${trade.change > 0 ? "text-green-600" : "text-red-600"}`}>
                    {trade.change > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    <span className="text-sm">
                      {trade.change > 0 ? "+" : ""}
                      {trade.change}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {trade.shares} shares • {trade.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
