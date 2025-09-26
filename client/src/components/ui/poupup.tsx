import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function Popup(props: { imgURL: string; navigateURL: string }) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        const lastShown = localStorage.getItem("popup");
        const now = Date.now();

        if (!lastShown || now - parseInt(lastShown, 10) > 5 * 60 * 1000) {
            const timer = setTimeout(() => {
                setOpen(true);
                localStorage.setItem("popup", now.toString());
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => setOpen(false);
    const handleShopNow = () => {
        setOpen(false);
        navigate(`${props.navigateURL}`);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={true}>
            <DialogContent className="  max-w-2xl p-0 overflow-hidden rounded-none shadow-2xl border-0">
                {/* Nút đóng */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 z-10 bg-transparent transition-all duration-200 hover:scale-110 cursor-pointer"
                >
                    <X className="size-5 text-white font-bold" />
                </button>

                {/* Banner hình ảnh */}
                <img src={props.imgURL} alt="Sale banner" className="w-full h-60 object-cover" />

                {/* Nội dung ngắn gọn */}
                <div className="p-6 text-center space-y-4">
                    <DialogTitle asChild>
                        <h2 className="text-3xl font-bold text-gray-800">🔥 Giảm 50%</h2>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <p className="text-gray-600">Duy nhất hôm nay – đừng bỏ lỡ!</p>
                    </DialogDescription>
                    <div className="space-y-3">
                        <Button
                            onClick={handleShopNow}
                            className="w-full text-white font-bold text-lg rounded-none shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
                        >
                            🛒 Mua ngay
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="w-full  text-black  rounded-none cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                        >
                            Để sau
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
