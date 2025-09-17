import api from "../utils/api";

export const authService = {
  async login(email, password) {
    const res = await api.post("/api/user/login", { email, password });
    return res.data;
  },

  async signup(email, password) {
    const res = await api.post("/api/user/signup", { email, password });
    return res.data;
  },
};
