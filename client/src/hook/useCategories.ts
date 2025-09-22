import { useState, useEffect } from "react"

interface Category {
    id: number
    name: string
    slug: string
    image: string
    description: string
    subCategories: SubCategory[]
}

interface SubCategory {
    id: number
    name: string
    slug: string
    productCount: number
}

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            setError(null)
            
            try {
                // TODO: Replace with real API call
                // const response = await fetch('/api/categories')
                // const data = await response.json()
                // setCategories(data)
                
                // Using local JSON data for now
                const response = await fetch('/src/data/categories.json')
                const data = await response.json()
                setCategories(data)
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Lỗi khi tải danh mục')
                setCategories([])
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return { categories, loading, error }
}

export const useCategoryBySlug = (slug: string) => {
    const [category, setCategory] = useState<Category | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true)
            setError(null)
            
            try {
                // TODO: Replace with real API call
                // const response = await fetch(`/api/categories/${slug}`)
                // const data = await response.json()
                // setCategory(data)
                
                // Using local JSON data for now
                const response = await fetch('/src/data/categories.json')
                const data = await response.json()
                const foundCategory = data.find((cat: Category) => cat.slug === slug)
                
                if (foundCategory) {
                    setCategory(foundCategory)
                } else {
                    setError('Không tìm thấy danh mục')
                }
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Lỗi khi tải danh mục')
                setCategory(null)
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchCategory()
        }
    }, [slug])

    return { category, loading, error }
}