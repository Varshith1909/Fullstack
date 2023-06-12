import React, {useEffect, useState} from "react";
import axios from "axios";

export const ProductList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productRes = await axios.get("http://localhost:8082/products");
            return productRes.data;
        };
        fetchProducts().then(setUsers);
    }, []);

    return (
        <div>
            <h2>Products</h2>
            {
                users ?
                    <ul>
                        {users.map((user: { name: string, price: number, description: string }) =>
                            <li key={user.name}>{user.name} - {user.price} - {user.description} </li>)
                        }
                    </ul> : null
            }
        </div>
    );
}
