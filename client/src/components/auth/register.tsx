import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Facebook, Globe } from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { useState } from "react";
import RegisterOTP from "./registerOTP";
import Loader from "../ui/loader";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [step, setStep] = useState<"form" | "verify">("form");

    const validate = () => {
        // Họ tên
        if (!/^[\p{L}\s]+$/u.test(fullName)) {
            return "Họ và tên chỉ được chứa chữ, không có số";
        }

        // Giới tính
        if (!gender) {
            return "Vui lòng chọn giới tính";
        }

        // Ngày sinh
        if (!dateOfBirth) {
            return "Vui lòng nhập ngày sinh";
        }
        const dob = new Date(dateOfBirth);
        const age = new Date().getFullYear() - dob.getFullYear();
        const monthDiff = new Date().getMonth() - dob.getMonth();
        const dayDiff = new Date().getDate() - dob.getDate();
        const realAge = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? age : age - 1;
        if (realAge < 16) {
            return "Bạn phải trên 16 tuổi";
        }

        // Email:
        if (!/^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/.test(email)) {
            return "Email không hợp lệ";
        }

        // Phone
        if (!/^[0-9]{9,11}$/.test(phone)) {
            return "Số điện thoại không hợp lệ";
        }

        // Username
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(username)) {
            return "Tên đăng nhập phải chứa cả chữ và số";
        }

        // Password
        if (password.length < 8) {
            return "Mật khẩu phải ít nhất 8 ký tự";
        }

        // Confirm password
        if (password !== confirm) {
            return "Mật khẩu không khớp";
        }

        return "";
    };

    const handelSumbit = async (e: React.FormEvent) => {
        e.preventDefault();
        const error = validate();
        if (error) {
            setMessage(error);
            return;
        }
        setMessage("");

        const payload = {
            fullName: fullName.trim(),
            gender,
            dateOfBirth,
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            username: username.trim(),
            password,
            roleId: [1],
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_LOCAL_API}/user/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const d = await res.json();
            setData(d);
            if (!res.ok) {
                setMessage(`Đăng ký Thất Bại. ${data.message}`);
                return;
            }
            setStep("verify");
        } catch (error) {
            console.error("Lỗi hệ thống", error);
            setMessage("Hệ Thống lỗi. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader text="Đang xử lý..." />;
    }

    return (
        <>
            {step === "form" ? (
                <div className="flex items-center justify-center p-5">
                    <Card className="w-[450px] shadow-lg rounded-none">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center">Đăng Ký</CardTitle>
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
                            {message && <p className="text-red-500 text-center">{message}</p>}
                            <form className="flex flex-col gap-4" onSubmit={handelSumbit}>
                                {/* Họ tên + Giới tính */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="fullName">Họ và Tên</Label>
                                        <Input id="fullName" type="text" placeholder="Nguyễn Văn A" required className="w-full" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="gender">Giới tính</Label>
                                        <Select value={gender} onValueChange={setGender}>
                                            <SelectTrigger id="gender" className="w-full">
                                                <SelectValue placeholder="Chọn giới tính" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MALE">Nam</SelectItem>
                                                <SelectItem value="FEMALE">Nữ</SelectItem>
                                                <SelectItem value="BOTH">Beta</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Ngày sinh + Email */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                                        <Input id="dateOfBirth" type="date" required className="w-full" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="email@example.com" required className="w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                {/* Số điện thoại */}
                                <div className="space-y-1">
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <Input id="phone" type="tel" placeholder="0123456789" required className="w-full" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>

                                {/* Username */}
                                <div className="space-y-1">
                                    <Label htmlFor="username">Tên đăng nhập</Label>
                                    <Input id="username" type="text" placeholder="username" required className="w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>

                                {/* Mật khẩu */}
                                <div className="space-y-1">
                                    <Label htmlFor="password">Mật khẩu</Label>
                                    <Input id="password" type="password" placeholder="Mật khẩu" required className="w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                {/* Xác nhận mật khẩu */}
                                <div className="space-y-1">
                                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                                    <Input id="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" required className="w-full" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
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
            ) : (
                <RegisterOTP email={email} iduser={data.data} onBack={() => setStep("form")} onLogin={() => (window.location.href = "/login")} />
            )}
        </>
    );
}
