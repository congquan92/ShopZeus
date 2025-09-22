import { useState } from "react"
import { Facebook, Globe, Eye, EyeOff } from "lucide-react"
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
import { toast } from "sonner"

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!formData.email || !formData.password) {
            toast.error("Vui lòng điền đầy đủ thông tin")
            return
        }

        setIsLoading(true)
        
        try {
            const result = await login(formData.email, formData.password)
            
            if (result.success) {
                toast.success(result.message)
                navigate("/") // Redirect to home page
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi đăng nhập")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center p-20">
            <Card className="w-[400px] shadow-lg rounded-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Đăng Nhập</CardTitle>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Demo: quan@example.com / password123
                    </p>
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="Nhập email của bạn"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <div className="relative">
                                <Input 
                                    id="password" 
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Nhập mật khẩu"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className="pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full cursor-pointer"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Đang đăng nhập...
                                </div>
                            ) : (
                                "Đăng Nhập"
                            )}
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
