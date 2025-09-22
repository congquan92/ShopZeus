import { useState } from "react"
import { SlashIcon, Package, Truck, CheckCircle2, Clock, MapPin, Phone, Mail } from "lucide-react"
import { useParams, Link } from "react-router-dom"
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
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { useOrderById } from "../hook/useOrders"

const statusConfig = {
    confirmed: { icon: CheckCircle2, label: "Đã xác nhận", color: "bg-blue-500" },
    processing: { icon: Package, label: "Đang chuẩn bị", color: "bg-yellow-500" },
    shipped: { icon: Truck, label: "Đang giao hàng", color: "bg-orange-500" },
    delivered: { icon: CheckCircle2, label: "Đã giao hàng", color: "bg-green-500" },
    cancelled: { icon: Clock, label: "Đã hủy", color: "bg-red-500" }
}

export default function OrderTracking() {
    const { orderNumber } = useParams<{ orderNumber: string }>()
    const { order, loading, error } = useOrderById(parseInt(orderNumber || "1"))

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫'
    }

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString))
    }

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-blue-100 text-blue-800'
            case 'processing': return 'bg-yellow-100 text-yellow-800'
            case 'shipped': return 'bg-orange-100 text-orange-800'
            case 'delivered': return 'bg-green-100 text-green-800'
            case 'cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto p-4 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
                </div>
            </div>
        )
    }

    if (error || !order) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center py-16">
                    <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {error || "Không tìm thấy đơn hàng"}
                    </h3>
                    <p className="text-gray-500 mb-6">Vui lòng kiểm tra lại mã đơn hàng</p>
                    <Link to="/orders">
                        <Button>Xem tất cả đơn hàng</Button>
                    </Link>
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
                        <BreadcrumbLink href="/orders">Đơn hàng</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <span className="text-gray-500">{order.orderNumber}</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <TitleCompact 
                    title={`Đơn hàng ${order.orderNumber}`}
                    subtitle={`Đặt ngày ${formatDate(order.orderDate)}`}
                />
                <Badge className={`w-fit ${getStatusBadgeColor(order.status)}`}>
                    {statusConfig[order.status as keyof typeof statusConfig]?.label || order.status}
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Tracking & Items */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Tracking */}
                    <Card className="rounded-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck size={20} />
                                Trạng thái đơn hàng
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.tracking.map((track, index) => {
                                    const StatusIcon = statusConfig[track.status as keyof typeof statusConfig]?.icon || Clock
                                    const isCompleted = index < order.tracking.length
                                    const isActive = index === order.tracking.length - 1
                                    
                                    return (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                    isActive 
                                                        ? statusConfig[track.status as keyof typeof statusConfig]?.color || 'bg-blue-500'
                                                        : isCompleted 
                                                            ? 'bg-green-500' 
                                                            : 'bg-gray-300'
                                                } text-white`}>
                                                    <StatusIcon size={16} />
                                                </div>
                                                {index < order.tracking.length - 1 && (
                                                    <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 pb-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium">
                                                        {statusConfig[track.status as keyof typeof statusConfig]?.label || track.status}
                                                    </span>
                                                    {isActive && (
                                                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                                                            Hiện tại
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 mb-1">{track.description}</p>
                                                <p className="text-xs text-gray-500">{formatDate(track.date)}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Items */}
                    <Card className="rounded-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Sản phẩm đã đặt</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {order.items.map((item, index) => (
                                <div key={index}>
                                    <div className="flex gap-4">
                                        <div className="w-20 h-20 flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <h4 className="font-medium text-gray-900 line-clamp-2">
                                                {item.name}
                                            </h4>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span>Size: {item.size}</span>
                                                <span>Màu: {item.color}</span>
                                                <span>SL: {item.quantity}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-red-600">
                                                    {formatPrice(item.price)}
                                                </span>
                                                <span className="text-sm font-medium">
                                                    Tổng: {formatPrice(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {index < order.items.length - 1 && <Separator className="mt-4" />}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Order Info */}
                <div className="space-y-4">
                    {/* Order Summary */}
                    <Card className="rounded-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Tổng kết đơn hàng</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span>Tạm tính:</span>
                                <span>{formatPrice(order.payment.total - order.shipping.fee)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Phí vận chuyển:</span>
                                <span>{formatPrice(order.shipping.fee)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                                <span>Tổng cộng:</span>
                                <span className="text-red-600">{formatPrice(order.payment.total)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Phương thức thanh toán:</span>
                                <span className="font-medium">{order.payment.method}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Trạng thái thanh toán:</span>
                                <Badge className={`text-xs ${
                                    order.payment.status === 'paid' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {order.payment.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping Info */}
                    <Card className="rounded-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin size={18} />
                                Thông tin giao hàng
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <span className="text-sm text-gray-500">Địa chỉ giao hàng:</span>
                                <p className="font-medium">{order.shipping.address}</p>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Phương thức vận chuyển:</span>
                                <p className="font-medium">{order.shipping.method}</p>
                            </div>
                            {order.deliveryDate && (
                                <div>
                                    <span className="text-sm text-gray-500">Dự kiến giao:</span>
                                    <p className="font-medium">{formatDate(order.deliveryDate)}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Support Contact */}
                    <Card className="rounded-none shadow-sm">
                        <CardHeader>
                            <CardTitle>Cần hỗ trợ?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <Phone size={16} className="text-gray-500" />
                                <span>Hotline: 1900 1234</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Mail size={16} className="text-gray-500" />
                                <span>support@shopzeus.com</span>
                            </div>
                            <Button variant="outline" className="w-full">
                                Liên hệ hỗ trợ
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}