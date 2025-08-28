"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Brain } from "lucide-react"

interface AllowlistSuggestion {
  id: string
  email: string
  domain: string
  frequency: number
  lastSeen: string
  confidence: number
  reason: string
  status: "pending" | "approved" | "denied"
}

export function AllowlistManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [bulkEmails, setBulkEmails] = useState("")

  const suggestions: AllowlistSuggestion[] = [
    {
      id: "1",
      email: "john.doe@techcorp.com",
      domain: "techcorp.com",
      frequency: 15,
      lastSeen: "2024-01-15T14:30:00Z",
      confidence: 95,
      reason: "High demo engagement, verified company domain",
      status: "pending",
    },
    {
      id: "2",
      email: "sarah@startup.io",
      domain: "startup.io",
      frequency: 8,
      lastSeen: "2024-01-15T13:15:00Z",
      confidence: 87,
      reason: "Multiple demo sessions, legitimate startup domain",
      status: "pending",
    },
    {
      id: "3",
      email: "admin@enterprise.com",
      domain: "enterprise.com",
      frequency: 23,
      lastSeen: "2024-01-15T12:45:00Z",
      confidence: 98,
      reason: "Enterprise domain, consistent usage pattern",
      status: "pending",
    },
    {
      id: "4",
      email: "test@example.com",
      domain: "example.com",
      frequency: 45,
      lastSeen: "2024-01-15T11:30:00Z",
      confidence: 45,
      reason: "High frequency but suspicious domain pattern",
      status: "pending",
    },
  ]

  const currentAllowlist = [
    "user@company.com",
    "admin@startup.io",
    "test@verified.com",
    "demo@enterprise.org",
    "founder@saas.co",
  ]

  const handleApproveSuggestion = (id: string) => {
    console.log("Approving suggestion:", id)
    // Implementation would handle approval
  }

  const handleDenySuggestion = (id: string) => {
    console.log("Denying suggestion:", id)
    // Implementation would handle denial
  }

  const handleBulkAdd = () => {
    console.log("Adding bulk emails:", bulkEmails)
    // Implementation would handle bulk addition
    setBulkEmails("")
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-100 text-green-800"
    if (confidence >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.domain.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Allowlist Management</h3>
        <p className="text-muted-foreground">Manage demo access permissions and auto-learned suggestions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Auto-learned Suggestions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Auto-learned Suggestions
              </CardTitle>
              <CardDescription>AI-suggested allowlist entries based on usage patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{suggestion.email}</div>
                        <Badge variant="outline" className="text-xs">
                          {suggestion.domain}
                        </Badge>
                        <Badge variant="secondary" className={getConfidenceColor(suggestion.confidence)}>
                          {suggestion.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {suggestion.reason}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Seen {suggestion.frequency} times • Last: {new Date(suggestion.lastSeen).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApproveSuggestion(suggestion.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDenySuggestion(suggestion.id)}
                      >
                        Deny
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Allowlist */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Allowlist</CardTitle>
              <CardDescription>Currently approved email addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentAllowlist.map((email, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="font-mono text-sm">{email}</span>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bulk Add */}
          <Card>
            <CardHeader>
              <CardTitle>Bulk Add Emails</CardTitle>
              <CardDescription>Add multiple email addresses at once (one per line)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="user@company.com&#10;admin@startup.io&#10;test@example.com"
                  value={bulkEmails}
                  onChange={(e) => setBulkEmails(e.target.value)}
                  rows={4}
                  className="font-mono text-sm"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {bulkEmails.split('\n').filter(line => line.trim()).length} emails ready to add
                  </span>
                  <Button onClick={handleBulkAdd} disabled={!bulkEmails.trim()}>
                    Add to Allowlist
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
