import { useState, useEffect } from "react"

interface OrderItem {
    productId: number
    name: string
    price: number
    quantity: number
    size: string
    color: string
    image: string
}

interface ShippingInfo {
    method: string
    fee: number
    address: string
}

interface PaymentInfo {
    method: string
    status: string
    total: number
}

interface TrackingInfo {
    status: string
    date: string
    description: string
}

interface Order {
    id: number
    userId: number
    orderNumber: string
    status: string
    orderDate: string
    deliveryDate: string | null
    items: OrderItem[]
    shipping: ShippingInfo
    payment: PaymentInfo
    tracking: TrackingInfo[]
}

export const useOrders = (userId?: number) => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)
            setError(null)
            
            try {
                // TODO: Replace with real API call
                // const response = await fetch(`/api/orders${userId ? `?userId=${userId}` : ''}`)
                // const data = await response.json()
                // setOrders(data)
                
                // Using local JSON data for now
                const response = await fetch('/src/data/orders.json')
                const data = await response.json()
                
                if (userId) {
                    const userOrders = data.filter((order: Order) => order.userId === userId)
                    setOrders(userOrders)
                } else {
                    setOrders(data)
                }
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Lỗi khi tải đơn hàng')
                setOrders([])
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [userId])

    return { orders, loading, error }
}

export const useOrderById = (orderId: number) => {
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true)
            setError(null)
            
            try {
                // TODO: Replace with real API call
                // const response = await fetch(`/api/orders/${orderId}`)
                // const data = await response.json()
                // setOrder(data)
                
                // Using local JSON data for now
                const response = await fetch('/src/data/orders.json')
                const data = await response.json()
                const foundOrder = data.find((order: Order) => order.id === orderId)
                
                if (foundOrder) {
                    setOrder(foundOrder)
                } else {
                    setError('Không tìm thấy đơn hàng')
                }
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Lỗi khi tải đơn hàng')
                setOrder(null)
            } finally {
                setLoading(false)
            }
        }

        if (orderId) {
            fetchOrder()
        }
    }, [orderId])

    return { order, loading, error }
}

export const useOrderTracking = (orderNumber: string) => {
    const [tracking, setTracking] = useState<TrackingInfo[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTracking = async () => {
            setLoading(true)
            setError(null)
            
            try {
                // TODO: Replace with real API call
                // const response = await fetch(`/api/orders/tracking/${orderNumber}`)
                // const data = await response.json()
                // setTracking(data)
                
                // Using local JSON data for now
                const response = await fetch('/src/data/orders.json')
                const data = await response.json()
                const foundOrder = data.find((order: Order) => order.orderNumber === orderNumber)
                
                if (foundOrder) {
                    setTracking(foundOrder.tracking)
                } else {
                    setError('Không tìm thấy thông tin đơn hàng')
                }
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Lỗi khi tải thông tin vận chuyển')
                setTracking([])
            } finally {
                setLoading(false)
            }
        }

        if (orderNumber) {
            fetchTracking()
        }
    }, [orderNumber])

    return { tracking, loading, error }
}