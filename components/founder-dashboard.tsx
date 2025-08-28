"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, BarChart3, Palette, FileCode, Shield, DollarSign } from "lucide-react"
import { PaymentConfiguration } from "@/components/founder/payment-configuration"
import { DemoConfiguration } from "@/components/founder/demo-configuration"
import { BrandKitEditor } from "@/components/founder/brandkit-editor"
import { GuidesEditor } from "@/components/founder/guides-editor"
import { FounderAnalytics } from "@/components/founder/founder-analytics"

export function FounderDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Founder Console</h2>
        <p className="text-muted-foreground">Manage your SaaS listings and platform configuration</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="demo">Demo Config</TabsTrigger>
          <TabsTrigger value="brandkit">BrandKit</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Demo Sessions</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.4%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,847</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common configuration tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setActiveTab("payment")}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Configure Payment Methods
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setActiveTab("demo")}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Update Demo Safety Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setActiveTab("brandkit")}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Edit Brand Kit
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setActiveTab("guides")}
                >
                  <FileCode className="w-4 h-4 mr-2" />
                  Update Demo Guides
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current platform health</CardDescription>
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
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Warm Pool Status</span>
                  <Badge variant="secondary">3/5 Ready</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Rate Limit</span>
                  <Badge variant="secondary">847/1000</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <PaymentConfiguration />
        </TabsContent>

        <TabsContent value="demo">
          <DemoConfiguration />
        </TabsContent>

        <TabsContent value="brandkit">
          <BrandKitEditor />
        </TabsContent>

        <TabsContent value="guides">
          <GuidesEditor />
        </TabsContent>

        <TabsContent value="analytics">
          <FounderAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
