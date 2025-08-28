"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Clock, AlertTriangle, ExternalLink, Shield } from "lucide-react"

interface PendingListing {
  id: string
  name: string
  founder: string
  submittedAt: string
  priority: "urgent" | "standard"
  status: "pending" | "under_review"
  category: string
  compatibilityChecks: {
    demoConfig: boolean
    polarOAT: boolean
    deliveryModes: boolean
    paymentSetup: boolean
    securityScan: boolean
  }
  issues: string[]
}

export function ReviewQueue() {
  const [selectedListing, setSelectedListing] = useState<string | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")

  const pendingListings: PendingListing[] = [
    {
      id: "1",
      name: "AI Content Generator",
      founder: "Sarah Chen",
      submittedAt: "2024-01-15T10:30:00Z",
      priority: "urgent",
      status: "pending",
      category: "AI/ML",
      compatibilityChecks: {
        demoConfig: true,
        polarOAT: false,
        deliveryModes: true,
        paymentSetup: true,
        securityScan: true,
      },
      issues: ["Polar OAT token not configured", "Demo safety mode not set"],
    },
    {
      id: "2",
      name: "Team Collaboration Hub",
      founder: "Mike Rodriguez",
      submittedAt: "2024-01-15T09:15:00Z",
      priority: "standard",
      status: "under_review",
      category: "Productivity",
      compatibilityChecks: {
        demoConfig: true,
        polarOAT: true,
        deliveryModes: false,
        paymentSetup: true,
        securityScan: true,
      },
      issues: ["Source code delivery not configured"],
    },
    {
      id: "3",
      name: "E-commerce Analytics",
      founder: "Lisa Wang",
      submittedAt: "2024-01-15T08:45:00Z",
      priority: "standard",
      status: "pending",
      category: "Analytics",
      compatibilityChecks: {
        demoConfig: true,
        polarOAT: true,
        deliveryModes: true,
        paymentSetup: false,
        securityScan: true,
      },
      issues: ["Stripe webhook configuration incomplete"],
    },
  ]

  const getCompatibilityScore = (checks: PendingListing["compatibilityChecks"]) => {
    const total = Object.keys(checks).length
    const passed = Object.values(checks).filter(Boolean).length
    return Math.round((passed / total) * 100)
  }

  const handleApprove = (listingId: string) => {
    console.log("Approving listing:", listingId)
    // Implementation would handle approval
  }

  const handleReject = (listingId: string) => {
    console.log("Rejecting listing:", listingId, "with notes:", reviewNotes)
    // Implementation would handle rejection
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Review Queue</h3>
        <p className="text-muted-foreground">Review and approve pending SaaS listings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Listings List */}
        <div className="space-y-4">
          {pendingListings.map((listing) => (
            <Card
              key={listing.id}
              className={`cursor-pointer transition-colors ${
                selectedListing === listing.id ? "ring-2 ring-accent" : ""
              }`}
              onClick={() => setSelectedListing(listing.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{listing.name}</CardTitle>
                    <CardDescription>by {listing.founder}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {listing.priority === "urgent" && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {listing.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Compatibility Score</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{getCompatibilityScore(listing.compatibilityChecks)}%</span>
                      {getCompatibilityScore(listing.compatibilityChecks) === 100 ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </div>

                  {listing.issues.length > 0 && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Issues: </span>
                      <span className="text-destructive">{listing.issues.length}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Submitted {new Date(listing.submittedAt).toLocaleDateString()}</span>
                    <Badge variant="secondary" className="text-xs">
                      {listing.status === "pending" ? (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </>
                      ) : (
                        "Under Review"
                      )}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Review Panel */}
        <div className="space-y-4">
          {selectedListing ? (
            (() => {
              const listing = pendingListings.find((l) => l.id === selectedListing)!
              return (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      {listing.name}
                    </CardTitle>
                    <CardDescription>Compatibility Review</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Compatibility Checklist */}
                    <div>
                      <h4 className="font-medium mb-3">Compatibility Checklist</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Demo Configuration</span>
                          {listing.compatibilityChecks.demoConfig ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Polar OAT Token</span>
                          {listing.compatibilityChecks.polarOAT ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Delivery Modes</span>
                          {listing.compatibilityChecks.deliveryModes ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Payment Setup</span>
                          {listing.compatibilityChecks.paymentSetup ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Security Scan</span>
                          {listing.compatibilityChecks.securityScan ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Issues */}
                    {listing.issues.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          Issues Found
                        </h4>
                        <ul className="space-y-1">
                          {listing.issues.map((issue, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Separator />

                    {/* Review Notes */}
                    <div>
                      <h4 className="font-medium mb-3">Review Notes</h4>
                      <Textarea
                        placeholder="Add notes for the founder..."
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        rows={4}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApprove(listing.id)}
                        disabled={getCompatibilityScore(listing.compatibilityChecks) < 100}
                        className="flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" onClick={() => handleReject(listing.id)} className="flex-1">
                        <XCircle className="w-4 h-4 mr-1" />
                        Request Changes
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })()
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Select a Listing</h3>
                <p className="text-muted-foreground">Choose a listing from the queue to review</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
