import { useState } from "react";
import axios from "axios";
import { FormData } from "../types";

export function useAuth() {
  const [user, setUser] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const authenticateUser = async (data: FormData, endpoint: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `http://localhost:8080/auth/${endpoint}`,
        data
      );
      setUser(res.data);
      const token = res.data.accessToken;
      if (endpoint == "login") localStorage.setItem("__token__", token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { user, error, loading, authenticateUser };
}
