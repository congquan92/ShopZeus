import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel"
import { Badge } from "./badge"
import { Button } from "./button"
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
// ---------------------------------------------

interface ProductDialogProps {
    open: boolean
    onClose: () => void
    product: Product | null
    variant: ProductVariant | null
    selectedSize: string | null
    setVariant: (variant: ProductVariant) => void
    setSize: (size: string | null) => void
    quantity: number
    setQuantity: (q: number) => void
}

export default function ProductDialog({
    open,
    onClose,
    product,
    variant,
    selectedSize,
    setVariant,
    setSize,
    quantity,
    setQuantity
}: ProductDialogProps) {
    if (!product || !variant) return null

    const getDiscountPercentage = (price: string, originalPrice?: string): number => {
        if (!originalPrice) return 0
        const priceNum = parseFloat(price.replace(/[^\d]/g, ''))
        const originalPriceNum = parseFloat(originalPrice.replace(/[^\d]/g, ''))
        return Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="p-0 !max-w-fit w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    {/* Hình ảnh */}
                    <div className="flex items-center justify-center bg-gray-100 p-4">
                        {variant.color.images.length > 1 ? (
                            <Carousel className="w-full max-w-md">
                                <CarouselContent>
                                    {variant.color.images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <img
                                                src={image}
                                                alt={`${product.name} - ${variant.color.name} ${index + 1}`}
                                                className="w-full h-auto rounded-lg object-cover"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                            </Carousel>
                        ) : (
                            <img
                                src={variant.color.images[0]}
                                alt={`${product.name} - ${variant.color.name}`}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                        )}
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div className="p-6 space-y-2">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
                            {product.description && (
                                <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                            )}
                        </DialogHeader>

                        {/* Giá */}
                        <div className="flex items-center gap-3">
                            <p className="text-red-500 font-semibold text-lg">{variant.price}</p>
                            {variant.originalPrice && (
                                <span className="text-gray-500 text-sm line-through">
                                    {variant.originalPrice}
                                </span>
                            )}
                            {variant.originalPrice && (
                                <Badge className="bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-md font-medium">
                                    {getDiscountPercentage(variant.price, variant.originalPrice)}%
                                </Badge>
                            )}
                        </div>

                        <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-none font-medium">
                            {product.sold} Đã Bán
                        </Badge>

                        {/* Màu */}
                        {product.variants.length > 1 && (
                            <div>
                                <p className="font-medium mb-2">Màu sắc: {variant.color.name}</p>
                                <div className="flex gap-2 flex-wrap">
                                    {product.variants.map((v, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setVariant(v)
                                                setSize(null)
                                            }}
                                            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${variant === v ? "border-black shadow-lg scale-110" : "border-gray-300 hover:border-gray-500"
                                                }`}
                                            style={{ backgroundColor: v.color.code }}
                                            title={v.color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size */}
                        <div>
                            <p className="font-medium mb-2">Kích thước:</p>
                            <div className="flex gap-2 flex-wrap">
                                {variant.sizes.map((size) => {
                                    const stock = variant.stock[size] || 0
                                    const isOutOfStock = stock === 0
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => !isOutOfStock && setSize(size)}
                                            disabled={isOutOfStock}
                                            className={`px-3 py-1 border rounded-md text-sm transition-all duration-200 ${selectedSize === size
                                                ? "bg-black text-white border-black"
                                                : isOutOfStock
                                                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                                    : "hover:bg-gray-100 border-gray-300"
                                                }`}
                                        >
                                            {size}
                                            {isOutOfStock && <span className="ml-1 text-xs">(Hết)</span>}
                                        </button>
                                    )
                                })}
                            </div>
                            {selectedSize && variant.stock[selectedSize] && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Còn lại: {variant.stock[selectedSize]} sản phẩm
                                </p>
                            )}
                        </div>

                        {/* Số lượng */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center border rounded">
                                <button className="px-2 py-1 hover:bg-gray-100" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                    -
                                </button>
                                <input
                                    type="number"
                                    min={1}
                                    max={selectedSize ? variant.stock[selectedSize] : 1}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 text-center py-1 border-x focus:outline-none"
                                />
                                <button
                                    className="px-2 py-1 hover:bg-gray-100"
                                    onClick={() => {
                                        const maxQty = selectedSize ? variant.stock[selectedSize] : 1
                                        setQuantity(Math.min(maxQty, quantity + 1))
                                    }}
                                >
                                    +
                                </button>
                            </div>
                            <Button
                                className="flex-1"
                                disabled={!selectedSize || !variant.stock[selectedSize!]}
                                onClick={() => {
                                    console.log("Added to cart:", { product, variant, size: selectedSize, quantity })
                                }}
                            >
                                {selectedSize ? `Thêm vào giỏ (Size ${selectedSize})` : "Chọn size trước"}
                            </Button>
                        </div>

                        <Button variant="ghost" className="text-blue-500 underline">Xem chi tiết »</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
