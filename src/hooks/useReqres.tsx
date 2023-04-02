import { useState } from "react";
import useFetch from "./useFetch";

interface User {
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
}


interface ReqresResponse {
  error?: string;
  token?: string;
  id?: string;
  data?: User[];
}

const useReqres = () => {
  const [status, setStatus] = useState<string>("idle");
  const [responseData, setData] = useState<ReqresResponse | null>(null);
  const { post, get, loading } = useFetch("https://reqres.in");

  const fetchData = (endpoint: string, email?: string, password?: string) => {
    if (
      (endpoint === "/api/register" || endpoint === "/api/login") &&
      email &&
      password
    ) {
      post<ReqresResponse>(endpoint, { email, password })
        .then((json) => {
          if (json) {
            setData(json);
          }
          if (json.error) {
            setStatus("failed");
            return;
          }
          setStatus("succeed");
        })
        .catch((error) => {
          setStatus("failed");
          setData(error);
        });
    } else if (endpoint === "/api/users") {
      get<ReqresResponse>(endpoint)
        .then((json) => {
          setData(json);
          if (!json || json?.error) {
            setStatus("failed");
            return;
          }
          setStatus("succeed");
        })
        .catch((error) => {
          setStatus("failed");
          setData(error);
        });
    } else {
      setStatus("failed");
      setData({ error: "Invalid endpoint" });
    }
  };
  return {
    isLoading: loading,
    fetchData,
    status,
    responseData,
  };
};

export default useReqres;
