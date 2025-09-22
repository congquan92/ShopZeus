import { useState, useEffect } from "react"
import { SlashIcon, User, Package, Heart, Settings, Edit2, Save, X, LogOut } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "./ui/breadcrumb"
import TitleCompact from "./ui/title_compact"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useAuth } from "../hook/context/AuthContext"
import { useOrders } from "../hook/useOrders"
import { useWishlist } from "../hook/useWishlist"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"

export default function UserProfile() {
    const { user, logout, updateUser } = useAuth()
    const { orders, loading: ordersLoading } = useOrders(user?.id || 1)
    const { wishlist } = useWishlist(user?.id || 1)
    const navigate = useNavigate()

    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState({
        name: "",
        email: "",
        phone: ""
    })

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }
        
        setEditData({
            name: user.name,
            email: user.email,
            phone: user.phone || ""
        })
    }, [user, navigate])

    const handleSave = async () => {
        try {
            updateUser(editData)
            toast.success("Cập nhật thông tin thành công!")
            setIsEditing(false)
        } catch (error) {
            toast.error("Có lỗi xảy ra khi cập nhật thông tin")
        }
    }

    const handleLogout = () => {
        logout()
        toast.success("Đăng xuất thành công!")
        navigate('/')
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Vui lòng đăng nhập</h2>
                    <Link to="/login">
                        <Button>Đăng nhập</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem className="text-foreground">
                        Tài khoản
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <TitleCompact
                title="Tài Khoản"
                subtitle="Quản lý thông tin cá nhân và đơn hàng"
            />

            {/* Profile Header */}
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl font-bold">
                                {user.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{user.name}</h2>
                                <p className="text-gray-600">{user.email}</p>
                                <Badge variant={user.verified ? "default" : "secondary"}>
                                    {user.verified ? "Đã xác thực" : "Chưa xác thực"}
                                </Badge>
                            </div>
                        </div>
                        <Button 
                            onClick={handleLogout}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <LogOut size={16} />
                            Đăng xuất
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Profile Content */}
            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User size={16} />
                        Thông tin
                    </TabsTrigger>
                    <TabsTrigger value="orders" className="flex items-center gap-2">
                        <Package size={16} />
                        Đơn hàng
                    </TabsTrigger>
                    <TabsTrigger value="wishlist" className="flex items-center gap-2">
                        <Heart size={16} />
                        Yêu thích
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                        <Settings size={16} />
                        Cài đặt
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Thông tin cá nhân</CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    if (isEditing) {
                                        handleSave()
                                    } else {
                                        setIsEditing(true)
                                    }
                                }}
                                className="flex items-center gap-2"
                            >
                                {isEditing ? (
                                    <>
                                        <Save size={16} />
                                        Lưu
                                    </>
                                ) : (
                                    <>
                                        <Edit2 size={16} />
                                        Chỉnh sửa
                                    </>
                                )}
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Họ và tên</Label>
                                    <Input
                                        id="name"
                                        value={isEditing ? editData.name : user.name}
                                        onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        value={isEditing ? editData.email : user.email}
                                        onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <Input
                                        id="phone"
                                        value={isEditing ? editData.phone : (user.phone || "")}
                                        onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                                        disabled={!isEditing}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>
                            </div>
                            
                            {isEditing && (
                                <div className="flex gap-2 pt-4">
                                    <Button onClick={handleSave}>
                                        <Save size={16} className="mr-2" />
                                        Lưu thay đổi
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => {
                                            setIsEditing(false)
                                            setEditData({
                                                name: user.name,
                                                email: user.email,
                                                phone: user.phone || ""
                                            })
                                        }}
                                    >
                                        <X size={16} className="mr-2" />
                                        Hủy
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Đơn hàng của tôi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {ordersLoading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                                    <p className="mt-2 text-gray-600">Đang tải đơn hàng...</p>
                                </div>
                            ) : orders && orders.length > 0 ? (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-medium">Đơn hàng #{order.orderNumber}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        Ngày đặt: {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                                                    </p>
                                                </div>
                                                <Badge variant={
                                                    order.status === 'completed' ? 'default' :
                                                    order.status === 'shipped' ? 'secondary' :
                                                    order.status === 'pending' ? 'outline' : 'destructive'
                                                }>
                                                    {order.status === 'completed' ? 'Hoàn thành' :
                                                     order.status === 'shipped' ? 'Đang giao' :
                                                     order.status === 'pending' ? 'Chờ xử lý' : 'Đã hủy'}
                                                </Badge>
                                            </div>
                                            <p className="text-lg font-semibold text-green-600">
                                                {formatPrice(order.total)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {order.items.length} sản phẩm
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Package size={48} className="mx-auto text-gray-400 mb-4" />
                                    <p className="text-gray-600">Bạn chưa có đơn hàng nào</p>
                                    <Link to="/">
                                        <Button className="mt-4">Mua sắm ngay</Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Wishlist Tab */}
                <TabsContent value="wishlist">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sản phẩm yêu thích</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {wishlist && wishlist.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {wishlist.map((item) => (
                                        <div key={item.id} className="border rounded-lg p-4">
                                            <img 
                                                src={item.image} 
                                                alt={item.name}
                                                className="w-full h-32 object-cover rounded mb-2"
                                            />
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-green-600 font-semibold">
                                                {formatPrice(item.price)}
                                            </p>
                                            <Button className="w-full mt-2" size="sm">
                                                Thêm vào giỏ
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                                    <p className="text-gray-600">Bạn chưa có sản phẩm yêu thích nào</p>
                                    <Link to="/">
                                        <Button className="mt-4">Khám phá sản phẩm</Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cài đặt tài khoản</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h3 className="font-medium">Thông báo email</h3>
                                        <p className="text-sm text-gray-600">Nhận thông báo về đơn hàng và khuyến mãi</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="rounded" />
                                </div>
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h3 className="font-medium">Thông báo SMS</h3>
                                        <p className="text-sm text-gray-600">Nhận tin nhắn về trạng thái đơn hàng</p>
                                    </div>
                                    <input type="checkbox" className="rounded" />
                                </div>
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h3 className="font-medium">Newsletter</h3>
                                        <p className="text-sm text-gray-600">Nhận bản tin về sản phẩm mới và ưu đãi</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="rounded" />
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t">
                                <Button variant="destructive">
                                    Xóa tài khoản
                                </Button>
                                <p className="text-xs text-gray-500 mt-2">
                                    Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}