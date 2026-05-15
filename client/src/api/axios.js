import axios from "axios";

const API = axios.create({
  baseURL: `https://expense-tracker-api-s060.onrender.com/api`,
  withCredentials: true,
});

export default API;
