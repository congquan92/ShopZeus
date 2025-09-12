import BannerEffect from "./ui/bannereffect"
import ButtonCenter from "./ui/buttonALL"
import BannerCarousel from "./ui/custom-carousel"
import ProductCarousel from "./ui/productcarousel"
import Products from "./ui/products"

export default function Home() {
  return (
    <div className="container mx-auto px-2 space-y-4">
     
      <div className="py-2">
        <BannerCarousel />
      </div>

      <div className="py-2">
        <BannerEffect imageUrl="https://file.hstatic.net/1000253775/file/flashsale_dk_b277e7264a9c43a190f1bbbd14166c67.jpg" />
      </div>

     
      <div className="py-2">
        <ProductCarousel />
        <ButtonCenter input="Xem Tất Cả"  />
      </div>

   

      <div className="py-2">
        <BannerEffect imageUrl="https://file.hstatic.net/1000253775/file/h_ng_b_n_ch_y_6__2_.jpg" />
      </div>

      <div className="py-2">
        <Products />
        <ButtonCenter input="Xem Tất Cả"  />
      </div>
    </div>
  )
}
