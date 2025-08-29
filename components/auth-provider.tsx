"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/auth"
import { isDemoSessionExpired } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return

    // Check for stored user on mount
    const storedUser = localStorage.getItem("pilotstack-user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      // Check if demo session is expired
      if (parsedUser.isDemo && isDemoSessionExpired(parsedUser)) {
        logout() // Automatically logout expired demo sessions
      } else {
        setUser(parsedUser)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (user: User) => {
    setUser(user)
    localStorage.setItem("pilotstack-user", JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pilotstack-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
