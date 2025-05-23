import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function Layout() {
  const [pageName, setPageName] = useState("");

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen bg-gray-100">
      <Header className="grid grid-cols-5 grid-rows-5 gap-4 bg-white shadow" />

      <main className="mx-auto w-full max-w-5xl ">
        <Outlet />
      </main>
    </div>
  );
}
