import React from "react";

const SalesList = ({ sales }) => {
    return (
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
    );
};

export default SalesList;
