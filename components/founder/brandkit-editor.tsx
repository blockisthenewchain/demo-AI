"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Palette, Upload, Eye, Download } from "lucide-react"

export function BrandKitEditor() {
  const [brandName, setBrandName] = useState("TaskFlow Pro")
  const [tagline, setTagline] = useState("AI-powered project management for growing teams")
  const [primaryColor, setPrimaryColor] = useState("#8b5cf6")
  const [secondaryColor, setSecondaryColor] = useState("#1f2937")
  const [accentColor, setAccentColor] = useState("#3b82f6")
  const [logoUrl, setLogoUrl] = useState("")
  const [description, setDescription] = useState(
    "TaskFlow Pro helps teams collaborate more effectively with AI-powered insights and automated workflows.",
  )

  const colorPresets = [
    { name: "Purple & Gray", primary: "#8b5cf6", secondary: "#1f2937", accent: "#3b82f6" },
    { name: "Blue & Navy", primary: "#3b82f6", secondary: "#1e293b", accent: "#06b6d4" },
    { name: "Green & Dark", primary: "#10b981", secondary: "#111827", accent: "#f59e0b" },
    { name: "Orange & Black", primary: "#f97316", secondary: "#000000", accent: "#ef4444" },
  ]

  const applyPreset = (preset: (typeof colorPresets)[0]) => {
    setPrimaryColor(preset.primary)
    setSecondaryColor(preset.secondary)
    setAccentColor(preset.accent)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">BrandKit Editor</h3>
        <p className="text-muted-foreground">Customize your brand identity and visual theme</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Information */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Information</CardTitle>
            <CardDescription>Basic brand details and messaging</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input id="brand-name" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo-url">Logo URL</Label>
              <div className="flex gap-2">
                <Input
                  id="logo-url"
                  placeholder="https://example.com/logo.png"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                />
                <Button variant="outline">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Scheme */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color Scheme
            </CardTitle>
            <CardDescription>Define your brand colors and theme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondary-color"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent</Label>
                <div className="flex gap-2">
                  <Input
                    id="accent-color"
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-medium">Color Presets</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset)}
                    className="justify-start"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.primary }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.secondary }} />
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.accent }} />
                      </div>
                      <span className="text-xs">{preset.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Brand Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Brand Preview
          </CardTitle>
          <CardDescription>See how your brand will appear in demos and listings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Header Preview */}
            <div className="p-6 rounded-lg" style={{ backgroundColor: secondaryColor, color: "white" }}>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: primaryColor }}
                >
                  {brandName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{brandName}</h3>
                  <p className="text-sm opacity-80">{tagline}</p>
                </div>
              </div>
            </div>

            {/* Card Preview */}
            <div className="border rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: primaryColor }}
                >
                  {brandName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{brandName}</h4>
                  <p className="text-sm text-muted-foreground">{tagline}</p>
                </div>
              </div>
              <p className="text-sm mb-4">{description}</p>
              <div className="flex gap-2">
                <Button size="sm" style={{ backgroundColor: primaryColor, color: "white" }}>
                  Try Demo
                </Button>
                <Button size="sm" variant="outline" style={{ borderColor: accentColor, color: accentColor }}>
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button>Save Brand Kit</Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-1" />
          Export Assets
        </Button>
        <Button variant="outline">Reset to Default</Button>
      </div>
    </div>
  )
}
