"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Cookies from "js-cookie";
import {getUser} from "@/app/actions/auth";

// Definisikan tipe AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: Dispatch<SetStateAction<boolean>>;
}

// Buat context dengan tipe default
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<any | null>(
    null
  );

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("token");
      setIsAuthenticated(!!token);
    };

    const checkUser = () => {
      const user = Cookies.get("user");
      setIsUserAuthenticated(!!user);
    };

    checkUser();
    checkAuth(); // Cek saat pertama kali komponen dipasang

    const intervalUser = setInterval(checkUser, 1000); // Periksa user setiap 1 detik
    const intervalAuth = setInterval(checkAuth, 1000); // Periksa token setiap 1 detik

    return () => {
      clearInterval(intervalUser);
      clearInterval(intervalAuth);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isUserAuthenticated,
        setIsUserAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Buat hook untuk mengambil data dari context
export const useAuth = () => useContext(AuthContext)!;
