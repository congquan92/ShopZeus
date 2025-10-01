import Navbar from "./components/navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/footer";
import Home from "./components/home";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import NewProduct from "./components/newproduct";
import ProductDetail from "./components/productdetail";
import Cart from "./components/cart";
import Profile from "./components/profile";
import ClothSize from "./components/clothsize";
import Wishlist from "./components/wishlist";

// User Layout

const userRoutes = [
    { path: "/", element: <Home /> },
    { path: "/new", element: <NewProduct /> },
    { path: "/product/:id", element: <ProductDetail /> },
    { path: "/tops", element: <h1>Tops</h1> },
    { path: "/bottoms", element: <h1>Bottoms</h1> },
    { path: "/shoes", element: <h1>Shoes</h1> },
    { path: "/sale", element: <h1>Sale</h1> },
    { path: "/cart", element: <Cart /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/register", element: <Register /> },
    { path: "/profile", element: <Profile /> },
    { path: "/cloth-size", element: <ClothSize /> },
    { path: "/wishlist", element: <Wishlist /> },
    { path: "/*", element: <h1>404</h1> },
];

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
    );
}

export default App;
