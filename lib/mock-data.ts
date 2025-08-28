export interface SaaSProduct {
  id: string
  name: string
  description: string
  shortDescription: string
  category: string
  pricing: {
    plan: string
    price: number
    period: string
  }[]
  trustBadges: string[]
  demoAvailable: boolean
  deliveryOptions: ("Managed" | "Source")[]
  features: string[]
  logo: string
  screenshots: string[]
  rating: number
  reviews: number
  founded: string
  teamSize: string
}

export const mockSaaSProducts: SaaSProduct[] = [
  {
    id: "1",
    name: "TaskFlow Pro",
    description:
      "Advanced project management and team collaboration platform with AI-powered insights, automated workflows, and real-time analytics. Perfect for growing teams that need to scale their operations efficiently.",
    shortDescription: "AI-powered project management for growing teams",
    category: "Productivity",
    pricing: [
      { plan: "Starter", price: 299, period: "one-time" },
      { plan: "Professional", price: 799, period: "one-time" },
      { plan: "Enterprise", price: 1999, period: "one-time" },
    ],
    trustBadges: ["SOC2 Compliant", "GDPR Ready", "99.9% Uptime"],
    demoAvailable: true,
    deliveryOptions: ["Managed", "Source"],
    features: ["AI Task Automation", "Real-time Collaboration", "Advanced Analytics", "Custom Workflows"],
    logo: "/placeholder.svg?height=60&width=60",
    screenshots: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    rating: 4.8,
    reviews: 1247,
    founded: "2021",
    teamSize: "15-50",
  },
  {
    id: "2",
    name: "DataVault Analytics",
    description:
      "Enterprise-grade data analytics platform with machine learning capabilities, custom dashboards, and automated reporting. Transform your raw data into actionable business insights.",
    shortDescription: "Enterprise data analytics with ML capabilities",
    category: "Analytics",
    pricing: [
      { plan: "Basic", price: 999, period: "one-time" },
      { plan: "Pro", price: 2999, period: "one-time" },
      { plan: "Enterprise", price: 7999, period: "one-time" },
    ],
    trustBadges: ["ISO 27001", "SOC2 Type II", "HIPAA Compliant"],
    demoAvailable: true,
    deliveryOptions: ["Managed"],
    features: ["ML-Powered Insights", "Custom Dashboards", "API Integration", "Real-time Processing"],
    logo: "/placeholder.svg?height=60&width=60",
    screenshots: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    rating: 4.6,
    reviews: 892,
    founded: "2019",
    teamSize: "50-100",
  },
  {
    id: "3",
    name: "SecureAuth Hub",
    description:
      "Complete identity and access management solution with multi-factor authentication, single sign-on, and advanced security monitoring. Protect your organization with enterprise-grade security.",
    shortDescription: "Complete IAM solution with advanced security",
    category: "Security",
    pricing: [
      { plan: "Standard", price: 50, period: "user/one-time" },
      { plan: "Premium", price: 120, period: "user/one-time" },
      { plan: "Enterprise", price: 250, period: "user/one-time" },
    ],
    trustBadges: ["FedRAMP Authorized", "SOC2 Type II", "ISO 27001"],
    demoAvailable: true,
    deliveryOptions: ["Managed", "Source"],
    features: ["Multi-Factor Auth", "Single Sign-On", "Security Monitoring", "Compliance Reports"],
    logo: "/placeholder.svg?height=60&width=60",
    screenshots: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    rating: 4.9,
    reviews: 2156,
    founded: "2018",
    teamSize: "100+",
  },
  {
    id: "4",
    name: "CloudSync CRM",
    description:
      "Modern customer relationship management platform with sales automation, marketing tools, and customer support integration. Built for teams that want to grow their customer base efficiently.",
    shortDescription: "Modern CRM with sales automation and marketing tools",
    category: "CRM",
    pricing: [
      { plan: "Essentials", price: 450, period: "one-time" },
      { plan: "Professional", price: 950, period: "one-time" },
      { plan: "Enterprise", price: 1950, period: "one-time" },
    ],
    trustBadges: ["GDPR Compliant", "SOC2 Type I", "99.95% Uptime"],
    demoAvailable: false,
    deliveryOptions: ["Source"],
    features: ["Sales Automation", "Marketing Integration", "Customer Support", "Advanced Reporting"],
    logo: "/placeholder.svg?height=60&width=60",
    screenshots: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    rating: 4.4,
    reviews: 678,
    founded: "2020",
    teamSize: "25-50",
  },
  {
    id: "5",
    name: "DevOps Commander",
    description:
      "Comprehensive DevOps platform with CI/CD pipelines, infrastructure monitoring, and deployment automation. Streamline your development workflow from code to production.",
    shortDescription: "Complete DevOps platform with CI/CD and monitoring",
    category: "DevOps",
    pricing: [
      { plan: "Team", price: 1499, period: "one-time" },
      { plan: "Business", price: 3499, period: "one-time" },
      { plan: "Enterprise", price: 7999, period: "one-time" },
    ],
    trustBadges: ["SOC2 Compliant", "ISO 27001", "99.99% Uptime"],
    demoAvailable: true,
    deliveryOptions: ["Managed", "Source"],
    features: ["CI/CD Pipelines", "Infrastructure Monitoring", "Automated Deployment", "Security Scanning"],
    logo: "/placeholder.svg?height=60&width=60",
    screenshots: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    rating: 4.7,
    reviews: 1534,
    founded: "2017",
    teamSize: "100+",
  },
  {
    id: "6",
    name: "FinanceFlow",
    description:
      "Automated accounting and financial management platform for small to medium businesses. Handle invoicing, expense tracking, and financial reporting with ease.",
    shortDescription: "Automated accounting and financial management",
    category: "Finance",
    pricing: [
      { plan: "Small Business", price: 390, period: "one-time" },
      { plan: "Growing Business", price: 890, period: "one-time" },
      { plan: "Enterprise", price: 1990, period: "one-time" },
    ],
    trustBadges: ["PCI DSS Compliant", "SOC2 Type II", "Bank-Level Security"],
    demoAvailable: true,
    deliveryOptions: ["Managed"],
    features: ["Automated Invoicing", "Expense Tracking", "Financial Reports", "Tax Preparation"],
    logo: "/placeholder.svg?height=60&width=60",
    screenshots: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    rating: 4.5,
    reviews: 923,
    founded: "2019",
    teamSize: "25-50",
  },
]
