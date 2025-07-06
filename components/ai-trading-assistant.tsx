"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Send, Loader2, TrendingUp, AlertTriangle, Target } from "lucide-react"

interface AIAnalysis {
  analysis: string
  confidence: number
  recommendation: string
  riskLevel: string
  timestamp: string
}

interface AIPrediction {
  symbol: string
  currentPrice: number
  predictedPrice: number
  confidence: number
  timeframe: string
  factors: string[]
  riskFactors: string[]
  aiAnalysis: string
}

export function AITradingAssistant({ symbol, price }: { symbol: string; price: number }) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [prediction, setPrediction] = useState<AIPrediction | null>(null)
  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState("")

  const getAIAnalysis = async (action: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          price,
          action,
          context: `Current market conditions and ${symbol} analysis`,
        }),
      })

      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      console.error("AI Analysis failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPricePrediction = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          currentPrice: price,
          historicalData: [], // In real app, pass historical price data
        }),
      })

      const data = await response.json()
      setPrediction(data)
    } catch (error) {
      console.error("Price prediction failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const askAIQuestion = async () => {
    if (!question.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol,
          price,
          action: "custom_question",
          context: question,
        }),
      })

      const data = await response.json()
      setAnalysis(data)
      setQuestion("")
    } catch (error) {
      console.error("AI question failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>AI Trading Assistant</span>
        </CardTitle>
        <CardDescription>Get AI-powered analysis and predictions for {symbol}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => getAIAnalysis("buy")} disabled={loading}>
            {loading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
            Buy Analysis
          </Button>
          <Button size="sm" variant="outline" onClick={() => getAIAnalysis("sell")} disabled={loading}>
            {loading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
            Sell Analysis
          </Button>
          <Button size="sm" variant="outline" onClick={getPricePrediction} disabled={loading}>
            {loading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Target className="h-3 w-3 mr-1" />}
            Price Prediction
          </Button>
        </div>

        {/* Custom Question */}
        <div className="space-y-2">
          <Textarea
            placeholder="Ask AI anything about this stock..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[80px]"
          />
          <Button onClick={askAIQuestion} disabled={loading || !question.trim()} className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
            Ask AI
          </Button>
        </div>

        {/* AI Analysis Results */}
        {analysis && (
          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">AI Analysis</h4>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    analysis.recommendation === "Strong Buy"
                      ? "default"
                      : analysis.recommendation === "Buy"
                        ? "secondary"
                        : analysis.recommendation === "Hold"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {analysis.recommendation}
                </Badge>
                <Badge variant="outline">{analysis.confidence}% confidence</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{analysis.analysis}</p>
            <div className="flex items-center justify-between text-xs">
              <span>
                Risk Level: <strong>{analysis.riskLevel}</strong>
              </span>
              <span>{new Date(analysis.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        )}

        {/* Price Prediction Results */}
        {prediction && (
          <div className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Price Prediction</h4>
              <Badge variant="outline">{prediction.confidence}% confidence</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Current Price:</span>
                <div className="font-semibold">${prediction.currentPrice}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Predicted Price:</span>
                <div
                  className={`font-semibold ${
                    prediction.predictedPrice > prediction.currentPrice ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${prediction.predictedPrice}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">Key Factors:</span>
                <ul className="text-xs text-muted-foreground mt-1">
                  {prediction.factors.map((factor, index) => (
                    <li key={index}>• {factor}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-sm font-medium">Risk Factors:</span>
                <ul className="text-xs text-muted-foreground mt-1">
                  {prediction.riskFactors.map((risk, index) => (
                    <li key={index}>• {risk}</li>
                  ))}
                </ul>
              </div>
            </div>

            {prediction.aiAnalysis && (
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">{prediction.aiAnalysis}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
