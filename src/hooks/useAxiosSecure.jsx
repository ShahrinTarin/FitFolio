import { useContext, useEffect } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    // Request interceptor: set Authorization header before each request
    const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token"); // get fresh token each request
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor: handle 401/403 globally
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          logOut()
            .then(() => {
              console.log(`Logged out due to HTTP status ${status}`);
            })
            .catch((err) => console.error(err));
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount or re-run
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut]);

  return axiosInstance;
};

export default useAxiosSecure;
