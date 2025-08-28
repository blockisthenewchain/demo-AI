"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Server, Users, AlertTriangle, CheckCircle } from "lucide-react"

export function DemoConfiguration() {
  const [safetyMode, setSafetyMode] = useState("proxy-safe")
  const [warmPoolTarget, setWarmPoolTarget] = useState("5")
  const [allowlist, setAllowlist] = useState("user@company.com\nadmin@startup.io\ntest@example.com")
  const [personaSeed, setPersonaSeed] = useState(`{
  "users": [
    {
      "name": "John Doe",
      "email": "john@acme.com",
      "role": "admin",
      "company": "Acme Corp"
    },
    {
      "name": "Jane Smith", 
      "email": "jane@acme.com",
      "role": "user",
      "company": "Acme Corp"
    }
  ],
  "projects": [
    {
      "name": "Q4 Marketing Campaign",
      "status": "active",
      "progress": 75
    }
  ]
}`)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Demo Configuration</h3>
        <p className="text-muted-foreground">Configure demo safety, environment, and user experience</p>
      </div>

      {/* Safety Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Demo Safety Mode
          </CardTitle>
          <CardDescription>Control how demo environments handle external communications</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={safetyMode} onValueChange={setSafetyMode}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no-send" id="no-send" />
              <Label htmlFor="no-send" className="flex-1 cursor-pointer">
                <div className="space-y-1">
                  <div className="font-medium">No-send Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Block all external communications (emails, webhooks, API calls)
                  </div>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    Maximum Safety
                  </Badge>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="proxy-safe" id="proxy-safe" />
              <Label htmlFor="proxy-safe" className="flex-1 cursor-pointer">
                <div className="space-y-1">
                  <div className="font-medium">Proxy-safe Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Route external calls through safe proxy, log but don't execute
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Recommended
                  </Badge>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="verified-test" id="verified-test" />
              <Label htmlFor="verified-test" className="flex-1 cursor-pointer">
                <div className="space-y-1">
                  <div className="font-medium">Verified Test Sends</div>
                  <div className="text-sm text-muted-foreground">Allow real sends to verified test accounts only</div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Production-like
                  </Badge>
                </div>
              </Label>
            </div>
          </RadioGroup>

          {safetyMode === "verified-test" && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-yellow-900 dark:text-yellow-100">Caution Required</div>
                  <div className="text-yellow-700 dark:text-yellow-300">
                    This mode allows real external communications. Ensure your allowlist is properly configured.
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Warm Pool Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            Warm Pool Configuration
          </CardTitle>
          <CardDescription>Pre-warmed demo environments for instant access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="warm-pool">Target Pool Size</Label>
            <Input
              id="warm-pool"
              type="number"
              min="1"
              max="10"
              value={warmPoolTarget}
              onChange={(e) => setWarmPoolTarget(e.target.value)}
            />
            <div className="text-sm text-muted-foreground">
              Number of pre-warmed environments to maintain (costs ~$2/environment/hour)
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="font-medium">Current Pool</div>
              <div className="text-2xl font-bold text-accent">3</div>
              <div className="text-muted-foreground">Ready</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="font-medium">Avg Start Time</div>
              <div className="text-2xl font-bold text-accent">12s</div>
              <div className="text-muted-foreground">P95</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="font-medium">Monthly Cost</div>
              <div className="text-2xl font-bold text-accent">${Number.parseInt(warmPoolTarget) * 48}</div>
              <div className="text-muted-foreground">Estimated</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Allowlist Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Demo Allowlist
          </CardTitle>
          <CardDescription>Email addresses allowed to access demos (one per line)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="user@company.com"
            value={allowlist}
            onChange={(e) => setAllowlist(e.target.value)}
            rows={6}
            className="font-mono text-sm"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {allowlist.split("\n").filter((line) => line.trim()).length} addresses configured
            </span>
            <Button variant="outline" size="sm">
              Import from CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Persona Seed Data */}
      <Card>
        <CardHeader>
          <CardTitle>Persona Seed Data</CardTitle>
          <CardDescription>JSON data to populate demo environments with realistic content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={personaSeed}
            onChange={(e) => setPersonaSeed(e.target.value)}
            rows={12}
            className="font-mono text-sm"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">Valid JSON</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Validate
              </Button>
              <Button variant="outline" size="sm">
                Preview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
