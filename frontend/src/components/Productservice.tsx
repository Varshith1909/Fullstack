import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const addProduct = async (productData) => {
  const response = await axios.post(`${API_BASE_URL}/products`, productData);
  return response.data;
};