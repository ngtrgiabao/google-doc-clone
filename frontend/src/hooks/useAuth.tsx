import { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/auth-context";
import useLocalStorage from "./useLocalStorage";
import IToken from "../types/interfaces/IToken";
import AuthService from "../services/auth.service";

const useAuth = () => {
  const {
    accessToken,
    setAccessToken,
    isAuthenticated,
    setIsAuthenticated,
    loading,
    loadingAuth,
    setLoadingAuth,
    errors,
    userId,
    setUserId,
    email,
    setEmail,
  } = useContext(AuthContext);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "refreshToken",
    null,
  );
  const login = (accessToken: string, refreshToken: string) => {
    const { exp, id, email } = jwtDecode<IToken>(accessToken);
    silentRefresh(exp);
    setUserId(id);
    setEmail(email);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    if (!accessToken) return;
    try {
      await AuthService.logout(accessToken);
    } catch (error) {
      console.log(error);
    } finally {
      destroyAuth();
    }
  };

  const silentRefresh = (exp: number) => {
    const msExpiration = Math.abs(
      new Date().getTime() - new Date(exp * 1000).getTime(),
    );

    setTimeout(() => {
      refreshAccessToken();
    }, msExpiration);
  };

  const destroyAuth = () => {
    setRefreshToken(null);
    setAccessToken(null);
    setUserId(null);
    setEmail(null);
    setIsAuthenticated(false);
  };

  const refreshAccessToken = async () => {
    if (refreshToken === null) {
      destroyAuth();
      setLoadingAuth(false);
      return;
    }
    try {
      const response = await AuthService.refreshToken({ token: refreshToken });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;
      login(newAccessToken, newRefreshToken);
    } catch (error) {
      destroyAuth();
    } finally {
      setLoadingAuth(false);
    }
  };

  return {
    accessToken,
    refreshToken,
    login,
    logout,
    userId,
    email,
    isAuthenticated,
    loading,
    loadingAuth,
    setLoadingAuth,
    errors,
    silentRefresh,
    destroyAuth,
    refreshAccessToken,
  };
};

export default useAuth;
