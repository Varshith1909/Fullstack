import React, { useState, useEffect } from 'react';
import axios from "axios";

export const Header = () => {
  return (
    <div>
      <h1>Doggr</h1>
      <h3>Where your pets find love(tm)</h3>
      <br />
    </div>
  );
};

export const Button = () => {
  const [clicks, setClicks] = useState(2);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await axios.get("http://localhost:8082/products");
        console.log("Response:", response);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    console.log("useEffect triggered with clicks:", clicks);
    void fetchProducts();
  }, [clicks]);
  
  console.log("Rendering Button component with users:", users);
  
  return (
    <button
      onClick={() => {
        console.log("Clicked!");
        setClicks(clicks + 1);
      }}
    >
      Clicks: {clicks}
    </button>
  );
};
