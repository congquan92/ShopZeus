import { useState } from "react";
import { SlashIcon, User, Package, Heart, Bell, Shield } from "lucide-react";

import TitleCompact from "./ui/title_compact";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import ProfileTab from "./profile/profiletab/profiletab";
import OrderTab from "./profile/ordertab";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="container mx-auto p-4 space-y-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <span className="text-gray-500">Tài khoản</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <TitleCompact title="Trang Cá Nhân" subtitle="Quản lý thông tin cá nhân" />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="size-4" />
                        Thông tin
                    </TabsTrigger>
                    <TabsTrigger value="orders" className="flex items-center gap-2">
                        <Package className="size-4" />
                        Đơn hàng
                    </TabsTrigger>
                    <TabsTrigger value="favorites" className="flex items-center gap-2">
                        <Heart className="size-4" />
                        Yêu thích
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                        <Bell className="size-4" />
                        Thông báo
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Shield className="size-4" />
                        Bảo mật
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <ProfileTab />
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders" className="space-y-6">
                    <OrderTab />
                </TabsContent>

                {/* Favorites Tab */}
                <TabsContent value="favorites">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="size-5" />
                                Sản Phẩm Yêu Thích
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-gray-500">
                                <Heart className="size-12 mx-auto mb-4 opacity-50" />
                                <p>Chưa có sản phẩm yêu thích nào</p>
                                <p className="text-sm">Thêm sản phẩm vào danh sách yêu thích để xem tại đây</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="size-5" />
                                Thông Báo
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-gray-500">
                                <Bell className="size-12 mx-auto mb-4 opacity-50" />
                                <p>Không có thông báo mới</p>
                                <p className="text-sm">Các thông báo về đơn hàng, khuyến mãi sẽ hiển thị tại đây</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
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
                </TabsContent>
            </Tabs>
        </div>
    );
}
