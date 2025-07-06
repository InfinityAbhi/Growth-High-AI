"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
  profile: {
    bio: string
    phone: string
    riskTolerance: string
    tradingStyle: string
    preferredSectors: string
    investmentGoals: string
    achievements: string[]
  }
  portfolio: {
    cash: number
    positions: Array<{
      symbol: string
      shares: number
      avgPrice: number
      currentPrice: number
    }>
    trades: Array<any>
    totalValue: number
    totalReturn: number
    totalReturnPercent: number
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (data: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
  updateProfile: (updates: any) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    if (typeof window === "undefined") {
      setLoading(false)
      return
    }

    const token = localStorage.getItem("token")
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUser(data.user)
        } else {
          localStorage.removeItem("token")
        }
      } else {
        localStorage.removeItem("token")
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}))
        return { success: false, error: errJson.error ?? `HTTP ${response.status}` }
      }

      const data = await response.json()

      if (data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token)
        }
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.error || "Login failed" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Network error - please check your connection" }
    }
  }

  const signup = async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}))
        return { success: false, error: errJson.error ?? `HTTP ${response.status}` }
      }

      const data = await response.json()

      if (data.success) {
        // Auto-login after signup
        return await login(userData.email, userData.password)
      } else {
        return { success: false, error: data.error || "Signup failed" }
      }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, error: "Network error - please check your connection" }
    }
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
    setUser(null)
  }

  const updateProfile = async (updates: any) => {
    if (typeof window === "undefined") {
      return { success: false, error: "Not available on server" }
    }

    const token = localStorage.getItem("token")
    if (!token) return { success: false, error: "Not authenticated" }

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.error || "Update failed" }
      }
    } catch (error) {
      console.error("Profile update error:", error)
      return { success: false, error: "Network error - please check your connection" }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
