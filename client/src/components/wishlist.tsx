import { useEffect, useMemo, useState } from "react";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

type WishItem = {
    id: number | string;
    name: string;
    img: string;
    price: string | number;
};

export default function Wishlist() {
    const [wishlist, setWishlist] = useState<WishItem[]>([]);

    // Load 1 lần khi mount
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlist(saved);
    }, []);

    // Tự tính số món
    const count = useMemo(() => wishlist.length, [wishlist]);

    const persist = (items: WishItem[]) => {
        localStorage.setItem("wishlist", JSON.stringify(items));
        setWishlist(items);
    };

    const removeItem = (id: WishItem["id"]) => {
        const next = wishlist.filter((p) => p.id !== id);
        persist(next);
    };

    const clearAll = () => {
        persist([]);
    };

    const addToCart = (item: WishItem) => {
        // Tuỳ bạn tích hợp với giỏ hàng của dự án:
        // ví dụ: localStorage cart, context Cart, hoặc gọi API.
        console.log("Thêm vào giỏ:", item);
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="rounded-none shadow-sm">
                <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                            <Heart className="size-5 md:size-6 text-rose-600" />
                            Sản phẩm yêu thích
                        </CardTitle>

                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                                {count} món
                            </Badge>
                            {count > 0 && (
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive cursor-pointer" onClick={clearAll}>
                                    <Trash2 className="size-4 mr-1" />
                                    Xoá hết
                                </Button>
                            )}
                        </div>
                    </div>

                    <Separator />
                </CardHeader>

                <CardContent>
                    {count === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <div className="inline-flex items-center justify-center rounded-full bg-muted/50 p-6 mb-4">
                                <Heart className="size-10 opacity-70" />
                            </div>
                            <p className="text-base font-medium">Chưa có sản phẩm yêu thích</p>
                            <p className="text-sm">Hãy bấm vào biểu tượng tim ở sản phẩm để lưu tại đây.</p>
                        </div>
                    ) : (
                        <ScrollArea className="pr-2">
                            {/* Grid đẹp trên desktop, list gọn trên mobile */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                                {wishlist.map((product) => (
                                    <div key={product.id} className="group relative rounded-xl border bg-card hover:shadow-md transition-all duration-200">
                                        {/* Ảnh */}
                                        <div className="relative overflow-hidden rounded-t-xl">
                                            <img src={product.img} alt={product.name} className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                                            {/* Nút xoá nổi góc phải */}
                                            <button
                                                aria-label="Xoá khỏi yêu thích"
                                                className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full bg-background/80 backdrop-blur px-2 py-2 hover:bg-background shadow"
                                                onClick={() => removeItem(product.id)}
                                            >
                                                <X className="size-4 cursor-pointer" />
                                            </button>
                                        </div>

                                        {/* Nội dung */}
                                        <div className="p-3 flex flex-col gap-2">
                                            <p className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</p>

                                            <div className="flex items-center justify-between">
                                                <span className="text-base font-semibold text-rose-600">{typeof product.price === "number" ? product.price.toLocaleString("vi-VN") + "₫" : product.price}</span>

                                                <Button size="sm" className="h-8 rounded-full cursor-pointer" onClick={() => addToCart(product)}>
                                                    <ShoppingBag className="size-4 mr-1" />
                                                    Thêm giỏ
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </CardContent>

                {count > 0 && (
                    <CardFooter className="justify-between text-sm text-muted-foreground">
                        <span>
                            Đang hiển thị <strong>{count}</strong> sản phẩm đã lưu
                        </span>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
