import LoginButton from "@/loginButton.tsx";
import { useState } from 'react'
import reactLogo from '@images/react.svg'
import viteLogo from '/vite.svg'
import "@css/App.css";
import {Header} from "@/components/Homepage.tsx";
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";
import {ProductList} from "@/components/ProductList.tsx";
import AddProduct  from '@/components/PurchaseList.tsx';
import loginButton  from "@/loginButton.tsx";

export function App() {
return(
  
  <BrowserRouter>
  <div className="App">
    <nav>
      <div className={"menu"}>
        <Link to="/">Home</Link> ||
        <Link to="/products"> Search</Link> ||
        <Link to="/api/product"> Purchases</Link>
      </div>
    </nav>
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path='/products' element={<ProductList />} />
      <Route path="/api/product" element={<AddProduct />} />
    </Routes>
    <LoginButton />
    
  </div>
  </BrowserRouter>
)

}

export default App
