import { type NextRequest, NextResponse } from "next/server"

// Mock news data for demonstration
const mockNews = [
  {
    id: 1,
    title: "Federal Reserve Signals Potential Rate Changes",
    summary:
      "The Federal Reserve indicated possible monetary policy adjustments following recent economic data showing mixed signals in inflation and employment metrics.",
    source: "Financial Times",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    sentiment: "neutral",
    sentimentScore: 55,
    impact: "high",
    relatedSymbols: ["SPY", "QQQ", "IWM"],
    url: "#",
  },
  {
    id: 2,
    title: "Tech Sector Shows Strong Earnings Growth",
    summary:
      "Major technology companies reported better-than-expected quarterly earnings, driven by AI investments and cloud computing demand.",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    sentiment: "positive",
    sentimentScore: 78,
    impact: "high",
    relatedSymbols: ["AAPL", "MSFT", "GOOGL", "NVDA"],
    url: "#",
  },
  {
    id: 3,
    title: "Energy Sector Faces Headwinds",
    summary:
      "Oil prices declined amid concerns about global demand and increased production capacity, affecting energy sector valuations.",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    sentiment: "negative",
    sentimentScore: 32,
    impact: "medium",
    relatedSymbols: ["XOM", "CVX", "COP"],
    url: "#",
  },
  {
    id: 4,
    title: "Healthcare Innovation Drives Investment",
    summary:
      "Breakthrough developments in biotechnology and medical devices are attracting significant investment, boosting healthcare stocks.",
    source: "Wall Street Journal",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    sentiment: "positive",
    sentimentScore: 72,
    impact: "medium",
    relatedSymbols: ["JNJ", "PFE", "UNH"],
    url: "#",
  },
  {
    id: 5,
    title: "Consumer Spending Patterns Shift",
    summary:
      "Recent data shows changing consumer preferences affecting retail and e-commerce sectors, with mixed implications for different companies.",
    source: "CNBC",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    sentiment: "neutral",
    sentimentScore: 48,
    impact: "medium",
    relatedSymbols: ["AMZN", "WMT", "TGT"],
    url: "#",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get("symbol")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let filteredNews = mockNews

    if (symbol) {
      filteredNews = mockNews.filter((news) => news.relatedSymbols.includes(symbol.toUpperCase()))
    }

    // Add AI sentiment analysis to each news item
    const newsWithAI = filteredNews.slice(0, limit).map((news) => ({
      ...news,
      aiInsights: generateAIInsights(news),
    }))

    return NextResponse.json({
      news: newsWithAI,
      totalCount: filteredNews.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("News API Error:", error)
    return NextResponse.json({
      news: mockNews.slice(0, 5),
      totalCount: mockNews.length,
      timestamp: new Date().toISOString(),
    })
  }
}

function generateAIInsights(news: any) {
  const insights = [
    "This news could impact market volatility in the short term.",
    "Long-term implications suggest sector rotation opportunities.",
    "Consider adjusting portfolio allocation based on this development.",
    "Monitor related stocks for potential trading opportunities.",
    "Risk management strategies should account for this factor.",
  ]

  return {
    marketImpact: news.impact,
    tradingSignal: news.sentimentScore > 60 ? "bullish" : news.sentimentScore < 40 ? "bearish" : "neutral",
    keyInsight: insights[Math.floor(Math.random() * insights.length)],
    affectedSectors: news.relatedSymbols.length > 2 ? ["Technology", "Finance"] : ["Individual Stock"],
  }
}
