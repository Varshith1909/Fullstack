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
    const getUser = async () => {
      const userResult = await axios.get("http://localhost:8082/hello");
      setUsers(userResult.data);
    };
   void getUser();
  }, []);
  
  return (
    
    <button onClick={() => {
      console.log("Clicked!");
      setClicks(clicks + 1);
    }}>
      Clicks: {clicks}
   
    </button>
  );
};
