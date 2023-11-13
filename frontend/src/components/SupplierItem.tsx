import React from "react";

const SupplierItem = ({ supplier }) => {
    return (
        <li className="supplier-item">
            <h3>{supplier.name}</h3>
            <p>Email: {supplier.email}</p>
            <p>Company Name: {supplier.compName}</p>
            <p>Address: {supplier.addr}</p>
            <p>Product: {supplier.product}</p>
        </li>
    );
};

export default SupplierItem;