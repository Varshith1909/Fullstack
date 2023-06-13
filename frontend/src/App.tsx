import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Header } from '@/components/Homepage.tsx';
import { ProductList } from '@/components/ProductList.tsx';
import AddProduct from '@/components/PurchaseList.tsx';
import LoginButton from '@/loginButton.tsx';
import LogoutButton from '@/logoutButton.tsx';

export function App() {
  const { isAuthenticated } = useAuth0();
  
  return (
    <BrowserRouter>
      <div className="App">
       
        {isAuthenticated && (
          <>
            <nav>
              <div className="menu">
                <Link to="/">Home</Link> || <Link to="/products">Search</Link> ||{' '}
                <Link to="/api/product">Purchases</Link>
              </div>
            </nav>
            <Routes>
              <Route path="/" element={<Header />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/api/product" element={<AddProduct />} />
            </Routes>
            <LogoutButton />
          </>
        )}
        {!isAuthenticated && <LoginButton />}
      </div>
    </BrowserRouter>
  );
}

export default App;
