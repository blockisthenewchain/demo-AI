"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  ExternalLink,
  CheckCircle,
  Clock,
  GitBranch,
  Server,
  Key,
  FileText,
  Mail,
  AlertCircle,
} from "lucide-react"

interface DeliveryViewProps {
  purchaseData: any
}

export function DeliveryView({ purchaseData }: DeliveryViewProps) {
  const [deploymentProgress, setDeploymentProgress] = useState(75)

  const isManaged = purchaseData.deliveryMode === "managed"
  const isSource = purchaseData.deliveryMode === "source"

  const deploymentSteps = [
    { name: "Environment Setup", status: "completed", time: "2 min ago" },
    { name: "Database Configuration", status: "completed", time: "1 min ago" },
    { name: "Application Deployment", status: "in-progress", time: "In progress" },
    { name: "SSL Certificate", status: "pending", time: "Pending" },
    { name: "Domain Configuration", status: "pending", time: "Pending" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Delivery Dashboard</h2>
        <p className="text-muted-foreground">Your purchase of {purchaseData.product?.name} is being processed</p>
      </div>

      {/* Purchase Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Purchase Completed
          </CardTitle>
          <CardDescription>Order #{purchaseData.purchaseId}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Product</div>
              <div className="font-medium">{purchaseData.product?.name}</div>
              <div className="text-sm">{purchaseData.selectedPlan} Plan</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Brand</div>
              <div className="font-medium">{purchaseData.brandName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Delivery</div>
              <Badge variant="secondary">{isManaged ? "Managed Deployment" : "Source Code"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* License Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            License Information
          </CardTitle>
          <CardDescription>
            Your license details and payment information via {purchaseData.paymentMethod}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">License Key</div>
              <div className="font-mono text-sm bg-muted p-2 rounded">
                {purchaseData.paymentMethod === "stripe" ? "sk_live_" : "polar_"}
                {purchaseData.purchaseId.slice(-8)}...
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Valid Until</div>
              <div className="font-medium">{new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-1" />
              Download License
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-1" />
              Email License
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Managed Deployment */}
      {isManaged && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Managed Deployment
            </CardTitle>
            <CardDescription>Your application is being deployed automatically</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Deployment Progress</span>
                <span>{deploymentProgress}%</span>
              </div>
              <Progress value={deploymentProgress} className="w-full" />
            </div>

            <div className="space-y-3">
              {deploymentSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  {step.status === "completed" && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {step.status === "in-progress" && <Clock className="w-4 h-4 text-blue-500 animate-spin" />}
                  {step.status === "pending" && <Clock className="w-4 h-4 text-muted-foreground" />}
                  <div className="flex-1">
                    <div className="text-sm font-medium">{step.name}</div>
                    <div className="text-xs text-muted-foreground">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Deployment Platform</div>
                <Badge variant="outline">Railway (Auto-selected)</Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Application URL</div>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    https://{purchaseData.brandName.toLowerCase().replace(/\s+/g, "-")}.railway.app
                  </code>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-blue-900 dark:text-blue-100">Deployment in Progress</div>
                  <div className="text-blue-700 dark:text-blue-300">
                    Your application will be available at the URL above once deployment completes (estimated 3-5
                    minutes).
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Source Code Delivery */}
      {isSource && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Source Code Delivery
            </CardTitle>
            <CardDescription>Download your source code and deployment artifacts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Download className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-medium">Source Code Archive</div>
                    <div className="text-sm text-muted-foreground">Complete application source</div>
                  </div>
                </div>
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-1" />
                  Download ZIP (24.5 MB)
                </Button>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-medium">Documentation</div>
                    <div className="text-sm text-muted-foreground">Setup and deployment guide</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <FileText className="w-4 h-4 mr-1" />
                  View Docs
                </Button>
              </Card>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                GitHub Repository Access
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">Private Repository Invite</div>
                    <div className="text-sm text-muted-foreground">
                      github.com/{purchaseData.product?.name.toLowerCase().replace(/\s+/g, "-")}
                    </div>
                  </div>
                  <Badge variant="secondary">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Sent
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  An invitation has been sent to your email. Accept it to get ongoing updates and support.
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-green-900 dark:text-green-100">Ready to Deploy</div>
                  <div className="text-green-700 dark:text-green-300">
                    Your source code is ready for download. Follow the included documentation to deploy on your
                    preferred platform.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Get support for your purchase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-1" />
              Contact Support
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-1" />
              View Documentation
            </Button>
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-1" />
              Community Forum
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
