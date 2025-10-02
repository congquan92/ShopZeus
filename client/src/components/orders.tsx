import { Package, Badge } from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { useState } from "react";
interface Order {
    id: number;
    orderNumber: string;
    date: string;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    total: number;
    items: Array<{
        id: number;
        name: string;
        image: string;
        price: number;
        quantity: number;
    }>;
}
export default function Orders() {
    //sample data
    const [orders] = useState<Order[]>([
        {
            id: 1,
            orderNumber: "DH001",
            date: "2025-09-20",
            status: "delivered",
            total: 850000,
            items: [
                {
                    id: 1,
                    name: "iPhone 15 Pro",
                    image: "https://cdn.hstatic.net/products/1000253775/160_ao_polo_241-1_4516b05b83f64514af9e912b42105ecd_large.jpg",
                    price: 800000,
                    quantity: 1,
                },
            ],
        },
        {
            id: 2,
            orderNumber: "DH002",
            date: "2025-09-18",
            status: "processing",
            total: 450000,
            items: [
                {
                    id: 2,
                    name: "Samsung Galaxy Watch",
                    image: "https://cdn.hstatic.net/products/1000253775/160_ao_polo_241-1_4516b05b83f64514af9e912b42105ecd_large.jpg",
                    price: 400000,
                    quantity: 1,
                },
            ],
        },
    ]);

    const getStatusBadge = (status: Order["status"]) => {
        const statusConfig = {
            pending: { variant: "outline" as const, text: "Chờ xác nhận" },
            processing: { variant: "secondary" as const, text: "Đang xử lý" },
            shipped: { variant: "default" as const, text: "Đang giao" },
            delivered: { variant: "secondary" as const, text: "Đã giao" },
            cancelled: { variant: "destructive" as const, text: "Đã hủy" },
        };
        return statusConfig[status];
    };
    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="size-5" />
                        Lịch Sử Đơn Hàng
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Card key={order.id} className="border-l-4 border-l-primary">
                                <CardContent className="pt-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-semibold">Đơn hàng #{order.orderNumber}</h4>
                                            <p className="text-sm text-gray-600">Ngày đặt: {order.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <Badge {...getStatusBadge(order.status)} />
                                            <p className="text-lg font-semibold mt-1">{order.total.toLocaleString("vi-VN")}đ</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                                <div className="flex-1">
                                                    <h5 className="font-medium">{item.name}</h5>
                                                    <p className="text-sm text-gray-600">
                                                        Số lượng: {item.quantity} | Giá: {item.price.toLocaleString("vi-VN")}đ
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-2 mt-4">
                                        <Button variant="outline" size="sm">
                                            Xem chi tiết
                                        </Button>
                                        {order.status === "delivered" && (
                                            <Button variant="outline" size="sm">
                                                Đánh giá
                                            </Button>
                                        )}
                                        {order.status === "pending" && (
                                            <Button variant="destructive" size="sm">
                                                Hủy đơn
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
