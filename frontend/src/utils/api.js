import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend server URL
});

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const fetchMenuItems = () => API.get("/menu/items");
export const placeOrder = (data) => API.post("/orders/place", data);
export const fetchOrders = (userId) => API.get(`/orders/user/${userId}`);
export const fetchProfile = (userId) => API.get(`/users/profile/${userId}`);
export const updateProfile = (userId, data) => API.put(`/users/profile/${userId}`, data);
export const fetchAdminProfit = () => API.get("/admin/profit");
export const fetchAllOrders = () => API.get("/admin/orders");

export default API;
