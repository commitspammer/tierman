import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getJwt } from "../../Services/api";
import Header from "../Header";

export default function Layout() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(getJwt("jwt"));
  }, [isLogged]);

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen bg-gray-100 ">
      <Header
        className="grid grid-cols-5 grid-rows-5 gap-4 shadow"
        isLogged={isLogged}
      />

      <main className="mx-auto w-screen max-w-5xl ">
        <Outlet context={{ setIsLogged }} />
      </main>
    </div>
  );
}
