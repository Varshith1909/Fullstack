import React from "react";
import useFetchSuppliers from "./useFetchSuppliers"; // Custom hook for fetching suppliers
import SupplierItem from "./SupplierItem"; // Component for rendering each supplier
import "@/assets/css/Supplier.css";

const Suppliers = () => {
    const { suppliers, loading, error } = useFetchSuppliers();

    return (
        <div className="suppliers-container">
            <h2>Suppliers</h2>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading suppliers...</p>
            ) : (
                <ul className="suppliers-list">
                    {suppliers.map((supplier) => (
                        <SupplierItem key={supplier.supplier_id} supplier={supplier} />
                    ))}
                    {suppliers.length === 0 && <p className="no-suppliers">No suppliers available</p>}
                </ul>
            )}
        </div>
    );
};

export default Suppliers;
