import axiosInstance from "./axiosInstance";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const fetchUserProfile = async () => {
  return await axiosInstance.get("/users/profile");
};

export const logoutUser = async () => {
  return await axiosInstance.delete("/users/logout");
};

export const refreshToken = async () => {
  return await axiosInstance.post("/reissue");
};

export const useAutoAccessToken = () => {
  useEffect(() => {
    const refreshTokenBeforeExpiry = async () => {
      const accessToken = Cookies.get("access");
      if (!accessToken) return;

      const { exp } = JSON.parse(atob(accessToken.split(".")[1]));
      const expiresIn = exp * 1000 - Date.now();

      if (expiresIn < 60 * 60 * 1000) {
        try {
          await axiosInstance.post("/reissue");
          setTimeout(refreshTokenBeforeExpiry, expiresIn - 60 * 60 * 1000);
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      } else {
        setTimeout(refreshTokenBeforeExpiry, expiresIn - 60 * 60 * 1000);
      }
    };

    refreshTokenBeforeExpiry();
  }, []);
};
