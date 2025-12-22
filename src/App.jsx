import React from 'react'
import Navbar from "./components/navbar/navbar"
import Footer from "./components/footer/footer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Shop from './pages/shop'
import Catalog from './pages/catalog'
import ProductDetails from './components/products/ProductDetails'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/home' element={<Shop />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/catalog/:id' element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
