import { useEffect, useMemo, useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Separator } from "../../ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "../../ui/sheet";
import { Textarea } from "../../ui/textarea";
import type { CartItem } from "../CartItemRow";
import addressdata from "../../../data/address.json";

// ——————————————————————————————————————————————————————————
// Types
// ——————————————————————————————————————————————————————————
export type PaymentMethod = "vnpay" | "cod";
export type ShippingMethod = "freeship";

interface CheckoutData {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    note: string;
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethod;
}

interface CheckoutSheetProps {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    subtotal: number;
    shippingFee: number;
    discount: number;
    total: number;
    items: CartItem[];
    onSubmit: (payload: CheckoutPayload) => Promise<void> | void;
    formatPrice: (price: number) => string;
}

export interface CheckoutPayload {
    customer: {
        fullName: string;
        phone: string;
        email?: string;
    };
    shipping: {
        address: string;
        city: string; // province
        district: string; // district - ward (nếu có 3 cấp)
        note: string;
        method: ShippingMethod;
    };
    payment: {
        method: PaymentMethod;
    };
    amounts: {
        subtotal: number;
        shippingFee: number;
        discount: number;
        total: number;
    };
    items: Array<{
        id: number;
        name: string;
        quantity: number;
        price: number;
        size: string;
        color: string;
    }>;
}

// ---- Address JSON types (2 cấp hoặc 3 cấp đều support)
type WardLite = string;
type District = { name: string; wards: WardLite[] };
type Province3 = { name: string; districts: District[] };
type Province2 = { name: string; wards: WardLite[] };
type ProvinceAny = Province3 | Province2;
const hasDistricts = (p?: ProvinceAny): p is Province3 => !!p && (p as Province3).districts !== undefined;

