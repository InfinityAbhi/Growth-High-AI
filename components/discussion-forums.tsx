"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MessageSquare, ThumbsUp, Clock, TrendingUp, Plus, Search } from "lucide-react"

const forumCategories = [
  { name: "General Discussion", posts: 1234, members: 5678 },
  { name: "Stock Analysis", posts: 892, members: 3456 },
  { name: "Trading Strategies", posts: 567, members: 2345 },
  { name: "Market News", posts: 445, members: 1890 },
  { name: "Beginner Questions", posts: 678, members: 4567 },
  { name: "AI & Technology", posts: 234, members: 1234 },
]

const discussions = [
  {
    id: 1,
    title: "AAPL Earnings Analysis - What's Your Take?",
    author: "TradingPro2024",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "Stock Analysis",
    replies: 23,
    likes: 45,
    time: "2 hours ago",
    content:
      "Apple just released their Q4 earnings and they beat expectations on both revenue and EPS. The services segment showed particularly strong growth...",
    tags: ["AAPL", "Earnings", "Analysis"],
    isHot: true,
  },
  {
    id: 2,
    title: "Best AI Stocks for 2024 - Discussion Thread",
    author: "AIInvestor",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "AI & Technology",
    replies: 67,
    likes: 89,
    time: "4 hours ago",
    content:
      "With the AI boom continuing, I wanted to start a discussion about the best AI stocks to watch in 2024. Here are my top picks...",
    tags: ["AI", "Technology", "2024"],
    isHot: true,
  },
  {
    id: 3,
    title: "Risk Management Strategies for Volatile Markets",
    author: "RiskManager",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "Trading Strategies",
    replies: 34,
    likes: 56,
    time: "6 hours ago",
    content:
      "In these uncertain times, proper risk management is crucial. I'd like to share some strategies that have worked well for me...",
    tags: ["Risk Management", "Strategy", "Volatility"],
    isHot: false,
  },
  {
    id: 4,
    title: "Beginner's Guide to Paper Trading",
    author: "MarketMentor",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "Beginner Questions",
    replies: 12,
    likes: 28,
    time: "8 hours ago",
    content:
      "For those just starting out, paper trading is an excellent way to learn without risking real money. Here's what you need to know...",
    tags: ["Beginner", "Paper Trading", "Education"],
    isHot: false,
  },
  {
    id: 5,
    title: "Federal Reserve Decision Impact on Tech Stocks",
    author: "MacroAnalyst",
    avatar: "/placeholder.svg?height=32&width=32",
    category: "Market News",
    replies: 45,
    likes: 67,
    time: "12 hours ago",
    content:
      "The Fed's latest decision has significant implications for tech stocks. Let's discuss how this might affect our portfolios...",
    tags: ["Fed", "Tech Stocks", "Macro"],
    isHot: false,
  },
]

export function DiscussionForums() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discussion Forums</h1>
          <p className="text-muted-foreground">
            Connect with fellow traders, share insights, and learn from the community.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Start New Discussion</DialogTitle>
              <DialogDescription>
                Share your thoughts, ask questions, or start a conversation with the community.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter discussion title..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="Select category..."
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Share your thoughts..."
                  className="min-h-[100px]"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
              <Button className="w-full">Post Discussion</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Categories Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Browse discussion topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === "All" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("All")}
              >
                All Discussions
              </Button>
              {forumCategories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.posts}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Discussion Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search discussions..." className="pl-8" />
                </div>
                <Tabs defaultValue="recent" className="w-auto">
                  <TabsList>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="hot">Hot</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Discussion List */}
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={discussion.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{discussion.author}</span>
                            {discussion.isHot && (
                              <Badge variant="destructive" className="text-xs">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Hot
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {discussion.category}
                            </Badge>
                            <Clock className="h-3 w-3" />
                            <span>{discussion.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{discussion.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{discussion.content}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {discussion.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {discussion.replies} replies
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        Join Discussion
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
