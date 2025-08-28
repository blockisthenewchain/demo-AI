"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
} from "lucide-react"

interface InteractiveDemoProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

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

export function InteractiveDemo({ isOpen, onClose, productName }: InteractiveDemoProps) {
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
      title: "User Authentication Flow",
      description: "Implement secure user authentication and authorization",
      status: "completed",
      priority: "high",
      assignee: "Lisa Wang",
      dueDate: "2024-02-10",
      progress: 100,
    },
    {
      id: "4",
      title: "Performance Optimization",
      description: "Optimize application performance and reduce load times",
      status: "in-progress",
      priority: "medium",
      assignee: "Alex Johnson",
      dueDate: "2024-02-25",
      progress: 45,
    },
  ]

  // DataVault Analytics Demo Data
  const analyticsData: AnalyticsData[] = [
    { metric: "Revenue", value: 125000, change: 12.5, trend: "up" },
    { metric: "Users", value: 15420, change: 8.3, trend: "up" },
    { metric: "Conversion Rate", value: 3.2, change: -0.5, trend: "down" },
    { metric: "Churn Rate", value: 1.8, change: -0.3, trend: "up" },
  ]

  const renderTaskFlowProDemo = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">TaskFlow Pro Dashboard</h2>
          <p className="text-muted-foreground">AI-powered project management for growing teams</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Activity className="w-3 h-3 mr-1" />
            Live Demo
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Project Tasks</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Task
            </Button>
          </div>
          
          <div className="space-y-3">
            {taskflowTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge 
                          variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {task.priority}
                        </Badge>
                        <Badge 
                          variant={task.status === "completed" ? "default" : task.status === "in-progress" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Assigned to {task.assignee}</span>
                        <span className="text-muted-foreground">Due {task.dueDate}</span>
                      </div>
                      {task.status === "in-progress" && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Performance Alert</p>
                    <p className="text-xs text-blue-700">Task "API Integration Testing" is at risk of delay. Consider reassigning to Sarah Chen.</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Team Efficiency</p>
                    <p className="text-xs text-green-700">Your team is 15% more efficient this week compared to last week.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Sarah completed "User Authentication Flow"</span>
                <span className="text-muted-foreground ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Mike started "API Integration Testing"</span>
                <span className="text-muted-foreground ml-auto">4h ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>New comment on "Design System"</span>
                <span className="text-muted-foreground ml-auto">6h ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderDataVaultAnalyticsDemo = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">DataVault Analytics</h2>
          <p className="text-muted-foreground">Enterprise data analytics with ML capabilities</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Database className="w-3 h-3 mr-1" />
            Live Demo
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
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
                  <p className="text-sm text-muted-foreground">{metric.metric}</p>
                  <p className="text-2xl font-bold">
                    {metric.metric === "Revenue" ? `$${(metric.value / 1000).toFixed(0)}k` :
                     metric.metric === "Users" ? metric.value.toLocaleString() :
                     `${metric.value}%`}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${
                  metric.trend === "up" ? "bg-green-100" : 
                  metric.trend === "down" ? "bg-red-100" : "bg-gray-100"
                }`}>
                  <TrendingUp className={`w-4 h-4 ${
                    metric.trend === "up" ? "text-green-600" : 
                    metric.trend === "down" ? "text-red-600" : "text-gray-600"
                  }`} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-xs ${
                  metric.change > 0 ? "text-green-600" : 
                  metric.change < 0 ? "text-red-600" : "text-gray-600"
                }`}>
                  {metric.change > 0 ? "+" : ""}{metric.change}%
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Interactive Revenue Chart</p>
                <p className="text-xs text-muted-foreground">Hover to see detailed data points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
            <CardDescription>User distribution by segment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <PieChart className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Interactive Pie Chart</p>
                <p className="text-xs text-muted-foreground">Click segments for details</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer Data</CardTitle>
              <CardDescription>Detailed customer analytics</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="Search customers..." className="w-64" />
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Acme Corp", revenue: 45000, users: 125, status: "active" },
              { name: "TechStart Inc", revenue: 32000, users: 89, status: "active" },
              { name: "Global Solutions", revenue: 78000, users: 234, status: "active" },
              { name: "Innovation Labs", revenue: 12000, users: 45, status: "churned" },
            ].map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-medium">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.users} users</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">${customer.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                  <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                    {customer.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Revenue Prediction</p>
                  <p className="text-xs text-blue-700">Based on current trends, revenue is expected to grow 18% next quarter.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">Churn Risk Alert</p>
                  <p className="text-xs text-green-700">Innovation Labs shows signs of potential churn. Recommend engagement campaign.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Interactive Demo: {productName}
          </DialogTitle>
          <DialogDescription>
            Experience the full functionality of {productName} in this interactive demo environment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Demo Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Shield className="w-3 h-3 mr-1" />
                Safe Demo Environment
              </Badge>
              <Badge variant="outline">
                <Eye className="w-3 h-3 mr-1" />
                Read-only Mode
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset Demo
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share Demo
              </Button>
            </div>
          </div>

          {/* Demo Content */}
          {productName === "TaskFlow Pro" && renderTaskFlowProDemo()}
          {productName === "DataVault Analytics" && renderDataVaultAnalyticsDemo()}

          {/* Demo Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="text-sm text-muted-foreground">
              This is a fully functional demo. All data is simulated for demonstration purposes.
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close Demo
              </Button>
              <Button>
                <MousePointer className="w-4 h-4 mr-1" />
                Try Full Version
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
