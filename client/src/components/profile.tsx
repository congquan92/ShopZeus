import { useState } from "react";
import { SlashIcon, User, Package, Heart, Bell, Shield } from "lucide-react";

import TitleCompact from "./ui/title_compact";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import ProfileTab from "./profile/profiletab/profiletab";
import SecurityTab from "./profile/securitytap";

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
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="size-4" />
                        Thông tin
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

                {/* Security Tab */}
                <TabsContent value="security">
                    <SecurityTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
