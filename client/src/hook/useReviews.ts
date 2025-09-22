import { useState, useEffect } from "react"

interface Review {
    id: number
    productId: number
    userId: number
    userName: string
    rating: number
    comment: string
    date: string
    helpful: number
    images: string[]
    verified: boolean
}

export const useReviews = (productId?: number) => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true)
            setError(null)
            
            try {
                // TODO: Replace with real API call
                // const response = await fetch(`/api/reviews${productId ? `?productId=${productId}` : ''}`)
                // const data = await response.json()
                // setReviews(data)
                
                // Using local JSON data for now
                const response = await fetch('/src/data/reviews.json')
                const data = await response.json()
                
                if (productId) {
                    const productReviews = data.filter((review: Review) => review.productId === productId)
                    setReviews(productReviews)
                } else {
                    setReviews(data)
                }
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Lỗi khi tải đánh giá')
                setReviews([])
            } finally {
                setLoading(false)
            }
        }

        fetchReviews()
    }, [productId])

    const addReview = async (reviewData: Omit<Review, 'id' | 'date' | 'helpful'>) => {
        try {
            // TODO: Replace with real API call
            // const response = await fetch('/api/reviews', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(reviewData)
            // })
            // const newReview = await response.json()
            
            // Temporary local implementation
            const newReview: Review = {
                ...reviewData,
                id: Date.now(),
                date: new Date().toISOString(),
                helpful: 0
            }
            
            setReviews(prev => [newReview, ...prev])
            return { success: true, message: 'Đánh giá đã được thêm thành công' }
            
        } catch (err) {
            return { 
                success: false, 
                message: err instanceof Error ? err.message : 'Lỗi khi thêm đánh giá' 
            }
        }
    }

    const markHelpful = async (reviewId: number) => {
        try {
            // TODO: Replace with real API call
            // await fetch(`/api/reviews/${reviewId}/helpful`, { method: 'POST' })
            
            // Temporary local implementation
            setReviews(prev => 
                prev.map(review => 
                    review.id === reviewId 
                        ? { ...review, helpful: review.helpful + 1 }
                        : review
                )
            )
            return { success: true }
            
        } catch (err) {
            return { 
                success: false, 
                message: err instanceof Error ? err.message : 'Lỗi khi đánh dấu hữu ích' 
            }
        }
    }

    // Calculate review statistics
    const getReviewStats = () => {
        if (reviews.length === 0) {
            return {
                averageRating: 0,
                totalReviews: 0,
                ratingDistribution: [0, 0, 0, 0, 0]
            }
        }

        const totalReviews = reviews.length
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        
        const ratingDistribution = [0, 0, 0, 0, 0]
        reviews.forEach(review => {
            ratingDistribution[review.rating - 1]++
        })

        return {
            averageRating: Math.round(averageRating * 10) / 10,
            totalReviews,
            ratingDistribution
        }
    }

    return { 
        reviews, 
        loading, 
        error, 
        addReview, 
        markHelpful, 
        getReviewStats: getReviewStats()
    }
}