"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Activity, Zap, Globe, AlertTriangle, CheckCircle } from "lucide-react"

export function PlatformMonitoring() {
  const metrics = {
    p95DemoStart: 8.4,
    webhookSuccess: 97.2,
    uptime: 99.8,
    activeUsers: 1247,
    errorRate: 0.12,
    avgResponseTime: 245,
  }

  const systemComponents = [
    { name: "Demo Environment", status: "healthy", uptime: 99.9 },
    { name: "Payment Gateway", status: "healthy", uptime: 99.7 },
    { name: "Webhook Delivery", status: "degraded", uptime: 97.2 },
    { name: "Database", status: "healthy", uptime: 100.0 },
    { name: "CDN", status: "healthy", uptime: 99.8 },
    { name: "Authentication", status: "healthy", uptime: 99.9 },
  ]

  const recentAlerts = [
    {
      id: "1",
      severity: "warning",
      message: "Webhook delivery success rate below 98%",
      timestamp: "2024-01-15T14:30:00Z",
      resolved: false,
    },
    {
      id: "2",
      severity: "info",
      message: "Demo environment scaled up due to high demand",
      timestamp: "2024-01-15T13:15:00Z",
      resolved: true,
    },
    {
      id: "3",
      severity: "error",
      message: "Payment gateway timeout (resolved)",
      timestamp: "2024-01-15T11:45:00Z",
      resolved: true,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800"
      case "down":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "info":
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Platform Monitoring</h3>
        <p className="text-muted-foreground">Real-time system metrics and health monitoring</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">P95 Demo Start Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.p95DemoStart}s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.8s</span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Webhook Success Rate</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.webhookSuccess}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-1.2%</span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.uptime}%</div>
            <p className="text-xs text-muted-foreground">30-day average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.errorRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.03%</span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-12ms</span> from last hour
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Components */}
      <Card>
        <CardHeader>
          <CardTitle>System Components</CardTitle>
          <CardDescription>Health status of platform components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemComponents.map((component) => (
              <div key={component.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="font-medium">{component.name}</div>
                  <Badge variant="secondary" className={getStatusColor(component.status)}>
                    {component.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">{component.uptime}% uptime</div>
                  <Progress value={component.uptime} className="w-24 h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>System alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1">
                  <div className="font-medium text-sm">{alert.message}</div>
                  <div className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</div>
                </div>
                {alert.resolved && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    Resolved
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>24-hour performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">↗</div>
              <div className="text-sm font-medium">Demo Starts</div>
              <div className="text-xs text-muted-foreground">+12% vs yesterday</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">↘</div>
              <div className="text-sm font-medium">Error Rate</div>
              <div className="text-xs text-muted-foreground">-25% vs yesterday</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">↗</div>
              <div className="text-sm font-medium">Conversions</div>
              <div className="text-xs text-muted-foreground">+8% vs yesterday</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">↗</div>
              <div className="text-sm font-medium">Revenue</div>
              <div className="text-xs text-muted-foreground">+15% vs yesterday</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
