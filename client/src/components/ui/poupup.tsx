import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

type PopupProps = {
    imgURL: string;
    navigateURL: string;
    /** Độ trễ auto-open (ms) – mặc định 2000ms */
    delayMs?: number;
    /** Thời gian “nghỉ” không hiện lại (phút) – mặc định 5 phút */
    cooldownMinutes?: number;
    /** Key lưu trong localStorage – để tái dùng nhiều popup khác nhau */
    storageKey?: string;
    /** Cho phép đóng khi click ra ngoài */
    allowOutsideClose?: boolean;
};

export default function Popup({ imgURL, navigateURL, delayMs = 2000, cooldownMinutes = 5, storageKey = "popup", allowOutsideClose = true }: PopupProps) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        // Guard SSR
        if (typeof window === "undefined") return;

        const lastShownRaw = localStorage.getItem(storageKey);
        const lastShown = lastShownRaw ? parseInt(lastShownRaw, 10) : 0;
        const now = Date.now();
        const cooldownMs = cooldownMinutes * 60 * 1000;

        if (!lastShown || now - lastShown > cooldownMs) {
            const timer = setTimeout(() => {
                setOpen(true);
                localStorage.setItem(storageKey, String(now));
            }, delayMs);
            return () => clearTimeout(timer);
        }
    }, [cooldownMinutes, delayMs, storageKey]);

    const handleClose = () => setOpen(false);

    const handleShopNow = () => {
        setOpen(false);
        navigate(navigateURL);
    };

    return (
        <Dialog open={open} onOpenChange={allowOutsideClose ? setOpen : undefined} modal={true}>
            <DialogContent
                // responsive: max-w thay đổi theo breakpoint; không bo góc để đúng style bạn
                className="max-w-[90vw] sm:max-w-xl lg:max-w-2xl p-0 overflow-hidden rounded-none shadow-2xl border-0"
            >
                {/* Nút đóng – tăng hit area trên mobile */}
                <button onClick={handleClose} className="absolute top-3 right-3 z-10  p-1.5 hover:scale-110 outline-none cursor-pointer" aria-label="Đóng">
                    <X className="size-5 text-white" />
                </button>

                {/* Banner: responsive height theo breakpoint, object-cover giữ bố cục đẹp */}
                <img src={imgURL} alt="Sale banner" loading="lazy" decoding="async" className="w-full h-48 sm:h-60 lg:h-72 object-cover select-none" />

                {/* Nội dung: text scale theo breakpoints, khoảng cách thoáng hơn trên desktop */}
                <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7 text-center space-y-3 sm:space-y-4">
                    <DialogTitle asChild>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">🔥 Giảm 50%</h2>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <p className="text-gray-600 text-sm sm:text-base">Duy nhất hôm nay – đừng bỏ lỡ!</p>
                    </DialogDescription>

                    <div className="space-y-2.5 sm:space-y-3">
                        <Button onClick={handleShopNow} className="w-full text-white font-semibold sm:font-bold text-base sm:text-lg rounded-none shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-[1.02]">
                            🛒 Mua ngay
                        </Button>

                        <Button variant="outline" onClick={handleClose} className="w-full text-black rounded-none shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-[1.02]">
                            Để sau
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
