"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, CreditCard, Shield, Download } from "lucide-react"
import type { SaaSProduct } from "@/lib/mock-data"

interface PurchaseWizardProps {
  isOpen: boolean
  onClose: () => void
  product: SaaSProduct | null
  onPurchaseComplete: (purchaseData: any) => void
}

interface PurchaseData {
  selectedPlan: string
  brandName: string
  brandLogo: string
  deliveryMode: "managed" | "source"
  legalAccepted: boolean
  paymentMethod: "stripe" | "polar"
  cardNumber: string
  expiryDate: string
  cvv: string
  billingName: string
}

export function PurchaseWizard({ isOpen, onClose, product, onPurchaseComplete }: PurchaseWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [purchaseData, setPurchaseData] = useState<PurchaseData>({
    selectedPlan: "",
    brandName: "",
    brandLogo: "",
    deliveryMode: "managed",
    legalAccepted: false,
    paymentMethod: "stripe",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingName: "",
  })

  const steps = ["Plan", "Brand", "Delivery", "Legal", "Payment"]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete purchase
      const completePurchaseData = {
        ...purchaseData,
        product: product,
        purchaseId: `PX-${Date.now()}`,
        purchaseDate: new Date().toISOString(),
        status: "completed",
      }
      onPurchaseComplete(completePurchaseData)
      handleClose()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setCurrentStep(0)
    setPurchaseData({
      selectedPlan: "",
      brandName: "",
      brandLogo: "",
      deliveryMode: "managed",
      legalAccepted: false,
      paymentMethod: "stripe",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      billingName: "",
    })
    onClose()
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return purchaseData.selectedPlan !== ""
      case 1:
        return purchaseData.brandName !== ""
      case 2:
        return true // Delivery mode has default
      case 3:
        return purchaseData.legalAccepted
      case 4:
        return (
          purchaseData.cardNumber !== "" &&
          purchaseData.expiryDate !== "" &&
          purchaseData.cvv !== "" &&
          purchaseData.billingName !== ""
        )
      default:
        return false
    }
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Purchase {product.name}
          </DialogTitle>
          <DialogDescription>Complete your purchase in {steps.length} simple steps</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {/* Step 1: Plan Selection */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Choose Your Plan</h3>
                <RadioGroup
                  value={purchaseData.selectedPlan}
                  onValueChange={(value) => setPurchaseData({ ...purchaseData, selectedPlan: value })}
                >
                  {product.pricing.map((plan) => (
                    <div key={plan.plan} className="flex items-center space-x-2">
                      <RadioGroupItem value={plan.plan} id={plan.plan} />
                      <Label htmlFor={plan.plan} className="flex-1 cursor-pointer">
                        <Card className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{plan.plan}</div>
                              <div className="text-sm text-muted-foreground">
                                Perfect for {plan.plan.toLowerCase()} usage
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">${plan.price}</div>
                              <div className="text-sm text-muted-foreground">{plan.period}</div>
                            </div>
                          </div>
                        </Card>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Brand Configuration */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Brand Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="brandName">Brand Name</Label>
                    <Input
                      id="brandName"
                      placeholder="Enter your brand name"
                      value={purchaseData.brandName}
                      onChange={(e) => setPurchaseData({ ...purchaseData, brandName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="brandLogo">Brand Logo URL (Optional)</Label>
                    <Input
                      id="brandLogo"
                      placeholder="https://example.com/logo.png"
                      value={purchaseData.brandLogo}
                      onChange={(e) => setPurchaseData({ ...purchaseData, brandLogo: e.target.value })}
                    />
                  </div>
                  <Card className="p-4 bg-muted/50">
                    <h4 className="font-medium mb-2">Brand Preview</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-bold">
                        {purchaseData.brandName ? purchaseData.brandName.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div>
                        <div className="font-medium">{purchaseData.brandName || "Your Brand"}</div>
                        <div className="text-sm text-muted-foreground">Powered by {product.name}</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Step 3: Delivery Mode */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Delivery Mode</h3>
                <RadioGroup
                  value={purchaseData.deliveryMode}
                  onValueChange={(value) =>
                    setPurchaseData({ ...purchaseData, deliveryMode: value as "managed" | "source" })
                  }
                >
                  {product.deliveryOptions.includes("Managed") && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="managed" id="managed" />
                      <Label htmlFor="managed" className="flex-1 cursor-pointer">
                        <Card className="p-4">
                          <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-accent mt-1" />
                            <div>
                              <div className="font-medium">Managed Deployment</div>
                              <div className="text-sm text-muted-foreground">
                                We handle hosting, updates, and maintenance. Ready in minutes.
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="secondary">Auto-scaling</Badge>
                                <Badge variant="secondary">24/7 Support</Badge>
                                <Badge variant="secondary">SSL Included</Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Label>
                    </div>
                  )}

                  {product.deliveryOptions.includes("Source") && (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="source" id="source" />
                      <Label htmlFor="source" className="flex-1 cursor-pointer">
                        <Card className="p-4">
                          <div className="flex items-start gap-3">
                            <Download className="w-5 h-5 text-accent mt-1" />
                            <div>
                              <div className="font-medium">Source Code</div>
                              <div className="text-sm text-muted-foreground">
                                Get full source code and deploy anywhere you want. Complete control.
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="secondary">Full Source</Badge>
                                <Badge variant="secondary">Self-hosted</Badge>
                                <Badge variant="secondary">Customizable</Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Label>
                    </div>
                  )}
                </RadioGroup>
              </div>
            )}

            {/* Step 4: Legal */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Legal Agreement</h3>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Terms of Service</h4>
                      <div className="text-sm text-muted-foreground space-y-2 max-h-40 overflow-y-auto border rounded p-3">
                        <p>By purchasing {product.name}, you agree to the following terms and conditions...</p>
                        <p>
                          1. License Grant: Subject to your compliance with these terms, we grant you a limited,
                          non-exclusive, non-transferable license to use the software.
                        </p>
                        <p>
                          2. Restrictions: You may not reverse engineer, decompile, or disassemble the software except
                          as permitted by law.
                        </p>
                        <p>3. Support: We provide technical support for the duration of your subscription.</p>
                        <p>4. Privacy: We respect your privacy and handle data according to our Privacy Policy.</p>
                        <p>5. Refunds: 30-day money-back guarantee for all purchases.</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="legal"
                        checked={purchaseData.legalAccepted}
                        onCheckedChange={(checked) =>
                          setPurchaseData({ ...purchaseData, legalAccepted: checked as boolean })
                        }
                      />
                      <Label htmlFor="legal" className="text-sm">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Step 5: Payment */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Payment Method</Label>
                    <RadioGroup
                      value={purchaseData.paymentMethod}
                      onValueChange={(value) =>
                        setPurchaseData({ ...purchaseData, paymentMethod: value as "stripe" | "polar" })
                      }
                      className="flex gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="stripe" id="stripe" />
                        <Label htmlFor="stripe">Stripe</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="polar" id="polar" />
                        <Label htmlFor="polar">Polar</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="billingName">Billing Name</Label>
                      <Input
                        id="billingName"
                        placeholder="John Doe"
                        value={purchaseData.billingName}
                        onChange={(e) => setPurchaseData({ ...purchaseData, billingName: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="4242 4242 4242 4242"
                        value={purchaseData.cardNumber}
                        onChange={(e) => setPurchaseData({ ...purchaseData, cardNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={purchaseData.expiryDate}
                        onChange={(e) => setPurchaseData({ ...purchaseData, expiryDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={purchaseData.cvv}
                        onChange={(e) => setPurchaseData({ ...purchaseData, cvv: e.target.value })}
                      />
                    </div>
                  </div>

                  <Card className="p-4 bg-muted/50">
                    <h4 className="font-medium mb-2">Order Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>
                          {product.name} - {purchaseData.selectedPlan}
                        </span>
                        <span>${product.pricing.find((p) => p.plan === purchaseData.selectedPlan)?.price || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery: {purchaseData.deliveryMode === "managed" ? "Managed" : "Source Code"}</span>
                        <span>Included</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-medium">
                        <span>Total</span>
                        <span>${product.pricing.find((p) => p.plan === purchaseData.selectedPlan)?.price || 0}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={!canProceed()}>
              {currentStep === steps.length - 1 ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Complete Purchase
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
