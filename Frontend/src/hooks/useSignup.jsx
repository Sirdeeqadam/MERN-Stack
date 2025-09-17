import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "../utils/api";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.post("/api/user/signup", { email, password });
      const user = res.data;

      // Save user to local storage
      localStorage.setItem("user", JSON.stringify(user));

      // Update auth context
      dispatch({ type: "LOGIN", payload: user });
    } catch (err) {
      setError(err.error || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
