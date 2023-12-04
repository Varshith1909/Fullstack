import { Header } from "@/components/Homepage.tsx";
import ProductList from "@/components/ProductList.tsx";
import AddProduct from "@/components/PurchaseList.tsx";
import LoginButton from "@/loginButton.tsx";
import LogoutButton from "@/logoutButton.tsx";
import React from "react";
import { Link, Route, Routes } from 'react-router-dom';
import 'daisyui/dist/full.css';
import "../assets/css/navbar.css"
import { useAuth0 } from '@auth0/auth0-react';
import '../assets/css/navbar.css';
import AddSale from "@/components/Sales.tsx";
import Suppliers from "@/components/Suppliers.tsx";


export function NavBar() {
  const { isAuthenticated } = useAuth0();
  return (
    <nav>
      <div className="navbar bg-base-800 navbar-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a><Link to="/" className="text-lg">Home</Link></a></li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case"><Link to="/" className="text-lg">pharmacy management</Link> </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a><Link to="/" className="text-lg bg-transparent">Home</Link></a></li>
            <li>
              <a>
                <Link to="/api/product" className="text-lg bg-transparent">Products</Link>
              </a>
            </li>
            <li><a><Link to="/products" className="text-lg bg-transparent">Search</Link></a></li>
            <li><a><Link to="/sales" className="text-lg bg-transparent">Sales</Link> </a></li>
            <li><a><Link to="/suppliers" className="text-lg bg-transparent">Suppliers</Link> </a></li>
          </ul>
        </div>
        <div className="navbar-end">
          {isAuthenticated && (
            <>
              
              <LogoutButton />
            </>
          )}
          {!isAuthenticated && <LoginButton />}
          
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/api/product" element={<AddProduct />} />
        <Route path="/sales" element={<AddSale />} />
        <Route path="/suppliers" element={<Suppliers />} />
      </Routes>
    </nav>
  );
}

