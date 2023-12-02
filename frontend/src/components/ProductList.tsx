import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem"; // Component for rendering each product
import WarningComponent from "./Warnn.tsx";
import "../assets/css/ProductsLiat.css"; // Corrected CSS file name
import { useAuth0 } from "@auth0/auth0-react";

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { isAuthenticated } = useAuth0();
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8082/products");
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                // Optionally, handle error state here
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);
    
    return (
        <div className="whole_back">
            <div className="product-list-container">
                {isAuthenticated ? (
                    <>
                        <h2>Products</h2>
                        <div className="search-bar">
                            <input type="text" value={searchQuery}
                                   onChange={(e) => setSearchQuery(e.target.value)}
                                   placeholder="Search products..." />
                        </div>
                        {filteredProducts.length > 0 ? (
                            <ul className="product-list">
                                {filteredProducts.map((product) => (
                                    <ProductItem key={product.id} product={product} />
                                ))}
                            </ul>
                        ) : (
                            <p className="no-products">No products found.</p>
                        )}
                    </>
                ) : (
                    <WarningComponent />
                )}
            </div>
        </div>
    );
};

export default ProductList;