import React from "react";

const ProductItem = ({ product }) => {
    return (
        <li className="product-item">
            <h3>{product.name}</h3>
            <p>Price: {product.price} Discount: {product.discount}</p>
            <p>Description: {product.description} | Position: {product.position}</p>
        </li>
    );
};

export default ProductItem;