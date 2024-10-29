import axiosInstance from "../helpers/axios";
import { useAuthStore } from "../zustand/auth";

const useAuthApi = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const userId = useAuthStore((state) => state.userId);

  const authorizeUser = async () => {
    const response = await axiosInstance.post("/auth", {});
    const data = response.data;
    if (data) {
      localStorage.setItem("authData", JSON.stringify(data));
      setAuthData();
    }
  };

  const reAuthorizeUser = async () => {
    const response = await axiosInstance.post("/auth/refresh", {
      id: userId,
      refreshToken,
    });
    const data = response.data;
    if (data) {
      localStorage.setItem("authData", JSON.stringify(data));
      setAuthData();
    }
  };
  return { authorizeUser, reAuthorizeUser };
};

export default useAuthApi;
