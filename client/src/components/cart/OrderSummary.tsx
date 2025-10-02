import { Tag, CreditCard } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

interface OrderSummaryProps {
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
    couponCode: string;
    setCouponCode: (value: string) => void;
    applyCoupon: () => void;
    onCheckout: () => void;
    formatPrice: (price: number) => string;
}

export function OrderSummary({ subtotal, shippingFee, discount, total, couponCode, setCouponCode, applyCoupon, onCheckout, formatPrice }: OrderSummaryProps) {
    return (
        <Card className="p-0 rounded-none shadow-sm lg:sticky lg:top-4">
            <CardContent className="p-4 sm:p-6 space-y-4">
                <h3 className="text-base sm:text-lg font-semibold">Tổng kết đơn hàng</h3>
                <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                        <Tag size={16} /> Mã giảm giá
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Input placeholder="Nhập mã giảm giá" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 text-sm" />
                        <Button onClick={applyCoupon} variant="outline" size="sm" className="w-full sm:w-auto">
                            Áp dụng
                        </Button>
                    </div>
                    {discount > 0 && <p className="text-xs text-green-600">✓ Mã áp dụng thành công</p>}
                </div>
                <Separator />
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
                    <div className="flex justify-between text-base sm:text-lg font-semibold">
                        <span>Tổng cộng:</span>
                        <span className="text-red-600">{formatPrice(total)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 sm:p-6 pt-0 space-y-3">
                <Button className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium" size="lg" onClick={onCheckout}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Thanh toán ngay
                </Button>
            </CardFooter>
        </Card>
    );
}
