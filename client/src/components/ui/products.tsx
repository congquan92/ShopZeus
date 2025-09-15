import { useState } from "react"
import TitleCompact from "./title_compact"


// import { Product, ProductVariant } from "./types"
import products from "../../data/product.json"
import ProductCard from "./productcard"
import ProductDialog from "./productdialog"

// ______test________
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

export default function Products() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<number>(1)

    return (
        <div>
            <TitleCompact title="Sản Phẩm Mới" subtitle="Khám Phá Những Sản Phẩm Mới Nhất Của Chúng Tôi" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        onQuickView={(product, variant) => {
                            setSelectedProduct(product)
                            setSelectedVariant(variant)
                            setSelectedSize(null)
                        }}
                    />
                ))}
            </div>

            <ProductDialog
                open={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                product={selectedProduct}
                variant={selectedVariant}
                selectedSize={selectedSize}
                setVariant={setSelectedVariant}
                setSize={setSelectedSize}
                quantity={quantity}
                setQuantity={setQuantity}
            />
        </div>
    )
}
