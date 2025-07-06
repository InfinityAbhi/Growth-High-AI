"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Mock data for stock price over time
const generateStockData = (symbol: string) => {
  const basePrice = Math.random() * 200 + 100
  const data = []

  for (let i = 0; i < 30; i++) {
    const variation = (Math.random() - 0.5) * 10
    data.push({
      date: `Day ${i + 1}`,
      price: Math.max(basePrice + variation + Math.sin(i / 5) * 20, 50),
    })
  }

  return data
}

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
}

interface StockChartProps {
  symbol: string
}

export function StockChart({ symbol }: StockChartProps) {
  const data = generateStockData(symbol)

  return (
    <Card>
      <CardContent className="p-4">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="price" stroke="var(--color-price)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
