"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileCode, Plus, Trash2, Eye, Save } from "lucide-react"

interface GuideStep {
  id: string
  title: string
  description: string
  selector: string
  position: "top" | "bottom" | "left" | "right"
  action?: "click" | "hover" | "focus"
}

export function GuidesEditor() {
  const [selectedGuide, setSelectedGuide] = useState("onboarding")
  const [guides] = useState({
    onboarding: "Welcome Tour",
    dashboard: "Dashboard Overview",
    features: "Key Features",
    settings: "Settings Guide",
  })

  const [steps, setSteps] = useState<GuideStep[]>([
    {
      id: "1",
      title: "Welcome to the Dashboard",
      description: "This is your main control center where you can access all features and monitor your projects.",
      selector: ".dashboard-header",
      position: "bottom",
    },
    {
      id: "2",
      title: "Navigation Menu",
      description: "Use the sidebar to navigate between different sections of the application.",
      selector: ".sidebar-nav",
      position: "right",
    },
    {
      id: "3",
      title: "Create New Project",
      description: "Click here to start a new project and begin collaborating with your team.",
      selector: ".create-project-btn",
      position: "bottom",
      action: "click",
    },
  ])

  const addStep = () => {
    const newStep: GuideStep = {
      id: Date.now().toString(),
      title: "New Step",
      description: "Step description",
      selector: ".element-selector",
      position: "bottom",
    }
    setSteps([...steps, newStep])
  }

  const updateStep = (id: string, field: keyof GuideStep, value: string) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, [field]: value } : step)))
  }

  const deleteStep = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id))
  }

  const moveStep = (id: string, direction: "up" | "down") => {
    const index = steps.findIndex((step) => step.id === id)
    if (index === -1) return

    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= steps.length) return

    const newSteps = [...steps]
    const [movedStep] = newSteps.splice(index, 1)
    newSteps.splice(newIndex, 0, movedStep)
    setSteps(newSteps)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Demo Guides Editor</h3>
        <p className="text-muted-foreground">Create interactive guided tours for your demo environments</p>
      </div>

      {/* Guide Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="w-5 h-5" />
            Guide Selection
          </CardTitle>
          <CardDescription>Choose which guide to edit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select value={selectedGuide} onValueChange={setSelectedGuide}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(guides).map(([key, name]) => (
                  <SelectItem key={key} value={key}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="secondary">{steps.length} steps</Badge>
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button size="sm">
                <Save className="w-4 h-4 mr-1" />
                Save Guide
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steps Editor */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Guide Steps</CardTitle>
              <CardDescription>Configure the interactive tour steps</CardDescription>
            </div>
            <Button onClick={addStep}>
              <Plus className="w-4 h-4 mr-1" />
              Add Step
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <Card key={step.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Step {index + 1}</Badge>
                    <div className="flex gap-1 ml-auto">
                      <Button variant="ghost" size="sm" onClick={() => moveStep(step.id, "up")} disabled={index === 0}>
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveStep(step.id, "down")}
                        disabled={index === steps.length - 1}
                      >
                        ↓
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteStep(step.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Step Title</Label>
                      <Input value={step.title} onChange={(e) => updateStep(step.id, "title", e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label>CSS Selector</Label>
                      <Input
                        value={step.selector}
                        onChange={(e) => updateStep(step.id, "selector", e.target.value)}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={step.description}
                      onChange={(e) => updateStep(step.id, "description", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tooltip Position</Label>
                      <Select value={step.position} onValueChange={(value) => updateStep(step.id, "position", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Action (Optional)</Label>
                      <Select
                        value={step.action || "none"} // Updated default value to "none"
                        onValueChange={(value) => updateStep(step.id, "action", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="No action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No action</SelectItem>
                          <SelectItem value="click">Click</SelectItem>
                          <SelectItem value="hover">Hover</SelectItem>
                          <SelectItem value="focus">Focus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {steps.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No steps configured yet</p>
                <Button onClick={addStep} className="mt-2">
                  <Plus className="w-4 h-4 mr-1" />
                  Add First Step
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* JSON Export */}
      <Card>
        <CardHeader>
          <CardTitle>JSON Export</CardTitle>
          <CardDescription>Raw JSON configuration for advanced editing</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={JSON.stringify({ guide: selectedGuide, steps }, null, 2)}
            readOnly
            rows={8}
            className="font-mono text-sm"
          />
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">
              Copy JSON
            </Button>
            <Button variant="outline" size="sm">
              Import JSON
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
