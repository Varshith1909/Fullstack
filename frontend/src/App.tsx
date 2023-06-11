import { useState } from 'react'
import reactLogo from '@images/react.svg'
import viteLogo from '/vite.svg'
import "@css/App.css";
import {Button, Header, ProductList} from "@/Components.tsx";
import { Link, Route, Routes, Router, BrowserRouter } from "react-router-dom";

export function App() {
return(
  <BrowserRouter>
  <div className="App">
    <nav>
      <div className={"menu"}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div>
    </nav>
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path='/products' element={<ProductList />} />
    </Routes>
    
  </div>
  </BrowserRouter>
)

}

export default App
