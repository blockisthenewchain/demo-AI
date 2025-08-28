"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export function Navigation() {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">PilotStack</h1>
            <div className="ml-8 flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user.name} ({user.role})
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
