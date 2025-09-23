import { createContext, useContext, useEffect, useState } from "react"

type User = {
  username: string
  password: string
  role: string
} | null

type AuthContextType = {
  user: User
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accounts, setAccounts] = useState<User[]>([])
    const [user, setUser] = useState<User>(null)
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
              const response = await fetch('src/data/user.json');
              const data = await response.json();
              setAccounts(data);
            } catch (error) {
              console.error('Error fetching accounts:', error);
            }
        };
        fetchAccounts();
    },[])
    // useEffect(() => {
    //     console.log(accounts);
    // },[accounts])

  const login = (username: string, password: string) => {
    const found = accounts.find(
      (acc) => acc.username === username && acc.password === password
    )
    if (found) {
      setUser(found)
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
