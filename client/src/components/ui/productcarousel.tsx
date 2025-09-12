import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./carousel"
import { Card, CardContent, CardFooter } from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
// import { AspectRatio } from "./aspect-ratio"
import TitleCompact from "./title_compact"
import { Heart, ShoppingBag } from "lucide-react"

const products = [
    {
        id: 1,
        name: "Áo thun basic nam",
        price: "299.000₫",
        originalPrice: "399.000₫",
        discount: "-25%",
        img: "https://cdn.hstatic.net/products/1000253775/160_jean_252-1_33860bd22c1d4e80810a3350039a0a5a_large.jpg",
        rating: 4.5,
        sold: 120,
    },
    {
        id: 2,
        name: "Áo polo nam cao cấp",
        price: "399.000₫",
        originalPrice: "499.000₫",
        discount: "-20%",
        img: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
        rating: 4.8,
        sold: 89,
    },
    {
        id: 3,
        name: "Áo polo nam cao cấp",
        price: "399.000₫",
        originalPrice: "499.000₫",
        discount: "-20%",
        img: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
        rating: 4.8,
        sold: 89,
    },
    {
        id: 4,
        name: "Áo polo nam cao cấp",
        price: "399.000₫",
        originalPrice: "499.000₫",
        discount: "-20%",
        img: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
        rating: 4.8,
        sold: 89,
    },
    {
        id: 5,
        name: "Áo polo nam cao cấp",
        price: "399.000₫",
        originalPrice: "499.000₫",
        discount: "-20%",
        img: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
        rating: 4.8,
        sold: 89,
    },
    {
        id: 6,
        name: "Áo polo nam cao cấp",
        price: "399.000₫",
        originalPrice: "499.000₫",
        discount: "-20%",
        img: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
        rating: 4.8,
        sold: 89,
    },
    {
        id: 7,
        name: "Áo polo nam cao cấp",
        price: "399.000₫",
        originalPrice: "499.000₫",
        discount: "-20%",
        img: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
        rating: 4.8,
        sold: 89,
    },
    // thêm sp khác ...
]

export default function ProductCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )


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
        <div className="w-full max-w[1400px] mx-auto">

            <TitleCompact title="Sản phẩm nổi bật" subtitle="Khám phá những sản phẩm hot nhất" />

            <Carousel plugins={[plugin.current]}
                className="w-full"
                opts={{ loop: true }} >
                <CarouselContent className="-ml-1 md:-ml-2">
                    {products.map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="pl-1 md:pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                        >
                            <Card className="group overflow-hidden transition-all duration-300 rounded-none p-0 cursor-pointer">
                                <CardContent className="p-0 relative ">
                                    <Badge className="absolute top-1.5 left-1.5 z-10 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-md font-medium">
                                        {product.discount}
                                    </Badge>
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="object-cover w-full  transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {/* <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-t-lg">
                                    </AspectRatio> */}

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 scale-105">
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
                                            <Heart /> Yêu thích
                                        </Button>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex flex-col gap-1.5">
                                    <h3 className="font-medium text-l text-gray-800 min-h-[32px]">
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

                                    <Button size="sm" className="w-full h-7 text-xs rounded-none cursor-pointer mb-4">
                                        <ShoppingBag className="size-4 mx-1" /> Thêm giỏ
                                    </Button>
                                </CardFooter>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-4 bg-white/30 hover:text-blue-700 hover:bg-white/50 cursor-pointer" />
                <CarouselNext className="right-4 bg-white/30 hover:text-blue-700 hover:bg-white/50 cursor-pointer" />
            </Carousel>


        </div>
    )
}
