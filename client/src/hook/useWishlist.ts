import { useState, useEffect } from "react"

interface WishlistItem {
    id: number
    userId: number
    productId: number
    name: string
    price: number
    originalPrice: number
    image: string
    addedDate: string
    inStock: boolean
}

export const useWishlist = (userId: number) => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchWishlist = async () => {
            setLoading(true)
            setError(null)
            
            try {
                // TODO: Replace with real API call
                // const response = await fetch(`/api/wishlist?userId=${userId}`)
                // const data = await response.json()
                // setWishlist(data)
                
                // Using local JSON data for now
                const response = await fetch('/src/data/wishlist.json')
                const data = await response.json()
                const userWishlist = data.filter((item: WishlistItem) => item.userId === userId)
                setWishlist(userWishlist)
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Lỗi khi tải danh sách yêu thích')
                setWishlist([])
            } finally {
                setLoading(false)
            }
        }

        if (userId) {
            fetchWishlist()
        }
    }, [userId])

    const addToWishlist = async (productId: number, productData: Partial<WishlistItem>) => {
        try {
            // TODO: Replace with real API call
            // const response = await fetch('/api/wishlist', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ userId, productId, ...productData })
            // })
            // const newItem = await response.json()
            
            // Temporary local implementation
            const newItem: WishlistItem = {
                id: Date.now(),
                userId,
                productId,
                addedDate: new Date().toISOString(),
                ...productData
            } as WishlistItem
            
            setWishlist(prev => [...prev, newItem])
            return { success: true, message: 'Đã thêm vào danh sách yêu thích' }
            
        } catch (err) {
            return { 
                success: false, 
                message: err instanceof Error ? err.message : 'Lỗi khi thêm vào yêu thích' 
            }
        }
    }

    const removeFromWishlist = async (itemId: number) => {
        try {
            // TODO: Replace with real API call
            // await fetch(`/api/wishlist/${itemId}`, { method: 'DELETE' })
            
            // Temporary local implementation
            setWishlist(prev => prev.filter(item => item.id !== itemId))
            return { success: true, message: 'Đã xóa khỏi danh sách yêu thích' }
            
        } catch (err) {
            return { 
                success: false, 
                message: err instanceof Error ? err.message : 'Lỗi khi xóa khỏi yêu thích' 
            }
        }
    }

    const isInWishlist = (productId: number) => {
        return wishlist.some(item => item.productId === productId)
    }

    return { 
        wishlist, 
        loading, 
        error, 
        addToWishlist, 
        removeFromWishlist, 
        isInWishlist 
    }
}