"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, TrendingDown, Clock, ExternalLink, Brain } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const newsArticles = [
  {
    id: 1,
    title: "Apple Reports Strong Q4 Earnings, Beats Expectations",
    summary:
      "Apple Inc. reported quarterly earnings that exceeded analyst expectations, driven by strong iPhone sales and services revenue.",
    source: "Financial Times",
    time: "2 hours ago",
    sentiment: "Positive",
    sentimentScore: 85,
    impact: "High",
    relatedStocks: ["AAPL"],
    url: "#",
  },
  {
    id: 2,
    title: "Federal Reserve Signals Potential Rate Cut in Next Meeting",
    summary:
      "The Federal Reserve indicated a possible interest rate reduction following recent economic data showing slower inflation.",
    source: "Reuters",
    time: "4 hours ago",
    sentiment: "Positive",
    sentimentScore: 72,
    impact: "Very High",
    relatedStocks: ["SPY", "QQQ"],
    url: "#",
  },
  {
    id: 3,
    title: "Tesla Faces Production Challenges in Shanghai Factory",
    summary:
      "Tesla's Shanghai Gigafactory is experiencing production delays due to supply chain disruptions affecting vehicle deliveries.",
    source: "Bloomberg",
    time: "6 hours ago",
    sentiment: "Negative",
    sentimentScore: 25,
    impact: "Medium",
    relatedStocks: ["TSLA"],
    url: "#",
  },
  {
    id: 4,
    title: "Microsoft Azure Cloud Revenue Surges 30% Year-over-Year",
    summary:
      "Microsoft's cloud computing division continues to show strong growth, capturing market share from competitors.",
    source: "TechCrunch",
    time: "8 hours ago",
    sentiment: "Positive",
    sentimentScore: 78,
    impact: "High",
    relatedStocks: ["MSFT"],
    url: "#",
  },
  {
    id: 5,
    title: "Oil Prices Decline Amid Global Economic Concerns",
    summary: "Crude oil prices dropped 3% as investors worry about potential recession and reduced energy demand.",
    source: "Wall Street Journal",
    time: "10 hours ago",
    sentiment: "Negative",
    sentimentScore: 35,
    impact: "Medium",
    relatedStocks: ["XOM", "CVX"],
    url: "#",
  },
]

const sentimentTrends = [
  { sector: "Technology", score: 78, change: +5, articles: 45 },
  { sector: "Healthcare", score: 65, change: +2, articles: 32 },
  { sector: "Financial", score: 58, change: -3, articles: 28 },
  { sector: "Energy", score: 42, change: -8, articles: 22 },
  { sector: "Consumer", score: 71, change: +4, articles: 38 },
]

export function NewsAndSentiment() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">News & Sentiment Analysis</h1>
          <p className="text-muted-foreground">
            Real-time market news with AI-powered sentiment analysis and impact assessment.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* News Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market News Feed</CardTitle>
              <CardDescription>Latest financial news with sentiment analysis</CardDescription>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search news articles..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All News</TabsTrigger>
                  <TabsTrigger value="positive">Positive</TabsTrigger>
                  <TabsTrigger value="negative">Negative</TabsTrigger>
                  <TabsTrigger value="high-impact">High Impact</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-4">
                  {newsArticles.map((article) => (
                    <div key={article.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg leading-tight">{article.title}</h3>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-muted-foreground text-sm">{article.summary}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{article.source}</span>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {article.time}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {article.relatedStocks.map((stock) => (
                            <Badge key={stock} variant="outline" className="text-xs">
                              {stock}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Brain className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">AI Sentiment:</span>
                            <Badge
                              variant={article.sentiment === "Positive" ? "default" : "destructive"}
                              className={article.sentiment === "Positive" ? "bg-green-600" : "bg-red-600"}
                            >
                              {article.sentiment}
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Score:</span>
                            <span className="text-sm font-medium">{article.sentimentScore}%</span>
                          </div>
                        </div>

                        <Badge variant="outline">{article.impact} Impact</Badge>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sentiment Dashboard */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sector Sentiment</CardTitle>
              <CardDescription>Real-time sentiment analysis by sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentimentTrends.map((sector) => (
                  <div key={sector.sector} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{sector.sector}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{sector.score}%</span>
                        <div
                          className={`flex items-center text-xs ${
                            sector.change > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {sector.change > 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span className="ml-1">
                            {sector.change > 0 ? "+" : ""}
                            {sector.change}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Progress value={sector.score} className="h-2" />
                    <div className="text-xs text-muted-foreground">Based on {sector.articles} articles</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Mood</CardTitle>
              <CardDescription>Overall market sentiment indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">Bullish</div>
                  <div className="text-sm text-muted-foreground">Overall Market Sentiment</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">68%</div>
                    <div className="text-xs text-muted-foreground">Positive News</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">32%</div>
                    <div className="text-xs text-muted-foreground">Negative News</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span>Fear & Greed Index</span>
                    <span className="font-medium">72 (Greed)</span>
                  </div>
                  <Progress value={72} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
              <CardDescription>Most discussed topics today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Federal Reserve", "Earnings Season", "AI Technology", "Oil Prices", "Inflation Data"].map(
                  (topic, index) => (
                    <div key={topic} className="flex items-center justify-between p-2 rounded border">
                      <span className="text-sm">{topic}</span>
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
