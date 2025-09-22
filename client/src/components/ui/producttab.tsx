import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"
import { Textarea } from "./textarea"
import { Input } from "./input"
import { Button } from "./button"
import { Star } from "lucide-react"

export default function ProductTabs({ product }: { product: any }) {
  const [reviews, setReviews] = useState<{ name: string; rating: number; comment: string }[]>([])
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !comment) return
    setReviews([...reviews, { name, rating, comment }])
    setName("")
    setComment("")
    setRating(5)
  }

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="w-full flex justify-start border-b">
        <TabsTrigger value="description">Mô tả</TabsTrigger>
        <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
        <TabsTrigger value="shipping">Chính sách giao hàng</TabsTrigger>
        <TabsTrigger value="return">Chính sách đổi hàng</TabsTrigger>
        <TabsTrigger value="reviews">Đánh giá & Bình luận</TabsTrigger>
      </TabsList>

      {/* Tab mô tả */}
      <TabsContent value="description" className="p-4 text-gray-700">
        <h2 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h2>
        <p>{product.description}</p>
      </TabsContent>

      {/* Tab thông số */}
      <TabsContent value="specifications" className="p-4">
        <h2 className="text-lg font-semibold mb-2">Thông số kỹ thuật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700">{key}:</span>
              <span className="text-gray-600">{value as string}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      {/* Tab chính sách */}
      <TabsContent value="shipping" className="p-4 text-gray-700">
        <h2 className="text-lg font-semibold mb-2">Chính sách giao hàng</h2>
        <p>Giao hàng toàn quốc, 2–5 ngày tùy khu vực.</p>
      </TabsContent>

      <TabsContent value="return" className="p-4 text-gray-700">
        <h2 className="text-lg font-semibold mb-2">Chính sách đổi hàng</h2>
        <p>Đổi trả trong 7 ngày nếu sản phẩm lỗi hoặc không đúng mô tả.</p>
      </TabsContent>

      {/* Tab reviews */}
      <TabsContent value="reviews" className="p-4">
        <h2 className="text-lg font-semibold mb-4">Đánh giá & Bình luận</h2>

        {/* Form thêm review */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Rating */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 cursor-pointer ${
                  i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(i + 1)}
              />
            ))}
            <span className="text-sm text-gray-600">{rating} sao</span>
          </div>

          <Textarea
            placeholder="Viết bình luận..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button type="submit">Gửi đánh giá</Button>
        </form>

        {/* Danh sách review */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500">Chưa có đánh giá nào, hãy là người đầu tiên!</p>
          ) : (
            reviews.map((r, index) => (
              <div key={index} className="border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{r.name}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mt-1">{r.comment}</p>
              </div>
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
