import { useState, useEffect } from "react"

interface SearchResult {
    id: number
    name: string
    price: number
    originalPrice: number
    image: string
    rating: number
    sold: number
    discount: string
    isNew: boolean
    category: string
}

export const useSearch = () => {
    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")

    const search = async (query: string, filters?: {
        category?: string
        minPrice?: number
        maxPrice?: number
        sortBy?: 'price' | 'rating' | 'sold' | 'newest'
        sortOrder?: 'asc' | 'desc'
    }) => {
        if (!query.trim()) {
            setResults([])
            return
        }

        setLoading(true)
        setError(null)
        setSearchTerm(query)
        
        try {
            // TODO: Replace with real API call
            // const params = new URLSearchParams({
            //     q: query,
            //     ...filters
            // })
            // const response = await fetch(`/api/search?${params}`)
            // const data = await response.json()
            // setResults(data)
            
            // Using local JSON data for now - search in newproduct.json
            const response = await fetch('/src/data/newproduct.json')
            const data = await response.json()
            
            let filteredResults = data.filter((product: SearchResult) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            )

            // Apply filters
            if (filters) {
                if (filters.category) {
                    filteredResults = filteredResults.filter((product: SearchResult) =>
                        product.category?.toLowerCase().includes(filters.category!.toLowerCase())
                    )
                }
                
                if (filters.minPrice) {
                    filteredResults = filteredResults.filter((product: SearchResult) =>
                        product.price >= filters.minPrice!
                    )
                }
                
                if (filters.maxPrice) {
                    filteredResults = filteredResults.filter((product: SearchResult) =>
                        product.price <= filters.maxPrice!
                    )
                }

                // Sort results
                if (filters.sortBy) {
                    filteredResults.sort((a: SearchResult, b: SearchResult) => {
                        let aValue, bValue
                        
                        switch (filters.sortBy) {
                            case 'price':
                                aValue = a.price
                                bValue = b.price
                                break
                            case 'rating':
                                aValue = a.rating
                                bValue = b.rating
                                break
                            case 'sold':
                                aValue = a.sold
                                bValue = b.sold
                                break
                            case 'newest':
                                aValue = a.isNew ? 1 : 0
                                bValue = b.isNew ? 1 : 0
                                break
                            default:
                                return 0
                        }
                        
                        if (filters.sortOrder === 'desc') {
                            return bValue - aValue
                        }
                        return aValue - bValue
                    })
                }
            }
            
            setResults(filteredResults)
            
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Lỗi khi tìm kiếm')
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    const clearSearch = () => {
        setResults([])
        setSearchTerm("")
        setError(null)
    }

    // Auto search suggestions
    const getSuggestions = async (query: string) => {
        if (!query.trim()) return []
        
        try {
            // TODO: Replace with real API call
            // const response = await fetch(`/api/search/suggestions?q=${query}`)
            // const data = await response.json()
            // return data
            
            // Using local data for suggestions
            const response = await fetch('/src/data/newproduct.json')
            const data = await response.json()
            
            const suggestions = data
                .filter((product: SearchResult) =>
                    product.name.toLowerCase().includes(query.toLowerCase())
                )
                .slice(0, 5)
                .map((product: SearchResult) => product.name)
            
            return suggestions
            
        } catch {
            return []
        }
    }

    return {
        results,
        loading,
        error,
        searchTerm,
        search,
        clearSearch,
        getSuggestions
    }
}

export const usePopularSearches = () => {
    const [popularSearches, setPopularSearches] = useState<string[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPopularSearches = async () => {
            try {
                // TODO: Replace with real API call
                // const response = await fetch('/api/search/popular')
                // const data = await response.json()
                // setPopularSearches(data)
                
                // Mock popular searches
                const mockPopularSearches = [
                    "áo thun nam",
                    "quần jean",
                    "áo polo",
                    "áo khoác",
                    "quần short",
                    "áo sơ mi",
                    "set đồ nam",
                    "phụ kiện"
                ]
                
                setPopularSearches(mockPopularSearches)
                
            } catch {
                setPopularSearches([])
            } finally {
                setLoading(false)
            }
        }

        fetchPopularSearches()
    }, [])

    return { popularSearches, loading }
}