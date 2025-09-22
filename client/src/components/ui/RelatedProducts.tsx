import React from "react"
import  Autoplay  from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel"
import { Card, CardContent, CardFooter } from "./card"
import { Badge, Heart, ShoppingBag } from "lucide-react"
import { Button } from "./button"
import newProductData from "../../data/newproduct.json"

// Component sản phẩm liên quan
export default function RelatedProducts({ currentProductId }: { currentProductId: number }) {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )

    // Lấy sản phẩm liên quan từ newproduct.json
    const relatedProducts = newProductData
        .filter(item => item.id !== currentProductId)
        .slice(0, 8)
        .map(item => ({
            id: item.id,
            name: item.name,
            price: `${item.price.toLocaleString()}₫`,
            originalPrice: `${item.originalPrice.toLocaleString()}₫`,
            discount: item.discount === "sale" ? "-20%" : item.discount === "hot" ? "HOT" : "NEW",
            img: item.img,
            rating: item.rating,
            sold: item.sold,
        }))

    const renderStars = (rating: number) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 !== 0
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-yellow-400 text-xs">★</span>)
        }
        if (hasHalfStar) {
            stars.push(<span key="half" className="text-yellow-400 text-xs">☆</span>)
        }
        const emptyStars = 5 - Math.ceil(rating)
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="text-gray-300 text-xs">☆</span>)
        }
        return stars
    }

    return (
        <div className="w-full max-w-[1400px] mx-auto">
            

            <Carousel plugins={[plugin.current]}
                className="w-full"
                opts={{ loop: true }}>
                <CarouselContent className="-ml-1 md:-ml-2">
                    {relatedProducts.map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="pl-1 md:pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                        >
                            <Card className="group overflow-hidden transition-all duration-300 rounded-none p-0 cursor-pointer">
                                <CardContent className="p-0 relative">
                                    <Badge className="absolute top-1.5 left-1.5 z-10 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-md font-medium">
                                        {product.discount}
                                    </Badge>
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1.5 rounded-none cursor-pointer backdrop-blur-sm">
                                            Xem nhanh
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1.5 rounded-none cursor-pointer backdrop-blur-sm mx-2">
                                            <Heart className="w-4 h-4" /> Yêu thích
                                        </Button>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col gap-1.5 p-3">
                                    <h3 className="font-medium text-sm text-gray-800 min-h-[32px] line-clamp-2">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-1">
                                            <div className="flex">{renderStars(product.rating)}</div>
                                            <span className="text-gray-500 text-xs">({product.rating})</span>
                                        </div>
                                        <span className="text-gray-500 text-xs">Bán {product.sold}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 mb-3">
                                        <span className="text-sm font-bold text-red-600">
                                            {product.price}
                                        </span>
                                        <span className="text-xs text-gray-400 line-through">
                                            {product.originalPrice}
                                        </span>
                                    </div>

                                    <Button size="sm" className="w-full h-7 text-xs rounded-none cursor-pointer">
                                        <ShoppingBag className="w-4 h-4 mr-1" /> Thêm giỏ
                                    </Button>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-4 bg-white/80 hover:text-blue-700 hover:bg-white cursor-pointer" />
                <CarouselNext className="right-4 bg-white/80 hover:text-blue-700 hover:bg-white cursor-pointer" />
            </Carousel>
        </div>
    )
}