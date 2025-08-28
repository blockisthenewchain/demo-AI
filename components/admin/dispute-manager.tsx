"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, DollarSign, Clock, CheckCircle, XCircle, MessageSquare } from "lucide-react"

interface Dispute {
  id: string
  orderId: string
  customerEmail: string
  productName: string
  amount: number
  reason: string
  status: "open" | "under_review" | "resolved" | "rejected"
  type: "refund" | "chargeback" | "technical_issue"
  submittedAt: string
  lastUpdated: string
  evidence: string[]
  adminNotes: string
}

export function DisputeManager() {
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null)
  const [adminNotes, setAdminNotes] = useState("")

  const disputes: Dispute[] = [
    {
      id: "1",
      orderId: "PX-1234567890",
      customerEmail: "john.doe@company.com",
      productName: "TaskFlow Pro",
      amount: 199,
      reason: "Application not working as expected after deployment",
      status: "open",
      type: "refund",
      submittedAt: "2024-01-15T10:30:00Z",
      lastUpdated: "2024-01-15T14:20:00Z",
      evidence: ["Screenshot of error message", "Deployment logs"],
      adminNotes: "",
    },
    {
      id: "2",
      orderId: "PX-1234567891",
      customerEmail: "sarah@startup.io",
      productName: "DataVault Analytics",
      amount: 299,
      reason: "Unauthorized charge - did not authorize this purchase",
      status: "under_review",
      type: "chargeback",
      submittedAt: "2024-01-15T09:15:00Z",
      lastUpdated: "2024-01-15T13:45:00Z",
      evidence: ["Bank statement", "Email correspondence"],
      adminNotes: "Customer claims unauthorized charge. Investigating payment logs.",
    },
    {
      id: "3",
      orderId: "PX-1234567892",
      customerEmail: "admin@enterprise.com",
      productName: "SecureAuth Hub",
      amount: 1250,
      reason: "Service unavailable for 48 hours - SLA breach",
      status: "resolved",
      type: "refund",
      submittedAt: "2024-01-14T16:20:00Z",
      lastUpdated: "2024-01-15T11:30:00Z",
      evidence: ["Downtime logs", "SLA documentation"],
      adminNotes: "Confirmed downtime. Issued partial refund per SLA terms.",
    },
  ]

  const getStatusColor = (status: Dispute["status"]) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: Dispute["type"]) => {
    switch (type) {
      case "refund":
        return <DollarSign className="w-4 h-4" />
      case "chargeback":
        return <AlertTriangle className="w-4 h-4" />
      case "technical_issue":
        return <MessageSquare className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const handleResolve = (disputeId: string, resolution: "approve" | "reject") => {
    console.log(`${resolution} dispute:`, disputeId)
    // Implementation would handle dispute resolution
  }

  const handleUpdateNotes = (disputeId: string) => {
    console.log("Updating notes for dispute:", disputeId, adminNotes)
    // Implementation would handle notes update
    setAdminNotes("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Dispute Management</h3>
        <p className="text-muted-foreground">Handle payment disputes, refunds, and chargebacks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disputes List */}
        <div className="space-y-4">
          {disputes.map((dispute) => (
            <Card
              key={dispute.id}
              className={`cursor-pointer transition-colors ${
                selectedDispute === dispute.id ? "ring-2 ring-accent" : ""
              }`}
              onClick={() => setSelectedDispute(dispute.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{dispute.orderId}</CardTitle>
                    <CardDescription>{dispute.customerEmail}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      ${dispute.amount}
                    </Badge>
                    <Badge variant="secondary" className={getStatusColor(dispute.status)}>
                      {dispute.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(dispute.type)}
                    <span className="text-sm font-medium">{dispute.productName}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{dispute.reason}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Submitted {new Date(dispute.submittedAt).toLocaleDateString()}</span>
                    <span>Updated {new Date(dispute.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dispute Details */}
        <div className="space-y-4">
          {selectedDispute ? (
            (() => {
              const dispute = disputes.find((d) => d.id === selectedDispute)!
              return (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Dispute Details
                    </CardTitle>
                    <CardDescription>Order {dispute.orderId}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic Information */}
                    <div>
                      <h4 className="font-medium mb-3">Basic Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Customer:</span>
                          <div className="font-medium">{dispute.customerEmail}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Product:</span>
                          <div className="font-medium">{dispute.productName}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <div className="font-medium">${dispute.amount}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Type:</span>
                          <div className="font-medium capitalize">{dispute.type.replace("_", " ")}</div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Reason */}
                    <div>
                      <h4 className="font-medium mb-3">Dispute Reason</h4>
                      <p className="text-sm text-muted-foreground">{dispute.reason}</p>
                    </div>

                    <Separator />

                    {/* Evidence */}
                    {dispute.evidence.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3">Evidence Provided</h4>
                        <ul className="space-y-1">
                          {dispute.evidence.map((item, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Separator />

                    {/* Admin Notes */}
                    <div>
                      <h4 className="font-medium mb-3">Admin Notes</h4>
                      <Textarea
                        placeholder="Add notes about this dispute..."
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        rows={3}
                      />
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateNotes(dispute.id)}
                        >
                          Update Notes
                        </Button>
                      </div>
                    </div>

                    {/* Actions */}
                    {dispute.status === "open" || dispute.status === "under_review" ? (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleResolve(dispute.id, "approve")}
                          className="flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve Refund
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleResolve(dispute.id, "reject")}
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Badge variant="secondary" className={getStatusColor(dispute.status)}>
                          {dispute.status === "resolved" ? "Resolved" : "Rejected"}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })()
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Select a Dispute</h3>
                <p className="text-muted-foreground">Choose a dispute from the list to review</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
