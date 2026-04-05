import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://stock-backend-hp9t.onrender.com"
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
