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
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hook/context/AuthContext"
import { useState } from "react"

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const success = login(username, password)
        if (success) {
            // Nếu login thành công nhưng là admin -> báo lỗi
            if (username === "admin") {
                setError("Tài khoản admin phải đăng nhập tại /admin/login")
                return
            }
            navigate("/") // chuyển về home
        } else {

            setError("Sai tài khoản hoặc mật khẩu")
            console.log(username, password)
        }
    }

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
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Tên đăng nhập</Label>
                            <Input
                                id="username"
                                placeholder="Tên đăng nhập"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <Input
                                id="password"
                                placeholder="*******************"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
