"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { mockSaaSProducts } from "@/lib/mock-data"
import { ProductCard } from "@/components/product-card"
import { DemoModal } from "@/components/demo-modal"
import { PurchaseWizard } from "@/components/purchase-wizard"
import { DeliveryView } from "@/components/delivery-view"

export function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDelivery, setSelectedDelivery] = useState<string>("all")
  const [demoProduct, setDemoProduct] = useState<string | null>(null)
  const [purchaseProduct, setPurchaseProduct] = useState<string | null>(null)
  const [completedPurchase, setCompletedPurchase] = useState<any>(null)

  const categories = ["all", ...Array.from(new Set(mockSaaSProducts.map((p) => p.category)))]

  const filteredProducts = mockSaaSProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    const matchesDelivery =
      selectedDelivery === "all" || product.deliveryOptions.includes(selectedDelivery as "Managed" | "Source")

    return matchesSearch && matchesCategory && matchesDelivery
  })

  const handleTryDemo = (productId: string) => {
    const product = mockSaaSProducts.find((p) => p.id === productId)
    if (product) {
      setDemoProduct(product.name)
    }
  }

  const handlePurchase = (productId: string) => {
    setPurchaseProduct(productId)
  }

  const handlePurchaseComplete = (purchaseData: any) => {
    setCompletedPurchase(purchaseData)
    setPurchaseProduct(null)
  }

  const selectedProduct = purchaseProduct ? mockSaaSProducts.find((p) => p.id === purchaseProduct) : null

  if (completedPurchase) {
    return <DeliveryView purchaseData={completedPurchase} />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">SaaS Marketplace</h2>
        <p className="text-muted-foreground">Discover and purchase enterprise-ready SaaS solutions</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Find Your Perfect Solution
          </CardTitle>
          <CardDescription>
            Browse {mockSaaSProducts.length} verified SaaS products with demos and flexible delivery options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search products, categories, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDelivery} onValueChange={setSelectedDelivery}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Delivery" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Delivery</SelectItem>
                  <SelectItem value="Managed">Managed</SelectItem>
                  <SelectItem value="Source">Source Code</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(searchQuery || selectedCategory !== "all" || selectedDelivery !== "all") && (
            <div className="flex items-center gap-2 mt-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {mockSaaSProducts.length} products
              </span>
              {searchQuery && <Badge variant="secondary">Search: "{searchQuery}"</Badge>}
              {selectedCategory !== "all" && <Badge variant="secondary">Category: {selectedCategory}</Badge>}
              {selectedDelivery !== "all" && <Badge variant="secondary">Delivery: {selectedDelivery}</Badge>}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedDelivery("all")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onTryDemo={handleTryDemo} onPurchase={handlePurchase} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p>Try adjusting your search criteria or browse all categories</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Demo Modal */}
      <DemoModal isOpen={!!demoProduct} onClose={() => setDemoProduct(null)} productName={demoProduct || ""} />

      {/* Purchase Wizard */}
      <PurchaseWizard
        isOpen={!!purchaseProduct}
        onClose={() => setPurchaseProduct(null)}
        product={selectedProduct}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </div>
  )
}
