import { Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function SecurityTab() {
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
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                                <h4 className="font-medium">Đổi mật khẩu</h4>
                                <p className="text-sm text-gray-600">Cập nhật mật khẩu để bảo mật tài khoản</p>
                            </div>
                            <Button variant="outline">Thay đổi</Button>
                        </div>

                        <div className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                                <h4 className="font-medium">Xác thực 2 bước</h4>
                                <p className="text-sm text-gray-600">Thêm lớp bảo mật cho tài khoản của bạn</p>
                            </div>
                            <Button variant="outline">Bật</Button>
                        </div>

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
