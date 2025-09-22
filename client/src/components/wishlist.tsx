import { SlashIcon, Heart, X, ShoppingCart, Star } from "lucide-react"
import { Link } from "react-router-dom"
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
import { Badge } from "./ui/badge"
import { useWishlist } from "../hook/useWishlist"
import { toast } from "sonner"

export default function Wishlist() {
    // Assuming user ID = 1 for demo
    const { wishlist, loading, error, removeFromWishlist, isInWishlist } = useWishlist(1)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫'
    }

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(new Date(dateString))
    }

    const handleRemoveFromWishlist = async (itemId: number, productName: string) => {
        const result = await removeFromWishlist(itemId)
        if (result.success) {
            toast.success(`Đã xóa "${productName}" khỏi danh sách yêu thích`)
        } else {
            toast.error(result.message)
        }
    }

    const handleAddToCart = (item: any) => {
        // TODO: Implement add to cart logic
        // const cartItem = {
        //     id: item.productId,
        //     name: item.name,
        //     price: item.price,
        //     originalPrice: item.originalPrice,
        //     image: item.image,
        //     quantity: 1,
        //     size: "M", // Default size
        //     color: "Mặc định" // Default color
        // }
        
        toast.success(`Đã thêm "${item.name}" vào giỏ hàng`)
    }

    if (loading) {
        return (
            <div className="container mx-auto p-4 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải danh sách yêu thích...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center py-16">
                    <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Lỗi khi tải dữ liệu</h3>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <Button onClick={() => window.location.reload()}>
                        Thử lại
                    </Button>
                </div>
            </div>
        )
    }

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
                        <span className="text-gray-500">Danh sách yêu thích</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Header */}
            <TitleCompact 
                title="Danh Sách Yêu Thích" 
                subtitle={`${wishlist.length} sản phẩm bạn đã lưu`} 
            />

            {wishlist.length === 0 ? (
                <div className="text-center py-16">
                    <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Chưa có sản phẩm yêu thích
                    </h3>
                    <p className="text-gray-500 mb-6">
                        Khám phá và thêm những sản phẩm bạn thích vào danh sách này
                    </p>
                    <Link to="/newproduct">
                        <Button>
                            <Heart className="mr-2" size={16} />
                            Khám phá sản phẩm
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <Card key={item.id} className="group p-0 shadow-sm rounded-none hover:shadow-md transition-shadow">
                            <CardContent className="p-0">
                                {/* Product Image */}
                                <div className="relative overflow-hidden">
                                    <Link to={`/product/${item.productId}`}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </Link>
                                    
                                    {/* Actions overlay */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="bg-white/90 text-gray-900 hover:bg-white backdrop-blur-sm"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            <ShoppingCart size={16} className="mr-1" />
                                            Thêm vào giỏ
                                        </Button>
                                    </div>

                                    {/* Remove button */}
                                    <button
                                        className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors"
                                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                                        aria-label="Xóa khỏi yêu thích"
                                    >
                                        <X size={16} className="text-gray-600" />
                                    </button>

                                    {/* Stock status */}
                                    {!item.inStock && (
                                        <div className="absolute top-2 left-2">
                                            <Badge className="bg-red-600 text-white">
                                                Hết hàng
                                            </Badge>
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-4 space-y-3">
                                    <div>
                                        <Link 
                                            to={`/product/${item.productId}`}
                                            className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-semibold text-red-600">
                                            {formatPrice(item.price)}
                                        </span>
                                        <span className="text-sm text-gray-400 line-through">
                                            {formatPrice(item.originalPrice)}
                                        </span>
                                    </div>

                                    {/* Discount badge */}
                                    <div className="flex items-center justify-between">
                                        <Badge className="bg-red-100 text-red-800 text-xs">
                                            Tiết kiệm {Math.round((1 - item.price / item.originalPrice) * 100)}%
                                        </Badge>
                                        <span className="text-xs text-gray-500">
                                            Thêm {formatDate(item.addedDate)}
                                        </span>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            className="flex-1 h-9"
                                            onClick={() => handleAddToCart(item)}
                                            disabled={!item.inStock}
                                        >
                                            <ShoppingCart size={16} className="mr-2" />
                                            {item.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                                        </Button>
                                        <Link to={`/product/${item.productId}`}>
                                            <Button variant="outline" size="sm" className="h-9 px-3">
                                                Xem chi tiết
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Quick Actions */}
            {wishlist.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t">
                    <p className="text-sm text-gray-600">
                        Có {wishlist.length} sản phẩm trong danh sách yêu thích
                    </p>
                    <div className="flex gap-2">
                        <Link to="/newproduct">
                            <Button variant="outline">
                                Tiếp tục mua sắm
                            </Button>
                        </Link>
                        <Link to="/cart">
                            <Button>
                                <ShoppingCart size={16} className="mr-2" />
                                Xem giỏ hàng
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}