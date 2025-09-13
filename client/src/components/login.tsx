import { Facebook, Globe } from "lucide-react"
import { Button } from "./ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Link } from "react-router-dom"

export default function Login() {
    return (
        <div className="flex items-center justify-center p-20">
            <Card className="w-[400px] shadow-lg rounded-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Đăng Nhập</CardTitle>
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

                    <Separator />
                    
                    {/* Form login */}
                    <form className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input id="password" type="password" placeholder="**********" />
                        </div>
                        <Button type="submit" className="w-full cursor-pointer">
                            Đăng Nhập
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-between items-center text-sm ">
                    <Link to="#" className="text-sm text-blue-500 hover:underline">
                        Quên mật khẩu?
                    </Link>
                    <Link to="/register" className="text-sm text-blue-500 hover:underline">
                        Chưa có tài khoản? Đăng Ký
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
