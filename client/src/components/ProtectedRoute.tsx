// import { Navigate } from "react-router-dom"
// import { useAuth } from "../hook/context/AuthContext"

// type Props = {
//   children: React.ReactNode
//   requiredRole?: string // optional: nếu có thì chỉ role này mới được vào
// }

// export default function ProtectedRoute({ children, requiredRole }: Props) {
//   const { user } = useAuth()
//   if (!user) {
//     return <Navigate to="/login" replace />
//   }

//   if (requiredRole && user.role !== requiredRole) {
//     return <Navigate to="/" replace />
//   }

//   return <>{children}</>
// }
