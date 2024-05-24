import { useState, useCallback } from "react";
import axios from "axios";
import { FormData } from "../types";

export function useUserDetail() {
  const [user, setUser] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getuserDetail = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`http://localhost:8080/user/userdetail`, {
        headers: {
          Authorization: `${localStorage.getItem("__token__")}`,
        },
      });
      setUser(res.data.user);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, error, loading, getuserDetail };
}
