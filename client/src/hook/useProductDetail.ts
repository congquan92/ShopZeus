import { useState, useEffect } from 'react'
import productDetailData from '../data/productdetail.json'

interface ProductDetail {
    id: number
    name: string
    price: string
    originalPrice: string
    discount: string
    rating: number
    sold: number
    description: string
    images: string[]
    sizes: string[]
    colors: string[]
    inStock: boolean
    specifications: Record<string, string>
}

export const useProductDetail = (id: string | undefined) => {
    const [product, setProduct] = useState<ProductDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadProductData = () => {
            setLoading(true)
            setError(null)
            
            try {
                const productId = parseInt(id || "1")
                const foundProduct = productDetailData.find(p => p.id === productId)
                
                if (foundProduct) {
                    setProduct(foundProduct as ProductDetail)
                } else {
                    setProduct(null)
                    setError('Không tìm thấy sản phẩm')
                }
            } catch {
                setError('Lỗi khi tải dữ liệu sản phẩm')
                setProduct(null)
            } finally {
                setLoading(false)
            }
        }

        loadProductData()
    }, [id])

    return { product, loading, error }
}