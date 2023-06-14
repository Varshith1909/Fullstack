import { Header } from "@/components/Homepage.tsx";
import { ProductList } from "@/components/ProductList.tsx";
import AddProduct from "@/components/PurchaseList.tsx";
import React from "react";
import { Link, Route, Routes } from 'react-router-dom';
import 'daisyui/dist/full.css';


export function NavBar() {
  return (
    <nav>
      <div className="navbar bg-base-200 navbar-l bg-slate-100"> {/* Apply navbar-lg class for larger navbar */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a><Link to="/" className="text-lg">Home</Link></a></li> {/* Apply text-lg class for larger text */}
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-2xl">daisyUI</a> {/* Apply text-2xl class for larger text */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a><Link to="/" className="text-lg">Home</Link></a></li> {/* Apply text-lg class for larger text */}
            <li>
              <a>
                <Link to="/api/product" className="text-l">Purchases</Link> {/* Apply text-lg class for larger text */}
              </a>
            </li>
            <li><a><Link to="/products" className="text-2xl">Search</Link></a></li> {/* Apply text-lg class for larger text */}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/api/product" element={<AddProduct />} />
      </Routes>
      <div className="menu">
        <Link to="/" className="text-lg">Home</Link> || <Link to="/products" className="text-lg">Search</Link> ||{' '}
        <Link to="/api/product" className="text-lg">Purchases</Link>
      </div>
    </nav>
  );
}
