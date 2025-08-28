"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Key, CheckCircle, AlertCircle, ExternalLink } from "lucide-react"

export function PaymentConfiguration() {
  const [stripeEnabled, setStripeEnabled] = useState(true)
  const [polarEnabled, setPolarEnabled] = useState(false)
  const [stripeKey, setStripeKey] = useState("sk_live_••••••••••••••••••••••••••••")
  const [polarKey, setPolarKey] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Payment Configuration</h3>
        <p className="text-muted-foreground">Configure payment processors for your SaaS listings</p>
      </div>

      {/* Stripe Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6" />
              <div>
                <CardTitle>Stripe Integration</CardTitle>
                <CardDescription>Process payments through Stripe</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {stripeEnabled && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              )}
              <Switch checked={stripeEnabled} onCheckedChange={setStripeEnabled} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stripe-key">Secret Key</Label>
            <div className="flex gap-2">
              <Input
                id="stripe-key"
                type="password"
                value={stripeKey}
                onChange={(e) => setStripeKey(e.target.value)}
                disabled={!stripeEnabled}
              />
              <Button variant="outline" disabled={!stripeEnabled}>
                <Key className="w-4 h-4 mr-1" />
                Test
              </Button>
            </div>
          </div>

          {stripeEnabled && (
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-green-900 dark:text-green-100">Stripe Connected</div>
                  <div className="text-green-700 dark:text-green-300">
                    Webhook endpoint configured. Processing fees: 2.9% + 30¢
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Account ID:</span>
              <span className="ml-2 font-mono">acct_1234567890</span>
            </div>
            <div>
              <span className="text-muted-foreground">Webhook Status:</span>
              <span className="ml-2">Active</span>
            </div>
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            <ExternalLink className="w-4 h-4 mr-1" />
            Open Stripe Dashboard
          </Button>
        </CardContent>
      </Card>

      {/* Polar Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6" />
              <div>
                <CardTitle>Polar Integration</CardTitle>
                <CardDescription>Alternative payment processor with lower fees</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {polarEnabled && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Connected
                </Badge>
              )}
              <Switch checked={polarEnabled} onCheckedChange={setPolarEnabled} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="polar-key">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="polar-key"
                type="password"
                placeholder="polar_sk_..."
                value={polarKey}
                onChange={(e) => setPolarKey(e.target.value)}
                disabled={!polarEnabled}
              />
              <Button variant="outline" disabled={!polarEnabled || !polarKey}>
                <Key className="w-4 h-4 mr-1" />
                Test
              </Button>
            </div>
          </div>

          {polarEnabled && !polarKey && (
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-yellow-900 dark:text-yellow-100">API Key Required</div>
                  <div className="text-yellow-700 dark:text-yellow-300">
                    Enter your Polar API key to enable payment processing
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            Processing fees: 1.9% + 25¢ • Lower international fees • Crypto support
          </div>

          <Button variant="outline" className="w-full bg-transparent" disabled={!polarEnabled}>
            <ExternalLink className="w-4 h-4 mr-1" />
            Open Polar Dashboard
          </Button>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>Configure payment behavior and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Auto-refund failed deliveries</div>
              <div className="text-sm text-muted-foreground">Automatically refund if deployment fails</div>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Require payment verification</div>
              <div className="text-sm text-muted-foreground">Verify payment method before demo access</div>
            </div>
            <Switch />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Enable subscription billing</div>
              <div className="text-sm text-muted-foreground">Allow recurring payments for managed hosting</div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
