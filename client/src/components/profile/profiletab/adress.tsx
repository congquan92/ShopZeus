import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../ui/select";
import { useEffect, useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "../../ui/badge";
import { useAuth } from "../../../hook/context/AuthContext";
import addressData from "../../../data/address.json";
import Loader from "../../ui/loader";

interface Province {
    name: string;
    wards: string[];
}

interface AddressItem {
    id: number;
    name: string;
    phone: string;
    address: string;
    province: string;
    ward: string;
    isDefault?: boolean;
}

export default function Address() {
    const { user } = useAuth();
    const provinces: Province[] = addressData;
    const [wards, setWards] = useState<string[]>([]);
    const [isAddingAddress, setIsAddingAddress] = useState(false);

    const [province, setProvince] = useState("");
    const [ward, setWard] = useState("");
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [addresses, setAddresses] = useState<AddressItem[]>([]);

    const selectedProvince = provinces.find((p) => p.name === province);

    useEffect(() => {
        if (province && selectedProvince) {
            setWards(selectedProvince.wards || []);
            setWard("");
        }
    }, [province, selectedProvince]);

    const handleAddAddress = () => {
        if (!name || !phone || !address || !province || !ward) {
            toast.warning("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        const newAddress: AddressItem = {
            id: Date.now(),
            name,
            phone,
            address,
            province,
            ward,
            isDefault: addresses.length === 0, // mặc định nếu là địa chỉ đầu tiên
        };

        setAddresses((prev) => [...prev, newAddress]);
        setIsAddingAddress(false);
        console.log(addresses);

        // reset form
        setName("");
        setPhone("");
        setAddress("");
        setProvince("");
        setWard("");
    };

    const handleDeleteAddress = (id: number) => {
        setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    };

    const handleSetDefault = (id: number) => {
        setAddresses((prev) =>
            prev.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            }))
        );
        toast.success("Đã đặt địa chỉ mặc định!");
    };

    if (!user) {
        return <Loader text="Đang tải..." />;
    }

    return (
        <div>
            <Card className="shadow-lg rounded-none">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" /> Sổ Địa Chỉ
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setIsAddingAddress(true)}>
                            <Plus className="w-4 h-4" /> Thêm địa chỉ
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Form thêm địa chỉ */}
                    {isAddingAddress && (
                        <Card className="border-dashed">
                            <CardHeader>
                                <CardTitle className="text-lg">Thêm Địa Chỉ Mới</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Họ và tên</Label>
                                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập họ và tên" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Số điện thoại</Label>
                                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nhập số điện thoại" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>Địa chỉ cụ thể</Label>
                                        <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Số nhà, tên đường" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tỉnh/Thành phố</Label>
                                        <Select value={province} onValueChange={setProvince}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Chọn tỉnh/thành phố" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {provinces.map((p) => (
                                                    <SelectItem key={p.name} value={p.name}>
                                                        {p.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phường/Xã</Label>
                                        <Select value={ward} onValueChange={setWard} disabled={!province}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Chọn phường/xã" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {wards.map((w) => (
                                                    <SelectItem key={w} value={w}>
                                                        {w}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <Button onClick={handleAddAddress}>Thêm địa chỉ</Button>
                                    <Button variant="outline" onClick={() => setIsAddingAddress(false)}>
                                        Hủy
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Danh sách địa chỉ */}
                    {addresses.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold">Danh sách địa chỉ</h3>
                            {addresses.map((addr) => (
                                <Card key={addr.id} className={`p-4 border ${addr.isDefault ? "border-blue-500" : "border-gray-200"}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm space-y-1">
                                            <p className="font-medium flex items-center gap-2">
                                                {addr.name} - {addr.phone}
                                                {addr.isDefault && <Badge className="bg-blue-500 text-white">Mặc định</Badge>}
                                            </p>
                                            <p>
                                                {addr.address}, {addr.ward}, {addr.province}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            {!addr.isDefault && (
                                                <Button variant="outline" size="sm" onClick={() => handleSetDefault(addr.id)}>
                                                    Đặt mặc định
                                                </Button>
                                            )}
                                            <Button variant="outline" size="icon" className="text-red-500 border-red-300 hover:bg-red-50" onClick={() => handleDeleteAddress(addr.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
