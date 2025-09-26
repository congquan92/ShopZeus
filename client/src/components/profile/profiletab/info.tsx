import { Label } from "@radix-ui/react-dropdown-menu";
import { User, Edit2, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hook/context/AuthContext";
import { toast } from "sonner";
import Loader from "../../ui/loader";

interface UserProfile {
    id: number;
    userName: string;
    fullName: string;
    gender: "MALE" | "FEMALE" | "BOTH";
    dateOfBirth: string;
    email: string;
    phone: string;
}
export default function Info() {
    const { user, refreshUser } = useAuth();
    // const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<UserProfile>();

    // đồng bộ profile với user
    useEffect(() => {
        if (user) {
            setProfile({
                id: user.id,
                userName: user.userName,
                fullName: user.fullName || "",
                gender: user.gender || "BOTH",
                dateOfBirth: user.dateOfBirth || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        }

        // console.log("ok");
    }, [user]);

    const handleUpdateProfile = async () => {
        if (!profile) return;
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/user/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: profile.id,
                    fullName: profile.fullName,
                    dateOfBirth: profile.dateOfBirth,
                    gender: profile.gender,
                    email: profile.email,
                    phone: profile.phone,
                    roles: [1],
                }),
            });

            if (response.ok) {
                // setProfile(profile);
                refreshUser();
                toast.success("Cập nhật thông tin thành công! ", {
                    position: "top-center",
                });
                setIsEditing(false);
            } else {
                console.error("Cập nhật thất bại");
                toast.error("Cập nhật thông tin thất bại!", { position: "top-center" });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    // if (loading) {
    //     return <Loader text="Đang tải..." />;
    // }

    if (!user) {
        return <div className="flex items-center justify-center mt-3">Vui lòng đăng nhập để xem thông tin cá nhân</div>;
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="size-5" /> Thông Tin Cá Nhân
                    </CardTitle>
                    <CardAction>
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                            <Edit2 className="size-4" /> {isEditing ? "Hủy" : "Chỉnh sửa"}
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent className="space-y-4">
                    {profile && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Họ và tên</Label>
                                <Input
                                    id="fullName"
                                    value={profile.fullName}
                                    onChange={(e) => setProfile((prev: any) => ({ ...prev, fullName: e.target.value }))}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="userName">Tên đăng nhập</Label>
                                <Input id="userName" value={profile.userName} disabled className="bg-gray-50" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="size-4" /> Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile((prev: any) => ({ ...prev, email: e.target.value }))}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-2">
                                    <Phone className="size-4" /> Số điện thoại
                                </Label>
                                <Input
                                    id="phone"
                                    value={profile.phone}
                                    onChange={(e) => setProfile((prev: any) => ({ ...prev, phone: e.target.value }))}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">Giới tính</Label>
                                <select
                                    id="gender"
                                    value={profile.gender}
                                    onChange={(e) =>
                                        setProfile((prev: any) => ({
                                            ...prev,
                                            gender: e.target.value as "MALE" | "FEMALE" | "OTHER",
                                        }))
                                    }
                                    disabled={!isEditing}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                                >
                                    <option value="MALE">Nam</option>
                                    <option value="FEMALE">Nữ</option>
                                    <option value="BOTH">BETA</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                                    <Calendar className="size-4" /> Ngày sinh
                                </Label>
                                <Input
                                    id="dateOfBirth"
                                    type="date"
                                    value={profile.dateOfBirth}
                                    onChange={(e) => setProfile((prev: any) => ({ ...prev, dateOfBirth: e.target.value }))}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    )}

                    {isEditing && (
                        <div className="flex gap-2 pt-4">
                            <Button onClick={handleUpdateProfile}>Lưu thay đổi</Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Hủy
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
