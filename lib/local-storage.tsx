import {useEffect, useState} from "react";

export const useProductInCart = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    const handleStorageChange = () => {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const setProductInCart = (newProducts: any[]) => {
    localStorage.setItem("cart", JSON.stringify(newProducts));
    setCart([...newProducts]);
  };

  return {cart, setProductInCart};
};

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return token;
};
