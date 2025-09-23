

import { useEffect, useState } from "react"
import { SlashIcon, Plus, Minus, Trash2, ShoppingBag, Tag, CreditCard } from "lucide-react"
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
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { toast } from "sonner"

interface CartItem {
    id: number
    name: string
    price: number
    originalPrice: number
    image: string
    quantity: number
    size: string
    color: string
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Áo polo nam cao cấp",
            price: 399000,
            originalPrice: 499000,
            image: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
            quantity: 2,
            size: "L",
            color: "Xanh navy"
        },
        {
            id: 2,
            name: "Áo thun basic nam",
            price: 299000,
            originalPrice: 399000,
            image: "https://cdn.hstatic.net/products/1000253775/160_jean_252-1_33860bd22c1d4e80810a3350039a0a5a_large.jpg",
            quantity: 1,
            size: "M",
            color: "Trắng"
        },
        {
            id: 3,
            name: "Quần jean nam slim fit",
            price: 599000,
            originalPrice: 799000,
            image: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
            quantity: 1,
            size: "32",
            color: "Xanh đen"
        }
    ])

    const [couponCode, setCouponCode] = useState("")
    const shippingFee = 30000
    const couponDiscount = 0.1 // 10% discount
    useEffect(() => {
       const t = localStorage.getItem("cart");
       console.log(t);
       setCartItems(t ? JSON.parse(t) : []);
    }, [])
    const updateQuantity = (id: number, change: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        )
    }

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id))
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng")
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discount = couponCode === "SAVE10" ? subtotal * couponDiscount : 0
    const total = subtotal - discount + shippingFee

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫'
    }

    const applyCoupon = () => {
        if (couponCode === "SAVE10") {
            toast.success("Áp dụng mã giảm giá thành công!")
        } else {
            toast.error("Mã giảm giá không hợp lệ")
        }
    }

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
                        <BreadcrumbLink href="/cart">Giỏ hàng</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Title */}
            <TitleCompact title="Giỏ Hàng Của Bạn"  subtitle={`${cartItems.length} sản phẩm trong giỏ hàng`} />

            {cartItems.length === 0 ? (
                <div className="text-center py-16">
                    <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Giỏ hàng trống</h3>
                    <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                    <Button asChild>
                        <a href="/">Tiếp tục mua sắm</a>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <Card key={item.id} className="p-0 rounded-none shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="w-24 h-24 flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 space-y-2">
                                            <h3 className="font-medium text-gray-900 line-clamp-2">
                                                {item.name}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>Size: {item.size}</span>
                                                <span>Màu: {item.color}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-red-600">
                                                    {formatPrice(item.price)}
                                                </span>
                                                <span className="text-sm text-gray-400 line-through">
                                                    {formatPrice(item.originalPrice)}
                                                </span>
                                                <Badge className="bg-red-100 text-red-800 text-xs">
                                                    Giảm {Math.round((1 - item.price / item.originalPrice) * 100)}%
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Quantity & Remove */}
                                        <div className="flex flex-col items-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-red-500 p-1"
                                            >
                                                <Trash2 size={16} />
                                            </Button>

                                            <div className="flex items-center border rounded-md">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="px-2 py-1 h-8"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </Button>
                                                <span className="px-3 py-1 text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="px-2 py-1 h-8"
                                                >
                                                    <Plus size={14} />
                                                </Button>
                                            </div>

                                            <div className="text-sm font-semibold text-gray-900">
                                                {formatPrice(item.price * item.quantity)}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-4">
                        <Card className="p-0 rounded-none shadow-sm sticky top-4">
                            <CardContent className="p-6 space-y-4">
                                <h3 className="text-lg font-semibold">Tổng kết đơn hàng</h3>

                                {/* Coupon */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        <Tag size={16} />
                                        Mã giảm giá
                                    </label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Nhập mã giảm giá"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button onClick={applyCoupon} variant="outline" size="sm">
                                            Áp dụng
                                        </Button>
                                    </div>
                                    {couponCode === "SAVE10" && (
                                        <p className="text-xs text-green-600">
                                            ✓ Mã "SAVE10" - Giảm 10% đơn hàng
                                        </p>
                                    )}
                                </div>

                                <Separator />

                                {/* Price Breakdown */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Tạm tính:</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Phí vận chuyển:</span>
                                        <span>{formatPrice(shippingFee)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Giảm giá:</span>
                                            <span>-{formatPrice(discount)}</span>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Tổng cộng:</span>
                                        <span className="text-red-600">{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-0 space-y-3">
                                <Button className="w-full h-12 text-base font-medium" size="lg">
                                    <CreditCard className="mr-2" />
                                    Thanh toán ngay
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Shipping Info */}
                        <Card className="p-0 rounded-none shadow-sm">
                            <CardContent className="p-4">
                                <h4 className="font-medium mb-2">Thông tin vận chuyển</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Miễn phí vận chuyển cho đơn từ 500k</li>
                                    <li>• Giao hàng trong 2-3 ngày làm việc</li>
                                    <li>• Đổi trả miễn phí trong 7 ngày</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}
