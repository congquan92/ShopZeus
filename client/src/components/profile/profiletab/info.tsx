import { useEffect, useMemo, useRef, useState } from "react";
import { User, Edit2, Mail, Phone, Calendar, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { useAuth } from "../../../hook/context/AuthContext";
import { toast } from "sonner";

import { Button } from "../../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../../ui/select";
import Loader from "../../ui/loader";

interface UserProfile {
    id: number;
    userName: string;
    fullName: string;
    gender: "MALE" | "FEMALE" | "BOTH";
    dateOfBirth: string;
    email: string;
    userRank: string; // "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond"
    avatar?: string; // URL hiện tại đã lưu ở backend
    phone: string;
    totalSpent?: number;
}

const TIER_BOUNDS: Record<string, { min: number; max?: number }> = {
    Bronze: { min: 0, max: 999 },
    Silver: { min: 1000, max: 2999 },
    Gold: { min: 3000, max: 6999 },
    Platinum: { min: 7000, max: 14999 },
    Diamond: { min: 15000 },
};

const TIERS = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"] as const;

export default function Info() {
    const { user, refreshUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [profile, setProfile] = useState<UserProfile>();

    // Ảnh mới (chỉ lưu cục bộ để preview; CHƯA upload)
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // đồng bộ profile với user khi user thay đổi
    useEffect(() => {
        if (user) {
            setProfile({
                id: user.id,
                userName: user.userName,
                fullName: user.fullName || "",
                gender: (user.gender as UserProfile["gender"]) || "BOTH",
                dateOfBirth: user.dateOfBirth || "",
                email: user.email || "",
                phone: user.phone || "",
                userRank: user.userRank || "Bronze",
                avatar: user.avatar || "https://i.pinimg.com/736x/66/18/d6/6618d62c3a835e38e9dfff3cc3e80dae.jpg",
                totalSpent: user.totalSpent || 0,
            });
            // reset file preview khi đồng bộ từ server
            // tắt edit nếu vừa refresh
            setAvatarFile(null);
            setIsEditing(false);
        }
    }, [user]);

    // Tạo preview: ưu tiên blob của ảnh mới, nếu không thì dùng URL đã lưu trong profile.avatar
    const avatarPreview = useMemo(() => {
        if (avatarFile) return URL.createObjectURL(avatarFile);
        // console.log("Using existing avatar URL:", profile?.avatar);
        return profile?.avatar ?? "";
    }, [avatarFile, profile?.avatar]);

    // Dọn URL blob khi thay đổi/huỷ components
    useEffect(() => {
        return () => {
            if (avatarPreview?.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    const handlePickAvatar = () => fileInputRef.current?.click();

    // API upload (form-data) – chỉ gọi TRONG lúc LƯU thay đổi nếu có avatarFile
    const uploadAvatar = async (file: File): Promise<string> => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Thiếu token xác thực.");

        const form = new FormData();
        form.append("files", file);

        const res = await fetch(`${import.meta.env.VITE_LOCAL_API}/upload`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: form,
        });

        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
            throw new Error(json?.message || "Upload thất bại");
        }
        const url = json?.data?.[0];
        if (!url) throw new Error("Phản hồi thiếu URL ảnh.");
        return url as string;
    };

    // Chọn ảnh: chỉ validate + lưu file để preview. KHÔNG upload ở đây.
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;

        if (!f.type.startsWith("image/")) {
            toast.error("Vui lòng chọn tệp hình ảnh hợp lệ.");
            // reset input để lần sau chọn lại cùng file vẫn trigger
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }
        if (f.size > 5 * 1024 * 1024) {
            toast.error("Ảnh quá lớn (tối đa 5MB).");
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        setAvatarFile(f);
        // reset input để có thể chọn lại cùng tệp
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Bỏ ảnh mới, quay lại ảnh cũ (chưa đụng tới server)
    const handleClearAvatar = () => {
        setAvatarFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Lưu thay đổi: nếu có avatarFile -> upload trước để lấy URL -> rồi PUT /user/update
    const handleUpdateProfile = async () => {
        if (!profile) return;

        try {
            setIsSaving(true);
            const t = toast.loading("Đang lưu thay đổi...");

            const token = localStorage.getItem("token");
            if (!token) throw new Error("Thiếu token xác thực.");

            // 1) Nếu có ảnh mới -> upload để lấy URL
            let avatarUrl = profile.avatar || "";
            if (avatarFile) {
                const t2 = toast.loading("Đang tải ảnh lên...", { id: t });
                try {
                    avatarUrl = await uploadAvatar(avatarFile);
                    toast.success("Tải ảnh thành công!", { id: t2 });
                } catch (e: any) {
                    toast.error(e?.message || "Upload ảnh thất bại.", { id: t2 });
                    // Nếu upload fail, dừng luôn để user thử lại (không gọi update)
                    setIsSaving(false);
                    return;
                }
            }

            // 2) Gọi API cập nhật user
            const res = await fetch(`${import.meta.env.VITE_LOCAL_API}/user/update`, {
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
                    avatar: avatarUrl, // dùng URL mới nếu vừa upload, hoặc giữ URL cũ
                    roles: [1],
                }),
            });

            if (!res.ok) {
                toast.error("Cập nhật thông tin thất bại!", { id: t, position: "top-center" });
                setIsSaving(false);
                return;
            }

            // Thành công: refresh user (đồng bộ từ server), clear file local
            await refreshUser();
            setAvatarFile(null);
            toast.success("Cập nhật thông tin thành công!", { id: t, position: "top-center" });
            setIsEditing(false);
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error(error?.message || "Có lỗi xảy ra. Vui lòng thử lại!", { position: "top-center" });
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) {
        return <div className="flex items-center justify-center mt-3">Vui lòng đăng nhập để xem thông tin cá nhân</div>;
    }

    const disabledInput = !isEditing ? "bg-muted" : "";
    const disableSelectWrap = !isEditing ? "pointer-events-none opacity-70 select-none" : "";

    const points = profile?.totalSpent ?? 0;
    const currBound = TIER_BOUNDS[profile?.userRank || "Bronze"] || TIER_BOUNDS.Bronze;
    const span = (currBound.max ?? Math.max(points, currBound.min + 1)) - currBound.min;
    const pct = Math.max(0, Math.min(100, Math.round(((points - currBound.min) / (span || 1)) * 100)));

    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <CardTitle className="flex items-center gap-2">
                        <User className="size-5" /> Thông Tin Cá Nhân
                    </CardTitle>

                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                            Rank: {profile?.userRank || "Bronze"}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => setIsEditing((prev) => !prev)} className="gap-2" disabled={isSaving}>
                            <Edit2 className="size-4" />
                            {isEditing ? "Hủy" : "Chỉnh sửa"}
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-10">
                    {profile && (
                        <>
                            {/* Avatar */}
                            <div className="flex items-center justify-center mb-4">
                                <div className="relative">
                                    <Avatar className="h-32 w-32 shrink-0 rounded-full ring-2 ring-border shadow-sm overflow-hidden">
                                        <AvatarImage src={avatarPreview} alt={profile.fullName || profile.userName} className="h-full w-full object-cover" loading="eager" />
                                        <AvatarFallback className="bg-black text-white font-bold">{profile.userName?.slice(0, 2)?.toUpperCase() || "SZ"}</AvatarFallback>
                                    </Avatar>

                                    {isEditing && (
                                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                            <Button size="sm" variant="secondary" className="gap-2" onClick={handlePickAvatar} disabled={isSaving}>
                                                <ImageIcon className="size-4" />
                                                Đổi ảnh
                                            </Button>

                                            {avatarFile && (
                                                <Button size="sm" variant="outline" className="gap-2" onClick={handleClearAvatar} disabled={isSaving}>
                                                    <X className="size-4" />
                                                    Bỏ chọn
                                                </Button>
                                            )}
                                        </div>
                                    )}

                                    {/* input file ẩn */}
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                                </div>
                            </div>

                            {/* Grid form */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Họ và tên</Label>
                                    <Input id="fullName" value={profile.fullName} onChange={(e) => setProfile((prev: any) => ({ ...prev, fullName: e.target.value }))} disabled={!isEditing} className={disabledInput} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="userName">Tên đăng nhập</Label>
                                    <Input id="userName" value={profile.userName} disabled className="bg-muted" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center gap-2">
                                        <Mail className="size-4" /> Email
                                    </Label>
                                    <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile((prev: any) => ({ ...prev, email: e.target.value }))} disabled={!isEditing} className={disabledInput} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="flex items-center gap-2">
                                        <Phone className="size-4" /> Số điện thoại
                                    </Label>
                                    <Input id="phone" value={profile.phone} onChange={(e) => setProfile((prev: any) => ({ ...prev, phone: e.target.value }))} disabled={!isEditing} className={disabledInput} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Giới tính</Label>
                                    <div className={disableSelectWrap}>
                                        <Select value={profile.gender} onValueChange={(v: UserProfile["gender"]) => setProfile((prev: any) => ({ ...prev, gender: v }))}>
                                            <SelectTrigger id="gender" className="h-9">
                                                <SelectValue placeholder="Chọn giới tính" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MALE">Nam</SelectItem>
                                                <SelectItem value="FEMALE">Nữ</SelectItem>
                                                <SelectItem value="BOTH">Khác (Beta)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                                        <Calendar className="size-4" /> Ngày sinh
                                    </Label>
                                    <Input id="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={(e) => setProfile((prev: any) => ({ ...prev, dateOfBirth: e.target.value }))} disabled={!isEditing} className={disabledInput} />
                                </div>
                            </div>

                            {/* Rank tổng quan + progress */}
                            <div className="rounded-xl border p-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-medium">Hạng thành viên</div>
                                    <Badge variant="outline" className="text-xs">
                                        {profile.userRank}
                                    </Badge>
                                </div>
                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Điểm hiện tại</span>
                                        <span className="font-medium">{points}</span>
                                    </div>
                                    <Progress value={pct} />
                                    <p className="text-xs text-muted-foreground">Tiếp tục tích điểm để nhận nhiều ưu đãi hơn.</p>
                                </div>
                            </div>

                            {/* Khung rank từng bậc */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                                {TIERS.map((tier) => {
                                    const isActive = (profile.userRank || "Bronze") === tier;
                                    const b = TIER_BOUNDS[tier] || { min: 0 };
                                    const label = b.max != null ? `${b.min}–${b.max}` : `${b.min}+`;
                                    return (
                                        <div key={tier} className={["rounded-xl border p-3", isActive ? "border-primary bg-muted/60" : "border-border bg-background"].join(" ")}>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold">{tier}</span>
                                                {isActive ? (
                                                    <Badge className="text-[10px]" variant="default">
                                                        Current
                                                    </Badge>
                                                ) : (
                                                    <Badge className="text-[10px]" variant="outline">
                                                        Tier
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="mt-2 text-xs text-muted-foreground">
                                                Mốc điểm: <span className="text-foreground font-medium">{label}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Actions */}
                            {isEditing && (
                                <div className="flex gap-2 pt-1">
                                    <Button onClick={handleUpdateProfile} disabled={isSaving}>
                                        {isSaving && <Loader2 className="size-4 mr-2 animate-spin" />}
                                        Lưu thay đổi
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            // hủy chỉnh sửa: quay lại dữ liệu user gốc, bỏ preview
                                            setProfile((prev) => ({
                                                ...(prev as UserProfile),
                                                id: user.id,
                                                userName: user.userName,
                                                fullName: user.fullName || "",
                                                gender: (user.gender as UserProfile["gender"]) || "BOTH",
                                                dateOfBirth: user.dateOfBirth || "",
                                                email: user.email || "",
                                                phone: user.phone || "",
                                                userRank: user.userRank || "Bronze",
                                                avatar: user.avatar || "https://i.pinimg.com/736x/66/18/d6/6618d62c3a835e38e9dfff3cc3e80dae.jpg",
                                                rankPoints: user.rankPoints || 0,
                                            }));
                                            setAvatarFile(null);
                                            setIsEditing(false);
                                        }}
                                        disabled={isSaving}
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
