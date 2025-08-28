"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Play, X, ExternalLink } from "lucide-react"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export function DemoModal({ isOpen, onClose, productName }: DemoModalProps) {
  const router = useRouter()
  const [demoState, setDemoState] = useState<"loading" | "active" | "completed">("loading")
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const demoSteps = [
    "Initializing secure sandbox environment...",
    "Loading demo data and configurations...",
    "Setting up proxy-safe mode...",
    "Demo environment ready!",
  ]

  const tourSteps = [
    {
      title: "Welcome to the Dashboard",
      description: "This is your main control center where you can access all features.",
    },
    {
      title: "Navigation Menu",
      description: "Use the sidebar to navigate between different sections of the application.",
    },
    { title: "Analytics Overview", description: "View key metrics and performance indicators at a glance." },
    { title: "Settings Panel", description: "Customize your experience and configure application settings." },
  ]

  useEffect(() => {
    if (isOpen && demoState === "loading") {
      setProgress(0)
      setCurrentStep(0)

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setDemoState("active")
            return 100
          }
          return prev + 2
        })
      }, 100)

      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= demoSteps.length - 1) {
            clearInterval(stepInterval)
            return prev
          }
          return prev + 1
        })
      }, 1200)

      return () => {
        clearInterval(interval)
        clearInterval(stepInterval)
      }
    }
  }, [isOpen, demoState])

  const handleClose = () => {
    setDemoState("loading")
    setProgress(0)
    setCurrentStep(0)
    onClose()
  }

  const handleStartInteractiveTour = () => {
    const encodedProductName = encodeURIComponent(productName)
    router.push(`/demo/${encodedProductName}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            {productName} Demo
          </DialogTitle>
          <DialogDescription>Experience the full functionality in a safe, sandboxed environment</DialogDescription>
        </DialogHeader>

        {demoState === "loading" && (
          <div className="space-y-6 py-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
              <Badge variant="secondary" className="mb-4">
                Proxy-Safe Mode
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Setting up demo environment</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">{demoSteps[currentStep]}</p>
            </div>
          </div>
        )}

        {demoState === "active" && (
          <div className="space-y-6 py-6">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <Badge variant="secondary" className="bg-green-100 text-green-800 mb-4">
                Demo Active - Proxy Mode
              </Badge>
              <p className="text-sm text-muted-foreground">
                Demo is running in a secure sandbox. All actions are simulated and safe.
              </p>
            </div>

            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium mb-3">Guided Tour Steps</h4>
              <div className="space-y-3">
                {tourSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleStartInteractiveTour}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Start Full-Screen Demo
              </Button>
              <Button variant="outline" onClick={handleClose}>
                <X className="w-4 h-4 mr-1" />
                End Demo
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
