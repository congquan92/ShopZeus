import { Facebook, Globe, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Link } from "react-router-dom";
import RegisterOTP from "./registerOTP";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<"form" | "verify">("form");
    const [res, setRes] = useState();
    const [verifying, setVerifying] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_LOCAL_API}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });
                const data = await response.json();
                setRes(data);
                if (response.ok) {
                    setMessage("Đăng Nhập Thành Công");
                    console.log("Login successful:", data);
                    localStorage.setItem("token", data.token);
                    window.location.href = "/"; // load lại trang để lấy user mới
                } else if (data.status === 1000) {
                    setMessage("Vui lòng xác thực email để đăng nhập");
                    setVerifying(true);
                } else {
                    setMessage("Đăng Nhập Thất Bại");
                }
            } catch (error) {
                setMessage("Lỗi kết nối server");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    };

    const handelVerify = () => {
        fetch(`${import.meta.env.VITE_LOCAL_API}/otp/register/send?userId=${res.data.userId}&otpType=VERIFICATION`, {
            method: "POST",
        });
        setStep("verify");
    };
    return (
        <>
            {step === "form" ? (
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
                            {message && <p className="text-red-500 text-sm">{message}</p>}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Tên đăng nhập</Label>
                                    <Input id="username" placeholder="Tên đăng nhập" type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Mật khẩu</Label>
                                    <Input id="password" placeholder="*******************" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
                                </div>
                                <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader className="w-4 h-4 animate-spin mr-2" /> Đang xử lý...
                                        </>
                                    ) : (
                                        "Đăng Nhập"
                                    )}
                                </Button>
                                {verifying && (
                                    <Button type="submit" className="w-full cursor-pointer" onClick={handelVerify}>
                                        Xác Thực Ngay
                                    </Button>
                                )}
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
            ) : (
                <RegisterOTP email={res.data.email} iduser={res.data.userId} onBack={() => setStep("form")} onLogin={() => (window.location.href = "/login")} />
            )}
        </>
    );
}
