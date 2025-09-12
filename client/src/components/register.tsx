import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Facebook, Globe } from "lucide-react"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"
import { Link } from "react-router-dom"

export default function Register() {
    return (
        <div className="flex items-center justify-center p-20">
            <Card className="w-[400px] shadow-lg rounded-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Đăng Ký
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Login social */}
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" className="w-full flex items-center gap-2 cursor-pointer">
                            <Globe className="w-5 h-5 text-red-500" /> Đăng Nhập Với Google
                        </Button>
                        <Button variant="outline" className="w-full flex items-center gap-2 cursor-pointer">
                            <Facebook className="w-5 h-5" /> Đăng Nhập Với Facebook
                        </Button>
                    </div>

                    <Separator className="my-4" />

                    {/* Form đăng ký */}
                    <form className="flex flex-col gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="name">Họ và Tên</Label>
                            <Input id="name" type="text" placeholder="Họ và Tên" required />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Email" required />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input id="password" type="password" placeholder="Mật khẩu" required />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="confirm">Xác nhận mật khẩu</Label>
                            <Input
                                id="confirm"
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full cursor-pointer">
                            Đăng Ký
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-between items-center text-sm">
                    <Link to="#" className="text-blue-500 hover:underline">
                        Quên mật khẩu?
                    </Link>
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Đã có tài khoản? Đăng nhập
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
