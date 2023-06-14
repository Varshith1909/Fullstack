import WarningComponent from "@/components/Warnn.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "@/assets/css/Sales.css";

const Sales = () => {
    const [sales, setSales] = useState([]);
    const { isAuthenticated } = useAuth0();
    
    useEffect(() => {
        fetchSales();
    }, []);
    
    const fetchSales = async () => {
        try {
            const response = await axios.get("http://localhost:8082/sales");
            setSales(response.data);
        } catch (error) {
            console.error("Failed to fetch sales:", error);
        }
    };
    
    return (
      <div className="whole_back">
          {isAuthenticated && (
            <div className="sales-list">
                <h2>Sales</h2>
                <ul>
                    {sales.map((sale) => (
                      <li key={sale.id}>
                          <h3>{sale.product.name}</h3>
                          <p>Quantity: {sale.quantity}</p>
                          <p>Total Price: {sale.total_price}</p>
                      </li>
                    ))}
                    {sales.length === 0 && <p className="no-sales">No sales available</p>}
                </ul>
            </div>
          )}
          {!isAuthenticated && (
            <div className="product-list-container">
                <WarningComponent />
            </div>
          )}
      </div>
    );
};

export default Sales;
