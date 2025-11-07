import React from 'react'
import Navbar from "./components/navbar/navbar"
import Footer from "./components/footer/footer"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Shop from './pages/shop'
import Catalog from './pages/catalog'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Shop/>}/>
          <Route path='/catalog' element = {<Catalog/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App