// ——————————————————————————————————————————————————————————
// Component
// ——————————————————————————————————————————————————————————
export default function CheckoutSheet({ open, onOpenChange, subtotal, shippingFee, discount, total, items, onSubmit, formatPrice }: CheckoutSheetProps) {
    const [processing, setProcessing] = useState(false);

    const [data, setData] = useState<CheckoutData>({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        province: "",
        district: "",
        ward: "",
        note: "",
        shippingMethod: "freeship",
        paymentMethod: "vnpay",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const addressData: ProvinceAny[] = addressdata as ProvinceAny[];

    const handleChange = (key: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData((s) => ({ ...s, [key]: e.target.value }));
    };

    // ——————————————————————————————————————————————————————————
    // Helpers
    // ——————————————————————————————————————————————————————————
    const currentProvince = useMemo(() => addressData.find((x) => x.name === data.province), [addressData, data.province]);
    const districtList: District[] = hasDistricts(currentProvince) ? currentProvince!.districts : [];
    const wardList: string[] = hasDistricts(currentProvince) ? districtList.find((d) => d.name === data.district)?.wards ?? [] : (currentProvince as Province2 | undefined)?.wards ?? [];

    const isVNPhone = (s: string) => /^(0|\+84)(\d{9}|\d{10})$/.test(s.replace(/\s|-/g, ""));

    const validate = () => {
        const errs: Record<string, string> = {};

        if (data.fullName.trim().length < 2) errs.fullName = "Tên quá ngắn";
        if (!isVNPhone(data.phone)) errs.phone = "SĐT không hợp lệ (bắt đầu bằng 0 hoặc +84)";
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = "Email không hợp lệ";

        if (data.address.trim().length < 5) errs.address = "Địa chỉ quá ngắn";
        if (!data.province) errs.province = "Chọn tỉnh/thành";

        if (hasDistricts(currentProvince)) {
            if (!data.district) errs.district = "Chọn quận/huyện";
        }

        if (!data.ward) errs.ward = "Chọn phường/xã";

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        setProcessing(true);
        try {
            const payload: CheckoutPayload = {
                customer: {
                    fullName: data.fullName,
                    phone: data.phone,
                    email: data.email || undefined,
                },
                shipping: {
                    address: data.address,
                    city: data.province,
                    district: hasDistricts(addressData.find((x) => x.name === data.province)) ? `${data.district} - ${data.ward}` : data.ward,
                    note: data.note,
                    method: data.shippingMethod,
                },
                payment: {
                    method: data.paymentMethod,
                },
                amounts: { subtotal, shippingFee, discount, total },
                items: items.map(({ id, name, quantity, price, size, color }) => ({ id, name, quantity, price, size, color })),
            };

            await onSubmit(payload);

            // Reset form after successful submission
            setData({
                fullName: "",
                phone: "",
                email: "",
                address: "",
                province: "",
                district: "",
                ward: "",
                note: "",
                shippingMethod: "freeship",
                paymentMethod: "vnpay",
            });
            onOpenChange(false);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            {/* cao full viewport + chia cột */}
            <SheetContent side="right" className="w-full sm:max-w-lg p-0 h-svh flex flex-col">
                {/* Vùng CUỘN */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <SheetHeader>
                        <SheetTitle>Thanh toán</SheetTitle>
                        <SheetDescription>Điền thông tin giao hàng và xác nhận phương thức thanh toán.</SheetDescription>
                    </SheetHeader>

                    {/* GÁN id cho form để submit từ footer */}
                    <form id="checkout-form" className="space-y-6" onSubmit={handleSubmit} noValidate>
                        {/* --- Contact --- */}
                        <div className="space-y-4">
                            <h4 className="text-base font-semibold">Thông tin liên hệ</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium">Họ và tên</label>
                                    <Input placeholder="Nguyễn Văn A" value={data.fullName} onChange={handleChange("fullName")} required />
                                    {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                                </div>
                                <div>
                                    <label className="text-sm font-medium">Số điện thoại</label>
                                    <Input placeholder="0xxxxxxxxx hoặc +84" value={data.phone} onChange={handleChange("phone")} required />
                                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-sm font-medium">Email (không bắt buộc)</label>
                                    <Input placeholder="ban@vidu.com" value={data.email} onChange={handleChange("email")} />
                                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* --- Shipping --- */}
                        <div className="space-y-6">
                            <h4 className="text-base font-semibold">Địa chỉ giao hàng</h4>
                            <div>
                                <label className="text-sm font-medium">Địa chỉ</label>
                                <Input placeholder="Số nhà, đường…" value={data.address} onChange={handleChange("address")} required />
                                {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
                            </div>

                            {/* 3 dropdown: Tỉnh → (Quận) → Phường */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="text-sm font-medium">Tỉnh/Thành phố</label>
                                    <Select value={data.province} onValueChange={(v) => setData((s) => ({ ...s, province: v, district: "", ward: "" }))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn tỉnh/thành" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {addressData.map((p) => (
                                                <SelectItem key={p.name} value={p.name}>
                                                    {p.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.province && <p className="text-xs text-red-600 mt-1">{errors.province}</p>}
                                </div>

                                {hasDistricts(currentProvince) && (
                                    <div>
                                        <label className="text-sm font-medium">Quận/Huyện</label>
                                        <Select value={data.district} onValueChange={(v) => setData((s) => ({ ...s, district: v, ward: "" }))} disabled={!data.province}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={!data.province ? "Chọn tỉnh trước" : "Chọn quận/huyện"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {districtList.map((d) => (
                                                    <SelectItem key={d.name} value={d.name}>
                                                        {d.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.district && <p className="text-xs text-red-600 mt-1">{errors.district}</p>}
                                    </div>
                                )}

                                <div>
                                    <label className="text-sm font-medium">Phường/Xã</label>
                                    <Select value={data.ward} onValueChange={(v) => setData((s) => ({ ...s, ward: v }))} disabled={!data.province || (hasDistricts(currentProvince) && !data.district)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={!data.province ? "Chọn tỉnh trước" : hasDistricts(currentProvince) && !data.district ? "Chọn quận trước" : "Chọn phường/xã"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {wardList.map((w) => (
                                                <SelectItem key={w} value={w}>
                                                    {w}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.ward && <p className="text-xs text-red-600 mt-1">{errors.ward}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Ghi chú (tuỳ chọn)</label>
                                <Textarea placeholder="Giao giờ hành chính…" value={data.note} onChange={handleChange("note")} />
                            </div>
                        </div>

                        <Separator />

                        {/* --- Payment --- */}
                        <div className="space-y-3">
                            <h4 className="text-base font-semibold">Hình thức thanh toán</h4>

                            <RadioGroup value={data.paymentMethod} onValueChange={(v: PaymentMethod) => setData((s) => ({ ...s, paymentMethod: v }))} className="grid grid-cols-1 gap-2">
                                <div className="flex items-start gap-3 rounded-md border p-3">
                                    <RadioGroupItem value="vnpay" id="pay-vnpay" />
                                    <label htmlFor="pay-vnpay" className="cursor-pointer">
                                        <div className="font-medium inline-flex items-center gap-2">Thanh toán VNPay (dữ liệu mẫu)</div>
                                        <ul className="text-xs text-muted-foreground list-disc ml-5 mt-1 space-y-0.5">
                                            <li>Tạo QR VNPay và xác nhận thủ công (chưa tích hợp).</li>
                                            <li>Freeship mọi đơn hàng.</li>
                                        </ul>
                                    </label>
                                </div>
                                <div className="flex items-start gap-3 rounded-md border p-3">
                                    <RadioGroupItem value="cod" id="pay-cod" />
                                    <label htmlFor="pay-cod" className="cursor-pointer">
                                        <div className="font-medium inline-flex items-center gap-2">Thanh toán trực tiếp (COD)</div>
                                        <ul className="text-xs text-muted-foreground list-disc ml-5 mt-1 space-y-0.5">
                                            <li>Khách được kiểm tra hàng trước khi nhận.</li>
                                            <li>Freeship mọi đơn hàng.</li>
                                        </ul>
                                    </label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* --- Recap --- */}
                        <div className="space-y-2 rounded-md border p-3 text-sm">
                            <div className="flex justify-between">
                                <span>Tạm tính</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Phí vận chuyển</span>
                                <span>{formatPrice(shippingFee)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Giảm giá</span>
                                    <span>-{formatPrice(discount)}</span>
                                </div>
                            )}
                            <Separator />
                            <div className="flex justify-between font-semibold">
                                <span>Tổng cộng</span>
                                <span className="text-red-600">{formatPrice(total)}</span>
                            </div>
                        </div>
                    </form>
                </div>

                {/* FOOTER CỐ ĐỊNH (không cuộn) */}
                <SheetFooter className="gap-3 p-4 border-t bg-background">
                    <div className="flex flex-col items-center justify-center gap-3 w-full">
                        <Button type="submit" form="checkout-form" className="inline-flex items-center gap-2 w-full" disabled={processing}>
                            {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                            Xác nhận thanh toán
                        </Button>

                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full">
                            Quay lại giỏ hàng
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
