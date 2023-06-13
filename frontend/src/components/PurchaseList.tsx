import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");

    const handleAddProduct = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8082/products", {
                name,
                price,
                discount,
                description,
                productId : Math.random(),
            });

            console.log("Product added:", response.data);
            // Perform any additional actions after adding the product

            // Clear the input fields after successful product addition
            setName("");
            setPrice(0);
            setDiscount(0);
            setDescription("");
        } catch (error) {
            console.error("Failed to add product:", error);
            // Handle error scenarios
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <br />

                <label htmlFor="discount">Discount:</label>
                <input
                    type="number"
                    id="discount"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                />
                <br />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <br />

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
