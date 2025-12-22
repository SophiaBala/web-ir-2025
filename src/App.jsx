import React from 'react';
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from './pages/shop';
import Catalog from './pages/catalog';
import ProductDetails from './components/products/ProductDetails';
import Cart from './components/cart/cart';
import Login from './pages/login';
import Signin from './pages/sign';
import ProtectedRoute from './pages/protected';
import Checkout from './pages/checkout';
import Succeed from './pages/succeed';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signin' element={<Signin />} />
        
        <Route path='/home' element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        } />
        <Route path='/catalog' element={
          <ProtectedRoute>
            <Catalog />
          </ProtectedRoute>
        } />
        <Route path='/catalog/:id' element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/succeed' element={<Succeed />} />
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
