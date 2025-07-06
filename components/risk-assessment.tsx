"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Target, AlertTriangle, Shield, TrendingDown, TrendingUp, BarChart3 } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const riskMetrics = [
  {
    category: "Overall Portfolio Risk",
    score: 65,
    level: "Medium",
    color: "text-yellow-600",
    description: "Your portfolio has moderate risk exposure with balanced diversification.",
  },
  {
    category: "Volatility Risk",
    score: 45,
    level: "Low",
    color: "text-green-600",
    description: "Low volatility indicates stable price movements in your holdings.",
  },
  {
    category: "Concentration Risk",
    score: 78,
    level: "High",
    color: "text-red-600",
    description: "High concentration in tech sector increases portfolio risk.",
  },
  {
    category: "Market Risk",
    score: 58,
    level: "Medium",
    color: "text-yellow-600",
    description: "Moderate exposure to overall market movements.",
  },
]

const riskFactors = [
  {
    factor: "Sector Concentration",
    impact: "High",
    description: "45% allocation to technology sector",
    recommendation: "Diversify into other sectors",
    priority: "High",
  },
  {
    factor: "Geographic Exposure",
    impact: "Medium",
    description: "85% US market exposure",
    recommendation: "Consider international diversification",
    priority: "Medium",
  },
  {
    factor: "Company Size",
    impact: "Low",
    description: "Good mix of large and mid-cap stocks",
    recommendation: "Maintain current allocation",
    priority: "Low",
  },
  {
    factor: "Currency Risk",
    impact: "Low",
    description: "Minimal foreign currency exposure",
    recommendation: "Monitor if adding international positions",
    priority: "Low",
  },
]

const valueAtRisk = [
  { period: "1 Day", var95: -2.1, var99: -3.2 },
  { period: "1 Week", var95: -4.8, var99: -7.1 },
  { period: "1 Month", var95: -8.5, var99: -12.3 },
  { period: "3 Months", var95: -15.2, var99: -22.1 },
]

const riskTrendData = [
  { date: "Jan", risk: 45 },
  { date: "Feb", risk: 52 },
  { date: "Mar", risk: 48 },
  { date: "Apr", risk: 58 },
  { date: "May", risk: 62 },
  { date: "Jun", risk: 65 },
  { date: "Jul", risk: 65 },
]

const chartConfig = {
  risk: {
    label: "Risk Score",
    color: "hsl(var(--chart-1))",
  },
}

export function RiskAssessment() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Assessment</h1>
          <p className="text-muted-foreground">Comprehensive analysis of your portfolio's risk profile and exposure.</p>
        </div>
        <Button>
          <Shield className="mr-2 h-4 w-4" />
          Generate Risk Report
        </Button>
      </div>

      {/* Risk Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {riskMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.category}</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.score}/100</div>
              <div className={`text-sm ${metric.color}`}>{metric.level} Risk</div>
              <Progress value={metric.score} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Risk Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Trend Analysis</CardTitle>
            <CardDescription>Portfolio risk score over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={riskTrendData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="risk"
                    stroke="var(--color-risk)"
                    fill="var(--color-risk)"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Value at Risk */}
        <Card>
          <CardHeader>
            <CardTitle>Value at Risk (VaR)</CardTitle>
            <CardDescription>Potential losses at different confidence levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {valueAtRisk.map((var_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{var_.period}</span>
                  <div className="text-right">
                    <div className="text-sm text-red-600">95% VaR: {var_.var95}%</div>
                    <div className="text-xs text-red-700">99% VaR: {var_.var99}%</div>
                  </div>
                </div>
              ))}
            </div>
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Risk Interpretation</AlertTitle>
              <AlertDescription>
                There's a 5% chance your portfolio could lose more than 8.5% in the next month.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Risk Factors Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Factors Analysis</CardTitle>
          <CardDescription>Detailed breakdown of portfolio risk components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{factor.factor}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        factor.impact === "High" ? "destructive" : factor.impact === "Medium" ? "secondary" : "outline"
                      }
                    >
                      {factor.impact} Impact
                    </Badge>
                    <Badge variant="outline">{factor.priority} Priority</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{factor.description}</p>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Recommendation:</span>
                  <span className="text-sm">{factor.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Mitigation Strategies */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Mitigation Strategies</CardTitle>
          <CardDescription>AI-recommended actions to reduce portfolio risk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-700">Diversification</span>
              </div>
              <p className="text-sm text-green-600 mb-3">
                Reduce concentration risk by diversifying across sectors and geographies.
              </p>
              <Button size="sm" variant="outline">
                View Suggestions
              </Button>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-700">Hedging</span>
              </div>
              <p className="text-sm text-blue-600 mb-3">
                Consider defensive positions or hedging strategies during volatile periods.
              </p>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingDown className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-700">Position Sizing</span>
              </div>
              <p className="text-sm text-yellow-600 mb-3">
                Optimize position sizes based on risk-adjusted returns and volatility.
              </p>
              <Button size="sm" variant="outline">
                Optimize Now
              </Button>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-purple-700">Rebalancing</span>
              </div>
              <p className="text-sm text-purple-600 mb-3">
                Regular rebalancing helps maintain target risk levels and asset allocation.
              </p>
              <Button size="sm" variant="outline">
                Schedule Rebalancing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
