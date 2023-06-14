import LoginButton from "@/loginButton.tsx";
import LogoutButton from "@/logoutButton.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WarningComponent from "./Warnn.tsx";
import "../assets/css/ProductsLiat.css";

export const ProductList = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { isAuthenticated } = useAuth0();
    
    const fetchProducts = async () => {
        const productRes = await axios.get("http://localhost:8082/products");
        return productRes.data;
    };
    
    useEffect(() => {
        fetchProducts().then((data) => {
            setUsers(data);
            setFilteredUsers(data);
        });
    }, []);
    
    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            const filtered = users.filter((user) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    };
    
    return (
      <div className="whole_back">
      <div className="product-list-container">
          {isAuthenticated && (
            <> <h2>Products</h2> <div className="search-bar"> <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." /> <button onClick={handleSearch}>Search</button> </div> {filteredUsers.length > 0 ? ( <ul className="product-list"> {filteredUsers.map((user) => ( <li key={user.name}> <div className="product-item"> <h3>{user.name}</h3> <p> Price: {user.price - user.discount} | Description:{" "} {user.description} </p> </div> </li> ))} </ul> ) : ( <p className="no-products">No products found.</p> )} </>
          )}
          {!isAuthenticated && (
            <div className="warning-container">
                <WarningComponent />
            </div>
          )}
      </div>
    </div>
    );
};

export default ProductList;
