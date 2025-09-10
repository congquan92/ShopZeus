
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/footer'
import Home from './components/home'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<h1>New Arrivals</h1>} />
        <Route path="/tops" element={<h1>Tops</h1>} />
        <Route path="/bottoms" element={<h1>Bottoms</h1>} />
        <Route path="/shoes" element={<h1>Shoes</h1>} />
        <Route path="/sale" element={<h1>Sale</h1>} />
        <Route path="/cart" element={<h1>Cart</h1>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
