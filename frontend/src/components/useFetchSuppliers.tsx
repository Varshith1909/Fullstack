
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSuppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get("http://localhost:8082/suppliers");
                setSuppliers(response.data);
            } catch (error) {
                console.error("Failed to fetch suppliers:", error);
                setError("Failed to load suppliers.");
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    return { suppliers, loading, error };
};

export default useFetchSuppliers;