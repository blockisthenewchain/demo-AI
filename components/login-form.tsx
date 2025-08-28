"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { authenticateUser } from "@/lib/auth"
import { useAuth } from "@/components/auth-provider"
import { ShoppingCart, Rocket, Shield } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const user = authenticateUser(email, password)
    if (user) {
      login(user)
    } else {
      setError("Invalid credentials. Note: Password is same as email address.")
    }
  }

  const handleQuickLogin = (email: string) => {
    setError("")
    const user = authenticateUser(email, email) // Using email as password
    if (user) {
      login(user)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">PilotStack</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or quick login</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleQuickLogin("buyer@example.com")}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Login as Buyer
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleQuickLogin("founder@example.com")}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Login as Founder
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleQuickLogin("admin@example.com")}
            >
              <Shield className="w-4 h-4 mr-2" />
              Login as Admin
            </Button>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            <p className="font-medium mb-2">Demo accounts:</p>
            <ul className="space-y-1">
              <li>• buyer@example.com (Buyer)</li>
              <li>• founder@example.com (Founder)</li>
              <li>• admin@example.com (Admin)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
