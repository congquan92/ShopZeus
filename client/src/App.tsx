import Navbar from './components/navbar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Footer from './components/footer'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import NewProduct from './components/newproduct'
import ProductDetail from './components/productdetail'
import Cart from './components/cart'

// User Layout

const userRoutes = [
  { path: "/", element: <Home /> },
  { path: "/newproduct", element: <NewProduct /> },
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/tops", element: <h1>Tops</h1> },
  { path: "/bottoms", element: <h1>Bottoms</h1> },
  { path: "/shoes", element: <h1>Shoes</h1> },
  { path: "/sale", element: <h1>Sale</h1> },
  { path: "/cart", element: <Cart /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/register", element: <Register /> },
  { path: "/*", element: <h1>404</h1> },
]

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {userRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
    </>
  )
}

export default App
