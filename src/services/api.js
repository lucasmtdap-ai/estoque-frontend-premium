import axios from "axios";

const api = axios.create({
  baseURL: "https://stock-backend-hp9t.onrender.com"
});

export default api;
