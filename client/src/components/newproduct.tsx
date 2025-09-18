import { useState } from "react"
import { SlashIcon, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "./ui/breadcrumb"
import TitleCompact from "./ui/title_compact"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export default function NewProduct() {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 18

    // 👉 Danh sách sản phẩm mới với thông tin đầy đủ
    const allProducts = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: `Áo thun nam cao cấp ${index + 1}`,
        price: `${(Math.random() * 500 + 100).toFixed(0)}.000₫`,
        originalPrice: `${(Math.random() * 200 + 600).toFixed(0)}.000₫`,
        discount: Math.random() > 0.5 ? "hàng mới" : "sale",
        img: `https://cdn.hstatic.net/products/1000253775/160_somi_301-2_ead36e4a16c840d5bdc2fdeedf199213_1024x1024.jpg`,
        rating: +(Math.random() * 2 + 3).toFixed(1),
        sold: Math.floor(Math.random() * 200 + 10),
        isNew: Math.random() > 0.7,
    }))

    const totalPages = Math.ceil(allProducts.length / pageSize)

    // 👉 Cắt sản phẩm theo trang
    const products = allProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    return (
        <div className="container mx-auto p-2 space-y-4">
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
                        <BreadcrumbLink href="/components">Sản phẩm mới</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Title */}
            <TitleCompact title="Sản Phẩm Mới" subtitle="Khám Phá Những Sản Phẩm Mới Nhất Của Chúng Tôi"  />

            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
                {products.map((product) => (
                    <Card key={product.id} className="group p-0 shadow-none rounded-none cursor-pointer gap-0">
                        <CardContent className="relative p-2">
                            <Badge className="absolute top-3 left-3 z-10 bg-amber-300 text-white text-xs px-1.5 py-0.5 rounded-md font-medium">
                                {product.discount}
                            </Badge>
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="object-cover w-full max-h-[250px] transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </Link>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1.5 rounded-none cursor-pointer backdrop-blur-sm">
                                    <Link to={`/product/${product.id}`}>Xem nhanh</Link>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1.5 rounded-none cursor-pointer backdrop-blur-sm mx-2">
                                    <Heart className="w-3 h-3 mr-1" /> Yêu thích
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2 p-3 items-start">
                            <div className="flex flex-col gap-1">
                                <Link to={`/product/${product.id}`}>
                                    <span className="text-sm font-medium text-gray-700 line-clamp-2 hover:text-blue-600">
                                        {product.name}
                                    </span>
                                </Link>
                                <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-none font-medium">
                                    {product.sold} Đã Bán
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between gap-2 w-full">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-xs line-through">
                                        {product.originalPrice}
                                    </span>
                                    <span className="text-lg font-semibold text-gray-900">
                                        {product.price}
                                    </span>
                                </div>
                                <Badge className="bg-red-600 text-amber-50 text-xs px-1.5 py-0.5 rounded-md font-medium">
                                    {Math.floor((parseFloat(product.originalPrice.replace(/[^0-9]/g, '')) - parseFloat(product.price.replace(/[^0-9]/g, ''))) / parseFloat(product.originalPrice.replace(/[^0-9]/g, '')) * 100)}%
                                </Badge>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="mx-auto flex w-full justify-center mt-8">
                <div className="flex flex-row items-center gap-1">
                    <button
                        className="flex h-9 items-center justify-center gap-1 px-2.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        ← Trước
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`flex h-9 w-9 items-center justify-center text-sm transition-colors ${
                                page === currentPage 
                                    ? 'bg-primary text-primary-foreground border border-input' 
                                    : 'hover:bg-accent hover:text-accent-foreground'
                            }`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        className="flex h-9 items-center justify-center gap-1 px-2.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Sau →
                    </button>
                </div>
            </div>
        </div>
    )
}
