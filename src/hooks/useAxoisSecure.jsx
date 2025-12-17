import axios from "axios";
import { useEffect, useMemo } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "https://assetverse-server-gamma.vercel.app",
    });
  }, []);

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const statusCode = error?.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate, axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
