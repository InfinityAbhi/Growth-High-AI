"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, TrendingDown, Target, AlertTriangle, Lightbulb } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"

const predictiveData = [
  { stock: "AAPL", prediction: 185.5, current: 175.23, confidence: 87, trend: "up" },
  { stock: "GOOGL", prediction: 155.3, current: 142.67, confidence: 82, trend: "up" },
  { stock: "MSFT", prediction: 365.2, current: 378.91, confidence: 75, trend: "down" },
  { stock: "TSLA", prediction: 265.8, current: 234.56, confidence: 69, trend: "up" },
  { stock: "NVDA", prediction: 485.6, current: 456.89, confidence: 91, trend: "up" },
]

const riskAnalysis = [
  {
    category: "Portfolio Diversification",
    score: 78,
    status: "Good",
    recommendation: "Consider adding international exposure",
  },
  { category: "Sector Concentration", score: 65, status: "Moderate", recommendation: "Reduce tech sector weighting" },
  { category: "Volatility Risk", score: 82, status: "Low", recommendation: "Current volatility levels are acceptable" },
  { category: "Correlation Risk", score: 58, status: "High", recommendation: "Holdings are highly correlated" },
]

const performanceMetrics = [
  { metric: "Sharpe Ratio", value: 1.45, benchmark: 1.2, status: "outperforming" },
  { metric: "Alpha", value: 0.08, benchmark: 0.0, status: "outperforming" },
  { metric: "Beta", value: 1.12, benchmark: 1.0, status: "higher" },
  { metric: "Max Drawdown", value: -8.5, benchmark: -12.0, status: "better" },
]

const sectorAllocation = [
  { name: "Technology", value: 45, color: "#8884d8" },
  { name: "Healthcare", value: 20, color: "#82ca9d" },
  { name: "Financial", value: 15, color: "#ffc658" },
  { name: "Consumer", value: 12, color: "#ff7300" },
  { name: "Energy", value: 8, color: "#00ff00" },
]

const chartConfig = {
  prediction: {
    label: "Prediction",
    color: "hsl(var(--chart-1))",
  },
  current: {
    label: "Current",
    color: "hsl(var(--chart-2))",
  },
}

export function AIAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Advanced AI-powered insights, predictions, and risk analysis for your portfolio.
          </p>
        </div>
        <Button>
          <Brain className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Stock Price Predictions</CardTitle>
                <CardDescription>AI-generated price forecasts for next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={predictiveData}>
                      <XAxis dataKey="stock" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="current" fill="var(--color-current)" name="Current Price" />
                      <Bar dataKey="prediction" fill="var(--color-prediction)" name="Predicted Price" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prediction Confidence</CardTitle>
                <CardDescription>AI model confidence levels for each prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictiveData.map((item) => (
                    <div key={item.stock} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.stock}</span>
                          <Badge variant={item.trend === "up" ? "default" : "secondary"}>
                            {item.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {item.trend === "up" ? "Bullish" : "Bearish"}
                          </Badge>
                        </div>
                        <span className="text-sm font-medium">{item.confidence}%</span>
                      </div>
                      <Progress value={item.confidence} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Current: ${item.current}</span>
                        <span>Predicted: ${item.prediction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Comprehensive portfolio risk analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {riskAnalysis.map((risk, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{risk.category}</span>
                        <Badge
                          variant={
                            risk.status === "Good"
                              ? "default"
                              : risk.status === "Moderate"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {risk.status}
                        </Badge>
                      </div>
                      <Progress value={risk.score} className="h-2" />
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <p className="text-sm text-muted-foreground">{risk.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
                <CardDescription>Current sector distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorAllocation}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {sectorAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators vs benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{metric.metric}</span>
                      <Badge
                        variant={
                          metric.status === "outperforming" || metric.status === "better" ? "default" : "secondary"
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        Your Portfolio: <strong>{metric.value}</strong>
                      </span>
                      <span className="text-muted-foreground">Benchmark: {metric.benchmark}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Personalized investment suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Target className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Rebalancing Opportunity</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Consider reducing tech exposure by 10% and increasing healthcare allocation.
                      </p>
                      <Badge variant="outline" className="mt-2">
                        High Priority
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Growth Opportunity</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        NVDA shows strong momentum with 91% AI confidence. Consider increasing position.
                      </p>
                      <Badge variant="outline" className="mt-2">
                        Medium Priority
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Risk Alert</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        High correlation between your top holdings may increase portfolio risk.
                      </p>
                      <Badge variant="outline" className="mt-2">
                        Low Priority
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Outlook</CardTitle>
                <CardDescription>AI-powered market analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-lg font-semibold text-green-700">Bullish Outlook</div>
                    <div className="text-sm text-green-600">Next 30 Days</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Market Sentiment</span>
                      <Badge variant="default">Positive</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Volatility Forecast</span>
                      <Badge variant="secondary">Low</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Economic Indicators</span>
                      <Badge variant="default">Favorable</Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Key Factors</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Strong earnings season performance</li>
                      <li>• Federal Reserve policy stability</li>
                      <li>• Technology sector momentum</li>
                      <li>• Consumer spending resilience</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
