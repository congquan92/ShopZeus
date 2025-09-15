import { Card, CardContent, CardFooter } from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
import { Heart } from "lucide-react"
// import { Product, ProductVariant } from "./types"

 interface Product { 
    id: number
    name: string
    description?: string
    category: string
    brand?: string
    discount?: string
    variants: ProductVariant[]
    rating: number
    sold: number
    tags?: string[]
}
interface ProductColor { 
    name: string
    code: string
    images: string[]
}
interface ProductVariant {
    color: ProductColor
    sizes: string[]
    price: string
    originalPrice?: string
    stock: Record<string, number> // size -> quantity
}
// -------------------------------------------

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product, variant: ProductVariant) => void
}

const getPrimaryVariant = (product: Product): ProductVariant => {
  return product.variants[0]
}

const getDiscountPercentage = (price: string, originalPrice?: string): number => {
  if (!originalPrice) return 0
  const priceNum = parseFloat(price.replace(/[^\d]/g, ''))
  const originalPriceNum = parseFloat(originalPrice.replace(/[^\d]/g, ''))
  return Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const primaryVariant = getPrimaryVariant(product)
  const primaryImage = primaryVariant.color.images[0]
  const discountPercent = getDiscountPercentage(primaryVariant.price, primaryVariant.originalPrice)

  return (
    <Card className="group p-0 shadow-none rounded-none cursor-pointer gap-0">
      <CardContent className="relative p-2">
        {product.discount && (
          <Badge className="absolute top-3 left-3 z-10 bg-amber-300 text-white text-xs px-1.5 py-0.5 rounded-md font-medium">
            {product.discount}
          </Badge>
        )}
        
        {product.variants.length > 1 && (
          <div className="absolute top-3 right-3 z-10 flex gap-1">
            {product.variants.slice(0, 3).map((variant, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: variant.color.code }}
                title={variant.color.name}
              />
            ))}
            {product.variants.length > 3 && (
              <div className="w-3 h-3 rounded-full bg-gray-500 border-2 border-white shadow-sm text-[8px] text-white flex items-center justify-center">
                +
              </div>
            )}
          </div>
        )}

        <img 
          src={primaryImage} 
          alt={product.name} 
          className="object-cover w-full max-h-[250px] transition-transform duration-500 group-hover:scale-105" 
          loading="lazy" 
        />
        
        {/* Overlay hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button 
            size="sm" 
            variant="secondary" 
            className="bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1.5 rounded-none cursor-pointer backdrop-blur-sm"
            onClick={() => onQuickView(product, primaryVariant)}
          > 
            Xem nhanh
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1.5 rounded-none cursor-pointer backdrop-blur-sm mx-2">
            <Heart size={14} /> Yêu thích
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 p-3 items-start">
        <div className="flex flex-col gap-1">
          <span className="text-l font-medium text-gray-700 line-clamp-2">
            {product.name}
          </span>
          <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-none font-medium">
            {product.sold} Đã Bán
          </Badge>
        </div>
        <div className="flex items-center justify-between gap-2">
          {primaryVariant.originalPrice && (
            <span className="text-gray-500 text-xs line-through">
              {primaryVariant.originalPrice}
            </span>
          )}
          <span className="text-lg font-semibold text-gray-900">
            {primaryVariant.price}
          </span>
          {discountPercent > 0 && (
            <Badge className="bg-red-600 text-amber-50 text-xs px-1.5 py-0.5 rounded-md font-medium">
              {discountPercent}%
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
