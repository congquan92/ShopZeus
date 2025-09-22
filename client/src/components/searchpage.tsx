import { useState } from "react"
import { SlashIcon, Search, Filter, SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "./ui/breadcrumb"
import TitleCompact from "./ui/title_compact"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { useSearch, usePopularSearches } from "../hook/useSearch"

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'newest' as 'price' | 'rating' | 'sold' | 'newest',
        sortOrder: 'desc' as 'asc' | 'desc'
    })

    const { results, loading, search, clearSearch } = useSearch()
    const { popularSearches } = usePopularSearches()

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫'
    }

    const handleSearch = (query: string) => {
        setSearchTerm(query)
        if (query.trim()) {
            search(query, {
                category: filters.category || undefined,
                minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
                maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder
            })
            setSearchParams({ q: query })
        } else {
            clearSearch()
            setSearchParams({})
        }
    }

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)
        
        if (searchTerm) {
            search(searchTerm, {
                category: newFilters.category || undefined,
                minPrice: newFilters.minPrice ? parseInt(newFilters.minPrice) : undefined,
                maxPrice: newFilters.maxPrice ? parseInt(newFilters.maxPrice) : undefined,
                sortBy: newFilters.sortBy,
                sortOrder: newFilters.sortOrder
            })
        }
    }

    const handlePopularSearch = (term: string) => {
        setSearchTerm(term)
        handleSearch(term)
    }

    // Initialize search if query param exists
    useState(() => {
        const query = searchParams.get('q')
        if (query) {
            handleSearch(query)
        }
    }, [])

    return (
        <div className="container mx-auto p-4 space-y-6">
            {/* Breadcrumb */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <span className="text-gray-500">Tìm kiếm</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Search Header */}
            <div className="space-y-4">
                <TitleCompact 
                    title="Tìm Kiếm Sản Phẩm" 
                    subtitle={searchTerm ? `Kết quả cho "${searchTerm}"` : "Khám phá sản phẩm bạn cần"} 
                />

                {/* Search Bar */}
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                            placeholder="Nhập từ khóa tìm kiếm..."
                            className="pr-10"
                        />
                        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                    </div>
                    <Button onClick={() => handleSearch(searchTerm)}>
                        Tìm kiếm
                    </Button>
                </div>

                {/* Popular Searches */}
                {!searchTerm && popularSearches.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Tìm kiếm phổ biến:</p>
                        <div className="flex flex-wrap gap-2">
                            {popularSearches.map((term, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePopularSearch(term)}
                                    className="text-xs"
                                >
                                    {term}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Results Section */}
            {searchTerm && (
                <div className="space-y-4">
                    {/* Filters & View Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2"
                            >
                                <Filter size={16} />
                                Bộ lọc
                            </Button>
                            
                            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                                <span>Hiển thị {results.length} kết quả</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Sort */}
                            <select
                                value={`${filters.sortBy}-${filters.sortOrder}`}
                                onChange={(e) => {
                                    const [sortBy, sortOrder] = e.target.value.split('-')
                                    handleFilterChange('sortBy', sortBy)
                                    handleFilterChange('sortOrder', sortOrder)
                                }}
                                className="text-sm border rounded px-2 py-1"
                            >
                                <option value="newest-desc">Mới nhất</option>
                                <option value="price-asc">Giá thấp - cao</option>
                                <option value="price-desc">Giá cao - thấp</option>
                                <option value="rating-desc">Đánh giá cao</option>
                                <option value="sold-desc">Bán chạy</option>
                            </select>

                            {/* View Mode */}
                            <div className="flex border rounded">
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className="px-2"
                                >
                                    <Grid3X3 size={16} />
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className="px-2"
                                >
                                    <LayoutList size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <Card className="rounded-none shadow-sm">
                            <CardContent className="p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Danh mục</label>
                                        <select
                                            value={filters.category}
                                            onChange={(e) => handleFilterChange('category', e.target.value)}
                                            className="w-full text-sm border rounded px-2 py-1"
                                        >
                                            <option value="">Tất cả</option>
                                            <option value="áo nam">Áo Nam</option>
                                            <option value="quần nam">Quần Nam</option>
                                            <option value="phụ kiện">Phụ Kiện</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Giá từ</label>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={filters.minPrice}
                                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                            className="text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Giá đến</label>
                                        <Input
                                            type="number"
                                            placeholder="1000000"
                                            value={filters.maxPrice}
                                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                            className="text-sm"
                                        />
                                    </div>
                                    <div className="flex items-end">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setFilters({
                                                    category: '',
                                                    minPrice: '',
                                                    maxPrice: '',
                                                    sortBy: 'newest',
                                                    sortOrder: 'desc'
                                                })
                                                if (searchTerm) handleSearch(searchTerm)
                                            }}
                                            className="w-full"
                                        >
                                            Xóa bộ lọc
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-16">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="text-gray-600">Đang tìm kiếm...</p>
                            </div>
                        </div>
                    )}

                    {/* Results */}
                    {!loading && results.length > 0 && (
                        <div className={viewMode === 'grid' 
                            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                            : "space-y-4"
                        }>
                            {results.map((product) => (
                                <Card key={product.id} className={`group p-0 shadow-sm rounded-none hover:shadow-md transition-shadow ${
                                    viewMode === 'list' ? 'flex' : ''
                                }`}>
                                    <CardContent className={`p-0 ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                                        <div className={`relative overflow-hidden ${
                                            viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : ''
                                        }`}>
                                            <Link to={`/product/${product.id}`}>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
                                                        viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                                                    }`}
                                                    loading="lazy"
                                                />
                                            </Link>
                                            
                                            {product.discount && (
                                                <div className="absolute top-2 left-2">
                                                    <Badge className="bg-red-600 text-white text-xs">
                                                        {product.discount}
                                                    </Badge>
                                                </div>
                                            )}
                                        </div>

                                        <div className={`space-y-2 ${viewMode === 'list' ? 'flex-1 p-4' : 'p-3'}`}>
                                            <Link 
                                                to={`/product/${product.id}`}
                                                className={`font-medium text-gray-900 hover:text-blue-600 transition-colors ${
                                                    viewMode === 'list' ? 'text-base line-clamp-2' : 'text-sm line-clamp-2'
                                                }`}
                                            >
                                                {product.name}
                                            </Link>

                                            <div className="flex items-center gap-2">
                                                <span className={`font-semibold text-red-600 ${
                                                    viewMode === 'list' ? 'text-lg' : 'text-base'
                                                }`}>
                                                    {formatPrice(product.price)}
                                                </span>
                                                <span className={`text-gray-400 line-through ${
                                                    viewMode === 'list' ? 'text-sm' : 'text-xs'
                                                }`}>
                                                    {formatPrice(product.originalPrice)}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <Badge className="bg-green-100 text-green-800 text-xs">
                                                    {product.sold} Đã Bán
                                                </Badge>
                                                <span className={`text-gray-500 ${
                                                    viewMode === 'list' ? 'text-sm' : 'text-xs'
                                                }`}>
                                                    ⭐ {product.rating}
                                                </span>
                                            </div>

                                            {viewMode === 'list' && (
                                                <div className="flex gap-2 pt-2">
                                                    <Link to={`/product/${product.id}`} className="flex-1">
                                                        <Button size="sm" className="w-full">
                                                            Xem chi tiết
                                                        </Button>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* No Results */}
                    {!loading && searchTerm && results.length === 0 && (
                        <div className="text-center py-16">
                            <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Không tìm thấy kết quả
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả
                            </p>
                            <Button onClick={() => handleSearch('')} variant="outline">
                                Xóa tìm kiếm
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}