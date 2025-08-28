"use client"

import { useAuth } from "@/components/auth-provider"
import { LoginForm } from "@/components/login-form"
import { Navigation } from "@/components/navigation"
import { BuyerDashboard } from "@/components/buyer-dashboard"
import { FounderDashboard } from "@/components/founder-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user.role === "buyer" && <BuyerDashboard />}
        {user.role === "founder" && <FounderDashboard />}
        {user.role === "admin" && <AdminDashboard />}
      </main>
    </div>
  )
}
