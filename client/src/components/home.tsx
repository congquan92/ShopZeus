import BannerEffect from "./ui/bannereffect"
import ButtonCenter from "./ui/buttonALL"
import BannerCarousel from "./ui/custom-carousel"
import Gallery from "./ui/gallery"
import Popup from "./ui/poupup"
import ProductCarousel from "./ui/productcarousel"
import Products from "./ui/products"

export default function Home() {
  return (
    <div className="container mx-auto px-2 space-y-4">

      {/* popup */}
        <Popup imgURL="https://cdn.hstatic.net/files/1000253775/file/banner_kv-02__custom__e3ecf48ea75a4f05b9860c37c4bb7982.jpg" navigateURL="/sale"/>

      <div className="py-2 mt-3">
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

      <div className="py-2">
        <Gallery />
        <ButtonCenter input="Xem Ngay"  />
      </div>
    </div>
  )
}
