
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/footer'
import Home from './components/home'
import { AuthProvider } from './hook/context/AuthContext'
import Login from './components/login'
import Register from './components/register'
import NewProduct from './components/newproduct'
import ProductDetail from './components/productdetail'
import Cart from './components/cart'
import Checkout from './components/checkout'
import OrderTracking from './components/ordertracking'
import Wishlist from './components/wishlist'
import SearchPage from './components/searchpage'
import UserProfile from './components/userprofile'



function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newproduct" element={<NewProduct />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/tops" element={<h1>Tops</h1>} />
            <Route path="/bottoms" element={<h1>Bottoms</h1>} />
            <Route path="/shoes" element={<h1>Shoes</h1>} />
            <Route path="/sale" element={<h1>Sale</h1>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:orderNumber" element={<OrderTracking />} />
            <Route path="/orders" element={<h1>Orders List</h1>} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/account" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
