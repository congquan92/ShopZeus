import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import { Card, CardContent, CardFooter } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import TitleCompact from "./title_compact";
import { Heart, ShoppingBag } from "lucide-react";
import p from "../../data/newproduct.json";
import { Link } from "react-router-dom";

export default function ProductCarousel() {
    const products = p;
    const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    const [wishlist, setWishlist] = React.useState<any[]>([]);

    React.useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlist(saved);
    }, []);

    const toggleHeart = (product: any) => {
        let updated = [...wishlist];
        const exists = updated.some((item: any) => item.id === product.id);

        if (exists) {
            updated = updated.filter((item: any) => item.id !== product.id);
        } else {
            updated.push(product);
        }
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    const isFavorite = (id: number) => wishlist.some((item: any) => item.id === id);

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={i} className="text-yellow-400 text-xs">
                    ★
                </span>
            );
        }
        if (hasHalfStar) {
            stars.push(
                <span key="half" className="text-yellow-400 text-xs">
                    ☆
                </span>
            );
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <span key={`empty-${i}`} className="text-gray-300 text-xs">
                    ☆
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="w-full max-w[1400px] mx-auto">
            <TitleCompact title="Sản phẩm nổi bật" subtitle="Khám phá những sản phẩm hot nhất" />

            <Carousel plugins={[plugin.current]} className="w-full" opts={{ loop: true }}>
                <CarouselContent className="-ml-1 md:-ml-2">
                    {products.map((product) => {
                        const fav = isFavorite(product.id);
                        return (
                            <CarouselItem key={product.id} className="pl-1 md:pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                                <Card className="group overflow-hidden transition-all duration-300 rounded-none p-0 cursor-pointer">
                                    <CardContent className="p-0 relative">
                                        <Badge className="absolute top-1.5 left-1.5 z-10 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-md font-medium">{product.discount}</Badge>
                                        <img src={product.img} alt={product.name} className="object-cover w-full transition-transform duration-300 group-hover:scale-105" />

                                        {/* overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 scale-105 gap-2">
                                            <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1.5 rounded-none cursor-pointer backdrop-blur-sm">
                                                <Link to={`/product/${product.id}`}>Xem nhanh</Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className={`bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1.5 rounded-none cursor-pointer backdrop-blur-sm flex items-center gap-1 ${fav ? "text-red-600" : ""}`}
                                                onClick={() => toggleHeart(product)}
                                            >
                                                <Heart className={`size-4 ${fav ? "fill-red-600 text-red-600" : "text-gray-700"}`} />
                                                {fav ? "Đã thích" : "Yêu thích"}
                                            </Button>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex flex-col gap-1.5">
                                        <h3 className="font-medium text-l text-gray-800 min-h-[32px]">{product.name}</h3>

                                        <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1">
                                                <div className="flex">{renderStars(product.rating)}</div>
                                                <span className="text-gray-500 text-xs">({product.rating})</span>
                                            </div>
                                            <span className="text-gray-500 text-xs">Bán {product.sold}</span>
                                        </div>

                                        <div className="flex items-center gap-1.5 mb-3">
                                            <span className="text-sm font-bold text-red-600">{product.price}</span>
                                            <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                                        </div>

                                        <Button size="sm" className="w-full h-7 text-xs rounded-none cursor-pointer mb-4">
                                            <Link to={`/product/${product.id}`} className="flex items-center justify-center gap-2">
                                                <ShoppingBag className="size-4" /> Thêm giỏ
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                <CarouselPrevious className="left-4 bg-white/30 hover:text-blue-700 hover:bg-white/50 cursor-pointer" />
                <CarouselNext className="right-4 bg-white/30 hover:text-blue-700 hover:bg-white/50 cursor-pointer" />
            </Carousel>
        </div>
    );
}
