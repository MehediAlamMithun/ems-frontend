import axios from "axios";
import { useEffect, useRef } from "react";

const UseAxiosSecure = () => {
  const axiosSecureRef = useRef(
    axios.create({
      baseURL: "https://ems-server-gray.vercel.app/",
      withCredentials: true,
    })
  );

  useEffect(() => {
    const instance = axiosSecureRef.current;
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return axiosSecureRef.current;
};

export default UseAxiosSecure;
