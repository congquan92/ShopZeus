import { useState, useEffect } from "react"

interface UserAddress {
    street: string
    ward: string
    district: string
    city: string
    zipCode: string
}

interface UserPreferences {
    newsletter: boolean
    smsNotifications: boolean
    emailNotifications: boolean
    size: string
    favoriteCategories: string[]
}

interface UserStats {
    totalOrders: number
    totalSpent: number
    loyaltyPoints: number
    reviewsCount: number
}

interface User {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
    address: UserAddress
    dateOfBirth: string
    gender: string
    role: string
    verified: boolean
    joinDate: string
    lastLogin: string
    preferences: UserPreferences
    stats: UserStats
}

/**
 * Hook để quản lý thông tin chi tiết của một user cụ thể
 * Chỉ dùng để fetch và update user profile, không dùng cho authentication
 * Authentication được xử lý bởi AuthContext
 */
export const useUser = (userId?: number) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) {
                setLoading(false)
                return
            }

            setLoading(true)
            setError(null)
            
            try {
                // TODO: Replace with real API call
                // const response = await fetch(`/api/users/${userId}`)
                // const data = await response.json()
                // setUser(data)
                
                // Using local JSON data for now
                const response = await fetch('/src/data/users.json')
                const data = await response.json()
                const foundUser = data.find((user: User) => user.id === userId)
                
                if (foundUser) {
                    setUser(foundUser)
                } else {
                    setError('Không tìm thấy thông tin người dùng')
                }
                
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Lỗi khi tải thông tin người dùng'
                setError(errorMessage)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [userId])

    const updateUser = async (updatedData: Partial<User>) => {
        try {
            // TODO: Replace with real API call
            // const response = await fetch(`/api/users/${userId}`, {
            //     method: 'PUT',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(updatedData)
            // })
            // const updatedUser = await response.json()
            // setUser(updatedUser)
            
            // Temporary local implementation
            if (user) {
                const updatedUser = { ...user, ...updatedData }
                setUser(updatedUser)
            }
            
            return { success: true, message: 'Cập nhật thông tin thành công' }
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Lỗi khi cập nhật thông tin'
            return { 
                success: false, 
                message: errorMessage
            }
        }
    }

    const updatePreferences = async (preferences: Partial<UserPreferences>) => {
        try {
            // TODO: Replace with real API call
            // const response = await fetch(`/api/users/${userId}/preferences`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(preferences)
            // })
            
            // Temporary local implementation
            if (user) {
                const updatedUser = {
                    ...user,
                    preferences: { ...user.preferences, ...preferences }
                }
                setUser(updatedUser)
            }
            
            return { success: true, message: 'Cập nhật tùy chọn thành công' }
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Lỗi khi cập nhật tùy chọn'
            return { 
                success: false, 
                message: errorMessage
            }
        }
    }

    const changePassword = async (currentPassword: string, newPassword: string) => {
        try {
            // TODO: Replace with real API call
            // const response = await fetch(`/api/users/${userId}/change-password`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ currentPassword, newPassword })
            // })
            
            // Validate input parameters
            if (!currentPassword || !newPassword) {
                return { success: false, message: 'Vui lòng nhập đầy đủ thông tin' }
            }
            
            if (newPassword.length < 6) {
                return { success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự' }
            }
            
            // Temporary implementation - simulate success
            console.log('Changing password for user:', userId)
            return { success: true, message: 'Đổi mật khẩu thành công' }
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Lỗi khi đổi mật khẩu'
            console.error('Password change error:', errorMessage)
            return { 
                success: false, 
                message: errorMessage
            }
        }
    }

    return { 
        user, 
        loading, 
        error, 
        updateUser, 
        updatePreferences, 
        changePassword 
    }
}