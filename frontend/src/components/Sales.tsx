import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesList from "./SalesList";  // Assume this is your new component
import WarningComponent from "@/components/Warnn";
import { useAuth0 } from "@auth0/auth0-react";
import "@/assets/css/Sales.css";

const Sales = () => {
    const [sales, setSales] = useState([]);
    const { isAuthenticated } = useAuth0();
    
    useEffect(() => {
        fetchSalesData();
    }, []);
    
    const fetchSalesData = async () => {
        try {
            const response = await axios.get("http://localhost:8082/sales");
            setSales(response.data);
        } catch (error) {
            console.error("Failed to fetch sales:", error);
            // Optionally, handle error state here
        }
    };

    return (
        <div className="whole_back">
            {isAuthenticated ? (
                <SalesList sales={sales} />
            ) : (
                <WarningComponent />
            )}
        </div>
    );
};

export default Sales;