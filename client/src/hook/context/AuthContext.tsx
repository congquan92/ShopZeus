import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
    id: number
    name: string
    email: string
    phone?: string
    avatar?: string
    role: string
    verified: boolean
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
    register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>
    logout: () => void
    updateUser: (userData: Partial<User>) => void
}

interface RegisterData {
    name: string
    email: string
    password: string
    confirmPassword: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // Check if user is logged in on app start
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('authToken')
                const userData = localStorage.getItem('userData')
                
                if (token && userData) {
                    // TODO: Verify token with backend
                    // const response = await fetch('/api/auth/verify', {
                    //     headers: { 'Authorization': `Bearer ${token}` }
                    // })
                    // if (response.ok) {
                    //     const user = await response.json()
                    //     setUser(user)
                    // } else {
                    //     localStorage.removeItem('authToken')
                    //     localStorage.removeItem('userData')
                    // }
                    
                    // For demo - use stored user data
                    const parsedUser = JSON.parse(userData)
                    setUser(parsedUser)
                }
            } catch (error) {
                console.error('Auth check failed:', error)
                localStorage.removeItem('authToken')
                localStorage.removeItem('userData')
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            // TODO: Replace with real API call
            // const response = await fetch('/api/auth/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email, password })
            // })
            // const data = await response.json()
            
            // Demo login logic - check against users.json data
            const response = await fetch('/src/data/users.json')
            const users = await response.json()
            
            interface UserData {
                id: number
                name: string
                email: string
                phone?: string
                avatar?: string
                role: string
                verified: boolean
            }
            
            const foundUser = users.find((u: UserData) => u.email === email)
            
            if (foundUser && password === 'password123') { // Demo password
                const userData = {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email,
                    phone: foundUser.phone,
                    avatar: foundUser.avatar,
                    role: foundUser.role,
                    verified: foundUser.verified
                }
                
                const token = `demo_token_${foundUser.id}_${Date.now()}` // Demo token
                
                localStorage.setItem('authToken', token)
                localStorage.setItem('userData', JSON.stringify(userData))
                setUser(userData)
                
                return { success: true, message: 'Đăng nhập thành công!' }
            } else {
                return { success: false, message: 'Email hoặc mật khẩu không đúng' }
            }
            
        } catch (error) {
            console.error('Login error:', error)
            return { success: false, message: 'Có lỗi xảy ra khi đăng nhập' }
        }
    }

    const register = async (userData: RegisterData) => {
        try {
            // Validate
            if (userData.password !== userData.confirmPassword) {
                return { success: false, message: 'Mật khẩu xác nhận không khớp' }
            }

            if (userData.password.length < 6) {
                return { success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
            }

            // TODO: Replace with real API call
            // const response = await fetch('/api/auth/register', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(userData)
            // })
            // const data = await response.json()

            // Demo register logic
            const newUser = {
                id: Date.now(), // Demo ID
                name: userData.name,
                email: userData.email,
                phone: '',
                avatar: '',
                role: 'user',
                verified: false
            }

            const token = `demo_token_${newUser.id}_${Date.now()}`
            
            localStorage.setItem('authToken', token)
            localStorage.setItem('userData', JSON.stringify(newUser))
            setUser(newUser)
            
            return { success: true, message: 'Đăng ký thành công!' }
            
        } catch (error) {
            console.error('Register error:', error)
            return { success: false, message: 'Có lỗi xảy ra khi đăng ký' }
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        setUser(null)
        
        // TODO: Call logout API if needed
        // fetch('/api/auth/logout', { method: 'POST' })
    }

    const updateUser = (updatedData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...updatedData }
            setUser(updatedUser)
            localStorage.setItem('userData', JSON.stringify(updatedUser))
        }
    }

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        updateUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}