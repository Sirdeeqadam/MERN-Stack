import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../utils/api";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.post("/api/user/login", { email, password });
      const user = res.data;

      // Save user to local storage
      localStorage.setItem("user", JSON.stringify(user));

      // Update auth context
      dispatch({ type: "LOGIN", payload: user });
    } catch (err) {
      setError(err.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
