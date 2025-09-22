import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Facebook, Globe, Eye, EyeOff } from "lucide-react"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hook/context/AuthContext"
import { toast } from "sonner"

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Validate form
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error("Vui lòng điền đầy đủ thông tin")
            return
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp")
            return
        }

        if (formData.password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự")
            return
        }

        setIsLoading(true)
        
        try {
            const result = await register(formData)
            
            if (result.success) {
                toast.success(result.message)
                navigate("/") // Redirect to home page
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi đăng ký")
        } finally {
            setIsLoading(false)
        }
    }

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
                            <Globe className="w-5 h-5 text-red-500" /> Đăng Ký Với Google
                        </Button>
                        <Button variant="outline" className="w-full flex items-center gap-2 cursor-pointer">
                            <Facebook className="w-5 h-5" /> Đăng Ký Với Facebook
                        </Button>
                    </div>

                    <Separator className="my-4" />

                    {/* Form đăng ký */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="name">Họ và Tên</Label>
                            <Input 
                                id="name" 
                                type="text" 
                                placeholder="Nhập họ và tên" 
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                required 
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="Nhập email" 
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required 
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <div className="relative">
                                <Input 
                                    id="password" 
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mật khẩu (ít nhất 6 ký tự)" 
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
                        <div className="space-y-1">
                            <Label htmlFor="confirm">Xác nhận mật khẩu</Label>
                            <div className="relative">
                                <Input
                                    id="confirm"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Nhập lại mật khẩu"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    className="pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
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
                                    Đang đăng ký...
                                </div>
                            ) : (
                                "Đăng Ký"
                            )}
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
