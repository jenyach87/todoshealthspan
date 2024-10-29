import axios from "axios";
import useAuthApi from "../api/auth";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { reAuthorizeUser } = useAuthApi();
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      await reAuthorizeUser();
      return axiosInstance(error.config);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
