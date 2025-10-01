import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SlashIcon, Heart, Star, Minus, Plus, ShoppingCart, CreditCard } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useProductDetail } from "../hook/useProductDetail";
import ProductTab from "./ui/producttab";
import RelatedProducts from "./ui/RelatedProducts";
import TitleCompact from "./ui/title_compact";
import Loader from "./ui/loader";
interface ProductDetail {
    id: number;
    name: string;
    price: string;
    originalPrice: string;
    discount: string;
    rating: number;
    sold: number;
    description: string;
    images: string[];
    sizes: string[];
    colors: string[];
    inStock: boolean;
    specifications: Record<string, string>;
}
export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [lp, setLp] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/src/data/productdetail.json");
                const json = await response.json();
                const productId = parseInt(id || "1");
                const foundProduct = json.find((p: ProductDetail) => p.id === productId);
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError("Không tìm thấy sản phẩm");
                }
            } catch (error) {
                setError("Lỗi khi tải dữ liệu sản phẩm");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Set default values when product loads
    useEffect(() => {
        if (product) {
            setSelectedSize(product.sizes[0]);
            setSelectedColor(product.colors[0]);
        }
    }, [product]);

    const handleQuantityChange = (type: "increase" | "decrease") => {
        if (type === "increase") {
            setQuantity((prev) => prev + 1);
        } else if (type === "decrease" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    if (loading) {
        return <Loader text="Đang tải chi tiết sản phẩm..." subtext="Vui lòng chờ trong giây lát" />;
    }

    if (error || !product) {
        return (
            <div className="container mx-auto p-4 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || "Không tìm thấy sản phẩm"}</h2>
                    <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
                    <Link to="/newproduct">
                        <Button>Quay lại trang sản phẩm</Button>
                    </Link>
                </div>
            </div>
        );
    }
    const handleAddToCart = () => {
        const cartItem = {
            id: id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images[0], // Sử dụng ảnh đầu tiên
            quantity: quantity,
            size: selectedSize,
            color: selectedColor,
        };

        console.log("Thêm vào giỏ hàng:", cartItem);
        // setLp(prev => [...prev, cartItem]);
        // localStorage.setItem("cart", JSON.stringify([...lp, cartItem]));
        // TODO: Implement add to cart logic
    };
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
                        <BreadcrumbLink href="/newproduct">Sản phẩm mới</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <span className="text-gray-500">{product.name}</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Chi tiết sản phẩm */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Gallery ảnh */}
                <div className="space-y-4">
                    {/* Ảnh chính */}
                    <div className="relative">
                        <Badge className="absolute top-4 left-4 z-10 bg-red-600 text-white text-sm px-2 py-1 rounded-md font-medium">-{product.discount}</Badge>
                        <img
                            src={product.images[selectedImageIndex]}
                            alt={`${product.name} ${selectedImageIndex + 1}`}
                            className="w-full h-[400px] sm:h-[500px] object-cover rounded-lg cursor-zoom-in"
                            loading="lazy"
                            onClick={() => window.open(product.images[selectedImageIndex], "_blank")}
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {product.images.map((image: string, index: number) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
                                className={`relative overflow-hidden rounded border-2 transition-all duration-200 ${selectedImageIndex === index ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent hover:border-gray-300"}`}
                            >
                                <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-16 sm:h-20 md:h-24 object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                ))}
                                <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-md">{product.sold} Đã Bán</Badge>
                        </div>
                    </div>

                    {/* Giá */}
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold text-red-600">{product.price}</span>
                        <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                        <Badge className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-md">Tiết kiệm {product.discount}</Badge>
                    </div>

                    {/* Mô tả */}
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    {/* Size */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Kích thước:</h3>
                        <div className="flex gap-2">
                            {product.sizes.map((size: string) => (
                                <button
                                    key={size}
                                    className={`px-4 py-2 border rounded-md transition-all ${selectedSize === size ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300 hover:border-gray-400"}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Màu sắc */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Màu sắc:</h3>
                        <div className="flex gap-2">
                            {product.colors.map((color: string) => (
                                <button
                                    key={color}
                                    className={`px-4 py-2 border rounded-md transition-all ${selectedColor === color ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300 hover:border-gray-400"}`}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Số lượng */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Số lượng:</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                                <button className="p-2 hover:bg-gray-100 transition-colors" onClick={() => handleQuantityChange("decrease")} disabled={quantity <= 1}>
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-2 border-x">{quantity}</span>
                                <button className="p-2 hover:bg-gray-100 transition-colors" onClick={() => handleQuantityChange("increase")}>
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <span className="text-sm text-gray-600">({product.inStock ? "Còn hàng" : "Hết hàng"})</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2">
                        <Button className="text-white py-4 px-6 cursor-pointer" onClick={handleAddToCart}>
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Thêm vào giỏ hàng
                        </Button>
                        <Button className="text-white py-4 px-6 cursor-pointer" onClick={() => {}}>
                            <CreditCard className="w-5 h-5 mr-2" />
                            Mua ngay
                        </Button>
                        <Button variant="outline" className="px-6 py-3 border-red-500 text-red-500 hover:bg-red-50">
                            <Heart className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs chi tiết sản phẩm */}
            <ProductTab product={product} />

            {/* Sản phẩm liên quan */}
            <TitleCompact title="Sản phẩm liên quan" subtitle="Có thể bạn sẽ thích" />
            <RelatedProducts currentProductId={parseInt(id || "1")} />
        </div>
    );
}
