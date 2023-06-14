import LoginButton from "@/loginButton.tsx";
import LogoutButton from "@/logoutButton.tsx";
import {useAuth0} from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import WarningComponent  from "./Warnn.tsx"

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
        <div>
            {isAuthenticated && (
              <>
                  
                  <h2>Products</h2>
                  <div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button onClick={handleSearch}>Search</button>
                  </div>
                  {filteredUsers.length > 0 ? (
                    <ul>
                        {filteredUsers.map((user) => (
                          <li key={user.name}>
                              {user.name} - {user.price - user.discount} - {user.description}
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p>No products found.</p>
                  )}
              </>
            )}
            {!isAuthenticated &&
            
            <div>
                
               <WarningComponent />
            </div>
            
            }
            
            
        </div>
        
    );
};
