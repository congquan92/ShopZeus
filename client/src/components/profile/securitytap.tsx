import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function SecurityTab() {
    const [open, setOpen] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const resetForm = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowOld(false);
        setShowNew(false);
        setShowConfirm(false);
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        // // Basic client-side validation
        // if (!oldPassword) {
        //     toast.error("Vui lòng nhập mật khẩu cũ.", { position: "top-center" });
        //     return;
        // }
        // if (newPassword.length < 8) {
        //     toast.error("Mật khẩu mới phải từ 8 ký tự trở lên.", {
        //         position: "top-center",
        //     });
        //     return;
        // }
        // if (newPassword === oldPassword) {
        //     toast.error("Mật khẩu mới không được trùng mật khẩu cũ.", {
        //         position: "top-center",
        //     });
        //     return;
        // }
        // if (newPassword !== confirmPassword) {
        //     toast.error("Mật khẩu mới và xác nhận không trùng khớp.", {
        //         position: "top-center",
        //     });
        //     return;
        // }

        try {
            const payload = {
                oldPassword,
                password: newPassword,
                confirmPassword,
            };

            const res = await fetch(`${import.meta.env.VITE_LOCAL_API}/user/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log(data);
            if (data.status === 200) {
                toast.success("Thay đổi mật khẩu thành công.", {
                    position: "top-center",
                });
                resetForm();
                setOpen(false); // đóng dialog khi thành công
            } else if (data.status === 111) {
                toast.error("Mật khẩu cũ không chính xác.", { position: "top-center" });
            } else {
                toast.error("Đã có lỗi xảy ra.", { position: "top-center" });
            }
        } catch (err) {
            console.error(err);
            toast.error("Lỗi mạng hoặc server.", { position: "top-center" });
        }
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="size-5" />
                        Bảo Mật Tài Khoản
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        {/* Đổi mật khẩu */}
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                                <h4 className="font-medium">Đổi mật khẩu</h4>
                                <p className="text-sm text-gray-600">Cập nhật mật khẩu để bảo mật tài khoản</p>
                            </div>

                            <Dialog
                                open={open}
                                onOpenChange={(isOpen) => {
                                    setOpen(isOpen);
                                    if (!isOpen) resetForm();
                                }}
                            >
                                <DialogTrigger asChild>
                                    <Button variant="outline">Thay đổi</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[400px]">
                                    <DialogHeader>
                                        <DialogTitle>Đổi mật khẩu</DialogTitle> <DialogDescription>Nhập mật khẩu cũ và mật khẩu mới để tiếp tục.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-2">
                                        <div className="grid gap-2 relative">
                                            <Label htmlFor="oldPassword">Mật khẩu cũ</Label>{" "}
                                            <Input id="oldPassword" type={showOld ? "text" : "password"} placeholder="Nhập mật khẩu hiện tại" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />{" "}
                                            <div className="absolute right-3 top-[33px] cursor-pointer" onClick={() => setShowOld(!showOld)}>
                                                {showOld ? <EyeOff className="size-4 text-gray-500" /> : <Eye className="size-4 text-gray-500" />}
                                            </div>
                                        </div>
                                        <div className="grid gap-2 relative">
                                            <Label htmlFor="newPassword">Mật khẩu mới</Label>{" "}
                                            <Input id="newPassword" type={showNew ? "text" : "password"} placeholder="Nhập mật khẩu mới" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                            <div className="absolute right-3 top-[33px] cursor-pointer" onClick={() => setShowNew(!showNew)}>
                                                {showNew ? <EyeOff className="size-4 text-gray-500" /> : <Eye className="size-4 text-gray-500" />}
                                            </div>
                                        </div>
                                        <div className="grid gap-2 relative">
                                            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                                            <Input id="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Nhập lại mật khẩu mới" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                            <div className="absolute right-3 top-[33px] cursor-pointer" onClick={() => setShowConfirm(!showConfirm)}>
                                                {showConfirm ? <EyeOff className="size-4 text-gray-500" /> : <Eye className="size-4 text-gray-500" />}
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleChangePassword}>
                                            Lưu thay đổi
                                        </Button>
                                        <Button
                                            type="submit"
                                            onClick={() => {
                                                setOpen(false);
                                                resetForm();
                                            }}
                                            variant="outline"
                                        >
                                            Hủy
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Xác thực 2 bước */}
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                                <h4 className="font-medium">Xác thực 2 bước</h4>
                                <p className="text-sm text-gray-600">Thêm lớp bảo mật cho tài khoản của bạn</p>
                            </div>
                            <Button variant="outline">Bật</Button>
                        </div>

                        {/* Thiết bị đăng nhập */}
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                                <h4 className="font-medium">Thiết bị đăng nhập</h4>
                                <p className="text-sm text-gray-600">Quản lý các thiết bị đã đăng nhập</p>
                            </div>
                            <Button variant="outline">Xem</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
