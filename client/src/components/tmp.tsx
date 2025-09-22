            // <Tabs defaultValue="description" className="w-full">
            //     <TabsList className="w-full flex justify-start border-b">
            //         <TabsTrigger value="description">Mô tả</TabsTrigger>
            //         <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
            //         <TabsTrigger value="shipping">Chính sách giao hàng</TabsTrigger>
            //         <TabsTrigger value="return">Chính sách đổi hàng</TabsTrigger>
            //         <TabsTrigger value="reviews">Đánh giá & Bình luận</TabsTrigger>
            //     </TabsList>

            //     {/* Tab Mô tả */}
            //     <TabsContent value="description" className="p-4 text-gray-700">
            //         <h2 className="text-lg font-semibold mb-2">Mô tả sản phẩm</h2>
            //         <p>{product.description}</p>
            //     </TabsContent>

            //     {/* Tab Thông số kỹ thuật */}
            //     <TabsContent value="specifications" className="p-4">
            //         <h2 className="text-lg font-semibold mb-2">Thông số kỹ thuật</h2>
            //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            //             {Object.entries(product.specifications).map(([key, value]) => (
            //                 <div
            //                     key={key}
            //                     className="flex justify-between py-2 border-b border-gray-100"
            //                 >
            //                     <span className="font-medium text-gray-700">{key}:</span>
            //                     <span className="text-gray-600">{value as string}</span>
            //                 </div>
            //             ))}
            //         </div>
            //     </TabsContent>
            //     {/* Tab Chính sách giao hàng */}
            //     <TabsContent value="shipping" className="p-4 text-gray-700">
            //         <h2 className="text-lg font-semibold mb-2">Chính sách giao hàng</h2>
            //         <p>Giao hàng toàn quốc, thời gian từ 2-5 ngày làm việc tùy khu vực.</p>
            //     </TabsContent>

            //     {/* Tab Chính sách đổi hàng */}
            //     <TabsContent value="return" className="p-4 text-gray-700">
            //         <h2 className="text-lg font-semibold mb-2">Chính sách đổi hàng</h2>
            //         <p>Được đổi trả trong vòng 7 ngày nếu sản phẩm lỗi hoặc không đúng mô tả.</p>
            //     </TabsContent>

            //     {/* Tab Đánh giá & Bình luận */}
            //     <TabsContent value="reviews" className="p-4 text-gray-700">
            //         <h2 className="text-lg font-semibold mb-2">Đánh giá & Bình luận</h2>
            //         {/* 👉 Ở đây bạn có thể render danh sách review từ API hoặc hardcode */}
            //         <p>Chưa có đánh giá nào, hãy là người đầu tiên đánh giá sản phẩm này!</p>
            //     </TabsContent>
            // </Tabs>