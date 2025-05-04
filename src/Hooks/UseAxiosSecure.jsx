import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // ✅ your backend URL
});

const UseAxiosSecure = () => {
  useEffect(() => {
    // Add interceptor to attach token
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, []);

  return axiosSecure;
};

export default UseAxiosSecure;
