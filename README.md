# AI TradePro - Paper Trading Platform

A fully functional AI-enhanced paper trading platform with real AI integration using Llama via Groq.

<img width="1896" height="932" alt="Image" src="https://github.com/user-attachments/assets/4ff146fa-4302-463e-b134-6789040d0ca3" />

## Features

- 🤖 **Real AI Integration**: Uses Llama 3 via Groq API for trading analysis
- 📈 **Live Trading Interface**: Paper trading with real-time AI insights
- 📰 **News Analysis**: AI-powered sentiment analysis of market news
- 💬 **Discussion Forums**: Community-driven trading discussions
- 🎯 **Risk Assessment**: AI-powered portfolio risk analysis
- 📊 **Predictive Analytics**: AI price predictions and market forecasts

## Setup Instructions

### 1. Get Groq API Key (Free)
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for a free account
3. Create an API key
4. Copy the API key

### 2. Environment Setup
1. Copy `.env.example` to `.env.local`
2. Add your Groq API key:
   \`\`\`
   GROQ_API_KEY=your_groq_api_key_here
   \`\`\`

### 3. Local Development
\`\`\`bash
npm install
npm run dev
\`\`\`

### 4. Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variable `GROQ_API_KEY` in Vercel dashboard
4. Deploy

## AI Features

### Trading Analysis
- Real-time stock analysis using Llama 3
- Buy/sell recommendations with confidence scores
- Risk assessment and market insights

### Price Predictions
- AI-powered price forecasting
- Technical analysis integration
- Risk factor identification

### Sentiment Analysis
- News sentiment analysis
- Market mood tracking
- Social media sentiment integration

## Deployment Ready

This application is fully configured for deployment on:
- ✅ Vercel (Recommended)
- ✅ Netlify
- ✅ Railway
- ✅ Any Node.js hosting platform

## API Endpoints

- `POST /api/ai/analyze` - Stock analysis
- `POST /api/ai/predict` - Price predictions
- `POST /api/ai/sentiment` - Sentiment analysis
- `GET /api/market/news` - Market news with AI insights

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **AI**: Llama 3 via Groq API
- **UI**: shadcn/ui components
- **Charts**: Recharts
- **Deployment**: Vercel-ready

## Free AI Usage

The platform uses Groq's free tier which provides:
- 30 requests per minute
- 6,000 tokens per minute
- No credit card required

Perfect for development and moderate production usage!
