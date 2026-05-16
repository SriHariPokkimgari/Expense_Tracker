import axios from "axios";

const API = axios.create({
  //baseURL: `https://expense-tracker-api-s060.onrender.com/api`,
  //baseURL: "http://localhost:8000/api",
  baseURL: import.meta.env.DEV ? "http://localhost:8000/api" : "/api",
  withCredentials: true,
});

export default API;
