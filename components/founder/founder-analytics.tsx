"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, DollarSign, Eye, MousePointer } from "lucide-react"

export function FounderAnalytics() {
  const demoMetrics = [
    { name: "TaskFlow Pro", views: 1247, conversions: 105, rate: 8.4 },
    { name: "DataVault Analytics", views: 892, conversions: 67, rate: 7.5 },
    { name: "SecureAuth Hub", views: 2156, conversions: 198, rate: 9.2 },
  ]

  const timeSeriesData = [
    { month: "Jan", demos: 234, conversions: 18 },
    { month: "Feb", demos: 456, conversions: 32 },
    { month: "Mar", demos: 678, conversions: 54 },
    { month: "Apr", demos: 892, conversions: 67 },
    { month: "May", demos: 1024, conversions: 89 },
    { month: "Jun", demos: 1247, conversions: 105 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Analytics Dashboard</h3>
        <p className="text-muted-foreground">Track demo performance and conversion metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Demo Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,295</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">370</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.6%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-0.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18.7%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Product Performance
          </CardTitle>
          <CardDescription>Demo views and conversion rates by product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoMetrics.map((product) => (
              <div key={product.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{product.name}</div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">{product.views} views</span>
                    <span className="text-muted-foreground">{product.conversions} conversions</span>
                    <Badge variant="secondary">{product.rate}%</Badge>
                  </div>
                </div>
                <Progress value={product.rate * 10} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>Demo activity and conversion trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeSeriesData.map((month) => (
              <div key={month.month} className="grid grid-cols-4 gap-4 items-center">
                <div className="font-medium">{month.month}</div>
                <div className="text-sm text-muted-foreground">{month.demos} demos</div>
                <div className="text-sm text-muted-foreground">{month.conversions} conversions</div>
                <div className="text-sm">
                  <Badge variant="outline">{((month.conversions / month.demos) * 100).toFixed(1)}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demo Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Demo Funnel Analysis</CardTitle>
          <CardDescription>User journey through the demo experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Demo Started</span>
              <div className="flex items-center gap-2">
                <Progress value={100} className="w-32 h-2" />
                <span className="text-sm font-medium">4,295 (100%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Completed Tour</span>
              <div className="flex items-center gap-2">
                <Progress value={75} className="w-32 h-2" />
                <span className="text-sm font-medium">3,221 (75%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Viewed Pricing</span>
              <div className="flex items-center gap-2">
                <Progress value={45} className="w-32 h-2" />
                <span className="text-sm font-medium">1,933 (45%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Started Purchase</span>
              <div className="flex items-center gap-2">
                <Progress value={12} className="w-32 h-2" />
                <span className="text-sm font-medium">515 (12%)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Completed Purchase</span>
              <div className="flex items-center gap-2">
                <Progress value={8.6} className="w-32 h-2" />
                <span className="text-sm font-medium">370 (8.6%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
