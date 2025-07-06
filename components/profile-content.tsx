"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { User, Mail, MapPin, Calendar, Trophy, Target, TrendingUp, Loader2 } from "lucide-react"

// Static demo user data
const demoUser = {
  id: "demo",
  email: "demo@example.com",
  firstName: "Demo",
  lastName: "User",
  createdAt: new Date().toISOString(),
  profile: {
    bio: "Demo user for testing the platform",
    phone: "+1 (555) 123-4567",
    riskTolerance: "Medium",
    tradingStyle: "Swing Trading",
    preferredSectors: "Technology, Healthcare, Finance",
    investmentGoals: "Long-term wealth building through diversified portfolio",
    achievements: ["First Trade", "Profitable Month", "Risk Manager"],
  },
  portfolio: {
    cash: 75000,
    positions: [
      { symbol: "AAPL", shares: 50, avgPrice: 170.0, currentPrice: 175.23 },
      { symbol: "GOOGL", shares: 25, avgPrice: 140.0, currentPrice: 142.67 },
      { symbol: "MSFT", shares: 30, avgPrice: 375.0, currentPrice: 378.91 },
    ],
    trades: [],
    totalValue: 125430,
    totalReturn: 25430,
    totalReturnPercent: 25.43,
  },
}

export function ProfileContent() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: demoUser.firstName,
    lastName: demoUser.lastName,
    email: demoUser.email,
    phone: demoUser.profile.phone,
    bio: demoUser.profile.bio,
    riskTolerance: demoUser.profile.riskTolerance,
    tradingStyle: demoUser.profile.tradingStyle,
    preferredSectors: demoUser.preferredSectors,
    investmentGoals: demoUser.investmentGoals,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const achievements = [
    { name: "First Trade", icon: Trophy, color: "text-yellow-500", earned: true },
    { name: "Profitable Month", icon: TrendingUp, color: "text-green-500", earned: true },
    { name: "Risk Manager", icon: Target, color: "text-blue-500", earned: true },
    { name: "Community Contributor", icon: User, color: "text-purple-500", earned: false },
  ]

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and trading preferences.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback className="text-2xl">
                {demoUser.firstName[0]}
                {demoUser.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <CardTitle>
              {demoUser.firstName} {demoUser.lastName}
            </CardTitle>
            <CardDescription>Paper Trading Enthusiast</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{demoUser.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Joined {new Date(demoUser.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{demoUser.profile.phone}</span>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Trading Level</h4>
              <Badge variant="default" className="bg-green-600">
                <Trophy className="h-3 w-3 mr-1" />
                Advanced Trader
              </Badge>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Portfolio Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Value:</span>
                  <span className="font-medium">${demoUser.portfolio.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Return:</span>
                  <span className="font-medium text-green-600">
                    +${demoUser.portfolio.totalReturn.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Positions:</span>
                  <span className="font-medium">{demoUser.portfolio.positions.length}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="trading">Trading Preferences</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} disabled />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Tell us about yourself..."
                        value={formData.bio}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trading" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trading Preferences</CardTitle>
                  <CardDescription>Configure your trading settings and risk preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                        <Input
                          id="riskTolerance"
                          name="riskTolerance"
                          value={formData.riskTolerance}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tradingStyle">Trading Style</Label>
                        <Input
                          id="tradingStyle"
                          name="tradingStyle"
                          value={formData.tradingStyle}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferredSectors">Preferred Sectors</Label>
                      <Input
                        id="preferredSectors"
                        name="preferredSectors"
                        value={formData.preferredSectors}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="investmentGoals">Investment Goals</Label>
                      <Textarea
                        id="investmentGoals"
                        name="investmentGoals"
                        placeholder="What are your investment goals?"
                        value={formData.investmentGoals}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Update Preferences
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trading Achievements</CardTitle>
                  <CardDescription>Your milestones and accomplishments on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg ${achievement.earned ? "bg-muted/50" : "opacity-50"}`}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                          <span className="font-medium">{achievement.name}</span>
                          {achievement.earned && <Badge variant="default">Earned</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {achievement.earned ? "Achievement unlocked!" : "Keep trading to unlock this achievement"}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
