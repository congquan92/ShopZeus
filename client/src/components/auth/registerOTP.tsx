import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function RegisterOTP({ email, iduser, onBack, onLogin }: { email: string; iduser: string; onBack: () => void; onLogin: () => void }) {
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(60); // 1 phút = 60 giây
    const [resendAvailable, setResendAvailable] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setResendAvailable(true);
            return;
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const handleVerify = async () => {
        const response = await fetch(`${import.meta.env.VITE_LOCAL_API}/user/verify-account`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: iduser, code: otp }),
        });
        if (response.ok) {
            toast.success("Xác thực thành công!");
            onLogin();
        } else {
            toast.error("Mã OTP không đúng!");
        }
    };

    const handleResend = () => {
        setTimeLeft(300);
        setResendAvailable(false);
        fetch(`${import.meta.env.VITE_LOCAL_API}/otp/register/send?userId=${iduser}&otpType=VERIFICATION`, {
            method: "POST",
        });
        toast.info("Mã OTP mới đã được gửi lại vào email của bạn");
    };

    return (
        <div className="flex items-center justify-center p-5">
            <Card className="w-[450px] shadow-lg rounded-none">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Xác thực Email</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 text-center">
                    <p className="text-sm text-gray-600">
                        Nhập mã OTP đã gửi tới email: <span className="font-semibold">{email}</span>
                    </p>

                    <Input type="text" placeholder="Nhập mã gồm 6 chữ số" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} className="text-center tracking-widest text-lg" />

                    <p className="text-sm text-gray-500">
                        {resendAvailable ? (
                            <span className="text-red-500">Mã đã hết hạn</span>
                        ) : (
                            <>
                                Mã sẽ hết hạn sau: <b>{formatTime(timeLeft)}</b>
                            </>
                        )}
                    </p>
                </CardContent>

                <Separator />

                <CardFooter className="flex flex-col gap-2">
                    <Button onClick={handleVerify} className="w-full cursor-pointer">
                        Xác nhận
                    </Button>
                    <Button variant="outline" onClick={onBack} className="w-full cursor-pointer">
                        Quay lại
                    </Button>
                    <Button variant="ghost" disabled={!resendAvailable} onClick={handleResend} className="w-full cursor-pointer text-blue-600">
                        Gửi lại mã
                    </Button>
                    <Button variant="secondary" onClick={onLogin} className="w-full cursor-pointer">
                        Đăng nhập ngay
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
