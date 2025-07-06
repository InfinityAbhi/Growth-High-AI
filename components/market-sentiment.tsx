import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const sentimentData = [
  {
    category: "Overall Market",
    sentiment: "Bullish",
    score: 72,
    change: +5,
    color: "text-green-600",
  },
  {
    category: "Technology",
    sentiment: "Very Bullish",
    score: 85,
    change: +8,
    color: "text-green-600",
  },
  {
    category: "Healthcare",
    sentiment: "Neutral",
    score: 52,
    change: -2,
    color: "text-gray-600",
  },
  {
    category: "Energy",
    sentiment: "Bearish",
    score: 35,
    change: -12,
    color: "text-red-600",
  },
]

export function MarketSentiment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Sentiment Analysis</CardTitle>
        <CardDescription>Real-time sentiment from news and social media</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sentimentData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{item.category}</span>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className={`text-sm ${item.color}`}>{item.sentiment}</span>
                  <div
                    className={`flex items-center ${item.change > 0 ? "text-green-600" : item.change < 0 ? "text-red-600" : "text-gray-600"}`}
                  >
                    {item.change > 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : item.change < 0 ? (
                      <TrendingDown className="h-3 w-3" />
                    ) : (
                      <Minus className="h-3 w-3" />
                    )}
                    <span className="text-xs ml-1">
                      {item.change > 0 ? "+" : ""}
                      {item.change}
                    </span>
                  </div>
                </div>
              </div>
              <Progress value={item.score} className="h-2" />
              <div className="text-xs text-muted-foreground text-right">{item.score}% positive</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
