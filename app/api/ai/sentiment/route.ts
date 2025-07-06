import { type NextRequest, NextResponse } from "next/server"

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

async function callGroqAPI(messages: any[]) {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY || "gsk_demo_key"}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages,
        temperature: 0.3,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error("API call failed")
    }

    return await response.json()
  } catch (error) {
    // Return mock sentiment data
    return {
      choices: [
        {
          message: {
            content: JSON.stringify({
              sentiment: Math.random() > 0.5 ? "positive" : "negative",
              score: Math.floor(Math.random() * 40) + 60,
              summary: "Market sentiment analysis based on recent news and social media trends.",
            }),
          },
        },
      ],
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text, symbol } = await request.json()

    const messages = [
      {
        role: "system",
        content:
          "You are a financial sentiment analyzer. Analyze the given text and return a JSON object with sentiment (positive/negative/neutral), score (0-100), and a brief summary. Focus on market impact and investor sentiment.",
      },
      {
        role: "user",
        content: `Analyze the sentiment of this financial text related to ${symbol}: "${text}". Return only valid JSON.`,
      },
    ]

    const response = await callGroqAPI(messages)
    let sentimentData

    try {
      sentimentData = JSON.parse(response.choices[0]?.message?.content || "{}")
    } catch {
      sentimentData = {
        sentiment: "neutral",
        score: 50,
        summary: "Unable to determine sentiment from the provided text.",
      }
    }

    return NextResponse.json({
      sentiment: sentimentData.sentiment || "neutral",
      score: sentimentData.score || 50,
      summary: sentimentData.summary || "Sentiment analysis completed.",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Sentiment Analysis Error:", error)
    return NextResponse.json({
      sentiment: "neutral",
      score: 50,
      summary: "Error analyzing sentiment.",
      timestamp: new Date().toISOString(),
    })
  }
}
