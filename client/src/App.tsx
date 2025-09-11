
import Navbar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/footer'
import Home from './components/home'
import UserContext from './hook/context/UserContext'
// import useTest from './hook/useUppercase'
// import { Button } from './components/ui/button'
// import useAPI from './hook/useFetch'


function App() {
// const data = useTest("sadasd");
  const user = {
    "name": "Quan",
    "role": "admin"
  }
  // const user = null;
  return (
    <UserContext.Provider value={user}>
      <>
      {/* <Button onClick={data.upper}>Click</Button>
      <p>{data.data}</p> */}
      
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
    </UserContext.Provider>
  )
}

export default App
