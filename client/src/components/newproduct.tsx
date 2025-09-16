import { useState } from "react"
import { SlashIcon } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "./ui/breadcrumb"
import TitleCompact from "./ui/title_compact"
import {
    Pagination,
    PaginationContent,

    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination"

export default function NewProduct() {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    // 👉 Danh sách gốc chỉ có 20 sản phẩm
    const allProducts = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `Sản phẩm ${index + 1}`,
        description: `Mô tả sản phẩm ${index + 1}`,
    }))

    const totalPages = Math.ceil(allProducts.length / pageSize)

    // 👉 Cắt sản phẩm theo trang
    const products = allProducts.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    return (
        <div className="container mx-auto p-2 space-y-4">
            {/* Breadcrumb */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Sản phẩm mới</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Title */}
            <TitleCompact
                title="Sản Phẩm Mới"
                subtitle="Khám Phá Những Sản Phẩm Mới Nhất Của Chúng Tôi"
            />

            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {products.map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded-md shadow">
                        <h2 className="font-semibold">{p.name}</h2>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                setCurrentPage((prev) => Math.max(1, prev - 1))
                            }}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage(page)
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
