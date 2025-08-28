"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, Play, ExternalLink } from "lucide-react"
import type { SaaSProduct } from "@/lib/mock-data"

interface ProductCardProps {
  product: SaaSProduct
  onTryDemo?: (productId: string) => void
  onPurchase?: (productId: string) => void
}

export function ProductCard({ product, onTryDemo, onPurchase }: ProductCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-3">
          <img src={product.logo || "/placeholder.svg"} alt={`${product.name} logo`} className="w-12 h-12 rounded-lg" />
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <CardDescription className="text-sm">{product.shortDescription}</CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <div>
            <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {product.trustBadges.map((badge) => (
                <Badge key={badge} variant="outline" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Delivery:</span>
              {product.deliveryOptions.map((option) => (
                <Badge key={option} variant="secondary" className="text-xs">
                  {option}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-sm">
            <span className="font-medium">From ${product.pricing[0].price}</span>
            <span className="text-muted-foreground"> {product.pricing[0].period}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          {product.demoAvailable && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
              onClick={() => onTryDemo?.(product.id)}
            >
              <Play className="w-4 h-4 mr-1" />
              Try Demo
            </Button>
          )}
          <Button size="sm" className="flex-1" onClick={() => onPurchase?.(product.id)}>
            Purchase
          </Button>
        </div>

        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="mt-2 w-full">
              <ExternalLink className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <img
                  src={product.logo || "/placeholder.svg"}
                  alt={`${product.name} logo`}
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <DialogTitle className="text-xl">{product.name}</DialogTitle>
                  <DialogDescription>{product.shortDescription}</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Key Features</h4>
                <ul className="grid grid-cols-2 gap-1 text-sm">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Pricing Plans</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {product.pricing.map((plan) => (
                    <div key={plan.plan} className="border rounded-lg p-3">
                      <div className="font-medium">{plan.plan}</div>
                      <div className="text-lg font-bold">${plan.price}</div>
                      <div className="text-sm text-muted-foreground">{plan.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Founded:</span>
                  <span className="ml-2">{product.founded}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Team Size:</span>
                  <span className="ml-2">{product.teamSize}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {product.demoAvailable && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      onTryDemo?.(product.id)
                      setShowDetails(false)
                    }}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Try Demo
                  </Button>
                )}
                <Button
                  onClick={() => {
                    onPurchase?.(product.id)
                    setShowDetails(false)
                  }}
                >
                  Purchase Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
