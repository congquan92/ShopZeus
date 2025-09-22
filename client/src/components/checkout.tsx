import { useState } from "react"
import { SlashIcon, CreditCard, MapPin, Truck, Shield, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "./ui/breadcrumb"
import TitleCompact from "./ui/title_compact"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { toast } from "sonner"

interface CheckoutItem {
    id: number
    name: string
    price: number
    originalPrice: number
    image: string
    quantity: number
    size: string
    color: string
}

export default function Checkout() {
    const [checkoutItems] = useState<CheckoutItem[]>([
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
        }
    ])

    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        ward: "",
        district: "",
        city: "",
        note: ""
    })

    const [paymentMethod, setPaymentMethod] = useState("cod")
    const [couponCode, setCouponCode] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)

    const shippingFee = 30000
    const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discount = couponCode === "SAVE10" ? subtotal * 0.1 : 0
    const total = subtotal - discount + shippingFee

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫'
    }

    const handleInputChange = (field: string, value: string) => {
        setShippingInfo(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmitOrder = async () => {
        // Validate form
        if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
            toast.error("Vui lòng điền đầy đủ thông tin giao hàng")
            return
        }

        setIsProcessing(true)

        try {
            // TODO: Replace with real API call
            // const response = await fetch('/api/orders', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         items: checkoutItems,
            //         shipping: shippingInfo,
            //         payment: { method: paymentMethod, total },
            //         coupon: couponCode
            //     })
            // })
            // const order = await response.json()

            // Simulate order creation
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            toast.success("Đặt hàng thành công! Mã đơn hàng: DH" + Date.now())
            
            // Redirect to order confirmation or orders page
            // navigate(`/orders/${order.id}`)
            
        } catch (error) {
            toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!")
        } finally {
            setIsProcessing(false)
        }
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
                        <BreadcrumbLink href="/cart">Giỏ hàng</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <span className="text-gray-500">Thanh toán</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/cart">
                    <Button variant="outline" size="sm">
                        <ArrowLeft size={16} className="mr-2" />
                        Quay lại giỏ hàng
                    </Button>
                </Link>
                <TitleCompact title="Thanh Toán" subtitle="Hoàn tất đơn hàng của bạn" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Shipping & Payment */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Information */}
                    <Card className="rounded-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin size={20} />
                                Thông tin giao hàng
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="fullName">Họ và tên *</Label>
                                    <Input
                                        id="fullName"
                                        value={shippingInfo.fullName}
                                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                                        placeholder="Nhập họ và tên"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Số điện thoại *</Label>
                                    <Input
                                        id="phone"
                                        value={shippingInfo.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        placeholder="Nhập số điện thoại"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={shippingInfo.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="Nhập email (tùy chọn)"
                                />
                            </div>

                            <div>
                                <Label htmlFor="address">Địa chỉ cụ thể *</Label>
                                <Input
                                    id="address"
                                    value={shippingInfo.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                    placeholder="Số nhà, tên đường"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="ward">Phường/Xã</Label>
                                    <Input
                                        id="ward"
                                        value={shippingInfo.ward}
                                        onChange={(e) => handleInputChange("ward", e.target.value)}
                                        placeholder="Chọn phường/xã"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="district">Quận/Huyện</Label>
                                    <Input
                                        id="district"
                                        value={shippingInfo.district}
                                        onChange={(e) => handleInputChange("district", e.target.value)}
                                        placeholder="Chọn quận/huyện"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="city">Tỉnh/Thành phố</Label>
                                    <Input
                                        id="city"
                                        value={shippingInfo.city}
                                        onChange={(e) => handleInputChange("city", e.target.value)}
                                        placeholder="Chọn tỉnh/thành"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="note">Ghi chú đơn hàng</Label>
                                <Input
                                    id="note"
                                    value={shippingInfo.note}
                                    onChange={(e) => handleInputChange("note", e.target.value)}
                                    placeholder="Ghi chú thêm (tùy chọn)"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Method */}
                    <Card className="rounded-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard size={20} />
                                Phương thức thanh toán
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="cod">COD</TabsTrigger>
                                    <TabsTrigger value="banking">Chuyển khoản</TabsTrigger>
                                    <TabsTrigger value="momo">Ví MoMo</TabsTrigger>
                                </TabsList>

                                <TabsContent value="cod" className="mt-4">
                                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                                        <Truck size={24} className="text-green-600" />
                                        <div>
                                            <h4 className="font-medium">Thanh toán khi nhận hàng (COD)</h4>
                                            <p className="text-sm text-gray-600">
                                                Bạn thanh toán bằng tiền mặt khi nhận được hàng
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="banking" className="mt-4">
                                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                                        <CreditCard size={24} className="text-blue-600" />
                                        <div>
                                            <h4 className="font-medium">Chuyển khoản ngân hàng</h4>
                                            <p className="text-sm text-gray-600">
                                                Chuyển khoản trước khi giao hàng
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="momo" className="mt-4">
                                    <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
                                        <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                            M
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Ví điện tử MoMo</h4>
                                            <p className="text-sm text-gray-600">
                                                Thanh toán qua ví điện tử MoMo
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Order Summary */}
                <div className="space-y-4">
                    {/* Order Items */}
                    <Card className="rounded-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Đơn hàng của bạn</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {checkoutItems.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <div className="w-16 h-16 flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                                        <div className="text-xs text-gray-500">
                                            {item.size} | {item.color} | SL: {item.quantity}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-red-600">
                                                {formatPrice(item.price)}
                                            </span>
                                            <span className="text-xs text-gray-400 line-through">
                                                {formatPrice(item.originalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Coupon */}
                    <Card className="rounded-none shadow-sm">
                        <CardContent className="p-4">
                            <div className="space-y-2">
                                <Label>Mã giảm giá</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Nhập mã giảm giá"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <Button variant="outline" size="sm">
                                        Áp dụng
                                    </Button>
                                </div>
                                {couponCode === "SAVE10" && (
                                    <p className="text-xs text-green-600">
                                        ✓ Mã "SAVE10" - Giảm 10% đơn hàng
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Total */}
                    <Card className="rounded-none shadow-sm">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span>Tạm tính:</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Phí vận chuyển:</span>
                                <span>{formatPrice(shippingFee)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Giảm giá:</span>
                                    <span>-{formatPrice(discount)}</span>
                                </div>
                            )}
                            <Separator />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Tổng cộng:</span>
                                <span className="text-red-600">{formatPrice(total)}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security & Policies */}
                    <Card className="rounded-none shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Shield size={16} className="text-green-600" />
                                <span className="text-sm font-medium">Cam kết bảo mật</span>
                            </div>
                            <ul className="text-xs text-gray-600 space-y-1">
                                <li>• Bảo mật thông tin 100%</li>
                                <li>• Miễn phí đổi trả trong 7 ngày</li>
                                <li>• Hỗ trợ 24/7</li>
                                <li>• Giao hàng toàn quốc</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Place Order Button */}
                    <Button 
                        className="w-full h-12 text-base font-medium"
                        onClick={handleSubmitOrder}
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Đang xử lý...
                            </div>
                        ) : (
                            `Đặt hàng - ${formatPrice(total)}`
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}