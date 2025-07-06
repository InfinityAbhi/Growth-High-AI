import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertTriangle, Target } from "lucide-react"

const insights = [
  {
    type: "recommendation",
    icon: TrendingUp,
    title: "Strong Buy Signal",
    description: "NVDA shows strong momentum with 89% confidence",
    confidence: 89,
    color: "text-green-600",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Risk Alert",
    description: "High volatility detected in your tech holdings",
    confidence: 76,
    color: "text-yellow-600",
  },
  {
    type: "opportunity",
    icon: Target,
    title: "Diversification Opportunity",
    description: "Consider adding healthcare stocks to balance portfolio",
    confidence: 82,
    color: "text-blue-600",
  },
]

export function AIInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>AI Insights</span>
        </CardTitle>
        <CardDescription>Personalized recommendations based on market analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
              <insight.icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${insight.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium truncate">{insight.title}</h4>
                  <Badge variant="outline" className="ml-2 flex-shrink-0 text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
