"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  Search,
  Plus,
  Filter,
  Download,
  Share2,
  MoreHorizontal,
  TrendingUp,
  Database,
  Zap,
  Shield,
  Activity,
  PieChart,
  LineChart,
  Target,
  AlertCircle,
  Star,
  Eye,
  MousePointer,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  Home,
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  assignee: string
  dueDate: string
  progress: number
}

interface AnalyticsData {
  metric: string
  value: number
  change: number
  trend: "up" | "down" | "stable"
}

export default function InteractiveDemoPage() {
  const params = useParams()
  const router = useRouter()
  const productName = decodeURIComponent(params.product as string)
  
  const [currentStep, setCurrentStep] = useState(0)
  const [demoData, setDemoData] = useState<any>({})
  const [activeTab, setActiveTab] = useState("overview")

  // TaskFlow Pro Demo Data
  const taskflowTasks: Task[] = [
    {
      id: "1",
      title: "Design System Implementation",
      description: "Create and implement a comprehensive design system for the new product",
      status: "in-progress",
      priority: "high",
      assignee: "Sarah Chen",
      dueDate: "2024-02-15",
      progress: 75,
    },
    {
      id: "2",
      title: "API Integration Testing",
      description: "Test and validate all third-party API integrations",
      status: "todo",
      priority: "medium",
      assignee: "Mike Rodriguez",
      dueDate: "2024-02-20",
      progress: 0,
    },
    {
      id: "3",
      title: "User Research Analysis",
      description: "Analyze user feedback and research data for product improvements",
      status: "completed",
      priority: "low",
      assignee: "Emma Wilson",
      dueDate: "2024-02-10",
      progress: 100,
    },
    {
      id: "4",
      title: "Performance Optimization",
      description: "Optimize application performance and reduce load times",
      status: "in-progress",
      priority: "high",
      assignee: "Alex Thompson",
      dueDate: "2024-02-25",
      progress: 45,
    },
  ]

  const analyticsData: AnalyticsData[] = [
    { metric: "Total Revenue", value: 125000, change: 12.5, trend: "up" },
    { metric: "Active Users", value: 2847, change: 8.2, trend: "up" },
    { metric: "Conversion Rate", value: 3.2, change: -0.5, trend: "down" },
    { metric: "Customer Satisfaction", value: 4.8, change: 0.3, trend: "up" },
  ]

  const renderTaskFlowProDemo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">TaskFlow Pro Dashboard</h2>
          <p className="text-muted-foreground">Project Management & Team Collaboration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Target className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">High Priority Alert</p>
                <p className="text-sm text-muted-foreground">
                  "Design System Implementation" is behind schedule. Consider reallocating resources.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Performance Boost</p>
                <p className="text-sm text-muted-foreground">
                  Team productivity has increased by 15% this week compared to last week.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taskflowTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{task.title}</h4>
                    <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}>
                      {task.priority}
                    </Badge>
                    <Badge variant={task.status === "completed" ? "default" : task.status === "in-progress" ? "secondary" : "outline"}>
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Assignee: {task.assignee}</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={task.progress} className="w-20" />
                  <span className="text-sm font-medium">{task.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Sarah Chen completed "User Research Analysis"</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Mike Rodriguez started "API Integration Testing"</span>
              <span className="text-xs text-muted-foreground">4 hours ago</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">New task "Performance Optimization" was created</span>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDataVaultAnalyticsDemo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">DataVault Analytics Dashboard</h2>
          <p className="text-muted-foreground">Advanced Analytics & Business Intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {analyticsData.map((metric) => (
          <Card key={metric.metric}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.metric}</p>
                  <p className="text-2xl font-bold">
                    {metric.metric === "Total Revenue" ? `$${metric.value.toLocaleString()}` : 
                     metric.metric === "Conversion Rate" ? `${metric.value}%` :
                     metric.metric === "Customer Satisfaction" ? `${metric.value}/5` : metric.value.toLocaleString()}
                  </p>
                  <div className={`flex items-center text-sm ${metric.trend === "up" ? "text-green-600" : metric.trend === "down" ? "text-red-600" : "text-gray-600"}`}>
                    {metric.trend === "up" ? <TrendingUp className="w-4 h-4 mr-1" /> : 
                     metric.trend === "down" ? <TrendingUp className="w-4 h-4 mr-1 rotate-180" /> : 
                     <Activity className="w-4 h-4 mr-1" />}
                    {Math.abs(metric.change)}%
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <LineChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive Chart</p>
                <p className="text-xs text-muted-foreground">Revenue data visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive Chart</p>
                <p className="text-xs text-muted-foreground">User demographic breakdown</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  AC
                </div>
                <div>
                  <p className="font-medium">Acme Corp</p>
                  <p className="text-sm text-muted-foreground">Enterprise Plan</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$45,000</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                  TC
                </div>
                <div>
                  <p className="font-medium">TechStart Inc</p>
                  <p className="text-sm text-muted-foreground">Professional Plan</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$28,500</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                  GF
                </div>
                <div>
                  <p className="font-medium">Global Finance</p>
                  <p className="text-sm text-muted-foreground">Enterprise Plan</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">$32,000</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Revenue Growth Opportunity</p>
                <p className="text-sm text-muted-foreground">
                  Your enterprise customers show 23% higher retention rates. Consider expanding enterprise features.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Users className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">User Engagement Pattern</p>
                <p className="text-sm text-muted-foreground">
                  Users who complete onboarding within 7 days have 3x higher lifetime value.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDemoContent = () => {
    switch (productName.toLowerCase()) {
      case "taskflow pro":
        return renderTaskFlowProDemo()
      case "datavault analytics":
        return renderDataVaultAnalyticsDemo()
      default:
        return (
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Interactive Demo</h2>
            <p className="text-muted-foreground mb-6">
              Experience the full functionality of {productName} in this interactive demo environment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Analytics</h3>
                  <p className="text-sm text-muted-foreground">View detailed metrics and insights</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Settings className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Configuration</h3>
                  <p className="text-sm text-muted-foreground">Customize settings and preferences</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Team Management</h3>
                  <p className="text-sm text-muted-foreground">Manage users and permissions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button variant="outline" size="sm" onClick={() => router.push("/")}>
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="w-4 h-4 mr-1" />
                Demo Mode
              </Badge>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {renderDemoContent()}
      </div>
    </div>
  )
}
