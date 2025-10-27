import React from 'react'
import Navbar from "./components/navbar/navbar"
import Hero from "./components/hero/hero"
import Footer from "./components/footer/footer"
import Products from "./components/products/products"
import Shop from './pages/shop'

const App = () => {
  return (
    <div>

        <Navbar/>
        <Shop/>
        <Footer/>

    </div>
  )
}

export default App