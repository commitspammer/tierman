import { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { getCookie } from "../../Services/api";

export default function ProtectedRoute() {
  const runOnce = useRef(false);

  const isAuthenticated = () => {
    return getCookie("jwt") ? true : false;
  };

  useEffect(() => {
    if (runOnce.current) return;
    console.log("isAuthenticated", isAuthenticated());
    if (!isAuthenticated()) {
      toast.error("Você precisa estar logado para acessar esta página.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    runOnce.current = true;
  }, []);

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
