// src/services/userService.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// No token interceptor here because login/signup happen before we have a token
export const userService = {
  async login(email, password) {
    const res = await api.post("/user/login", { email, password });
    return res.data;
  },

  async signup(email, password) {
    const res = await api.post("/user/signup", { email, password });
    return res.data;
  },
};
