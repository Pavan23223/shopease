import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export default api;

export const getProducts = () => api.get("/products");
export const getProduct = (id: string) => api.get(`/products/${id}`);