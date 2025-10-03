import TitleCompact from "./title_compact";
import { Card, CardContent, CardFooter } from "./card";
import { Button } from "./button";
// import { AspectRatio } from "./aspect-ratio"
import { Badge } from "./badge";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

const pr = [
    {
        id: 9,
        name: "Áo polo nam cao cấp",
        price: "399.000₫",
        originalPrice: "499.000₫",
        discount: "hàng mới",
        img: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
        rating: 4.8,
        sold: 89,
    },
    {
        id: 10,
        name: "Áo polo nam cao cấp",
        price: "399.000₫",
        originalPrice: "499.000₫",
        discount: "hàng mới",
        img: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
        rating: 4.8,
        sold: 89,
    },
];

export default function Products() {
    const [products, setProducts] = useState(pr);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_LOCAL_API}/product/list`, {
                    method: "GET",
                });
                const data = await res.json();
                setProducts((prev) => [
                    ...prev,
                    ...data.data.data.map((i) => {
                        return {
                            id: i.id,
                            name: i.name,
                            price: i.listPrice,
                            originalPrice: i.salePrice,
                            discount: "New",
                            img: i.urlCoverImage,
                            rating: i.avgRating,
                            sold: i.soldQuantity,
                        };
                    }),
                ]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <TitleCompact title="Sản Phẩm Mới" subtitle="Khám Phá Những Sản Phẩm Mới Nhất Của Chúng Tôi" />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                {products.map((product) => (
                    <Card key={product.id} className="group p-0 shadow-none rounded-none cursor-pointer gap-0">
                        <CardContent className=" relative p-2">
                            <Badge className="absolute top-3 left-3 z-10 bg-amber-300 text-white text-xs px-1.5 py-0.5 rounded-md font-medium">{product.discount}</Badge>
                            <img src={product.img} alt={product.name} className=" object-cover w-full max-h-[250px] transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                            {/* <AspectRatio className="" ratio={1 / 1}> */}
                            {/* </AspectRatio> */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1.5 rounded-none cursor-pointer backdrop-blur-sm">
                                    Xem nhanh
                                </Button>
                                <Button size="sm" variant="secondary" className="bg-white/90 text-gray-900 hover:bg-white text-xs px-3 py-1.5 rounded-none cursor-pointer backdrop-blur-sm mx-2">
                                    <Heart /> Yêu thích
                                </Button>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2 p-3 items-start">
                            <div className="flex flex-col gap-1">
                                <span className="text-l font-medium text-gray-700 line-clamp-2">{product.name}</span>

                                <Badge className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-none font-medium">{product.sold} Đã Bán</Badge>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-gray-500 text-xs line-through">{product.originalPrice}</span>
                                <span className="text-lg font-semibold text-gray-900">{product.price}</span>
                                <Badge className="bg-red-600 text-amber-50 text-xs px-1.5 py-0.5 rounded-md font-medium">20%</Badge>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
