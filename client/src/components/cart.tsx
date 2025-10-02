import { useMemo, useState } from "react";
import { SlashIcon, ShoppingBag } from "lucide-react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import TitleCompact from "../components/ui/title_compact";
import { toast } from "sonner";

import { CartItemRow, type CartItem } from "../components/cart/CartItemRow";
import { OrderSummary } from "../components/cart/OrderSummary";
import CheckoutSheet, { type CheckoutPayload } from "./cart/checkout/CheckoutSheet";

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Áo polo nam cao cấp",
            price: 399000,
            originalPrice: 499000,
            image: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
            quantity: 2,
            size: "L",
            color: "Xanh navy",
        },
        {
            id: 2,
            name: "Áo thun basic nam",
            price: 299000,
            originalPrice: 399000,
            image: "https://cdn.hstatic.net/products/1000253775/160_jean_252-1_33860bd22c1d4e80810a3350039a0a5a_large.jpg",
            quantity: 1,
            size: "M",
            color: "Trắng",
        },
        {
            id: 3,
            name: "Quần jean nam slim fit",
            price: 599000,
            originalPrice: 799000,
            image: "https://cdn.hstatic.net/products/1000253775/160_short_jean_263-1_3bce215b217d4649bb56241671a2bb77_large.jpg",
            quantity: 1,
            size: "32",
            color: "Xanh đen",
        },
    ]);

    const [couponCode, setCouponCode] = useState("");
    const [openCheckout, setOpenCheckout] = useState(false);

    const shippingFee = 30000;
    const couponDiscount = 0.1;

    const updateQuantity = (id: number, change: number) => {
        setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)));
    };

    const removeItem = (id: number) => {
        setCartItems((items) => items.filter((item) => item.id !== id));
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    };

    const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
    const discount = couponCode === "SAVE10" ? subtotal * couponDiscount : 0;
    const total = subtotal - discount + shippingFee;

    const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "₫";

    const applyCoupon = () => {
        if (couponCode === "SAVE10") {
            toast.success("Áp dụng mã giảm giá thành công!");
        } else {
            toast.error("Mã giảm giá không hợp lệ");
        }
    };

    const handleSubmitCheckout = async (payload: CheckoutPayload) => {
        // TODO: call backend
        console.log("Checkout payload:", payload);
        if (payload.payment.method === "ewallet") {
            toast.success("Đang chuyển đến cổng thanh toán điện tử…");
        } else {
            toast.success("Đặt hàng thành công! Thanh toán khi nhận hàng.");
        }
    };

    return (
        <div className="container mx-auto p-2 sm:p-4 space-y-4">
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

            <TitleCompact title="Giỏ Hàng Của Bạn" subtitle={`${cartItems.length} sản phẩm trong giỏ hàng`} />

            {cartItems.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                    <ShoppingBag className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4" />
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Giỏ hàng trống</h3>
                    <p className="text-sm sm:text-base text-gray-500 mb-6 px-4">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                    <Button asChild>
                        <a href="/">Tiếp tục mua sắm</a>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                    <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                        {cartItems.map((item) => (
                            <CartItemRow key={item.id} item={item} onQtyChange={updateQuantity} onRemove={removeItem} formatPrice={formatPrice} />
                        ))}
                    </div>

                    <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
                        <OrderSummary
                            subtotal={subtotal}
                            shippingFee={shippingFee}
                            discount={discount}
                            total={total}
                            couponCode={couponCode}
                            setCouponCode={setCouponCode}
                            applyCoupon={applyCoupon}
                            onCheckout={() => setOpenCheckout(true)}
                            formatPrice={formatPrice}
                        />

                        <Card className="p-0 rounded-none shadow-sm">
                            <CardContent className="p-3 sm:p-4">
                                <h4 className="font-medium mb-2 text-sm sm:text-base">Thông tin vận chuyển</h4>
                                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                                    <li>• Miễn phí vận chuyển cho đơn từ 500k</li>
                                    <li>• Giao hàng trong 2-3 ngày làm việc</li>
                                    <li>• Đổi trả miễn phí trong 7 ngày</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}

            <CheckoutSheet open={openCheckout} onOpenChange={setOpenCheckout} subtotal={subtotal} shippingFee={shippingFee} discount={discount} total={total} items={cartItems} onSubmit={handleSubmitCheckout} formatPrice={formatPrice} />
        </div>
    );
}
