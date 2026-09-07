import "./AppShell.css"
import Header from "./Header/Header.jsx";
import BottomNav from "./BottomNav/BottomNav.jsx";
import { Outlet } from "react-router-dom";

function AppShell() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default AppShell;
