import { Card, CardContent } from "./ui/card";

export default function AboutPage() {
    return (
        <div className="w-full">
            {/* Hero section */}
            <div className="relative w-full h-[70vh] bg-black">
                <img src="https://file.hstatic.net/1000253775/article/shop-quan-ao-nam-tai-quan-9_3043d76f75b34e0b93856343f546c69e.jpg" alt="Fashion Lifestyle" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    <h1 className="text-5xl font-bold mb-4">ShopZues</h1>
                    <p className="text-lg max-w-2xl">Phong cách. Cá tính. Thời trang cho tất cả mọi người.</p>
                </div>
            </div>
            {/* Content section */}
            <div className="container mx-auto py-16 px-4 space-y-8">
                <Card className="rounded-none border shadow-lg">
                    <CardContent className="p-8 space-y-6 text-center">
                        <p className="text-lg leading-relaxed ">
                            Tại <span className="font-semibold">ShopZues</span>, chúng tôi tin rằng quần áo không chỉ là thứ để mặc – mà còn là cách bạn thể hiện chính mình. Phong cách của bạn kể câu chuyện về cá tính, cảm xúc và khát vọng.
                        </p>

                        <p className="text-lg leading-relaxed ">
                            Sứ mệnh của chúng tôi là mang đến những bộ sưu tập độc đáo, hiện đại và đa dạng, giúp bạn tự tin khẳng định bản thân. Cho dù bạn là người ưa sự tối giản tinh tế hay thích sự táo bạo khác biệt, ShopZues đều có lựa chọn dành
                            cho bạn.
                        </p>

                        <p className="text-lg leading-relaxed ">Với ShopZues, thời trang là một hành trình khám phá. Chúng tôi cam kết xây dựng một cộng đồng yêu cái đẹp, trân trọng sự sáng tạo và tôn vinh sự khác biệt.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
