import React, { useState, useEffect } from "react";
import axios from "axios";
import "@/assets/css/Supplier.css";

const Suppliers = () => {
	const [suppliers, setSuppliers] = useState([]);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		fetchSuppliers();
	}, []);
	
	const fetchSuppliers = async () => {
		try {
			const response = await axios.get("http://localhost:8082/suppliers");
			setSuppliers(response.data);
			setLoading(false);
		} catch (error) {
			console.error("Failed to fetch suppliers:", error);
		}
	};
	
	return (
		<div className="suppliers-container">
			<h2>Suppliers</h2>
			{loading ? (
				<p>Loading suppliers...</p>
			) : (
				<ul className="suppliers-list">
					{suppliers.map((supplier) => (
						<li key={supplier.supplier_id} className="supplier-item">
							<h3>{supplier.name}</h3>
							<p>Email: {supplier.email}</p>
							<p>Company Name: {supplier.compName}</p>
							<p>Address: {supplier.addr}</p>
							<p>Product: {supplier.product}</p>
							<p>Company Name: {supplier.comp_Name}</p>
						</li>
					))}
					{suppliers.length === 0 && <p className="no-suppliers">No suppliers available</p>}
				</ul>
			)}
		</div>
	);
};

export default Suppliers;
