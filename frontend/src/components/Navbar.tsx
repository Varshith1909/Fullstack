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



export function NavBar() {
  const { isAuthenticated } = useAuth0();
  return (
    <nav>
      <div className="navbar bg-base-800 navbar-lg"> {/* Apply navbar-lg class for larger navbar */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a><Link to="/" className="text-lg">Home</Link></a></li> {/* Apply text-lg class for larger text */}
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case"><Link to="/" className="text-lg">pharmacy management</Link> </a> {/* Apply text-2xl class for larger text */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a><Link to="/" className="text-lg">Home</Link></a></li> {/* Apply text-lg class for larger text */}
            <li>
              <a>
                <Link to="/api/product" className="text-lg">Purchases</Link> {/* Apply text-lg class for larger text */}
              </a>
            </li>
            <li><a><Link to="/products" className="text-lg">Search</Link></a></li> {/* Apply text-lg class for larger text */}
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
      </Routes>
    </nav>
  );
}

