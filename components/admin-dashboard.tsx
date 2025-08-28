"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, BarChart3, Users, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { ReviewQueue } from "@/components/admin/review-queue"
import { PlatformMonitoring } from "@/components/admin/platform-monitoring"
import { AllowlistManager } from "@/components/admin/allowlist-manager"
import { DisputeManager } from "@/components/admin/dispute-manager"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Admin Console</h2>
        <p className="text-muted-foreground">Platform administration and monitoring</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="review">Review Queue</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="allowlist">Allowlist</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">3 urgent, 4 standard</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+3 this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.8%</div>
                <p className="text-xs text-muted-foreground">Uptime this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Disputes</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 refunds, 1 chargeback</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setActiveTab("review")}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Review Pending Listings (7)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setActiveTab("monitoring")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Check System Metrics
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setActiveTab("allowlist")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Allowlists
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setActiveTab("disputes")}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Handle Disputes (3)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Status</CardTitle>
                <CardDescription>Current system health indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Demo Environment</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Processing</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Webhook Delivery</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    97.2% Success
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">P95 Demo Start</span>
                  <Badge variant="secondary">8.4s</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Users</span>
                  <Badge variant="secondary">1,247</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform events and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Approved listing: "CloudSync CRM" by TechCorp</span>
                  <span className="text-muted-foreground ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span>Dispute opened: Order #PX-1234567890</span>
                  <span className="text-muted-foreground ml-auto">4 hours ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Auto-learned allowlist: 12 new entries</span>
                  <span className="text-muted-foreground ml-auto">6 hours ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Security scan completed: No issues found</span>
                  <span className="text-muted-foreground ml-auto">8 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review">
          <ReviewQueue />
        </TabsContent>

        <TabsContent value="monitoring">
          <PlatformMonitoring />
        </TabsContent>

        <TabsContent value="allowlist">
          <AllowlistManager />
        </TabsContent>

        <TabsContent value="disputes">
          <DisputeManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
