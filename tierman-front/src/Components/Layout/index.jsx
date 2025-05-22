import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

export default function Layout() {
  const [pageName, setPageName] = useState("");

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
